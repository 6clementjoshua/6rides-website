// src/app/learn/airport_fleet/page.tsx
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
    "after:content-[''] after:absolute after:inset-0 after:-z-10 after:rounded-3xl after:ring-1 after:ring-white/70";

const TILE =
    "relative isolate overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.06)]";
const TILE_BG =
    "before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-[radial-gradient(760px_420px_at_15%_0%,rgba(255,255,255,0.98),rgba(255,255,255,0.50),rgba(255,255,255,0))]";

const CHIP =
    "rounded-full border border-black/15 bg-white px-3 py-1 text-[11px] font-semibold text-neutral-900 shadow-[0_10px_22px_rgba(0,0,0,0.06)]";

const HERO_GLASS =
    "max-w-3xl rounded-2xl border border-white/30 bg-black/55 p-4 md:p-5 shadow-[0_18px_55px_rgba(0,0,0,0.18)]";

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

export default function LearnAirportFleetPage() {
    // ✅ Mobile-only collapse for hero text
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
                        "overflow-hidden rounded-3xl border border-black/80 shadow-[0_18px_55px_rgba(0,0,0,0.14)]",
                        // ✅ Mobile transparent background avoids any “outer color” showing
                        "bg-transparent md:bg-black"
                    )}
                >
                    <div className="relative h-[360px] sm:h-[440px] md:h-[540px]">
                        <Image
                            src="/images/6ride/infrastructure/6ride_airport_fleet_lineup.png"
                            alt="6ride fleet lineup at airport"
                            fill
                            // ✅ KEY FIX: mobile cover (no edges), desktop unchanged
                            className="object-cover md:object-cover"
                            priority
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/22 to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                            <div className={cx(HERO_GLASS, "backdrop-blur-md select-none")}>
                                <div className="text-[11px] font-semibold tracking-wide text-white/90">
                                    Operations • Fleet readiness
                                </div>

                                <h1 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
                                    Fleet readiness for scheduled operations.
                                </h1>

                                {/* ✅ MOBILE: tap to expand/collapse subtitle + chips */}
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
                                            mobileExpanded ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
                                        )}
                                    >
                                        <p className="mt-2 text-sm text-white/90 leading-relaxed">
                                            Airport transfers and scheduled trips depend on reliability. 6ride is structured to
                                            run disciplined operations with predictable service, clean presentation, and support
                                            escalation — so pickups feel organized, not chaotic.
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {["Scheduled pickups", "Airport transfers", "Reliable timing", "Support escalation"].map(
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

                                {/* ✅ DESKTOP: unchanged (always visible) */}
                                <div className="hidden md:block">
                                    <p className="mt-2 text-sm text-white/90 md:text-[15px] leading-relaxed">
                                        Airport transfers and scheduled trips depend on reliability. 6ride is structured to
                                        run disciplined operations with predictable service, clean presentation, and support
                                        escalation — so pickups feel organized, not chaotic.
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {["Scheduled pickups", "Airport transfers", "Reliable timing", "Support escalation"].map(
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
                    </div>
                </motion.div>

                {/* BODY */}
                <div className="mt-10 grid gap-8 md:grid-cols-12">
                    {/* MAIN */}
                    <div className="space-y-8 md:col-span-8">
                        {/* Explanation */}
                        <Panel>
                            <Section
                                eyebrow="Full explanation"
                                title="Airports punish disorganization"
                                desc="Airport movement is timing-sensitive: flights, security, traffic, queues, and luggage. This page explains how 6ride approaches airport operations — readiness, clean presentation, and predictable coordination."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        What goes wrong with airport pickups
                                    </div>
                                    <Bullets
                                        items={[
                                            "Late arrivals without clear coordination",
                                            "Poor communication about where to meet",
                                            "Messy vehicles for travelers with luggage",
                                            "No escalation path when schedules shift",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        The 6ride airport standard
                                    </div>
                                    <Bullets
                                        items={[
                                            "Predictable behavior and coordination mindset",
                                            "Cleaner presentation for first impressions",
                                            "Luggage-friendly movement culture",
                                            "Support escalation when plans change",
                                        ]}
                                    />
                                </Tile>
                            </div>

                            <div className="mt-6 rounded-2xl border border-black/10 bg-neutral-50 p-5">
                                <div className="text-sm font-semibold text-neutral-950">
                                    The real goal
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-neutral-800">
                                    Make airport movement feel organized: calmer pickup, cleaner arrival, predictable
                                    coordination, and a professional finish — because travelers remember the first and last mile.
                                </p>
                            </div>
                        </Panel>

                        {/* What you get */}
                        <Panel>
                            <Section
                                eyebrow="Package contents"
                                title="What you get in airport fleet readiness"
                                desc="Airport flow is built around timing discipline and service consistency."
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Service standards
                                    </div>
                                    <Bullets
                                        items={[
                                            "Clean vehicle presentation and premium-first mindset",
                                            "Predictable coordination and calmer pickup culture",
                                            "Support escalation when flight timing changes",
                                            "Compliance-first driving behavior in dense zones",
                                            "Account action possible for repeated violations",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Use cases
                                    </div>
                                    <Bullets
                                        items={[
                                            "Airport pickup and drop-off",
                                            "Hotel-to-airport and airport-to-office movement",
                                            "Business travel and executive arrivals",
                                            "Luggage-friendly movement",
                                            "Scheduled trips where timing matters",
                                        ]}
                                    />
                                </Tile>
                            </div>

                            <div className="mt-5 grid gap-4 sm:grid-cols-3">
                                {[
                                    {
                                        title: "Best for",
                                        body: "Travelers, executives, business arrivals, airport schedules, hospitality.",
                                    },
                                    {
                                        title: "Feels like",
                                        body: "Organized pickup + clean presentation + predictable coordination.",
                                    },
                                    {
                                        title: "Positioning",
                                        body: "Premium timing discipline for modern Nigeria movement.",
                                    },
                                ].map((x) => (
                                    <Tile key={x.title}>
                                        <div className="text-sm font-semibold text-neutral-950">{x.title}</div>
                                        <div className="mt-2 text-sm leading-relaxed text-neutral-800">{x.body}</div>
                                    </Tile>
                                ))}
                            </div>
                        </Panel>

                        {/* How it works */}
                        <Panel>
                            <Section
                                eyebrow="Flow"
                                title="How airport pickup flow works"
                                desc="Simple steps that reduce confusion and missed connections."
                            />
                            <div className="grid gap-3">
                                {[
                                    {
                                        step: "01",
                                        title: "Set airport pickup/drop clearly",
                                        body: "Use the correct terminal/zone and add any notes (entrance, airline, gate/landmark).",
                                    },
                                    {
                                        step: "02",
                                        title: "Coordinate calmly",
                                        body: "Airport zones can be busy. Clear communication and calmer pickup behavior reduce chaos.",
                                    },
                                    {
                                        step: "03",
                                        title: "Move with compliance-first discipline",
                                        body: "Dense traffic and enforcement zones require careful, lawful, professional movement.",
                                    },
                                    {
                                        step: "04",
                                        title: "Finish like a premium service",
                                        body: "Clean arrival, respectful handover, luggage-friendly support where possible.",
                                    },
                                ].map((s) => (
                                    <Tile key={s.step}>
                                        <div className="text-xs font-semibold text-neutral-800">Step {s.step}</div>
                                        <div className="mt-1 text-sm font-semibold text-neutral-950">{s.title}</div>
                                        <div className="mt-2 text-sm leading-relaxed text-neutral-800">{s.body}</div>
                                    </Tile>
                                ))}
                            </div>
                        </Panel>

                        {/* Policies */}
                        <Panel>
                            <Section
                                eyebrow="Trust layer"
                                title="Operational standards and policy alignment"
                                desc="Airports require strict conduct. Policies define what’s allowed and what happens when standards are violated."
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        What we enforce
                                    </div>
                                    <Bullets
                                        items={[
                                            "No harassment, intimidation, or discrimination",
                                            "No reckless driving or unsafe behavior",
                                            "Compliance-first behavior in dense zones",
                                            "Support escalation for disputes or issues",
                                            "Suspension/removal may occur for repeated violations",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">References</div>
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
                                    <div className="mt-3 text-[12px] leading-relaxed text-neutral-800">
                                        These documents define expectations, enforcement, and account actions.
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
                                        q: "Do you guarantee flight timing?",
                                        a: "No. Travel is affected by traffic, airport processes, and schedule changes. We focus on readiness and coordination culture.",
                                    },
                                    {
                                        q: "Can I book airport trips for guests?",
                                        a: "Yes. Airport flow supports hospitality and executive arrivals where available.",
                                    },
                                    {
                                        q: "What if my pickup point changes?",
                                        a: "Use calm coordination and support escalation if needed.",
                                    },
                                    {
                                        q: "Where are the rules written?",
                                        a: "Safety Guidelines, Acceptable Use, Terms of Service, and Privacy Policy.",
                                    },
                                ].map((x) => (
                                    <Tile key={x.q}>
                                        <div className="text-sm font-semibold text-neutral-950">{x.q}</div>
                                        <div className="mt-2 text-sm leading-relaxed text-neutral-800">{x.a}</div>
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
                                        href="/policies/safety"
                                        target="_blank"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Read safety guidelines
                                    </Link>
                                    <Link
                                        href="/partner"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Partner with 6ride
                                    </Link>
                                </div>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {["Airports", "Scheduled trips", "Reliability", "Fleet readiness"].map((t) => (
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
