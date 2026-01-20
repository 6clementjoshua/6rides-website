// components/BookingModal.tsx
"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { BOOKING_VEHICLES, type BookingVehicle } from "@/lib/bookingVehicles";

const easeOut = [0.16, 1, 0.3, 1] as const;

type Step =
    | "booking"
    | "result"
    | "schedule_gate"
    | "schedule_form"
    | "schedule_result";

function cx(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}

function toLatLngString(pos: GeolocationPosition) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
}

// ---------------- Benefits rules (price-accurate) ----------------
// Uses vehicle.priceNgn from src/lib/bookingVehicles.ts
//
// ALL vehicles:
// - Free water
// - Food voucher (>=200k => 4 vouchers)
//
// ONLY 600k+ vehicles:
// - Membership card (tier by price)
// - Designer bag
// - Designer shoes
// - Luxury wine
// - Android phone
// - 1-day shopping spree
//
// Standard extras are randomized (stable by vehicle uid) but scaled by value.

function membershipTierByPrice(priceNgn: number) {
    if (priceNgn >= 1_200_000) return "Platinum"; // e.g. Urus 1.6m
    if (priceNgn >= 900_000) return "Gold"; // Cyber Truck 950k
    if (priceNgn >= 600_000) return "Silver"; // G-wagon 800k
    return "—";
}

