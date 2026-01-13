// src/app/investors/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

const SUPPORT_EMAIL = "support@6rides.com";
const INVESTOR_MAILTO = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    "6Rides Investor Request — Information Pack"
)}&body=${encodeURIComponent(
    `Hello 6Rides Team,

I’m interested in the 6Rides investment opportunity.

Name:
Company:
Country/City:
Investment focus (Fleet / Technology / Expansion / Partnerships):
Budget range:
Timeline:

Please send the investor information pack and next steps.

Thank you.
`
)}`;

export default function InvestorsPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            {/* Top strip */}
            <div className="border-b border-black/5 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-black/60">
                            6Rides
                        </div>
                        <div className="text-xs text-black/50">Investor Relations</div>
                    </div>

                    <Link
                        href="/"
                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black hover:border-black/20"
                    >
                        Back Home
                    </Link>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
                {/* HERO */}
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: easeOut }}
                            className="text-3xl font-semibold leading-tight md:text-5xl"
                        >
                            Investor Overview
                            <span className="block text-black/70">Built as a premium, scalable ride platform.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: easeOut, delay: 0.08 }}
                            className="mt-5 max-w-2xl text-sm leading-7 text-black/70"
                        >
                            6Rides is positioned as a premium ride-hailing brand with a disciplined operational model:
                            a controlled owned fleet complemented by a partner-listed premium fleet. The objective is
                            consistent quality, strong safety, and expansion-ready execution across Nigeria—city by city.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: easeOut, delay: 0.14 }}
                            className="mt-7 flex flex-wrap gap-3"
                        >
                            <a
                                href={INVESTOR_MAILTO}
                                className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/90"
                            >
                                Request Investor Pack
                            </a>

                            <a
                                href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("6Rides Investor Call Request")}`}
                                className="rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:border-black/20"
                            >
                                Schedule a Discussion
                            </a>
                        </motion.div>

                        <div className="mt-6 text-xs text-black/50">6Rides. A 6clement Joshua service</div>
                    </div>

                    {/* Right: “secure” investor card */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: easeOut, delay: 0.08 }}
                        className="rounded-3xl border border-black/10 bg-white p-7 shadow-sm"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="text-sm font-semibold">What investors typically want to know</div>
                                <div className="mt-2 text-sm text-black/60">
                                    We share details by request to keep strategy, pricing, and rollout secure.
                                </div>
                            </div>
                            <div className="rounded-full border border-black/10 bg-gray-50 px-3 py-1 text-xs font-semibold text-black/60">
                                Confidential
                            </div>
                        </div>

                        <div className="mt-6 grid gap-3">
                            {[
                                "Fleet acquisition plan & partner fleet unit economics",
                                "Safety, verification, compliance & operating standards",
                                "Expansion roadmap, priority cities & go-to-market",
                                "Monetization model (trips + premium tiers + corporate)",
                                "Technology roadmap (booking, dispatch, support, trust)",
                            ].map((x) => (
                                <div
                                    key={x}
                                    className="rounded-2xl border border-black/10 bg-gray-50 px-4 py-3 text-sm text-black/70"
                                >
                                    {x}
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 rounded-2xl border border-black/10 bg-white px-4 py-4">
                            <div className="text-xs font-semibold text-black/60">Direct line</div>
                            <div className="mt-1 text-sm font-semibold text-black">{SUPPORT_EMAIL}</div>
                            <div className="mt-2 text-xs text-black/50">
                                Send “Investor Pack” in the subject for faster response.
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* KEY PILLARS */}
                <div className="mt-12 grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
                        <div className="text-sm font-semibold">Investment areas</div>
                        <p className="mt-2 text-sm leading-7 text-black/60">
                            We support multiple investment entry points depending on strategy and timeline.
                            Investors can participate in fleet growth, technology buildout, city expansion, or
                            partner programs.
                        </p>

                        <div className="mt-6 grid gap-3">
                            {[
                                { t: "Fleet Growth", d: "Acquire premium vehicles and deploy with strict standards." },
                                { t: "Partner Program", d: "Scale the premium partner-listed fleet with branding + verification." },
                                { t: "Technology", d: "Booking, dispatch, safety, support, payments, and analytics." },
                                { t: "Expansion", d: "City launches with brand discipline and operational control." },
                            ].map((x) => (
                                <div key={x.t} className="rounded-2xl border border-black/10 bg-gray-50 p-4">
                                    <div className="text-sm font-semibold">{x.t}</div>
                                    <div className="mt-1 text-sm text-black/60">{x.d}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
                        <div className="text-sm font-semibold">Why 6Rides can win</div>
                        <p className="mt-2 text-sm leading-7 text-black/60">
                            6Rides is not built as “cheap rides.” It is built as a premium service that protects
                            riders, drivers, and partners—while maintaining consistent quality and trust.
                        </p>

                        <div className="mt-6 grid gap-3">
                            {[
                                { t: "Premium Positioning", d: "Brand-first experience designed to feel elite and safe." },
                                { t: "Verification & Standards", d: "Operational discipline: onboarding, checks, compliance." },
                                { t: "Dual Fleet Model", d: "Owned fleet + partner fleet to scale with control." },
                                { t: "Monetization Depth", d: "Trips plus corporate, scheduled, premium tiers, subscriptions." },
                            ].map((x) => (
                                <div key={x.t} className="rounded-2xl border border-black/10 bg-gray-50 p-4">
                                    <div className="text-sm font-semibold">{x.t}</div>
                                    <div className="mt-1 text-sm text-black/60">{x.d}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA STRIP */}
                <div className="mt-12 rounded-3xl border border-black/10 bg-gray-50 p-8">
                    <div className="grid gap-6 md:grid-cols-2 md:items-center">
                        <div>
                            <div className="text-xl font-semibold">Request the full investor information pack</div>
                            <div className="mt-2 text-sm text-black/60">
                                Includes the rollout plan, partner fleet model, monetization, and next steps.
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 md:justify-end">
                            <a
                                href={INVESTOR_MAILTO}
                                className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/90"
                            >
                                Request Investor Pack
                            </a>
                            <a
                                href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("6Rides — Investor Questions")}`}
                                className="rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:border-black/20"
                            >
                                Ask a Question
                            </a>
                        </div>
                    </div>

                    <div className="mt-6 text-xs text-black/45">
                        © {new Date().getFullYear()} 6Rides. All rights reserved. • 6Rides. A 6clement Joshua service
                    </div>
                </div>
            </div>
        </main>
    );
}
