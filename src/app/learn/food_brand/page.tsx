// src/app/learn/food_brand/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

function cx(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}

/**
 * ✅ CRISP Water/Bevel system (layers behind content)
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

export default function LearnFoodBrandPage() {
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
                            src="/images/6ride/food/6ride_food_delivery_brand_showcase.png"
                            alt="6Rides food delivery branded rider"
                            fill
                            sizes="(max-width: 768px) 100vw, 1100px"
                            className="object-contain md:object-cover"
                            priority
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/22 to-transparent" />
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute -left-1/4 top-0 h-full w-1/2 rotate-12 bg-white/10 blur-2xl opacity-70" />
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                            <div className={cx(HERO_GLASS, "backdrop-blur-md")}>
                                <div className="text-[11px] font-semibold tracking-wide text-white/90">
                                    Food delivery • Branded operations
                                </div>
                                <h1 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
                                    Food delivery with brand standards.
                                </h1>
                                <p className="mt-2 text-sm text-white/90 md:text-[15px] leading-relaxed">
                                    Not just dispatch — a disciplined delivery system: branded riders,
                                    protected packaging, and consistent handling that keeps restaurants
                                    trusted and customers confident.
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {["Branded riders", "Protected packaging", "Clean handling", "Support escalation"].map(
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
                        {/* Meaning */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: easeOut, delay: 0.05 }}
                        >
                            <Panel className="p-6">
                                <SectionTitle
                                    eyebrow="Food brand standards"
                                    title="What “brand standards” means for food delivery"
                                    desc="Delivery is part of a restaurant’s reputation. This package treats each delivery like a brand moment: clean appearance, disciplined handling, predictable updates, and respectful handover — so customers trust the restaurant and order again."
                                />

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            Restaurant trust protection
                                        </div>
                                        <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                            The rider is an extension of the restaurant brand. We emphasize
                                            clean presentation, professional behavior, and packaging respect
                                            to reduce “bad delivery experiences” that harm businesses.
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {["Clean look", "Respectful tone", "Packaging care"].map((c) => (
                                                <span key={c} className={CHIP}>
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    </TileCard>

                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            Customer confidence + repeat orders
                                        </div>
                                        <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                            Customers remember delivery quality: timing, communication, and
                                            condition at handover. A disciplined delivery experience
                                            increases trust and repeat business.
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {["Predictable ETA", "Clear updates", "Clean handover"].map((c) => (
                                                <span key={c} className={CHIP}>
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    </TileCard>
                                </div>

                                <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
                                    <div className="text-sm font-semibold text-neutral-950">
                                        What we’re solving (real world)
                                    </div>
                                    <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                        Nigeria delivery problems are common: rough handling, weak communication,
                                        inconsistent rider behavior, and unpredictable timing. This package
                                        reduces friction with standards + accountability + support escalation.
                                    </p>
                                </div>
                            </Panel>
                        </motion.div>

                        {/* Package contents */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: easeOut, delay: 0.08 }}
                        >
                            <Panel className="p-6">
                                <SectionTitle
                                    eyebrow="Package contents"
                                    title="What this delivery package includes"
                                    desc="A premium system is not one thing — it’s multiple layers working together."
                                />

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            Handling + presentation standards
                                        </div>
                                        <BulletList
                                            items={[
                                                "Branded rider presentation (clean, consistent look)",
                                                "Protected package mindset (no careless handling)",
                                                "Respectful communication with customers",
                                                "Handover treated like a brand moment",
                                                "Support escalation if anything goes wrong",
                                            ]}
                                        />
                                    </TileCard>

                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            Operational expectations
                                        </div>
                                        <BulletList
                                            items={[
                                                "Predictable updates when traffic slows delivery",
                                                "Better dispatch discipline (less “lost rider” issues)",
                                                "Clear pickup + drop-off confirmation culture",
                                                "Restaurant pickup professionalism (order matching)",
                                                "Account action for repeated policy violations",
                                            ]}
                                        />
                                    </TileCard>
                                </div>

                                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                                    {[
                                        { title: "Best for", body: "Restaurants, lounges, cafés, premium kitchens, event catering." },
                                        { title: "Feels like", body: "A trusted delivery extension of your restaurant brand." },
                                        { title: "Goal", body: "Higher confidence → fewer complaints → more repeat orders." },
                                    ].map((x) => (
                                        <TileCard key={x.title} className="p-5">
                                            <div className="text-sm font-semibold text-neutral-950">{x.title}</div>
                                            <div className="mt-2 text-sm text-neutral-800 leading-relaxed">{x.body}</div>
                                        </TileCard>
                                    ))}
                                </div>
                            </Panel>
                        </motion.div>

                        {/* Flow */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
                        >
                            <Panel className="p-6">
                                <SectionTitle
                                    eyebrow="Flow"
                                    title="How branded delivery works (end-to-end)"
                                    desc="Simple steps — but disciplined standards at each step."
                                />

                                <div className="grid gap-3">
                                    {[
                                        {
                                            step: "01",
                                            title: "Restaurant pickup with confirmation",
                                            body: "Pickup is treated as a quality checkpoint: order match, safe handling, and readiness before movement.",
                                        },
                                        {
                                            step: "02",
                                            title: "Protected movement in real traffic",
                                            body: "Smart routing mindset + careful handling to keep presentation intact even under traffic pressure.",
                                        },
                                        {
                                            step: "03",
                                            title: "Predictable updates, not silence",
                                            body: "Customers stay calm when updates are clear. Better communication = fewer complaints.",
                                        },
                                        {
                                            step: "04",
                                            title: "Clean, respectful handover",
                                            body: "Drop-off is the final brand moment: respectful tone, clean handoff, and reliable confirmation.",
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
                                                    Standard
                                                </div>
                                            </div>
                                        </TileCard>
                                    ))}
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
                                    eyebrow="Trust layer"
                                    title="Standards, safety culture, and policy alignment"
                                    desc="Branded delivery requires rules: respectful conduct, no harassment, no tampering, and accountability for repeated violations."
                                />

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            What we enforce
                                        </div>
                                        <BulletList
                                            items={[
                                                "No tampering with orders or packaging",
                                                "No harassment, intimidation, or unsafe behavior",
                                                "Clean presentation expectations for branded riders",
                                                "Clear support escalation when incidents happen",
                                                "Repeat violations may lead to suspension/removal",
                                            ]}
                                        />
                                    </TileCard>

                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">
                                            Relevant policy references
                                        </div>
                                        <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                            Read these for the detailed rules behind delivery conduct:
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
                                            Restaurants and customers are protected by conduct rules and enforcement.
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
                                            q: "Is this only for big restaurants?",
                                            a: "No. Any food brand that cares about reputation can use branded delivery — from cafés to premium kitchens.",
                                        },
                                        {
                                            q: "What if traffic delays delivery?",
                                            a: "Traffic happens. The standard is predictable updates and disciplined handling so the customer stays informed and calm.",
                                        },
                                        {
                                            q: "How do you protect customers?",
                                            a: "Through conduct rules, anti-tampering expectations, and support escalation when something goes wrong.",
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
                                        href="/policies/safety"
                                        target="_blank"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Read safety guidelines
                                    </Link>

                                    <Link
                                        href="/policies/acceptable-use"
                                        target="_blank"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Read acceptable use
                                    </Link>
                                </div>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {["Food", "Dispatch", "Brand standards", "Handover", "Trust"].map((t) => (
                                        <span key={t} className={CHIP}>
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-5 rounded-2xl border border-black/10 bg-white p-4 shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
                                    <div className="text-[11px] font-semibold text-neutral-900">
                                        We appreciate your interest in 6Rides Food Delivery.
                                    </div>
                                    <div className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                        For inquiries or to get started, please contact our sales team at{" "}
                                        <a
                                            href="mailto:sales@6rides.com"
                                            className="text-blue-600 hover:underline"
                                        >
                                            sales@6rides.com
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
