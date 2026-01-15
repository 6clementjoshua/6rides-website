// src/app/learn/hotel_chauffeur/page.tsx
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

export default function LearnHotelChauffeurPage() {
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
                            src="/images/6ride/corporate/6ride_chauffeur_hotel_arrival_service.png"
                            alt="6ride chauffeur service at hotel arrival"
                            fill
                            // ✅ mobile cover prevents empty borders; desktop stays cover
                            className="object-cover md:object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/22 to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                            <div className={cx(HERO_GLASS, "backdrop-blur-sm md:backdrop-blur-md")}>
                                <div className="text-[11px] font-semibold tracking-wide text-white/90">
                                    Chauffeur • Hotel arrivals
                                </div>

                                <h1 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
                                    Hotel arrivals with a chauffeur mindset.
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
                                            mobileExpanded ? "mt-2 max-h-[680px] opacity-100" : "max-h-0 opacity-0"
                                        )}
                                    >
                                        <p className="mt-2 text-sm text-white/90 leading-relaxed">
                                            Premium arrivals should feel calm and organized. 6ride supports disciplined pickups for travelers,
                                            executives, and high-standard movement — with clean presentation, predictable coordination, and
                                            professional conduct.
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {["Hotel arrivals", "Executive pickups", "Scheduled trips", "Professional conduct"].map((c) => (
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
                                        Premium arrivals should feel calm and organized. 6ride supports disciplined pickups for travelers,
                                        executives, and high-standard movement — with clean presentation, predictable coordination, and
                                        professional conduct.
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {["Hotel arrivals", "Executive pickups", "Scheduled trips", "Professional conduct"].map((c) => (
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
                        {/* Explain the promise */}
                        <Panel>
                            <Section
                                eyebrow="Full explanation"
                                title="What “chauffeur mindset” really means"
                                desc="This is not just a ride. It’s a service culture: calm coordination, a clean arrival moment, and professional behavior — especially around hotels where presentation matters."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Arrival experience (hotel standard)
                                    </div>
                                    <Bullets
                                        items={[
                                            "Calm, respectful approach at pickup",
                                            "Clean vehicle presentation at arrival points",
                                            "Professional posture around hotel entrances",
                                            "Reduced noise and chaos during coordination",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Who this is built for
                                    </div>
                                    <Bullets
                                        items={[
                                            "Hotel guests and visiting travelers",
                                            "Executives and corporate visitors",
                                            "Airport-to-hotel and hotel-to-meeting movement",
                                            "High-standard lifestyle and event arrivals",
                                        ]}
                                    />
                                </Tile>
                            </div>

                            <div className="mt-6 rounded-2xl border border-black/10 bg-neutral-50 p-5">
                                <div className="text-sm font-semibold text-neutral-950">
                                    Why hotel pickups need discipline
                                </div>
                                <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                    Hotels have security, reception flow, and guest expectations. A chaotic pickup damages the brand and
                                    embarrasses customers. 6ride positions this category as calm, predictable, and professional.
                                </p>
                            </div>
                        </Panel>

                        {/* What’s included */}
                        <Panel>
                            <Section
                                eyebrow="Package contents"
                                title="What you get in the hotel arrival package"
                                desc="The goal is a clean arrival moment and a calmer movement experience."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">Service standards</div>
                                    <Bullets
                                        items={[
                                            "Clean vehicle presentation and premium-first mindset",
                                            "Respectful communication and calm pickup behavior",
                                            "Predictable coordination and fewer surprises",
                                            "Support-first escalation if anything feels off",
                                            "Compliance-focused driving culture",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">Trip types supported</div>
                                    <Bullets
                                        items={[
                                            "Hotel arrival and departure pickups",
                                            "Executive meetings and office movement",
                                            "Scheduled trips where timing matters",
                                            "Airport add-ons and luggage-friendly movement",
                                            "Event arrivals where presentation matters",
                                        ]}
                                    />
                                </Tile>
                            </div>

                            <div className="mt-5 grid gap-4 sm:grid-cols-3">
                                {[
                                    { title: "Best for", body: "Hotels, executives, visitors, meetings, airport + hospitality movement." },
                                    { title: "Feels like", body: "Organized pickup, clean arrival, calm coordination, professional finish." },
                                    { title: "Positioning", body: "A chauffeur mindset — presentation and discipline built in." },
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
                                title="How hotel pickup flow works"
                                desc="A predictable flow reduces stress — especially for travelers."
                            />
                            <div className="grid gap-3">
                                {[
                                    {
                                        step: "01",
                                        title: "Set pickup details clearly",
                                        body: "Enter hotel name/area pickup and your destination. Clear information improves arrival coordination.",
                                    },
                                    {
                                        step: "02",
                                        title: "Arrival with professional posture",
                                        body: "Calm arrival and clean presentation — especially at hotel entrances and guest zones.",
                                    },
                                    {
                                        step: "03",
                                        title: "Movement with calm expectations",
                                        body: "Clear behavior, respectful interaction, and support escalation if needed.",
                                    },
                                    {
                                        step: "04",
                                        title: "Professional drop-off",
                                        body: "A clean finish matters — customers remember how the experience ends.",
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
                                title="Standards, safety culture, and policy alignment"
                                desc="Professional service only works when rules are clear and enforced."
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">Standards we emphasize</div>
                                    <Bullets
                                        items={[
                                            "No harassment, intimidation, or discrimination",
                                            "Calm pickup culture and respectful communication",
                                            "Compliance-first driving behavior",
                                            "Support escalation and dispute handling",
                                            "Account actions may occur for repeated violations",
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
                                        These documents define expectations and enforcement.
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
                                        q: "Is this a private chauffeur service?",
                                        a: "It’s a premium service mindset within 6ride — focusing on hotel-ready discipline and professional behavior.",
                                    },
                                    {
                                        q: "Can I schedule trips?",
                                        a: "Yes. This category is built for structured, timing-sensitive movement where available.",
                                    },
                                    {
                                        q: "What makes it premium?",
                                        a: "Clean presentation, calm pickup culture, predictable coordination, and enforced standards.",
                                    },
                                    {
                                        q: "Where can I read the rules?",
                                        a: "Use Safety Guidelines, Acceptable Use, Terms, and Privacy policy pages.",
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
                                        href="/partner"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Partner with 6ride
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
                                    {["Hotels", "Executive", "Scheduled trips", "Professional"].map((t) => (
                                        <span key={t} className={CHIP}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </Panel>

                            <Panel>
                                <div className="text-[11px] font-semibold text-neutral-900">For more information</div>
                                <div className="mt-1 text-[12px] text-neutral-800">
                                    contact : <span className="font-semibold">booking@6ride.com</span>
                                </div>
                            </Panel>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
