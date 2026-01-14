// app/policies/corporate-sla/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

type TocItem = { id: string; label: string; note: string };
type Tier = { name: string; intent: string; bullets: string[]; note?: string };
type Metric = { name: string; target: string; how: string; exclusions: string[] };

function formatDate(d: Date) {
    return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function parseBuildDate(input?: string | null) {
    if (!input) return null;
    const d = new Date(input);
    return Number.isNaN(d.getTime()) ? null : d;
}

const FALLBACK_LAST_UPDATED_ISO = "2025-11-01";
const EFFECTIVE_DATE_ISO = "2025-08-01";
const HQ_LOCATION = "Cross River State, Nigeria (HQ)";

function cx(...parts: Array<string | false | undefined | null>) {
    return parts.filter(Boolean).join(" ");
}

/**
 * Last updated automation:
 * - Set NEXT_PUBLIC_POLICY_BUILD_DATE=YYYY-MM-DD in your deployment env when you update this page.
 * - If not set, we show a past fallback date (so it never looks “fake updated”).
 */
function usePolicyDates() {
    return useMemo(() => {
        const envDate =
            parseBuildDate(process.env.NEXT_PUBLIC_POLICY_BUILD_DATE) ||
            parseBuildDate(process.env.NEXT_PUBLIC_BUILD_DATE) ||
            null;

        return {
            effectiveDate: new Date(EFFECTIVE_DATE_ISO),
            lastUpdated: envDate ?? new Date(FALLBACK_LAST_UPDATED_ISO),
        };
    }, []);
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
                "border border-black/10 bg-white/[0.58] backdrop-blur-md",
                "shadow-[0_10px_25px_-18px_rgba(0,0,0,0.35)]",
                "before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(120%_120%_at_20%_10%,rgba(255,255,255,0.95),rgba(255,255,255,0)_55%)] before:opacity-80",
                "after:absolute after:inset-[1px] after:rounded-full after:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_20px_rgba(0,0,0,0.06)] after:content-['']",
                "hover:-translate-y-[1px] hover:shadow-[0_18px_40px_-26px_rgba(0,0,0,0.45)]",
                className
            )}
        >
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
            <div
                className={cx(
                    "pointer-events-none absolute inset-0 rounded-3xl opacity-90",
                    "bg-[radial-gradient(140%_120%_at_15%_0%,rgba(255,255,255,0.85),rgba(255,255,255,0)_55%),radial-gradient(130%_120%_at_85%_15%,rgba(255,255,255,0.55),rgba(255,255,255,0)_60%)]"
                )}
            />
            <div
                className={cx(
                    "pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                    "bg-[repeating-linear-gradient(135deg,rgba(0,0,0,0.03),rgba(0,0,0,0.03)_2px,transparent_2px,transparent_10px)]"
                )}
            />
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

