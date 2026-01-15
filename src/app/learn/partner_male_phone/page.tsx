// src/app/learn/partner_male_phone/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

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

/** ✅ Lighter hero glass + reduced blur on mobile */
const HERO_GLASS =
    "max-w-3xl rounded-2xl border border-white/30 bg-black/28 md:bg-black/35 p-4 md:p-5 shadow-[0_18px_55px_rgba(0,0,0,0.14)]";

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

export default function LearnPartnerMalePhonePage() {
    // ✅ Mobile-only: tap-to-expand hero details
    const [mobileExpanded, setMobileExpanded] = useState(false);

    return (
        <main className="min-h-screen bg-white text-black">
            {/* Top bar */}
            <header className="sticky top-0 z-30 border-b border-black/10 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/6logo.PNG"
                            alt="6ride"
                            width={28}
                            height={28}
                            className="h-7 w-7"
                            priority
                        />
                        <span className="text-sm font-semibold text-neutral-950">ride</span>
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
                    className={cx(
                        "overflow-hidden rounded-3xl border border-black/10 shadow-[0_18px_55px_rgba(0,0,0,0.14)]",
                        // ✅ mobile: avoid outer black edge showing around contain/letterbox
                        "bg-transparent md:bg-black"
                    )}
                >
                    <div className="relative h-[360px] w-full sm:h-[440px] md:h-[540px]">
                        <Image
                            src="/images/6ride/partner/6ride_partner_vehicle_premium_male_phone.png"
                            alt="6ride partner premium vehicle with male rider on phone"
                            fill
                            sizes="(max-width: 768px) 100vw, 1100px"
                            // ✅ mobile cover prevents empty borders; desktop stays cover
                            className="object-cover md:object-cover"
                            priority
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/74 via-black/22 to-transparent" />
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute -left-1/4 top-0 h-full w-1/2 rotate-12 bg-white/10 blur-2xl opacity-70" />
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                            <div className={cx(HERO_GLASS, "backdrop-blur-sm md:backdrop-blur-md")}>
                                <div className="text-[11px] font-semibold tracking-wide text-white/90">
                                    Partner vehicles • Earn with standards
                                </div>

                                <h1 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
                                    Partner with 6ride and earn with premium positioning.
                                </h1>

                                {/* ✅ MOBILE: hint + tap-to-expand */}
                                <div className="md:hidden">
                                    <button
                                        type="button"
                                        onClick={() => setMobileExpanded((v) => !v)}
                                        className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[12px] font-semibold text-white/90 active:bg-white/15"
                                        aria-expanded={mobileExpanded}
                                        aria-controls="hero-mobile-details"
                                    >
                                        {!mobileExpanded ? (
                                            <>
                                                Tap to read more <span className="text-white/70">▾</span>
                                            </>
                                        ) : (
                                            <>
                                                Tap to collapse <span className="text-white/70">▴</span>
                                            </>
                                        )}
                                    </button>

                                    <div
                                        id="hero-mobile-details"
                                        className={cx(
                                            "overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
                                            mobileExpanded ? "mt-2 max-h-[700px] opacity-100" : "max-h-0 opacity-0"
                                        )}
                                    >
                                        <p className="mt-2 text-sm text-white/90 leading-relaxed">
                                            Own a premium vehicle? Join a structured partner program built around brand
                                            standards, verified onboarding, and a quality-first rider experience that
                                            protects your car’s image.
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {[
                                                "Verified onboarding",
                                                "Brand standards",
                                                "Premium positioning",
                                                "Standards enforcement",
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

                                {/* ✅ DESKTOP: unchanged (always visible) */}
                                <div className="hidden md:block">
                                    <p className="mt-2 text-sm text-white/90 md:text-[15px] leading-relaxed">
                                        Own a premium vehicle? Join a structured partner program built around brand
                                        standards, verified onboarding, and a quality-first rider experience that
                                        protects your car’s image.
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {[
                                            "Verified onboarding",
                                            "Brand standards",
                                            "Premium positioning",
                                            "Standards enforcement",
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
                    </div>
                </motion.div>

                {/* BODY */}
                <div className="mt-10 grid gap-8 md:grid-cols-12">
                    {/* MAIN */}
                    <div className="md:col-span-8 space-y-8">
                        {/* Meaning */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: easeOut, delay: 0.05 }}
                        >
                            <Panel className="p-6">
                                <SectionTitle
                                    eyebrow="Full explanation"
                                    title="This is not “list your car and hope.” It’s a standards-based network."
                                    desc="6ride partner vehicles are positioned as premium. That only works if the vehicles and partners maintain premium standards consistently. This program is designed to protect the brand, protect riders, and protect your vehicle’s long-term value."
                                />

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            Premium positioning (why it pays more)
                                        </div>
                                        <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                            Premium customers pay for confidence: clean cars, calm pickups,
                                            professional conduct, and predictable service. We position partners
                                            who can keep that standard.
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {["Clean", "Calm", "Professional", "Predictable"].map((c) => (
                                                <span key={c} className={CHIP}>
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    </TileCard>

                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            Brand protection (why standards are enforced)
                                        </div>
                                        <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                            If standards drop, the brand drops. That hurts everyone. So we run
                                            a partner program with expectations, verification, and consequences
                                            for repeat violations.
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {["Enforcement", "Verification", "Accountability"].map((c) => (
                                                <span key={c} className={CHIP}>
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    </TileCard>
                                </div>

                                <div className="mt-6 rounded-2xl border border-black/10 bg-neutral-50 p-5">
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Who this is for
                                    </div>
                                    <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                        Owners who want long-term premium earnings and can consistently maintain
                                        vehicle quality, driver conduct, and cleanliness. If you want “anyhow”
                                        operations, 6ride is not built for that.
                                    </p>
                                </div>
                            </Panel>
                        </motion.div>

                        {/* Requirements */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: easeOut, delay: 0.08 }}
                        >
                            <Panel className="p-6">
                                <SectionTitle
                                    eyebrow="Requirements"
                                    title="Minimum partner standards (non-negotiable)"
                                    desc="These standards protect rider experience and the premium brand. Partners agree to maintain them consistently."
                                />

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            Vehicle standards
                                        </div>
                                        <BulletList
                                            items={[
                                                "Clean interior/exterior presentation (premium look)",
                                                "Comfortable seating and working AC where applicable",
                                                "No unsafe modifications or poor maintenance",
                                                "Documents compliant and ready for inspection",
                                                "Brand presentation requirements where applicable",
                                            ]}
                                        />
                                    </TileCard>

                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            Conduct standards
                                        </div>
                                        <BulletList
                                            items={[
                                                "Respectful, professional communication",
                                                "Calm pickup culture (no harassment, no aggression)",
                                                "Compliance-first driving behavior",
                                                "No discrimination or intimidation",
                                                "Escalate to support instead of conflict",
                                            ]}
                                        />
                                    </TileCard>
                                </div>

                                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                                    {[
                                        { title: "Best for", body: "Premium sedans, executive SUVs, professional owners." },
                                        { title: "Feels like", body: "A structured premium network — not random dispatch." },
                                        { title: "Goal", body: "Premium earnings backed by premium standards." },
                                    ].map((x) => (
                                        <TileCard key={x.title} className="p-5">
                                            <div className="text-sm font-semibold text-neutral-950">{x.title}</div>
                                            <div className="mt-2 text-sm text-neutral-800 leading-relaxed">{x.body}</div>
                                        </TileCard>
                                    ))}
                                </div>
                            </Panel>
                        </motion.div>

                        {/* Onboarding */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
                        >
                            <Panel className="p-6">
                                <SectionTitle
                                    eyebrow="Onboarding"
                                    title="How partner onboarding works"
                                    desc="Verification + standards first. Then premium positioning."
                                />

                                <div className="grid gap-3">
                                    {[
                                        {
                                            step: "01",
                                            title: "Apply to partner",
                                            body: "Start your partner request. You’ll provide basic details about your vehicle and how you operate.",
                                        },
                                        {
                                            step: "02",
                                            title: "Verification + review",
                                            body: "We review identity and vehicle details to protect the brand and rider trust.",
                                        },
                                        {
                                            step: "03",
                                            title: "Standards agreement",
                                            body: "Partners agree to maintain cleanliness, professional conduct, and compliance-first behavior.",
                                        },
                                        {
                                            step: "04",
                                            title: "Go live with premium positioning",
                                            body: "Approved partners are positioned for higher-quality demand and premium experiences.",
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
                                                    Partner flow
                                                </div>
                                            </div>
                                        </TileCard>
                                    ))}
                                </div>

                                <div className="mt-5 rounded-2xl border border-black/10 bg-neutral-50 p-5">
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Enforcement note
                                    </div>
                                    <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                        If standards are repeatedly violated, we may limit access, suspend, or remove
                                        a partner from the program. This is necessary to protect the premium brand
                                        and rider trust.
                                    </p>
                                </div>
                            </Panel>
                        </motion.div>

                        {/* Policies */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: easeOut, delay: 0.12 }}
                        >
                            <Panel className="p-6">
                                <SectionTitle
                                    eyebrow="Policy layer"
                                    title="Partner rules + accountability"
                                    desc="Policies exist to protect partners, riders, and the brand — and to enforce premium standards."
                                />

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            What we enforce
                                        </div>
                                        <BulletList
                                            items={[
                                                "Verification and honest information requirements",
                                                "Cleanliness and presentation expectations",
                                                "Professional conduct and anti-harassment rules",
                                                "Compliance-first driving culture",
                                                "Account action for repeated violations",
                                            ]}
                                        />
                                    </TileCard>

                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            Relevant references
                                        </div>
                                        <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                            Read the detailed rules here:
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            <Link className={CHIP} href="/policies/partner-terms" target="_blank">
                                                Partner Terms
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
                                            These policies protect rider trust and define consequences for abuse.
                                        </div>
                                    </TileCard>
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
                                            q: "Do I need a luxury car only?",
                                            a: "Not only luxury, but the vehicle must meet premium presentation and maintenance standards.",
                                        },
                                        {
                                            q: "What if I don’t keep the standards?",
                                            a: "Repeated violations can lead to restrictions, suspension, or removal to protect the brand.",
                                        },
                                        {
                                            q: "How do I join?",
                                            a: "Use the partner route to apply. We’ll guide you through verification and onboarding.",
                                        },
                                        {
                                            q: "Where are the partner rules written?",
                                            a: "See Partner Terms, Terms of Service, Safety Guidelines, and Acceptable Use.",
                                        },
                                    ].map((item) => (
                                        <TileCard key={item.q} className="p-5">
                                            <div className="text-sm font-semibold text-neutral-950">{item.q}</div>
                                            <div className="mt-2 text-sm text-neutral-800 leading-relaxed">{item.a}</div>
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
                                <div className="text-sm font-semibold text-neutral-950">Next actions</div>

                                <div className="mt-3 grid gap-2">
                                    <Link
                                        href="/partner"
                                        className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-black/90"
                                    >
                                        Partner with 6ride
                                    </Link>

                                    <Link
                                        href="/policies/partner-terms"
                                        target="_blank"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Read partner terms
                                    </Link>

                                    <Link
                                        href="/"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Back to home
                                    </Link>
                                </div>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {["Partners", "Premium standards", "Verification", "Earnings", "Brand protection"].map((t) => (
                                        <span key={t} className={CHIP}>
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-5 rounded-2xl border border-black/10 bg-neutral-50 p-4">
                                    <div className="text-[11px] font-semibold text-neutral-900">
                                        For partnership inquiries
                                    </div>
                                    <div className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                        Please contact our partnership team at{" "}
                                        <a
                                            href="mailto:partnerships@6ride.com"
                                            className="font-semibold text-neutral-900 hover:text-neutral-800"
                                        >
                                            partnerships@6ride.com
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
