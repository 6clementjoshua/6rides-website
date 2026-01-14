// src/app/investors/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

function cx(...parts: Array<string | false | undefined | null>) {
    return parts.filter(Boolean).join(" ");
}

function GlassBg() {
    return (
        <>
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(1200px_700px_at_18%_0%,rgba(255,255,255,1),rgba(244,244,244,1)_45%,rgba(236,236,236,1)_100%)]" />
            <div className="fixed inset-0 -z-10 opacity-70 bg-[radial-gradient(900px_520px_at_86%_8%,rgba(255,255,255,0.95),rgba(255,255,255,0)_60%)]" />
            <div className="fixed inset-0 -z-10 opacity-20 bg-[repeating-linear-gradient(160deg,rgba(0,0,0,0.04),rgba(0,0,0,0.04)_2px,transparent_2px,transparent_13px)]" />
        </>
    );
}

function BevelChip({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            className={cx(
                "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-4 py-2 text-xs font-semibold",
                "border border-black/10 bg-white/[0.58] backdrop-blur-md",
                "shadow-[0_18px_45px_-35px_rgba(0,0,0,0.55)]",
                "transition-transform duration-200 active:scale-[0.985] hover:-translate-y-[1px]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
            )}
        >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(120%_120%_at_20%_10%,rgba(255,255,255,0.95),rgba(255,255,255,0)_55%)] opacity-80" />
            <span className="pointer-events-none absolute inset-[1px] rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-12px_24px_rgba(0,0,0,0.07)]" />
            <span className="pointer-events-none absolute -left-12 top-1/2 h-10 w-28 -translate-y-1/2 rotate-[18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.72),transparent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            <span className="relative z-10 text-black/75 transition-colors group-hover:text-black">{children}</span>
        </a>
    );
}

function GlassCard({
    title,
    subtitle,
    children,
    rightSlot,
    className,
}: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    rightSlot?: React.ReactNode;
    className?: string;
}) {
    return (
        <section
            className={cx(
                "relative rounded-3xl border border-black/10 bg-white/[0.55] backdrop-blur-xl",
                "shadow-[0_32px_90px_-70px_rgba(0,0,0,0.62)]",
                className
            )}
        >
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-95 bg-[radial-gradient(140%_120%_at_15%_0%,rgba(255,255,255,0.85),rgba(255,255,255,0)_55%),radial-gradient(120%_120%_at_85%_15%,rgba(255,255,255,0.55),rgba(255,255,255,0)_60%)]" />
            <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-18px_30px_rgba(0,0,0,0.07)]" />
            <div className="relative z-10 p-6 sm:p-7 md:p-8">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight text-black md:text-2xl">{title}</h2>
                        {subtitle ? <p className="mt-2 max-w-3xl text-sm leading-6 text-black/70">{subtitle}</p> : null}
                    </div>
                    {rightSlot ? <div className="hidden sm:block">{rightSlot}</div> : null}
                </div>
                <div className="mt-5 text-sm leading-6 text-black/75">{children}</div>
            </div>
        </section>
    );
}

function PrimaryButton({
    href,
    children,
    variant = "solid",
}: {
    href: string;
    children: React.ReactNode;
    variant?: "solid" | "outline";
}) {
    const base =
        "group relative inline-flex items-center justify-center overflow-hidden rounded-2xl px-5 py-3 text-sm font-semibold transition";
    const glass =
        "border border-black/10 bg-white/[0.68] backdrop-blur shadow-[0_18px_45px_-35px_rgba(0,0,0,0.55)]";
    const focus = "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20";
    const solid = "text-black/85 hover:-translate-y-[1px] active:scale-[0.985]";
    const outline = "text-black/80 hover:-translate-y-[1px] active:scale-[0.985]";

    return (
        <motion.a
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.985 }}
            href={href}
            className={cx(base, glass, focus, variant === "solid" ? solid : outline)}
        >
            <span className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-14px_26px_rgba(0,0,0,0.08)]" />
            <span className="pointer-events-none absolute -left-12 top-1/2 h-10 w-28 -translate-y-1/2 rotate-[18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            <span className="relative z-10">{children}</span>
        </motion.a>
    );
}

