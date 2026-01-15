// src/app/learn/police_compliance/page.tsx
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

/** ✅ LESS BLACK / more transparent hero text card */
const HERO_GLASS =
    "max-w-3xl rounded-2xl border border-white/30 bg-black/22 md:bg-black/30 p-4 md:p-5 shadow-[0_18px_55px_rgba(0,0,0,0.14)]";

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

export default function LearnPoliceCompliancePage() {
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
                    className="overflow-hidden rounded-3xl border border-black/10 bg-black shadow-[0_18px_55px_rgba(0,0,0,0.14)]"
                >
                    <div className="relative h-[360px] sm:h-[440px] md:h-[540px]">
                        <Image
                            src="/images/6ride/infrastructure/6ride_police_traffic_compliance.png"
                            alt="6ride traffic compliance scene"
                            fill
                            sizes="(max-width: 768px) 100vw, 1100px"
                            className="object-cover md:object-cover"
                            priority
                        />

                        {/* ✅ LESS BLACK overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/18 to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                            <div className={cx(HERO_GLASS, "backdrop-blur-sm md:backdrop-blur-md")}>
                                <div className="text-[11px] font-semibold tracking-wide text-white/90">
                                    Safety • Traffic compliance
                                </div>

                                <h1 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
                                    Traffic & compliance — built into the brand.
                                </h1>

                                {/* ✅ Mobile: Tap to read more */}
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
                                            mobileExpanded ? "mt-2 max-h-[900px] opacity-100" : "max-h-0 opacity-0"
                                        )}
                                    >
                                        <p className="mt-2 text-sm text-white/90 leading-relaxed">
                                            A serious mobility brand respects the road. 6ride emphasizes compliance, safer
                                            driving culture, and professional conduct — especially in busy city movement and
                                            enforcement zones.
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {["Compliance culture", "Safer driving", "Professional conduct", "Support escalation"].map(
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

                                {/* ✅ Desktop: always visible */}
                                <div className="hidden md:block">
                                    <p className="mt-2 text-sm text-white/90 md:text-[15px] leading-relaxed">
                                        A serious mobility brand respects the road. 6ride emphasizes compliance, safer
                                        driving culture, and professional conduct — especially in busy city movement and
                                        enforcement zones.
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {["Compliance culture", "Safer driving", "Professional conduct", "Support escalation"].map(
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
                    <div className="md:col-span-8 space-y-8">
                        <Panel>
                            <Section
                                eyebrow="Full explanation"
                                title="Compliance is part of “premium”"
                                desc="Premium mobility is not only about the car. It’s about conduct: respecting traffic rules, avoiding reckless shortcuts, and handling enforcement zones with calm professionalism. This reduces risk, protects riders, and protects the brand."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        What breaks trust fast
                                    </div>
                                    <Bullets
                                        items={[
                                            "Reckless speed, risky overtakes, and sudden braking",
                                            "Aggressive arguments with enforcement officers",
                                            "Unsafe shortcuts that increase danger",
                                            "Trying to “rush” at the cost of safety",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        The 6ride compliance culture
                                    </div>
                                    <Bullets
                                        items={[
                                            "Compliance-first driving and safer movement mindset",
                                            "Calm, respectful conduct in enforcement zones",
                                            "Clear communication (no panic escalation)",
                                            "Support escalation when issues occur",
                                        ]}
                                    />
                                </Tile>
                            </div>

                            <div className="mt-6 rounded-2xl border border-black/10 bg-neutral-50 p-5">
                                <div className="text-sm font-semibold text-neutral-950">
                                    Why we take this seriously
                                </div>
                                <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                    Non-compliance increases accidents, delays, and disputes. A premium system reduces
                                    friction by setting behavior standards and enforcing them — with clear policies and
                                    consequences for repeated violations.
                                </p>
                            </div>
                        </Panel>

                        <Panel>
                            <Section
                                eyebrow="Package contents"
                                title="What you get in a compliance-first ride"
                                desc="The goal is calmer movement, fewer conflicts, and safer outcomes."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Rider experience
                                    </div>
                                    <Bullets
                                        items={[
                                            "A calmer ride with fewer risky moves",
                                            "More predictable behavior in traffic",
                                            "Professional conduct expectations",
                                            "Support escalation if something feels off",
                                            "Policy-backed standards and enforcement",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Operational culture
                                    </div>
                                    <Bullets
                                        items={[
                                            "Compliance-first behavior in busy zones",
                                            "Avoiding confrontations and unnecessary disputes",
                                            "Professional communication standards",
                                            "Safety-driven decision-making under pressure",
                                            "Account action possible for repeated violations",
                                        ]}
                                    />
                                </Tile>
                            </div>

                            <div className="mt-5 grid gap-4 sm:grid-cols-3">
                                {[
                                    {
                                        title: "Best for",
                                        body: "Daily city movement, corporate trips, night rides, high-traffic areas.",
                                    },
                                    { title: "Feels like", body: "Less drama. More control. Safer driving culture." },
                                    { title: "Positioning", body: "Premium movement built on rules and discipline." },
                                ].map((x) => (
                                    <Tile key={x.title}>
                                        <div className="text-sm font-semibold text-neutral-950">{x.title}</div>
                                        <div className="mt-2 text-sm text-neutral-800 leading-relaxed">{x.body}</div>
                                    </Tile>
                                ))}
                            </div>
                        </Panel>

                        <Panel>
                            <Section
                                eyebrow="Guidance"
                                title="What riders and drivers should do"
                                desc="Clear behavior reduces conflict and increases safety."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Riders (best practice)
                                    </div>
                                    <Bullets
                                        items={[
                                            "Avoid encouraging unsafe speed or risky shortcuts",
                                            "Keep communication calm in tense situations",
                                            "If you feel unsafe, use support escalation",
                                            "Do not engage in harassment or abusive language",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Drivers (service posture)
                                    </div>
                                    <Bullets
                                        items={[
                                            "Drive compliance-first; safety beats speed",
                                            "Stay calm and respectful in enforcement zones",
                                            "Avoid confrontations and arguments",
                                            "Escalate to support when disputes occur",
                                        ]}
                                    />
                                </Tile>
                            </div>

                            <div className="mt-6 rounded-2xl border border-black/10 bg-neutral-50 p-5">
                                <div className="text-sm font-semibold text-neutral-950">
                                    Important note
                                </div>
                                <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                    6ride is a mobility service with standards and policies. In a real emergency or
                                    immediate danger situation, contact local emergency services.
                                </p>
                            </div>
                        </Panel>

                        <Panel>
                            <Section
                                eyebrow="Trust layer"
                                title="Policy references"
                                desc="These documents define unacceptable conduct and what we do when standards are violated."
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">What we enforce</div>
                                    <Bullets
                                        items={[
                                            "No harassment, intimidation, or discrimination",
                                            "No reckless or unsafe driving behavior",
                                            "Compliance expectations and professional conduct",
                                            "Support escalation and dispute handling",
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
                                    <div className="mt-3 text-[12px] text-neutral-800 leading-relaxed">
                                        These documents define rules, enforcement, and account actions.
                                    </div>
                                </Tile>
                            </div>
                        </Panel>

                        <Panel>
                            <Section eyebrow="FAQ" title="Common questions" />
                            <div className="grid gap-3">
                                {[
                                    {
                                        q: "Is compliance only about police checkpoints?",
                                        a: "No. It’s the full driving culture: safer decisions, lawful behavior, calm conduct, and reduced risk.",
                                    },
                                    {
                                        q: "What if a rider demands unsafe speed?",
                                        a: "Safety comes first. Repeated pressure or unsafe behavior can lead to account action.",
                                    },
                                    { q: "What if there’s a dispute?", a: "Use support escalation and avoid confrontation." },
                                    {
                                        q: "Where are the rules written?",
                                        a: "Safety Guidelines, Acceptable Use, Terms of Service, and Privacy Policy.",
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
                                    {["Compliance", "Safety", "Professional conduct", "Rules"].map((t) => (
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
