// src/app/learn/corporate_pickup/page.tsx
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

// ✅ lighter glass + less “black block” feel
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

export default function LearnCorporatePickupPage() {
    // ✅ Mobile-only: tap to expand/collapse hero details
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
                        // ✅ mobile transparent prevents any visible “outer layer”
                        "bg-transparent md:bg-black"
                    )}
                >
                    <div className="relative h-[360px] sm:h-[440px] md:h-[540px]">
                        <Image
                            src="/images/6ride/corporate/6ride_corporate_client_pickup.png"
                            alt="6ride corporate client pickup at office"
                            fill
                            // ✅ key fix: remove contain on mobile (no edges / no weird space)
                            className="object-cover md:object-cover"
                            priority
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/22 to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                            {/* ✅ reduced blur + lighter glass */}
                            <div className={cx(HERO_GLASS, "backdrop-blur-sm md:backdrop-blur-md select-none")}>
                                <div className="text-[11px] font-semibold tracking-wide text-white/90">
                                    Corporate • Client movement
                                </div>

                                <h1 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
                                    Corporate pickups that look professional.
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
                                            mobileExpanded ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
                                        )}
                                    >
                                        <p className="mt-2 text-sm text-white/90 leading-relaxed">
                                            For meetings and client movement, presentation matters. 6ride is built to deliver a cleaner,
                                            more dependable experience — with calm pickup culture, professional conduct, and standards that
                                            protect your company image.
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {["Client pickups", "Office mobility", "Professional look", "Dependable"].map((c) => (
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
                                        For meetings and client movement, presentation matters. 6ride is built to deliver
                                        a cleaner, more dependable experience — with calm pickup culture, professional
                                        conduct, and standards that protect your company image.
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {["Client pickups", "Office mobility", "Professional look", "Dependable"].map((c) => (
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
                                title="Corporate movement is brand movement"
                                desc="The car that arrives for your client is part of your reputation. This page explains how 6ride positions corporate mobility: clean presentation, calm coordination, and conduct rules that reduce embarrassment and protect trust."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        What companies hate
                                    </div>
                                    <Bullets
                                        items={[
                                            "Dirty vehicles and poor cabin hygiene",
                                            "Late arrivals with chaotic excuses",
                                            "Unprofessional talk or disrespect",
                                            "Reckless driving that scares clients",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        What corporate clients expect
                                    </div>
                                    <Bullets
                                        items={[
                                            "Clean, quiet, calm pickup culture",
                                            "Predictable communication and arrival behavior",
                                            "Professional conduct and discretion",
                                            "Compliance-first driving and safer movement",
                                        ]}
                                    />
                                </Tile>
                            </div>

                            <div className="mt-6 rounded-2xl border border-black/10 bg-neutral-50 p-5">
                                <div className="text-sm font-semibold text-neutral-950">
                                    The core promise
                                </div>
                                <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                    Corporate movement should look organized. 6ride is designed to reduce chaos,
                                    improve presentation, and create a calmer experience for people who value time and image.
                                </p>
                            </div>
                        </Panel>

                        {/* What you get */}
                        <Panel>
                            <Section
                                eyebrow="Package contents"
                                title="What you get in corporate pickup flow"
                                desc="This is the premium checklist — things that keep corporate trips credible."
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Service standards
                                    </div>
                                    <Bullets
                                        items={[
                                            "Cleaner vehicle presentation and premium-first mindset",
                                            "Calm pickup behavior and professional posture",
                                            "Respectful communication (discretion matters)",
                                            "Predictable coordination and fewer surprises",
                                            "Support escalation when issues arise",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Use cases
                                    </div>
                                    <Bullets
                                        items={[
                                            "Client pickups and meeting drops",
                                            "Office mobility and team movement",
                                            "Airport-to-office and hotel-to-office transfers",
                                            "Event arrivals and corporate dinners",
                                            "Time-sensitive movement where reliability matters",
                                        ]}
                                    />
                                </Tile>
                            </div>

                            <div className="mt-5 grid gap-4 sm:grid-cols-3">
                                {[
                                    { title: "Best for", body: "Executives, client visits, board meetings, office runs, corporate hospitality." },
                                    { title: "Feels like", body: "Clean arrival + calm coordination + professional finish." },
                                    { title: "Positioning", body: "Corporate-ready mobility in modern Nigeria." },
                                ].map((x) => (
                                    <Tile key={x.title}>
                                        <div className="text-sm font-semibold text-neutral-950">{x.title}</div>
                                        <div className="mt-2 text-sm text-neutral-800 leading-relaxed">{x.body}</div>
                                    </Tile>
                                ))}
                            </div>
                        </Panel>

                        {/* How it works */}
                        <Panel>
                            <Section
                                eyebrow="Flow"
                                title="How corporate pickup works"
                                desc="A simple flow that reduces confusion and protects image."
                            />
                            <div className="grid gap-3">
                                {[
                                    {
                                        step: "01",
                                        title: "Set pickup + destination clearly",
                                        body: "Include office entrance, gate, or landmark. Corporate trips work best with clear pickup points.",
                                    },
                                    {
                                        step: "02",
                                        title: "Arrival with professional posture",
                                        body: "Clean presentation and calm pickup culture — no shouting, no chaos.",
                                    },
                                    {
                                        step: "03",
                                        title: "Movement with discretion",
                                        body: "Professional conduct and compliance-first driving protect client comfort.",
                                    },
                                    {
                                        step: "04",
                                        title: "Drop-off that protects brand",
                                        body: "Clean finish. Respectful handover. The goal is a credible experience end-to-end.",
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

                        {/* Policies */}
                        <Panel>
                            <Section
                                eyebrow="Trust layer"
                                title="Conduct rules and enforcement"
                                desc="Corporate clients need clear rules. These policies define behavior and consequences."
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
                                            "Professional communication and discretion",
                                            "Support escalation for disputes",
                                            "Suspension/removal may occur for repeated violations",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">References</div>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        <Link className={CHIP} href="/policies/corporate-sla" target="_blank">
                                            Corporate SLA
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
                                        These documents explain expectations, enforcement, and account actions.
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
                                        q: "Can companies book for clients?",
                                        a: "Yes. Corporate movement is built for client trips and professional pickups where available.",
                                    },
                                    {
                                        q: "Is this a limo service?",
                                        a: "It’s premium corporate-ready mobility with professional standards and enforced conduct rules.",
                                    },
                                    {
                                        q: "What if a driver behaves unprofessionally?",
                                        a: "Use support escalation. Repeated violations can lead to restrictions or removal.",
                                    },
                                    {
                                        q: "Where are the rules written?",
                                        a: "Corporate SLA, Safety Guidelines, Acceptable Use, and Terms of Service.",
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
                                        href="/policies/corporate-sla"
                                        target="_blank"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Read corporate SLA
                                    </Link>
                                    <Link
                                        href="/partner"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Partner with 6ride
                                    </Link>
                                </div>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {["Corporate", "Clients", "Professional", "Dependable"].map((t) => (
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
