// src/app/learn/urus/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

function cx(...p: Array<string | false | null | undefined>) {
    return p.filter(Boolean).join(" ");
}

/* ====== Premium crisp UI system ====== */
const PANEL =
    "relative isolate overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.10)]";
const PANEL_BG =
    "before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-[radial-gradient(1100px_520px_at_20%_0%,rgba(255,255,255,0.98),rgba(255,255,255,0.55),rgba(255,255,255,0))]";
const PANEL_EDGE =
    "after:content-[''] after:absolute after:inset-0 after:-z-10 after:rounded-3xl after:ring-1 after:ring-white/70";

const TILE =
    "relative isolate overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.06)]";
const TILE_BG =
    "before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-[radial-gradient(760px_420px_at_15%_0%,rgba(255,255,255,0.98),rgba(255,255,255,0.50),rgba(255,255,255,0))]";

const CHIP =
    "rounded-full border border-black/15 bg-white px-3 py-1 text-[11px] font-semibold text-neutral-900 shadow-[0_10px_22px_rgba(0,0,0,0.06)]";

/** ✅ Reduced from bg-black/55 → bg-black/22 (still readable, shows image) */
const HERO_GLASS =
    "max-w-3xl rounded-2xl border border-white/25 bg-black/22 p-4 md:p-5 shadow-[0_18px_55px_rgba(0,0,0,0.14)]";

function Panel({ children }: { children: React.ReactNode }) {
    return (
        <div className={cx(PANEL, PANEL_BG, PANEL_EDGE)}>
            <div className="relative z-10 p-6">{children}</div>
        </div>
    );
}

function Tile({ children }: { children: React.ReactNode }) {
    return (
        <div className={cx(TILE, TILE_BG)}>
            <div className="relative z-10 p-5">{children}</div>
        </div>
    );
}

function Section({
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
            {eyebrow && (
                <div className="text-[11px] font-semibold tracking-wide text-neutral-800">
                    {eyebrow}
                </div>
            )}
            <h2 className="mt-1 text-xl font-semibold text-neutral-950 md:text-2xl">
                {title}
            </h2>
            {desc && (
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-800">
                    {desc}
                </p>
            )}
        </div>
    );
}

function Bullets({ items }: { items: string[] }) {
    return (
        <ul className="mt-3 grid gap-2 text-sm text-neutral-900">
            {items.map((i) => (
                <li key={i} className="flex gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-neutral-500" />
                    <span>{i}</span>
                </li>
            ))}
        </ul>
    );
}

function TapToSeeMore({
    onClick,
    className,
}: {
    onClick: () => void;
    className?: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cx(
                "inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-[11px] font-semibold text-white hover:bg-white/15 active:scale-[0.99]",
                className
            )}
            aria-label="Tap to see more"
        >
            <span className="h-1.5 w-1.5 rounded-full bg-white/85" />
            Tap to see more
            <span aria-hidden className="opacity-80">
                →
            </span>
        </button>
    );
}

