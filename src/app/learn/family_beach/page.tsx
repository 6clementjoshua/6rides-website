// src/app/learn/family_beach/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

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
    "after:content-[''] after:absolute after:inset-0 before:-z-10 after:rounded-3xl after:ring-1 after:ring-white/70";

const TILE =
    "relative isolate overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.06)]";
const TILE_BG =
    "before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-[radial-gradient(760px_420px_at_15%_0%,rgba(255,255,255,0.98),rgba(255,255,255,0.50),rgba(255,255,255,0))]";

const CHIP =
    "rounded-full border border-black/15 bg-white px-3 py-1 text-[11px] font-semibold text-neutral-900 shadow-[0_10px_22px_rgba(0,0,0,0.06)]";

/** ✅ Lighter glass + reduced blur on mobile */
const HERO_GLASS =
    "max-w-3xl rounded-2xl border border-white/30 bg-black/28 md:bg-black/35 p-4 md:p-5 shadow-[0_18px_55px_rgba(0,0,0,0.14)]";

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

export default function LearnFamilyBeachPage() {
    // ✅ Mobile-only: tap-to-expand hero details
    const [mobileExpanded, setMobileExpanded] = useState(false);

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
                    className={cx(
                        "overflow-hidden rounded-3xl border border-black/10 shadow-[0_18px_55px_rgba(0,0,0,0.14)]",
                        // ✅ mobile: avoid visible outer “black card” edge
                        "bg-transparent md:bg-black"
                    )}
                >
                    <div className="relative h-[360px] sm:h-[440px] md:h-[540px]">
                        <Image
                            src="/images/6ride/lifestyle/6ride_family_beach_lifestyle.png"
                            alt="6ride family lifestyle transport"
                            fill
                            // ✅ fix “white/grey showing” on mobile:
                            // contain causes letterboxing on some images, so mobile is cover.
                            className="object-cover md:object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/22 to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                            <div className={cx(HERO_GLASS, "backdrop-blur-sm md:backdrop-blur-md")}>
                                <div className="text-[11px] font-semibold tracking-wide text-white/90">
                                    Lifestyle • Family movement
                                </div>

                                <h1 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
                                    Family trips made smoother.
                                </h1>

                                {/* ✅ MOBILE: hint + tap-to-expand */}
                                <div className="md:hidden">
                                    <button
                                        type="button"
                                        onClick={() => setMobileExpanded((v) => !v)}
                                        className="mt-2 w-full text-left"
                                        aria-expanded={mobileExpanded}
                                        aria-controls="hero-mobile-details"
                                    >
                                        {!mobileExpanded ? (
                                            <div className="text-[12px] text-white/80">
                                                Tap to read more <span className="ml-2 text-white/60">▾</span>
                                            </div>
                                        ) : (
                                            <div className="text-[12px] text-white/80">
                                                Tap to collapse <span className="ml-2 text-white/60">▴</span>
                                            </div>
                                        )}
                                    </button>

                                    <div
                                        id="hero-mobile-details"
                                        className={cx(
                                            "overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
                                            mobileExpanded ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
                                        )}
                                    >
                                        <p className="mt-2 text-sm text-white/90 leading-relaxed">
                                            When comfort matters — outings, weekend trips, and family movement — 6ride focuses on cleaner
                                            vehicles, calmer pickups, and more predictable service so parents feel less stress and families feel safer.
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {["Calm pickups", "Clean rides", "Family comfort", "Predictable service"].map((c) => (
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
                                        When comfort matters — outings, weekend trips, and family movement — 6ride focuses on cleaner
                                        vehicles, calmer pickups, and more predictable service so parents feel less stress and families feel safer.
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {["Calm pickups", "Clean rides", "Family comfort", "Predictable service"].map((c) => (
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
                        {/* Explanation */}
                        <Panel>
                            <Section
                                eyebrow="Full explanation"
                                title="Family movement needs calm structure"
                                desc="With family trips, stress comes from uncertainty: late pickups, dirty interiors, unpredictable driving, and poor coordination. This page explains how 6ride is designed to reduce friction and support calmer family movement."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        What families dislike
                                    </div>
                                    <Bullets
                                        items={[
                                            "Dirty cabins and unpleasant smells",
                                            "Chaotic pickups with unclear arrival behavior",
                                            "Aggressive driving that scares children",
                                            "Disrespectful talk or uncomfortable behavior",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        The 6ride family standard
                                    </div>
                                    <Bullets
                                        items={[
                                            "Clean vehicle presentation and comfort-first posture",
                                            "Calmer pickup culture and clearer expectations",
                                            "Safer driving mindset and compliance culture",
                                            "Support escalation if anything feels off",
                                        ]}
                                    />
                                </Tile>
                            </div>

                            <div className="mt-6 rounded-2xl border border-black/10 bg-neutral-50 p-5">
                                <div className="text-sm font-semibold text-neutral-950">
                                    The outcome we want
                                </div>
                                <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                    A trip that feels organized: calmer pickup, cleaner cabin, safer movement, and a respectful finish.
                                    That’s what makes family trips smoother.
                                </p>
                            </div>
                        </Panel>

                        {/* What you get */}
                        <Panel>
                            <Section
                                eyebrow="Package contents"
                                title="What’s included in family-friendly comfort"
                                desc="These are the standards that create a calmer ride for parents, guardians, and children."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Experience standards
                                    </div>
                                    <Bullets
                                        items={[
                                            "Cleaner vehicle presentation and a comfort-first mindset",
                                            "Calm pickup behavior and clearer service expectations",
                                            "Safer driving posture (no risky moves for speed)",
                                            "Respectful communication standards",
                                            "Support-first escalation when something feels off",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Common family use cases
                                    </div>
                                    <Bullets
                                        items={[
                                            "Outings (parks, beaches, gatherings)",
                                            "Weekend trips and family errands",
                                            "Restaurants and family events",
                                            "Campus-related parent visits",
                                            "Airport/hotel add-on movement when traveling",
                                        ]}
                                    />
                                </Tile>
                            </div>

                            <div className="mt-5 grid gap-4 sm:grid-cols-3">
                                {[
                                    {
                                        title: "Best for",
                                        body: "Parents, guardians, family outings, weekend movement, calmer city trips.",
                                    },
                                    {
                                        title: "Feels like",
                                        body: "Clean cabin + calmer pickup + safer movement = lower stress.",
                                    },
                                    {
                                        title: "Positioning",
                                        body: "Premium family comfort, built on conduct and standards.",
                                    },
                                ].map((x) => (
                                    <Tile key={x.title}>
                                        <div className="text-sm font-semibold text-neutral-950">{x.title}</div>
                                        <div className="mt-2 text-sm text-neutral-800 leading-relaxed">{x.body}</div>
                                    </Tile>
                                ))}
                            </div>
                        </Panel>

                        {/* Flow */}
                        <Panel>
                            <Section
                                eyebrow="Flow"
                                title="How family trips work"
                                desc="Simple steps that reduce confusion and keep the ride calm."
                            />
                            <div className="grid gap-3">
                                {[
                                    {
                                        step: "01",
                                        title: "Set pickup + destination clearly",
                                        body: "Use a clear landmark. If you’re traveling with children, planning reduces delays and stress.",
                                    },
                                    {
                                        step: "02",
                                        title: "Pickup with calm standards",
                                        body: "The arrival matters: clean presentation, calm behavior, and respectful communication.",
                                    },
                                    {
                                        step: "03",
                                        title: "Move with safety-first posture",
                                        body: "No risky shortcuts. The priority is safer movement and a calm cabin experience.",
                                    },
                                    {
                                        step: "04",
                                        title: "Drop-off with respect",
                                        body: "A clean finish and professional behavior — because families remember how the ride felt.",
                                    },
                                ].map((s) => (
                                    <Tile key={s.step}>
                                        <div className="text-xs font-semibold text-neutral-800">Step {s.step}</div>
                                        <div className="mt-1 text-sm font-semibold text-neutral-950">{s.title}</div>
                                        <div className="mt-2 text-sm text-neutral-800 leading-relaxed">{s.body}</div>
                                    </Tile>
                                ))}
                            </div>
                        </Panel>

                        {/* Child/Student safety alignment */}
                        <Panel>
                            <Section
                                eyebrow="Safety layer"
                                title="Child & student safety alignment"
                                desc="If a trip involves minors, expectations are stricter. We emphasize respectful conduct, safety-first driving, and policy enforcement."
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">Standards we emphasize</div>
                                    <Bullets
                                        items={[
                                            "No harassment, intimidation, or inappropriate conduct",
                                            "No reckless driving or unsafe movement",
                                            "Respectful language and professional behavior",
                                            "Support escalation if a rider feels unsafe",
                                            "Account action may occur for repeated violations",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">References</div>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        <Link className={CHIP} href="/policies/child-student-safety" target="_blank">
                                            Child & Student Safety
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
                                        These documents define expectations, prohibited behavior, and enforcement actions.
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
                                        q: "Is this a kids-only service?",
                                        a: "No. It’s a standards-first comfort approach for family trips. When minors are involved, safety expectations are stricter.",
                                    },
                                    {
                                        q: "Do you provide child seats?",
                                        a: "Not guaranteed. Availability depends on location and vehicle options. Always plan ahead if you require one.",
                                    },
                                    {
                                        q: "What if I feel unsafe during a trip?",
                                        a: "Use support escalation immediately. Repeated violations can lead to restrictions or account removal.",
                                    },
                                    {
                                        q: "Where are rules written?",
                                        a: "Child & Student Safety, Safety Guidelines, Acceptable Use, and Terms of Service.",
                                    },
                                ].map((x) => (
                                    <Tile key={x.q}>
                                        <div className="text-sm font-semibold text-neutral-950">{x.q}</div>
                                        <div className="mt-2 text-sm text-neutral-800 leading-relaxed">{x.a}</div>
                                    </Tile>
                                ))}
                            </div>
                        </Panel>
                    </div>

                    {/* ASIDE */}
                    <aside className="md:col-span-4">
                        <div className="sticky top-24 space-y-4">
                            <Panel>
                                <div className="text-sm font-semibold text-neutral-950">Next actions</div>
                                <div className="mt-3 grid gap-2">
                                    <Link
                                        href="/"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Back to home
                                    </Link>
                                    <Link
                                        href="/policies/child-student-safety"
                                        target="_blank"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Read child & student safety
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
                                    {["Family", "Comfort", "Clean rides", "Safer driving"].map((t) => (
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