// stable “random” per vehicle uid
function hashSeed(input: string) {
    let h = 2166136261;
    for (let i = 0; i < input.length; i++) {
        h ^= input.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

function seededPick<T>(seed: number, arr: T[], count: number) {
    const out: T[] = [];
    const pool = [...arr];
    let s = seed >>> 0;

    const next = () => {
        // xorshift32
        s ^= s << 13;
        s ^= s >>> 17;
        s ^= s << 5;
        return (s >>> 0) / 4294967296;
    };

    while (out.length < count && pool.length) {
        const idx = Math.floor(next() * pool.length);
        out.push(pool.splice(idx, 1)[0]);
    }
    return out;
}

function buildBenefits(vehicle: BookingVehicle) {
    const price = vehicle.priceNgn ?? 200_000;
    const seed = hashSeed(vehicle.uid || vehicle.name || "6ride");

    const is200kPlus = price >= 200_000;
    const is600kPlus = price >= 600_000;

    const benefits: string[] = [];

    // Required for all
    benefits.push("Free water");
    benefits.push(is200kPlus ? "4× free food vouchers" : "Free food voucher");

    // Standard pool (allowed for all vehicles)
    const standardExtrasPool = [
        "Key holder",
        "Face towel",
        "Umbrella",
        "Designer T-shirt",
        "Surprise bag pack",
        "School bag",
        "Wallet",
    ];

    // Value-scaled standard extras count
    const standardCount = price >= 500_000 ? 6 : price >= 300_000 ? 5 : 4;
    benefits.push(...seededPick(seed, standardExtrasPool, standardCount));

    // Premium-only perks (STRICTLY 600k+)
    if (is600kPlus) {
        const tier = membershipTierByPrice(price);
        benefits.push(`6 Clement Joshua Membership — ${tier}`);

        // Premium fixed gifts you requested
        benefits.push("Designer bag");
        benefits.push("Designer shoes");
        benefits.push("Luxury wine (1 bottle)");
        benefits.push("Android phone");
        benefits.push("1-day shopping spree");
    }

    // De-dupe and return
    return Array.from(new Set(benefits));
}

export default function BookingModal({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const cars = BOOKING_VEHICLES;

    const [selectedUid, setSelectedUid] = useState(cars[0]?.uid ?? "");
    const selected = useMemo<BookingVehicle | undefined>(
        () => cars.find((c) => c.uid === selectedUid) ?? cars[0],
        [cars, selectedUid]
    );

    const selectedBenefits = useMemo(
        () => (selected ? buildBenefits(selected) : []),
        [selected]
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
        if (typeof window !== "undefined") {
            const isSecure = window.isSecureContext;
            if (!isSecure) {
                setResultMsg(
                    "Location needs HTTPS (or localhost). Please open the site on https:// and try again."
                );
                setStep("result");
                return;
            }
        }

        if (!navigator.geolocation) {
            setResultMsg("Geolocation is not supported on this device/browser.");
            setStep("result");
            return;
        }

        setGeoBusy(true);

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPickup(toLatLngString(pos));
                setGeoBusy(false);
            },
            (err) => {
                const msg =
                    err.code === err.PERMISSION_DENIED
                        ? "Location permission denied. Please allow location access in your browser settings."
                        : err.code === err.POSITION_UNAVAILABLE
                            ? "Location unavailable. Please turn on GPS/location services and try again."
                            : "Location request timed out. Please try again.";

                setResultMsg(msg);
                setStep("result");
                setGeoBusy(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
    }

    const isFormValid =
        !!selected &&
        name.trim().length > 0 &&
        email.trim().length > 0 &&
        pickup.trim().length > 0 &&
        dropoff.trim().length > 0;

    async function submitBooking() {
        if (!selected) return;

        if (!isFormValid) {
            setResultMsg(
                "Please complete all required fields: Name, Email, Pickup location, and Destination."
            );
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
                    vehicle_id: selected.baseId,
                }),
            });

            const data = await res.json().catch(() => ({}));

            const message =
                data?.availability_message ??
                `Hello ${name}. Sorry, this ride is in use. ${selected.name} is currently unavailable due to high demand and ongoing orders. Please try other rides and do well to book early next time. Thank you — 6Ride.`;

            setAttemptId(data?.attempt_id ?? null);
            setResultMsg(message);
            setStep("result");
        } catch {
            setResultMsg(
                "We received your request, but something went wrong sending confirmation. Please try again."
            );
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
                "Scheduling is reserved for returning customers. New customers can only book a ride. Thank you — 6Ride."
            );
            setStep("schedule_result");
            return;
        }
        setStep("schedule_form");
    }

    function submitScheduleForm() {
        setScheduleResult(
            "Not found. We could not verify your past ride history at this time. Scheduling is unavailable right now. This verification helps us serve returning customers properly. Thank you — 6Ride."
        );
        setStep("schedule_result");
    }

    const overlay = "fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm";

    const modalShell =
        "relative mx-auto w-full max-w-[980px] max-h-[calc(100vh-48px)] rounded-3xl border border-white/18 bg-black/55 text-white shadow-[0_30px_110px_rgba(0,0,0,.65)] overflow-hidden";

    const glassInner =
        "rounded-3xl border border-white/10 bg-white/6 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,.08)]";

    const field =
        "mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/25";
    const label = "text-[12px] font-semibold text-white/70";

    const btnSolid =
        "rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-60";
    const btnOutline =
        "rounded-full border border-white/18 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/10 disabled:opacity-60";

    return (
        <AnimatePresence>
            {open ? (
                <motion.div
                    className={overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto px-4 py-10">
                        <div className="flex min-h-[calc(100vh-80px)] items-start justify-center md:items-center">
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

                                <div className={cx("relative", glassInner)}>
                                    <div className="six-scroll max-h-[calc(100vh-48px)] overflow-x-hidden overflow-y-auto p-4 md:p-6">
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <Image
                                                    src="/6logo.PNG"
                                                    alt="6Ride"
                                                    width={38}
                                                    height={38}
                                                    className="h-10 w-10 rounded-2xl bg-white p-2"
                                                />
                                                <div className="min-w-0">
                                                    <div className="text-sm font-semibold text-white/80">
                                                        6Ride
                                                    </div>
                                                    <div className="text-lg font-semibold">Booking</div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={close}
                                                className="shrink-0 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:border-white/30"
                                            >
                                                Close
                                            </button>
                                        </div>

                                        <div className="mt-5 grid gap-6 md:grid-cols-[1fr_360px]">
                                            {/* Left: selector */}
                                            <div className="min-w-0 rounded-3xl border border-white/10 bg-black p-4 overflow-x-hidden">
                                                <div className="flex items-center justify-between gap-3">
                                                    <div className="text-sm font-semibold text-white/85">
                                                        Select a vehicle
                                                    </div>

                                                    <div className="hidden sm:block text-xs text-white/55 text-right">
                                                        {selected?.priceLabel}{" "}
                                                        <span className="text-white/35">•</span>{" "}
                                                        <span className="text-white/60">
                                                            {selected?.badge ?? ""}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="six-scroll mt-3 max-h-[520px] overflow-y-auto overflow-x-hidden pr-1">
                                                    <div className="space-y-2">
                                                        {cars.map((c) => {
                                                            const active = c.uid === selectedUid;

                                                            return (
                                                                <div
                                                                    key={c.uid}
                                                                    className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setSelectedUid(c.uid)}
                                                                        className={cx(
                                                                            "w-full rounded-2xl px-3 py-3 text-left transition",
                                                                            active ? "bg-white/10" : "hover:bg-white/7"
                                                                        )}
                                                                    >
                                                                        <div className="flex items-center gap-3 min-w-0">
                                                                            <div className="relative h-11 w-14 overflow-hidden rounded-xl border border-white/10 bg-black shrink-0">
                                                                                <Image
                                                                                    src={c.image}
                                                                                    alt={c.name}
                                                                                    fill
                                                                                    className="object-contain p-1"
                                                                                />
                                                                            </div>

                                                                            <div className="min-w-0 flex-1">
                                                                                <div className="truncate text-sm font-semibold text-white/90">
                                                                                    {c.name}
                                                                                </div>
                                                                                <div className="mt-0.5 text-xs text-white/60 truncate">
                                                                                    {c.priceLabel}{" "}
                                                                                    <span className="text-white/35">•</span>{" "}
                                                                                    {c.badge ?? "Premium"}
                                                                                </div>
                                                                            </div>

                                                                            <div
                                                                                className={cx(
                                                                                    "shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold",
                                                                                    active
                                                                                        ? "border-white/25 bg-white/10 text-white/80"
                                                                                        : "border-white/10 bg-white/5 text-white/55"
                                                                                )}
                                                                            >
                                                                                {c.badge ?? "Premium"}
                                                                            </div>
                                                                        </div>
                                                                    </button>

                                                                    <AnimatePresence initial={false}>
                                                                        {active ? (
                                                                            <motion.div
                                                                                key={`preview-${c.uid}`}
                                                                                initial={{ height: 0, opacity: 0 }}
                                                                                animate={{ height: "auto", opacity: 1 }}
                                                                                exit={{ height: 0, opacity: 0 }}
                                                                                transition={{
                                                                                    duration: 0.28,
                                                                                    ease: easeOut,
                                                                                }}
                                                                                className="overflow-hidden"
                                                                            >
                                                                                <div className="border-t border-white/10 bg-black/60 p-3">
                                                                                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
                                                                                        <div className="relative h-[210px] w-full">
                                                                                            <Image
                                                                                                src={c.image}
                                                                                                alt={c.name}
                                                                                                fill
                                                                                                className="object-contain p-5"
                                                                                            />
                                                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                                                                            <div className="absolute bottom-0 left-0 right-0 p-3">
                                                                                                <div className="text-sm font-semibold text-white">
                                                                                                    {c.name}
                                                                                                </div>
                                                                                                <div className="text-xs text-white/70">
                                                                                                    {c.priceLabel} •{" "}
                                                                                                    {c.badge ?? "Premium"}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                        {/* Passenger benefits sits under the selected car (mobile-friendly) */}
                                                                                        <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3 overflow-x-hidden">
                                                                                            <div className="text-[12px] font-semibold text-white/75">
                                                                                                Passenger benefits
                                                                                            </div>

                                                                                            <div className="mt-2 flex flex-wrap gap-2">
                                                                                                {buildBenefits(c).map((b) => (
                                                                                                    <span
                                                                                                        key={b}
                                                                                                        className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[11px] font-semibold text-white/75"
                                                                                                    >
                                                                                                        {b}
                                                                                                    </span>
                                                                                                ))}
                                                                                            </div>

                                                                                            <div className="mt-2 text-[11px] text-white/45 leading-relaxed">
                                                                                                Benefits vary by vehicle value.
                                                                                                Membership and premium gifts are
                                                                                                available only on 600k+ bookings.
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </motion.div>
                                                                        ) : null}
                                                                    </AnimatePresence>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right: form */}
                                            <div className="min-w-0 rounded-3xl border border-white/10 bg-black/35 p-4 overflow-x-hidden">
                                                {step === "booking" ? (
                                                    <>
                                                        <div className="text-sm font-semibold text-white/85">
                                                            Booking information
                                                        </div>

                                                        <div className="mt-4 grid gap-4">
                                                            <div>
                                                                <div className={label}>Full name *</div>
                                                                <input
                                                                    value={name}
                                                                    onChange={(e) => setName(e.target.value)}
                                                                    className={field}
                                                                    placeholder="Your name"
                                                                />
                                                            </div>

                                                            <div>
                                                                <div className={label}>Email *</div>
                                                                <input
                                                                    value={email}
                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                    className={field}
                                                                    placeholder="you@email.com"
                                                                />
                                                            </div>

                                                            <div>
                                                                <div className={label}>Phone (optional)</div>
                                                                <input
                                                                    value={phone}
                                                                    onChange={(e) => setPhone(e.target.value)}
                                                                    className={field}
                                                                    placeholder="+234..."
                                                                />
                                                            </div>

                                                            <div>
                                                                <div className={label}>Pickup location *</div>
                                                                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                                                                    <button
                                                                        type="button"
                                                                        onClick={detectLocation}
                                                                        disabled={geoBusy}
                                                                        className={cx(btnOutline, "w-full sm:w-auto")}
                                                                    >
                                                                        {geoBusy ? "Detecting..." : "Use my location"}
                                                                    </button>

                                                                    <input
                                                                        value={pickup}
                                                                        onChange={(e) => setPickup(e.target.value)}
                                                                        className={cx(field, "mt-0 w-full sm:flex-1")}
                                                                        placeholder="Enter pickup area (or coordinates)"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <div className={label}>Destination *</div>
                                                                <input
                                                                    value={dropoff}
                                                                    onChange={(e) => setDropoff(e.target.value)}
                                                                    className={field}
                                                                    placeholder="Where to?"
                                                                />
                                                            </div>

                                                            <div>
                                                                <div className={label}>Notes (optional)</div>
                                                                <textarea
                                                                    value={notes}
                                                                    onChange={(e) => setNotes(e.target.value)}
                                                                    className={cx(field, "min-h-[96px]")}
                                                                    placeholder="Any extra detail..."
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                                            <button
                                                                type="button"
                                                                onClick={submitBooking}
                                                                disabled={busy || !isFormValid}
                                                                className={cx(btnSolid, "w-full sm:w-auto")}
                                                            >
                                                                {busy ? "Submitting..." : "Book"}
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={openSchedule}
                                                                className={cx(btnOutline, "w-full sm:w-auto")}
                                                            >
                                                                Schedule a trip
                                                            </button>
                                                        </div>

                                                        <div className="mt-3 text-xs text-white/55">
                                                            Required fields: Name, Email, Pickup, Destination.
                                                        </div>
                                                    </>
                                                ) : null}

                                                {step === "result" ? (
                                                    <>
                                                        <div className="text-sm font-semibold text-white/85">
                                                            Result
                                                        </div>
                                                        <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white/80">
                                                            {resultMsg}
                                                        </div>

                                                        <div className="mt-4 text-xs text-white/55">
                                                            Reference:{" "}
                                                            <span className="font-semibold text-white/75">
                                                                {attemptId ?? "—"}
                                                            </span>
                                                        </div>

                                                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                                            <button
                                                                type="button"
                                                                className={cx(btnOutline, "w-full sm:w-auto")}
                                                                onClick={() => setStep("booking")}
                                                            >
                                                                Back to booking
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className={cx(btnSolid, "w-full sm:w-auto")}
                                                                onClick={close}
                                                            >
                                                                Done
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : null}

                                                {step === "schedule_gate" ? (
                                                    <>
                                                        <div className="text-sm font-semibold text-white/85">
                                                            Schedule a trip
                                                        </div>
                                                        <div className="mt-3 text-sm text-white/75 leading-relaxed">
                                                            Have you ridden with 6Ride before? Scheduling is
                                                            only available for returning customers.
                                                        </div>

                                                        <div className="mt-4 flex gap-3">
                                                            <button
                                                                type="button"
                                                                className={btnSolid}
                                                                onClick={() => scheduleAnswer("yes")}
                                                            >
                                                                Yes
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className={btnOutline}
                                                                onClick={() => scheduleAnswer("no")}
                                                            >
                                                                No
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : null}

                                                {step === "schedule_form" ? (
                                                    <>
                                                        <div className="text-sm font-semibold text-white/85">
                                                            Returning customer verification
                                                        </div>
                                                        <div className="mt-3 text-xs text-white/60 leading-relaxed">
                                                            This questionnaire helps us verify past patronage
                                                            so we can serve returning customers properly. Only
                                                            verified customers can schedule.
                                                        </div>

                                                        <div className="mt-4 grid gap-4">
                                                            <div>
                                                                <div className={label}>
                                                                    Driver’s name (required)
                                                                </div>
                                                                <input
                                                                    value={driverName}
                                                                    onChange={(e) =>
                                                                        setDriverName(e.target.value)
                                                                    }
                                                                    className={field}
                                                                    placeholder="Driver name you rode with"
                                                                />
                                                            </div>

                                                            <div>
                                                                <div className={label}>
                                                                    Approx ride date (optional)
                                                                </div>
                                                                <input
                                                                    value={lastRideDate}
                                                                    onChange={(e) =>
                                                                        setLastRideDate(e.target.value)
                                                                    }
                                                                    className={field}
                                                                    placeholder="e.g., 2025-12-10"
                                                                />
                                                            </div>

                                                            <div>
                                                                <div className={label}>City (optional)</div>
                                                                <input
                                                                    value={lastRideCity}
                                                                    onChange={(e) =>
                                                                        setLastRideCity(e.target.value)
                                                                    }
                                                                    className={field}
                                                                    placeholder="e.g., Calabar"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                                            <button
                                                                type="button"
                                                                className={cx(btnSolid, "w-full sm:w-auto")}
                                                                onClick={submitScheduleForm}
                                                                disabled={!driverName.trim()}
                                                            >
                                                                Verify & continue
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className={cx(btnOutline, "w-full sm:w-auto")}
                                                                onClick={() => setStep("booking")}
                                                            >
                                                                Back
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : null}

                                                {step === "schedule_result" ? (
                                                    <>
                                                        <div className="text-sm font-semibold text-white/85">
                                                            Verification result
                                                        </div>
                                                        <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white/70">
                                                            <span className="text-white/45">
                                                                {scheduleResult}
                                                            </span>
                                                        </div>

                                                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                                            <button
                                                                type="button"
                                                                className={cx(btnOutline, "w-full sm:w-auto")}
                                                                onClick={() => setStep("booking")}
                                                            >
                                                                Back to booking
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className={cx(btnSolid, "w-full sm:w-auto")}
                                                                onClick={close}
                                                            >
                                                                Done
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    <style jsx global>{`
            .six-scroll {
              scrollbar-width: thin;
              scrollbar-color: rgba(0, 0, 0, 0.95) rgba(255, 255, 255, 0.06);
            }
            .six-scroll::-webkit-scrollbar {
              width: 10px;
            }
            .six-scroll::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.06);
              border-radius: 999px;
            }
            .six-scroll::-webkit-scrollbar-thumb {
              background: rgba(0, 0, 0, 0.95);
              border-radius: 999px;
              border: 2px solid rgba(255, 255, 255, 0.06);
            }
            .six-scroll::-webkit-scrollbar-thumb:hover {
              background: rgba(0, 0, 0, 1);
            }
          `}</style>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