export default function LearnUrusPage() {
    const [expanded, setExpanded] = useState(false);

    const chips = useMemo(
        () => ["Comfort-first", "Safety posture", "Highway stability", "Calm travel"],
        []
    );

    return (
        <main className="min-h-screen bg-white text-black">
            {/* Header */}
            <header className="sticky top-0 z-30 border-b border-black/10 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/6logo.PNG" alt="6ride" width={28} height={28} />
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
                {/* HERO */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: easeOut }}
                    className="overflow-hidden rounded-3xl border border-black/10 bg-black shadow-[0_18px_55px_rgba(0,0,0,0.14)]"
                >
                    <div className="relative h-[360px] sm:h-[440px] md:h-[540px]">
                        {/* ✅ Mobile fit: contain on mobile, cover on md+ */}
                        <Image
                            src="/images/6ride/lifestyle/6ride_highway_performance_urus.png"
                            alt="6ride premium performance vehicle on highway"
                            fill
                            sizes="(max-width: 768px) 100vw, 1100px"
                            className="object-contain md:object-cover"
                            priority
                        />

                        {/* ✅ Keep the cinematic overlay but lighter than before */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/18 to-transparent" />

                        {/* Bottom content */}
                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                            <div className={cx(HERO_GLASS, "backdrop-blur-md")}>
                                <div className="text-[11px] font-semibold tracking-wide text-white/90">
                                    Premium fleet • Highway performance
                                </div>

                                <h1 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
                                    Premium performance for longer movement.
                                </h1>

                                {/* ✅ “Tap to see more” collapse/expand on mobile */}
                                <p
                                    className={cx(
                                        "mt-2 text-sm text-white/90 md:text-[15px] leading-relaxed",
                                        expanded ? "" : "line-clamp-3 md:line-clamp-none"
                                    )}
                                >
                                    For highway travel and longer movement, premium comfort changes
                                    everything — less stress, better control, and a calmer travel
                                    experience. The goal is not speed, it’s quality, stability, and
                                    a safety-first posture.
                                </p>

                                {/* ✅ show button only when collapsed (mobile-first) */}
                                {!expanded && (
                                    <div className="mt-3 md:hidden">
                                        <TapToSeeMore onClick={() => setExpanded(true)} />
                                    </div>
                                )}

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {chips.map((c) => (
                                        <span
                                            key={c}
                                            className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white"
                                        >
                                            {c}
                                        </span>
                                    ))}
                                </div>

                                {/* ✅ collapse back (optional) */}
                                {expanded && (
                                    <div className="mt-3 md:hidden">
                                        <button
                                            type="button"
                                            onClick={() => setExpanded(false)}
                                            className="text-[11px] font-semibold text-white/85 underline underline-offset-4 hover:text-white"
                                        >
                                            Show less
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* BODY */}
                <div className="mt-10 grid gap-8 md:grid-cols-12">
                    {/* MAIN */}
                    <div className="md:col-span-8 space-y-8">
                        {/* Explanation */}
                        <Panel>
                            <Section
                                eyebrow="Full explanation"
                                title="Long trips amplify every weak standard"
                                desc="On highways and longer routes, a dirty cabin feels worse, risky driving feels scarier, and uncertainty feels heavier. This page expands the premium promise into a clear travel posture: comfort, stability, and safety-first behavior."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        What ruins long trips
                                    </div>
                                    <Bullets
                                        items={[
                                            "Unclean cabin and discomfort over time",
                                            "Aggressive driving and risky overtakes",
                                            "Unclear routing and poor communication",
                                            "No escalation path when something feels off",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        The 6ride highway standard
                                    </div>
                                    <Bullets
                                        items={[
                                            "Comfort-first interior and calm presentation",
                                            "Compliance-first driving posture (safety beats speed)",
                                            "Clear communication and predictable movement",
                                            "Support escalation when something feels unsafe",
                                        ]}
                                    />
                                </Tile>
                            </div>

                            <div className="mt-6 rounded-2xl border border-black/10 bg-neutral-50 p-5">
                                <div className="text-sm font-semibold text-neutral-950">
                                    Important note on speed
                                </div>
                                <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                    Premium does not mean rushing. The priority is stability, safer
                                    driving, and calmer travel — especially on highways and longer routes.
                                </p>
                            </div>
                        </Panel>

                        {/* What you get */}
                        <Panel>
                            <Section
                                eyebrow="Package contents"
                                title="What you get for longer movement"
                                desc="The standards and travel posture that reduce stress on longer routes."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Experience standards
                                    </div>
                                    <Bullets
                                        items={[
                                            "Clean presentation and comfort-first approach",
                                            "Calmer pickup and clearer expectations",
                                            "Compliance-first driving mindset on highways",
                                            "Predictable movement and communication",
                                            "Support escalation if anything feels unsafe",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Best use cases
                                    </div>
                                    <Bullets
                                        items={[
                                            "Longer city-to-city movement where available",
                                            "Airport runs and scheduled travel",
                                            "Business travel requiring calm arrival",
                                            "Family movement where comfort matters",
                                            "Event movement that requires timing",
                                        ]}
                                    />
                                </Tile>
                            </div>

                            <div className="mt-5 grid gap-4 sm:grid-cols-3">
                                {[
                                    {
                                        title: "Best for",
                                        body: "Longer trips, scheduled travel, calm arrivals, comfort-focused movement.",
                                    },
                                    {
                                        title: "Feels like",
                                        body: "More stable travel: clean cabin + safer posture + calmer experience.",
                                    },
                                    {
                                        title: "Positioning",
                                        body: "Premium long-route movement built on standards, not speed.",
                                    },
                                ].map((x) => (
                                    <Tile key={x.title}>
                                        <div className="text-sm font-semibold text-neutral-950">
                                            {x.title}
                                        </div>
                                        <div className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                            {x.body}
                                        </div>
                                    </Tile>
                                ))}
                            </div>
                        </Panel>

                        {/* Flow */}
                        <Panel>
                            <Section
                                eyebrow="Flow"
                                title="How longer trips work"
                                desc="Clear steps that reduce stress and increase safety."
                            />
                            <div className="grid gap-3">
                                {[
                                    {
                                        step: "01",
                                        title: "Confirm pickup + destination clearly",
                                        body: "Long trips need clarity. Confirm landmarks and the exact destination to avoid rerouting stress.",
                                    },
                                    {
                                        step: "02",
                                        title: "Start with calm pickup culture",
                                        body: "A calmer start sets the tone: professional conduct, clean presentation, clear expectations.",
                                    },
                                    {
                                        step: "03",
                                        title: "Travel with safety-first posture",
                                        body: "Compliance-first driving. The goal is stable travel — no reckless moves for speed.",
                                    },
                                    {
                                        step: "04",
                                        title: "Finish with a clean arrival",
                                        body: "A calm finish matters: respectful drop-off, professional behavior, and a trip that feels controlled.",
                                    },
                                ].map((s) => (
                                    <Tile key={s.step}>
                                        <div className="text-xs font-semibold text-neutral-800">
                                            Step {s.step}
                                        </div>
                                        <div className="mt-1 text-sm font-semibold text-neutral-950">
                                            {s.title}
                                        </div>
                                        <div className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                            {s.body}
                                        </div>
                                    </Tile>
                                ))}
                            </div>
                        </Panel>

                        {/* Policy alignment */}
                        <Panel>
                            <Section
                                eyebrow="Risk & responsibility"
                                title="Safety, insurance, and liability alignment"
                                desc="Longer movement has higher risk exposure. Rules matter."
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        What we emphasize
                                    </div>
                                    <Bullets
                                        items={[
                                            "Compliance-first driving culture",
                                            "No reckless driving or dangerous shortcuts",
                                            "Respectful conduct and calm communication",
                                            "Support escalation when something feels unsafe",
                                            "Policy-backed enforcement for repeat violations",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        References
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        <Link className={CHIP} href="/policies/safety" target="_blank">
                                            Safety Guidelines
                                        </Link>
                                        <Link
                                            className={CHIP}
                                            href="/policies/insurance-liability"
                                            target="_blank"
                                        >
                                            Insurance & Liability
                                        </Link>
                                        <Link className={CHIP} href="/policies/terms" target="_blank">
                                            Terms of Service
                                        </Link>
                                    </div>
                                    <div className="mt-3 text-[12px] text-neutral-800 leading-relaxed">
                                        These documents define expectations, responsibilities, and limitations.
                                    </div>
                                </Tile>
                            </div>
                        </Panel>

                        {/* FAQ */}
                        <Panel>
                            <Section eyebrow="FAQ" title="Common questions" />
                            <div className="grid gap-3">
                                {[
                                    {
                                        q: "Is this a racing or speed service?",
                                        a: "No. Premium here means comfort, control, and safety-first posture — not rushing.",
                                    },
                                    {
                                        q: "Do you guarantee inter-city travel everywhere?",
                                        a: "Availability depends on active coverage and service zones. Check local availability.",
                                    },
                                    {
                                        q: "What if I feel unsafe on a highway trip?",
                                        a: "Use support escalation immediately. Repeated violations can lead to restrictions or removal.",
                                    },
                                    {
                                        q: "Where are liability rules written?",
                                        a: "See Safety Guidelines, Insurance & Liability, and Terms of Service.",
                                    },
                                ].map((x) => (
                                    <Tile key={x.q}>
                                        <div className="text-sm font-semibold text-neutral-950">
                                            {x.q}
                                        </div>
                                        <div className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                            {x.a}
                                        </div>
                                    </Tile>
                                ))}
                            </div>
                        </Panel>
                    </div>

                    {/* ASIDE */}
                    <aside className="md:col-span-4">
                        <div className="sticky top-24 space-y-4">
                            <Panel>
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
                                        href="/policies/insurance-liability"
                                        target="_blank"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Read insurance & liability
                                    </Link>
                                </div>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {["Highway", "Comfort", "Safety-first", "Long trips"].map((t) => (
                                        <span key={t} className={CHIP}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </Panel>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
