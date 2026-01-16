// src/app/learn/partner_range_rover/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

function cx(...p: Array<string | false | null | undefined>) {
    return p.filter(Boolean).join(" ");
}

/* ====== Premium crisp UI system (no cloudy text) ====== */
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

/** ✅ LESS BLACK + more transparent */
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

export default function LearnPartnerRangeRoverPage() {
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

            {/* Same width for all Learn pages */}
            <section className="mx-auto max-w-6xl px-6 pb-14 pt-8">
                {/* HERO */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: easeOut }}
                    className={cx(
                        "overflow-hidden rounded-3xl border border-black/10 shadow-[0_18px_55px_rgba(0,0,0,0.14)]",
                        "bg-transparent md:bg-black"
                    )}
                >
                    <div className="relative h-[360px] sm:h-[440px] md:h-[540px]">
                        <Image
                            src="/images/6ride/partner/6ride_partner_vehicle_range_rover_female.png"
                            alt="6ride partner Range Rover with female rider"
                            fill
                            sizes="(max-width: 768px) 100vw, 1100px"
                            className="object-cover md:object-cover"
                            priority
                        />

                        {/* ✅ LESS BLACK on the image overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/18 to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                            <div className={cx(HERO_GLASS, "backdrop-blur-sm md:backdrop-blur-md")}>
                                <div className="text-[11px] font-semibold tracking-wide text-white/90">
                                    Partner vehicles • SUV class
                                </div>

                                <h1 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
                                    SUV owners: partner with a premium-first brand.
                                </h1>

                                {/* ✅ MOBILE: tap-to-expand */}
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
                                            Executive SUVs are in demand for business and lifestyle movement. Partner with 6ride and list
                                            your SUV under enforced standards and premium positioning — clean, calm, and professional.
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {["Executive SUV", "Premium standards", "Brand protection", "Verified onboarding"].map((c) => (
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

                                {/* ✅ DESKTOP: always visible */}
                                <div className="hidden md:block">
                                    <p className="mt-2 text-sm text-white/90 md:text-[15px] leading-relaxed">
                                        Executive SUVs are in demand for business and lifestyle movement. Partner with 6ride and list your
                                        SUV under enforced standards and premium positioning — clean, calm, and professional.
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {["Executive SUV", "Premium standards", "Brand protection", "Verified onboarding"].map((c) => (
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
                    <div className="md:col-span-8 space-y-8">
                        {/* What this means */}
                        <Panel>
                            <Section
                                eyebrow="Full explanation"
                                title="SUV demand is real — but standards decide if it stays premium"
                                desc="Executive SUVs are used for client movement, airport runs, lifestyle outings, and higher-comfort trips. The premium category only works when the vehicle looks premium and the experience feels premium every single time."
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">Why SUVs earn premium</div>
                                    <Bullets
                                        items={[
                                            "More space and comfort for riders",
                                            "Better fit for airport and luggage trips",
                                            "Preferred for executives and families",
                                            "Stronger presentation for lifestyle movement",
                                        ]}
                                    />
                                </Tile>
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        What kills premium (and we avoid it)
                                    </div>
                                    <Bullets
                                        items={[
                                            "Dirty interiors or poor smell control",
                                            "Aggressive pickup behavior",
                                            "Unpredictable service and no updates",
                                            "Reckless driving or non-compliance culture",
                                        ]}
                                    />
                                </Tile>
                            </div>

                            <div className="mt-6 rounded-2xl border border-black/10 bg-neutral-50 p-5">
                                <div className="text-sm font-semibold text-neutral-950">The point</div>
                                <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                    6ride is building an SUV network where owners who maintain standards get positioned as premium — and
                                    protected as premium.
                                </p>
                            </div>
                        </Panel>

                        {/* Standards */}
                        <Panel>
                            <Section
                                eyebrow="Standards"
                                title="SUV partner standards (what we expect)"
                                desc="These are the minimum expectations to list as a premium SUV on 6ride."
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">Vehicle presentation</div>
                                    <Bullets
                                        items={[
                                            "Clean interior/exterior consistently",
                                            "Working AC and basic comfort readiness",
                                            "No unsafe mechanical issues",
                                            "Documents and compliance ready",
                                            "Professional appearance for premium trips",
                                        ]}
                                    />
                                </Tile>
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Driver conduct & rider experience
                                    </div>
                                    <Bullets
                                        items={[
                                            "Respectful, calm communication",
                                            "Clean pickup culture (no harassment)",
                                            "Compliance-first driving behavior",
                                            "Support escalation instead of arguments",
                                            "Account action for repeated violations",
                                        ]}
                                    />
                                </Tile>
                            </div>
                        </Panel>

                        {/* Onboarding steps */}
                        <Panel>
                            <Section
                                eyebrow="Onboarding"
                                title="How premium SUV onboarding works"
                                desc="Clear steps. Quality-first. Same premium Learn structure."
                            />
                            <div className="grid gap-3">
                                {[
                                    {
                                        step: "01",
                                        title: "Apply to partner",
                                        body: "Send your vehicle details and how you operate. We focus on long-term premium suitability.",
                                    },
                                    {
                                        step: "02",
                                        title: "Verification + review",
                                        body: "We verify identity and review the vehicle category to protect rider trust and brand standards.",
                                    },
                                    {
                                        step: "03",
                                        title: "Standards agreement",
                                        body: "Partners agree to cleanliness, conduct, and compliance expectations — with enforcement rules.",
                                    },
                                    {
                                        step: "04",
                                        title: "Premium positioning",
                                        body: "Approved SUVs are positioned for executive, lifestyle, and comfort-first movement demand.",
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
                                    If standards are repeatedly violated, we may restrict access, suspend, or remove a partner to protect
                                    the premium brand and rider trust.
                                </p>
                            </div>
                        </Panel>

                        {/* Policies */}
                        <Panel>
                            <Section
                                eyebrow="Policy layer"
                                title="Rules that protect partners, riders, and the brand"
                                desc="These references define expectations and consequences for misuse."
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">Key protections</div>
                                    <Bullets
                                        items={[
                                            "Verified onboarding requirements",
                                            "Anti-harassment and respectful conduct",
                                            "Safety-first driving and compliance culture",
                                            "Account action for repeat violations",
                                            "Brand protection for premium categories",
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
                                        These policies exist to protect premium partners and keep the SUV tier credible.
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
                                        q: "Do you accept any SUV?",
                                        a: "We prioritize executive SUVs that can maintain premium presentation and comfort standards consistently.",
                                    },
                                    {
                                        q: "What if my vehicle is premium but I can’t keep it clean always?",
                                        a: "Premium categories require consistency. Repeated failures can lead to restrictions to protect the brand and riders.",
                                    },
                                    {
                                        q: "How do I start?",
                                        a: "Use the partner page to apply and we’ll guide onboarding and verification.",
                                    },
                                    {
                                        q: "Where are the rules written?",
                                        a: "Read Partner Terms, Safety Guidelines, Acceptable Use, and Terms of Service.",
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
                                        href="/"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Back to home
                                    </Link>
                                </div>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {["SUV class", "Premium standards", "Verification", "Brand protection"].map((t) => (
                                        <span key={t} className={CHIP}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </Panel>

                            <Panel>
                                <div className="text-[11px] font-semibold text-neutral-900">
                                    We appreciate your interest in partnering with 6ride.
                                </div>
                                <div className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                    For inquiries or to get started, please contact our partner team at{" "}
                                    <a href="mailto:partner@6ride.com" className="text-neutral-900 underline">
                                        partner@6ride.com
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
