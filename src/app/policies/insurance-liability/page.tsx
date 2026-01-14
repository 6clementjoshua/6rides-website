// app/policies/insurance-liability/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

type TocItem = { id: string; label: string; note: string };
type CoverageRow = { title: string; body: string; foot?: string };
type ClaimStep = { head: string; body: string };

function formatDate(d: Date) {
    return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function parseBuildDate(input?: string | null) {
    if (!input) return null;
    const d = new Date(input);
    return Number.isNaN(d.getTime()) ? null : d;
}

const FALLBACK_LAST_UPDATED_ISO = "2025-11-01"; // keep as past date unless intentionally updated
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

function CoverageCard({ row }: { row: CoverageRow }) {
    return (
        <div className="relative rounded-3xl border border-black/10 bg-white/[0.55] p-5 backdrop-blur">
            <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-18px_28px_rgba(0,0,0,0.06)]" />
            <div className="relative">
                <div className="text-sm font-semibold text-black/85">{row.title}</div>
                <div className="mt-2 text-sm text-black/70">{row.body}</div>
                {row.foot ? (
                    <div className="mt-4 rounded-2xl border border-black/10 bg-white/[0.50] p-3 text-xs text-black/60">
                        {row.foot}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

function StepCard({ s, n }: { s: ClaimStep; n: number }) {
    return (
        <div className="relative rounded-3xl border border-black/10 bg-white/[0.55] p-5 backdrop-blur">
            <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-18px_28px_rgba(0,0,0,0.06)]" />
            <div className="relative">
                <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-semibold text-black/85">
                        <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-black/10 bg-white/[0.6] text-xs font-semibold text-black/70">
                            {n}
                        </span>
                        {s.head}
                    </div>
                    <InlineTag>Claims</InlineTag>
                </div>
                <div className="mt-2 text-sm text-black/70">{s.body}</div>
            </div>
        </div>
    );
}

export default function InsuranceLiabilityPage() {
    const { effectiveDate, lastUpdated } = usePolicyDates();
    const [mobileTocOpen, setMobileTocOpen] = useState(false);

    const toc: TocItem[] = useMemo(
        () => [
            { id: "overview", label: "1. Overview & Definitions", note: "How this disclosure works and what terms mean." },
            { id: "role", label: "2. Platform Role", note: "6Ride as a technology/coordination platform; independent operators." },
            { id: "coverage", label: "3. Insurance Coverage (General)", note: "Coverage varies by location, service line, and partner/insurer." },
            { id: "services", label: "4. Coverage by Service Line", note: "Passenger rides, deliveries, enterprise programs, and emergency rides." },
            { id: "user", label: "5. User Responsibilities", note: "Belongings, conduct, accurate info, and safe behavior." },
            { id: "drivers", label: "6. Driver & Partner Responsibilities", note: "Licensing, safe vehicle, compliance, and cooperation." },
            { id: "liability", label: "7. Limitation of Liability", note: "Allocation of risk within lawful bounds." },
            { id: "claims", label: "8. Claims Process & Evidence", note: "How to report incidents and what we may request." },
            { id: "thirdparty", label: "9. Third-Party Claims & Disputes", note: "Insurers, authorities, and courts may be involved." },
            { id: "global", label: "10. Global Coverage & Local Law", note: `Applies wherever 6Ride operates; HQ: ${HQ_LOCATION}.` },
            { id: "changes", label: "11. Updates to This Disclosure", note: "How we reflect changes via last-updated." },
        ],
        []
    );

    const coverageRows: CoverageRow[] = useMemo(
        () => [
            {
                title: "Coverage is location- and service-dependent",
                body:
                    "Insurance availability, limits, and eligibility can differ by country, state, city, service type, and legal regime. Some regions require minimum cover; other regions rely on driver/partner policies.",
                foot:
                    "You should not assume the same coverage exists in every city. Always review the in-app trip or program disclosures where available.",
            },
            {
                title: "Partner and driver insurance may apply",
                body:
                    "Drivers and partner fleets may hold personal, commercial, or fleet insurance. In many markets, these policies are primary for road incidents, subject to insurer terms and local law.",
                foot:
                    "Coverage may exclude events such as intentional acts, unlawful conduct, prohibited cargo, or use outside authorized service scope.",
            },
            {
                title: "Third-party insurers and programs",
                body:
                    "Where 6Ride or a partner offers supplemental coverage, it is typically provided through third-party insurers and is subject to policy terms, exclusions, and claims procedures.",
                foot:
                    "6Ride is not an insurer. We can facilitate reporting and share information as permitted to support the claims process.",
            },
            {
                title: "No guarantee of coverage",
                body:
                    "Coverage may be denied if the incident is outside the policy scope or if required conditions are not met (e.g., false information, non-compliance, prohibited acts).",
            },
        ],
        []
    );

    const serviceLineBullets = useMemo(
        () => [
            {
                head: "Passenger rides",
                body:
                    "Coverage may involve driver/partner motor policies and, in some regions, supplemental coverage. The applicable policy depends on location, trip status, and insurer requirements.",
            },
            {
                head: "Delivery, food & goods",
                body:
                    "Coverage may differ for courier operations and cargo. Prohibited items, unsafe packaging, and unlawful content can void coverage and trigger enforcement.",
            },
            {
                head: "Enterprise programs",
                body:
                    "Enterprise accounts may operate under separate agreements that define reporting, claims coordination, and governance. Enterprise customers may also maintain their own insurance.",
            },
            {
                head: "Emergency ride program",
                body:
                    "Emergency rides are transportation coordination only (not clinical care). Insurance coverage—if any—still depends on local law, driver/partner policies, and insurer terms.",
            },
        ],
        []
    );

    const claimSteps: ClaimStep[] = useMemo(
        () => [
            {
                head: "Report promptly",
                body:
                    "Report incidents as soon as feasible via in-app support/safety or the Contact page. Include trip ID, date/time, city, and a concise description. Delay can affect evidence integrity and insurer response windows.",
            },
            {
                head: "Preserve evidence",
                body:
                    "Keep receipts, photos, screenshots, and witness details where safe to do so. Do not fabricate or alter evidence. Evidence manipulation can void claims and lead to enforcement.",
            },
            {
                head: "Cooperate with investigation",
                body:
                    "We may request clarifications, identity verification, or additional documentation. Insurers and authorities may also require statements or reports depending on jurisdiction.",
            },
            {
                head: "Insurer/authority handling",
                body:
                    "Some claims are handled directly by insurers or authorities. 6Ride may provide relevant trip records as permitted by law and policy, but cannot guarantee claim acceptance.",
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
                                <span>6Ride Risk & Coverage</span>
                            </div>

                            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                                Insurance & Liability Disclosure
                            </h1>

                            <p className="mt-3 max-w-3xl text-sm leading-6 text-black/70">
                                This disclosure explains insurance coverage, liability limitations, and responsibility allocation between 6Ride, drivers, partners,
                                riders, senders/recipients (delivery), enterprises, and third parties. Insurance rules and liability frameworks vary by location,
                                so this document describes global principles and directs you to local disclosures where applicable.
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
                                <InlineTag>Not an insurer</InlineTag>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <BevelButton href="/policies/terms">Terms</BevelButton>
                            <BevelButton href="/policies/partner-terms">Partner Terms</BevelButton>
                            <BevelButton href="/policies/acceptable-use">Acceptable Use</BevelButton>
                            <BevelButton href="/policies/contact">Contact</BevelButton>
                        </div>
                    </div>

                    {/* quick clarity cards */}
                    <div className="mt-7 grid gap-3 md:grid-cols-3">
                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Coverage varies</div>
                                <div className="mt-1 text-sm text-black/75">
                                    Insurance scope and limits depend on city, service type, partner structure, and local law.
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Independent operators</div>
                                <div className="mt-1 text-sm text-black/75">
                                    Drivers/partners may operate independently unless a specific written arrangement states otherwise.
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Claims follow rules</div>
                                <div className="mt-1 text-sm text-black/75">
                                    Third-party insurers and authorities may control outcomes based on evidence, policy terms, and law.
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
                                        This disclosure explains principles; local laws and insurer terms may impose different requirements.
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
                            id="overview"
                            eyebrow="Definitions"
                            title="1. Overview & Definitions"
                            subtitle="Clear terms reduce confusion about coverage, liability, and the claims process."
                        >
                            <p>
                                This disclosure allocates responsibilities across the platform, independent operators, users, and third parties. The words “insurance,” “coverage,”
                                and “liability” are often used casually; here they are used in a strict sense.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "6Ride",
                                        body:
                                            "A technology and coordination platform that enables users to request services and enables independent drivers/partners to accept requests, subject to policies and law.",
                                    },
                                    {
                                        head: "Driver / Partner",
                                        body:
                                            "An independent operator or fleet (unless explicitly stated otherwise by written agreement). May carry required insurance and bears operational responsibilities.",
                                    },
                                    {
                                        head: "Coverage",
                                        body:
                                            "An insurance policy or program that may respond to certain incidents if eligibility criteria are met and exclusions do not apply.",
                                    },
                                    {
                                        head: "Liability",
                                        body:
                                            "A legal responsibility determined by law, facts, and sometimes courts/authorities. Insurance may pay claims, but does not automatically determine fault.",
                                    },
                                ]}
                            />

                            <Callout title="Not legal advice">
                                This document is an informational disclosure. It does not replace local legal advice or insurer policy documents.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="role"
                            eyebrow="Role clarity"
                            title="2. Platform Role"
                            subtitle="6Ride coordinates services; drivers/partners operate independently unless explicitly stated."
                        >
                            <p>
                                6Ride is a technology and coordination platform. Drivers and partners operate independently unless a specific written agreement states otherwise.
                                Operational conduct (driving, vehicle condition, route decisions within law) is performed by drivers/partners, and user conduct is performed by users.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Coordination function",
                                        body:
                                            "We provide discovery, booking, routing support, payment coordination, and safety tooling where available.",
                                    },
                                    {
                                        head: "Independent operations",
                                        body:
                                            "Drivers/partners are responsible for licensing, vehicle condition, lawful conduct, and compliance with safety rules.",
                                    },
                                    {
                                        head: "No insurer status",
                                        body:
                                            "6Ride is not an insurer and does not sell insurance as an insurance company. Any coverage is provided through third parties where offered.",
                                    },
                                    {
                                        head: "Policy enforcement",
                                        body:
                                            "We can investigate, restrict, suspend, or terminate accounts for fraud, unsafe behavior, or policy violations.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="coverage"
                            eyebrow="Insurance"
                            title="3. Insurance Coverage (General)"
                            subtitle="Coverage varies significantly across cities, services, and legal regimes."
                        >
                            <p>
                                Insurance coverage may be provided by partners, third-party insurers, or required by law. Coverage scope, limits, and eligibility vary by location
                                and service type. Users should not assume uniform coverage globally.
                            </p>

                            <div className="mt-4 grid gap-3 lg:grid-cols-2">
                                {coverageRows.map((r) => (
                                    <CoverageCard key={r.title} row={r} />
                                ))}
                            </div>

                            <Callout title="Coverage can depend on trip status">
                                In some markets, coverage may apply only when a driver is on an accepted trip, en route to pickup, or during an active delivery window, subject to insurer terms.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="services"
                            eyebrow="Service lines"
                            title="4. Coverage by Service Line"
                            subtitle="Different services can carry different risk profiles and coverage arrangements."
                        >
                            <BulletGrid items={serviceLineBullets} />

                            <Callout title="Emergency ride note">
                                Emergency rides are transportation coordination only. 6Ride does not provide medical care, and emergency status does not expand insurance coverage beyond what local law and insurer terms allow.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="user"
                            eyebrow="Your duties"
                            title="5. User Responsibilities"
                            subtitle="User conduct and accuracy materially affect safety outcomes and claim eligibility."
                        >
                            <p>
                                Users are responsible for personal belongings, conduct, and compliance with applicable laws during trips and deliveries. Many insurer programs require reasonable care and accurate reporting.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Belongings",
                                        body:
                                            "Keep your belongings secure and check the vehicle before exiting. 6Ride may assist with lost-and-found, but cannot guarantee recovery.",
                                    },
                                    {
                                        head: "Accurate information",
                                        body:
                                            "Provide correct pickup/destination, recipient details (delivery), and contact information. Inaccuracies can cause safety risk and delays.",
                                    },
                                    {
                                        head: "Lawful behavior",
                                        body:
                                            "Do not carry prohibited items, do not threaten or harass others, and do not attempt to coerce off-platform payments.",
                                    },
                                    {
                                        head: "Safety compliance",
                                        body:
                                            "Follow safety instructions, use seat belts where available, and avoid conduct that distracts or endangers the driver.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="drivers"
                            eyebrow="Operator duties"
                            title="6. Driver & Partner Responsibilities"
                            subtitle="Drivers/partners must maintain legal compliance, safety standards, and truthful reporting."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Licensing & lawful operation",
                                        body:
                                            "Maintain valid licensing and comply with traffic laws and local transport regulations.",
                                    },
                                    {
                                        head: "Vehicle safety and fitness",
                                        body:
                                            "Operate a roadworthy vehicle, maintain brakes/tires/lights, and follow safety requirements.",
                                    },
                                    {
                                        head: "Truthful reporting",
                                        body:
                                            "Provide accurate incident statements. Fraud or misrepresentation can void coverage and trigger enforcement.",
                                    },
                                    {
                                        head: "Professional conduct",
                                        body:
                                            "No harassment, discrimination, threats, or inappropriate interaction. Violations may lead to immediate account action.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="liability"
                            eyebrow="Liability"
                            title="7. Limitation of Liability"
                            subtitle="We limit liability within lawful bounds for indirect and consequential losses."
                        >
                            <p>
                                To the maximum extent permitted by law, 6Ride is not liable for indirect, incidental, special, punitive, or consequential damages, including lost profits,
                                lost opportunities, or reputational harm, arising from use of the platform. Some jurisdictions do not allow certain limitations; where prohibited, those
                                limitations do not apply to you.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "No guaranteed outcomes",
                                        body:
                                            "We do not guarantee uninterrupted service availability, driver supply, delivery completion time, or third-party insurer claim acceptance.",
                                    },
                                    {
                                        head: "Third-party dependencies",
                                        body:
                                            "Network outages, map/payment provider failures, weather, and government restrictions may affect service and timing.",
                                    },
                                    {
                                        head: "Policy enforcement",
                                        body:
                                            "We may restrict or suspend accounts to protect users, prevent fraud, and comply with law.",
                                    },
                                    {
                                        head: "Non-waivable rights",
                                        body:
                                            "Nothing here limits consumer rights that cannot be waived under applicable law.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="claims"
                            eyebrow="How to file"
                            title="8. Claims Process & Evidence"
                            subtitle="Fast, accurate reporting improves safety outcomes and supports insurer handling."
                        >
                            <p>
                                Claims involving road incidents, property damage, or injury may be handled by insurers and/or authorities depending on jurisdiction. 6Ride can facilitate reporting
                                and provide trip records as permitted, but cannot guarantee outcomes.
                            </p>

                            <div className="mt-4 grid gap-3 lg:grid-cols-2">
                                {claimSteps.map((s, i) => (
                                    <StepCard key={s.head} s={s} n={i + 1} />
                                ))}
                            </div>

                            <Callout title="Emergency situations">
                                In life-threatening emergencies, contact local emergency services first. Reporting to 6Ride is not a substitute for emergency response.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="thirdparty"
                            eyebrow="Disputes"
                            title="9. Third-Party Claims & Disputes"
                            subtitle="Third-party claims often follow formal legal pathways depending on jurisdiction."
                        >
                            <p>
                                Claims involving third parties (other motorists, pedestrians, property owners, insurers) may be handled by insurers, authorities, or courts. Outcomes depend on
                                facts, legal standards, and insurer terms. 6Ride may provide information consistent with the Privacy Policy and applicable law.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Authorities and reports",
                                        body:
                                            "Police reports or incident reference numbers may be required in some jurisdictions to process claims.",
                                    },
                                    {
                                        head: "Insurer communications",
                                        body:
                                            "Insurers may contact drivers, partners, and users directly. You remain responsible for truthful statements.",
                                    },
                                    {
                                        head: "Jurisdiction matters",
                                        body:
                                            "Rules differ across countries and states; some systems are no-fault while others assign fault through investigation.",
                                    },
                                    {
                                        head: "Confidentiality",
                                        body:
                                            "Enterprise or sensitive cases may be handled with additional confidentiality constraints and access controls.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="global"
                            eyebrow="Worldwide"
                            title="10. Global Coverage & Local Law"
                            subtitle="This disclosure applies wherever 6Ride operates; local laws may add mandatory requirements."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Global principle",
                                        body:
                                            "Coverage varies. Operators must comply with local licensing and insurance requirements. Users must comply with local laws and platform policies.",
                                    },
                                    {
                                        head: "Local addenda",
                                        body:
                                            "Some regions may require additional disclosures or policy addenda; those addenda form part of this disclosure where published.",
                                    },
                                    {
                                        head: "HQ reference",
                                        body:
                                            `Administrative headquarters: ${HQ_LOCATION}. Operations may be distributed globally as the platform expands.`,
                                    },
                                    {
                                        head: "Service lines covered",
                                        body:
                                            "Passenger rides, delivery/food/goods (where offered), enterprise programs, and emergency ride coordination.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="changes"
                            eyebrow="Updates"
                            title="11. Updates to This Disclosure"
                            subtitle="We update the last-updated date when the document changes."
                        >
                            <p>
                                We may update this disclosure as coverage arrangements evolve, products expand, and legal requirements change. When we update it, we update the “Last updated” date.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Material changes",
                                        body:
                                            "If changes materially affect user understanding, we may provide additional notice where feasible.",
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
                            This disclosure supplements the Terms of Service and Partner Terms. 6Ride is a technology and coordination platform and is not an insurer.
                            Insurance coverage, if any, is provided by partners or third-party insurers and varies by location and service.
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