function Pill({ children }: { children: React.ReactNode }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/[0.60] px-3 py-1 text-[11px] font-semibold text-black/60 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-black/30" />
            <span>{children}</span>
        </div>
    );
}

function Metric({
    label,
    value,
    note,
}: {
    label: string;
    value: string;
    note: string;
}) {
    return (
        <div className="rounded-2xl border border-black/10 bg-white/[0.55] p-4">
            <div className="text-xs font-semibold text-black/60">{label}</div>
            <div className="mt-1 text-lg font-semibold text-black/85">{value}</div>
            <div className="mt-1 text-xs text-black/55">{note}</div>
        </div>
    );
}

export default function InvestorsPage() {
    // Point all requests to /contact (your dedicated premium contact page).
    const contactInvestorHref =
        "/contact?topic=investor-pack" +
        "&subject=" +
        encodeURIComponent("Investor Request — Information Pack") +
        "&message=" +
        encodeURIComponent(
            `Hello 6Ride Team,

I’m interested in the 6Ride investment opportunity.

Name:
Company:
Country/City:
Investment focus (Fleet / Technology / Expansion / Partnerships):
Budget range:
Timeline:

Please send the investor information pack and next steps.

Thank you.`
        );

    const contactCallHref =
        "/contact?topic=investor-call" +
        "&subject=" +
        encodeURIComponent("Investor Call Request") +
        "&message=" +
        encodeURIComponent(
            `Hello 6Ride Team,

I would like to schedule an investor discussion/call.

Name:
Company:
Country/City:
Preferred time window (include timezone):
Focus area:
Phone/WhatsApp (optional):

Thank you.`
        );

    return (
        <main className="min-h-screen text-black">
            <GlassBg />

            {/* Top strip */}
            <div className="border-b border-black/5 bg-white/40 backdrop-blur-xl">
                <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8">
                    <div className="flex flex-wrap items-center gap-3">
                        <Pill>6Ride</Pill>
                        <div className="text-xs text-black/55">Investor Relations</div>
                        <div className="text-xs text-black/40">Cross River HQ • Available internationally where 6Ride operates</div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <BevelChip href="/policies/terms">Terms</BevelChip>
                        <BevelChip href="/policies/privacy">Privacy</BevelChip>
                        <BevelChip href="/policies/contact">Policy Contact</BevelChip>
                        <Link
                            href="/"
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-4 py-2 text-xs font-semibold border border-black/10 bg-white/[0.58] backdrop-blur-md shadow-[0_18px_45px_-35px_rgba(0,0,0,0.55)] transition-transform duration-200 active:scale-[0.985] hover:-translate-y-[1px]"
                        >
                            <span className="pointer-events-none absolute inset-[1px] rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-12px_24px_rgba(0,0,0,0.07)]" />
                            <span className="relative z-10 text-black/75 group-hover:text-black">Back Home</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-14">
                {/* HERO */}
                <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                    <motion.section
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: easeOut }}
                        className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/[0.55] backdrop-blur-xl shadow-[0_32px_90px_-70px_rgba(0,0,0,0.62)]"
                    >
                        <div className="pointer-events-none absolute inset-0 opacity-95 bg-[radial-gradient(140%_120%_at_15%_0%,rgba(255,255,255,0.85),rgba(255,255,255,0)_55%),radial-gradient(120%_120%_at_88%_10%,rgba(255,255,255,0.55),rgba(255,255,255,0)_60%)]" />
                        <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-18px_30px_rgba(0,0,0,0.07)]" />

                        <div className="relative z-10 p-7 md:p-9">
                            <div className="flex flex-wrap items-center gap-2">
                                <BevelChip href="/partners">Partner program</BevelChip>
                                <BevelChip href="/contact?topic=investor-pack">Investor request</BevelChip>
                                <BevelChip href="/policies/safety">Safety</BevelChip>
                            </div>

                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: easeOut, delay: 0.05 }}
                                className="mt-5 text-3xl font-semibold leading-tight md:text-5xl"
                            >
                                Investor Overview
                                <span className="block text-black/70">Premium mobility, built for disciplined scale.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
                                className="mt-5 max-w-3xl text-sm leading-7 text-black/70"
                            >
                                6Ride is designed as a premium, trust-led mobility platform. The model is built around operational discipline:
                                consistent service standards, verification, safety enforcement, and a dual-supply approach—an owned fleet complemented
                                by a partner-listed premium fleet. Expansion is executed city-by-city, with policy coverage for Nigeria (including Cross River HQ)
                                and internationally wherever 6Ride operates.
                            </motion.p>

                            <div className="mt-6 grid gap-4 md:grid-cols-3">
                                <Metric
                                    label="Positioning"
                                    value="Premium-first"
                                    note="Not “cheap rides”; a quality + safety standard investors expect."
                                />
                                <Metric
                                    label="Supply strategy"
                                    value="Dual fleet"
                                    note="Owned fleet + verified partner fleet for controlled scale."
                                />
                                <Metric
                                    label="Expansion"
                                    value="City-by-city"
                                    note="Replicable operating playbook across regions."
                                />
                            </div>

                            <div className="mt-7 flex flex-wrap gap-3">
                                <PrimaryButton href={contactInvestorHref} variant="solid">
                                    Request Investor Pack (via Contact)
                                </PrimaryButton>
                                <PrimaryButton href={contactCallHref} variant="outline">
                                    Request a Discussion (via Contact)
                                </PrimaryButton>
                            </div>

                            <div className="mt-6 rounded-2xl border border-black/10 bg-white/[0.55] p-4 text-sm text-black/70">
                                <div className="font-semibold text-black/80">Confidentiality note</div>
                                <div className="mt-1">
                                    We share detailed rollout, pricing, unit economics, and operational documents through the secure contact flow to protect the business,
                                    partners, and strategy. Please use the request buttons above.
                                </div>
                            </div>

                            <div className="mt-6 text-xs text-black/50">6Ride. A 6clement Joshua service</div>
                        </div>
                    </motion.section>

                    {/* Right: investor request structure card */}
                    <motion.section
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: easeOut, delay: 0.08 }}
                        className="space-y-6"
                    >
                        <GlassCard
                            title="What investors typically request"
                            subtitle="Use the Contact page so we can route your request internally and respond with the correct pack."
                            rightSlot={<div className="rounded-full border border-black/10 bg-white/[0.6] px-3 py-1 text-xs font-semibold text-black/60">Confidential</div>}
                        >
                            <div className="grid gap-3">
                                {[
                                    "Fleet acquisition plan & partner fleet onboarding standards",
                                    "Verification, safety enforcement, incident workflows, compliance approach",
                                    "Expansion roadmap: priority cities, rollout requirements, operational readiness",
                                    "Monetization: rides, scheduled/corporate, subscriptions, premium tiers, service fees",
                                    "Technology roadmap: booking, dispatch, payments, support, analytics, fraud controls",
                                    "Governance: policies, auditability, documentation, and risk management",
                                ].map((x) => (
                                    <div key={x} className="rounded-2xl border border-black/10 bg-white/[0.55] px-4 py-3 text-sm text-black/70">
                                        {x}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 rounded-2xl border border-black/10 bg-white/[0.55] p-4 text-sm text-black/70">
                                <div className="font-semibold text-black/80">Request routing</div>
                                <div className="mt-1">
                                    The investor request buttons take you to <span className="font-semibold">/contact</span> with a pre-filled subject and message template.
                                    This helps our team respond quickly and consistently.
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-2">
                                <BevelChip href="/contact?topic=investor-pack">Open Contact (Investor Pack)</BevelChip>
                                <BevelChip href="/contact?topic=investor-call">Open Contact (Call)</BevelChip>
                            </div>
                        </GlassCard>
                    </motion.section>
                </div>

                {/* KEY PILLARS */}
                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    <GlassCard
                        title="Investment entry points"
                        subtitle="Multiple routes depending on strategy, timeline, and risk appetite."
                    >
                        <div className="grid gap-4 md:grid-cols-2">
                            {[
                                { t: "Fleet growth", d: "Acquire premium vehicles and deploy under strict service and branding standards." },
                                { t: "Partner program", d: "Scale supply via verified partner fleets with standardized onboarding and enforcement." },
                                { t: "Technology & product", d: "Dispatch quality, fraud controls, payments, support tooling, reporting and analytics." },
                                { t: "City expansion", d: "Launch new cities with disciplined playbooks: compliance, operations, marketing, safety." },
                            ].map((x) => (
                                <div key={x.t} className="rounded-2xl border border-black/10 bg-white/[0.55] p-4">
                                    <div className="text-sm font-semibold text-black/80">{x.t}</div>
                                    <div className="mt-1 text-sm text-black/65">{x.d}</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 rounded-2xl border border-black/10 bg-white/[0.55] p-4 text-sm text-black/70">
                            <div className="font-semibold text-black/80">Global scope</div>
                            <div className="mt-1">
                                6Ride policies and operating standards are written to apply across cities and countries where 6Ride operates, with local compliance overlays as required.
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard
                        title="Why 6Ride can win"
                        subtitle="A premium product that emphasizes trust, enforcement, and repeatable execution."
                    >
                        <div className="grid gap-4 md:grid-cols-2">
                            {[
                                { t: "Premium positioning", d: "Designed to feel elite and safe, with disciplined service standards." },
                                { t: "Verification & enforcement", d: "Clear rules, audits, and real consequences for violations." },
                                { t: "Controlled scale", d: "Dual fleet model supports growth without quality collapse." },
                                { t: "Monetization depth", d: "Trips plus corporate, scheduled, subscriptions, and premium service layers." },
                            ].map((x) => (
                                <div key={x.t} className="rounded-2xl border border-black/10 bg-white/[0.55] p-4">
                                    <div className="text-sm font-semibold text-black/80">{x.t}</div>
                                    <div className="mt-1 text-sm text-black/65">{x.d}</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                            <BevelChip href="/policies/terms">Terms</BevelChip>
                            <BevelChip href="/policies/acceptable-use">Acceptable Use</BevelChip>
                            <BevelChip href="/policies/safety">Safety Guidelines</BevelChip>
                            <BevelChip href="/partners">Partner Program</BevelChip>
                        </div>
                    </GlassCard>
                </div>

                {/* CTA STRIP (points to /contact) */}
                <div className="mt-10 rounded-3xl border border-black/10 bg-white/[0.55] p-8 backdrop-blur-xl shadow-[0_32px_90px_-70px_rgba(0,0,0,0.62)]">
                    <div className="grid gap-6 md:grid-cols-2 md:items-center">
                        <div>
                            <div className="text-xl font-semibold">Request the full investor information pack</div>
                            <div className="mt-2 text-sm text-black/65">
                                Includes the rollout approach, partner/owned fleet model, governance posture, and next steps—shared through the premium contact flow.
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 md:justify-end">
                            <PrimaryButton href={contactInvestorHref} variant="solid">
                                Request Investor Pack (Contact)
                            </PrimaryButton>
                            <PrimaryButton href={contactCallHref} variant="outline">
                                Request a Discussion (Contact)
                            </PrimaryButton>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                        <BevelChip href="/contact">Open /contact</BevelChip>
                        <BevelChip href="/policies/contact">Policy Contact</BevelChip>
                        <BevelChip href="/policies/privacy">Privacy</BevelChip>
                    </div>

                    <div className="mt-6 text-xs text-black/45">
                        © {new Date().getFullYear()} 6Ride. All rights reserved. • 6Ride. A 6clement Joshua service
                    </div>
                </div>
            </div>
        </main>
    );
}
