// app/policies/acceptable-use/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

type TocItem = { id: string; label: string; note: string };

function formatDate(d: Date) {
    // e.g., January 14, 2026
    return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function parseBuildDate(input?: string | null) {
    if (!input) return null;
    const d = new Date(input);
    return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * IMPORTANT (how "Last updated" works):
 * - If you do nothing, it shows the fallback date (a past date).
 * - When you edit this policy, set NEXT_PUBLIC_POLICY_BUILD_DATE to today's date in your env/CI (Vercel, etc.)
 *   Example: NEXT_PUBLIC_POLICY_BUILD_DATE=2026-01-14
 * This is the most reliable way to “sense updates” in a static Next build.
 */
const FALLBACK_LAST_UPDATED_ISO = "2025-11-01"; // keep as a past date unless you intentionally update

const HQ_LOCATION = "Cross River State, Nigeria (HQ)";

function cx(...parts: Array<string | false | undefined | null>) {
    return parts.filter(Boolean).join(" ");
}

function BevelButton({
    href,
    children,
    className,
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <a
            href={href}
            className={cx(
                "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-4 py-2 text-xs font-semibold",
                "transition-transform duration-200 active:scale-[0.985]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
                // glass + bevel
                "border border-black/10 bg-white/[0.58] backdrop-blur-md",
                "shadow-[0_10px_25px_-18px_rgba(0,0,0,0.35)]",
                // top highlight + inner bevel
                "before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(120%_120%_at_20%_10%,rgba(255,255,255,0.95),rgba(255,255,255,0)_55%)] before:opacity-80",
                "after:absolute after:inset-[1px] after:rounded-full after:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_20px_rgba(0,0,0,0.06)] after:content-['']",
                "hover:-translate-y-[1px] hover:shadow-[0_18px_40px_-26px_rgba(0,0,0,0.45)]",
                className
            )}
        >
            {/* waterline shimmer */}
            <span
                className={cx(
                    "pointer-events-none absolute -left-10 top-1/2 h-10 w-24 -translate-y-1/2 rotate-[18deg]",
                    "bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.65),transparent)] blur-[0.5px]",
                    "opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                )}
            />
            <span className="relative z-10 text-black/80 transition-colors group-hover:text-black">{children}</span>
        </a>
    );
}

function GlassCard({
    id,
    eyebrow,
    title,
    subtitle,
    children,
}: {
    id?: string;
    eyebrow?: string;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}) {
    return (
        <section
            id={id}
            className={cx(
                "group relative scroll-mt-28 rounded-3xl border border-black/10",
                "bg-white/[0.52] backdrop-blur-xl",
                "shadow-[0_30px_80px_-60px_rgba(0,0,0,0.55)]",
                "transition-transform duration-300 hover:-translate-y-[2px]"
            )}
        >
            {/* water reflection layer */}
            <div
                className={cx(
                    "pointer-events-none absolute inset-0 rounded-3xl opacity-90",
                    "bg-[radial-gradient(140%_120%_at_15%_0%,rgba(255,255,255,0.85),rgba(255,255,255,0)_55%),radial-gradient(130%_120%_at_85%_15%,rgba(255,255,255,0.55),rgba(255,255,255,0)_60%)]"
                )}
            />
            {/* ripple lines */}
            <div
                className={cx(
                    "pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                    "bg-[repeating-linear-gradient(135deg,rgba(0,0,0,0.03),rgba(0,0,0,0.03)_2px,transparent_2px,transparent_10px)]"
                )}
            />
            {/* bevel edge */}
            <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-18px_28px_rgba(0,0,0,0.06)]" />

            <div className="relative z-10 p-6 sm:p-7 md:p-8">
                <div className="flex flex-col gap-2">
                    {eyebrow ? (
                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white/[0.55] px-3 py-1 text-[11px] font-semibold text-black/60">
                            <span className="h-1.5 w-1.5 rounded-full bg-black/30" />
                            <span>{eyebrow}</span>
                        </div>
                    ) : null}
                    <h2 className="text-xl font-semibold tracking-tight text-black md:text-2xl">{title}</h2>
                    {subtitle ? <p className="text-sm leading-6 text-black/70">{subtitle}</p> : null}
                </div>

                <div className="mt-5 text-sm leading-6 text-black/75">{children}</div>
            </div>
        </section>
    );
}

function BulletGrid({ items }: { items: Array<{ head: string; body: string }> }) {
    return (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
            {items.map((it) => (
                <div
                    key={it.head}
                    className={cx(
                        "relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur",
                        "shadow-[0_18px_45px_-40px_rgba(0,0,0,0.5)]"
                    )}
                >
                    <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                    <div className="relative">
                        <div className="text-sm font-semibold text-black/85">{it.head}</div>
                        <div className="mt-1 text-sm text-black/70">{it.body}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function Callout({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={cx(
                "relative mt-5 rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur",
                "shadow-[0_18px_45px_-40px_rgba(0,0,0,0.5)]"
            )}
        >
            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
            <div className="relative">
                <div className="text-sm font-semibold text-black/85">{title}</div>
                <div className="mt-1 text-sm text-black/70">{children}</div>
            </div>
        </div>
    );
}

export default function AcceptableUsePage() {
    const [mobileTocOpen, setMobileTocOpen] = useState(false);

    const lastUpdated = useMemo(() => {
        const envDate =
            parseBuildDate(process.env.NEXT_PUBLIC_POLICY_BUILD_DATE) ||
            parseBuildDate(process.env.NEXT_PUBLIC_BUILD_DATE) ||
            null;

        // If no env date exists, show the fallback (past) date.
        return envDate ?? new Date(FALLBACK_LAST_UPDATED_ISO);
    }, []);

    const effectiveDate = useMemo(() => {
        // You can keep this stable; change only on major policy reset.
        return new Date("2025-08-01");
    }, []);

    const toc: TocItem[] = useMemo(
        () => [
            { id: "purpose", label: "1. Purpose & Scope", note: "What this policy covers across rides, delivery, and emergency." },
            { id: "who", label: "2. Who This Applies To", note: "Passengers, drivers, couriers, partners, merchants, and corporate users." },
            { id: "membership", label: "3. Membership & Emergency Eligibility", note: "Emergency usage is restricted to qualifying members/subscribers." },
            { id: "standards", label: "4. General Use Standards", note: "Baseline conduct, truthfulness, safety, and compliance." },
            { id: "bookings", label: "5. Bookings, Pickups & Destinations", note: "How to use booking flows responsibly; no deception or evasion." },
            { id: "drivers", label: "6. Driver & Vehicle Conduct", note: "Operational standards, vehicle readiness, and passenger care." },
            { id: "passengers", label: "7. Passenger Conduct", note: "Respect, readiness, cleanliness, and lawful behavior." },
            { id: "delivery", label: "8. Delivery, Food & Goods Rules", note: "Packaging, prohibited items, and chain-of-custody expectations." },
            { id: "emergency", label: "9. Emergency Service Rules", note: "Proper emergency triggers, misuse prevention, and cooperation." },
            { id: "illegal", label: "10. Illegal, Dangerous & Prohibited Activities", note: "Zero tolerance categories and examples." },
            { id: "harassment", label: "11. Harassment, Abuse & Discrimination", note: "Safety-first conduct and strict enforcement." },
            { id: "fraud", label: "12. Fraud, Payment Abuse & Account Integrity", note: "No scams, no manipulation, no bypassing systems." },
            { id: "platform", label: "13. Platform Security & Technical Misuse", note: "No hacking, scraping, reverse engineering, or interference." },
            { id: "minors", label: "14. Minors & Vulnerable Persons", note: "Extra protections for students and vulnerable riders." },
            { id: "geo", label: "15. Global Operations & Local Law", note: `Worldwide operations; HQ: ${HQ_LOCATION}; local rules apply.` },
            { id: "enforcement", label: "16. Enforcement Actions", note: "Warnings, suspensions, terminations, losses, and referrals." },
            { id: "reporting", label: "17. Reporting & Investigations", note: "How to report and what we may request." },
            { id: "law", label: "18. Law Enforcement Cooperation", note: "Legal compliance, emergency disclosures, and data handling." },
            { id: "changes", label: "19. Changes to This Policy", note: "How updates are announced and when they take effect." },
        ],
        []
    );

    useEffect(() => {
        // Smooth anchor scrolling without layout jump
        const onClick = (e: MouseEvent) => {
            const t = e.target as HTMLElement | null;
            const a = t?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
            if (!a) return;

            const id = a.getAttribute("href")?.slice(1);
            if (!id) return;

            const el = document.getElementById(id);
            if (!el) return;

            e.preventDefault();
            setMobileTocOpen(false);

            const y = el.getBoundingClientRect().top + window.scrollY - 96; // header offset
            window.scrollTo({ top: y, behavior: "smooth" });
            history.replaceState(null, "", `#${id}`);
        };

        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, []);

    return (
        <main className="min-h-screen text-black">
            {/* premium background: pearl + waterline + vignette */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_20%_0%,rgba(255,255,255,1),rgba(245,245,245,1)_45%,rgba(238,238,238,1)_100%)]" />
            <div className="fixed inset-0 -z-10 opacity-70 bg-[radial-gradient(900px_520px_at_85%_10%,rgba(255,255,255,0.9),rgba(255,255,255,0)_55%)]" />
            <div className="fixed inset-0 -z-10 opacity-25 bg-[repeating-linear-gradient(160deg,rgba(0,0,0,0.035),rgba(0,0,0,0.035)_2px,transparent_2px,transparent_12px)]" />

            <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 md:px-8 md:pt-14">
                {/* HEADER */}
                <header className="relative">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white/[0.60] px-3 py-1 text-[11px] font-semibold text-black/60 backdrop-blur">
                                <span className="h-1.5 w-1.5 rounded-full bg-black/30" />
                                <span>6Ride Policy Center</span>
                            </div>
                            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                                Acceptable Use Policy
                            </h1>
                            <p className="mt-3 max-w-3xl text-sm leading-6 text-black/70">
                                This Acceptable Use Policy (“AUP”) sets permitted and prohibited behavior across the full 6Ride ecosystem:
                                rides, dispatch, bookings, delivery (food and goods), partner operations, and the optional Emergency Service.
                                It exists to protect passengers, drivers, couriers, communities, and the integrity of the platform—globally.
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2 text-xs text-black/55">
                                <span className="rounded-full border border-black/10 bg-white/[0.55] px-3 py-1 backdrop-blur">
                                    Effective: <span className="font-semibold text-black/70">{formatDate(effectiveDate)}</span>
                                </span>
                                <span className="rounded-full border border-black/10 bg-white/[0.55] px-3 py-1 backdrop-blur">
                                    Last updated: <span className="font-semibold text-black/70">{formatDate(lastUpdated)}</span>
                                </span>
                                <span className="rounded-full border border-black/10 bg-white/[0.55] px-3 py-1 backdrop-blur">
                                    HQ: <span className="font-semibold text-black/70">{HQ_LOCATION}</span>
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <BevelButton href="/policies/terms">Terms of Service</BevelButton>
                            <BevelButton href="/policies/privacy">Privacy Policy</BevelButton>
                            <BevelButton href="/policies/partner-terms">Partner Terms</BevelButton>
                            <BevelButton href="/policies/contact">Contact</BevelButton>
                        </div>
                    </div>

                    <div className="mt-7 grid gap-3 md:grid-cols-3">
                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Zero-tolerance categories</div>
                                <div className="mt-1 text-sm text-black/75">
                                    Violence threats, weapon trafficking, exploitation, hate-driven harassment, and platform attacks.
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Applies to every service line</div>
                                <div className="mt-1 text-sm text-black/75">
                                    Rides, delivery (food/goods), scheduling, corporate bookings, partner fleets, and emergency requests.
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Emergency Service gating</div>
                                <div className="mt-1 text-sm text-black/75">
                                    Emergency features are for verified 6Clement Joshua members and active emergency subscribers only.
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* LAYOUT: TOC + CONTENT */}
                <div className="mt-10 grid gap-6 lg:grid-cols-[360px_1fr]">
                    {/* TOC (desktop sticky) */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-6">
                            <div className="relative rounded-3xl border border-black/10 bg-white/[0.55] p-5 backdrop-blur-xl shadow-[0_30px_80px_-60px_rgba(0,0,0,0.55)]">
                                <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-18px_28px_rgba(0,0,0,0.06)]" />
                                <div className="relative">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-sm font-semibold text-black/85">Table of Contents</h2>
                                        <span className="text-[11px] font-semibold text-black/45">{toc.length} sections</span>
                                    </div>

                                    <div className="mt-4 space-y-2">
                                        {toc.map((t) => (
                                            <a
                                                key={t.id}
                                                href={`#${t.id}`}
                                                className={cx(
                                                    "group relative block rounded-2xl border border-black/10 bg-white/[0.52] px-3 py-2 backdrop-blur",
                                                    "transition-transform duration-200 hover:-translate-y-[1px]"
                                                )}
                                            >
                                                <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                                                <div className="relative">
                                                    <div className="text-xs font-semibold text-black/80 group-hover:text-black">
                                                        {t.label}
                                                    </div>
                                                    <div className="mt-0.5 text-[11px] leading-4 text-black/55">
                                                        {t.note}
                                                    </div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>

                                    <div className="mt-4 rounded-2xl border border-black/10 bg-white/[0.52] p-3 text-[11px] text-black/60">
                                        Tip: Investors and regulators typically look for clarity on emergency misuse prevention, prohibited items
                                        in delivery, fraud controls, and enforcement. Those are emphasized in Sections 8–16.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Mobile TOC */}
                    <div className="lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileTocOpen((s) => !s)}
                            className={cx(
                                "w-full text-left",
                                "relative rounded-3xl border border-black/10 bg-white/[0.55] p-5 backdrop-blur-xl",
                                "shadow-[0_30px_80px_-60px_rgba(0,0,0,0.55)]"
                            )}
                        >
                            <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-18px_28px_rgba(0,0,0,0.06)]" />
                            <div className="relative flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-semibold text-black/85">Table of Contents</div>
                                    <div className="mt-1 text-xs text-black/55">Tap to {mobileTocOpen ? "collapse" : "expand"}</div>
                                </div>
                                <div className="rounded-full border border-black/10 bg-white/[0.55] px-3 py-1 text-xs font-semibold text-black/70">
                                    {toc.length}
                                </div>
                            </div>
                        </button>

                        {mobileTocOpen ? (
                            <div className="mt-3 grid gap-2">
                                {toc.map((t) => (
                                    <a
                                        key={t.id}
                                        href={`#${t.id}`}
                                        className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 text-sm text-black/75 backdrop-blur"
                                    >
                                        <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                                        <div className="relative">
                                            <div className="font-semibold text-black/85">{t.label}</div>
                                            <div className="mt-1 text-xs text-black/55">{t.note}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    {/* CONTENT */}
                    <div className="space-y-6">
                        <GlassCard
                            id="purpose"
                            eyebrow="Scope"
                            title="1. Purpose & Scope"
                            subtitle="A premium safety standard across rides, delivery, bookings, and emergency usage—designed for global expansion."
                        >
                            <p>
                                6Ride is a safety-first mobility and logistics platform operating across cities and regions worldwide, with
                                administrative headquarters in <span className="font-semibold text-black/80">{HQ_LOCATION}</span>. This AUP
                                defines behavior expectations and prohibited activity for all users and partners, covering:
                            </p>
                            <BulletGrid
                                items={[
                                    {
                                        head: "Rides & Mobility",
                                        body:
                                            "On-demand rides, scheduled rides, shared/pooled experiences (where offered), corporate rides, and special events dispatch.",
                                    },
                                    {
                                        head: "Delivery (Food & Goods)",
                                        body:
                                            "Food delivery, parcels, business logistics, courier operations, and chain-of-custody expectations.",
                                    },
                                    {
                                        head: "Bookings & Platform Tools",
                                        body:
                                            "Pickup/destination accuracy, identity integrity, communications, payment flows, and in-app safety features.",
                                    },
                                    {
                                        head: "Emergency Service",
                                        body:
                                            "Optional emergency features with strict eligibility, misuse prevention, and cooperation requirements.",
                                    },
                                ]}
                            />

                            <Callout title="Policy intent">
                                This policy is written to be understood by everyday users and to meet the expectations of investors,
                                regulators, and enterprise partners: clear standards, clear prohibitions, clear enforcement.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="who"
                            eyebrow="Applicability"
                            title="2. Who This Applies To"
                            subtitle="If you touch the 6Ride ecosystem in any way, this policy applies to you."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Passengers / Riders",
                                        body:
                                            "Anyone booking or taking a ride, including a person booking on behalf of another person where allowed.",
                                    },
                                    {
                                        head: "Drivers / Captains",
                                        body:
                                            "Drivers, fleet operators, partner vehicle owners, and anyone operating a vehicle under 6Ride dispatch.",
                                    },
                                    {
                                        head: "Couriers / Delivery Partners",
                                        body:
                                            "Food and goods couriers, pickup agents, store/merchant runners, and third-party logistics partners.",
                                    },
                                    {
                                        head: "Merchants & Corporate Accounts",
                                        body:
                                            "Businesses using 6Ride for staff transport, deliveries, or customer logistics—plus authorized admins.",
                                    },
                                ]}
                            />

                            <Callout title="Shared responsibility">
                                Misconduct can originate from any side of a trip or delivery. We evaluate events holistically—driver behavior,
                                passenger behavior, courier behavior, merchant behavior, and platform misuse.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="membership"
                            eyebrow="Eligibility"
                            title="3. Membership & Emergency Eligibility"
                            subtitle="Emergency features are restricted—this is intentional to prevent misuse and protect response quality."
                        >
                            <p>
                                Certain features—especially Emergency Service functionality—may be restricted to users who meet eligibility
                                requirements, including membership status under the 6Clement Joshua ecosystem and an active emergency
                                subscription (where offered).
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Emergency access requirement",
                                        body:
                                            "Only verified 6Clement Joshua members with an active Emergency Service subscription may initiate emergency workflows or benefit from certain emergency-only dispatch features.",
                                    },
                                    {
                                        head: "Verification expectations",
                                        body:
                                            "You must provide accurate account information and complete any verification steps required for emergency eligibility. Attempts to bypass eligibility controls are violations.",
                                    },
                                    {
                                        head: "No resale / no delegation abuse",
                                        body:
                                            "Emergency privileges are personal (or enterprise-authorized). You may not sell, rent, or repeatedly initiate emergencies for unrelated third parties as a service.",
                                    },
                                    {
                                        head: "Misuse consequences",
                                        body:
                                            "Emergency misuse can result in immediate suspension/termination and may be reported to relevant authorities where required or appropriate.",
                                    },
                                ]}
                            />

                            <Callout title="Note for global expansion">
                                Eligibility rules may vary by region due to local law, telecom integrations, or emergency response partnerships.
                                When rules vary, the stricter rule applies unless explicitly stated otherwise.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="standards"
                            eyebrow="Baseline"
                            title="4. General Use Standards"
                            subtitle="These standards apply at all times—before, during, and after rides or deliveries."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Lawful use only",
                                        body:
                                            "Use 6Ride only for lawful mobility and logistics. You are responsible for complying with local laws, regulations, and safety directives.",
                                    },
                                    {
                                        head: "Truthful information",
                                        body:
                                            "Provide accurate pickup, destination, contact details, identity and delivery contents. False information is treated as a safety risk.",
                                    },
                                    {
                                        head: "Safety-first behavior",
                                        body:
                                            "Follow seatbelt/helmet laws, safe loading rules, and safety prompts. Never pressure a driver/courier to act unsafely.",
                                    },
                                    {
                                        head: "Respectful conduct",
                                        body:
                                            "Treat others with respect. No threats, intimidation, discrimination, or harassment—online or offline.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="bookings"
                            eyebrow="Dispatch integrity"
                            title="5. Bookings, Pickups & Destinations"
                            subtitle="Accurate trip information is a safety requirement, not an optional preference."
                        >
                            <p>
                                Booking flows (including ride requests, scheduled trips, multi-stop trips, and delivery tasks) must be used
                                transparently. Dispatch decisions and safety tooling rely on accurate pickup/destination data.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "No destination deception",
                                        body:
                                            "Do not intentionally enter false destinations, change destinations repeatedly to mislead, or attempt to reroute for prohibited purposes.",
                                    },
                                    {
                                        head: "No evasion tactics",
                                        body:
                                            "Do not use 6Ride to evade law enforcement, checkpoints, regulatory inspections, or to facilitate flight from accountability.",
                                    },
                                    {
                                        head: "No off-platform coercion",
                                        body:
                                            "Do not pressure drivers/couriers to take off-app payments, cancel to avoid fees, or reroute outside policy and safety tooling.",
                                    },
                                    {
                                        head: "Pickup readiness",
                                        body:
                                            "Be ready at pickup. Repeated no-shows, misleading pickup pins, or “ghost requests” degrade safety and service quality.",
                                    },
                                ]}
                            />

                            <Callout title="High-signal safety rule">
                                If a request looks designed to conceal who/where/what (e.g., vague pins, constant changes, refusal to confirm basic details),
                                we may cancel, limit features, or require re-verification.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="drivers"
                            eyebrow="Operational standards"
                            title="6. Driver & Vehicle Conduct"
                            subtitle="Professional conduct and vehicle readiness are mandatory conditions of platform access."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Safe driving only",
                                        body:
                                            "No reckless driving, street racing, impaired driving, aggressive maneuvers, or deliberate traffic violations that endanger others.",
                                    },
                                    {
                                        head: "Vehicle readiness",
                                        body:
                                            "Maintain roadworthy condition: brakes, lights, tires, mirrors, safety equipment, and clean interior where applicable.",
                                    },
                                    {
                                        head: "Passenger care",
                                        body:
                                            "No intimidation, threats, inappropriate conversation, or pressure. Respect boundaries and platform safety prompts.",
                                    },
                                    {
                                        head: "Dispatch honesty",
                                        body:
                                            "No fake acceptance, intentional delay tactics, GPS manipulation, or unapproved substitute drivers.",
                                    },
                                ]}
                            />

                            <Callout title="Refusal and cancellation">
                                Drivers may refuse or end a trip when safety is compromised or policy is violated, but must do so professionally and without discrimination.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="passengers"
                            eyebrow="Rider conduct"
                            title="7. Passenger Conduct"
                            subtitle="A premium platform requires premium behavior—clean, lawful, and respectful."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "No threats or intimidation",
                                        body:
                                            "No threats, bullying, extortion, or coercion. This includes pressuring a driver to speed, break laws, or accept off-platform deals.",
                                    },
                                    {
                                        head: "Cleanliness and care",
                                        body:
                                            "Do not damage vehicles, leave excessive mess, or bring hazardous items without disclosure and approval where required.",
                                    },
                                    {
                                        head: "No unauthorized recording misuse",
                                        body:
                                            "If you record, comply with local law and do not use recordings to harass, blackmail, or misrepresent a situation.",
                                    },
                                    {
                                        head: "Respect identity and safety flows",
                                        body:
                                            "Do not impersonate someone else, use stolen accounts, or attempt to bypass verification or safety gating.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="delivery"
                            eyebrow="Food & goods"
                            title="8. Delivery, Food & Goods Rules"
                            subtitle="Delivery misuse is a major safety and legal risk. We treat it with strict controls."
                        >
                            <p>
                                Delivery services require accurate disclosure of what is being transported, appropriate packaging, and lawful contents.
                                You are responsible for ensuring items are legal and safe to transport in your region.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Prohibited items (examples)",
                                        body:
                                            "Illegal drugs, contraband, weapons, explosives, hazardous chemicals, human/animal trafficking, stolen goods, and any item prohibited by law.",
                                    },
                                    {
                                        head: "Food safety and packaging",
                                        body:
                                            "Food must be sealed where appropriate. No tampering. Merchants should package to prevent spills, contamination, and temperature abuse.",
                                    },
                                    {
                                        head: "Accurate declarations",
                                        body:
                                            "Do not label prohibited goods as “documents” or “food.” Mislabeling can cause immediate account termination.",
                                    },
                                    {
                                        head: "Chain-of-custody integrity",
                                        body:
                                            "No unauthorized item substitution, detours that compromise time-sensitive goods, or delivery completion fraud.",
                                    },
                                ]}
                            />

                            <Callout title="Courier safety">
                                Couriers may refuse delivery tasks that appear unsafe, illegally described, improperly packaged, or suspicious.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="emergency"
                            eyebrow="Emergency Service"
                            title="9. Emergency Service Rules"
                            subtitle="Emergency tooling is powerful. Misuse harms real people. We enforce emergency rules aggressively."
                        >
                            <p>
                                The 6Ride Emergency Service (where offered) is intended for urgent, credible safety situations. It is not a shortcut for faster dispatch,
                                not a complaint channel, and not a tool for intimidation. Eligibility may require verified membership and an active emergency subscription.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "When emergency is appropriate",
                                        body:
                                            "Credible threats to personal safety, medical crises (where supported), active danger, or situations requiring immediate escalation.",
                                    },
                                    {
                                        head: "When emergency is NOT appropriate",
                                        body:
                                            "Price disputes, late pickups, routine cancellations, retaliation, testing the system, or attempting to force special treatment.",
                                    },
                                    {
                                        head: "Cooperation requirements",
                                        body:
                                            "If an emergency is initiated, you must provide truthful details and cooperate with safety checks. False reporting is a major violation.",
                                    },
                                    {
                                        head: "Misuse outcomes",
                                        body:
                                            "Immediate restriction of emergency tools, account suspension/termination, loss of privileges, and potential law enforcement referral where applicable.",
                                    },
                                ]}
                            />

                            <Callout title="Emergency gating (membership/subscription)">
                                If your account is not eligible (not verified as a 6Clement Joshua member, no active emergency subscription, or fails integrity checks),
                                emergency workflows may be restricted, delayed, or blocked to prevent abuse and protect emergency response capacity.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="illegal"
                            eyebrow="Zero tolerance"
                            title="10. Illegal, Dangerous & Prohibited Activities"
                            subtitle="These behaviors can trigger immediate termination and potential referrals."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Criminal facilitation",
                                        body:
                                            "Using 6Ride to commit or facilitate crimes, evade authorities, traffic contraband, or plan illegal activity.",
                                    },
                                    {
                                        head: "Weapons and violence threats",
                                        body:
                                            "Transporting weapons unlawfully or threatening violence. Credible threats may trigger immediate safety escalation.",
                                    },
                                    {
                                        head: "Exploitation and trafficking",
                                        body:
                                            "Any form of exploitation, coercion, trafficking, or facilitation of abuse is strictly prohibited and will be escalated.",
                                    },
                                    {
                                        head: "Public safety sabotage",
                                        body:
                                            "Interfering with emergency response, staging false incidents, or creating hoaxes that consume safety resources.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="harassment"
                            eyebrow="Respect"
                            title="11. Harassment, Abuse & Discrimination"
                            subtitle="We protect users from harassment and bias across all regions we operate."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "No harassment",
                                        body:
                                            "No sexual harassment, stalking, intimidation, hateful conduct, or unwanted contact before/during/after a trip.",
                                    },
                                    {
                                        head: "No discrimination",
                                        body:
                                            "No discrimination based on gender, ethnicity, nationality, religion, disability, age, or other protected status.",
                                    },
                                    {
                                        head: "No retaliation",
                                        body:
                                            "Do not retaliate against reports (including false reports to punish others). Retaliation is a serious violation.",
                                    },
                                    {
                                        head: "Professional communications",
                                        body:
                                            "Keep communications trip-related and respectful. Do not spam, threaten, or pressure off-platform interactions.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="fraud"
                            eyebrow="Integrity"
                            title="12. Fraud, Payment Abuse & Account Integrity"
                            subtitle="Payment integrity is critical for a premium mobility platform. Abuse will be detected and enforced."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "No chargeback fraud",
                                        body:
                                            "Do not abuse refunds/chargebacks, reverse legitimate payments, or use stolen cards or unauthorized payment methods.",
                                    },
                                    {
                                        head: "No trip manipulation",
                                        body:
                                            "No fake trips, fake deliveries, GPS spoofing, collusion, or incentive manipulation.",
                                    },
                                    {
                                        head: "No impersonation",
                                        body:
                                            "No impersonating drivers, riders, staff, or officials; no using another person’s account without authorization.",
                                    },
                                    {
                                        head: "No fee bypassing",
                                        body:
                                            "Do not pressure users to pay off-app, cancel to avoid fees, or route outside the platform to evade safety controls.",
                                    },
                                ]}
                            />

                            <Callout title="Account actions">
                                We may require additional verification, apply temporary holds, limit withdrawals/earnings, or restrict features if fraud risk signals appear.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="platform"
                            eyebrow="Security"
                            title="13. Platform Security & Technical Misuse"
                            subtitle="No attacks, no scraping, no reverse engineering, no interference with routing or safety systems."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "No hacking or exploitation",
                                        body:
                                            "No vulnerability exploitation, unauthorized access, privilege escalation, or attempts to bypass safety gating.",
                                    },
                                    {
                                        head: "No scraping or automation abuse",
                                        body:
                                            "No bots that spam requests, harvest driver/rider data, or distort dispatch availability.",
                                    },
                                    {
                                        head: "No reverse engineering",
                                        body:
                                            "No copying, decompiling, or extracting proprietary dispatch logic, safety workflows, or pricing models.",
                                    },
                                    {
                                        head: "No interference",
                                        body:
                                            "No jamming communications, spoofing location signals, or interfering with emergency and routing workflows.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="minors"
                            eyebrow="Protection"
                            title="14. Minors & Vulnerable Persons"
                            subtitle="We apply heightened safeguards where minors or vulnerable riders are involved."
                        >
                            <p>
                                Any misuse involving minors or vulnerable persons is treated as high severity. Region-specific rules may apply.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "No exploitation",
                                        body:
                                            "No grooming, exploitation, coercion, or any conduct that endangers minors or vulnerable persons.",
                                    },
                                    {
                                        head: "Guardian and authorization rules",
                                        body:
                                            "Where required, minors must be booked under verified guardian/school/institution authorization processes.",
                                    },
                                    {
                                        head: "No unsafe custody transfers",
                                        body:
                                            "Do not attempt to use 6Ride to conceal or facilitate unlawful custody transfers.",
                                    },
                                    {
                                        head: "Report immediately",
                                        body:
                                            "If you believe a vulnerable person is at risk, use reporting tools and follow local emergency guidance.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="geo"
                            eyebrow="Worldwide"
                            title="15. Global Operations & Local Law"
                            subtitle="6Ride operates across regions; local laws govern each trip and delivery."
                        >
                            <p>
                                6Ride may operate in multiple countries, states, and cities. Regardless of where you use the platform:
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Local laws apply",
                                        body:
                                            "Traffic laws, licensing rules, food safety rules, and delivery restrictions vary by location and must be obeyed.",
                                    },
                                    {
                                        head: "Region-specific safety rules",
                                        body:
                                            "Some regions may require additional verification, local permits, or restricted item lists for delivery.",
                                    },
                                    {
                                        head: "Cross River HQ",
                                        body:
                                            `Administrative HQ is ${HQ_LOCATION}. Operational support may be distributed across regions as 6Ride expands.`,
                                    },
                                    {
                                        head: "Stricter standard prevails",
                                        body:
                                            "If local law and this policy differ, the stricter standard applies unless 6Ride explicitly states otherwise.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="enforcement"
                            eyebrow="Consequences"
                            title="16. Enforcement Actions"
                            subtitle="We enforce for safety. We enforce for trust. We enforce for scale."
                        >
                            <p>
                                Violations can result in graduated or immediate enforcement depending on severity, frequency, and risk signals.
                                Actions may include:
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Warnings & education", body: "Policy reminders, safety coaching, and corrective steps." },
                                    { head: "Temporary suspension", body: "Loss of access for a defined period and/or feature restrictions." },
                                    { head: "Permanent termination", body: "Account removal from 6Ride services and ecosystem restrictions." },
                                    { head: "Financial actions", body: "Loss of incentives, withheld payouts where permitted, recovery of damages, and dispute resolution." },
                                    { head: "Safety escalations", body: "Emergency restrictions, real-time interventions, and identity re-verification." },
                                    { head: "Legal referrals", body: "Where required or appropriate, cooperation with authorities and lawful disclosures." },
                                ]}
                            />

                            <Callout title="Investor-grade enforcement principle">
                                We prioritize actions that reduce real-world harm: stopping unsafe accounts fast, preventing repeat abuse, and preserving evidence integrity.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="reporting"
                            eyebrow="Safety operations"
                            title="17. Reporting & Investigations"
                            subtitle="We encourage reporting. We protect reporters. We review evidence carefully."
                        >
                            <p>
                                Report violations through our <a href="/policies/contact" className="underline decoration-black/30 hover:decoration-black/60">Contact</a>{" "}
                                page or in-app reporting (where available). We may request additional information to investigate responsibly.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "What you can report",
                                        body:
                                            "Safety threats, harassment, fraud, prohibited items, impaired driving, coercion, delivery tampering, emergency misuse.",
                                    },
                                    {
                                        head: "Evidence we may request",
                                        body:
                                            "Trip details, timestamps, screenshots, delivery photos, receipts, communications logs, and lawful identity verification.",
                                    },
                                    {
                                        head: "No false reports",
                                        body:
                                            "False reporting is a serious integrity violation and may result in suspension/termination.",
                                    },
                                    {
                                        head: "Privacy-aware handling",
                                        body:
                                            "We minimize access to sensitive data, use need-to-know review, and follow applicable privacy obligations.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="law"
                            eyebrow="Compliance"
                            title="18. Law Enforcement Cooperation"
                            subtitle="We comply with valid legal requests and may act to protect life and safety."
                        >
                            <p>
                                6Ride may cooperate with law enforcement, regulators, and emergency services where required by law, in response to valid legal process,
                                or to protect life and public safety. We evaluate requests with legal and safety oversight.
                            </p>

                            <Callout title="Emergency disclosure principle">
                                Where permitted by law, we may disclose limited information to prevent imminent harm or to respond to credible emergency threats.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="changes"
                            eyebrow="Updates"
                            title="19. Changes to This Policy"
                            subtitle="We update policies as services evolve—especially as we expand globally."
                        >
                            <p>
                                We may update this AUP periodically. When we do, we update the “Last updated” date at the top of this page.
                                Continued use of 6Ride after an update constitutes acceptance of the revised policy to the extent permitted by law.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Material changes",
                                        body:
                                            "For major changes (e.g., emergency gating, prohibited items, enforcement), we may provide additional notice in-app or on the website.",
                                    },
                                    {
                                        head: "Regional variations",
                                        body:
                                            "Some changes may apply only in certain regions to match legal requirements or operational constraints.",
                                    },
                                ]}
                            />

                            <Callout title="Operational note (Last updated automation)">
                                To automatically reflect the current date when this policy is modified, set{" "}
                                <span className="font-semibold">NEXT_PUBLIC_POLICY_BUILD_DATE</span> in your deployment environment to today’s date.
                                If not set, the page intentionally shows a past date (fallback).
                            </Callout>
                        </GlassCard>

                        {/* FOOTNOTE */}
                        <div className="mt-6 rounded-3xl border border-black/10 bg-white/[0.55] p-5 text-xs text-black/60 backdrop-blur">
                            <div className="pointer-events-none absolute" />
                            This Acceptable Use Policy is enforceable under the 6Ride Terms of Service and may be used to support safety actions,
                            partner compliance decisions, and platform integrity measures across all regions where 6Ride operates.
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
