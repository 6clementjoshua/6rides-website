// src/app/learn/food_traffic/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

function cx(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}

/** ✅ CRISP Water/Bevel system (layers behind content) */
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
                <div className="text-[11px] font-semibold tracking-wide text-neutral-800">{eyebrow}</div>
            ) : null}
            <h2 className="mt-1 text-xl font-semibold text-neutral-950 md:text-2xl">{title}</h2>
            {desc ? (
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-800">{desc}</p>
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

export default function LearnFoodTrafficPage() {
    // ✅ Mobile-only: tap-to-expand hero details
    const [mobileExpanded, setMobileExpanded] = useState(false);

    return (
        <main className="min-h-screen bg-white text-black">
            {/* Top bar */}
            <header className="sticky top-0 z-30 border-b border-black/10 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/6logo.PNG" alt="6ride" width={28} height={28} className="h-7 w-7" priority />
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
                            src="/images/6ride/food/6ride_food_delivery_heavy_traffic.png"
                            alt="6ride food delivery in heavy traffic"
                            fill
                            sizes="(max-width: 768px) 100vw, 1100px"
                            // ✅ mobile cover prevents empty borders; desktop stays cover
                            className="object-cover md:object-cover"
                            priority
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/22 to-transparent" />
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute -left-1/4 top-0 h-full w-1/2 rotate-12 bg-white/10 blur-2xl opacity-70" />
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                            {/* ✅ reduced blur intensity + lighter glass */}
                            <div className={cx(HERO_GLASS, "backdrop-blur-sm md:backdrop-blur-md")}>
                                <div className="text-[11px] font-semibold tracking-wide text-white/90">
                                    Food delivery • City performance
                                </div>

                                <h1 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
                                    Delivery that performs in real traffic.
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
                                            mobileExpanded ? "mt-2 max-h-[560px] opacity-100" : "max-h-0 opacity-0"
                                        )}
                                    >
                                        <p className="mt-2 text-sm text-white/90 leading-relaxed">
                                            Nigeria traffic is real. 6ride delivery is built around smart routing, disciplined riders, and
                                            predictable updates — so customers stay calm and restaurants stay respected.
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {["Smart routing", "Disciplined riders", "Predictable updates", "Reliable handover"].map((c) => (
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
                                        Nigeria traffic is real. 6ride delivery is built around smart routing, disciplined riders, and
                                        predictable updates — so customers stay calm and restaurants stay respected.
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {["Smart routing", "Disciplined riders", "Predictable updates", "Reliable handover"].map((c) => (
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
                                    eyebrow="Food delivery ontime performance"
                                    title="What “performs in traffic” means"
                                    desc="Traffic is unavoidable — chaos is not. Performance means disciplined behavior under pressure: better route choices, better communication, safer movement, and a consistent handover standard even when roads are slow."
                                />

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">Routing + decision discipline</div>
                                        <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                            When traffic is heavy, the rider’s decisions matter. Performance means choosing safer, smarter paths,
                                            avoiding reckless shortcuts, and keeping the package stable through movement.
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {["Smart routes", "Safer choices", "Stable handling"].map((c) => (
                                                <span key={c} className={CHIP}>
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    </TileCard>

                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">Predictable updates (calm customers)</div>
                                        <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                            Silence creates anxiety. Performance means updates that match reality — delays are communicated early,
                                            so customers stay calm and restaurants avoid complaints.
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {["Clear ETA", "Delay notice", "Less complaints"].map((c) => (
                                                <span key={c} className={CHIP}>
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    </TileCard>
                                </div>

                                <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
                                    <div className="text-sm font-semibold text-neutral-950">The real standard: consistency under pressure</div>
                                    <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                        Anyone can deliver when roads are empty. The premium difference shows in peak hours: safer movement,
                                        better communication, calmer behavior, and disciplined handover even when tired or delayed.
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
                                    title="What you get when traffic is heavy"
                                    desc="These are the practical features that protect the restaurant brand and the customer experience."
                                />

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">Customer experience protections</div>
                                        <BulletList
                                            items={[
                                                "Predictable updates (no silence when delayed)",
                                                "Clear pickup → movement → handover confirmations",
                                                "Disciplined rider communication standards",
                                                "Support escalation if something feels wrong",
                                                "Less complaint pressure on restaurants",
                                            ]}
                                        />
                                    </TileCard>

                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">Movement + safety discipline</div>
                                        <BulletList
                                            items={[
                                                "Safer movement culture in dense traffic zones",
                                                "No reckless driving to “beat time”",
                                                "Package stability and careful handling",
                                                "Compliance mindset around road rules",
                                                "Escalation path if rider is stuck or unsafe",
                                            ]}
                                        />
                                    </TileCard>
                                </div>

                                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                                    {[
                                        { title: "Best for", body: "Peak hours, rainy days, road diversions, event traffic." },
                                        { title: "Feels like", body: "Calmer delivery experience even when the city is slow." },
                                        { title: "Goal", body: "Predictability + safety + brand protection under pressure." },
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
                                    title="Traffic-proof delivery flow"
                                    desc="A disciplined process that keeps delivery consistent even when roads are chaotic."
                                />

                                <div className="grid gap-3">
                                    {[
                                        {
                                            step: "01",
                                            title: "Pickup confirmation + readiness",
                                            body: "Confirm order, secure packaging, and begin movement only when the package is stable and ready.",
                                        },
                                        {
                                            step: "02",
                                            title: "Smart routing + safe movement",
                                            body: "Use safer routes, avoid reckless shortcuts, and keep the package protected through traffic.",
                                        },
                                        {
                                            step: "03",
                                            title: "Predictable updates during delays",
                                            body: "Traffic delays are communicated early with simple updates so customers stay calm.",
                                        },
                                        {
                                            step: "04",
                                            title: "Reliable handover + confirmation",
                                            body: "Clean handover culture: respectful tone, package integrity, and clear completion confirmation.",
                                        },
                                    ].map((s) => (
                                        <TileCard key={s.step} className="p-5">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <div className="text-xs font-semibold text-neutral-800">Step {s.step}</div>
                                                    <div className="mt-1 text-sm font-semibold text-neutral-950">{s.title}</div>
                                                    <div className="mt-2 text-sm text-neutral-800 leading-relaxed">{s.body}</div>
                                                </div>
                                                <div className="hidden sm:block rounded-2xl border border-black/10 bg-white px-3 py-2 text-[11px] font-semibold text-neutral-900 shadow-[0_10px_22px_rgba(0,0,0,0.06)]">
                                                    Reliable
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
                                    desc="Traffic pressure can cause bad behavior. Premium delivery requires safer conduct, respectful communication, and accountability."
                                />

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">What we enforce in traffic</div>
                                        <BulletList
                                            items={[
                                                "No reckless driving to reduce ETA",
                                                "No harassment or intimidation",
                                                "No unsafe shortcuts that risk people or property",
                                                "Support escalation when stuck or unsafe",
                                                "Repeat violations may lead to suspension/removal",
                                            ]}
                                        />
                                    </TileCard>

                                    <TileCard className="p-5">
                                        <div className="text-sm font-semibold text-neutral-950">Relevant policy references</div>
                                        <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                            Read the standards behind conduct and enforcement:
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
                                            This is how we protect customers, restaurants, riders, and the public.
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
                                            q: "Do you promise no delays?",
                                            a: "No. Traffic can delay delivery. The standard is predictable updates and disciplined handling so the customer stays informed.",
                                        },
                                        {
                                            q: "What if a rider is stuck?",
                                            a: "Support escalation exists for stuck situations. The goal is to keep customers informed and resolve issues calmly.",
                                        },
                                        {
                                            q: "Why focus on safety in delivery?",
                                            a: "Reckless delivery behavior puts everyone at risk. A premium brand must emphasize compliance and safer movement culture.",
                                        },
                                        {
                                            q: "Where can I read the rules?",
                                            a: "Use the policy links above (Safety, Acceptable Use, Terms, Privacy).",
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
                                    {["Smart routing", "Updates", "Traffic", "Safety", "Reliability"].map((t) => (
                                        <span key={t} className={CHIP}>
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-5 rounded-2xl border border-black/10 bg-white p-4 shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
                                    <div className="text-[11px] font-semibold text-neutral-900">
                                        We appreciate your interest in 6ride Food Delivery.
                                    </div>
                                    <div className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                        For inquiries or to get started, please contact our sales team at{" "}
                                        <a href="mailto:sales@6rides.com" className="font-semibold text-black hover:text-neutral-800">
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
