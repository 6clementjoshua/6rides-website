// app/policies/contact/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

type TocItem = { id: string; label: string; note: string };
type ContactRow = { label: string; value: string; hint?: string; tag?: string };

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

function CopyButton({ value }: { value: string }) {
    const [copied, setCopied] = useState(false);

    return (
        <button
            type="button"
            onClick={async () => {
                try {
                    await navigator.clipboard.writeText(value);
                    setCopied(true);
                    window.setTimeout(() => setCopied(false), 1200);
                } catch {
                    // silent
                }
            }}
            className={cx(
                "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-3 py-1 text-[11px] font-semibold",
                "border border-black/10 bg-white/[0.55] backdrop-blur",
                "shadow-[0_10px_25px_-20px_rgba(0,0,0,0.35)]",
                "transition-transform active:scale-[0.98] hover:-translate-y-[1px]"
            )}
            aria-label="Copy"
        >
            <span className="pointer-events-none absolute inset-[1px] rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
            <span className="relative text-black/75">{copied ? "Copied" : "Copy"}</span>
        </button>
    );
}

function ContactTable({ title, rows }: { title: string; rows: ContactRow[] }) {
    return (
        <div className="mt-4 rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
            <div className="pointer-events-none absolute" />
            <div className="text-sm font-semibold text-black/85">{title}</div>

            <div className="mt-3 space-y-2">
                {rows.map((r) => (
                    <div
                        key={r.label}
                        className="flex flex-col gap-2 rounded-2xl border border-black/10 bg-white/[0.50] p-3 sm:flex-row sm:items-start sm:justify-between"
                    >
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <div className="text-xs font-semibold text-black/70">{r.label}</div>
                                {r.tag ? (
                                    <span className="rounded-full border border-black/10 bg-white/[0.55] px-2 py-0.5 text-[10px] font-semibold text-black/55">
                                        {r.tag}
                                    </span>
                                ) : null}
                            </div>
                            <div className="mt-1 break-words text-sm text-black/80">{r.value}</div>
                            {r.hint ? <div className="mt-1 text-xs text-black/55">{r.hint}</div> : null}
                        </div>

                        <div className="shrink-0">
                            <CopyButton value={r.value} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function ContactPolicyPage() {
    const { effectiveDate, lastUpdated } = usePolicyDates();
    const [mobileTocOpen, setMobileTocOpen] = useState(false);

    // Replace these with real channels when ready (kept conservative, investor-friendly)
    const CONTACTS = useMemo(
        () => ({
            support: [
                {
                    label: "In-app Support",
                    value: "Open the 6Ride app → Help & Support → Submit a ticket",
                    hint: "Best for account issues, trip problems, payment questions, and general support.",
                    tag: "Recommended",
                },
                {
                    label: "Web Contact",
                    value: "Use the Contact form on this website (Contact page)",
                    hint: "Best when you cannot access your account or need to attach documents.",
                },
            ],
            safety: [
                {
                    label: "Safety Reporting (In-app)",
                    value: "Open the 6Ride app → Safety → Report an incident",
                    hint: "Best for harassment reports, unsafe driving, delivery tampering, threats, or suspicious behavior.",
                    tag: "Fast lane",
                },
                {
                    label: "Emergency Guidance",
                    value: "If immediate danger exists, contact your local emergency services first, then report to 6Ride.",
                    hint: "We may escalate internally and cooperate with authorities where required by law.",
                },
            ],
            legal: [
                {
                    label: "Legal Requests",
                    value: "Submit formal requests via the Legal & Regulatory channel specified by 6Ride",
                    hint:
                        "For regulators, law enforcement, and legal representatives. Include jurisdiction, legal basis, scope, and return contact details.",
                    tag: "Formal",
                },
                {
                    label: "Regulatory Inquiries",
                    value: "Submit via official government/regulator correspondence channel (written requests preferred)",
                    hint: "We respond to valid legal process and regulatory mandates based on applicable law.",
                },
            ],
            corporate: [
                {
                    label: "Corporate Accounts",
                    value: "Request onboarding via Corporate & Partnerships intake",
                    hint: "For staff transport, campus programs, event logistics, and enterprise billing/compliance.",
                    tag: "B2B",
                },
                {
                    label: "Institutions (Schools/Campuses)",
                    value: "Submit a safeguarding and transport coordination request via Partnerships intake",
                    hint: "For student transport, approved pickup zones, roster rules, and school zone procedures.",
                },
            ],
        }),
        []
    );

    const toc: TocItem[] = useMemo(
        () => [
            { id: "overview", label: "1. Contact Overview", note: "What to use, when to use it, and how we route requests." },
            { id: "support", label: "2. Customer Support", note: "Accounts, bookings, pricing, payments, refunds, and general help." },
            { id: "safety", label: "3. Safety & Emergency Reports", note: "Harassment, threats, unsafe driving, delivery safety, and emergencies." },
            { id: "deliveries", label: "4. Delivery, Food & Goods Issues", note: "Missing items, tampering, prohibited items, and chain-of-custody." },
            { id: "membership", label: "5. Membership & Emergency Eligibility", note: "6Clement Joshua membership and emergency subscription questions." },
            { id: "legal", label: "6. Legal & Regulatory Contact", note: "Law enforcement requests, regulator inquiries, formal processes." },
            { id: "corporate", label: "7. Corporate, Schools & Partnerships", note: "Enterprise onboarding, campuses, merchants, fleet partnerships." },
            { id: "abuse", label: "8. Abuse of Support Channels", note: "False reports, harassment of staff, and misuse consequences." },
            { id: "sla", label: "9. Response Times & Prioritization", note: "How we triage and what affects response speed." },
            { id: "privacy", label: "10. Data, Evidence & Privacy", note: "What we may request and how we handle sensitive reports." },
            { id: "geo", label: "11. Global Coverage & Local Law", note: `Worldwide operations; HQ: ${HQ_LOCATION}; location-specific processes.` },
            { id: "changes", label: "12. Updates to This Page", note: "How contact info changes are reflected." },
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
                                <span>6Ride Contact & Support</span>
                            </div>

                            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                                Contact & Support
                            </h1>

                            <p className="mt-3 max-w-3xl text-sm leading-6 text-black/70">
                                This page explains how to contact 6Ride for customer support, safety reporting, emergency-related issues,
                                legal and regulatory inquiries, corporate partnerships, school/campus coordination, and compliance matters.
                                Always use official 6Ride channels to protect your privacy and ensure your request reaches the correct team.
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
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <BevelButton href="/policies/terms">Terms</BevelButton>
                            <BevelButton href="/policies/privacy">Privacy</BevelButton>
                            <BevelButton href="/policies/acceptable-use">Acceptable Use</BevelButton>
                            <BevelButton href="/policies/child-student-safety">Child Safety</BevelButton>
                        </div>
                    </div>

                    {/* quick routing cards */}
                    <div className="mt-7 grid gap-3 md:grid-cols-3">
                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Fastest help</div>
                                <div className="mt-1 text-sm text-black/75">
                                    Use in-app Support for most issues; it automatically attaches trip context for faster resolution.
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Safety matters</div>
                                <div className="mt-1 text-sm text-black/75">
                                    For harassment, threats, unsafe driving, delivery tampering, or emergencies—use Safety reporting.
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Formal requests</div>
                                <div className="mt-1 text-sm text-black/75">
                                    Regulators and legal representatives should use designated legal channels with proper jurisdiction and scope.
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
                                        Provide your trip ID (if available), date/time, city, and a clear description. That single step can cut resolution time significantly.
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
                            eyebrow="How to reach us"
                            title="1. Contact Overview"
                            subtitle="Choose the right channel and we can resolve issues faster and more safely."
                        >
                            <p>
                                6Ride routes messages to specialized teams. To reduce delays, use the channel that matches the issue type.
                                In-app support is preferred because it can automatically include relevant context (trip ID, timestamps, route, and service type).
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Use Support for",
                                        body:
                                            "Account access, booking problems, receipts, payment questions, refunds, subscription questions, and general troubleshooting.",
                                    },
                                    {
                                        head: "Use Safety for",
                                        body:
                                            "Harassment, threats, unsafe driving, suspicious delivery activity, lost child/student concerns, or boundary violations.",
                                    },
                                    {
                                        head: "Use Legal for",
                                        body:
                                            "Formal requests from regulators/law enforcement, subpoenas/court orders, and legal representation inquiries.",
                                    },
                                    {
                                        head: "Use Partnerships for",
                                        body:
                                            "Corporate accounts, schools/campuses, fleets, merchants, and institutional transport coordination.",
                                    },
                                ]}
                            />

                            <Callout title="Anti-scam warning">
                                6Ride will not ask you to share passwords, OTP codes, or to “verify” your account through unofficial numbers or private messages.
                                Use only official channels.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="support"
                            eyebrow="Support"
                            title="2. Customer Support"
                            subtitle="For everyday help: accounts, bookings, trip adjustments, payments, and refunds."
                        >
                            <p>
                                Customer Support assists with standard service issues. Response time varies depending on complexity and whether evidence or third-party review is required.
                            </p>

                            <ContactTable title="Customer Support Channels" rows={CONTACTS.support} />

                            <BulletGrid
                                items={[
                                    {
                                        head: "What to include",
                                        body:
                                            "Trip ID (if available), date/time, city, pickup/destination, driver/courier name (if shown), and a clear description of the problem.",
                                    },
                                    {
                                        head: "Payment and billing",
                                        body:
                                            "Include payment method type, receipt screenshot (if any), and what outcome you want (refund, correction, explanation).",
                                    },
                                    {
                                        head: "Account access",
                                        body:
                                            "Describe what changed (new device, lost SIM, email access) and include any verification details you can safely provide.",
                                    },
                                    {
                                        head: "Professional conduct",
                                        body:
                                            "Do not harass support staff. Aggressive language may lead to restrictions and slower escalation paths.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="safety"
                            eyebrow="Safety"
                            title="3. Safety & Emergency Reports"
                            subtitle="For harassment, threats, unsafe driving, suspicious behavior, and urgent risk situations."
                        >
                            <p>
                                Safety reports are handled with heightened priority and may involve specialized review teams. Where required or appropriate, we may escalate credible threats.
                            </p>

                            <ContactTable title="Safety Channels" rows={CONTACTS.safety} />

                            <BulletGrid
                                items={[
                                    {
                                        head: "High priority examples",
                                        body:
                                            "Threats, harassment, assault attempts, stalking, weapon-related concerns, child/student safeguarding concerns, severe reckless driving.",
                                    },
                                    {
                                        head: "Emergency situations",
                                        body:
                                            "If someone is in immediate danger, contact local emergency services first. Then report to 6Ride so we can preserve context and take platform action.",
                                    },
                                    {
                                        head: "Evidence handling",
                                        body:
                                            "Provide screenshots, timestamps, and any in-app messages. Do not fabricate or alter evidence; false reports are enforceable violations.",
                                    },
                                    {
                                        head: "Retaliation is prohibited",
                                        body:
                                            "Do not retaliate against a reporter. Retaliation may lead to immediate account suspension/termination.",
                                    },
                                ]}
                            />

                            <Callout title="Emergency Service eligibility (where applicable)">
                                Some emergency workflows may be restricted to verified 6Clement Joshua members with an active Emergency Service subscription.
                                If restricted, you can still report safety incidents through Safety channels.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="deliveries"
                            eyebrow="Delivery operations"
                            title="4. Delivery, Food & Goods Issues"
                            subtitle="Missing items, tampering, chain-of-custody, and prohibited items reports."
                        >
                            <p>
                                Delivery issues can be operational (missing items, incorrect orders) or safety-related (tampering, prohibited items, suspicious handoffs). Use the right path to avoid delays.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Operational delivery problems",
                                        body:
                                            "Missing items, wrong order, spilled food, late delivery, wrong address. Use Customer Support and include order details/receipts.",
                                    },
                                    {
                                        head: "Tampering concerns",
                                        body:
                                            "If packaging appears opened or altered, report through Safety and preserve the package/receipt where possible.",
                                    },
                                    {
                                        head: "Prohibited items",
                                        body:
                                            "Report suspected illegal or dangerous items immediately via Safety. Do not confront the courier/merchant in a risky way.",
                                    },
                                    {
                                        head: "Chain-of-custody integrity",
                                        body:
                                            "Do not attempt to reroute deliveries to hidden or unsafe locations, especially in school/campus zones. Such patterns can trigger restrictions.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="membership"
                            eyebrow="Membership"
                            title="5. Membership & Emergency Eligibility"
                            subtitle="How to ask about subscriptions, membership verification, and restricted features."
                        >
                            <p>
                                If your account is part of the 6Clement Joshua ecosystem, some features—especially emergency workflows—may require eligibility and subscription status.
                                Use Support for subscription issues and Safety for urgent safety incidents.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Subscription questions",
                                        body:
                                            "Billing, renewals, cancellations, and plan changes should go through Customer Support to ensure proper verification and receipt handling.",
                                    },
                                    {
                                        head: "Eligibility checks",
                                        body:
                                            "If emergency tools appear locked, Support can help confirm your membership/subscription status and required verification steps.",
                                    },
                                    {
                                        head: "No bypass attempts",
                                        body:
                                            "Do not attempt to bypass emergency gating or impersonate eligibility. That is a policy violation and may lead to termination.",
                                    },
                                    {
                                        head: "Safety reports still allowed",
                                        body:
                                            "Even if emergency tooling is restricted, you can still submit safety incident reports through the Safety channel.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="legal"
                            eyebrow="Formal"
                            title="6. Legal & Regulatory Contact"
                            subtitle="For regulators, law enforcement, and legal representatives using proper legal process."
                        >
                            <p>
                                6Ride responds to valid legal requests and regulatory mandates in accordance with applicable law. Requests must be properly scoped and include jurisdiction and legal basis.
                            </p>

                            <ContactTable title="Legal & Regulatory Channels" rows={CONTACTS.legal} />

                            <BulletGrid
                                items={[
                                    {
                                        head: "What formal requests should include",
                                        body:
                                            "Agency/firm identity, jurisdiction, legal basis (order/subpoena/statute), scope (accounts/trips/time window), and secure return contact.",
                                    },
                                    {
                                        head: "Emergency disclosures",
                                        body:
                                            "Where permitted, we may disclose limited information to prevent imminent harm or respond to credible emergencies.",
                                    },
                                    {
                                        head: "Invalid/overbroad requests",
                                        body:
                                            "We may reject, narrow, or request clarification for overbroad requests, especially where privacy law requires proportionality.",
                                    },
                                    {
                                        head: "No informal demands",
                                        body:
                                            "Staff cannot action informal requests via social media, personal numbers, or unverified emails.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="corporate"
                            eyebrow="B2B"
                            title="7. Corporate, Schools & Partnerships"
                            subtitle="For enterprise onboarding, campus coordination, fleets, merchants, and institutional programs."
                        >
                            <p>
                                Partnerships teams handle corporate transport programs, school/campus coordination (including child/student safety requirements),
                                fleet onboarding, merchants, and compliance requirements for institutional accounts.
                            </p>

                            <ContactTable title="Corporate & Partnerships Channels" rows={CONTACTS.corporate} />

                            <BulletGrid
                                items={[
                                    {
                                        head: "Corporate accounts",
                                        body:
                                            "Staff transport, scheduled rides, event logistics, billing controls, and usage policies for employees/contractors.",
                                    },
                                    {
                                        head: "Schools & campuses",
                                        body:
                                            "Approved pickup zones, roster rules, safeguarding coordination, and security gate procedures under the Child & Student Safety Addendum.",
                                    },
                                    {
                                        head: "Fleet partnerships",
                                        body:
                                            "Partner vehicle onboarding, driver compliance, training expectations, vehicle standards, and performance reviews.",
                                    },
                                    {
                                        head: "Merchants",
                                        body:
                                            "Food and goods delivery onboarding, packaging standards, prohibited items policies, and operational SLAs.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="abuse"
                            eyebrow="Integrity"
                            title="8. Abuse of Support Channels"
                            subtitle="False reports, harassment of staff, and gaming escalation pathways will be enforced."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "False reporting",
                                        body:
                                            "Submitting false safety or fraud reports to punish others is a serious violation and may lead to suspension/termination.",
                                    },
                                    {
                                        head: "Harassing support staff",
                                        body:
                                            "Threats, insults, or harassment of staff may lead to restricted access to support channels and account action.",
                                    },
                                    {
                                        head: "Spam and overload",
                                        body:
                                            "Repeated duplicate tickets or aggressive spamming may slow your own resolution due to verification and triage steps.",
                                    },
                                    {
                                        head: "Impersonation attempts",
                                        body:
                                            "Pretending to be a regulator, staff member, or legal representative is prohibited and may be escalated.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="sla"
                            eyebrow="Triage"
                            title="9. Response Times & Prioritization"
                            subtitle="We prioritize safety and time-sensitive issues; other requests are handled by queue and complexity."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Highest priority",
                                        body:
                                            "Credible safety threats, harassment, child/student safeguarding concerns, emergency-related incidents, active fraud signals.",
                                    },
                                    {
                                        head: "Standard priority",
                                        body:
                                            "Receipts, routine booking adjustments, general questions, non-urgent delivery issues.",
                                    },
                                    {
                                        head: "Complex cases",
                                        body:
                                            "Investigations requiring evidence review, third-party verification, or multi-party disputes may take longer.",
                                    },
                                    {
                                        head: "Your role",
                                        body:
                                            "Include trip IDs, timestamps, and clear outcomes requested. Incomplete reports typically require back-and-forth and delay resolution.",
                                    },
                                ]}
                            />

                            <Callout title="No guaranteed timeframes">
                                Response time can vary by region, demand, evidence availability, and whether safety escalation is required. We aim for speed, but we prioritize accuracy and safety.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="privacy"
                            eyebrow="Evidence"
                            title="10. Data, Evidence & Privacy"
                            subtitle="We request what we need, we protect what we collect, and we handle sensitive reports carefully."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "What we may request",
                                        body:
                                            "Trip IDs, timestamps, screenshots, receipts, delivery photos, and identity verification where necessary for safety and fraud prevention.",
                                    },
                                    {
                                        head: "What we do not request",
                                        body:
                                            "Passwords, OTP codes, or full access to your personal accounts. If someone asks, treat it as suspicious.",
                                    },
                                    {
                                        head: "Sensitive reports",
                                        body:
                                            "We limit internal access to sensitive safety reports and share information externally only as required/appropriate under law and policy.",
                                    },
                                    {
                                        head: "Evidence integrity",
                                        body:
                                            "Do not fabricate or alter evidence. Manipulation can lead to enforcement actions and may undermine legitimate claims.",
                                    },
                                ]}
                            />

                            <Callout title="Privacy policy governs">
                                Data handling is governed by the 6Ride Privacy Policy. This page explains routing; the Privacy Policy explains processing and legal bases.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="geo"
                            eyebrow="Worldwide"
                            title="11. Global Coverage & Local Law"
                            subtitle="6Ride operates across cities and regions; some processes differ due to local rules."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Local variations",
                                        body:
                                            "Some cities require special complaint formats, regulatory case numbers, or school zone procedures. We adapt while enforcing global safety standards.",
                                    },
                                    {
                                        head: "Cross River HQ",
                                        body:
                                            `Administrative headquarters: ${HQ_LOCATION}. Operational support may be distributed across regions as 6Ride expands.`,
                                    },
                                    {
                                        head: "Where to start",
                                        body:
                                            "Start with in-app Support/Safety whenever possible. It routes correctly regardless of city and reduces misdirection.",
                                    },
                                    {
                                        head: "Regulatory communication",
                                        body:
                                            "Regulators should use formal channels and provide jurisdiction and legal basis to prevent delays and misrouting.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="changes"
                            eyebrow="Updates"
                            title="12. Updates to This Page"
                            subtitle="Contact details may change; we reflect changes transparently through the last-updated date."
                        >
                            <p>
                                Contact details, routing categories, and support processes may change. Always use official 6Ride channels and the latest policy pages.
                                When we update this page, we update the “Last updated” date at the top.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Automation note",
                                        body:
                                            "Set NEXT_PUBLIC_POLICY_BUILD_DATE=YYYY-MM-DD in your deployment environment when you update this page to reflect the current date.",
                                    },
                                    {
                                        head: "Security note",
                                        body:
                                            "If you suspect impersonation or scams, report it via Safety and avoid sharing sensitive information.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <div className="mt-6 rounded-3xl border border-black/10 bg-white/[0.55] p-5 text-xs text-black/60 backdrop-blur">
                            Contact details may change. Always use official 6Ride channels. Misuse of support systems, false reports, or harassment of staff may result in account restrictions,
                            suspension, or termination under the Terms and Acceptable Use Policy.
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
