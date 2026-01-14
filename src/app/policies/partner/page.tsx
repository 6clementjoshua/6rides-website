// app/policies/partner-terms/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

type TocItem = { id: string; label: string; note: string };
type GridItem = { head: string; body: string };
type KPI = { name: string; description: string; examples: string[] };
type FeeNote = { title: string; body: string };

function formatDate(d: Date) {
    return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function parseBuildDate(input?: string | null) {
    if (!input) return null;
    const d = new Date(input);
    return Number.isNaN(d.getTime()) ? null : d;
}

const FALLBACK_LAST_UPDATED_ISO = "2025-11-01"; // past date unless intentionally updated
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

function BulletGrid({ items }: { items: GridItem[] }) {
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

function KPIChip({ k }: { k: KPI }) {
    return (
        <div className="relative rounded-3xl border border-black/10 bg-white/[0.55] p-5 backdrop-blur">
            <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-18px_28px_rgba(0,0,0,0.06)]" />
            <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-semibold text-black/85">{k.name}</div>
                    <InlineTag>Quality</InlineTag>
                </div>
                <div className="mt-2 text-sm text-black/70">{k.description}</div>
                <div className="mt-4 rounded-2xl border border-black/10 bg-white/[0.50] p-4">
                    <div className="text-xs font-semibold text-black/65">Examples</div>
                    <ul className="mt-2 space-y-2 text-xs text-black/60">
                        {k.examples.map((x) => (
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

function FeeCard({ f }: { f: FeeNote }) {
    return (
        <div className="relative rounded-3xl border border-black/10 bg-white/[0.55] p-5 backdrop-blur">
            <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-18px_28px_rgba(0,0,0,0.06)]" />
            <div className="relative">
                <div className="text-sm font-semibold text-black/85">{f.title}</div>
                <div className="mt-2 text-sm text-black/70">{f.body}</div>
            </div>
        </div>
    );
}

export default function PartnerPage() {
    const { effectiveDate, lastUpdated } = usePolicyDates();
    const [mobileTocOpen, setMobileTocOpen] = useState(false);

    const toc: TocItem[] = useMemo(
        () => [
            { id: "relationship", label: "1. Partner Relationship", note: "Independent contractor relationship; no employment/agency." },
            { id: "eligibility", label: "2. Eligibility & Onboarding", note: "Documents, verification, right to work, and ongoing eligibility." },
            { id: "vehicles", label: "3. Vehicle Requirements", note: "Roadworthiness, inspections, maintenance, and service categories." },
            { id: "conduct", label: "4. Conduct & Professional Standards", note: "Respect, non-discrimination, sobriety, and service integrity." },
            { id: "operations", label: "5. Operational Rules", note: "Accept/complete trips, cancellations, routing, and service execution." },
            { id: "quality", label: "6. Quality Metrics & Performance", note: "Reliability, ratings, complaints, and continuous improvement." },
            { id: "payments", label: "7. Earnings, Fees & Payouts", note: "How earnings work, platform fees, and payout dependencies." },
            { id: "safety", label: "8. Safety & Compliance", note: "Local laws, safety tools, incident handling, and audits." },
            { id: "minors", label: "9. Minors & Student Transport", note: "Strict safeguarding rules and required authorizations." },
            { id: "insurance", label: "10. Insurance & Liability", note: "Operator insurance obligations and liability allocation." },
            { id: "branding", label: "11. Branding & Appearance", note: "Uniforms/decals, identity integrity, and prohibited misrepresentation." },
            { id: "data", label: "12. Data & Privacy", note: "Data handling, confidentiality, and restricted use of user info." },
            { id: "international", label: "13. International Operations", note: "Comply with local regulations wherever you operate." },
            { id: "suspension", label: "14. Suspension & Termination", note: "Grounds for suspension, termination, and enforcement." },
            { id: "changes", label: "15. Changes to These Terms", note: "How we update and how notice may be provided." },
            { id: "contact", label: "16. Contact", note: "How partners reach 6Ride for onboarding, support, and disputes." },
        ],
        []
    );

    const qualityKPIs: KPI[] = useMemo(
        () => [
            {
                name: "Reliability",
                description:
                    "Reliability reflects consistent acceptance, timely arrival, and completion of trips/deliveries without avoidable cancellations.",
                examples: ["Repeated late arrivals without valid cause", "Frequent cancellations after acceptance", "Avoiding certain neighborhoods unfairly"],
            },
            {
                name: "Safety conduct",
                description:
                    "Safety conduct includes lawful driving, respectful behavior, sobriety, and cooperation with incident reporting and reviews.",
                examples: ["Reckless driving or dangerous maneuvers", "Driving under influence", "Refusing safety checks after an incident"],
            },
            {
                name: "Service integrity",
                description:
                    "Service integrity means honest execution: no off-platform payments, no deception, no manipulation of trips or metrics.",
                examples: ["Cash solicitation outside the app", "Fake trips or collusion", "Misrepresenting identity or vehicle"],
            },
        ],
        []
    );

    const feeNotes: FeeNote[] = useMemo(
        () => [
            {
                title: "Platform service fees",
                body:
                    "6Ride may charge platform service fees, marketplace fees, or program fees disclosed in the app or partner dashboards. Fees may vary by city, service type, and promotions.",
            },
            {
                title: "Taxes and regulatory charges",
                body:
                    "Where required, taxes and regulatory charges may be withheld or collected. Partners are responsible for their own tax compliance and reporting obligations.",
            },
            {
                title: "Payout dependencies",
                body:
                    "Payout timing may depend on identity verification, banking/fintech processing, fraud reviews, chargebacks, refunds, and local payment rails.",
            },
            {
                title: "Adjustments and disputes",
                body:
                    "We may adjust earnings for cancellations, fraud, duplicate charges, pricing errors, or policy violations. Partners can dispute within the stated window using trip IDs and evidence.",
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
                                <span>6Ride Partners</span>
                            </div>

                            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                                Partner & Driver Terms
                            </h1>

                            <p className="mt-3 max-w-3xl text-sm leading-6 text-black/70">
                                These Partner & Driver Terms (“Partner Terms”) govern participation on the 6Ride platform as a driver, vehicle owner, fleet operator, courier, or service
                                partner. They apply to operations in Nigeria (including Cross River State and all cities) and internationally wherever 6Ride operates.
                                They supplement the 6Ride Terms of Service, Acceptable Use, Safety policies, and any program-specific addenda.
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
                                <InlineTag>Independent contractors</InlineTag>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <BevelButton href="/policies/terms">Terms</BevelButton>
                            <BevelButton href="/policies/privacy">Privacy</BevelButton>
                            <BevelButton href="/policies/acceptable-use">Acceptable Use</BevelButton>
                            <BevelButton href="/policies/contact">Contact</BevelButton>
                        </div>
                    </div>

                    {/* fast partner signal cards */}
                    <div className="mt-7 grid gap-3 md:grid-cols-3">
                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Safety-first marketplace</div>
                                <div className="mt-1 text-sm text-black/75">
                                    We enforce strict standards to protect riders, drivers, couriers, and the public—globally.
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Integrity and fairness</div>
                                <div className="mt-1 text-sm text-black/75">
                                    No off-platform payments, no harassment, no discrimination, and no manipulation of trips or pricing.
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Program-based operations</div>
                                <div className="mt-1 text-sm text-black/75">
                                    Passenger rides, deliveries (food/goods), enterprise programs, and emergency rides (transport only) may have additional rules.
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
                                        Partners must comply with all local laws where operating (Nigeria, Cross River, and worldwide) and all 6Ride platform policies.
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
                            id="relationship"
                            eyebrow="Relationship"
                            title="1. Partner Relationship"
                            subtitle="Independent partner relationship; no employment, agency, or joint venture."
                        >
                            <p>
                                Drivers, couriers, vehicle owners, and fleet operators participating on 6Ride act as independent contractors and/or independent businesses. Nothing in these
                                Partner Terms creates an employment relationship, agency, partnership, joint venture, or fiduciary relationship between you and 6Ride.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Your independence",
                                        body:
                                            "You control when and where you go online, which trips you accept, and how you operate your business—subject to platform rules and law.",
                                    },
                                    {
                                        head: "No exclusivity (unless written)",
                                        body:
                                            "You may work with other platforms unless a separate written agreement states otherwise.",
                                    },
                                    {
                                        head: "No authority to bind 6Ride",
                                        body:
                                            "You cannot represent that you are employed by 6Ride or that you can legally bind 6Ride to any obligation.",
                                    },
                                    {
                                        head: "Local law control",
                                        body:
                                            "Where local laws classify the relationship differently, the relationship is interpreted to comply with those laws to the extent required.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="eligibility"
                            eyebrow="Onboarding"
                            title="2. Eligibility & Onboarding"
                            subtitle="Document verification, safety screening, and ongoing eligibility checks."
                        >
                            <p>
                                To partner on 6Ride, you must meet eligibility requirements and provide truthful documentation. We may approve, reject, suspend, or revoke partner access based
                                on safety, compliance, risk, or integrity signals.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Identity verification",
                                        body:
                                            "Valid government-issued ID and truthful profile information. Impersonation or document fraud is grounds for immediate removal.",
                                    },
                                    {
                                        head: "Licensing where applicable",
                                        body:
                                            "A valid driver’s license, permits, and endorsements required by your jurisdiction and service type.",
                                    },
                                    {
                                        head: "Background/safety screening",
                                        body:
                                            "Where permitted by law, we may conduct background checks or require third-party verification and periodic rechecks.",
                                    },
                                    {
                                        head: "Right to operate",
                                        body:
                                            "You must have legal authorization to work/operate and the legal right to drive/operate a vehicle in your region.",
                                    },
                                ]}
                            />

                            <Callout title="Ongoing checks">
                                You must keep documents current. Expired documents, repeated complaints, fraud signals, or safety violations can trigger re-verification or removal.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="vehicles"
                            eyebrow="Vehicle standards"
                            title="3. Vehicle Requirements"
                            subtitle="Roadworthiness, cleanliness, and category standards protect passengers, goods, and your business."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Legal registration and compliance",
                                        body:
                                            "Vehicle must be legally registered, roadworthy, and compliant with local transport rules (Nigeria, Cross River, and every region worldwide).",
                                    },
                                    {
                                        head: "Maintenance and inspections",
                                        body:
                                            "You must maintain brakes/tires/lights and address mechanical issues promptly. We may require inspections (physical or digital).",
                                    },
                                    {
                                        head: "Cleanliness and interior standards",
                                        body:
                                            "Passenger comfort and hygiene standards apply. Persistent cleanliness complaints may result in enforcement.",
                                    },
                                    {
                                        head: "Service category fit",
                                        body:
                                            "Vehicle must match its listed category (ride type, delivery type, cargo capacity). Misclassification is prohibited.",
                                    },
                                ]}
                            />

                            <Callout title="Delivery and cargo safety">
                                For food/goods delivery, packaging must be safe and legal. Prohibited items, unsafe packaging, or misdeclared goods can result in termination and possible reporting.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="conduct"
                            eyebrow="Professionalism"
                            title="4. Conduct & Professional Standards"
                            subtitle="Safety and respect are non-negotiable; integrity keeps the marketplace trusted."
                        >
                            <p>Partners must act professionally and respectfully at all times. The following are strictly prohibited:</p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Harassment and discrimination",
                                        body:
                                            "No harassment, intimidation, hate, or discriminatory treatment based on protected characteristics or local law.",
                                    },
                                    {
                                        head: "Impairment",
                                        body:
                                            "No driving/operating under the influence of alcohol, drugs, or impairing substances. This is grounds for immediate removal.",
                                    },
                                    {
                                        head: "Unsafe driving/operation",
                                        body:
                                            "No reckless driving, dangerous maneuvers, or intentional rule violations. Safety complaints are handled with priority enforcement.",
                                    },
                                    {
                                        head: "Off-platform payments and coercion",
                                        body:
                                            "No soliciting cash/off-platform payments, no coercion, and no price manipulation outside platform pricing rules.",
                                    },
                                ]}
                            />

                            <Callout title="Zero tolerance integrity issues">
                                Fraud, impersonation, sexual misconduct, violence threats, and severe safety violations may result in immediate termination and cooperation with lawful authorities where required.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="operations"
                            eyebrow="Operations"
                            title="5. Operational Rules"
                            subtitle="Consistent operations build trust: arrive, communicate, complete, and document properly."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Pickup and verification",
                                        body:
                                            "Follow pickup instructions and verify rider/recipient identity where required by service rules (especially campus/student and enterprise programs).",
                                    },
                                    {
                                        head: "Routing",
                                        body:
                                            "Use lawful routes and follow in-app routing guidance where offered. Do not intentionally extend routes or create unnecessary detours.",
                                    },
                                    {
                                        head: "Cancellations and no-shows",
                                        body:
                                            "Excessive cancellations after acceptance harm reliability. Patterns may trigger coaching, restrictions, or termination.",
                                    },
                                    {
                                        head: "Communication",
                                        body:
                                            "Use in-app communications for trip-related contact. Unwanted contact outside service purposes is prohibited.",
                                    },
                                ]}
                            />

                            <Callout title="Emergency rides">
                                Emergency rides are transport coordination only. Partners must not claim to be medical responders or hospital-affiliated. Follow the Emergency Disclaimer.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="quality"
                            eyebrow="Performance"
                            title="6. Quality Metrics & Performance"
                            subtitle="Quality protects earnings. Poor patterns reduce trust and may lead to enforcement."
                        >
                            <p>
                                We monitor service reliability, safety signals, integrity, and user feedback to protect the marketplace. Metrics may vary by region and service line, but the
                                principles are global.
                            </p>

                            <div className="mt-4 grid gap-3 lg:grid-cols-3">
                                {qualityKPIs.map((k) => (
                                    <KPIChip key={k.name} k={k} />
                                ))}
                            </div>

                            <Callout title="Coaching and restrictions">
                                We may provide education, warnings, or temporary feature restrictions before termination depending on severity and risk.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="payments"
                            eyebrow="Earnings"
                            title="7. Earnings, Fees & Payouts"
                            subtitle="Earnings are program- and trip-dependent; payout timing can vary by verification and payment rails."
                        >
                            <p>
                                Earnings are calculated per trip or under partner programs as disclosed in the app, driver dashboards, or written agreements. Fees, taxes, incentives, and
                                promotions may change by city, service type, and time window.
                            </p>

                            <div className="mt-4 grid gap-3 lg:grid-cols-2">
                                {feeNotes.map((f) => (
                                    <FeeCard key={f.title} f={f} />
                                ))}
                            </div>

                            <Callout title="Chargebacks and fraud reviews">
                                We may temporarily hold payouts or apply deductions to address chargebacks, duplicate payments, fraud, refunds, or policy violations, consistent with law and agreements.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="safety"
                            eyebrow="Compliance"
                            title="8. Safety & Compliance"
                            subtitle="Partners must comply with Nigerian law (including Cross River) and all laws where operating globally."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Local rules apply",
                                        body:
                                            "You must comply with federal/national law, state/provincial rules, city regulations, and traffic/transport laws in your operating region.",
                                    },
                                    {
                                        head: "Safety reporting",
                                        body:
                                            "Report serious incidents promptly through official channels. Provide accurate statements and cooperate with investigations.",
                                    },
                                    {
                                        head: "Inspections and audits",
                                        body:
                                            "We may require inspections, documentation checks, and safety training where lawful and necessary.",
                                    },
                                    {
                                        head: "No retaliation",
                                        body:
                                            "Retaliation against riders, recipients, or reporters is prohibited and may result in permanent termination.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="minors"
                            eyebrow="Safeguarding"
                            title="9. Minors & Student Transport"
                            subtitle="Strict safeguarding rules apply. When in doubt, do not proceed."
                        >
                            <p>
                                Transport involving minors or students may only occur under verified guardian, school, or institutional arrangements. Drivers must follow all safety and consent
                                requirements strictly.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Authorization required",
                                        body:
                                            "No informal “please help” requests. Use only verified trips and approved handoff/pickup processes.",
                                    },
                                    {
                                        head: "Approved locations",
                                        body:
                                            "Pickup and drop-off should occur at approved locations (school gate, designated zone) where the program requires it.",
                                    },
                                    {
                                        head: "Boundary rules",
                                        body:
                                            "No inappropriate interaction, no coercion, no private detours, no “extra stops” outside approved routes for minors/student trips.",
                                    },
                                    {
                                        head: "Refuse if unclear",
                                        body:
                                            "If authorization is unclear, you must refuse or end the trip safely and report via support/safety channels.",
                                    },
                                ]}
                            />

                            <Callout title="Addendum applies">
                                This section is supplemented by the Child & Student Safety Addendum. Violations may trigger immediate termination and lawful cooperation.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="insurance"
                            eyebrow="Insurance"
                            title="10. Insurance & Liability"
                            subtitle="Partners must maintain insurance as required by law; coverage varies by location and program."
                        >
                            <p>
                                Partners are responsible for maintaining valid vehicle insurance as required by law. 6Ride does not provide personal vehicle insurance unless explicitly stated
                                in writing. Insurance coverage (if any) may be provided by third-party insurers or partner programs and can vary by location and service line.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Maintain required coverage",
                                        body:
                                            "Keep valid insurance and provide proof on request. Lapsed coverage can trigger immediate deactivation.",
                                    },
                                    {
                                        head: "Truthful claims",
                                        body:
                                            "Fraud or misrepresentation to insurers or 6Ride is prohibited and may be reported where required by law.",
                                    },
                                    {
                                        head: "Incident cooperation",
                                        body:
                                            "You must cooperate with incident investigations and supply requested documents promptly.",
                                    },
                                    {
                                        head: "Local law governs liability",
                                        body:
                                            "Liability is determined by facts and local law. Insurance may respond, but does not automatically determine fault.",
                                    },
                                ]}
                            />

                            <Callout title="Reference">
                                See the Insurance & Liability Disclosure for detailed explanations of coverage variability and claims handling.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="branding"
                            eyebrow="Brand integrity"
                            title="11. Branding & Appearance"
                            subtitle="Brand signals must be accurate; impersonation and misuse are prohibited."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Use provided branding correctly",
                                        body:
                                            "Where branding is provided (uniforms, delivery boxes, decals), you must use it as instructed and keep it in good condition.",
                                    },
                                    {
                                        head: "No fake badges or claims",
                                        body:
                                            "Do not claim government affiliation, medical responder status, or special authority. Do not use fake verification marks.",
                                    },
                                    {
                                        head: "Identity consistency",
                                        body:
                                            "Operate only with your verified profile. Account sharing or “renting” accounts is prohibited.",
                                    },
                                    {
                                        head: "No external advertising abuse",
                                        body:
                                            "Do not place unapproved ads on branded assets that conflict with 6Ride policies or local law.",
                                    },
                                ]}
                            />

                            <Callout title="Emergency rides branding rule">
                                Emergency rides are transport coordination only. You must never represent your vehicle as an ambulance or hospital-affiliated.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="data"
                            eyebrow="Privacy"
                            title="12. Data & Privacy"
                            subtitle="Partner access to user data is limited to delivering the service—nothing more."
                        >
                            <p>
                                Partner data is processed according to our Privacy Policy. Trip records may be retained for compliance, safety, and dispute resolution. Partners must treat user
                                data as confidential and use it only for trip/delivery purposes.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Restricted use",
                                        body:
                                            "Do not store user phone numbers for personal use, do not contact users outside trip/delivery needs, and do not share user data with third parties.",
                                    },
                                    {
                                        head: "Security duties",
                                        body:
                                            "Protect your device and account credentials. Report suspected compromise promptly.",
                                    },
                                    {
                                        head: "No recordings for harassment",
                                        body:
                                            "Do not record users unlawfully or use recordings to intimidate or blackmail. Violations may result in termination.",
                                    },
                                    {
                                        head: "Lawful requests",
                                        body:
                                            "If authorities request information, direct them to official 6Ride legal channels. Do not disclose privately.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="international"
                            eyebrow="Worldwide"
                            title="13. International Operations"
                            subtitle="If you operate outside Nigeria, you must comply with all local laws and licensing rules."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Licensing and permits",
                                        body:
                                            "You are responsible for any commercial transport permits, driver checks, and vehicle compliance required locally.",
                                    },
                                    {
                                        head: "Tax compliance",
                                        body:
                                            "You are responsible for tax filing and reporting obligations under your local laws unless a written program states otherwise.",
                                    },
                                    {
                                        head: "Local cultural and legal norms",
                                        body:
                                            "Respect local rules and safety expectations. The strictest platform standard applies where permissible.",
                                    },
                                    {
                                        head: "Program variation",
                                        body:
                                            "Features and payout rails can vary by country. Always follow in-app disclosures for your region.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="suspension"
                            eyebrow="Enforcement"
                            title="14. Suspension & Termination"
                            subtitle="We may suspend or permanently terminate partner access to protect users, partners, and the platform."
                        >
                            <p>
                                6Ride may suspend or permanently terminate partner access for safety violations, legal non-compliance, poor service quality, fraud, repeated complaints, or breach
                                of these Partner Terms. Severity and risk determine the action.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Immediate termination triggers",
                                        body:
                                            "Impersonation, sexual misconduct, credible violence threats, severe fraud, driving under the influence, or serious safeguarding violations.",
                                    },
                                    {
                                        head: "Progressive enforcement (where appropriate)",
                                        body:
                                            "Warnings, training/coaching, temporary restrictions, and probation may be applied depending on severity and history.",
                                    },
                                    {
                                        head: "Earnings holds",
                                        body:
                                            "We may hold payouts during fraud/chargeback investigations or where required by law.",
                                    },
                                    {
                                        head: "Cooperation with authorities",
                                        body:
                                            "We may cooperate with lawful requests and safety-critical investigations where required by law.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="changes"
                            eyebrow="Updates"
                            title="15. Changes to These Terms"
                            subtitle="We update the last-updated date when the document changes."
                        >
                            <p>
                                These Partner Terms may be updated periodically. Continued participation constitutes acceptance of any revised version. When we update this page, we update the
                                “Last updated” date at the top.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Material changes",
                                        body:
                                            "For significant changes, we may provide additional notice through the app or partner dashboards where feasible.",
                                    },
                                    {
                                        head: "Automation note",
                                        body:
                                            "Set NEXT_PUBLIC_POLICY_BUILD_DATE=YYYY-MM-DD in your deployment environment when you update this page to reflect the current date.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="contact"
                            eyebrow="Contact"
                            title="16. Contact"
                            subtitle="Use official channels for onboarding, disputes, and compliance questions."
                        >
                            <p>
                                Questions regarding partner participation, onboarding, disputes, and compliance should be directed via the Contact page. For urgent safety concerns, use the
                                safety/emergency reporting paths available in the app and policy pages.
                            </p>

                            <Callout title="Keep it official">
                                Do not rely on informal social media messages for onboarding or disputes. Official channels protect you and the platform.
                            </Callout>
                        </GlassCard>

                        <div className="mt-6 rounded-3xl border border-black/10 bg-white/[0.55] p-5 text-xs text-black/60 backdrop-blur">
                            These Partner & Driver Terms form a binding agreement between you and 6Ride and supplement the Terms of Service, Acceptable Use, and Safety policies.
                            Partners are independent contractors and must comply with all local laws (Nigeria, Cross River, and worldwide where operating).
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
