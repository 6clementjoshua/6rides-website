// src/app/learn/partner_mercedes_male/page.tsx
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

/** ✅ Lighter hero glass + reduced blur on mobile */
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

export default function LearnPartnerMercedesMalePage() {
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
                        // ✅ mobile: avoid outer black edge showing around contain/letterbox
                        "bg-transparent md:bg-black"
                    )}
                >
                    <div className="relative h-[360px] sm:h-[440px] md:h-[540px]">
                        <Image
                            src="/images/6ride/partner/6ride_partner_vehicle_mercedes_male.png"
                            alt="6ride partner Mercedes with male rider"
                            fill
                            sizes="(max-width: 768px) 100vw, 1100px"
                            // ✅ mobile cover prevents empty borders; desktop stays cover
                            className="object-cover md:object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/22 to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                            <div className={cx(HERO_GLASS, "backdrop-blur-sm md:backdrop-blur-md")}>
                                <div className="text-[11px] font-semibold tracking-wide text-white/90">
                                    Partner vehicles • Premium badge
                                </div>

                                <h1 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
                                    Mercedes owners: list with standards, not noise.
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
                                            A premium badge attracts premium attention — but only strict standards keep it premium. 6ride is
                                            building a premium-only image: clean cars, calm pickups, professional conduct, and real
                                            enforcement.
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {[
                                                "Premium-only image",
                                                "Clean presentation",
                                                "Professional conduct",
                                                "Standards enforced",
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
                                        A premium badge attracts premium attention — but only strict standards keep it premium. 6ride is
                                        building a premium-only image: clean cars, calm pickups, professional conduct, and real
                                        enforcement.
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {["Premium-only image", "Clean presentation", "Professional conduct", "Standards enforced"].map(
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
                        {/* Explanation */}
                        <Panel>
                            <Section
                                eyebrow="Full explanation"
                                title="Premium badge vehicles require premium behavior"
                                desc="Luxury vehicles lose value when the experience feels messy. This page explains how 6ride protects premium badge owners through verification, standards, and consequences."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        What “standards, not noise” means
                                    </div>
                                    <Bullets
                                        items={[
                                            "No chaotic pickup culture",
                                            "No disrespectful communication",
                                            "No dirty interiors and poor smell control",
                                            "No reckless or non-compliant driving",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        What premium riders expect
                                    </div>
                                    <Bullets
                                        items={[
                                            "Clean interior, calm cabin feel",
                                            "Professional arrival and timing",
                                            "Respectful conversation (or quiet comfort)",
                                            "Predictable behavior and support escalation",
                                        ]}
                                    />
                                </Tile>
                            </div>

                            <div className="mt-6 rounded-2xl border border-black/10 bg-neutral-50 p-5">
                                <div className="text-sm font-semibold text-neutral-950">The real goal</div>
                                <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                    Protect your vehicle’s image and keep the category premium so the earning level remains premium —
                                    long-term.
                                </p>
                            </div>
                        </Panel>

                        {/* Standards */}
                        <Panel>
                            <Section
                                eyebrow="Standards"
                                title="Premium badge partner standards (minimum expectations)"
                                desc="This is the checklist that keeps luxury cars credible on a premium platform."
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Vehicle presentation
                                    </div>
                                    <Bullets
                                        items={[
                                            "Consistently clean interior/exterior",
                                            "Comfort readiness (AC, seats, cabin hygiene)",
                                            "No unsafe mechanical or structural issues",
                                            "Professional appearance inside the cabin",
                                            "Compliance-ready documents",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Conduct and compliance
                                    </div>
                                    <Bullets
                                        items={[
                                            "Calm pickup culture and respectful communication",
                                            "No harassment, intimidation, or discrimination",
                                            "Compliance-first driving behavior",
                                            "Support escalation when something feels off",
                                            "Account action possible for repeat violations",
                                        ]}
                                    />
                                </Tile>
                            </div>
                        </Panel>

                        {/* Onboarding */}
                        <Panel>
                            <Section
                                eyebrow="Onboarding"
                                title="How the premium badge onboarding works"
                                desc="Verification first. Standards agreement. Premium positioning."
                            />
                            <div className="grid gap-3">
                                {[
                                    {
                                        step: "01",
                                        title: "Apply to partner",
                                        body: "Submit your vehicle details and operating city. This tier is premium-only.",
                                    },
                                    {
                                        step: "02",
                                        title: "Verification + review",
                                        body: "Identity verification and car review reduce fraud and protect rider trust.",
                                    },
                                    {
                                        step: "03",
                                        title: "Standards agreement",
                                        body: "Partners commit to cleanliness, conduct, and compliance rules with enforcement.",
                                    },
                                    {
                                        step: "04",
                                        title: "Premium positioning",
                                        body: "Approved premium badge vehicles are positioned for executive and lifestyle demand.",
                                    },
                                ].map((s) => (
                                    <Tile key={s.step}>
                                        <div className="text-xs font-semibold text-neutral-800">Step {s.step}</div>
                                        <div className="mt-1 text-sm font-semibold text-neutral-950">{s.title}</div>
                                        <div className="mt-2 text-sm text-neutral-800 leading-relaxed">{s.body}</div>
                                    </Tile>
                                ))}
                            </div>

                            <div className="mt-5 rounded-2xl border border-black/10 bg-neutral-50 p-5">
                                <div className="text-sm font-semibold text-neutral-950">Enforcement note</div>
                                <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                    If a partner repeatedly violates standards, we may restrict, suspend, or remove the account to protect
                                    premium trust and brand integrity.
                                </p>
                            </div>
                        </Panel>

                        {/* Policies */}
                        <Panel>
                            <Section
                                eyebrow="Policy layer"
                                title="Rules that protect luxury partners"
                                desc="These references define expectations, prohibited behavior, and consequences."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">What policies cover</div>
                                    <Bullets
                                        items={[
                                            "Partner eligibility and honesty",
                                            "Brand protection for premium categories",
                                            "Rider safety and respectful conduct rules",
                                            "Account action and enforcement processes",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">References</div>
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
                                        These documents explain standards and enforcement in full.
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
                                        q: "Do you accept all Mercedes vehicles?",
                                        a: "We prioritize vehicles that can maintain premium presentation and comfort standards consistently.",
                                    },
                                    {
                                        q: "What if a rider behaves badly?",
                                        a: "Use support escalation. Repeated violations can lead to restrictions and account actions.",
                                    },
                                    {
                                        q: "How do I join?",
                                        a: "Apply through the partner route. We guide verification and onboarding.",
                                    },
                                    {
                                        q: "Where are rules written?",
                                        a: "Partner Terms, Safety Guidelines, Acceptable Use, and Terms of Service.",
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
                                    {["Premium badge", "Brand protection", "Verification", "Standards"].map((t) => (
                                        <span key={t} className={CHIP}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </Panel>

                            <Panel>
                                <div className="text-[11px] font-semibold text-neutral-900">
                                    We appreciate your interest in the 6ride partner program.
                                </div>
                                <div className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                    For inquiries or to get started, please contact our partner team at{" "}
                                    <a href="mailto:partnerships@6ride.com" className="text-blue-600 hover:underline">
                                        partnerships@6ride.com
                                    </a>
                                </div>
                            </Panel>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
