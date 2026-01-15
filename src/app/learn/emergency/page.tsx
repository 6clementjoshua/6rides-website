// src/app/learn/emergency/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

function cx(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}

/** ✅ CRISP Water/Bevel system */
const WATER_PANEL =
    "relative isolate overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.10)]";
const WATER_INSET =
    "before:content-[''] before:absolute before:inset-0 before:rounded-3xl before:-z-10 before:bg-[radial-gradient(1100px_520px_at_20%_0%,rgba(255,255,255,0.98),rgba(255,255,255,0.55),rgba(255,255,255,0))]";
const WATER_EDGE =
    "after:content-[''] after:absolute after:inset-0 after:rounded-3xl after:-z-10 after:ring-1 after:ring-white/70";

const TILE =
    "relative isolate overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.06)]";
const TILE_INSET =
    "before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:-z-10 before:bg-[radial-gradient(760px_400px_at_15%_0%,rgba(255,255,255,0.98),rgba(255,255,255,0.50),rgba(255,255,255,0))]";

const CHIP =
    "rounded-full border border-black/15 bg-white px-3 py-1 text-[11px] font-semibold text-neutral-900 shadow-[0_10px_22px_rgba(0,0,0,0.06)]";

/** Dark hero glass only (on image) */
const HERO_GLASS =
    "max-w-3xl rounded-2xl border border-white/30 bg-black/55 p-4 md:p-5 shadow-[0_18px_55px_rgba(0,0,0,0.18)]";

function Panel({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cx(WATER_PANEL, WATER_INSET, WATER_EDGE, className)}>
            <div className="relative z-10">{children}</div>
        </div>
    );
}

function TileCard({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cx(TILE, TILE_INSET, className)}>
            <div className="relative z-10">{children}</div>
        </div>
    );
}

function SectionTitle({
    eyebrow,
    title,
    desc,
}: {
    eyebrow?: string;
    title: string;
    desc?: string;
}) {
    return (
        <div className="mb-4">
            {eyebrow ? (
                <div className="text-[11px] font-semibold tracking-wide text-neutral-800">
                    {eyebrow}
                </div>
            ) : null}
            <h2 className="mt-1 text-xl font-semibold text-neutral-950 md:text-2xl">
                {title}
            </h2>
            {desc ? (
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-800">
                    {desc}
                </p>
            ) : null}
        </div>
    );
}

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="mt-3 grid gap-2 text-sm text-neutral-900">
            {items.map((t) => (
                <li key={t} className="flex gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-neutral-500" />
                    <span className="leading-relaxed">{t}</span>
                </li>
            ))}
        </ul>
    );
}

