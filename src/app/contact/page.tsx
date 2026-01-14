// app/contact/page.tsx
"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";

function cx(...parts: Array<string | false | undefined | null>) {
    return parts.filter(Boolean).join(" ");
}

function BevelLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            className={cx(
                "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-4 py-2 text-xs font-semibold",
                "transition-transform duration-200 active:scale-[0.985]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
                "border border-black/10 bg-white/[0.58] backdrop-blur-md",
                "shadow-[0_10px_25px_-18px_rgba(0,0,0,0.35)]",
                "before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(120%_120%_at_20%_10%,rgba(255,255,255,0.95),rgba(255,255,255,0)_55%)] before:opacity-80",
                "after:absolute after:inset-[1px] after:rounded-full after:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_20px_rgba(0,0,0,0.06)] after:content-['']",
                "hover:-translate-y-[1px] hover:shadow-[0_18px_40px_-26px_rgba(0,0,0,0.45)]"
            )}
        >
            <span
                className={cx(
                    "pointer-events-none absolute -left-10 top-1/2 h-10 w-24 -translate-y-1/2 rotate-[18deg]",
                    "bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.65),transparent)] blur-[0.5px]",
                    "opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                )}
            />
            <span className="relative z-10 text-black/80 transition-colors group-hover:text-black">{children}</span>
        </a>
    );
}

function GlassCard({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}) {
    return (
        <section
            className={cx(
                "relative rounded-3xl border border-black/10 bg-white/[0.52] backdrop-blur-xl",
                "shadow-[0_30px_80px_-60px_rgba(0,0,0,0.55)]"
            )}
        >
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-90 bg-[radial-gradient(140%_120%_at_15%_0%,rgba(255,255,255,0.85),rgba(255,255,255,0)_55%),radial-gradient(130%_120%_at_85%_15%,rgba(255,255,255,0.55),rgba(255,255,255,0)_60%)]" />
            <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-18px_28px_rgba(0,0,0,0.06)]" />
            <div className="relative z-10 p-6 sm:p-7 md:p-8">
                <h2 className="text-xl font-semibold tracking-tight text-black md:text-2xl">{title}</h2>
                {subtitle ? <p className="mt-2 text-sm leading-6 text-black/70">{subtitle}</p> : null}
                <div className="mt-5 text-sm leading-6 text-black/75">{children}</div>
            </div>
        </section>
    );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
    return <div className="text-xs font-semibold text-black/70">{children}</div>;
}

function InputBase(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={cx(
                "mt-1 w-full rounded-2xl border border-black/10 bg-white/[0.65] px-4 py-3 text-sm text-black/85",
                "outline-none backdrop-blur",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-12px_22px_rgba(0,0,0,0.06)]",
                "focus:border-black/20 focus:ring-2 focus:ring-black/10"
            )}
        />
    );
}

function TextAreaBase(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            className={cx(
                "mt-1 min-h-[140px] w-full resize-y rounded-2xl border border-black/10 bg-white/[0.65] px-4 py-3 text-sm text-black/85",
                "outline-none backdrop-blur",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-12px_22px_rgba(0,0,0,0.06)]",
                "focus:border-black/20 focus:ring-2 focus:ring-black/10"
            )}
        />
    );
}

function SelectBase(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select
            {...props}
            className={cx(
                "mt-1 w-full rounded-2xl border border-black/10 bg-white/[0.65] px-4 py-3 text-sm text-black/85",
                "outline-none backdrop-blur",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-12px_22px_rgba(0,0,0,0.06)]",
                "focus:border-black/20 focus:ring-2 focus:ring-black/10"
            )}
        />
    );
}

function PrimaryButton({
    children,
    disabled,
    onClick,
    type = "button",
}: {
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    type?: "button" | "submit";
}) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={cx(
                "group relative inline-flex w-full items-center justify-center overflow-hidden rounded-2xl px-5 py-3 text-sm font-semibold",
                "border border-black/10 bg-white/[0.65] backdrop-blur",
                "shadow-[0_18px_45px_-35px_rgba(0,0,0,0.55)]",
                "transition-transform duration-200 active:scale-[0.985]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
                disabled && "opacity-60 cursor-not-allowed"
            )}
        >
            <span className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-14px_26px_rgba(0,0,0,0.08)]" />
            <span className="pointer-events-none absolute -left-10 top-1/2 h-10 w-24 -translate-y-1/2 rotate-[18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            <span className="relative z-10 text-black/85">{children}</span>
        </button>
    );
}

function isEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function ContactPage() {
    const categories = useMemo(
        () => [
            "General Support",
            "Billing & Payments",
            "Safety Report",
            "Emergency Ride Coordination",
            "Corporate / Government",
            "Partner / Driver",
            "Legal / Compliance",
            "Press / Media",
            "Other",
        ],
        []
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [category, setCategory] = useState(categories[0]);
    const [message, setMessage] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<null | { ref: string; summary: string }>(null);

    const missing =
        !name.trim() ||
        !email.trim() ||
        !phone.trim() ||
        !subject.trim() ||
        !category.trim() ||
        !message.trim();

    const invalidEmail = email.trim().length > 0 && !isEmail(email);

    async function submit() {
        setError(null);
        setSuccess(null);

        if (missing) {
            setError("All fields are required.");
            return;
        }
        if (invalidEmail) {
            setError("Please enter a valid email address.");
            return;
        }
        if (message.trim().length < 20) {
            setError("Please provide a bit more detail (at least 20 characters).");
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    phone: phone.trim(),
                    subject: subject.trim(),
                    category,
                    message: message.trim(),
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data?.error || "Unable to send message. Please try again.");
            }

            setSuccess({
                ref: data.ref,
                summary: data.summary,
            });

            // reset form
            setName("");
            setEmail("");
            setPhone("");
            setSubject("");
            setCategory(categories[0]);
            setMessage("");
        } catch (e: any) {
            setError(e?.message || "Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="min-h-screen text-black">
            {/* Premium background */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_20%_0%,rgba(255,255,255,1),rgba(245,245,245,1)_45%,rgba(238,238,238,1)_100%)]" />
            <div className="fixed inset-0 -z-10 opacity-70 bg-[radial-gradient(900px_520px_at_85%_10%,rgba(255,255,255,0.9),rgba(255,255,255,0)_55%)]" />
            <div className="fixed inset-0 -z-10 opacity-25 bg-[repeating-linear-gradient(160deg,rgba(0,0,0,0.035),rgba(0,0,0,0.035)_2px,transparent_2px,transparent_12px)]" />

            <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 md:px-8 md:pt-14">
                <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white/[0.60] px-3 py-1 text-[11px] font-semibold text-black/60 backdrop-blur">
                            <span className="h-1.5 w-1.5 rounded-full bg-black/30" />
                            <span>Contact & Support</span>
                        </div>

                        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Contact 6Ride</h1>

                        <p className="mt-3 max-w-3xl text-sm leading-6 text-black/70">
                            This page is the official channel to reach 6Ride for support, billing, safety reports, corporate/government inquiries, and partner onboarding.
                            For emergencies, use the correct local emergency number first if the situation is life-threatening.
                        </p>

                        <div className="mt-4 grid gap-3 md:grid-cols-3">
                            <div className="rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur shadow-[0_18px_45px_-40px_rgba(0,0,0,0.5)]">
                                <div className="text-xs font-semibold text-black/60">Response routing</div>
                                <div className="mt-1 text-sm text-black/75">Choose a category so your message reaches the right team faster.</div>
                            </div>
                            <div className="rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur shadow-[0_18px_45px_-40px_rgba(0,0,0,0.5)]">
                                <div className="text-xs font-semibold text-black/60">Compliance notice</div>
                                <div className="mt-1 text-sm text-black/75">Illegal or abusive requests may be reported where required by law.</div>
                            </div>
                            <div className="rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur shadow-[0_18px_45px_-40px_rgba(0,0,0,0.5)]">
                                <div className="text-xs font-semibold text-black/60">Confirmation</div>
                                <div className="mt-1 text-sm text-black/75">We email you a summary and reference ID after submission.</div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_420px]">
                    <GlassCard
                        title="Send a message"
                        subtitle="All fields are required. Provide accurate contact details so we can respond."
                    >
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                submit();
                            }}
                            className="mt-2 grid gap-4"
                        >
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <FieldLabel>Full name</FieldLabel>
                                    <InputBase value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" />
                                </div>
                                <div>
                                    <FieldLabel>Email</FieldLabel>
                                    <InputBase value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
                                    {invalidEmail ? <div className="mt-1 text-xs text-black/55">Enter a valid email address.</div> : null}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <FieldLabel>Phone</FieldLabel>
                                    <InputBase value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234…" autoComplete="tel" />
                                </div>
                                <div>
                                    <FieldLabel>Category</FieldLabel>
                                    <SelectBase value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map((c) => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </SelectBase>
                                </div>
                            </div>

                            <div>
                                <FieldLabel>Subject</FieldLabel>
                                <InputBase value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Short summary of your issue" />
                            </div>

                            <div>
                                <FieldLabel>Message</FieldLabel>
                                <TextAreaBase value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Explain what happened, include trip/order IDs if applicable." />
                                <div className="mt-2 text-xs text-black/55">
                                    Tip: include any relevant IDs, dates, city, and what outcome you want (refund, review, partnership call, etc.).
                                </div>
                            </div>

                            {error ? (
                                <div className="rounded-2xl border border-black/10 bg-white/[0.55] p-4 text-sm text-black/75">
                                    <div className="font-semibold text-black/85">Unable to send</div>
                                    <div className="mt-1">{error}</div>
                                </div>
                            ) : null}

                            {success ? (
                                <div className="rounded-2xl border border-black/10 bg-white/[0.55] p-4 text-sm text-black/75">
                                    <div className="font-semibold text-black/85">Message sent</div>
                                    <div className="mt-1">Reference ID: <span className="font-semibold">{success.ref}</span></div>
                                    <div className="mt-2 text-xs text-black/60">{success.summary}</div>
                                </div>
                            ) : null}

                            <PrimaryButton disabled={submitting || missing || invalidEmail} type="submit">
                                {submitting ? "Sending…" : "Send message"}
                            </PrimaryButton>

                            <div className="text-xs text-black/55">
                                By contacting us, you agree you will not use support channels for unlawful requests, harassment, or abuse.
                                Messages may be reviewed for safety and compliance, and may be escalated where required by law.
                            </div>
                        </form>
                    </GlassCard>

                    <div className="space-y-6">
                        <GlassCard
                            title="What happens after you submit"
                            subtitle="A premium workflow designed for accountability and fast triage."
                        >
                            <ol className="space-y-3 text-sm text-black/70">
                                <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/30" />Your message is securely saved with a reference ID.</li>
                                <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/30" />Support receives the full details for action.</li>
                                <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/30" />You receive a confirmation email summary for your records.</li>
                                <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/30" />High-risk content may be flagged for compliance review.</li>
                            </ol>
                        </GlassCard>

                        <GlassCard
                            title="Emergency guidance"
                            subtitle="Clear boundaries: 6Ride is not a hospital or emergency agency."
                        >
                            <div className="text-sm text-black/70">
                                If a situation is life-threatening, contact your local emergency number first.
                                For emergency ride coordination questions (eligible members/subscribed users), use the official channel.
                            </div>
                            <div className="mt-4 rounded-2xl border border-black/10 bg-white/[0.55] p-4 text-sm text-black/70">
                                Emergency coordination: <span className="font-semibold text-black/85">Use the Emergency category</span> in the form.
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>

            {/* FOOTER + POLICIES */}
            <footer className="border-t border-black/10 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
                    <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-center text-[12px] font-semibold text-black/70">
                        <Link href="/policies/terms" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                            Terms of Service
                        </Link>
                        <Link href="/policies/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                            Privacy Policy
                        </Link>
                        <Link href="/policies/acceptable-use" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                            Acceptable Use
                        </Link>
                        <Link href="/policies/safety" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                            Safety Guidelines
                        </Link>
                        <Link href="/policies/refunds" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                            Refund & Cancellation
                        </Link>
                        <Link href="/policies/subscription-billing" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                            Subscription & Billing
                        </Link>
                        <Link href="/policies/partner-terms" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                            Partner Terms
                        </Link>
                        <Link href="/policies/emergency" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                            Emergency Disclaimer
                        </Link>
                        <Link href="/policies/contact" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                            Contact
                        </Link>
                        <Link href="/policies/child-student-safety" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                            Child & Student Safety
                        </Link>
                        <Link href="/policies/insurance-liability" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                            Insurance & Liability
                        </Link>
                        <Link href="/policies/corporate-sla" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                            Corporate SLA
                        </Link>
                    </div>

                    <div className="mt-8 text-center text-xs text-black/50">
                        © {new Date().getFullYear()} 6Rides. A 6Clement Joshua Service. All rights reserved.
                    </div>
                </div>
            </footer>

        </main>
    );
}
