// app/policies/privacy/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

type TocItem = { id: string; label: string; note: string };
type GridItem = { head: string; body: string };
type DataTypeRow = { title: string; bullets: string[]; foot?: string };
type RightsRow = { right: string; meaning: string; how: string };
type SecurityRow = { title: string; body: string };

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

function PillList({ items }: { items: string[] }) {
    return (
        <div className="mt-3 flex flex-wrap gap-2">
            {items.map((t) => (
                <span
                    key={t}
                    className="rounded-full border border-black/10 bg-white/[0.55] px-3 py-1 text-xs font-semibold text-black/65 backdrop-blur"
                >
                    {t}
                </span>
            ))}
        </div>
    );
}

function DataTypeCard({ row }: { row: DataTypeRow }) {
    return (
        <div className="relative rounded-3xl border border-black/10 bg-white/[0.55] p-5 backdrop-blur">
            <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-18px_28px_rgba(0,0,0,0.06)]" />
            <div className="relative">
                <div className="text-sm font-semibold text-black/85">{row.title}</div>
                <ul className="mt-3 space-y-2 text-sm text-black/70">
                    {row.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/30" />
                            <span>{b}</span>
                        </li>
                    ))}
                </ul>
                {row.foot ? (
                    <div className="mt-4 rounded-2xl border border-black/10 bg-white/[0.50] p-3 text-xs text-black/60">
                        {row.foot}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

function RightsTable({ rows }: { rows: RightsRow[] }) {
    return (
        <div className="mt-4 overflow-hidden rounded-3xl border border-black/10 bg-white/[0.55] backdrop-blur">
            <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-18px_28px_rgba(0,0,0,0.06)]" />
            <div className="relative overflow-x-auto">
                <table className="min-w-[820px] w-full text-left text-sm">
                    <thead className="bg-white/[0.55]">
                        <tr className="border-b border-black/10">
                            <th className="px-5 py-4 text-xs font-semibold text-black/70">Right</th>
                            <th className="px-5 py-4 text-xs font-semibold text-black/70">What it means</th>
                            <th className="px-5 py-4 text-xs font-semibold text-black/70">How to exercise it</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r) => (
                            <tr key={r.right} className="border-b border-black/10 last:border-b-0">
                                <td className="px-5 py-4 font-semibold text-black/80">{r.right}</td>
                                <td className="px-5 py-4 text-black/70">{r.meaning}</td>
                                <td className="px-5 py-4 text-black/70">{r.how}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function SecurityGrid({ rows }: { rows: SecurityRow[] }) {
    return (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
            {rows.map((r) => (
                <div key={r.title} className="relative rounded-3xl border border-black/10 bg-white/[0.55] p-5 backdrop-blur">
                    <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-18px_28px_rgba(0,0,0,0.06)]" />
                    <div className="relative">
                        <div className="text-sm font-semibold text-black/85">{r.title}</div>
                        <div className="mt-2 text-sm text-black/70">{r.body}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function EmailChip({ email, label }: { email: string; label: string }) {
    const [copied, setCopied] = useState(false);

    return (
        <div className="mt-3 flex flex-wrap items-center gap-2">
            <a
                href={`mailto:${email}`}
                className={cx(
                    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-4 py-2 text-xs font-semibold",
                    "border border-black/10 bg-white/[0.58] backdrop-blur-md",
                    "shadow-[0_10px_25px_-18px_rgba(0,0,0,0.35)]",
                    "transition-transform duration-200 hover:-translate-y-[1px] active:scale-[0.985]"
                )}
            >
                <span className="pointer-events-none absolute inset-[1px] rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                <span className="relative text-black/80 group-hover:text-black">
                    {label}: <span className="font-semibold text-black/90">{email}</span>
                </span>
            </a>

            <button
                type="button"
                onClick={async () => {
                    try {
                        await navigator.clipboard.writeText(email);
                        setCopied(true);
                        window.setTimeout(() => setCopied(false), 1200);
                    } catch {
                        // silent
                    }
                }}
                className={cx(
                    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-3 py-2 text-[11px] font-semibold",
                    "border border-black/10 bg-white/[0.55] backdrop-blur",
                    "shadow-[0_10px_25px_-20px_rgba(0,0,0,0.35)]",
                    "transition-transform duration-200 hover:-translate-y-[1px] active:scale-[0.985]"
                )}
                aria-label="Copy email"
            >
                <span className="pointer-events-none absolute inset-[1px] rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                <span className="relative text-black/75">{copied ? "Copied" : "Copy"}</span>
            </button>
        </div>
    );
}

export default function PrivacyPage() {
    const { effectiveDate, lastUpdated } = usePolicyDates();
    const [mobileTocOpen, setMobileTocOpen] = useState(false);

    const toc: TocItem[] = useMemo(
        () => [
            { id: "scope", label: "1. Scope & Who We Are", note: "Where this policy applies and what services it covers." },
            { id: "data-we-collect", label: "2. Information We Collect", note: "Data you provide, data we collect automatically, and verification data." },
            { id: "location", label: "3. Location Data", note: "Precise/background/IP location and how permissions affect features." },
            { id: "how-we-use", label: "4. How We Use Information", note: "Service delivery, safety, fraud prevention, and communications." },
            { id: "legal-bases", label: "5. Legal Bases (NDPR + Global)", note: "Contract, legitimate interests, consent, and legal obligations." },
            { id: "sharing", label: "6. Sharing & Disclosure", note: "When we share data and with whom (drivers, partners, vendors, authorities)." },
            { id: "drivers-partners", label: "7. Drivers, Riders & Partners", note: "Trip coordination sharing and partner access restrictions." },
            { id: "payments", label: "8. Payments & Financial Data", note: "How payment data is handled and what we store." },
            { id: "minors", label: "9. Minors, Students & Guardians", note: "Safeguarding approach and guardian/institution arrangements." },
            { id: "cookies", label: "10. Cookies & Analytics", note: "Website cookies, analytics, and consent where required." },
            { id: "retention", label: "11. Data Retention", note: "Retention principles, why we keep data, and typical categories." },
            { id: "security", label: "12. Security", note: "Safeguards, incident handling, and user-side security tips." },
            { id: "rights", label: "13. Your Rights & Choices", note: "Access/correct/delete/object and how to exercise rights." },
            { id: "international", label: "14. International Transfers", note: "Cross-border processing and protections." },
            { id: "changes", label: "15. Changes to This Policy", note: "Updates and notice practices." },
            { id: "contact", label: "16. Contact & Complaints", note: "How to reach us and escalate concerns." },
        ],
        []
    );

    const dataCards: DataTypeRow[] = useMemo(
        () => [
            {
                title: "Information you provide",
                bullets: [
                    "Name, phone number, email address, and account credentials.",
                    "Profile details (photo, preferences, language settings, accessibility needs).",
                    "Trip requests, destinations, schedules, delivery instructions, and notes.",
                    "Support messages, emails, calls, and communications with 6Ride.",
                    "Identity verification info where required (e.g., ID documents, selfie/verification checks).",
                ],
                foot: "We request only what is necessary to create accounts, coordinate services, and protect safety and platform integrity.",
            },
            {
                title: "Information collected automatically",
                bullets: [
                    "Device identifiers (device model, OS, app version), browser type (web), and IP address.",
                    "Log data, diagnostics, crash reports, performance data, and security telemetry.",
                    "Usage data (features used, pages viewed, clicks, session events), and interaction metadata.",
                    "Approximate location inferred from IP for web security and fraud prevention.",
                ],
                foot: "We use logs and diagnostics to keep the platform reliable and to detect abuse.",
            },
            {
                title: "Trip, delivery & service data",
                bullets: [
                    "Pickup, destination, route estimates, timestamps, and trip status updates.",
                    "Driver/partner identifiers (partner ID, vehicle type, trip assignment events).",
                    "Delivery data such as sender/recipient details, drop-off confirmation, and item category (where provided).",
                    "In-app chat/support history related to a specific trip or case.",
                ],
                foot: "Trip data supports safety tools, dispute resolution, payouts, and compliance obligations.",
            },
            {
                title: "Sensitive or higher-risk data (handled carefully)",
                bullets: [
                    "Precise location during active trips or deliveries (GPS) when permission is enabled.",
                    "Emergency ride context (e.g., urgent transport need) where you disclose it.",
                    "Safety reports and incident details that may involve sensitive circumstances.",
                    "Verification attributes used to prevent fraud and protect users.",
                ],
                foot: "We apply additional controls for access, retention, and disclosure where appropriate.",
            },
        ],
        []
    );

    const useCases: GridItem[] = useMemo(
        () => [
            { head: "Service delivery", body: "Operate rides, deliveries, enterprise programs, and customer support; confirm pickup/drop-off and trip completion." },
            { head: "Safety and integrity", body: "Enable incident response, reduce harassment, detect fraud, and support safety investigations." },
            { head: "Payments and accounting", body: "Process payments, refunds, receipts, chargebacks, and required tax/compliance bookkeeping." },
            { head: "Platform improvement", body: "Measure performance, fix bugs, improve routing, and evaluate new product features responsibly." },
            { head: "Communication", body: "Send essential service messages, receipts, verification prompts, policy updates, and security alerts." },
            { head: "Legal and compliance", body: "Comply with lawful requests, enforce policies, and meet regulatory obligations where applicable." },
        ],
        []
    );

    const sharingItems: GridItem[] = useMemo(
        () => [
            {
                head: "Drivers, couriers & partners (coordination only)",
                body:
                    "We share limited data needed to complete a trip/delivery (e.g., first name, pickup, destination, limited contact). Partners must not use this data for any other purpose.",
            },
            {
                head: "Payment providers",
                body:
                    "Payments are processed by approved providers. We receive transaction confirmations and may store receipts and billing history, but we do not store full card details when processed by third parties.",
            },
            {
                head: "Service providers (vendors)",
                body:
                    "We may use vendors for hosting, mapping, analytics, fraud prevention, customer support tools, and communications—under contractual privacy and security obligations.",
            },
            {
                head: "Authorities and legal process",
                body:
                    "We may disclose data where required by valid legal process, to comply with law, or to address credible imminent harm, consistent with applicable law and our policies.",
            },
            {
                head: "Business transfers",
                body:
                    "If 6Ride undergoes a merger, acquisition, or asset transfer, data may be transferred subject to confidentiality protections and notice where required.",
            },
            {
                head: "With your direction",
                body:
                    "We may share information when you ask us to do so (e.g., enterprise admin setup, authorized guardian or institution arrangements).",
            },
        ],
        []
    );

    const rightsRows: RightsRow[] = useMemo(
        () => [
            { right: "Access", meaning: "Request a copy of personal data we hold about you.", how: "Submit a request via Contact; we will verify identity first." },
            { right: "Correction", meaning: "Fix inaccurate or incomplete data.", how: "Update in-app settings where available or contact support." },
            { right: "Deletion", meaning: "Request deletion of certain data, subject to legal and safety retention needs.", how: "Request via Contact; some records must be retained for compliance/safety." },
            { right: "Objection", meaning: "Object to processing based on legitimate interests in certain circumstances.", how: "Explain your objection via Contact; we assess per applicable law." },
            { right: "Restriction", meaning: "Request that we limit processing in specific cases (e.g., dispute).", how: "Contact support; we may restrict processing while resolving." },
            { right: "Portability", meaning: "Receive certain data in a portable format where applicable.", how: "Request via Contact; scope depends on law and data type." },
            { right: "Withdraw consent", meaning: "Withdraw consent where processing is based on consent (e.g., location permission).", how: "Use device settings and in-app controls where available." },
        ],
        []
    );

    const securityRows: SecurityRow[] = useMemo(
        () => [
            { title: "Access controls", body: "Role-based access, least-privilege principles, and audit-style monitoring for sensitive systems where feasible." },
            { title: "Data minimization", body: "We aim to collect only what is necessary for service delivery, safety, compliance, and fraud prevention." },
            { title: "Encryption & transport security", body: "We use industry-standard encryption in transit and secure storage practices where applicable." },
            { title: "Incident response", body: "We investigate suspected security incidents, may notify users where required, and take remediation measures." },
            { title: "User-side security", body: "Use strong passwords, keep your device updated, and never share verification codes or account credentials." },
            { title: "Partner restrictions", body: "Partners may only use user data to complete trips/deliveries; misuse can lead to termination and legal action." },
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
                                <span>6Ride Privacy</span>
                            </div>

                            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Privacy Policy</h1>

                            <p className="mt-3 max-w-3xl text-sm leading-6 text-black/70">
                                This Privacy Policy explains how 6Ride collects, uses, shares, and protects personal information when you use our website, apps, and services (ride coordination,
                                chauffeur services, partner vehicles, food delivery, emergency ride coordination, enterprise programs, and related mobility services). We do not sell personal
                                information.
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
                                <InlineTag>NDPR + global standards</InlineTag>
                            </div>

                            <PillList
                                items={[
                                    "We do not sell your data",
                                    "We minimize collection",
                                    "Safety and fraud prevention",
                                    "Global operations supported",
                                ]}
                            />

                            <EmailChip email="privacy@6rides.com" label="Privacy" />
                            <EmailChip email="support@6rides.com" label="Support" />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <BevelButton href="/policies/terms">Terms</BevelButton>
                            <BevelButton href="/policies/acceptable-use">Acceptable Use</BevelButton>
                            <BevelButton href="/policies/subscription-billing">Billing</BevelButton>
                            <BevelButton href="/policies/contact">Contact</BevelButton>
                        </div>
                    </div>

                    {/* quick privacy signal cards */}
                    <div className="mt-7 grid gap-3 md:grid-cols-3">
                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Location used responsibly</div>
                                <div className="mt-1 text-sm text-black/75">
                                    Location powers dispatch, safety, fraud prevention, and navigation—controlled by device permissions.
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Partners get limited data</div>
                                <div className="mt-1 text-sm text-black/75">
                                    Drivers and couriers receive only what they need to complete your trip—misuse is prohibited and enforceable.
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Rights and choices</div>
                                <div className="mt-1 text-sm text-black/75">
                                    You can request access, correction, deletion, and more—subject to lawful retention needs.
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
                                        We follow NDPR principles and apply global privacy practices across regions where 6Ride operates.
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
                            eyebrow="Scope"
                            title="1. Scope & Who We Are"
                            subtitle="This policy applies wherever 6Ride services are available, including Nigeria (Cross River) and global regions."
                        >
                            <p>
                                This Policy applies to 6Ride services and platforms, including our website and mobile applications. 6Ride operates in Nigeria (including Cross River State and
                                other cities) and may provide services internationally. Where local laws require additional disclosures, those disclosures apply to users in those regions and
                                form part of this Policy.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Services covered", body: "Passenger rides, chauffeur and partner vehicles, delivery (food/goods), enterprise programs, and emergency ride coordination." },
                                    { head: "Users covered", body: "Riders, drivers/partners, enterprise administrators, delivery senders/recipients, and website visitors." },
                                    { head: "Important note", body: "Emergency support is transport coordination only; we are not a hospital or ambulance provider." },
                                    { head: "HQ reference", body: `Administrative headquarters: ${HQ_LOCATION}. Operations may be distributed globally.` },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="data-we-collect"
                            eyebrow="Collection"
                            title="2. Information We Collect"
                            subtitle="We collect data to provide services, ensure safety, prevent fraud, and comply with law—while minimizing unnecessary collection."
                        >
                            <div className="mt-2 grid gap-3 lg:grid-cols-2">
                                {dataCards.map((r) => (
                                    <DataTypeCard key={r.title} row={r} />
                                ))}
                            </div>

                            <Callout title="Data minimization principle">
                                We aim to collect only what is necessary for service delivery, safety, fraud prevention, dispute resolution, and legal compliance.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="location"
                            eyebrow="Location"
                            title="3. Location Data"
                            subtitle="Location powers dispatch, navigation, trip verification, fraud prevention, and safety features."
                        >
                            <p>
                                Location data is essential for ride coordination, dispatch, navigation, safety checks, fraud prevention, and trip verification. Depending on your device settings
                                and service type, we may collect:
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Precise location (GPS)",
                                        body:
                                            "Used during active trips/deliveries for pickup, routing, and safety features. This depends on device permissions.",
                                    },
                                    {
                                        head: "Background location (only with permission)",
                                        body:
                                            "Collected only if you explicitly enable it, typically for dispatch reliability and safety checks where relevant.",
                                    },
                                    {
                                        head: "Approximate location (IP-based)",
                                        body:
                                            "Used on the website for security, fraud prevention, and regional experience (e.g., city defaults).",
                                    },
                                    {
                                        head: "You control permissions",
                                        body:
                                            "Location permissions can be managed in device settings. Disabling location can limit features like pickup accuracy and driver dispatch.",
                                    },
                                ]}
                            />

                            <Callout title="Safety note">
                                In some safety cases (e.g., active incident), we may use recent trip location signals to help investigate and respond responsibly.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="how-we-use"
                            eyebrow="Use"
                            title="4. How We Use Information"
                            subtitle="We use information for service delivery, safety, payments, support, and compliance."
                        >
                            <BulletGrid items={useCases} />

                            <Callout title="No selling of personal information">
                                We do not sell personal information. We share information only as described in this Policy.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="legal-bases"
                            eyebrow="Legal"
                            title="5. Legal Bases (Nigeria NDPR + Global)"
                            subtitle="Depending on your region, we rely on legal bases such as contract necessity, legitimate interests, consent, and legal obligations."
                        >
                            <p>
                                Where required by law (including Nigeria NDPR principles and global privacy frameworks), we rely on one or more legal bases to process personal data:
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Contractual necessity",
                                        body:
                                            "To provide rides, deliveries, emergency ride coordination, enterprise services, and requested platform functionality.",
                                    },
                                    {
                                        head: "Legitimate interests",
                                        body:
                                            "To maintain safety, prevent fraud, secure systems, improve service quality, and protect users and the public.",
                                    },
                                    {
                                        head: "Consent",
                                        body:
                                            "Where you grant permissions (e.g., device location, notifications) or opt into optional features/marketing where applicable.",
                                    },
                                    {
                                        head: "Legal obligation",
                                        body:
                                            "To comply with applicable laws, tax/regulatory requirements, and valid legal process.",
                                    },
                                ]}
                            />

                            <Callout title="Regional differences">
                                Some jurisdictions require additional disclosures (e.g., specific rights or cookie consent). Where applicable, those regional disclosures apply.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="sharing"
                            eyebrow="Sharing"
                            title="6. Sharing & Disclosure"
                            subtitle="We share information only to provide services, maintain safety, and comply with law—never to sell your data."
                        >
                            <p>We may share information in limited circumstances, including:</p>

                            <BulletGrid items={sharingItems} />

                            <Callout title="Strict partner use restriction">
                                Drivers/couriers and partners may only use your information to complete trips or deliveries. Misuse can lead to termination and legal consequences.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="drivers-partners"
                            eyebrow="Marketplace"
                            title="7. Drivers, Riders & Partners"
                            subtitle="Trip coordination requires sharing limited information—while enforcing strict rules against misuse."
                        >
                            <p>
                                To coordinate trips and deliveries, 6Ride shares limited information between riders and drivers/couriers (e.g., first name, pickup point, destination, trip
                                status, and limited contact details). Partners may receive trip-related records for operational purposes (payouts, dispute resolution, compliance), subject to
                                confidentiality restrictions.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "What partners typically see",
                                        body:
                                            "Trip status, pickup and destination, the minimum contact details required to coordinate, and service instructions you provide.",
                                    },
                                    {
                                        head: "What partners must not do",
                                        body:
                                            "Store numbers for personal use, contact you outside trip needs, share your data, or use it for advertising/solicitation.",
                                    },
                                    {
                                        head: "Enforcement",
                                        body:
                                            "Partner misuse of data may result in suspension/termination and cooperation with lawful authorities where required.",
                                    },
                                    {
                                        head: "Reference",
                                        body:
                                            "For prohibited behavior and enforcement actions, see the Acceptable Use Policy and Partner Terms.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="payments"
                            eyebrow="Financial"
                            title="8. Payments & Financial Data"
                            subtitle="Payments are handled through approved providers; we store only what is necessary for receipts and compliance."
                        >
                            <p>
                                Payment processing is handled through approved providers. 6Ride does not store full card details on our servers when processed by third-party payment providers.
                                We may store transaction records, receipts, and billing history for accounting, fraud prevention, chargeback handling, and customer support.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "What we store",
                                        body:
                                            "Transaction IDs, amounts, timestamps, provider references, and receipt history needed for support and compliance.",
                                    },
                                    {
                                        head: "What we avoid storing",
                                        body:
                                            "Full payment card numbers, CVV, or raw card data (when providers handle processing).",
                                    },
                                    {
                                        head: "Chargebacks and disputes",
                                        body:
                                            "We may share relevant transaction and trip records with payment providers to address disputes and fraud.",
                                    },
                                    {
                                        head: "Enterprise billing",
                                        body:
                                            "Enterprise accounts may have invoicing and reporting arrangements; these are governed by enterprise terms where applicable.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="minors"
                            eyebrow="Safeguarding"
                            title="9. Minors, Students & Guardians"
                            subtitle="6Ride is generally intended for adults; minors may use only under verified guardian/institution arrangements where permitted."
                        >
                            <p>
                                6Ride is generally intended for adults. If minors or students use 6Ride under permitted guardian or institutional arrangements, we collect and process data only
                                as necessary for safety and service delivery. Guardians and institutions are responsible for authorization and appropriate supervision.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Guardian/institution authorization",
                                        body:
                                            "Certain school or campus programs may require verification and specific pickup/drop-off processes for safeguarding.",
                                    },
                                    {
                                        head: "Limited processing",
                                        body:
                                            "We process only what is necessary to coordinate the trip safely and enforce safeguarding controls.",
                                    },
                                    {
                                        head: "Reporting concerns",
                                        body:
                                            "If you believe a minor provided data without consent, contact us so we can review and take appropriate action.",
                                    },
                                    {
                                        head: "Reference addendum",
                                        body:
                                            "See the Child & Student Safety Addendum for detailed safeguarding rules and enforcement.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="cookies"
                            eyebrow="Web"
                            title="10. Cookies & Analytics"
                            subtitle="Cookies support website functionality, preferences, security, and measurement—subject to consent where required."
                        >
                            <p>
                                We may use cookies or similar technologies to operate the website, remember preferences, defend against abuse, and understand performance. Where required by law,
                                we request consent for non-essential cookies.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Essential cookies", body: "Required for site security, session management, and core functionality." },
                                    { head: "Preference cookies", body: "Remember settings such as language or region where available." },
                                    { head: "Analytics cookies", body: "Help understand how the site is used so we can improve performance and content." },
                                    { head: "Controls", body: "You can manage cookies through browser settings and consent prompts where provided." },
                                ]}
                            />

                            <Callout title="Do Not Track">
                                Some browsers send “Do Not Track” signals; responses vary across services and jurisdictions. We evaluate signals where feasible.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="retention"
                            eyebrow="Retention"
                            title="11. Data Retention"
                            subtitle="We keep data only as long as needed for service delivery, safety, disputes, and lawful obligations."
                        >
                            <p>
                                We retain personal information only as long as necessary for providing services, maintaining safety, preventing fraud, resolving disputes, and complying with legal
                                and regulatory requirements. Retention periods vary by data type and purpose.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Account data",
                                        body:
                                            "Kept while your account remains active and for a period afterward as required for fraud prevention, safety, and legal compliance.",
                                    },
                                    {
                                        head: "Trip and delivery records",
                                        body:
                                            "Retained to support safety investigations, dispute resolution, receipts, compliance, and partner payouts.",
                                    },
                                    {
                                        head: "Support communications",
                                        body:
                                            "Retained to help resolve issues, improve service, and maintain records of safety or legal matters.",
                                    },
                                    {
                                        head: "Deletion requests",
                                        body:
                                            "Some data may not be deletable immediately due to legal obligations, safety needs, or ongoing disputes.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="security"
                            eyebrow="Security"
                            title="12. Security"
                            subtitle="We use reasonable safeguards, but no system can guarantee absolute security."
                        >
                            <p>
                                We use reasonable administrative, technical, and organizational safeguards designed to protect information. However, no system is completely secure, and we cannot
                                guarantee absolute security.
                            </p>

                            <SecurityGrid rows={securityRows} />

                            <Callout title="Account protection tip">
                                Never share verification codes or passwords. 6Ride will never ask you for your password via email or unsolicited message.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="rights"
                            eyebrow="Rights"
                            title="13. Your Rights & Choices"
                            subtitle="Depending on your location, you may have rights to access, correct, delete, object, and more."
                        >
                            <p>
                                Depending on your location and applicable law, you may have rights to access, correct, delete, or restrict processing of your personal information and to object
                                to certain processing. You may also withdraw consent where processing is based on consent.
                            </p>

                            <RightsTable rows={rightsRows} />

                            <Callout title="Identity verification for requests">
                                To protect your account, we may require identity verification before fulfilling privacy requests.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="international"
                            eyebrow="Transfers"
                            title="14. International Transfers"
                            subtitle="Cross-border transfers may occur if we operate internationally or use global service providers."
                        >
                            <p>
                                If 6Ride operates internationally or uses service providers outside your country, your personal information may be transferred and processed in other jurisdictions.
                                Where required, we use appropriate safeguards such as contractual protections, access controls, and security measures to protect data.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Why transfers happen",
                                        body:
                                            "Global hosting, support operations, security monitoring, and performance tooling may require cross-border processing.",
                                    },
                                    {
                                        head: "Safeguards",
                                        body:
                                            "We apply safeguards appropriate to the sensitivity of the data and applicable law, including vendor contracts and access controls.",
                                    },
                                    {
                                        head: "Local rights",
                                        body:
                                            "Your rights may vary by region; we aim to apply consistent privacy principles globally.",
                                    },
                                    {
                                        head: "Enterprise arrangements",
                                        body:
                                            "Enterprise customers may have additional contractual privacy terms for corporate users where applicable.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="changes"
                            eyebrow="Updates"
                            title="15. Changes to This Policy"
                            subtitle="We update the last-updated date when the document changes."
                        >
                            <p>
                                We may update this Privacy Policy periodically. Continued use of the platform after changes means you accept the updated policy. When we update this page, we update
                                the “Last updated” date at the top.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Material changes",
                                        body:
                                            "If changes materially affect user understanding, we may provide additional notice through the app or website where feasible.",
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
                            title="16. Contact & Complaints"
                            subtitle="Contact us for privacy questions, requests, or complaints."
                        >
                            <p>
                                Questions, requests, or complaints about privacy can be submitted via the Contact page or by emailing us. If you are located in Nigeria, you may also have rights
                                under applicable Nigerian data protection rules (NDPR principles and related guidance).
                            </p>

                            <EmailChip email="privacy@6rides.com" label="Privacy" />
                            <EmailChip email="support@6rides.com" label="Support" />

                            <Callout title="Complaints">
                                If you believe we have not addressed a privacy concern appropriately, you can submit a complaint with details of the issue and your requested resolution.
                            </Callout>
                        </GlassCard>

                        <div className="mt-6 rounded-3xl border border-black/10 bg-white/[0.55] p-5 text-xs text-black/60 backdrop-blur">
                            This Privacy Policy should be read together with the Terms of Service and Acceptable Use Policy. We do not sell personal information. Drivers/partners may only use
                            trip-related information to complete services and are prohibited from other uses.
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
