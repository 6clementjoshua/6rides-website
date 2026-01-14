// src/app/partners/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

type Status = "idle" | "loading" | "success" | "error";
type VehicleClass = "Sedan" | "SUV" | "Special" | "Luxury" | "Executive" | "Armored" | "Delivery";

const HERO_SRC = "/images/6ride/partner/6ride_partner_vehicle_premium_female_cadillac.png";

function cx(...parts: Array<string | false | undefined | null>) {
    return parts.filter(Boolean).join(" ");
}

function isEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function GlassBg() {
    return (
        <>
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(1200px_700px_at_18%_0%,rgba(255,255,255,1),rgba(244,244,244,1)_45%,rgba(236,236,236,1)_100%)]" />
            <div className="fixed inset-0 -z-10 opacity-70 bg-[radial-gradient(900px_520px_at_86%_8%,rgba(255,255,255,0.95),rgba(255,255,255,0)_60%)]" />
            <div className="fixed inset-0 -z-10 opacity-20 bg-[repeating-linear-gradient(160deg,rgba(0,0,0,0.04),rgba(0,0,0,0.04)_2px,transparent_2px,transparent_13px)]" />
        </>
    );
}

function BevelChip({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            className={cx(
                "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-4 py-2 text-xs font-semibold",
                "border border-black/10 bg-white/[0.58] backdrop-blur-md",
                "shadow-[0_18px_45px_-35px_rgba(0,0,0,0.55)]",
                "transition-transform duration-200 active:scale-[0.985] hover:-translate-y-[1px]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
            )}
        >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(120%_120%_at_20%_10%,rgba(255,255,255,0.95),rgba(255,255,255,0)_55%)] opacity-80" />
            <span className="pointer-events-none absolute inset-[1px] rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-12px_24px_rgba(0,0,0,0.07)]" />
            <span className="pointer-events-none absolute -left-12 top-1/2 h-10 w-28 -translate-y-1/2 rotate-[18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.72),transparent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            <span className="relative z-10 text-black/75 transition-colors group-hover:text-black">{children}</span>
        </a>
    );
}

function GlassCard({
    title,
    subtitle,
    children,
    rightSlot,
    className,
}: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    rightSlot?: React.ReactNode;
    className?: string;
}) {
    return (
        <section
            className={cx(
                "relative rounded-3xl border border-black/10 bg-white/[0.55] backdrop-blur-xl",
                "shadow-[0_32px_90px_-70px_rgba(0,0,0,0.62)]",
                className
            )}
        >
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-95 bg-[radial-gradient(140%_120%_at_15%_0%,rgba(255,255,255,0.85),rgba(255,255,255,0)_55%),radial-gradient(120%_120%_at_85%_15%,rgba(255,255,255,0.55),rgba(255,255,255,0)_60%)]" />
            <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-18px_30px_rgba(0,0,0,0.07)]" />
            <div className="relative z-10 p-6 sm:p-7 md:p-8">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight text-black md:text-2xl">{title}</h2>
                        {subtitle ? <p className="mt-2 max-w-3xl text-sm leading-6 text-black/70">{subtitle}</p> : null}
                    </div>
                    {rightSlot ? <div className="hidden sm:block">{rightSlot}</div> : null}
                </div>
                <div className="mt-5 text-sm leading-6 text-black/75">{children}</div>
            </div>
        </section>
    );
}

function Hint({
    title,
    body,
    align = "right",
}: {
    title: string;
    body: string;
    align?: "left" | "right";
}) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative inline-flex items-center">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={cx(
                    "group inline-flex h-6 w-6 items-center justify-center rounded-full",
                    "border border-black/10 bg-white/[0.6] backdrop-blur",
                    "shadow-[0_14px_35px_-28px_rgba(0,0,0,0.6)]",
                    "transition-transform active:scale-[0.98] hover:-translate-y-[1px]",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                )}
                aria-label="Field help"
            >
                <span className="text-[12px] font-bold text-black/60 group-hover:text-black/80">i</span>
            </button>

            <AnimatePresence>
                {open ? (
                    <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: easeOut }}
                        className={cx(
                            "absolute top-8 z-30 w-[260px] rounded-2xl border border-black/10 bg-white/[0.72] p-4 backdrop-blur-xl",
                            "shadow-[0_28px_70px_-55px_rgba(0,0,0,0.7)]",
                            align === "right" ? "right-0" : "left-0"
                        )}
                    >
                        <div className="text-xs font-semibold text-black/75">{title}</div>
                        <div className="mt-1 text-xs leading-5 text-black/65">{body}</div>
                        <div className="mt-3 text-[11px] text-black/45">Tap the “i” again to close.</div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
}

