// app/policies/refunds/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

type TocItem = { id: string; label: string; note: string };
type GridItem = { head: string; body: string };
type Scenario = { title: string; bullets: string[]; note?: string };
type TimelineRow = { label: string; meaning: string; typicalOutcome: string };
type FeeRow = { name: string; purpose: string; notes: string };

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

function ScenarioCard({ s }: { s: Scenario }) {
    return (
        <div className="relative rounded-3xl border border-black/10 bg-white/[0.55] p-5 backdrop-blur">
            <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-18px_28px_rgba(0,0,0,0.06)]" />
            <div className="relative">
                <div className="text-sm font-semibold text-black/85">{s.title}</div>
                <ul className="mt-3 space-y-2 text-sm text-black/70">
                    {s.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/30" />
                            <span>{b}</span>
                        </li>
                    ))}
                </ul>
                {s.note ? (
                    <div className="mt-4 rounded-2xl border border-black/10 bg-white/[0.50] p-3 text-xs text-black/60">{s.note}</div>
                ) : null}
            </div>
        </div>
    );
}

function TimelineTable({ rows }: { rows: TimelineRow[] }) {
    return (
        <div className="mt-4 overflow-hidden rounded-3xl border border-black/10 bg-white/[0.55] backdrop-blur">
            <div className="relative overflow-x-auto">
                <table className="min-w-[860px] w-full text-left text-sm">
                    <thead className="bg-white/[0.55]">
                        <tr className="border-b border-black/10">
                            <th className="px-5 py-4 text-xs font-semibold text-black/70">Timing bucket</th>
                            <th className="px-5 py-4 text-xs font-semibold text-black/70">What it means</th>
                            <th className="px-5 py-4 text-xs font-semibold text-black/70">Typical outcome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r) => (
                            <tr key={r.label} className="border-b border-black/10 last:border-b-0">
                                <td className="px-5 py-4 font-semibold text-black/80">{r.label}</td>
                                <td className="px-5 py-4 text-black/70">{r.meaning}</td>
                                <td className="px-5 py-4 text-black/70">{r.typicalOutcome}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function FeeTable({ rows }: { rows: FeeRow[] }) {
    return (
        <div className="mt-4 overflow-hidden rounded-3xl border border-black/10 bg-white/[0.55] backdrop-blur">
            <div className="relative overflow-x-auto">
                <table className="min-w-[920px] w-full text-left text-sm">
                    <thead className="bg-white/[0.55]">
                        <tr className="border-b border-black/10">
                            <th className="px-5 py-4 text-xs font-semibold text-black/70">Fee type</th>
                            <th className="px-5 py-4 text-xs font-semibold text-black/70">Purpose</th>
                            <th className="px-5 py-4 text-xs font-semibold text-black/70">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r) => (
                            <tr key={r.name} className="border-b border-black/10 last:border-b-0">
                                <td className="px-5 py-4 font-semibold text-black/80">{r.name}</td>
                                <td className="px-5 py-4 text-black/70">{r.purpose}</td>
                                <td className="px-5 py-4 text-black/70">{r.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function RefundCancellationPage() {
    const { effectiveDate, lastUpdated } = usePolicyDates();
    const [mobileTocOpen, setMobileTocOpen] = useState(false);

    const toc: TocItem[] = useMemo(
        () => [
            { id: "overview", label: "1. Policy Overview", note: "Fairness principles across rides, deliveries, enterprise, and emergency transport." },
            { id: "booking", label: "2. Booking & Charges", note: "How fares/fees are formed and when charges may occur." },
            { id: "rider-cancel", label: "3. Rider Cancellations", note: "When riders can cancel and when cancellation fees may apply." },
            { id: "driver-cancel", label: "4. Driver/Partner Cancellations", note: "What happens when a partner cancels and rider protections." },
            { id: "no-show", label: "5. No-Show Situations", note: "Waiting windows, no-show fees, and dispute handling." },
            { id: "food", label: "6. Food Delivery Orders", note: "Preparation stages, incorrect/damaged orders, and verification." },
            { id: "emergency", label: "7. Emergency Ride Coordination", note: "Membership/subscription coverage and non-refundable dispatch logic." },
            { id: "scheduled", label: "8. Scheduled & Corporate Trips", note: "Pre-booked and enterprise windows; contract-based terms." },
            { id: "refunds", label: "9. Refund Eligibility", note: "What qualifies, what does not, and evidence requirements." },
            { id: "method", label: "10. Refund Method & Timing", note: "Original payment method, timelines, and provider dependencies." },
            { id: "disputes", label: "11. Disputes & Chargebacks", note: "Dispute-first approach and consequences of misuse." },
            { id: "abuse", label: "12. Abuse of Policy", note: "Fraud patterns, repeated claims, and account enforcement." },
            { id: "changes", label: "13. Policy Changes", note: "Updates, effective dates, and notice practices." },
        ],
        []
    );

    const feeRows: FeeRow[] = useMemo(
        () => [
            {
                name: "Trip fare / base fare",
                purpose: "Payment for the completed portion of a ride or delivery.",
                notes: "Calculated by time/distance, service category, and local market conditions.",
            },
            {
                name: "Service fee",
                purpose: "Supports platform operations, safety systems, customer support, and payment processing.",
                notes: "May vary by city, category, and promotional programs; disclosed in-app where applicable.",
            },
            {
                name: "Cancellation fee",
                purpose: "Compensates partners for time and travel after accepting/heading to pickup.",
                notes: "Typically applies for late cancellations; timing windows may differ by region and category.",
            },
            {
                name: "Wait-time fee",
                purpose: "Compensates for extended waiting beyond the included wait window at pickup or drop-off.",
                notes: "Measured by time; may be waived if the delay is attributable to the partner.",
            },
            {
                name: "No-show fee",
                purpose: "Compensates partners when the rider/recipient is not available after the wait window.",
                notes: "Generally non-refundable unless strong evidence shows the partner did not arrive or follow instructions.",
            },
            {
                name: "Tolls / parking / access charges",
                purpose: "Pass-through costs incurred to complete a trip/delivery.",
                notes: "May require receipts or route evidence depending on local rules and program setup.",
            },
            {
                name: "Delivery handling fee",
                purpose: "Covers delivery-specific coordination and logistics.",
                notes: "Applies to food/goods services; may differ by merchant/partner arrangements.",
            },
        ],
        []
    );

    const timelineRows: TimelineRow[] = useMemo(
        () => [
            {
                label: "Immediately after booking (grace window)",
                meaning: "Rider cancels shortly after placing a request, before meaningful partner allocation.",
                typicalOutcome: "Often eligible for fee-free cancellation (where applicable).",
            },
            {
                label: "After partner acceptance",
                meaning: "A partner has accepted and may be traveling to pickup.",
                typicalOutcome: "Cancellation fee may apply depending on timing, distance, and category.",
            },
            {
                label: "Partner arrived / waiting window started",
                meaning: "Partner reached pickup and is waiting as allowed by the app.",
                typicalOutcome: "Cancellation/no-show fees more likely; refunds are limited.",
            },
            {
                label: "Trip started / delivery in progress",
                meaning: "Ride has begun or delivery is already being executed.",
                typicalOutcome: "Charges apply for completed portion; refunds depend on service failure evidence.",
            },
            {
                label: "Completed / closed trip",
                meaning: "Trip completed and closed in system.",
                typicalOutcome: "Refunds are exception-based (pricing errors, proven service failure, verified duplicate charges).",
            },
        ],
        []
    );

    const riderCancelScenarios: Scenario[] = useMemo(
        () => [
            {
                title: "Typical rider cancellation outcomes",
                bullets: [
                    "A grace window may exist for certain categories where cancellation is free or low-cost.",
                    "Late cancellations may incur a cancellation fee to compensate partners for time/fuel.",
                    "If a rider repeatedly cancels after partner acceptance, account restrictions may apply.",
                    "Riders must cancel through the app where possible to ensure accurate timestamps and records.",
                ],
                note: "Exact windows vary by city, service type, and demand. The app will display the applicable outcome when possible.",
            },
            {
                title: "When rider cancellation fees may be waived",
                bullets: [
                    "Partner did not move toward pickup within a reasonable timeframe (where telemetry supports it).",
                    "Vehicle mismatch or identity mismatch that the rider reports promptly.",
                    "Safety concern reasonably supported by trip context (e.g., threatening messages).",
                    "System error that prevented normal trip start or proper cancellation workflow.",
                ],
            },
        ],
        []
    );

    const partnerCancelScenarios: Scenario[] = useMemo(
        () => [
            {
                title: "If a partner cancels after acceptance",
                bullets: [
                    "We may attempt to reassign another partner automatically (subject to availability).",
                    "If no replacement is found, you may receive an automatic adjustment or refund for any pre-authorized amount.",
                    "Repeated partner cancellations can result in partner enforcement (warnings, restrictions, or removal).",
                ],
            },
            {
                title: "If a partner cannot complete a trip",
                bullets: [
                    "If a trip ends early due to partner fault, adjustments may apply based on evidence and trip logs.",
                    "If a trip ends for safety reasons, we prioritize safety outcomes and evaluate fees fairly.",
                    "If a trip cannot start due to vehicle breakdown, rebooking/refund outcomes may apply.",
                ],
            },
        ],
        []
    );

    const foodScenarios: Scenario[] = useMemo(
        () => [
            {
                title: "Food delivery – preparation stage logic",
                bullets: [
                    "Once preparation has begun, orders are typically not cancelable or refundable because costs have been incurred.",
                    "If an order is canceled before preparation starts, a refund may be possible depending on merchant flow and timing.",
                    "Delivery fees may be non-refundable once a courier is dispatched, except in proven service failure cases.",
                ],
                note: "If you have evidence (photos, order details, timestamps), submit it through support to speed up review.",
            },
            {
                title: "When refunds may be considered for food orders",
                bullets: [
                    "Undelivered orders (no delivery confirmation and no resolution).",
                    "Wrong items delivered or missing items (verified against order details).",
                    "Damaged items caused by courier handling (evidence required where possible).",
                    "Extreme delays attributable to platform/partner failure (evaluated case-by-case).",
                ],
            },
        ],
        []
    );

    const emergencyScenarios: Scenario[] = useMemo(
        () => [
            {
                title: "Emergency ride coordination is membership/subscription-based",
                bullets: [
                    "Emergency ride coordination is available only to eligible members and subscribed users of the emergency response feature.",
                    "6Ride is not a hospital, ambulance service, or medical provider; the service is transport coordination only.",
                    "Because dispatch allocates scarce resources quickly, once dispatched, emergency trips are generally non-refundable.",
                ],
                note: "If the failure is directly attributable to 6Ride (e.g., dispatch error, system failure), we may issue an adjustment or credit.",
            },
            {
                title: "Emergency refunds (exception-based)",
                bullets: [
                    "Duplicate charge or payment provider error verified by transaction IDs.",
                    "Dispatch confirmed but no partner was assigned within a reasonable time due to platform fault (not general scarcity).",
                    "Trip canceled by 6Ride due to verified system issue or compliance requirement.",
                    "Unauthorized emergency feature use detected (account compromise) after verification.",
                ],
            },
        ],
        []
    );

    const eligibilityGrid: GridItem[] = useMemo(
        () => [
            {
                head: "Typically eligible (examples)",
                body:
                    "Duplicate charges, proven billing errors, trip not delivered as promised due to platform/partner fault, undelivered food orders with evidence, or verified system issues.",
            },
            {
                head: "Typically not eligible (examples)",
                body:
                    "Change of mind after dispatch, no-show after wait window, incorrect destination entered by user, dissatisfaction without objective service failure, or late cancellation after partner arrival.",
            },
            {
                head: "Evidence we may request",
                body:
                    "Trip ID, screenshots/receipts, photos (damaged items), timestamps, chat logs, and in-app telemetry indicators (arrival/wait/start/route).",
            },
            {
                head: "Case-by-case fairness",
                body:
                    "We evaluate using the record trail (app logs + partner telemetry + communications). Outcomes may include refund, partial refund, credit, or denial.",
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
                                <span>6Ride Billing</span>
                            </div>

                            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Refund & Cancellation Policy</h1>

                            <p className="mt-3 max-w-3xl text-sm leading-6 text-black/70">
                                This Refund & Cancellation Policy explains how cancellations, refunds, fees, and adjustments are handled on the 6Ride platform.
                                It applies to ride bookings, food delivery, emergency ride coordination, scheduled trips, corporate accounts, and partner services worldwide.
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2 text-xs text-black/55">
                                <span className="rounded-full border border-black/10 bg-white/[0.55] px-3 py-1 text-xs font-semibold text-black/65 backdrop-blur">
                                    Effective: <span className="text-black/75">{formatDate(effectiveDate)}</span>
                                </span>
                                <span className="rounded-full border border-black/10 bg-white/[0.55] px-3 py-1 text-xs font-semibold text-black/65 backdrop-blur">
                                    Last updated: <span className="text-black/75">{formatDate(lastUpdated)}</span>
                                </span>
                                <span className="rounded-full border border-black/10 bg-white/[0.55] px-3 py-1 text-xs font-semibold text-black/65 backdrop-blur">
                                    HQ: <span className="text-black/75">{HQ_LOCATION}</span>
                                </span>
                                <InlineTag>Case-by-case fairness</InlineTag>
                            </div>

                            <Callout title="Core principle">
                                We aim to be fair to riders while protecting drivers/partners from loss due to late cancellations, no-shows, fraud, and abuse. The app may show the expected outcome
                                before you confirm cancellation.
                            </Callout>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <BevelButton href="/policies/terms">Terms</BevelButton>
                            <BevelButton href="/policies/acceptable-use">Acceptable Use</BevelButton>
                            <BevelButton href="/policies/safety">Safety</BevelButton>
                            <BevelButton href="/policies/contact">Contact</BevelButton>
                        </div>
                    </div>

                    {/* quick signal cards */}
                    <div className="mt-7 grid gap-3 md:grid-cols-3">
                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Timing matters</div>
                                <div className="mt-1 text-sm text-black/75">Outcomes depend on whether a partner accepted, arrived, or started service.</div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Evidence-based review</div>
                                <div className="mt-1 text-sm text-black/75">We use trip IDs, receipts, photos, and app logs to resolve disputes fairly.</div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Emergency dispatch logic</div>
                                <div className="mt-1 text-sm text-black/75">Emergency ride coordination is usually non-refundable once dispatched.</div>
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
                                        This policy applies globally. Exact fees/windows may vary by city, service category, and local law; in-app disclosures control when shown.
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
                            eyebrow="Overview"
                            title="1. Policy Overview"
                            subtitle="Fairness, integrity, and clear outcomes across rides, deliveries, emergency transport, and enterprise."
                        >
                            <p>
                                6Ride aims to be fair to riders while protecting drivers, partners, and the platform from misuse. Refunds and cancellation outcomes are evaluated based on timing,
                                service type, and the circumstances surrounding the trip.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Global policy, local implementation", body: "This policy applies worldwide, but fees/windows can vary by city and category to meet local realities." },
                                    { head: "Evidence-based", body: "We use trip logs, receipts, timestamps, and in-app telemetry to review disputes." },
                                    { head: "Partner fairness", body: "Late cancellations and no-shows create real costs; some fees are designed to compensate partners." },
                                    { head: "Anti-abuse enforcement", body: "False claims and chargeback abuse may lead to restrictions or termination." },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="booking"
                            eyebrow="Charges"
                            title="2. Booking & Charges"
                            subtitle="What you may be charged and why."
                        >
                            <p>
                                When a booking is confirmed, applicable charges may include fare, service fees, waiting time, tolls/parking, or delivery handling fees. Charges may vary by city,
                                service type, and demand conditions.
                            </p>

                            <FeeTable rows={feeRows} />

                            <Callout title="Dynamic pricing notice">
                                Some categories may include demand-based pricing or route-based adjustments where permitted by law and disclosed in-app.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="rider-cancel"
                            eyebrow="Rider"
                            title="3. Rider Cancellations"
                            subtitle="Cancel early when possible; outcomes depend on timing and partner allocation."
                        >
                            <TimelineTable rows={timelineRows} />

                            <div className="mt-4 grid gap-3 lg:grid-cols-2">
                                {riderCancelScenarios.map((s) => (
                                    <ScenarioCard key={s.title} s={s} />
                                ))}
                            </div>

                            <Callout title="Best practice">
                                If you no longer need a trip, cancel as soon as possible inside the app. Early cancellation reduces partner costs and improves the likelihood of fee-free outcomes.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="driver-cancel"
                            eyebrow="Partner"
                            title="4. Driver or Partner Cancellations"
                            subtitle="We protect riders while enforcing reliability for partners."
                        >
                            <p>
                                If a driver or partner cancels after accepting a trip, riders may be eligible for a full refund, a credit, or automatic rebooking depending on availability,
                                pre-authorization status, and local payment rails.
                            </p>

                            <div className="mt-4 grid gap-3 lg:grid-cols-2">
                                {partnerCancelScenarios.map((s) => (
                                    <ScenarioCard key={s.title} s={s} />
                                ))}
                            </div>

                            <Callout title="Reliability enforcement">
                                Partners who repeatedly cancel may receive warnings, restrictions, or termination under the Partner Terms.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="no-show"
                            eyebrow="No-show"
                            title="5. No-Show Situations"
                            subtitle="If the rider/recipient is not available after the wait window, a fee may apply."
                        >
                            <p>
                                If a rider fails to appear within the allowed waiting period, the trip may be marked as a no-show and a fee may apply. No-show fees are generally non-refundable
                                because they compensate for time and lost earning opportunities.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Wait window", body: "A wait window may apply at pickup (and sometimes at drop-off). The app may show when wait starts." },
                                    { head: "No-show confirmation", body: "We may rely on partner arrival telemetry and communications attempts to validate no-show outcomes." },
                                    { head: "Exceptions", body: "If strong evidence shows partner did not arrive or failed to follow instructions, we may review for adjustment." },
                                    { head: "Repeated no-shows", body: "Repeated no-show behavior can trigger account restrictions." },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="food"
                            eyebrow="Delivery"
                            title="6. Food Delivery Orders"
                            subtitle="Preparation stage matters; refunds are exception-based with verification."
                        >
                            <p>
                                Food orders are typically non-refundable once preparation has begun. Refunds may be considered for incorrect, damaged, or undelivered orders, subject to verification.
                            </p>

                            <div className="mt-4 grid gap-3 lg:grid-cols-2">
                                {foodScenarios.map((s) => (
                                    <ScenarioCard key={s.title} s={s} />
                                ))}
                            </div>

                            <Callout title="Evidence speeds resolution">
                                Provide order number, photos (where relevant), delivery notes, and timestamps. Missing evidence may delay or limit outcomes.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="emergency"
                            eyebrow="Emergency"
                            title="7. Emergency Ride Coordination"
                            subtitle="Emergency ride coordination is membership/subscription-based and generally non-refundable after dispatch."
                        >
                            <p>
                                Emergency ride coordination involves immediate resource allocation. Once dispatched, emergency trips are generally non-refundable unless a failure is directly
                                attributable to 6Ride. Emergency ride coordination is transport coordination only and does not include medical treatment.
                            </p>

                            <div className="mt-4 grid gap-3 lg:grid-cols-2">
                                {emergencyScenarios.map((s) => (
                                    <ScenarioCard key={s.title} s={s} />
                                ))}
                            </div>

                            <Callout title="If it is life-threatening">
                                Contact local emergency services immediately. 6Ride emergency coordination is not a replacement for emergency responders.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="scheduled"
                            eyebrow="Scheduled"
                            title="8. Scheduled & Corporate Trips"
                            subtitle="Scheduled and enterprise bookings may have stricter windows and contract-based terms."
                        >
                            <p>
                                Scheduled bookings and corporate/enterprise programs may include specific cancellation windows, minimum notice requirements, or service-level arrangements. Late
                                cancellations may result in partial or full charges based on the agreement or in-app disclosures.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Advance notice", body: "Some scheduled programs require cancellation within a set window before pickup time." },
                                    { head: "Resource allocation", body: "Partners may reserve vehicles/time blocks; late changes can create losses." },
                                    { head: "Enterprise invoicing", body: "Enterprise refunds may be applied as invoice adjustments under enterprise terms." },
                                    { head: "Local compliance", body: "Corporate travel may be governed by local procurement and compliance requirements." },
                                ]}
                            />

                            <Callout title="Enterprise terms control">
                                If an enterprise agreement conflicts with this policy, the enterprise agreement governs for that account.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="refunds"
                            eyebrow="Eligibility"
                            title="9. Refund Eligibility"
                            subtitle="Refunds are not guaranteed; eligibility depends on evidence and service outcome."
                        >
                            <p>
                                Refunds may be granted where service was not delivered as promised, subject to review. Outcomes may include a full refund, partial refund, credit, adjustment, or denial.
                            </p>

                            <BulletGrid items={eligibilityGrid} />

                            <Callout title="Case-by-case review">
                                We consider the service record trail (trip logs, partner telemetry, communications, receipts) to reach a fair outcome.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="method"
                            eyebrow="Processing"
                            title="10. Refund Method & Timing"
                            subtitle="Refunds typically return to the original payment method; timing depends on providers."
                        >
                            <p>
                                Approved refunds are processed to the original payment method whenever possible. Processing times depend on banks, card networks, and payment providers and may take
                                several business days. Some providers may show a “pending” status before completion.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Original method", body: "Refunds usually return to the card/wallet/bank used for payment." },
                                    { head: "Provider timing", body: "Banks and payment rails control posting times; weekends/holidays may delay posting." },
                                    { head: "Partial refunds", body: "Some cases require partial refunds (e.g., early trip end, partial delivery issues)." },
                                    { head: "Credits", body: "In limited cases, we may issue an in-app credit where permitted and disclosed." },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="disputes"
                            eyebrow="Disputes"
                            title="11. Disputes & Chargebacks"
                            subtitle="Contact 6Ride first; misuse of chargebacks may result in suspension."
                        >
                            <p>
                                Users are encouraged to contact 6Ride before initiating chargebacks. Chargebacks can take time and may restrict account use while investigated. If a chargeback is
                                filed, we may submit relevant evidence (trip logs, receipts, telemetry) to the payment provider.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Dispute-first approach", body: "Raise issues via support so we can resolve quickly and fairly." },
                                    { head: "Chargeback evidence", body: "We may provide trip details and service logs to processors for investigation." },
                                    { head: "Account impact", body: "Open chargebacks may limit certain features until resolved." },
                                    { head: "Fraud signals", body: "Chargeback abuse or false claims may trigger enforcement under Acceptable Use." },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="abuse"
                            eyebrow="Abuse"
                            title="12. Abuse of Policy"
                            subtitle="False claims and manipulation harm the marketplace and are enforceable."
                        >
                            <p>
                                Repeated refund requests, false claims, or manipulation of cancellation systems may lead to account restrictions, verification requirements, denial of future refunds,
                                or termination. Partner collusion (fake trips, refund farming) is also prohibited and enforceable.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Examples of abuse", body: "Fake no-show claims, repeated late cancellations, duplicate account use, or fabricated damage reports." },
                                    { head: "Enforcement actions", body: "Warnings, denial of requests, required verification, suspension, and termination." },
                                    { head: "Partner enforcement", body: "Partners engaging in manipulation may be removed and may forfeit earnings where permitted." },
                                    { head: "Legal escalation", body: "Where required, we may cooperate with lawful authorities for serious fraud." },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="changes"
                            eyebrow="Updates"
                            title="13. Policy Changes"
                            subtitle="We update the last-updated date when this document changes."
                        >
                            <p>
                                This Refund & Cancellation Policy may be updated periodically. Continued use of 6Ride constitutes acceptance of the updated policy. When we update this page, we
                                update the “Last updated” date at the top.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Material changes", body: "We may provide additional notice through the app or website where feasible." },
                                    { head: "Automation note", body: "Set NEXT_PUBLIC_POLICY_BUILD_DATE=YYYY-MM-DD in your deployment environment when you update this page." },
                                ]}
                            />
                        </GlassCard>

                        <div className="mt-6 rounded-3xl border border-black/10 bg-white/[0.55] p-5 text-xs text-black/60 backdrop-blur">
                            This policy forms part of the 6Ride Terms of Service. In the event of conflict for enterprise/corporate accounts, the applicable written enterprise agreement controls.
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
