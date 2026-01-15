// src/app/learn/business_exchange/page.tsx
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

// ✅ lighter + less blur (more transparent, still readable)
// - mobile slightly lighter than desktop
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

export default function LearnBusinessExchangePage() {
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
                        // ✅ mobile transparent avoids any visible “outer layer”
                        "bg-transparent md:bg-black"
                    )}
                >
                    <div className="relative h-[360px] sm:h-[440px] md:h-[540px]">
                        <Image
                            src="/images/6ride/corporate/6ride_business_document_exchange.png"
                            alt="6ride business document exchange beside vehicle"
                            fill
                            // ✅ key fix: no contain on mobile (prevents edges)
                            className="object-cover md:object-cover"
                            priority
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/22 to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                            {/* ✅ reduced blur intensity + lighter glass */}
                            <div className={cx(HERO_GLASS, "backdrop-blur-sm md:backdrop-blur-md select-none")}>
                                <div className="text-[11px] font-semibold tracking-wide text-white/90">
                                    Business • Secure handovers
                                </div>

                                <h1 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
                                    Business movement with confidence.
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
                                            For professionals, time and trust matter. 6ride supports dependable movement for business activity — when you want a calmer,
                                            cleaner, more credible ride experience on meeting days and delivery handovers.
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {["Professional trust", "Clean arrival", "Reliable pickup", "Business-ready"].map((c) => (
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
                                        For professionals, time and trust matter. 6ride supports dependable movement for business activity — when you want a calmer,
                                        cleaner, more credible ride experience on meeting days and delivery handovers.
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {["Professional trust", "Clean arrival", "Reliable pickup", "Business-ready"].map((c) => (
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
                                title="Business trips are judged by presentation"
                                desc="For corporate movement, the ride is part of your brand. Late pickups, dirty vehicles, or unprofessional conduct can damage trust. This page explains how 6ride focuses on credibility, calm coordination, and standards enforcement."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        What breaks business confidence
                                    </div>
                                    <Bullets
                                        items={[
                                            "Dirty cabin and poor vehicle presentation",
                                            "Unpredictable arrival behavior and confusion",
                                            "Unprofessional talk, harassment, or pressure",
                                            "Unsafe driving that increases stress",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        The 6ride business standard
                                    </div>
                                    <Bullets
                                        items={[
                                            "Clean arrival and calmer pickup culture",
                                            "Professional conduct and respectful communication",
                                            "Compliance-first driving and safer movement",
                                            "Support escalation if something goes wrong",
                                        ]}
                                    />
                                </Tile>
                            </div>

                            <div className="mt-6 rounded-2xl border border-black/10 bg-neutral-50 p-5">
                                <div className="text-sm font-semibold text-neutral-950">
                                    Why this matters in Nigeria
                                </div>
                                <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                    Traffic is real, meeting windows are tight, and professional image matters. A standards-first
                                    system reduces friction with clearer expectations, better conduct, and policy-backed enforcement.
                                </p>
                            </div>
                        </Panel>

                        {/* What you get */}
                        <Panel>
                            <Section
                                eyebrow="Package contents"
                                title="What you get for business movement"
                                desc="A calmer, cleaner, more credible experience that supports business outcomes."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Experience standards
                                    </div>
                                    <Bullets
                                        items={[
                                            "Cleaner vehicle presentation and premium-first mindset",
                                            "Calmer pickup behavior and clearer expectations",
                                            "Respectful, professional interaction standards",
                                            "Compliance-first driving posture",
                                            "Support-first escalation if anything feels off",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Business use cases
                                    </div>
                                    <Bullets
                                        items={[
                                            "Meetings and office-to-office mobility",
                                            "Client movement and presentations",
                                            "Document handovers and business errands",
                                            "Airport/hotel add-on movement",
                                            "Corporate events and professional venues",
                                        ]}
                                    />
                                </Tile>
                            </div>

                            <div className="mt-5 grid gap-4 sm:grid-cols-3">
                                {[
                                    { title: "Best for", body: "Meetings, client trips, handovers, corporate days, scheduled movement." },
                                    { title: "Feels like", body: "Clean arrival + calm pickup + credible experience." },
                                    { title: "Positioning", body: "Business-ready mobility built on standards and trust." },
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
                                title="How business movement works"
                                desc="A simple professional flow that reduces confusion and keeps things credible."
                            />
                            <div className="grid gap-3">
                                {[
                                    {
                                        step: "01",
                                        title: "Set pickup + destination clearly",
                                        body: "Use the correct building entrance, office name, and landmarks. Clarity saves time.",
                                    },
                                    {
                                        step: "02",
                                        title: "Arrival with professional posture",
                                        body: "Calm arrival behavior, clean presentation, and respectful communication.",
                                    },
                                    {
                                        step: "03",
                                        title: "Movement with compliance-first driving",
                                        body: "Safety beats speed. The goal is calm movement and fewer conflicts.",
                                    },
                                    {
                                        step: "04",
                                        title: "Drop-off and handover done right",
                                        body: "A clean finish and professional behavior — because business trust is built in small moments.",
                                    },
                                ].map((s) => (
                                    <Tile key={s.step}>
                                        <div className="text-xs font-semibold text-neutral-800">Step {s.step}</div>
                                        <div className="mt-1 text-sm font-semibold text-neutral-950">{s.title}</div>
                                        <div className="mt-2 text-sm text-neutral-800 leading-relaxed">{s.body}</div>
                                    </Tile>
                                ))}
                            </div>

                            <div className="mt-6 rounded-2xl border border-black/10 bg-neutral-50 p-5">
                                <div className="text-sm font-semibold text-neutral-950">
                                    Confidentiality note
                                </div>
                                <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                    Do not share sensitive credentials or private documents in a way that creates risk.
                                    If an item is sensitive, keep it secured and minimize exposure during handover.
                                </p>
                            </div>
                        </Panel>

                        {/* Corporate alignment */}
                        <Panel>
                            <Section
                                eyebrow="Enterprise layer"
                                title="Corporate standards and SLA alignment"
                                desc="For business teams and corporate accounts, standards should be measurable and enforceable."
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        What corporate teams care about
                                    </div>
                                    <Bullets
                                        items={[
                                            "Reliability and predictable movement",
                                            "Professional conduct expectations",
                                            "Safety-first driving culture",
                                            "Escalation paths when issues occur",
                                            "Policy-backed enforcement and accountability",
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
                                        These documents define standards, expectations, and enforcement.
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
                                        q: "Is this a courier service?",
                                        a: "It supports business movement and professional handovers, but it’s still a mobility service. For sensitive logistics, use proper secured delivery options.",
                                    },
                                    {
                                        q: "Can companies get structured coverage?",
                                        a: "Yes. Corporate standards can align with the Corporate SLA and policy-backed expectations.",
                                    },
                                    {
                                        q: "What if a driver behaves unprofessionally?",
                                        a: "Use support escalation. Repeated violations may lead to restrictions or removal.",
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
                                        href="/policies/safety"
                                        target="_blank"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Read safety guidelines
                                    </Link>
                                </div>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {["Business", "Credibility", "Handovers", "Corporate"].map((t) => (
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
