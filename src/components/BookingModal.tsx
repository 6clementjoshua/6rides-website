// components/BookingModal.tsx
"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { BOOKING_VEHICLES, type BookingVehicle } from "@/lib/bookingVehicles";

const easeOut = [0.16, 1, 0.3, 1] as const;

type Step = "booking" | "result" | "schedule_gate" | "schedule_form" | "schedule_result";

function cx(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}

function toLatLngString(pos: GeolocationPosition) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
}

export default function BookingModal({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const cars = BOOKING_VEHICLES;

    const [selectedId, setSelectedId] = useState(cars[0]?.id ?? "");
    const selected = useMemo<BookingVehicle | undefined>(
        () => cars.find((c) => c.id === selectedId) ?? cars[0],
        [cars, selectedId]
    );

    const [step, setStep] = useState<Step>("booking");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pickup, setPickup] = useState("");
    const [dropoff, setDropoff] = useState("");
    const [notes, setNotes] = useState("");

    const [geoBusy, setGeoBusy] = useState(false);
    const [busy, setBusy] = useState(false);

    const [resultMsg, setResultMsg] = useState("");
    const [attemptId, setAttemptId] = useState<string | null>(null);

    // schedule gating
    const [driverName, setDriverName] = useState("");
    const [lastRideDate, setLastRideDate] = useState("");
    const [lastRideCity, setLastRideCity] = useState("");
    const [scheduleResult, setScheduleResult] = useState("");

    function resetAll() {
        setStep("booking");
        setBusy(false);
        setGeoBusy(false);
        setResultMsg("");
        setAttemptId(null);
        setDriverName("");
        setLastRideDate("");
        setLastRideCity("");
        setScheduleResult("");
    }

    function close() {
        onClose();
        setTimeout(() => resetAll(), 250);
    }

    async function detectLocation() {
        if (!navigator.geolocation) return;
        setGeoBusy(true);

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPickup(toLatLngString(pos));
                setGeoBusy(false);
            },
            () => setGeoBusy(false),
            { enableHighAccuracy: true, timeout: 12000 }
        );
    }

    async function submitBooking() {
        if (!selected) return;

        if (!name.trim() || !email.trim()) {
            setResultMsg("Please enter your name and email to continue.");
            setStep("result");
            return;
        }

        setBusy(true);

        try {
            const res = await fetch("/api/bookings/attempt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    pickup_location: pickup,
                    dropoff_location: dropoff,
                    notes,
                    vehicle_id: selected.id,
                }),
            });

            const data = await res.json().catch(() => ({}));

            const message =
                data?.availability_message ??
                `Hello ${name}. Sorry, this ride is in use. ${selected.name} is currently unavailable due to high demand and ongoing orders. Please try other rides and do well to book early next time. Thank you — 6Rides.`;

            setAttemptId(data?.attempt_id ?? null);
            setResultMsg(message);
            setStep("result");
        } catch {
            setResultMsg("We received your request, but something went wrong sending confirmation. Please try again.");
            setStep("result");
        } finally {
            setBusy(false);
        }
    }

    function openSchedule() {
        setStep("schedule_gate");
    }

    function scheduleAnswer(answer: "yes" | "no") {
        if (answer === "no") {
            setScheduleResult(
                "Scheduling is reserved for returning customers. New customers can only book a ride. Thank you — 6Rides."
            );
            setStep("schedule_result");
            return;
        }
        setStep("schedule_form");
    }

    function submitScheduleForm() {
        // Always NOT FOUND per your rule.
        setScheduleResult(
            "Not found. We could not verify your past ride history at this time. Scheduling is unavailable right now. This verification helps us serve returning customers properly. Thank you — 6Rides."
        );
        setStep("schedule_result");
    }

    const overlay = "fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm";
    const modalShell =
        "relative mx-auto w-[min(980px,94vw)] rounded-3xl border border-white/18 bg-black/55 text-white shadow-[0_30px_110px_rgba(0,0,0,.65)] overflow-hidden";
    const glassInner =
        "rounded-3xl border border-white/10 bg-white/6 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,.08)]";

    const field =
        "mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/25";
    const label = "text-[12px] font-semibold text-white/70";

    const btnSolid =
        "rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-60";
    const btnOutline =
        "rounded-full border border-white/18 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/10 disabled:opacity-60";

    return (
        <AnimatePresence>
            {open ? (
                <motion.div className={overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex min-h-screen items-center justify-center px-4 py-10">
                        <motion.div
                            className={modalShell}
                            initial={{ opacity: 0, y: 18, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 18, scale: 0.98 }}
                            transition={{ duration: 0.45, ease: easeOut }}
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="pointer-events-none absolute inset-0">
                                <div className="absolute -top-24 left-[-20%] h-[260px] w-[260px] rounded-full bg-white/12 blur-[60px]" />
                                <div className="absolute -bottom-28 right-[-10%] h-[320px] w-[320px] rounded-full bg-white/10 blur-[70px]" />
                                <div className="absolute inset-0 opacity-[0.22]">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.18),transparent_38%),radial-gradient(circle_at_80%_60%,rgba(255,255,255,.14),transparent_40%)]" />
                                </div>
                                <div className="absolute -left-1/3 top-0 h-full w-1/2 rotate-12 bg-white/12 blur-3xl opacity-40" />
                            </div>

                            <div className={cx("relative p-4 md:p-6", glassInner)}>
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <Image src="/6logo.PNG" alt="6Rides" width={38} height={38} className="h-10 w-10 rounded-2xl bg-white p-2" />
                                        <div>
                                            <div className="text-sm font-semibold text-white/80">6Rides</div>
                                            <div className="text-lg font-semibold">Booking</div>
                                        </div>
                                    </div>

                                    <button onClick={close} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:border-white/30">
                                        Close
                                    </button>
                                </div>

                                <div className="mt-5 grid gap-6 md:grid-cols-[1fr_360px]">
                                    {/* Left: selector + preview */}
                                    <div className="rounded-3xl border border-white/10 bg-black/35 p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm font-semibold text-white/85">Select a vehicle</div>
                                            <div className="text-xs text-white/55">
                                                {selected?.priceLabel}{" "}
                                                <span className="text-white/35">•</span>{" "}
                                                <span className="text-white/60">{selected?.badge ?? ""}</span>
                                            </div>
                                        </div>

                                        <div className="mt-3 grid gap-3 md:grid-cols-2">
                                            <div className="space-y-2">
                                                {cars.map((c) => {
                                                    const active = c.id === selectedId;
                                                    return (
                                                        <button
                                                            key={c.id}
                                                            type="button"
                                                            onClick={() => setSelectedId(c.id)}
                                                            className={cx(
                                                                "w-full rounded-2xl border px-3 py-3 text-left transition",
                                                                active ? "border-white/35 bg-white/10" : "border-white/10 bg-white/5 hover:border-white/20"
                                                            )}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="relative h-11 w-14 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                                                                    {/* transparent PNGs look best with contain */}
                                                                    <Image src={c.image} alt={c.name} fill className="object-contain p-1" />
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <div className="truncate text-sm font-semibold">{c.name}</div>
                                                                    <div className="mt-0.5 text-xs text-white/60">{c.priceLabel}</div>
                                                                </div>
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                                                <AnimatePresence mode="wait">
                                                    <motion.div
                                                        key={selected?.id}
                                                        initial={{ x: 220, opacity: 0.0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        exit={{ x: -220, opacity: 0.0 }}
                                                        transition={{ duration: 0.32, ease: easeOut }}
                                                        className="relative h-[260px] w-full"
                                                    >
                                                        {selected ? (
                                                            <>
                                                                <div className="absolute inset-0">
                                                                    <Image src={selected.image} alt={selected.name} fill className="object-contain p-6" />
                                                                </div>
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                                                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                                                    <div className="text-sm font-semibold">{selected.name}</div>
                                                                    <div className="text-xs text-white/70">
                                                                        {selected.priceLabel} • {selected.badge ?? "Premium"}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : null}
                                                    </motion.div>
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: form + flow */}
                                    <div className="rounded-3xl border border-white/10 bg-black/35 p-4">
                                        {step === "booking" ? (
                                            <>
                                                <div className="text-sm font-semibold text-white/85">Booking information</div>

                                                <div className="mt-4 grid gap-4">
                                                    <div>
                                                        <div className={label}>Full name</div>
                                                        <input value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="Your name" />
                                                    </div>

                                                    <div>
                                                        <div className={label}>Email</div>
                                                        <input value={email} onChange={(e) => setEmail(e.target.value)} className={field} placeholder="you@email.com" />
                                                    </div>

                                                    <div>
                                                        <div className={label}>Phone (optional)</div>
                                                        <input value={phone} onChange={(e) => setPhone(e.target.value)} className={field} placeholder="+234..." />
                                                    </div>

                                                    <div>
                                                        <div className={label}>Pickup location</div>
                                                        <div className="mt-2 flex gap-2">
                                                            <button type="button" onClick={detectLocation} disabled={geoBusy} className={btnOutline}>
                                                                {geoBusy ? "Detecting..." : "Use my location"}
                                                            </button>
                                                            <input
                                                                value={pickup}
                                                                onChange={(e) => setPickup(e.target.value)}
                                                                className={cx(field, "mt-0 flex-1")}
                                                                placeholder="Enter pickup area (or coordinates)"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className={label}>Destination (optional)</div>
                                                        <input value={dropoff} onChange={(e) => setDropoff(e.target.value)} className={field} placeholder="Where to?" />
                                                    </div>

                                                    <div>
                                                        <div className={label}>Notes (optional)</div>
                                                        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className={cx(field, "min-h-[96px]")} placeholder="Any extra detail..." />
                                                    </div>
                                                </div>

                                                <div className="mt-5 flex flex-wrap gap-3">
                                                    <button type="button" onClick={submitBooking} disabled={busy} className={btnSolid}>
                                                        {busy ? "Submitting..." : "Book"}
                                                    </button>
                                                    <button type="button" onClick={openSchedule} className={btnOutline}>
                                                        Schedule a trip
                                                    </button>
                                                </div>

                                                <div className="mt-4 text-xs text-white/55">
                                                    You’ll receive a branded email summary (vehicle image + price + locations) with a subscribe button for availability updates.
                                                </div>
                                            </>
                                        ) : null}

                                        {step === "result" ? (
                                            <>
                                                <div className="text-sm font-semibold text-white/85">Result</div>
                                                <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white/80">
                                                    {resultMsg}
                                                </div>

                                                <div className="mt-4 text-xs text-white/55">
                                                    We emailed your full request summary. Reference:{" "}
                                                    <span className="font-semibold text-white/75">{attemptId ?? "—"}</span>
                                                </div>

                                                <div className="mt-5 flex flex-wrap gap-3">
                                                    <button type="button" className={btnOutline} onClick={() => setStep("booking")}>
                                                        Try another vehicle
                                                    </button>
                                                    <button type="button" className={btnSolid} onClick={close}>
                                                        Done
                                                    </button>
                                                </div>
                                            </>
                                        ) : null}

                                        {step === "schedule_gate" ? (
                                            <>
                                                <div className="text-sm font-semibold text-white/85">Schedule a trip</div>
                                                <div className="mt-3 text-sm text-white/75 leading-relaxed">
                                                    Have you ridden with 6Rides before? Scheduling is only available for returning customers.
                                                </div>

                                                <div className="mt-4 flex gap-3">
                                                    <button type="button" className={btnSolid} onClick={() => scheduleAnswer("yes")}>
                                                        Yes
                                                    </button>
                                                    <button type="button" className={btnOutline} onClick={() => scheduleAnswer("no")}>
                                                        No
                                                    </button>
                                                </div>
                                            </>
                                        ) : null}

                                        {step === "schedule_form" ? (
                                            <>
                                                <div className="text-sm font-semibold text-white/85">Returning customer verification</div>
                                                <div className="mt-3 text-xs text-white/60 leading-relaxed">
                                                    This questionnaire helps us verify past patronage so we can serve returning customers properly. Only verified customers can schedule.
                                                </div>

                                                <div className="mt-4 grid gap-4">
                                                    <div>
                                                        <div className={label}>Driver’s name (required)</div>
                                                        <input value={driverName} onChange={(e) => setDriverName(e.target.value)} className={field} placeholder="Driver name you rode with" />
                                                    </div>

                                                    <div>
                                                        <div className={label}>Approx ride date (optional)</div>
                                                        <input value={lastRideDate} onChange={(e) => setLastRideDate(e.target.value)} className={field} placeholder="e.g., 2025-12-10" />
                                                    </div>

                                                    <div>
                                                        <div className={label}>City (optional)</div>
                                                        <input value={lastRideCity} onChange={(e) => setLastRideCity(e.target.value)} className={field} placeholder="e.g., Calabar" />
                                                    </div>
                                                </div>

                                                <div className="mt-5 flex flex-wrap gap-3">
                                                    <button type="button" className={btnSolid} onClick={submitScheduleForm} disabled={!driverName.trim()}>
                                                        Verify & continue
                                                    </button>
                                                    <button type="button" className={btnOutline} onClick={() => setStep("booking")}>
                                                        Back
                                                    </button>
                                                </div>
                                            </>
                                        ) : null}

                                        {step === "schedule_result" ? (
                                            <>
                                                <div className="text-sm font-semibold text-white/85">Verification result</div>
                                                <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white/70">
                                                    <span className="text-white/45">{scheduleResult}</span>
                                                </div>

                                                <div className="mt-5 flex flex-wrap gap-3">
                                                    <button type="button" className={btnOutline} onClick={() => setStep("booking")}>
                                                        Back to booking
                                                    </button>
                                                    <button type="button" className={btnSolid} onClick={close}>
                                                        Done
                                                    </button>
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