function LabelRow({ label, hint }: { label: string; hint?: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <div className="text-xs font-semibold text-black/65">{label}</div>
            {hint ? hint : null}
        </div>
    );
}

function InputBase(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={cx(
                "mt-1 w-full rounded-2xl border border-black/10 bg-white/[0.66] px-4 py-3 text-sm text-black/85",
                "outline-none backdrop-blur",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-12px_22px_rgba(0,0,0,0.06)]",
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
                "mt-1 w-full rounded-2xl border border-black/10 bg-white/[0.66] px-4 py-3 text-sm text-black/85",
                "outline-none backdrop-blur",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-12px_22px_rgba(0,0,0,0.06)]",
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
                "mt-1 min-h-[120px] w-full resize-y rounded-2xl border border-black/10 bg-white/[0.66] px-4 py-3 text-sm text-black/85",
                "outline-none backdrop-blur",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-12px_22px_rgba(0,0,0,0.06)]",
                "focus:border-black/20 focus:ring-2 focus:ring-black/10"
            )}
        />
    );
}

function PrimaryButton({
    disabled,
    children,
    type = "button",
}: {
    disabled?: boolean;
    children: React.ReactNode;
    type?: "button" | "submit";
}) {
    return (
        <motion.button
            type={type}
            disabled={disabled}
            whileHover={disabled ? undefined : { y: -1 }}
            whileTap={disabled ? undefined : { scale: 0.985 }}
            className={cx(
                "group relative inline-flex w-full items-center justify-center overflow-hidden rounded-2xl px-5 py-3 text-sm font-semibold",
                "border border-black/10 bg-white/[0.68] backdrop-blur",
                "shadow-[0_18px_45px_-35px_rgba(0,0,0,0.55)]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
                disabled && "opacity-55 cursor-not-allowed"
            )}
        >
            <span className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-14px_26px_rgba(0,0,0,0.08)]" />
            <span className="pointer-events-none absolute -left-12 top-1/2 h-10 w-28 -translate-y-1/2 rotate-[18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            <span className="relative z-10 text-black/85">{children}</span>
        </motion.button>
    );
}

function StepPill({ n, title, body }: { n: string; title: string; body: string }) {
    return (
        <div className="rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur shadow-[0_18px_45px_-40px_rgba(0,0,0,0.55)]">
            <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white/[0.6] text-xs font-semibold text-black/65">
                    {n}
                </div>
                <div>
                    <div className="text-sm font-semibold text-black/80">{title}</div>
                    <div className="mt-1 text-sm text-black/65">{body}</div>
                </div>
            </div>
        </div>
    );
}

function InlinePolicyLinks() {
    return (
        <>
            <a className="underline decoration-black/25 hover:decoration-black/50" href="/policies/partner-terms" target="_blank" rel="noopener noreferrer">
                Partner Terms
            </a>
            {", "}
            <a className="underline decoration-black/25 hover:decoration-black/50" href="/policies/insurance-liability" target="_blank" rel="noopener noreferrer">
                Insurance & Liability
            </a>
            {", "}
            <a className="underline decoration-black/25 hover:decoration-black/50" href="/policies/safety" target="_blank" rel="noopener noreferrer">
                Safety Guidelines
            </a>
            {", "}
            <a className="underline decoration-black/25 hover:decoration-black/50" href="/policies/acceptable-use" target="_blank" rel="noopener noreferrer">
                Acceptable Use
            </a>
            {", "}
            <a className="underline decoration-black/25 hover:decoration-black/50" href="/policies/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
            </a>
            {", and "}
            <a className="underline decoration-black/25 hover:decoration-black/50" href="/policies/terms" target="_blank" rel="noopener noreferrer">
                Terms of Service
            </a>
            .
        </>
    );
}

