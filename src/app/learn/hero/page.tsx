// src/app/learn/hero/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

function cx(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}

/**
 * ✅ CRISP Water/Bevel system (FIXED):
 * - `isolate` creates a new stacking context
 * - pseudo-element layers are forced BEHIND using `before:-z-10` / `after:-z-10`
 * - content always sits above (`relative z-10`)
 */
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

/** Dark hero glass ONLY (on image) */
const HERO_GLASS =
    "max-w-3xl rounded-2xl border border-white/30 bg-black/55 p-4 md:p-5 shadow-[0_18px_55px_rgba(0,0,0,0.18)]";

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cx(WATER_PANEL, WATER_INSET, WATER_EDGE, className)}>
            <div className="relative z-10">{children}</div>
        </div>
    );
}

function TileCard({ children, className }: { children: React.ReactNode; className?: string }) {
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

export default function LearnHeroPage() {
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
                            src="/images/6ride/lifestyle/6ride_shopping_trunk_loading.png"
                            alt="6Rides premium lifestyle pickup after shopping"
                            fill
                            sizes="(max-width: 768px) 100vw, 1100px"
                            className="object-contain md:object-cover"
                            priority
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute -left-1/4 top-0 h-full w-1/2 rotate-12 bg-white/10 blur-2xl opacity-70" />
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                            <div className={cx(HERO_GLASS, "backdrop-blur-md")}>
                                <div className="text-[11px] font-semibold tracking-wide text-white/90">
                                    Lifestyle • Shopping • Tours • Everyday movement
                                </div>
                                <h1 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
                                    Designed for real life, not just rides.
                                </h1>
                                <p className="mt-2 text-sm text-white/90 md:text-[15px] leading-relaxed">
                                    This isn’t “just transport.” It’s a premium movement package
                                    designed around cleanliness, calm pickups, and predictable
                                    service — so errands, shopping runs, and lifestyle trips feel
                                    organized and safe.
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {["Clean vehicles", "Calm pickups", "Predictable updates", "Premium standards"].map(
                                        (c) => (
                                            <span
                                                key={c}
                                                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white"
                                            >
                                                {c}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* BODY */}
                <div className="mt-10 grid gap-8 md:grid-cols-12">
                    {/* MAIN */}
                    <div className="md:col-span-8 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: easeOut, delay: 0.05 }}
                        >
                            <Panel className="p-6">
                                <SectionTitle
                                    eyebrow="luxury movement explained"
                                    title="What the homepage summary really means"
                                    desc="On the homepage, we keep the white section short. This page expands the promise into a real package: shopping trips, tours, multi-stops, and lifestyle movement — delivered with premium standards that reduce stress and improve confidence."
                                />

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            Shopping runs (single or multi-stop)
                                        </div>
                                        <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                            Clean pickup, structured routing, smoother trunk loading,
                                            and a calm return — so shopping feels like a planned
                                            experience, not chaos.
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {["Multi-stop ready", "Trunk-friendly", "Predictable ETA"].map((c) => (
                                                <span key={c} className={CHIP}>
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    </TileCard>

                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            City movement + light tours
                                        </div>
                                        <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                            Restaurants, lounges, events, visiting spots — movement that
                                            requires timing and presentation. The goal is calm arrivals
                                            and clean exits.
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {["Clean arrival", "Professional look", "Comfort-first"].map((c) => (
                                                <span key={c} className={CHIP}>
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    </TileCard>
                                </div>

                                <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Why this matters in Nigeria
                                    </div>
                                    <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                        Traffic, rushed pickups, and inconsistent standards create
                                        stress. This package is designed to reduce friction: clearer
                                        pickup behavior, better vehicle presentation, predictable
                                        updates, and a support-first mindset.
                                    </p>
                                </div>
                            </Panel>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: easeOut, delay: 0.08 }}
                        >
                            <Panel className="p-6">
                                <SectionTitle
                                    eyebrow="Package contents"
                                    title="What you get in the Shopping + Movement package"
                                    desc="This is the premium checklist — the things that make the experience feel calmer and more organized."
                                />

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            Experience standards
                                        </div>
                                        <BulletList
                                            items={[
                                                "Cleaner vehicle presentation and premium-first mindset",
                                                "Calmer pickup behavior and clearer service expectations",
                                                "Predictable updates during movement (less uncertainty)",
                                                "Respectful, professional interaction standards",
                                                "Support-first escalation if anything feels off",
                                            ]}
                                        />
                                    </TileCard>

                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            Movement features
                                        </div>
                                        <BulletList
                                            items={[
                                                "Shopping pickup + drop (single run)",
                                                "Multi-stop errands support (when needed)",
                                                "Lifestyle movement (venues, events, meetups)",
                                                "Tour-style city movement (time-based planning)",
                                                "Family-friendly comfort options where available",
                                            ]}
                                        />
                                    </TileCard>
                                </div>
                            </Panel>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
                        >
                            <Panel className="p-6">
                                <SectionTitle
                                    eyebrow="Flow"
                                    title="How the experience works"
                                    desc="Clear steps. Premium feel. Same structure we’ll reuse on every Learn page."
                                />

                                <div className="grid gap-3">
                                    {[
                                        {
                                            step: "01",
                                            title: "Set pickup + destination (or multi-stops)",
                                            body: "Add your pickup, destination, and extra stops if needed. Planning makes the trip calmer and faster.",
                                        },
                                        {
                                            step: "02",
                                            title: "Arrival with standards",
                                            body: "Pickup behavior matters: calmer approach, cleaner presentation, predictable movement.",
                                        },
                                        {
                                            step: "03",
                                            title: "Movement + updates",
                                            body: "A clearer trip is a calmer trip: better expectations, less uncertainty, better confidence end-to-end.",
                                        },
                                        {
                                            step: "04",
                                            title: "Drop-off that feels premium",
                                            body: "Clean finish, respectful handover, and a brand experience that customers remember.",
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
                                                    Premium flow
                                                </div>
                                            </div>
                                        </TileCard>
                                    ))}
                                </div>
                            </Panel>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: easeOut, delay: 0.12 }}
                        >
                            <Panel className="p-6">
                                <SectionTitle
                                    eyebrow="Trust layer"
                                    title="Standards, safety culture, and policy alignment"
                                    desc="Premium is not just the vehicle — it’s the rules and conduct behind the experience."
                                />

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            Standards we emphasize
                                        </div>
                                        <BulletList
                                            items={[
                                                "Cleanliness and presentation expectations",
                                                "Professional conduct and respectful communication",
                                                "Compliance-first driving culture in busy city movement",
                                                "Support-first escalation when something feels off",
                                                "Account actions may occur for repeated violations (see policies)",
                                            ]}
                                        />
                                    </TileCard>

                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            Relevant policy references
                                        </div>
                                        <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                            Read these for the detailed rules behind the experience:
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            <Link className={CHIP} href="/policies/safety" target="_blank">
                                                Safety Guidelines
                                            </Link>
                                            <Link className={CHIP} href="/policies/acceptable-use" target="_blank">
                                                Acceptable Use
                                            </Link>
                                            <Link className={CHIP} href="/policies/terms" target="_blank">
                                                Terms of Service
                                            </Link>
                                            <Link className={CHIP} href="/policies/privacy" target="_blank">
                                                Privacy Policy
                                            </Link>
                                        </div>
                                        <div className="mt-3 text-[12px] text-neutral-800 leading-relaxed">
                                            These references explain expectations, conduct, and support behavior that protect riders and the brand.
                                        </div>
                                    </TileCard>
                                </div>
                            </Panel>
                        </motion.div>

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
                                            q: "Is this only for shopping?",
                                            a: "No. It covers errands, tours-style movement, lifestyle runs, and premium city movement.",
                                        },
                                        {
                                            q: "Can I do multiple stops?",
                                            a: "Yes. Multi-stop planning is part of the real-life package feel and reduces stress.",
                                        },
                                        {
                                            q: "What makes it “premium”?",
                                            a: "Clean presentation, calmer pickup culture, predictable updates, and disciplined service standards.",
                                        },
                                        {
                                            q: "Where can I read the rules?",
                                            a: "Use the policy links above (Safety, Acceptable Use, Terms, Privacy).",
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
                                        href="/"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Back to home
                                    </Link>

                                    <Link
                                        href="/partner"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Become a partner
                                    </Link>

                                    <Link
                                        href="/investors"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Investor overview
                                    </Link>

                                    <Link
                                        href="/policies/safety"
                                        target="_blank"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Read safety guidelines
                                    </Link>
                                </div>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {["Shopping", "Errands", "Lifestyle", "Tours", "Comfort"].map((t) => (
                                        <span key={t} className={CHIP}>
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-5 rounded-2xl border border-black/10 bg-white p-4 shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
                                    <div className="text-[11px] font-semibold text-neutral-900">
                                        we appreciate your interest in 6Rides Lifestyle Movement.
                                    </div>
                                    <div className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                        For inquiries or to get started, please contact our booking team at{" "}
                                        <a
                                            href="mailto:booking@6rides.com"
                                            className="text-blue-600 hover:underline"
                                        >
                                            booking@6rides.com
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
