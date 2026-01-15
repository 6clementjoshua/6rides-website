// src/app/learn/partner_female_cadillac/page.tsx
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
    "after:content-[''] after:absolute after:inset-0 before:-z-10 after:-z-10 after:rounded-3xl after:ring-1 after:ring-white/70";

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

export default function LearnPartnerFemaleCadillac() {
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
                            src="/images/6ride/partner/6ride_partner_vehicle_premium_female_cadillac.png"
                            alt="6ride partner premium female near Cadillac SUV"
                            fill
                            sizes="(max-width: 768px) 100vw, 1100px"
                            // ✅ mobile cover prevents empty borders; desktop stays cover
                            className="object-cover md:object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/22 to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                            <div className={cx(HERO_GLASS, "backdrop-blur-sm md:backdrop-blur-md")}>
                                <div className="text-[11px] font-semibold tracking-wide text-white/90">
                                    Partner vehicles • Premium owners
                                </div>

                                <h1 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
                                    Turn your premium car into a premium income stream.
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
                                            This partner tier is for owners who value image, cleanliness, and professional conduct. We protect
                                            your vehicle’s reputation while positioning it for higher-quality demand.
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {["Image protection", "Premium demand", "Verified riders", "Long-term value"].map((c) => (
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
                                        This partner tier is for owners who value image, cleanliness, and professional conduct. We protect
                                        your vehicle’s reputation while positioning it for higher-quality demand.
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {["Image protection", "Premium demand", "Verified riders", "Long-term value"].map((c) => (
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
                        <Panel>
                            <Section
                                eyebrow="Premium owner positioning"
                                title="This program protects your image — not just your earnings"
                                desc="Many car owners lose value through poor handling, bad riders, or careless use. 6ride is designed to preserve the image of premium vehicles while generating income."
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Image & vehicle protection
                                    </div>
                                    <Bullets
                                        items={[
                                            "Cleanliness standards enforced",
                                            "Professional rider conduct",
                                            "No misuse or reckless handling",
                                            "Escalation instead of conflict",
                                        ]}
                                    />
                                </Tile>
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Premium demand focus
                                    </div>
                                    <Bullets
                                        items={[
                                            "Higher-quality customers",
                                            "Lifestyle & business movement",
                                            "Calmer pickup culture",
                                            "Better long-term retention",
                                        ]}
                                    />
                                </Tile>
                            </div>
                        </Panel>

                        <Panel>
                            <Section
                                eyebrow="Who this is for"
                                title="Owners who think long-term"
                                desc="This tier is ideal for owners who want consistent, respectable earnings without damaging their vehicle’s brand or personal reputation."
                            />
                            <div className="grid gap-4 sm:grid-cols-3">
                                {[
                                    { t: "Best vehicles", b: "Cadillac, Mercedes, BMW, Lexus, Range Rover" },
                                    { t: "Best use", b: "Corporate, lifestyle, executive movement" },
                                    { t: "Mindset", b: "Professional, clean, calm, accountable" },
                                ].map((x) => (
                                    <Tile key={x.t}>
                                        <div className="text-sm font-semibold text-neutral-950">{x.t}</div>
                                        <div className="mt-2 text-sm text-neutral-800">{x.b}</div>
                                    </Tile>
                                ))}
                            </div>
                        </Panel>

                        <Panel>
                            <Section
                                eyebrow="Rules that protect you"
                                title="Standards, enforcement & accountability"
                                desc="Premium only works when standards are real. We enforce them."
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <Bullets
                                        items={[
                                            "Verified onboarding",
                                            "Cleanliness inspections",
                                            "Professional conduct rules",
                                            "No harassment or abuse",
                                            "Account action for repeat violations",
                                        ]}
                                    />
                                </Tile>
                                <Tile>
                                    <div className="text-sm text-neutral-800 leading-relaxed">
                                        Partners who repeatedly violate standards may be restricted or removed. This protects compliant owners and the brand.
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        <Link className={CHIP} href="/policies/partner-terms" target="_blank">
                                            Partner Terms
                                        </Link>
                                        <Link className={CHIP} href="/policies/safety" target="_blank">
                                            Safety Guidelines
                                        </Link>
                                    </div>
                                </Tile>
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
                            </Panel>

                            <Panel>
                                <div className="text-[11px] font-semibold text-neutral-900">
                                    We appreciate your interest in the 6ride Premium Partner Program.
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
