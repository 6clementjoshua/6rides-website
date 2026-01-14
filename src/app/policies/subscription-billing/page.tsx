// app/policies/subscription-billing/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

type TocItem = { id: string; label: string; note: string };
type GridItem = { head: string; body: string };
type PlanCard = { name: string; who: string; includes: string[]; notes?: string };
type FeeRow = { name: string; whatItIs: string; whenItApplies: string };
type PayoutRow = { topic: string; details: string };
type FailRow = { case: string; whatHappens: string; howToFix: string };

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
const BILLING_EMAIL = "billing@6rides.com";
const SUPPORT_EMAIL = "support@6rides.com";
const EMERGENCY_EMAIL = "emergency@6rides.com";

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

function Plan({ p }: { p: PlanCard }) {
    return (
        <div className="relative rounded-3xl border border-black/10 bg-white/[0.55] p-5 backdrop-blur">
            <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-18px_28px_rgba(0,0,0,0.06)]" />
            <div className="relative">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="text-sm font-semibold text-black/85">{p.name}</div>
                    <div className="text-xs font-semibold text-black/55">{p.who}</div>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-black/70">
                    {p.includes.map((b) => (
                        <li key={b} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/30" />
                            <span>{b}</span>
                        </li>
                    ))}
                </ul>
                {p.notes ? (
                    <div className="mt-4 rounded-2xl border border-black/10 bg-white/[0.50] p-3 text-xs text-black/60">{p.notes}</div>
                ) : null}
            </div>
        </div>
    );
}