function Callout({ title, children }: { title: string; children: React.ReactNode }) {
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

function InlineTag({ children }: { children: React.ReactNode }) {
    return (
        <span className="rounded-full border border-black/10 bg-white/[0.55] px-3 py-1 text-xs font-semibold text-black/65 backdrop-blur">
            {children}
        </span>
    );
}

function TierCard({ t }: { t: Tier }) {
    return (
        <div className="relative rounded-3xl border border-black/10 bg-white/[0.55] p-5 backdrop-blur">
            <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-18px_28px_rgba(0,0,0,0.06)]" />
            <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-semibold text-black/85">{t.name}</div>
                    <span className="rounded-full border border-black/10 bg-white/[0.55] px-2 py-0.5 text-[10px] font-semibold text-black/55">
                        Enterprise
                    </span>
                </div>
                <div className="mt-1 text-sm text-black/70">{t.intent}</div>

                <ul className="mt-4 space-y-2 text-sm text-black/75">
                    {t.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/30" />
                            <span>{b}</span>
                        </li>
                    ))}
                </ul>

                {t.note ? (
                    <div className="mt-4 rounded-2xl border border-black/10 bg-white/[0.50] p-3 text-xs text-black/60">
                        {t.note}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

function MetricCard({ m }: { m: Metric }) {
    return (
        <div className="relative rounded-3xl border border-black/10 bg-white/[0.55] p-5 backdrop-blur">
            <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-18px_28px_rgba(0,0,0,0.06)]" />
            <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-semibold text-black/85">{m.name}</div>
                    <InlineTag>
                        Target: <span className="text-black/75">{m.target}</span>
                    </InlineTag>
                </div>
                <div className="mt-2 text-sm text-black/70">{m.how}</div>

                <div className="mt-4 rounded-2xl border border-black/10 bg-white/[0.50] p-4">
                    <div className="text-xs font-semibold text-black/65">Common exclusions</div>
                    <ul className="mt-2 space-y-2 text-xs text-black/60">
                        {m.exclusions.map((x) => (
                            <li key={x} className="flex gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black/25" />
                                <span>{x}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default function CorporateSLAPage() {
    const { effectiveDate, lastUpdated } = usePolicyDates();
    const [mobileTocOpen, setMobileTocOpen] = useState(false);

    const toc: TocItem[] = useMemo(
        () => [
            { id: "scope", label: "1. Service Scope", note: "What enterprise services include: scheduling, reporting, invoicing, and controls." },
            { id: "roles", label: "2. Enterprise Roles & Responsibilities", note: "Admins, travelers, guests, institutions, and duty-of-care." },
            { id: "availability", label: "3. Availability & Performance Targets", note: "Operational targets and what may affect availability." },
            { id: "support", label: "4. Enterprise Support & Escalations", note: "Priority routing, severity levels, and response expectations." },
            { id: "booking", label: "5. Booking Rules & Structured Transport", note: "Scheduled runs, campus/hotel workflows, guest rides, and compliance rides." },
            { id: "safety", label: "6. Safety, Security & Duty of Care", note: "Safety standards, incident handling, and risk-based controls." },
            { id: "billing", label: "7. Billing, Invoicing & Taxes", note: "Invoicing, billing cycles, disputes, and payment terms." },
            { id: "reporting", label: "8. Reporting & Analytics", note: "Usage reports, compliance reporting, and data limitations." },
            { id: "compliance", label: "9. Compliance & Conduct", note: "Local law, internal policy alignment, acceptable use, and training." },
            { id: "privacy", label: "10. Data, Privacy & Security", note: "Privacy policy alignment, access control, and enterprise governance." },
            { id: "credits", label: "11. Credits, Remedies & Limitations", note: "Commercial remedies for SLA misses and overall limitations." },
            { id: "termination", label: "12. Suspension & Termination", note: "Non-payment, risk, legal requirements, and program shutdowns." },
            { id: "global", label: "13. Global Coverage & Local Terms", note: `Worldwide operations; HQ: ${HQ_LOCATION}; region-specific addenda.` },
            { id: "changes", label: "14. Changes to These Terms", note: "How enterprise terms evolve and how notice may be provided." },
        ],
        []
    );

    const tiers: Tier[] = useMemo(
        () => [
            {
                name: "Enterprise Standard",
                intent: "For organizations that need structured rides, consolidated billing, and baseline reporting.",
                bullets: [
                    "Centralized admin dashboard (where offered) for team/guest ride management",
                    "Scheduled trips and controlled pickup/drop-off workflows (where offered)",
                    "Consolidated invoicing with configurable billing cycles under written agreement",
                    "Standard support routing and incident reporting channels",
                    "Baseline reporting for spend, trips, and utilization",
                ],
                note:
                    "Features may vary by region and rollout phase. Some capabilities require additional configuration or separate written agreements.",
            },
            {
                name: "Enterprise Priority",
                intent: "For organizations requiring priority support, higher governance, and stronger operational controls.",
                bullets: [
                    "Priority support routing with defined severity levels and escalation pathway",
                    "Enhanced admin controls (cost centers, traveler groups, policy flags) where offered",
                    "Advanced reporting and operational review cadence (where offered)",
                    "Expanded safety workflows for duty-of-care organizations (where offered)",
                    "Optional onboarding/training for admins and travelers",
                ],
                note:
                    "Priority routing is subject to verification, scope, and availability. Safety escalations may override standard support queues.",
            },
            {
                name: "Enterprise Regulated / Government",
                intent: "For government entities and regulated sectors needing compliance, auditability, and special operational handling.",
                bullets: [
                    "Compliance-aligned workflows (authorized riders, routes, pickup zones) where required",
                    "Formal escalation pathways for safety/security incidents and legal coordination",
                    "Enhanced documentation standards for audit and governance (where permitted)",
                    "Dedicated program controls subject to local law and regulatory requirements",
                    "Optional restricted driver pools/fleets where offered and lawful",
                ],
                note:
                    "Regulated sector features may require additional review, documentation, and region-specific addenda. Local law controls.",
            },
        ],
        []
    );

    const metrics: Metric[] = useMemo(
        () => [
            {
                name: "Platform Availability (App Services)",
                target: "Target high availability (region-dependent)",
                how:
                    "We aim to keep core booking and account services available. Availability is measured by the ability to request rides, view trips, and access enterprise tooling where offered.",
                exclusions: [
                    "Scheduled maintenance windows (announced where feasible)",
                    "Third-party outages (maps, telecom, payment processors) beyond our control",
                    "Regional internet disruptions, power outages, or force majeure",
                    "Account-level restrictions due to fraud/safety/compliance reviews",
                ],
            },
            {
                name: "Dispatch Performance (Pickup Experience)",
                target: "Operational target, not guaranteed",
                how:
                    "Pickup times depend on supply, traffic, weather, demand peaks, and local regulations. For scheduled programs, we apply structured dispatch workflows where offered.",
                exclusions: [
                    "Traffic congestion, road closures, security checkpoints",
                    "High-demand events (concerts, stadium events, weather disruptions)",
                    "Rider/guest no-shows or incorrect pickup information",
                    "Safety holds and verification requirements",
                ],
            },
            {
                name: "Enterprise Support (Response Routing)",
                target: "Severity-based prioritization",
                how:
                    "Enterprise support is prioritized by severity. Safety and security matters route ahead of billing and general inquiries.",
                exclusions: [
                    "Incomplete requests lacking trip IDs, dates, city, or evidence",
                    "Issues requiring third-party verification or multi-party disputes",
                    "Requests outside the defined enterprise scope or missing agreement coverage",
                    "Abusive or spam requests that require integrity review",
                ],
            },
        ],
        []
    );

    useEffect(() => {
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

            const y = el.getBoundingClientRect().top + window.scrollY - 96;
            window.scrollTo({ top: y, behavior: "smooth" });
            history.replaceState(null, "", `#${id}`);
        };

        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, []);

    return (
        <main className="min-h-screen text-black">
            {/* premium background */}
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
                                <span>6Ride Enterprise</span>
                            </div>

                            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                                Corporate SLA & Enterprise Terms
                            </h1>

                            <p className="mt-3 max-w-3xl text-sm leading-6 text-black/70">
                                These Corporate SLA & Enterprise Terms apply to organizations, institutions, hotels, campuses, event operators,
                                and government entities using 6Ride for structured transportation and logistics services. They supplement the
                                6Ride Terms of Service and other policies and may be further refined by separate written agreements.
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2 text-xs text-black/55">
                                <InlineTag>
                                    Effective: <span className="text-black/75">{formatDate(effectiveDate)}</span>
                                </InlineTag>
                                <InlineTag>
                                    Last updated: <span className="text-black/75">{formatDate(lastUpdated)}</span>
                                </InlineTag>
                                <InlineTag>
                                    HQ: <span className="text-black/75">{HQ_LOCATION}</span>
                                </InlineTag>
                                <InlineTag>Duty-of-care ready</InlineTag>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <BevelButton href="/policies/terms">Terms</BevelButton>
                            <BevelButton href="/policies/privacy">Privacy</BevelButton>
                            <BevelButton href="/policies/acceptable-use">Acceptable Use</BevelButton>
                            <BevelButton href="/policies/contact">Contact</BevelButton>
                        </div>
                    </div>

                    {/* quick enterprise signals */}
                    <div className="mt-7 grid gap-3 md:grid-cols-3">
                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Structured transport</div>
                                <div className="mt-1 text-sm text-black/75">
                                    Scheduled trips, policy controls, guest rides, campus/hotel pickup zones, and compliance-aligned workflows.
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Enterprise governance</div>
                                <div className="mt-1 text-sm text-black/75">
                                    Admin roles, cost centers, reporting, incident workflows, and integrity controls for large organizations.
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">SLA clarity</div>
                                <div className="mt-1 text-sm text-black/75">
                                    Targets and triage rules are transparent; credits/remedies require defined scope and valid measurement.
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* LAYOUT */}
                <div className="mt-10 grid gap-6 lg:grid-cols-[360px_1fr]">
                    {/* Desktop TOC */}
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
                                                    <div className="text-xs font-semibold text-black/80 group-hover:text-black">{t.label}</div>
                                                    <div className="mt-0.5 text-[11px] leading-4 text-black/55">{t.note}</div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>

                                    <div className="mt-4 rounded-2xl border border-black/10 bg-white/[0.52] p-3 text-[11px] text-black/60">
                                        Enterprise SLA remedies depend on: (1) written scope, (2) measurable impact, (3) timely reporting, and (4) exclusions.
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
                            id="scope"
                            eyebrow="Enterprise scope"
                            title="1. Service Scope"
                            subtitle="What enterprise services include and how enterprise differs from consumer rides."
                        >
                            <p>
                                Enterprise services are designed for organizations requiring structured transport workflows, governance, and consolidated billing.
                                Offerings vary by region and agreement and may include rides and (where available) delivery/logistics coordination.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Structured transportation",
                                        body:
                                            "Scheduled trips, shift transport, campus/hotel pickup zones, guest rides, event shuttles, and approved route patterns where offered.",
                                    },
                                    {
                                        head: "Governance & controls",
                                        body:
                                            "Role-based access for admins, traveler groups, cost centers, policy flags, and booking permissions where offered.",
                                    },
                                    {
                                        head: "Commercial operations",
                                        body:
                                            "Invoicing, billing cycles, spend summaries, and dispute workflows under written agreement.",
                                    },
                                    {
                                        head: "Compliance-first usage",
                                        body:
                                            "Enterprise accounts must comply with platform rules, local law, and (where applicable) institution-specific safeguarding standards.",
                                    },
                                ]}
                            />

                            <Callout title="Separate written agreements">
                                If an enterprise agreement conflicts with this page, the signed agreement controls for that enterprise relationship, subject to applicable law.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="roles"
                            eyebrow="Governance"
                            title="2. Enterprise Roles & Responsibilities"
                            subtitle="Clear roles reduce misuse, improve safety outcomes, and strengthen auditability."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Enterprise Admin",
                                        body:
                                            "Controls onboarding, policy configuration, traveler permissions, and cost allocation. Must secure admin credentials and approve only authorized users.",
                                    },
                                    {
                                        head: "Traveler / Employee",
                                        body:
                                            "Uses 6Ride within enterprise policy. Must comply with Acceptable Use and safety rules and provide accurate booking information.",
                                    },
                                    {
                                        head: "Guest / Visitor",
                                        body:
                                            "May be booked through guest workflows where offered. Guests are still bound by safety and conduct rules during trips.",
                                    },
                                    {
                                        head: "Institution / Campus Coordinator",
                                        body:
                                            "Defines pickup zones, access points, time windows, and safeguarding expectations; coordinates with security where applicable.",
                                    },
                                ]}
                            />

                            <Callout title="Duty-of-care principle">
                                Enterprises remain responsible for internal policies and traveler authorization. 6Ride provides tooling and enforcement, but cannot replace internal governance.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="availability"
                            eyebrow="Targets"
                            title="3. Availability & Performance Targets"
                            subtitle="We target high availability; operational realities and exclusions are clearly defined."
                        >
                            <p>
                                While 6Ride targets high availability, enterprise services are influenced by traffic, weather, supply, regulatory constraints,
                                and third-party dependencies. Targets below are operational objectives, not unconditional guarantees, unless expressly stated in a signed agreement.
                            </p>

                            <div className="mt-4 grid gap-3 lg:grid-cols-3">
                                {metrics.map((m) => (
                                    <MetricCard key={m.name} m={m} />
                                ))}
                            </div>

                            <Callout title="Measurement note">
                                “Availability” generally refers to platform service accessibility, not guaranteed driver supply in every neighborhood at every moment.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="support"
                            eyebrow="Priority help"
                            title="4. Enterprise Support & Escalations"
                            subtitle="Severity-based routing ensures safety and time-critical incidents get the fastest path."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Severity 1 — Safety critical",
                                        body:
                                            "Credible threats, harassment, child/student safeguarding concerns, severe accidents, or active fraud signals. Routed to safety-first response.",
                                    },
                                    {
                                        head: "Severity 2 — Operational disruption",
                                        body:
                                            "Enterprise scheduling failures, major event transport disruption, widespread billing impact, or repeated dispatch failures.",
                                    },
                                    {
                                        head: "Severity 3 — Standard requests",
                                        body:
                                            "Routine billing questions, receipts, traveler onboarding, policy updates, and general support.",
                                    },
                                    {
                                        head: "What speeds up resolution",
                                        body:
                                            "Trip IDs, timestamps, city/region, traveler identifiers (enterprise), and clear desired outcome.",
                                    },
                                ]}
                            />

                            <Callout title="Abuse of escalation">
                                False “safety critical” claims to bypass queues may result in restricted support access or account enforcement.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="booking"
                            eyebrow="Structured trips"
                            title="5. Booking Rules & Structured Transport"
                            subtitle="Enterprise booking tools are designed for predictability, auditability, and compliance."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Scheduled programs",
                                        body:
                                            "Shift transport, school/campus runs, hotel transfers, and event logistics may use scheduling windows and approved pickup zones where offered.",
                                    },
                                    {
                                        head: "Guest rides",
                                        body:
                                            "Enterprises may book guests for conferences/hotels where offered. Guest behavior remains subject to platform conduct rules.",
                                    },
                                    {
                                        head: "Policy-based restrictions",
                                        body:
                                            "Enterprises may restrict ride times, locations, service types, or spend thresholds where offered.",
                                    },
                                    {
                                        head: "Integrity requirements",
                                        body:
                                            "No deceptive pickup/destination entries, no off-platform payment coercion, and no attempts to bypass enterprise controls.",
                                    },
                                ]}
                            />

                            <Callout title="Campus and school zones">
                                If the enterprise is a school/campus, the Child & Student Safety Addendum applies and may require authorized handoffs and pickup controls.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="safety"
                            eyebrow="Duty of care"
                            title="6. Safety, Security & Duty of Care"
                            subtitle="Enterprise programs must be safe by design, not safe by luck."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Safety standards",
                                        body:
                                            "All travelers, guests, drivers, and couriers must follow safety rules, Acceptable Use, and local law at all times.",
                                    },
                                    {
                                        head: "Incident handling",
                                        body:
                                            "Safety incidents may trigger immediate account actions, investigations, and—in lawful cases—cooperation with authorities.",
                                    },
                                    {
                                        head: "Risk-based controls",
                                        body:
                                            "We may apply extra verification, restrict features, or enforce compliance holds where risk signals appear.",
                                    },
                                    {
                                        head: "Emergency service (where offered)",
                                        body:
                                            "Some emergency workflows may require verified 6Clement Joshua membership and an active emergency subscription for specific tools; safety reporting remains available.",
                                    },
                                ]}
                            />

                            <Callout title="Enterprise responsibility">
                                Enterprises must educate travelers/guests on behavior expectations and ensure only authorized users access enterprise booking tools.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="billing"
                            eyebrow="Commercial"
                            title="7. Billing, Invoicing & Taxes"
                            subtitle="Consolidated invoicing and flexible cycles may be configured under written agreement."
                        >
                            <p>
                                Corporate accounts may receive consolidated invoices and customized billing cycles. Specific pricing, discounts, taxes, and fees are defined
                                by region and agreement.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Billing cycles",
                                        body:
                                            "Monthly, bi-weekly, or custom cycles may be supported under agreement. Late payment may trigger restrictions.",
                                    },
                                    {
                                        head: "Disputes",
                                        body:
                                            "Disputes should be submitted promptly with trip IDs, receipts, traveler identifiers, and dispute reason.",
                                    },
                                    {
                                        head: "Taxes and compliance",
                                        body:
                                            "Enterprises are responsible for tax treatment of services where applicable. 6Ride provides receipts/invoices as available.",
                                    },
                                    {
                                        head: "Non-payment",
                                        body:
                                            "Non-payment or repeated payment failures may result in suspension or termination of enterprise services.",
                                    },
                                ]}
                            />

                            <Callout title="Invoicing precision">
                                Enterprise invoices reflect recorded trip data. If your internal traveler roster is not maintained, reconciliation becomes slower and more costly.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="reporting"
                            eyebrow="Analytics"
                            title="8. Reporting & Analytics"
                            subtitle="Reports support governance, budgeting, and compliance—but have limitations."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Common reporting outputs",
                                        body:
                                            "Spend summaries, trip counts, utilization by cost center, top routes, cancellation patterns, and operational notes where offered.",
                                    },
                                    {
                                        head: "Compliance reporting",
                                        body:
                                            "For regulated programs, reporting may include audit-friendly exports where offered and permitted by law.",
                                    },
                                    {
                                        head: "Limitations",
                                        body:
                                            "Reporting availability varies by region, product maturity, and agreement scope; some data may be aggregated or delayed.",
                                    },
                                    {
                                        head: "Confidentiality",
                                        body:
                                            "Reports are for enterprise use and must be protected. Sharing or misusing personal data violates policy.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="compliance"
                            eyebrow="Rules"
                            title="9. Compliance & Conduct"
                            subtitle="Enterprise users must align internal policies with platform standards and local law."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Local laws apply",
                                        body:
                                            "Traffic rules, licensing, campus procedures, and safety standards vary by city/region; enterprises must comply locally.",
                                    },
                                    {
                                        head: "Platform policies apply",
                                        body:
                                            "Terms, Acceptable Use, Safety policies, and relevant addenda (e.g., Child & Student Safety) remain enforceable.",
                                    },
                                    {
                                        head: "Training expectation",
                                        body:
                                            "Enterprises should provide traveler guidance to prevent policy violations, misuse of support channels, and safety escalations.",
                                    },
                                    {
                                        head: "No misuse",
                                        body:
                                            "No harassment, discrimination, fraud, or attempts to bypass enterprise controls and fees.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="privacy"
                            eyebrow="Governance"
                            title="10. Data, Privacy & Security"
                            subtitle="Access control, minimization, and privacy alignment are mandatory in enterprise programs."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Role-based access",
                                        body:
                                            "Only authorized enterprise admins should access reporting dashboards and traveler data.",
                                    },
                                    {
                                        head: "Data minimization",
                                        body:
                                            "Enterprises should request and store only what is needed for governance and compliance.",
                                    },
                                    {
                                        head: "Security obligations",
                                        body:
                                            "Enterprises must protect admin credentials and prevent unauthorized use of enterprise booking tools.",
                                    },
                                    {
                                        head: "Privacy policy governs",
                                        body:
                                            "Data processing and disclosure rules are governed by the 6Ride Privacy Policy and applicable law.",
                                    },
                                ]}
                            />

                            <Callout title="Sensitive programs">
                                For campus and youth programs, additional safeguarding and privacy constraints may apply.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="credits"
                            eyebrow="Remedies"
                            title="11. Credits, Remedies & Limitations"
                            subtitle="SLA remedies require defined scope, measurement, and timely reporting; they are not open-ended."
                        >
                            <p>
                                Remedies for SLA misses, if offered, depend on what is explicitly covered by a signed enterprise agreement (service scope, measurement method, credits schedule).
                                Absent a written agreement, this page describes operational targets and governance principles rather than contractual credits.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Eligibility for credits (if agreed)",
                                        body:
                                            "Enterprise must report within the defined window, provide evidence, and the miss must be attributable to covered services.",
                                    },
                                    {
                                        head: "Exclusions",
                                        body:
                                            "Force majeure, third-party outages, traffic/weather, inaccurate bookings, no-shows, fraud/safety holds, and regulatory actions.",
                                    },
                                    {
                                        head: "Limitations",
                                        body:
                                            "Credits (if any) are typically the exclusive remedy for SLA misses under the enterprise agreement.",
                                    },
                                    {
                                        head: "No double recovery",
                                        body:
                                            "You cannot claim both a refund and a credit for the same issue unless explicitly permitted in writing.",
                                    },
                                ]}
                            />

                            <Callout title="Investor-grade clarity">
                                SLAs must be measurable to be enforceable. We avoid ambiguous guarantees and instead define targets, exclusions, and governance.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="termination"
                            eyebrow="Account actions"
                            title="12. Suspension & Termination"
                            subtitle="We may suspend/terminate enterprise services for risk, non-payment, policy violations, or legal requirements."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Non-payment",
                                        body:
                                            "Repeated late payments or failures may trigger restrictions, downscoping, or suspension until resolved.",
                                    },
                                    {
                                        head: "Serious policy violations",
                                        body:
                                            "Fraud, harassment, safety abuse, or repeated misuse may trigger immediate suspension/termination.",
                                    },
                                    {
                                        head: "Legal and regulatory requirements",
                                        body:
                                            "We may suspend or modify services to comply with law, regulator directives, or safety mandates.",
                                    },
                                    {
                                        head: "Program shutdown",
                                        body:
                                            "We may retire or modify enterprise features with notice where feasible; signed agreements may define transition obligations.",
                                    },
                                ]}
                            />

                            <Callout title="Continuing obligations">
                                Confidentiality, payment obligations, and compliance duties may survive termination to the extent permitted by law and agreement.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="global"
                            eyebrow="Worldwide"
                            title="13. Global Coverage & Local Terms"
                            subtitle="Enterprise programs scale across regions, but regional realities and laws still apply."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Region-specific addenda",
                                        body:
                                            "Some countries/cities require additional addenda for licensing, campus operations, or government transport programs.",
                                    },
                                    {
                                        head: "HQ reference",
                                        body:
                                            `Administrative headquarters: ${HQ_LOCATION}. Operational support may be distributed globally as 6Ride expands.`,
                                    },
                                    {
                                        head: "Regulated sectors",
                                        body:
                                            "Government and regulated sector programs may require stricter controls, documentation, and approval workflows.",
                                    },
                                    {
                                        head: "Stricter standard prevails",
                                        body:
                                            "Where rules differ, the stricter standard applies unless a signed agreement explicitly states otherwise within lawful bounds.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="changes"
                            eyebrow="Updates"
                            title="14. Changes to These Terms"
                            subtitle="We may update enterprise terms as products evolve; signed agreements control where applicable."
                        >
                            <p>
                                We may update this page to reflect product improvements, operational changes, or regulatory requirements.
                                When we update it, we update the “Last updated” date at the top.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Material changes",
                                        body:
                                            "For significant changes, we may provide additional notice to enterprise admins where feasible.",
                                    },
                                    {
                                        head: "Automation note",
                                        body:
                                            "Set NEXT_PUBLIC_POLICY_BUILD_DATE=YYYY-MM-DD in your deployment environment when you update this page to reflect the current date.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <div className="mt-6 rounded-3xl border border-black/10 bg-white/[0.55] p-5 text-xs text-black/60 backdrop-blur">
                            Enterprise services may also be governed by separate written agreements. Nothing on this page limits mandatory consumer protection rights where applicable law applies.
                            For formal enterprise onboarding, use the Contact & Support page.
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