export default function PartnersPage() {
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState("");

    // Partner basics
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");

    // Vehicle details
    const [vehicleClass, setVehicleClass] = useState<VehicleClass>("SUV");
    const [vehicleMake, setVehicleMake] = useState("");
    const [vehicleModel, setVehicleModel] = useState("");
    const [vehicleYear, setVehicleYear] = useState("");
    const [vehicleColor, setVehicleColor] = useState("");
    const [plateCountry, setPlateCountry] = useState("");
    const [plateNumber, setPlateNumber] = useState("");
    const [vin, setVin] = useState("");
    const [seatCount, setSeatCount] = useState("");
    const [transmission, setTransmission] = useState<"Automatic" | "Manual">("Automatic");
    const [fuelType, setFuelType] = useState<"Petrol" | "Diesel" | "Hybrid" | "Electric">("Petrol");
    const [odometerKm, setOdometerKm] = useState("");
    const [condition, setCondition] = useState<"Excellent" | "Good" | "Fair">("Excellent");

    // Compliance
    const [hasInsurance, setHasInsurance] = useState<"Yes" | "No" | "In Progress">("Yes");
    const [hasRegistration, setHasRegistration] = useState<"Yes" | "No" | "In Progress">("Yes");
    const [availableStartDate, setAvailableStartDate] = useState("");
    const [notes, setNotes] = useState("");

    // Agreement gate
    const [agree, setAgree] = useState(false);

    const emailOk = useMemo(() => email.trim().length > 0 && isEmail(email), [email]);

    const canSubmit = useMemo(() => {
        if (!agree) return false;

        const min2 = (v: string) => v.trim().length >= 2;
        const min1 = (v: string) => v.trim().length >= 1;
        const min4 = (v: string) => v.trim().length >= 4;

        const partnerOk = min2(fullName) && emailOk && phone.trim().length >= 7 && min2(country) && min2(city);

        const vehicleOk =
            min2(vehicleMake) &&
            min1(vehicleModel) &&
            min4(vehicleYear) &&
            min2(vehicleColor) &&
            min2(plateCountry) &&
            min2(plateNumber) &&
            min1(seatCount) &&
            min1(odometerKm) &&
            min2(vin) &&
            !!availableStartDate;

        const complianceOk = hasInsurance !== "No" && hasRegistration !== "No";

        return partnerOk && vehicleOk && complianceOk && status !== "loading" && status !== "success";
    }, [
        agree,
        status,
        fullName,
        emailOk,
        phone,
        country,
        city,
        vehicleMake,
        vehicleModel,
        vehicleYear,
        vehicleColor,
        plateCountry,
        plateNumber,
        vin,
        seatCount,
        odometerKm,
        availableStartDate,
        hasInsurance,
        hasRegistration,
    ]);

    async function submit() {
        if (!canSubmit || status === "loading") return;
        setStatus("loading");
        setError("");

        try {
            const res = await fetch("/api/partner", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: fullName.trim(),
                    email: email.trim().toLowerCase(),
                    phone: phone.trim(),
                    country: country.trim(),
                    city: city.trim(),

                    vehicleClass,
                    vehicleMake: vehicleMake.trim(),
                    vehicleModel: vehicleModel.trim(),
                    vehicleYear: vehicleYear.trim(),
                    vehicleColor: vehicleColor.trim(),
                    plateCountry: plateCountry.trim(),
                    plateNumber: plateNumber.trim(),
                    vin: vin.trim(),
                    seatCount: seatCount.trim(),
                    transmission,
                    fuelType,
                    odometerKm: odometerKm.trim(),
                    condition,

                    hasInsurance,
                    hasRegistration,
                    availableStartDate,
                    notes: notes.trim() || null,

                    agreedToPolicies: true,
                    createdAt: new Date().toISOString(),
                }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.error || "Request failed");
            }

            setStatus("success");
        } catch (e: any) {
            setStatus("error");
            setError(e?.message || "Could not submit right now. Please try again.");
        }
    }

    return (
        <main className="min-h-screen text-black">
            <GlassBg />

            {/* Wider container + less vertical compression */}
            <div className="mx-auto max-w-[1240px] px-5 pb-16 pt-10 md:px-8 md:pt-14">
                {/* Top bar (no squeeze) */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/[0.60] px-3 py-1 text-[11px] font-semibold text-black/60 backdrop-blur">
                            <span className="h-1.5 w-1.5 rounded-full bg-black/30" />
                            <span>6Ride Partner Fleet Program</span>
                        </div>
                        <div className="text-xs text-black/45">Cross River HQ • Available internationally where 6Ride operates</div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Link
                            href="/"
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-4 py-2 text-xs font-semibold border border-black/10 bg-white/[0.58] backdrop-blur-md shadow-[0_18px_45px_-35px_rgba(0,0,0,0.55)] transition-transform duration-200 active:scale-[0.985] hover:-translate-y-[1px]"
                        >
                            <span className="pointer-events-none absolute inset-[1px] rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-12px_24px_rgba(0,0,0,0.07)]" />
                            <span className="relative z-10 text-black/75 group-hover:text-black">Back Home</span>
                        </Link>
                    </div>
                </div>

                {/* HERO: full-width single card (not split) */}
                <motion.section
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: easeOut }}
                    className="mt-7"
                >
                    <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/[0.55] backdrop-blur-xl shadow-[0_32px_90px_-70px_rgba(0,0,0,0.62)]">
                        <div className="pointer-events-none absolute inset-0 opacity-90 bg-[radial-gradient(140%_120%_at_15%_0%,rgba(255,255,255,0.85),rgba(255,255,255,0)_55%),radial-gradient(120%_120%_at_88%_10%,rgba(255,255,255,0.55),rgba(255,255,255,0)_60%)]" />
                        <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-18px_30px_rgba(0,0,0,0.07)]" />

                        <div className="relative z-10 grid gap-6 p-6 md:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                            <div>
                                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                                    List your premium vehicle with 6Ride
                                </h1>
                                <p className="mt-3 max-w-3xl text-sm leading-6 text-black/70">
                                    This page explains the full partner process: verification, vehicle standards, branding changes (wrap/decals and accessories),
                                    compliance, payouts, and enforcement. Nothing is hidden—so partners know exactly what they are agreeing to.
                                </p>

                                <div className="mt-5 grid gap-3 md:grid-cols-3">
                                    <StepPill
                                        n="1"
                                        title="Verification"
                                        body="We validate ownership, documents, and condition to protect partners, riders, and the brand."
                                    />
                                    <StepPill
                                        n="2"
                                        title="Brand standardization"
                                        body="Approved vehicles may receive approved 6Ride styling: decals/wrap rules, interior standard, accessories."
                                    />
                                    <StepPill
                                        n="3"
                                        title="Earnings protection"
                                        body="Clear rules on payouts, damage reporting, disputes, and removal for violations."
                                    />
                                </div>

                                <div className="mt-6 rounded-2xl border border-black/10 bg-white/[0.55] p-4 text-sm text-black/70">
                                    <div className="font-semibold text-black/80">Important note (legal + consent)</div>
                                    <div className="mt-1">
                                        Any changes to appearance (wrap/decals) happen with your written consent. Identifier/plate handling is always jurisdiction-dependent
                                        and only done where legal and agreed. Where restricted, we use lawful alternatives.
                                    </div>
                                </div>
                            </div>

                            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/[0.45] backdrop-blur-xl">
                                <div className="pointer-events-none absolute inset-0 opacity-80 bg-[radial-gradient(130%_110%_at_25%_0%,rgba(255,255,255,0.95),rgba(255,255,255,0)_55%)]" />
                                <div className="relative z-10 p-3">
                                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                                        <Image src={HERO_SRC} alt="6Ride partner premium vehicle" fill className="object-cover" priority />
                                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_30%_0%,rgba(255,255,255,0.40),rgba(255,255,255,0)_60%)]" />
                                    </div>

                                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                                        <div className="rounded-2xl border border-black/10 bg-white/[0.55] p-4 text-sm text-black/70">
                                            <div className="font-semibold text-black/80">Best for</div>
                                            <ul className="mt-2 space-y-1">
                                                <li>• Premium sedan/SUV fleets</li>
                                                <li>• Executive chauffeurs</li>
                                                <li>• Special vehicles (approval)</li>
                                            </ul>
                                        </div>
                                        <div className="rounded-2xl border border-black/10 bg-white/[0.55] p-4 text-sm text-black/70">
                                            <div className="font-semibold text-black/80">Fast start</div>
                                            <ul className="mt-2 space-y-1">
                                                <li>• Keep documents ready</li>
                                                <li>• Clean interior/exterior</li>
                                                <li>• Accurate VIN/plate</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* CONTENT: balanced columns, same width, no “long side / short side” feel */}
                <div className="mt-7 grid gap-6 xl:grid-cols-2 xl:items-start">
                    {/* Left column */}
                    <div className="space-y-6">
                        <GlassCard
                            title="Partner requirements (full)"
                            subtitle="Self-explanatory expectations to prevent surprises during onboarding."
                        >
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-2xl border border-black/10 bg-white/[0.55] p-4">
                                    <div className="text-sm font-semibold text-black/80">Eligibility</div>
                                    <ul className="mt-2 space-y-1 text-sm text-black/65">
                                        <li>• Proof of ownership/authorization</li>
                                        <li>• Valid registration (or verified in-progress)</li>
                                        <li>• Valid insurance (or verified in-progress)</li>
                                        <li>• VIN/plate match across documents</li>
                                    </ul>
                                </div>

                                <div className="rounded-2xl border border-black/10 bg-white/[0.55] p-4">
                                    <div className="text-sm font-semibold text-black/80">Vehicle standards</div>
                                    <ul className="mt-2 space-y-1 text-sm text-black/65">
                                        <li>• Roadworthy (tyres, brakes, lights)</li>
                                        <li>• Clean, premium interior condition</li>
                                        <li>• No unsafe mechanical issues</li>
                                        <li>• Inspection required before approval</li>
                                    </ul>
                                </div>

                                <div className="rounded-2xl border border-black/10 bg-white/[0.55] p-4">
                                    <div className="text-sm font-semibold text-black/80">Brand & upgrades</div>
                                    <ul className="mt-2 space-y-1 text-sm text-black/65">
                                        <li>• Approved decals/wrap rules only</li>
                                        <li>• Interior standardization</li>
                                        <li>• Approved accessories + safety kits</li>
                                        <li>• Plate/identifier handling only where lawful and agreed</li>
                                    </ul>
                                </div>

                                <div className="rounded-2xl border border-black/10 bg-white/[0.55] p-4">
                                    <div className="text-sm font-semibold text-black/80">Enforcement</div>
                                    <ul className="mt-2 space-y-1 text-sm text-black/65">
                                        <li>• Misrepresentation = rejection/removal</li>
                                        <li>• Safety violations = suspension</li>
                                        <li>• Fraud/illegal use = termination</li>
                                        <li>• We cooperate with lawful requests</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-5 rounded-2xl border border-black/10 bg-white/[0.55] p-4 text-sm text-black/70">
                                <div className="font-semibold text-black/80">What we do not accept</div>
                                <div className="mt-1">
                                    Vehicles with unsafe mechanical issues, undocumented ownership, mismatched VIN/plate records, or any attempt to use the program for unlawful activity.
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard title="How the partnership works" subtitle="A transparent structure so partners understand the deal before applying.">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-2xl border border-black/10 bg-white/[0.55] p-4">
                                    <div className="text-sm font-semibold text-black/80">Programs</div>
                                    <ul className="mt-2 space-y-1 text-sm text-black/65">
                                        <li>• Premium ride listings</li>
                                        <li>• Chauffeur / executive assignments</li>
                                        <li>• Event / scheduled bookings</li>
                                        <li>• Special approvals (e.g., armored)</li>
                                    </ul>
                                </div>
                                <div className="rounded-2xl border border-black/10 bg-white/[0.55] p-4">
                                    <div className="text-sm font-semibold text-black/80">Earnings & payouts</div>
                                    <div className="mt-2 text-sm text-black/65">
                                        Utilization, city, vehicle class, and compliance status can affect payouts. Fees and adjustments may apply for cancellations,
                                        damages, or violations per policy.
                                    </div>
                                    <div className="mt-3">
                                        <BevelChip href="/policies/subscription-billing">Billing & payouts policy</BevelChip>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 rounded-2xl border border-black/10 bg-white/[0.55] p-4 text-sm text-black/70">
                                <div className="font-semibold text-black/80">Compliance promise</div>
                                <div className="mt-1">
                                    Partners must follow lawful operations, maintain documentation, and adhere to rider safety standards. Attempts to bypass platform rules,
                                    misrepresent vehicles, or engage in unlawful activity may be reported where required by law.
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Right column (form) */}
                    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: easeOut }}>
                        <GlassCard
                            title="Apply to become a partner"
                            subtitle="All fields are required. Policy acknowledgment is required before the submit button activates."
                        >
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    submit();
                                }}
                                className="grid gap-4"
                            >
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <LabelRow label="Full name" hint={<Hint title="Full legal name" body="Use the legal name of the owner or authorized fleet manager." />} />
                                        <InputBase value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" autoComplete="name" />
                                    </div>

                                    <div>
                                        <LabelRow label="Email" hint={<Hint title="Working email" body="We send onboarding and verification requests here." />} />
                                        <InputBase value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" inputMode="email" autoComplete="email" />
                                        {!emailOk && email.trim().length > 0 ? <div className="mt-1 text-xs text-black/55">Enter a valid email address.</div> : null}
                                    </div>

                                    <div>
                                        <LabelRow label="Phone" hint={<Hint title="Reachable phone number" body="Used for onboarding contact when required." />} />
                                        <InputBase value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234…" autoComplete="tel" />
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <LabelRow label="Country" hint={<Hint title="Country of operation" body="Where the vehicle will be listed." />} />
                                            <InputBase value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Nigeria" />
                                        </div>
                                        <div>
                                            <LabelRow label="City" hint={<Hint title="Primary city" body="Main city where the vehicle operates (e.g., Calabar, Lagos, Abuja)." />} />
                                            <InputBase value={city} onChange={(e) => setCity(e.target.value)} placeholder="Calabar" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-2 rounded-2xl border border-black/10 bg-white/[0.52] p-4">
                                    <div className="text-sm font-semibold text-black/80">Vehicle information</div>
                                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <LabelRow label="Vehicle class" hint={<Hint title="Class selection" body="Final classification may be adjusted after inspection." />} />
                                            <SelectBase value={vehicleClass} onChange={(e) => setVehicleClass(e.target.value as VehicleClass)}>
                                                <option value="Sedan">Sedan</option>
                                                <option value="SUV">SUV</option>
                                                <option value="Luxury">Luxury</option>
                                                <option value="Executive">Executive</option>
                                                <option value="Special">Special</option>
                                                <option value="Armored">Armored</option>
                                                <option value="Delivery">Delivery</option>
                                            </SelectBase>
                                        </div>

                                        <div>
                                            <LabelRow label="Vehicle year" hint={<Hint title="Model year" body="Use the year on the registration documents." />} />
                                            <InputBase value={vehicleYear} onChange={(e) => setVehicleYear(e.target.value)} placeholder="2021" inputMode="numeric" />
                                        </div>

                                        <div>
                                            <LabelRow label="Make" hint={<Hint title="Manufacturer" body="Example: Mercedes, Toyota, Lexus, Cadillac." />} />
                                            <InputBase value={vehicleMake} onChange={(e) => setVehicleMake(e.target.value)} placeholder="Mercedes" />
                                        </div>

                                        <div>
                                            <LabelRow label="Model" hint={<Hint title="Model name" body="Example: GLE Coupe, Escalade, S-Class." />} />
                                            <InputBase value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} placeholder="GLE Coupe" />
                                        </div>

                                        <div>
                                            <LabelRow label="Current color" hint={<Hint title="Current paint/wrap color" body="Helps evaluate branding work." />} />
                                            <InputBase value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} placeholder="Black" />
                                        </div>

                                        <div>
                                            <LabelRow label="Seats" hint={<Hint title="Seat capacity" body="Number of passenger seats (exclude driver)." />} />
                                            <InputBase value={seatCount} onChange={(e) => setSeatCount(e.target.value)} placeholder="7" inputMode="numeric" />
                                        </div>

                                        <div>
                                            <LabelRow label="Plate issuing country/state" hint={<Hint title="Plate jurisdiction" body="Where the plate was issued." />} />
                                            <InputBase value={plateCountry} onChange={(e) => setPlateCountry(e.target.value)} placeholder="Nigeria / Cross River" />
                                        </div>

                                        <div>
                                            <LabelRow label="Plate number" hint={<Hint title="Plate number" body="Enter the current plate exactly as shown." />} />
                                            <InputBase value={plateNumber} onChange={(e) => setPlateNumber(e.target.value)} placeholder="ABC-123XY" />
                                        </div>

                                        <div>
                                            <LabelRow label="VIN / Chassis number" hint={<Hint title="VIN" body="Must match registration and inspection records." />} />
                                            <InputBase value={vin} onChange={(e) => setVin(e.target.value)} placeholder="17-character VIN" />
                                        </div>

                                        <div>
                                            <LabelRow label="Odometer (km)" hint={<Hint title="Mileage" body="Approximate current mileage in kilometers." />} />
                                            <InputBase value={odometerKm} onChange={(e) => setOdometerKm(e.target.value)} placeholder="45000" inputMode="numeric" />
                                        </div>

                                        <div>
                                            <LabelRow label="Transmission" hint={<Hint title="Transmission type" body="Automatic or manual." />} />
                                            <SelectBase value={transmission} onChange={(e) => setTransmission(e.target.value as any)}>
                                                <option value="Automatic">Automatic</option>
                                                <option value="Manual">Manual</option>
                                            </SelectBase>
                                        </div>

                                        <div>
                                            <LabelRow label="Fuel type" hint={<Hint title="Fuel" body="Choose petrol, diesel, hybrid, or electric." />} />
                                            <SelectBase value={fuelType} onChange={(e) => setFuelType(e.target.value as any)}>
                                                <option value="Petrol">Petrol</option>
                                                <option value="Diesel">Diesel</option>
                                                <option value="Hybrid">Hybrid</option>
                                                <option value="Electric">Electric</option>
                                            </SelectBase>
                                        </div>

                                        <div>
                                            <LabelRow label="Condition" hint={<Hint title="Vehicle condition" body="We confirm during inspection." />} />
                                            <SelectBase value={condition} onChange={(e) => setCondition(e.target.value as any)}>
                                                <option value="Excellent">Excellent</option>
                                                <option value="Good">Good</option>
                                                <option value="Fair">Fair</option>
                                            </SelectBase>
                                        </div>

                                        <div>
                                            <LabelRow label="Available from" hint={<Hint title="Start date" body="When the vehicle can begin inspection/onboarding." />} />
                                            <InputBase value={availableStartDate} onChange={(e) => setAvailableStartDate(e.target.value)} type="date" />
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-black/10 bg-white/[0.52] p-4">
                                    <div className="text-sm font-semibold text-black/80">Compliance confirmation</div>
                                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <LabelRow label="Valid insurance" hint={<Hint title="Insurance status" body="Insurance is required for active listing." />} />
                                            <SelectBase value={hasInsurance} onChange={(e) => setHasInsurance(e.target.value as any)}>
                                                <option value="Yes">Yes</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="No">No</option>
                                            </SelectBase>
                                            {hasInsurance === "No" ? <div className="mt-1 text-xs text-black/55">Insurance is required to proceed.</div> : null}
                                        </div>

                                        <div>
                                            <LabelRow label="Valid registration" hint={<Hint title="Registration status" body="Registration must be valid and match VIN/plate." />} />
                                            <SelectBase value={hasRegistration} onChange={(e) => setHasRegistration(e.target.value as any)}>
                                                <option value="Yes">Yes</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="No">No</option>
                                            </SelectBase>
                                            {hasRegistration === "No" ? <div className="mt-1 text-xs text-black/55">Registration is required to proceed.</div> : null}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <LabelRow label="Notes (optional)" hint={<Hint title="Notes" body="Fleet size, approvals, or documents in progress." align="left" />} />
                                        <TextAreaBase value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Fleet size, availability windows, special approvals, or anything relevant…" rows={4} />
                                    </div>
                                </div>

                                {/* Policy checkbox: inline text links (as you requested) */}
                                <div className="rounded-2xl border border-black/10 bg-white/[0.52] p-4">
                                    <div className="text-sm font-semibold text-black/80">Policy acknowledgment (required)</div>

                                    <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-2xl border border-black/10 bg-white/[0.55] p-4">
                                        <input
                                            type="checkbox"
                                            checked={agree}
                                            onChange={(e) => setAgree(e.target.checked)}
                                            className="mt-1 h-4 w-4 rounded border-black/20"
                                        />
                                        <div className="text-sm text-black/70">
                                            <div className="font-semibold text-black/80">I have read and agree to the policies.</div>
                                            <div className="mt-1">
                                                By continuing, you confirm you have read: <InlinePolicyLinks />
                                            </div>
                                            <div className="mt-2 text-xs text-black/55">
                                                Misrepresentation, unlawful requests, or misuse may result in rejection/removal and may be reported where required by law.
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                {status === "error" ? (
                                    <div className="rounded-2xl border border-black/10 bg-white/[0.55] p-4 text-sm text-black/75">
                                        <div className="font-semibold text-black/85">Unable to submit</div>
                                        <div className="mt-1">{error}</div>
                                    </div>
                                ) : null}

                                {status === "success" ? (
                                    <div className="rounded-2xl border border-black/10 bg-white/[0.55] p-4 text-sm text-black/75">
                                        <div className="font-semibold text-black/85">Application received</div>
                                        <div className="mt-1">We will contact you after review. Keep documents ready for verification and inspection scheduling.</div>
                                    </div>
                                ) : null}

                                <PrimaryButton type="submit" disabled={!canSubmit}>
                                    {status === "loading" ? "Submitting…" : status === "success" ? "Submitted" : "Submit partner application"}
                                </PrimaryButton>

                                <div className="text-xs text-black/55">
                                    For faster onboarding, use{" "}
                                    <a className="underline decoration-black/25 hover:decoration-black/50" href="/contact">
                                        /contact
                                    </a>
                                    .
                                </div>
                            </form>
                        </GlassCard>
                    </motion.section>
                </div>

                {/* Footer policies (moved here as you requested) */}
                <footer className="mt-10 rounded-3xl border border-black/10 bg-white/[0.55] p-6 backdrop-blur-xl shadow-[0_32px_90px_-70px_rgba(0,0,0,0.62)]">
                    <div className="text-sm font-semibold text-black/80">Policies & references</div>
                    <div className="mt-2 text-sm text-black/65">
                        Partners must comply with local laws in their city/country and with 6Ride platform standards. These policies govern this program:
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <BevelChip href="/policies/partner-terms">Partner Terms</BevelChip>
                        <BevelChip href="/policies/insurance-liability">Insurance & Liability</BevelChip>
                        <BevelChip href="/policies/safety">Safety</BevelChip>
                        <BevelChip href="/policies/acceptable-use">Acceptable Use</BevelChip>
                        <BevelChip href="/policies/privacy">Privacy</BevelChip>
                        <BevelChip href="/policies/terms">Terms</BevelChip>
                    </div>
                    <div className="mt-4 text-xs text-black/50">
                        If you believe someone is attempting to use the partner program for unlawful activity, contact support via /contact.
                    </div>
                </footer>
            </div>
        </main>
    );
}