function FeeTable({ rows }: { rows: FeeRow[] }) {
    return (
        <div className="mt-4 overflow-hidden rounded-3xl border border-black/10 bg-white/[0.55] backdrop-blur">
            <div className="relative overflow-x-auto">
                <table className="min-w-[980px] w-full text-left text-sm">
                    <thead className="bg-white/[0.55]">
                        <tr className="border-b border-black/10">
                            <th className="px-5 py-4 text-xs font-semibold text-black/70">Charge type</th>
                            <th className="px-5 py-4 text-xs font-semibold text-black/70">What it is</th>
                            <th className="px-5 py-4 text-xs font-semibold text-black/70">When it applies</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r) => (
                            <tr key={r.name} className="border-b border-black/10 last:border-b-0">
                                <td className="px-5 py-4 font-semibold text-black/80">{r.name}</td>
                                <td className="px-5 py-4 text-black/70">{r.whatItIs}</td>
                                <td className="px-5 py-4 text-black/70">{r.whenItApplies}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function MiniTable({
    title,
    rows,
}: {
    title: string;
    rows: Array<{ left: string; right: string }>;
}) {
    return (
        <div className="mt-4 overflow-hidden rounded-3xl border border-black/10 bg-white/[0.55] backdrop-blur">
            <div className="px-5 py-4 text-xs font-semibold text-black/70 border-b border-black/10 bg-white/[0.55]">{title}</div>
            <div className="divide-y divide-black/10">
                {rows.map((r) => (
                    <div key={r.left} className="grid gap-2 px-5 py-4 md:grid-cols-[260px_1fr]">
                        <div className="text-sm font-semibold text-black/80">{r.left}</div>
                        <div className="text-sm text-black/70">{r.right}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function SubscriptionBillingPage() {
    const { effectiveDate, lastUpdated } = usePolicyDates();
    const [mobileTocOpen, setMobileTocOpen] = useState(false);

    const toc: TocItem[] = useMemo(
        () => [
            { id: "overview", label: "1. Overview", note: "What this policy covers: subscriptions, per-use charges, corporate billing, and partner payouts." },
            { id: "subscriptions", label: "2. Subscription Plans", note: "What plans may include, including emergency ride coordination eligibility rules." },
            { id: "billing", label: "3. Billing & Charges", note: "How charges work (fare, fees, renewals, add-ons) and what you authorize." },
            { id: "renewals", label: "4. Auto-Renewals", note: "Recurring billing, cancellation timing, and access changes after cancellation." },
            { id: "corporate", label: "5. Corporate Accounts", note: "Enterprise invoicing, usage reports, billing admins, and contracts." },
            { id: "partners", label: "6. Partner Earnings & Payouts", note: "How partners get paid, adjustments, holds, and compliance checks." },
            { id: "taxes", label: "7. Taxes & Regulatory Fees", note: "VAT/levies and local regulatory fees across regions." },
            { id: "failed", label: "8. Failed Payments", note: "What happens when payments fail and how to restore access." },
            { id: "changes", label: "9. Changes to Pricing", note: "Price updates, notice, and how continued use is treated." },
        ],
        []
    );

    const planCards: PlanCard[] = useMemo(
        () => [
            {
                name: "Standard access",
                who: "All eligible users (non-subscription)",
                includes: [
                    "Pay-per-use rides and deliveries where available.",
                    "Standard support pathways and dispute handling.",
                    "Access to promotions where eligible and offered.",
                    "Safety reporting and platform protections (in-app records).",
                ],
                notes: "Standard access does not include emergency ride coordination unless you are an eligible member and subscribed to the emergency response feature.",
            },
            {
                name: "Membership benefits (6Clement Joshua ecosystem)",
                who: "Eligible members (where offered)",
                includes: [
                    "Member-only features where offered in-app.",
                    "Access to certain promotions/priority features where available.",
                    "Eligibility prerequisite for emergency ride coordination where required.",
                    "Identity/account requirements may be higher for member programs.",
                ],
                notes: "Membership eligibility is defined by the 6Ride program rules shown in-app and may vary by country/city.",
            },
            {
                name: "Emergency response subscription",
                who: "Eligible members + subscribed users",
                includes: [
                    "Access to emergency ride coordination where coverage exists.",
                    "Priority handling for urgent transport coordination (not medical care).",
                    "Emergency contact channel: emergency@6rides.com (non-life-threatening support).",
                    "Additional verification/limits to prevent misuse of emergency dispatch.",
                ],
                notes: "6Ride is not a hospital/ambulance. For life-threatening situations, contact local emergency services first.",
            },
            {
                name: "Business / professional plans (optional)",
                who: "Individuals or SMEs (where offered)",
                includes: [
                    "Receipts and billing tools suitable for business use.",
                    "Priority support where offered.",
                    "Optional multi-user/team features where available.",
                    "Policy-based compliance controls for business accounts.",
                ],
            },
            {
                name: "Corporate / enterprise programs",
                who: "Organizations (hotels, campuses, government, institutions)",
                includes: [
                    "Centralized invoicing and usage reports (by cost center where supported).",
                    "Admin controls and account governance.",
                    "Custom billing cycles and negotiated terms via written agreement.",
                    "Compliance-based operations and service levels (where contracted).",
                ],
                notes: "Enterprise services may be governed by separate written agreements and SLAs; those terms control if they conflict with this policy.",
            },
            {
                name: "Partner programs (drivers/fleets/couriers)",
                who: "Partners on the platform",
                includes: [
                    "Earnings based on completed trips/deliveries under partner rules.",
                    "Payout schedules subject to verification and compliance.",
                    "Adjustments for refunds, fraud prevention, or disputes where applicable.",
                    "Access to partner support and compliance reviews.",
                ],
            },
        ],
        []
    );

    const feeRows: FeeRow[] = useMemo(
        () => [
            {
                name: "Subscription fee (recurring)",
                whatItIs: "Recurring fee for a subscription plan (e.g., emergency response subscription).",
                whenItApplies: "On the billing cycle start, and automatically at renewal unless canceled prior to renewal.",
            },
            {
                name: "Trip fare",
                whatItIs: "Charge for a completed ride, including distance/time where applicable.",
                whenItApplies: "When a ride is taken; may be estimated before trip and finalized after completion.",
            },
            {
                name: "Service fee",
                whatItIs: "Supports platform operations, safety systems, support, and processing.",
                whenItApplies: "May apply per trip/delivery; varies by city/category and disclosed where possible.",
            },
            {
                name: "Waiting time / no-show / cancellation fees",
                whatItIs: "Fees designed to compensate partners for time and availability loss.",
                whenItApplies: "Late cancellations, extended waiting, or no-show situations (see Refund & Cancellation Policy).",
            },
            {
                name: "Tolls / parking / access charges",
                whatItIs: "Pass-through charges incurred to complete a trip or delivery.",
                whenItApplies: "If applicable in the route; some locations may require evidence/receipts.",
            },
            {
                name: "Delivery handling fee",
                whatItIs: "Delivery-specific coordination and logistics fee.",
                whenItApplies: "For food/goods delivery services where offered; may vary by merchant/partner program.",
            },
            {
                name: "Corporate invoice charges",
                whatItIs: "Aggregated charges billed to a corporate account.",
                whenItApplies: "According to a corporate billing cycle, statements, or written agreement terms.",
            },
            {
                name: "Processor/network fees (where applicable)",
                whatItIs: "Fees charged by banks, wallets, or payment networks (not controlled by 6Ride).",
                whenItApplies: "May appear depending on provider, method, and country; disclosed where possible.",
            },
        ],
        []
    );

    const corporateGrid: GridItem[] = useMemo(
        () => [
            { head: "Billing ownership", body: "Corporate accounts should assign billing admins to manage payment methods, invoices, and employee eligibility." },
            { head: "Usage reporting", body: "Where supported, we provide reports (trip counts, spend, routes, timestamps) consistent with privacy and local law." },
            { head: "Cost controls", body: "Programs may include caps, eligible hours, service categories, and approval workflows where offered." },
            { head: "Written agreements", body: "Enterprise pricing, SLAs, and special terms are governed by written enterprise agreements." },
        ],
        []
    );

    const payoutRows: PayoutRow[] = useMemo(
        () => [
            {
                topic: "Earnings calculation",
                details:
                    "Earnings may be based on base fare, time/distance, delivery fees, incentives, and adjustments. The partner view in-app (or partner dashboard) may show itemized details.",
            },
            {
                topic: "Payout schedule",
                details:
                    "Payouts are issued on schedules defined by local operations and may be delayed by verification, risk holds, or bank processing. Schedules may differ by country/city.",
            },
            {
                topic: "Adjustments and holds",
                details:
                    "We may apply adjustments for refunds, chargebacks, fraud prevention, pricing corrections, or dispute outcomes. Holds may apply where risk signals or compliance checks are pending.",
            },
            {
                topic: "Compliance requirements",
                details:
                    "Partners may be required to submit ID, license, vehicle documents, tax details, and bank details. Failure to maintain compliance may restrict payouts or access.",
            },
            {
                topic: "Negative balance scenarios",
                details:
                    "If refunds/chargebacks exceed earnings, a negative balance may occur. We may offset future earnings, pause payouts, or require settlement consistent with law.",
            },
        ],
        []
    );

    const failedRows: FailRow[] = useMemo(
        () => [
            {
                case: "Subscription renewal fails",
                whatHappens: "Your subscription may enter a grace period (if available) or become inactive, removing subscription benefits.",
                howToFix: "Update payment method in-app and retry. If your bank blocks the charge, contact your bank or use an alternative method.",
            },
            {
                case: "Payment reversed / chargeback opened",
                whatHappens: "Account features may be restricted while the dispute is investigated; outstanding balances may become due.",
                howToFix: "Contact support first with transaction ID and trip/order ID to resolve before escalating through your bank.",
            },
            {
                case: "Corporate invoice unpaid",
                whatHappens: "Corporate services may be paused and employee access may be restricted per contract terms.",
                howToFix: "Corporate billing admin should contact billing with invoice ID to arrange payment or dispute review.",
            },
            {
                case: "Partner payout fails",
                whatHappens: "Payout may return to sender or remain pending depending on bank rails.",
                howToFix: "Confirm bank details, name match, and required documents; then request re-issue via partner support.",
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

                            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Subscription & Billing Policy</h1>

                            <p className="mt-3 max-w-3xl text-sm leading-6 text-black/70">
                                This policy explains how recurring payments, usage-based charges, corporate billing, and partner payouts operate on the 6Ride platform globally. It covers rides,
                                deliveries (food/goods), member programs, and emergency ride coordination subscriptions.
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
                                <InlineTag>Global coverage, local pricing</InlineTag>
                            </div>

                            <Callout title="Important billing principle">
                                You are responsible for keeping your payment method current. If a subscription renewal fails, benefits may pause until payment is successfully collected.
                            </Callout>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <BevelButton href="/policies/terms">Terms</BevelButton>
                            <BevelButton href="/policies/refunds">Refunds</BevelButton>
                            <BevelButton href="/policies/privacy">Privacy</BevelButton>
                            <BevelButton href="/policies/contact">Contact</BevelButton>
                        </div>
                    </div>

                    {/* Quick cards */}
                    <div className="mt-7 grid gap-3 md:grid-cols-3">
                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Subscriptions</div>
                                <div className="mt-1 text-sm text-black/75">Recurring plans may unlock benefits, including emergency ride coordination (where eligible).</div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Usage-based charges</div>
                                <div className="mt-1 text-sm text-black/75">Trips and deliveries are charged per use, plus applicable fees and pass-through costs.</div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Partner payouts</div>
                                <div className="mt-1 text-sm text-black/75">Payouts are subject to verification, adjustments, and local compliance requirements.</div>
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
                                        For cancellations/refunds, read the Refund & Cancellation Policy. For emergency scope, read the Emergency Disclaimer.
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
                            title="1. Overview"
                            subtitle="This policy governs paid features and how money moves on 6Ride."
                        >
                            <p>
                                6Ride may offer subscription plans, usage-based billing, corporate invoicing, and partner earnings. By subscribing or using paid services, you agree to this policy,
                                the Terms of Service, and the Refund & Cancellation Policy.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Subscription vs per-use", body: "Some benefits are recurring subscriptions; trips/deliveries are typically per-use charges." },
                                    { head: "Global platform", body: "Pricing/fees vary by city/country and may be displayed in local currency." },
                                    { head: "Payment providers", body: "Payment processing may use third-party providers; bank posting times vary." },
                                    { head: "Fraud prevention", body: "We may apply verification and risk controls to protect users and partners." },
                                ]}
                            />

                            <Callout title="Billing support">
                                For billing issues, contact <a className="underline" href={`mailto:${BILLING_EMAIL}`}>{BILLING_EMAIL}</a>. For general account help, contact{" "}
                                <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="subscriptions"
                            eyebrow="Subscriptions"
                            title="2. Subscription Plans"
                            subtitle="Plans may differ by region and availability; the app controls the final offer shown to you."
                        >
                            <p>
                                Subscription plans may include ride discounts, priority support, premium features, or emergency ride coordination access where eligible. Benefits vary by region,
                                availability, legal requirements, and coverage.
                            </p>

                            <div className="mt-4 grid gap-3 lg:grid-cols-2">
                                {planCards.map((p) => (
                                    <Plan key={p.name} p={p} />
                                ))}
                            </div>

                            <Callout title="Emergency subscription clarity">
                                Emergency ride coordination is available only to eligible members and subscribed users of the emergency response feature. 6Ride is not a hospital/ambulance. For
                                life-threatening emergencies, contact local emergency services first. For emergency coordination support (non-life-threatening), contact{" "}
                                <a className="underline" href={`mailto:${EMERGENCY_EMAIL}`}>{EMERGENCY_EMAIL}</a>.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="billing"
                            eyebrow="Charges"
                            title="3. Billing & Charges"
                            subtitle="What you may be charged and what you authorize when you use paid services."
                        >
                            <p>
                                Your charges may include subscription fees, trip fares, service fees, and other pass-through costs. Where possible, we disclose estimated totals before you confirm
                                a booking; final totals may adjust due to time, distance, route changes, or verified additional costs.
                            </p>

                            <FeeTable rows={feeRows} />

                            <Callout title="Authorizations and pre-charges">
                                Some payment methods support pre-authorization holds (not final charges). Holds may appear temporarily and release depending on your bank or provider.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="renewals"
                            eyebrow="Auto-renewal"
                            title="4. Auto-Renewals"
                            subtitle="Subscriptions renew unless canceled before the next billing cycle."
                        >
                            <p>
                                Subscriptions renew automatically unless canceled before the next billing cycle. Canceling stops future charges but does not retroactively refund prior periods
                                except where required by law or explicitly stated. When you cancel, benefits generally remain active until the end of the current paid period, unless stated otherwise.
                            </p>

                            <MiniTable
                                title="Auto-renewal rules (practical)"
                                rows={[
                                    {
                                        left: "Cancel before renewal",
                                        right: "Stops the next billing cycle charge; access typically continues until the paid period ends.",
                                    },
                                    {
                                        left: "Cancel after renewal processed",
                                        right: "The new period is generally considered started; refunds are governed by the Refund Policy and local law.",
                                    },
                                    {
                                        left: "Plan changes (upgrade/downgrade)",
                                        right: "May take effect immediately or next cycle depending on the plan and billing rails; app will show the effect where possible.",
                                    },
                                    {
                                        left: "Free trials (if offered)",
                                        right: "Trials may convert to paid automatically unless canceled before trial ends; conditions are shown at sign-up.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="corporate"
                            eyebrow="Enterprise"
                            title="5. Corporate Accounts"
                            subtitle="Corporate billing is governed by program rules and written agreements."
                        >
                            <p>
                                Corporate clients may receive consolidated billing, invoicing, usage reports, and negotiated pricing under separate agreements. Corporate accounts should designate
                                administrators responsible for eligibility, payment methods, and policy compliance.
                            </p>

                            <BulletGrid items={corporateGrid} />

                            <Callout title="Corporate billing contact">
                                Corporate billing admins can contact{" "}
                                <a className="underline" href={`mailto:${BILLING_EMAIL}`}>{BILLING_EMAIL}</a>{" "}
                                with the organization name and (if available) invoice ID or account identifier.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="partners"
                            eyebrow="Partners"
                            title="6. Partner Earnings & Payouts"
                            subtitle="How partners are paid and when payouts can be held or adjusted."
                        >
                            <p>
                                Partner payouts are calculated based on completed services, fees, and adjustments. Payout schedules depend on verification, local payment rails, and regulatory
                                compliance. Partner terms and local operational rules may add additional requirements.
                            </p>

                            <MiniTable
                                title="Partner payouts and adjustments"
                                rows={payoutRows.map((r) => ({ left: r.topic, right: r.details }))}
                            />

                            <Callout title="Partner support note">
                                Partners should keep documents and banking details current. Missing compliance information can delay payouts.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="taxes"
                            eyebrow="Taxes"
                            title="7. Taxes & Regulatory Fees"
                            subtitle="Taxes and levies may be added as required by law."
                        >
                            <p>
                                Charges may include VAT, levies, road taxes, or transport-related regulatory fees as required by Nigerian law (including Cross River State) or international
                                jurisdictions where 6Ride operates. Where feasible, we display or itemize these charges in receipts or invoices.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Local rules", body: "Tax treatment varies by country/state/city; receipts may reflect local requirements." },
                                    { head: "Corporate invoicing", body: "Corporate invoices may include additional tax fields or compliance statements where required." },
                                    { head: "Partner obligations", body: "Partners may have independent tax obligations depending on jurisdiction and status." },
                                    { head: "Regulatory changes", body: "If laws change, we may update fees or invoicing formats to remain compliant." },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="failed"
                            eyebrow="Failures"
                            title="8. Failed Payments"
                            subtitle="Failed payments can pause subscriptions and restrict services until resolved."
                        >
                            <p>
                                Failed or reversed payments may result in service suspension or restricted access until outstanding balances are resolved. We may attempt to retry failed payments
                                as permitted by your payment provider and local law.
                            </p>

                            <MiniTable
                                title="Common failure scenarios"
                                rows={failedRows.map((r) => ({
                                    left: r.case,
                                    right: `${r.whatHappens} ${r.howToFix}`,
                                }))}
                            />

                            <Callout title="If you see an unknown charge">
                                Contact <a className="underline" href={`mailto:${BILLING_EMAIL}`}>{BILLING_EMAIL}</a> with the transaction ID and, if applicable, trip/order ID.
                                Do not share full card numbers by email.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="changes"
                            eyebrow="Pricing"
                            title="9. Changes to Pricing"
                            subtitle="We may update pricing and benefits with notice where feasible."
                        >
                            <p>
                                Pricing and subscription benefits may change with notice, where feasible. Some changes may occur due to regulatory fees, market conditions, partner availability,
                                or operational updates. Continued use after effective date constitutes acceptance.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Notice", body: "We may notify via app banners, email (where provided), or website updates for material changes." },
                                    { head: "Effective date", body: "Price changes generally apply from a stated date; existing paid periods are typically honored." },
                                    { head: "Plan modifications", body: "Benefits may be added/modified by region to remain safe, compliant, and sustainable." },
                                    { head: "Automation note", body: "Set NEXT_PUBLIC_POLICY_BUILD_DATE=YYYY-MM-DD in your deployment environment when you update this page." },
                                ]}
                            />

                            <Callout title="Related policies">
                                Refund treatment is governed by the Refund & Cancellation Policy. Safety-related misuse (fraud/chargeback abuse) is governed by Acceptable Use and Safety Guidelines.
                            </Callout>
                        </GlassCard>

                        <div className="mt-6 rounded-3xl border border-black/10 bg-white/[0.55] p-5 text-xs text-black/60 backdrop-blur">
                            This policy forms part of the 6Ride Terms of Service. For questions:{" "}
                            <a className="underline" href={`mailto:${BILLING_EMAIL}`}>{BILLING_EMAIL}</a>{" "}
                            (billing),{" "}
                            <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>{" "}
                            (support),{" "}
                            <a className="underline" href={`mailto:${EMERGENCY_EMAIL}`}>{EMERGENCY_EMAIL}</a>{" "}
                            (emergency coordination).
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