export default function LearnEmergencyPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            {/* Top bar */}
            <header className="sticky top-0 z-30 border-b border-black/10 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/6logo.PNG"
                            alt="6Rides"
                            width={28}
                            height={28}
                            className="h-7 w-7"
                            priority
                        />
                        <span className="text-sm font-semibold text-neutral-950">Rides</span>
                    </Link>

                    <Link
                        href="/"
                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                    >
                        Back to home
                    </Link>
                </div>
            </header>

            {/* Keep this width for ALL learn pages */}
            <section className="mx-auto max-w-6xl px-6 pb-14 pt-8">
                {/* HERO IMAGE CARD */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: easeOut }}
                    className="overflow-hidden rounded-3xl border border-black/10 bg-black shadow-[0_18px_55px_rgba(0,0,0,0.14)]"
                >
                    <div className="relative h-[360px] w-full sm:h-[440px] md:h-[540px]">
                        <Image
                            src="/images/6ride/emergency/6ride_emergency_medical_street_response.png"
                            alt="6Rides emergency response vehicle assisting on the street"
                            fill
                            sizes="(max-width: 768px) 100vw, 1100px"
                            className="object-contain md:object-cover"
                            priority
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/74 via-black/22 to-transparent" />
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute -left-1/4 top-0 h-full w-1/2 rotate-12 bg-white/10 blur-2xl opacity-70" />
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                            <div className={cx(HERO_GLASS, "backdrop-blur-md")}>
                                <div className="text-[11px] font-semibold tracking-wide text-white/90">
                                    Emergency • Humanitarian aid transport support
                                </div>
                                <h1 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
                                    6Rides Emergency Program — support when minutes matter.
                                </h1>
                                <p className="mt-2 text-sm text-white/90 md:text-[15px] leading-relaxed">
                                    This is a humanitarian aid program that uses the 6Rides network to
                                    support urgent transport coordination — with safety-first rules and
                                    clear limitations.
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {[
                                        "Members-first response",
                                        "Transport coordination",
                                        "Safety-first rules",
                                        "Clear limitations",
                                    ].map((c) => (
                                        <span
                                            key={c}
                                            className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white"
                                        >
                                            {c}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* BODY */}
                <div className="mt-10 grid gap-8 md:grid-cols-12">
                    {/* MAIN */}
                    <div className="md:col-span-8 space-y-8">
                        {/* Absolute clarity */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: easeOut, delay: 0.05 }}
                        >
                            <Panel className="p-6">
                                <SectionTitle
                                    eyebrow="Important clarification (read carefully)"
                                    title="We are NOT a hospital, clinic, ambulance, or medical provider"
                                    desc="6Rides does not operate hospitals, clinics, pharmacies, or health centers. We do not provide medical treatment, diagnosis, emergency medical procedures, or clinical services. This program is humanitarian aid transport support — focused on helping our Emergency Program members get coordinated movement support in urgent situations."
                                />

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            What we do
                                        </div>
                                        <BulletList
                                            items={[
                                                "Coordinate urgent transport support using the 6Rides network",
                                                "Support Emergency Program members with higher priority",
                                                "Provide clear updates, calm handling, and non-escalation conduct",
                                                "Escalate to support when conditions are unsafe or unclear",
                                            ]}
                                        />
                                    </TileCard>

                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            What we do NOT do
                                        </div>
                                        <BulletList
                                            items={[
                                                "We do not run hospitals or clinics",
                                                "We do not provide medical treatment or medical advice",
                                                "We do not replace official emergency services",
                                                "We do not guarantee availability in every area/time",
                                            ]}
                                        />
                                    </TileCard>
                                </div>

                                <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
                                    <div className="text-sm font-semibold text-neutral-950">
                                        If you need medical attention
                                    </div>
                                    <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                        Please contact the nearest hospital, clinic, or local emergency
                                        services immediately. Use 6Rides Emergency Program only as additional
                                        transport support (especially for subscribed members) when it is safe
                                        and appropriate to do so.
                                    </p>
                                </div>
                            </Panel>
                        </motion.div>

                        {/* Membership + card */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: easeOut, delay: 0.08 }}
                        >
                            <Panel className="p-6">
                                <SectionTitle
                                    eyebrow="Membership"
                                    title="Emergency membership, priority response, and the membership card"
                                    desc="This program is built primarily for subscribed members. Members receive priority attention, faster coordination attempts, and a more structured response flow."
                                />

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            Member-first support (priority)
                                        </div>
                                        <BulletList
                                            items={[
                                                "Members are prioritized for response coordination",
                                                "More structured confirmation and update flow",
                                                "Support escalation path designed for urgent situations",
                                                "Accountability rules to prevent misuse and confusion",
                                            ]}
                                        />
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {["Priority", "Structured", "Members-first"].map((c) => (
                                                <span key={c} className={CHIP}>
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    </TileCard>

                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            Apply for an Emergency Membership Card
                                        </div>
                                        <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                            To get an Emergency Membership Card, contact us for the application
                                            steps, eligibility, pricing, and city availability. We’ll guide you
                                            through how membership works.
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <Link
                                                href="/contact"
                                                className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-black/90"
                                            >
                                                Apply / Contact us
                                            </Link>
                                            <Link
                                                href="/policies/emergency"
                                                target="_blank"
                                                className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                            >
                                                Read disclaimer
                                            </Link>
                                        </div>

                                        <div className="mt-3 text-[12px] text-neutral-800 leading-relaxed">
                                            Note: Membership is subject to verification and program rules.
                                            Availability may vary by city and operational capacity.
                                        </div>
                                    </TileCard>
                                </div>

                                <div className="mt-6 rounded-2xl border border-black/10 bg-neutral-50 p-5">
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Public assistance (non-members)
                                    </div>
                                    <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                        We may, at our discretion and within our operational jurisdiction,
                                        respond to emergencies that come our way. However, members receive
                                        dedicated attention and higher priority because the program is built
                                        to serve subscribed participants first.
                                    </p>
                                </div>
                            </Panel>
                        </motion.div>

                        {/* How it works */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
                        >
                            <Panel className="p-6">
                                <SectionTitle
                                    eyebrow="Flow"
                                    title="Responsible emergency support flow (transport coordination)"
                                    desc="This is a coordination process — not medical care. Safety and clarity come first."
                                />

                                <div className="grid gap-3">
                                    {[
                                        {
                                            step: "01",
                                            title: "Share pickup + destination clearly",
                                            body: "Provide accurate pickup and destination details. If medical help is needed, contact the nearest hospital or emergency service first.",
                                        },
                                        {
                                            step: "02",
                                            title: "Member verification (priority where applicable)",
                                            body: "Members may receive priority response attempts. Verification and clear details reduce confusion and improve speed.",
                                        },
                                        {
                                            step: "03",
                                            title: "Dispatch attempt + updates",
                                            body: "We coordinate a vehicle when available and provide updates. Dispatch depends on availability and safe road conditions.",
                                        },
                                        {
                                            step: "04",
                                            title: "Safe movement + escalation",
                                            body: "Safety-first driving is mandatory. If conditions are unsafe or unclear, we escalate confirming steps and may pause response.",
                                        },
                                        {
                                            step: "05",
                                            title: "Drop-off and completion confirmation",
                                            body: "We confirm completion of the transport support. Any disputes or misuse triggers the program’s accountability process.",
                                        },
                                    ].map((s) => (
                                        <TileCard key={s.step} className="p-5">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <div className="text-xs font-semibold text-neutral-800">
                                                        Step {s.step}
                                                    </div>
                                                    <div className="mt-1 text-sm font-semibold text-neutral-950">
                                                        {s.title}
                                                    </div>
                                                    <div className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                                        {s.body}
                                                    </div>
                                                </div>
                                                <div className="hidden sm:block rounded-2xl border border-black/10 bg-white px-3 py-2 text-[11px] font-semibold text-neutral-900 shadow-[0_10px_22px_rgba(0,0,0,0.06)]">
                                                    Safety-first
                                                </div>
                                            </div>
                                        </TileCard>
                                    ))}
                                </div>
                            </Panel>
                        </motion.div>

                        {/* Protections */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: easeOut, delay: 0.12 }}
                        >
                            <Panel className="p-6">
                                <SectionTitle
                                    eyebrow="Protection layer"
                                    title="Limits, misuse prevention, and public clarity"
                                    desc="We take this seriously. The program must not be mistaken for a hospital/clinic service, and misuse can lead to account action."
                                />

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            What protects the public
                                        </div>
                                        <BulletList
                                            items={[
                                                "Clear statement: we do not provide medical treatment",
                                                "Members-first response expectations to avoid confusion",
                                                "Safety-first driving rules (no reckless driving)",
                                                "Escalation approach when situations are unsafe",
                                            ]}
                                        />
                                    </TileCard>

                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            Misuse and account action
                                        </div>
                                        <BulletList
                                            items={[
                                                "No false emergencies or impersonation",
                                                "No harassment, intimidation, or violence",
                                                "No attempts to force services outside program limits",
                                                "Repeat misuse may result in suspension/removal",
                                            ]}
                                        />
                                    </TileCard>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <Link className={CHIP} href="/policies/emergency" target="_blank">
                                        Emergency Disclaimer
                                    </Link>
                                    <Link className={CHIP} href="/policies/safety" target="_blank">
                                        Safety Guidelines
                                    </Link>
                                    <Link className={CHIP} href="/policies/acceptable-use" target="_blank">
                                        Acceptable Use
                                    </Link>
                                    <Link className={CHIP} href="/policies/terms" target="_blank">
                                        Terms of Service
                                    </Link>
                                </div>

                                <div className="mt-3 text-[12px] text-neutral-800 leading-relaxed">
                                    These documents exist to protect members, the public, drivers, and the
                                    6Rides brand — and to prevent the program being mistaken as a medical
                                    provider.
                                </div>
                            </Panel>
                        </motion.div>

                        {/* FAQ */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: easeOut, delay: 0.14 }}
                        >
                            <Panel className="p-6">
                                <SectionTitle eyebrow="FAQ" title="Common questions" />
                                <div className="grid gap-3">
                                    {[
                                        {
                                            q: "Do you run a hospital or clinic?",
                                            a: "No. 6Rides does not operate hospitals, clinics, or health centers. We provide transport coordination support for Emergency Program members.",
                                        },
                                        {
                                            q: "Do you provide medical treatment?",
                                            a: "No. We do not provide diagnosis, treatment, or medical procedures. Contact the nearest hospital or emergency service for medical attention.",
                                        },
                                        {
                                            q: "Who gets priority?",
                                            a: "Subscribed members of the 6Rides Emergency Program receive priority attention. We may still respond to public emergencies at our discretion.",
                                        },
                                        {
                                            q: "How do I apply for the membership card?",
                                            a: "Use the Apply/Contact button to reach us. We’ll share eligibility, pricing, and onboarding steps.",
                                        },
                                    ].map((item) => (
                                        <TileCard key={item.q} className="p-5">
                                            <div className="text-sm font-semibold text-neutral-950">
                                                {item.q}
                                            </div>
                                            <div className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                                {item.a}
                                            </div>
                                        </TileCard>
                                    ))}
                                </div>
                            </Panel>
                        </motion.div>
                    </div>

                    {/* ASIDE */}
                    <motion.aside
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: easeOut, delay: 0.12 }}
                        className="md:col-span-4"
                    >
                        <div className="sticky top-24">
                            <Panel className="p-5">
                                <div className="text-sm font-semibold text-neutral-950">
                                    Next actions
                                </div>

                                <div className="mt-3 grid gap-2">
                                    <Link
                                        href="/contact"
                                        className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-black/90"
                                    >
                                        Apply for Emergency Membership Card
                                    </Link>

                                    <Link
                                        href="/emergency-support"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Request support (members)
                                    </Link>

                                    <Link
                                        href="/"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Back to home
                                    </Link>
                                </div>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {[
                                        "Humanitarian aid",
                                        "Members-first",
                                        "Not medical care",
                                        "Transport support",
                                        "Accountability",
                                    ].map((t) => (
                                        <span key={t} className={CHIP}>
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-5 rounded-2xl border border-black/10 bg-neutral-50 p-4">
                                    <div className="text-[11px] font-semibold text-neutral-900">
                                        Reminder
                                    </div>
                                    <div className="mt-1 text-[12px] text-neutral-800 leading-relaxed">
                                        For medical emergencies, contact the nearest hospital or local
                                        emergency services first.
                                    </div>
                                </div>

                                <div className="mt-5 rounded-2xl border border-black/10 bg-white p-4 shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
                                    <div className="text-[11px] font-semibold text-neutral-900">
                                        Contact us for your 6Rides Emergency Program membership today
                                    </div>
                                    <div className="mt-1 text-[12px] text-neutral-800 leading-relaxed">
                                        For inquiries or to get started, please contact our team at{" "}
                                        <a
                                            href="mailto:emergency@6rides.com"
                                            className="font-semibold text-black hover:text-neutral-800"
                                        >
                                            Emergency@6rides.com
                                        </a>
                                    </div>
                                    
                                </div>
                            </Panel>
                        </div>
                    </motion.aside>
                </div>
            </section>
        </main>
    );
}
