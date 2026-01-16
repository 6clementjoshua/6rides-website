"use client";

import { useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { ALLOWED_FROM } from "@/lib/email/from";
import { emailShell } from "@/lib/email/shell";
import { renderTemplate, templateKeys, type TemplateKey } from "@/lib/email/templates";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function OutboxPage() {
    // Template controls
    const [templateKey, setTemplateKey] = useState<TemplateKey>("custom");
    const [customerName, setCustomerName] = useState("");

    // Auth + routing
    const [pin, setPin] = useState("");
    const [from, setFrom] = useState<string>(ALLOWED_FROM[0]);
    const [to, setTo] = useState("");
    const [cc, setCc] = useState("");
    const [bcc, setBcc] = useState("");

    // Subject + optional override headline
    const [subject, setSubject] = useState("");
    const [headlineOverride, setHeadlineOverride] = useState("");

    // Custom message (used by custom template; also can be used in some notices)
    const [messageHtml, setMessageHtml] = useState(
        `Hello,<br/><br/>Type your message here.<br/><br/><b>— 6ride Team</b>`
    );

    // FULL booking_update fields
    const [bookingIntroHtml, setBookingIntroHtml] = useState("");
    const [statusPill, setStatusPill] = useState("Status");
    const [statusTitle, setStatusTitle] = useState("Unavailable right now");
    const [statusMessage, setStatusMessage] = useState(
        "Sorry, this ride is currently unavailable due to high demand. Please try another vehicle or book early next time. Thank you — 6ride."
    );

    const [vehicleName, setVehicleName] = useState("");
    const [vehicleImageUrl, setVehicleImageUrl] = useState("");
    const [vehiclePrice, setVehiclePrice] = useState("");
    const [reference, setReference] = useState("");

    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [email, setEmail] = useState("");
    const [notes, setNotes] = useState("");

    const [primaryCtaLabel, setPrimaryCtaLabel] = useState("Visit 6ride");
    const [primaryCtaUrl, setPrimaryCtaUrl] = useState("https://www.6rides.com");
    const [secondaryCtaLabel, setSecondaryCtaLabel] = useState("Contact");
    const [secondaryCtaUrl, setSecondaryCtaUrl] = useState("https://www.6rides.com/policies/contact");

    const [closingNoteHtml, setClosingNoteHtml] = useState("");

    // Status
    const [status, setStatus] = useState<string | null>(null);
    const [sending, setSending] = useState(false);

    const isBooking = templateKey === "booking_update";

    const vars = useMemo(() => {
        if (!isBooking) {
            return {
                customerName,
                messageHtml,
            };
        }

        return {
            customerName,
            introHtml: bookingIntroHtml || undefined,

            statusPill,
            statusTitle,
            statusMessage,

            vehicleName: vehicleName || undefined,
            vehicleImageUrl: vehicleImageUrl || undefined,
            vehiclePrice: vehiclePrice || undefined,
            reference: reference || undefined,

            pickup: pickup || undefined,
            destination: destination || undefined,
            email: email || undefined,
            notes: notes || undefined,

            primaryCtaLabel: primaryCtaLabel || undefined,
            primaryCtaUrl: primaryCtaUrl || undefined,
            secondaryCtaLabel: secondaryCtaLabel || undefined,
            secondaryCtaUrl: secondaryCtaUrl || undefined,

            closingNoteHtml: closingNoteHtml || undefined,
        };
    }, [
        isBooking,
        customerName,
        messageHtml,
        bookingIntroHtml,
        statusPill,
        statusTitle,
        statusMessage,
        vehicleName,
        vehicleImageUrl,
        vehiclePrice,
        reference,
        pickup,
        destination,
        email,
        notes,
        primaryCtaLabel,
        primaryCtaUrl,
        secondaryCtaLabel,
        secondaryCtaUrl,
        closingNoteHtml,
    ]);

    const templateOut = useMemo(() => {
        return renderTemplate(templateKey, vars);
    }, [templateKey, vars]);

    const previewSrcDoc = useMemo(() => {
        const title = (headlineOverride.trim() || templateOut.headline || "Email Preview").trim();
        const preheader = subject.trim() || templateOut.subjectHint || "Preview";

        return emailShell({
            title,
            preheader,
            bodyHtml: templateOut.bodyHtml,
        });
    }, [headlineOverride, subject, templateOut]);

    async function send() {
        setStatus(null);
        setSending(true);
        try {
            const { data } = await supabase.auth.getSession();
            const token = data.session?.access_token;
            if (!token) {
                setStatus("You must be logged in (Supabase) to use Outbox.");
                return;
            }

            // Basic validation (client-side)
            if (!pin.trim()) {
                setStatus("Enter Admin PIN.");
                return;
            }
            if (!to.trim()) {
                setStatus("Enter a recipient (To).");
                return;
            }

            if (isBooking) {
                if (!statusTitle.trim() || !statusMessage.trim()) {
                    setStatus("Booking Update needs Status Title and Status Message.");
                    return;
                }
            } else {
                // custom template should have content
                if (templateKey === "custom" && !messageHtml.trim()) {
                    setStatus("Custom message cannot be empty.");
                    return;
                }
            }

            const finalSubject = subject.trim() || templateOut.subjectHint || "6ride Message";

            const res = await fetch("/api/internal/outbox/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    pin,
                    from,
                    to,
                    cc: cc || undefined,
                    bcc: bcc || undefined,
                    subject: finalSubject,
                    templateKey,
                    vars: {
                        ...vars,
                        headlineOverride: headlineOverride || undefined,
                    },
                }),
            });

            const json = await res.json();
            if (!res.ok) {
                setStatus(`Error: ${json?.error}${json?.detail ? " — " + JSON.stringify(json.detail) : ""}`);
                return;
            }

            setStatus(`Sent ✅ Resend ID: ${json.id || "ok"}`);
        } catch (e: any) {
            setStatus(`Error: ${e?.message || "Failed"}`);
        } finally {
            setSending(false);
        }
    }

    return (
        <main className="min-h-screen bg-white text-black">
            <meta name="robots" content="noindex,nofollow,noarchive" />
            <meta name="googlebot" content="noindex,nofollow,noarchive" />

            <div className="mx-auto max-w-6xl px-6 py-10">
                <h1 className="text-2xl font-semibold">6ride Outbox Mail</h1>
                <p className="mt-1 text-sm text-black/60">Internal only. Supabase admin + PIN required.</p>

                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    {/* Composer */}
                    <div className="rounded-2xl border border-black/10 p-5 shadow-sm">
                        <div className="grid gap-4">
                            <label className="grid gap-1">
                                <span className="text-xs font-semibold text-black/70">Admin PIN</span>
                                <input
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    inputMode="numeric"
                                    placeholder="Enter PIN"
                                    className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                />
                            </label>

                            <label className="grid gap-1">
                                <span className="text-xs font-semibold text-black/70">Template</span>
                                <select
                                    value={templateKey}
                                    onChange={(e) => setTemplateKey(e.target.value as TemplateKey)}
                                    className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                >
                                    {templateKeys().map((t) => (
                                        <option key={t.key} value={t.key}>
                                            {t.label}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="grid gap-1">
                                <span className="text-xs font-semibold text-black/70">Customer name (optional)</span>
                                <input
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder="e.g. Clement"
                                    className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                />
                            </label>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="grid gap-1">
                                    <span className="text-xs font-semibold text-black/70">From</span>
                                    <select
                                        value={from}
                                        onChange={(e) => setFrom(e.target.value)}
                                        className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                    >
                                        {ALLOWED_FROM.map((f) => (
                                            <option key={f} value={f}>
                                                {f}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="grid gap-1">
                                    <span className="text-xs font-semibold text-black/70">To</span>
                                    <input
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                        placeholder="customer@email.com"
                                        className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                    />
                                </label>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="grid gap-1">
                                    <span className="text-xs font-semibold text-black/70">CC (optional)</span>
                                    <input
                                        value={cc}
                                        onChange={(e) => setCc(e.target.value)}
                                        placeholder="cc@email.com"
                                        className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                    />
                                </label>
                                <label className="grid gap-1">
                                    <span className="text-xs font-semibold text-black/70">BCC (optional)</span>
                                    <input
                                        value={bcc}
                                        onChange={(e) => setBcc(e.target.value)}
                                        placeholder="bcc@email.com"
                                        className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                    />
                                </label>
                            </div>

                            <label className="grid gap-1">
                                <span className="text-xs font-semibold text-black/70">Subject (optional)</span>
                                <input
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder={templateOut.subjectHint || "Subject"}
                                    className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                />
                            </label>

                            <label className="grid gap-1">
                                <span className="text-xs font-semibold text-black/70">Headline override (optional)</span>
                                <input
                                    value={headlineOverride}
                                    onChange={(e) => setHeadlineOverride(e.target.value)}
                                    placeholder={templateOut.headline || "Booking Update"}
                                    className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                />
                            </label>

                            {/* BOOKING UPDATE FIELDS */}
                            {isBooking ? (
                                <div className="mt-2 rounded-2xl border border-black/10 p-4">
                                    <div className="text-xs font-semibold text-black/70">Booking Update fields</div>

                                    <div className="mt-3 grid gap-3">
                                        <label className="grid gap-1">
                                            <span className="text-xs font-semibold text-black/70">Intro (optional HTML)</span>
                                            <textarea
                                                value={bookingIntroHtml}
                                                onChange={(e) => setBookingIntroHtml(e.target.value)}
                                                rows={3}
                                                placeholder='Optional. If empty, default: "Hello {name}, thank you for choosing 6ride..."'
                                                className="rounded-xl border border-black/15 px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-black/10"
                                            />
                                        </label>

                                        <div className="grid gap-3 sm:grid-cols-2">
                                            <label className="grid gap-1">
                                                <span className="text-xs font-semibold text-black/70">Status pill</span>
                                                <input
                                                    value={statusPill}
                                                    onChange={(e) => setStatusPill(e.target.value)}
                                                    placeholder="Status"
                                                    className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                                />
                                            </label>

                                            <label className="grid gap-1">
                                                <span className="text-xs font-semibold text-black/70">Status title (required)</span>
                                                <input
                                                    value={statusTitle}
                                                    onChange={(e) => setStatusTitle(e.target.value)}
                                                    placeholder="Unavailable right now"
                                                    className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                                />
                                            </label>
                                        </div>

                                        <label className="grid gap-1">
                                            <span className="text-xs font-semibold text-black/70">Status message (required, HTML allowed)</span>
                                            <textarea
                                                value={statusMessage}
                                                onChange={(e) => setStatusMessage(e.target.value)}
                                                rows={4}
                                                className="rounded-xl border border-black/15 px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-black/10"
                                            />
                                        </label>

                                        <div className="grid gap-3 sm:grid-cols-2">
                                            <label className="grid gap-1">
                                                <span className="text-xs font-semibold text-black/70">Vehicle name</span>
                                                <input
                                                    value={vehicleName}
                                                    onChange={(e) => setVehicleName(e.target.value)}
                                                    placeholder="Mercedes CLA"
                                                    className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                                />
                                            </label>

                                            <label className="grid gap-1">
                                                <span className="text-xs font-semibold text-black/70">Vehicle price</span>
                                                <input
                                                    value={vehiclePrice}
                                                    onChange={(e) => setVehiclePrice(e.target.value)}
                                                    placeholder="₦120,000"
                                                    className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                                />
                                            </label>
                                        </div>

                                        <label className="grid gap-1">
                                            <span className="text-xs font-semibold text-black/70">Vehicle image URL</span>
                                            <input
                                                value={vehicleImageUrl}
                                                onChange={(e) => setVehicleImageUrl(e.target.value)}
                                                placeholder="https://www.6rides.com/vehicles/....png"
                                                className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                            />
                                        </label>

                                        <label className="grid gap-1">
                                            <span className="text-xs font-semibold text-black/70">Reference (optional)</span>
                                            <input
                                                value={reference}
                                                onChange={(e) => setReference(e.target.value)}
                                                placeholder="UUID • 2026-01-14T11:43:28.255Z"
                                                className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                            />
                                        </label>

                                        <div className="grid gap-3 sm:grid-cols-2">
                                            <label className="grid gap-1">
                                                <span className="text-xs font-semibold text-black/70">Pickup</span>
                                                <input
                                                    value={pickup}
                                                    onChange={(e) => setPickup(e.target.value)}
                                                    placeholder="8miles"
                                                    className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                                />
                                            </label>

                                            <label className="grid gap-1">
                                                <span className="text-xs font-semibold text-black/70">Destination</span>
                                                <input
                                                    value={destination}
                                                    onChange={(e) => setDestination(e.target.value)}
                                                    placeholder="unical"
                                                    className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                                />
                                            </label>
                                        </div>

                                        <div className="grid gap-3 sm:grid-cols-2">
                                            <label className="grid gap-1">
                                                <span className="text-xs font-semibold text-black/70">Email (optional)</span>
                                                <input
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="customer@email.com"
                                                    className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                                />
                                            </label>

                                            <label className="grid gap-1">
                                                <span className="text-xs font-semibold text-black/70">Notes (optional)</span>
                                                <input
                                                    value={notes}
                                                    onChange={(e) => setNotes(e.target.value)}
                                                    placeholder="Any note..."
                                                    className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                                />
                                            </label>
                                        </div>

                                        <div className="grid gap-3 sm:grid-cols-2">
                                            <label className="grid gap-1">
                                                <span className="text-xs font-semibold text-black/70">Primary CTA label</span>
                                                <input
                                                    value={primaryCtaLabel}
                                                    onChange={(e) => setPrimaryCtaLabel(e.target.value)}
                                                    placeholder="Subscribe for Availability Updates"
                                                    className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                                />
                                            </label>

                                            <label className="grid gap-1">
                                                <span className="text-xs font-semibold text-black/70">Primary CTA URL</span>
                                                <input
                                                    value={primaryCtaUrl}
                                                    onChange={(e) => setPrimaryCtaUrl(e.target.value)}
                                                    placeholder="https://www.6rides.com/..."
                                                    className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                                />
                                            </label>
                                        </div>

                                        <div className="grid gap-3 sm:grid-cols-2">
                                            <label className="grid gap-1">
                                                <span className="text-xs font-semibold text-black/70">Secondary CTA label</span>
                                                <input
                                                    value={secondaryCtaLabel}
                                                    onChange={(e) => setSecondaryCtaLabel(e.target.value)}
                                                    placeholder="Visit 6ride"
                                                    className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                                />
                                            </label>

                                            <label className="grid gap-1">
                                                <span className="text-xs font-semibold text-black/70">Secondary CTA URL</span>
                                                <input
                                                    value={secondaryCtaUrl}
                                                    onChange={(e) => setSecondaryCtaUrl(e.target.value)}
                                                    placeholder="https://www.6rides.com"
                                                    className="rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                                                />
                                            </label>
                                        </div>

                                        <label className="grid gap-1">
                                            <span className="text-xs font-semibold text-black/70">Closing note (optional HTML)</span>
                                            <textarea
                                                value={closingNoteHtml}
                                                onChange={(e) => setClosingNoteHtml(e.target.value)}
                                                rows={3}
                                                placeholder="Optional note under buttons."
                                                className="rounded-xl border border-black/15 px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-black/10"
                                            />
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                // NON-BOOKING: show message box
                                <label className="grid gap-1">
                                    <span className="text-xs font-semibold text-black/70">Message HTML (body only)</span>
                                    <textarea
                                        value={messageHtml}
                                        onChange={(e) => setMessageHtml(e.target.value)}
                                        rows={12}
                                        className="rounded-xl border border-black/15 px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-black/10"
                                    />
                                </label>
                            )}

                            <button
                                onClick={send}
                                disabled={sending}
                                className="rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
                            >
                                {sending ? "Sending..." : "Send Email"}
                            </button>

                            {status && (
                                <div className="rounded-xl border border-black/10 bg-black/5 px-3 py-2 text-sm">{status}</div>
                            )}
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="rounded-2xl border border-black/10 p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold">Preview</h2>
                            <span className="text-xs text-black/50">Shell + template applied</span>
                        </div>

                        <div className="mt-3 overflow-hidden rounded-xl border border-black/10">
                            <iframe title="preview" srcDoc={previewSrcDoc} className="h-[620px] w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
