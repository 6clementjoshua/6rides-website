// app/policies/terms/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

type TocItem = { id: string; label: string; note: string };
type GridItem = { head: string; body: string };
type RuleCard = { title: string; bullets: string[]; note?: string };
type MiniRow = { left: string; right: string };
type Def = { term: string; meaning: string };

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

const SUPPORT_EMAIL = "support@6rides.com";
const BILLING_EMAIL = "billing@6rides.com";
const EMERGENCY_EMAIL = "emergency@6rides.com";
const LEGAL_EMAIL = "legal@6rides.com";

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

function MiniTable({ title, rows }: { title: string; rows: MiniRow[] }) {
    return (
        <div className="mt-4 overflow-hidden rounded-3xl border border-black/10 bg-white/[0.55] backdrop-blur">
            <div className="px-5 py-4 text-xs font-semibold text-black/70 border-b border-black/10 bg-white/[0.55]">{title}</div>
            <div className="divide-y divide-black/10">
                {rows.map((r) => (
                    <div key={r.left} className="grid gap-2 px-5 py-4 md:grid-cols-[280px_1fr]">
                        <div className="text-sm font-semibold text-black/80">{r.left}</div>
                        <div className="text-sm text-black/70">{r.right}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Rule({ r }: { r: RuleCard }) {
    return (
        <div className="relative rounded-3xl border border-black/10 bg-white/[0.55] p-5 backdrop-blur">
            <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-18px_28px_rgba(0,0,0,0.06)]" />
            <div className="relative">
                <div className="text-sm font-semibold text-black/85">{r.title}</div>
                <ul className="mt-3 space-y-2 text-sm text-black/70">
                    {r.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/30" />
                            <span>{b}</span>
                        </li>
                    ))}
                </ul>
                {r.note ? (
                    <div className="mt-4 rounded-2xl border border-black/10 bg-white/[0.50] p-3 text-xs text-black/60">{r.note}</div>
                ) : null}
            </div>
        </div>
    );
}

export default function TermsPage() {
    const { effectiveDate, lastUpdated } = usePolicyDates();
    const [mobileTocOpen, setMobileTocOpen] = useState(false);

    const toc: TocItem[] = useMemo(
        () => [
            { id: "acceptance", label: "1. Acceptance of Terms", note: "Binding agreement, reading order, and policy hierarchy." },
            { id: "about", label: "2. About 6Ride", note: "Who we are, what we provide, and where we operate." },
            { id: "definitions", label: "3. Definitions", note: "Key terms used throughout these Terms (important for interpretation)." },
            { id: "eligibility", label: "4. Eligibility & Age Requirements", note: "Adult accounts, minors/student safeguards, and guardian responsibility." },
            { id: "services", label: "5. Scope of Services", note: "Rides, scheduled trips, chauffeur, food/goods delivery, emergency coordination." },
            { id: "accounts", label: "6. Accounts & Verification", note: "Accuracy, KYC/verification, security responsibilities, and restrictions." },
            { id: "pricing", label: "7. Pricing, Payments & Billing", note: "Fares/fees, subscriptions, corporate invoicing, refunds, and chargebacks." },
            { id: "safety", label: "8. Safety, Conduct & Community Standards", note: "Safety rules, respectful behavior, and policy enforcement." },
            { id: "partners", label: "9. Drivers, Couriers & Partner Vehicles", note: "Independent contractor model and partner obligations." },
            { id: "minors", label: "10. Minors, Students & Guardians", note: "Student transport controls, consent, pickups, and violations." },
            { id: "emergency", label: "11. Emergency Ride Coordination", note: "Membership/subscription eligibility; not a hospital or ambulance service." },
            { id: "delivery", label: "12. Food & Goods Delivery", note: "Merchant responsibility, prohibited items, and delivery disputes." },
            { id: "government", label: "13. Government, Institutions & Public Sector Use", note: "Enterprise terms, lawful requests, and compliance." },
            { id: "compliance", label: "14. Legal & Regulatory Compliance", note: "Local laws in every city/country; sanctions/export controls." },
            { id: "content", label: "15. Communications, Content & IP", note: "User content, feedback, trademarks, and platform rights." },
            { id: "suspension", label: "16. Suspension, Termination & Enforcement", note: "When we suspend/terminate and what happens to access." },
            { id: "disclaimers", label: "17. Disclaimers & Limitation of Liability", note: "As-is service, third-party limitations, and damages limits." },
            { id: "indemnity", label: "18. Indemnity", note: "Your responsibility if your actions create claims or losses." },
            { id: "privacy", label: "19. Privacy & Data Protection", note: "How data is handled; linking to the Privacy Policy." },
            { id: "international", label: "20. International Use & Cross-Border Terms", note: "Local variation, language precedence, and cross-border operations." },
            { id: "disputes", label: "21. Disputes, Governing Law & Venue", note: "How disputes are handled and what law applies." },
            { id: "changes", label: "22. Changes to These Terms", note: "How updates are made and how you’re notified." },
            { id: "contact", label: "23. Contact", note: "Support, billing, emergency coordination, and legal contacts." },
        ],
        []
    );

    const defs: Def[] = useMemo(
        () => [
            { term: "“6Ride” / “6Rides”", meaning: "The 6Ride platform, including our website, mobile apps, and related services, and the entities operating them." },
            { term: "“User” / “Rider”", meaning: "Any person or entity that accesses the platform to request or receive services." },
            { term: "“Partner”", meaning: "Independent drivers, couriers, vehicle owners, fleets, and third parties providing services via the platform." },
            { term: "“Services”", meaning: "Any ride coordination, scheduled/chauffeur transport, deliveries (food/goods), emergency ride coordination, or related features offered by 6Ride." },
            { term: "“Emergency ride coordination”", meaning: "Urgent transport coordination feature for eligible members and subscribed users; not medical diagnosis/treatment or rescue operations." },
            { term: "“Content”", meaning: "Any text, images, messages, ratings, feedback, or other materials submitted via the platform." },
            { term: "“Account”", meaning: "Your registered profile and credentials used to access and use the platform." },
            { term: "“Policies”", meaning: "Associated documents including Privacy, Acceptable Use, Safety Guidelines, Refunds, Partner Terms, and addenda referenced herein." },
        ],
        []
    );

    const serviceGrid: GridItem[] = useMemo(
        () => [
            { head: "On-demand rides", body: "Request rides when needed, subject to partner availability, location coverage, and safety conditions." },
            { head: "Scheduled trips", body: "Book in advance where available; subject to confirmation, cancellation windows, and operational constraints." },
            { head: "Chauffeur/executive transport", body: "Premium categories where offered; additional standards and pricing may apply." },
            { head: "Food delivery", body: "Delivery of prepared food where offered; merchant packaging/quality remains merchant responsibility." },
            { head: "Goods/item delivery", body: "Delivery of permissible items where offered; prohibited/illegal items are strictly forbidden." },
            { head: "Emergency ride coordination", body: "Urgent transport coordination for eligible members + subscribed users; not a hospital/ambulance service." },
        ],
        []
    );

    const conductRules: RuleCard[] = useMemo(
        () => [
            {
                title: "Respect and safety are mandatory",
                bullets: [
                    "No harassment, discrimination, threats, stalking, or intimidation.",
                    "No violence, weapons, or illegal activity on the platform.",
                    "No unsafe driving demands (speeding, illegal turns, unsafe stops).",
                    "No misuse of emergency features or false safety reports.",
                ],
                note: "Serious violations may result in immediate suspension/termination and may be escalated to authorities where required.",
            },
            {
                title: "Platform integrity",
                bullets: [
                    "Do not bypass fees or transact off-platform when the platform requires in-app payment.",
                    "Do not attempt to exploit, reverse engineer, or disrupt platform systems.",
                    "Do not create multiple accounts to evade enforcement.",
                    "Do not submit fraudulent documents or identity information.",
                ],
            },
        ],
        []
    );

    const minorRules: RuleCard[] = useMemo(
        () => [
            {
                title: "Minors cannot independently create accounts (general rule)",
                bullets: [
                    "You must be an adult to create an independent account unless local law allows and we explicitly support it.",
                    "Minors may only use services under verified guardian, school, or institutional arrangements where permitted.",
                    "Guardians/institutions are responsible for authorization, supervision, and consent.",
                    "Any boundary violation involving minors is treated as severe.",
                ],
                note: "See the Child & Student Safety Addendum for detailed safeguards and enforcement.",
            },
            {
                title: "Student/campus programs (where offered)",
                bullets: [
                    "May require institutional verification and designated pickup/drop-off locations.",
                    "May require authorized contact lists and confirmation flows.",
                    "Partners must follow approved routing and avoid unauthorized stops.",
                    "Reports involving minors may be escalated for safeguarding review.",
                ],
            },
        ],
        []
    );

    const emergencyRules: RuleCard[] = useMemo(
        () => [
            {
                title: "Emergency ride coordination is not emergency medical care",
                bullets: [
                    "6Ride is not a hospital, ambulance provider, police service, or fire department.",
                    "For life-threatening emergencies, call local emergency services first.",
                    "Emergency ride coordination provides transport coordination for eligible members/subscribed users where coverage exists.",
                    "Availability depends on location, partner availability, road conditions, and operational constraints.",
                ],
                note: `Emergency coordination contact: ${EMERGENCY_EMAIL}. This is not a substitute for local emergency numbers.`,
            },
            {
                title: "Emergency subscription and misuse prevention",
                bullets: [
                    "Emergency access may require membership status and an active emergency subscription.",
                    "We may require additional verification and impose usage limits to prevent abuse.",
                    "Misuse (false emergencies) may result in fees, suspension, or termination.",
                    "We may cooperate with authorities where required for public safety or lawful requests.",
                ],
            },
        ],
        []
    );

    const governmentRows: MiniRow[] = useMemo(
        () => [
            {
                left: "Public sector onboarding",
                right: "Government and institutional users may be onboarded under enterprise terms, with authorized admins and compliance controls where offered.",
            },
            {
                left: "Lawful requests",
                right: "We may respond to valid legal process and lawful requests consistent with applicable law and our Privacy Policy.",
            },
            {
                left: "Restricted uses",
                right: "Use of the platform for unlawful surveillance, harassment, intimidation, or violations of human rights is prohibited.",
            },
            {
                left: "Sanctions and export controls",
                right: "Access may be restricted where required by sanctions, export controls, or local legal restrictions.",
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
                                <span>6Ride Legal</span>
                            </div>

                            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Terms of Service</h1>

                            <p className="mt-3 max-w-3xl text-sm leading-6 text-black/70">
                                These Terms govern access to and use of the 6Ride platform, including ride coordination, scheduled and chauffeur services, partner vehicles, food and goods delivery,
                                emergency ride coordination, corporate and government programs, and related mobility services offered in Nigeria (including Cross River State) and globally.
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
                                <InlineTag>Global coverage, local rules</InlineTag>
                            </div>

                            <Callout title="Important">
                                If you do not agree to these Terms, do not use 6Ride. These Terms incorporate by reference our Privacy Policy, Acceptable Use Policy, Safety Guidelines, Refund &
                                Cancellation Policy, Subscription & Billing Policy, Partner Terms, and applicable addenda.
                            </Callout>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <BevelButton href="/policies/privacy">Privacy</BevelButton>
                            <BevelButton href="/policies/acceptable-use">Acceptable Use</BevelButton>
                            <BevelButton href="/policies/safety">Safety</BevelButton>
                            <BevelButton href="/policies/refunds">Refunds</BevelButton>
                            <BevelButton href="/policies/subscription-billing">Billing</BevelButton>
                            <BevelButton href="/policies/contact">Contact</BevelButton>
                        </div>
                    </div>

                    {/* Quick cards */}
                    <div className="mt-7 grid gap-3 md:grid-cols-3">
                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">City-by-city rules</div>
                                <div className="mt-1 text-sm text-black/75">Services, pricing, and legal requirements vary by country, state, and city.</div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Minors protected</div>
                                <div className="mt-1 text-sm text-black/75">Minors and students require verified guardian/institution authorization.</div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Emergency clarity</div>
                                <div className="mt-1 text-sm text-black/75">Emergency ride coordination is not a hospital or ambulance service.</div>
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
                                        If any city/country has mandatory local terms, those local terms may supplement these Terms for that region.
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
                            id="acceptance"
                            eyebrow="Agreement"
                            title="1. Acceptance of Terms"
                            subtitle="These Terms are binding once you use 6Ride."
                        >
                            <p>
                                By accessing or using the 6Ride website, mobile application, or any services, you confirm that you have read, understood, and agree to these Terms. If you do not
                                agree, you must not use the platform.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Policy hierarchy", body: "These Terms incorporate referenced policies. In a conflict, a controlling written enterprise agreement may govern enterprise users." },
                                    { head: "Local supplements", body: "Local terms or notices may apply in specific countries/cities due to law or regulation." },
                                    { head: "Updates", body: "We may update Terms; continued use after effective date constitutes acceptance." },
                                    { head: "Electronic agreement", body: "You agree that electronic acceptance is legally binding." },
                                ]}
                            />

                            <Callout title="If you are using 6Ride for an organization">
                                You represent that you have authority to bind that organization. Corporate/government use may require additional documentation and admin controls.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="about"
                            eyebrow="Who we are"
                            title="2. About 6Ride"
                            subtitle={`Operations originate in Nigeria with HQ in ${HQ_LOCATION}, expanding city-by-city globally.`}
                        >
                            <p>
                                6Ride is a mobility coordination platform that connects users with independent partners for rides and deliveries and provides platform features such as booking,
                                routing, safety reporting, payments, and support. Service availability differs by region, category, and partner coverage.
                            </p>

                            <BulletGrid items={serviceGrid} />

                            <Callout title="Global availability">
                                6Ride may operate in multiple countries and cities. Coverage, categories, eligibility rules, fees, and payment methods can differ by location due to law, safety,
                                and operational constraints.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="definitions"
                            eyebrow="Interpretation"
                            title="3. Definitions"
                            subtitle="Key words that control how these Terms are read."
                        >
                            <div className="mt-2 grid gap-3 md:grid-cols-2">
                                {defs.map((d) => (
                                    <div key={d.term} className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                                        <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                                        <div className="relative">
                                            <div className="text-sm font-semibold text-black/85">{d.term}</div>
                                            <div className="mt-1 text-sm text-black/70">{d.meaning}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Callout title="Interpretation note">
                                Headings are for convenience only. “Including” means “including without limitation.” If a local law gives you rights that cannot be waived, those rights remain.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="eligibility"
                            eyebrow="Eligibility"
                            title="4. Eligibility & Age Requirements"
                            subtitle="Adult accounts, minor safeguards, and lawful use only."
                        >
                            <p>
                                You must be at least 18 years old (or the legal age of majority in your jurisdiction, if higher) to create an independent account, unless we explicitly offer a
                                compliant minor account program in your location.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Accuracy", body: "You must provide accurate information and keep it updated." },
                                    { head: "Legal capacity", body: "You must have the legal ability to enter a binding contract in your jurisdiction." },
                                    { head: "Restricted users", body: "We may restrict access due to sanctions, export controls, or legal requirements." },
                                    { head: "Safety restrictions", body: "We may limit certain categories (e.g., night service, high-risk zones) for safety and compliance." },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="services"
                            eyebrow="Services"
                            title="5. Scope of Services"
                            subtitle="What 6Ride can offer, and what varies by location."
                        >
                            <p>
                                6Ride offers multiple service categories. Not all services are available in all countries, states, or cities. Some categories may require membership, subscriptions,
                                additional verification, or compliance checks.
                            </p>

                            <BulletGrid items={serviceGrid} />

                            <Callout title="No guarantee of availability">
                                Services are offered “as available.” Availability may be impacted by traffic, weather, public events, safety conditions, outages, and partner availability.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="accounts"
                            eyebrow="Accounts"
                            title="6. Accounts & Verification"
                            subtitle="Security, identity verification, and platform integrity."
                        >
                            <p>
                                You are responsible for all activity on your account. You must maintain account security and promptly notify us of suspected unauthorized access.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Verification", body: "We may request identity verification, document verification, or additional checks to prevent fraud and comply with law." },
                                    { head: "One person, one account", body: "We may restrict multiple accounts to prevent abuse and enforcement evasion." },
                                    { head: "Device and session security", body: "Do not share passwords/OTP codes; enable device security controls where possible." },
                                    { head: "False information", body: "Fraudulent or misleading info can lead to suspension or termination." },
                                ]}
                            />

                            <Callout title="Account controls (risk-based)">
                                For safety and fraud prevention, we may apply verification holds, feature limitations, or additional review where risk signals exist.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="pricing"
                            eyebrow="Payments"
                            title="7. Pricing, Payments & Billing"
                            subtitle="How pricing works across cities and countries."
                        >
                            <p>
                                Pricing may vary by location, service type, demand, and regulatory requirements. Payments may be processed through approved payment providers. Subscription plans,
                                corporate billing, and partner payouts are governed by the Subscription & Billing Policy.
                            </p>

                            <MiniTable
                                title="Billing essentials"
                                rows={[
                                    {
                                        left: "Payment methods",
                                        right: "We support approved payment methods by region (cards, transfers, wallets). Availability differs by country/city.",
                                    },
                                    {
                                        left: "Price estimates",
                                        right: "Estimates may change due to time, distance, detours, tolls, waiting, or verified adjustments.",
                                    },
                                    {
                                        left: "Refunds and cancellations",
                                        right: "Refunds/cancellation fees are governed by the Refund & Cancellation Policy and local law.",
                                    },
                                    {
                                        left: "Chargebacks",
                                        right: "You should contact support before initiating a chargeback. Abuse may result in restrictions.",
                                    },
                                ]}
                            />

                            <Callout title="Related policies">
                                Read{" "}
                                <a className="underline" href="/policies/subscription-billing">
                                    Subscription & Billing
                                </a>{" "}
                                and{" "}
                                <a className="underline" href="/policies/refunds">
                                    Refund & Cancellation
                                </a>{" "}
                                for details.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="safety"
                            eyebrow="Safety"
                            title="8. Safety, Conduct & Community Standards"
                            subtitle="Safety is the foundation of 6Ride."
                        >
                            <p>
                                Users and partners must behave respectfully, lawfully, and safely at all times. Violations of safety standards, violence, harassment, fraud, illegal activity, or
                                misuse of the platform may lead to immediate enforcement.
                            </p>

                            <div className="mt-4 grid gap-3 lg:grid-cols-2">
                                {conductRules.map((r) => (
                                    <Rule key={r.title} r={r} />
                                ))}
                            </div>

                            <Callout title="Standards are global">
                                These standards apply in every country and city where 6Ride operates. Local law may impose additional requirements.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="partners"
                            eyebrow="Partners"
                            title="9. Drivers, Couriers & Partner Vehicles"
                            subtitle="Independent partners provide services; the platform coordinates."
                        >
                            <p>
                                Drivers, couriers, and vehicle owners participating on 6Ride typically act as independent contractors, not employees. 6Ride may set platform standards and enforce
                                safety and quality requirements, but partners control day-to-day operations and are responsible for compliance with applicable laws.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Partner requirements", body: "Partners may need licenses, insurance, documents, inspections, and background checks where permitted." },
                                    { head: "Service quality", body: "Poor conduct, unsafe driving, fraud, or harassment may result in removal." },
                                    { head: "No off-platform solicitation", body: "Partners may not solicit off-app payments where prohibited by platform rules." },
                                    { head: "Data handling", body: "Partners must not misuse rider data and must comply with privacy and safety expectations." },
                                ]}
                            />

                            <Callout title="Partner terms">
                                Partners must comply with the{" "}
                                <a className="underline" href="/policies/partner-terms">
                                    Partner Terms
                                </a>
                                .
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="minors"
                            eyebrow="Safeguarding"
                            title="10. Minors, Students & Guardians"
                            subtitle="Strong safeguards apply to protect minors and students."
                        >
                            <p>
                                Transport involving minors or students may be offered only under verified guardian, school, or institutional arrangements and only where permitted by law.
                                Guardians/institutions assume responsibility for authorization, supervision, and consent.
                            </p>

                            <div className="mt-4 grid gap-3 lg:grid-cols-2">
                                {minorRules.map((r) => (
                                    <Rule key={r.title} r={r} />
                                ))}
                            </div>

                            <Callout title="Related addendum">
                                Read the{" "}
                                <a className="underline" href="/policies/child-student-safety">
                                    Child & Student Safety Addendum
                                </a>{" "}
                                for detailed rules.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="emergency"
                            eyebrow="Emergency"
                            title="11. Emergency Ride Coordination"
                            subtitle="Urgent transport coordination for eligible members/subscribed users—without medical affiliation."
                        >
                            <p>
                                6Ride may offer emergency ride coordination for eligible members and subscribed users where coverage exists. This service is limited to transport coordination and
                                does not provide medical diagnosis, treatment, rescue operations, or emergency response services.
                            </p>

                            <div className="mt-4 grid gap-3 lg:grid-cols-2">
                                {emergencyRules.map((r) => (
                                    <Rule key={r.title} r={r} />
                                ))}
                            </div>

                            <Callout title="Emergency disclaimer">
                                Read the{" "}
                                <a className="underline" href="/policies/emergency-disclaimer">
                                    Emergency Services Disclaimer
                                </a>
                                . For non-life-threatening coordination support:{" "}
                                <a className="underline" href={`mailto:${EMERGENCY_EMAIL}`}>
                                    {EMERGENCY_EMAIL}
                                </a>
                                .
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="delivery"
                            eyebrow="Delivery"
                            title="12. Food & Goods Delivery"
                            subtitle="Merchants prepare; partners deliver; the platform coordinates."
                        >
                            <p>
                                Delivery services are subject to availability, safety standards, and local regulations. Merchants are responsible for preparing and packaging items; partners are
                                responsible for safe delivery handling; users are responsible for accurate delivery instructions and lawful orders.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Prohibited items", body: "Illegal substances, weapons, contraband, and items prohibited by law or policy are strictly forbidden." },
                                    { head: "Food quality", body: "6Ride does not cook or prepare food; quality/ingredients are primarily merchant responsibilities." },
                                    { head: "Delivery windows", body: "Times are estimates and may change due to traffic, weather, and partner availability." },
                                    { head: "Disputes", body: "Refund eligibility is governed by the Refund & Cancellation Policy and verification." },
                                ]}
                            />

                            <Callout title="Delivery safety">
                                Unsafe delivery requests (e.g., entering private premises, unlawful locations, or unsafe handoffs) may be refused.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="government"
                            eyebrow="Public sector"
                            title="13. Government, Institutions & Public Sector Use"
                            subtitle="Enterprise programs may apply; unlawful uses are prohibited."
                        >
                            <p>
                                6Ride may support government, institutional, campus, hospitality, and enterprise programs under separate terms. These Terms still apply unless a written agreement
                                governs and overrides specific sections.
                            </p>

                            <MiniTable title="Government and institutional use" rows={governmentRows} />

                            <Callout title="Public safety and human rights">
                                Any use of 6Ride to facilitate harassment, discrimination, violence, intimidation, or human rights violations is prohibited and enforceable.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="compliance"
                            eyebrow="Compliance"
                            title="14. Legal & Regulatory Compliance"
                            subtitle="Local law applies everywhere we operate."
                        >
                            <p>
                                You must comply with all applicable laws, including Nigerian federal laws, Cross River State regulations, municipal transport rules, and any international laws
                                applicable where services are offered. Partners must maintain licenses, permits, insurance, and tax compliance as required.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Local transport rules", body: "Traffic, licensing, vehicle standards, and municipal rules vary by city and must be followed." },
                                    { head: "Anti-fraud", body: "Fraud, money laundering, and payment abuse are prohibited and enforceable." },
                                    { head: "Sanctions/export controls", body: "We may restrict access to comply with sanctions and export controls." },
                                    { head: "Regulatory requests", body: "We may comply with lawful requests consistent with applicable law and privacy rules." },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="content"
                            eyebrow="Platform rights"
                            title="15. Communications, Content & IP"
                            subtitle="Your content, our platform, and brand protection."
                        >
                            <p>
                                You may submit content such as feedback, ratings, and support messages. You are responsible for your content and must not submit unlawful or abusive content.
                                6Ride owns or licenses the platform, trademarks, logos, UI, and related intellectual property.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "User content", body: "You grant us a limited license to host and display content as needed to operate the service (e.g., reviews, support messages)." },
                                    { head: "Feedback", body: "Feedback may be used to improve the service without obligation to you, unless prohibited by law." },
                                    { head: "Brand protection", body: "Misuse of 6Ride branding, impersonation, or fake representations are prohibited." },
                                    { head: "App misuse", body: "Reverse engineering, scraping, or exploiting security vulnerabilities is prohibited." },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="suspension"
                            eyebrow="Enforcement"
                            title="16. Suspension, Termination & Enforcement"
                            subtitle="We suspend or terminate to protect safety, legality, and platform integrity."
                        >
                            <p>
                                6Ride may suspend or permanently terminate accounts for violations of these Terms, applicable laws, or our policies. Enforcement may include warnings, feature
                                restrictions, temporary suspensions, permanent removal, and referral to authorities where required.
                            </p>

                            <MiniTable
                                title="Common enforcement triggers"
                                rows={[
                                    { left: "Safety violations", right: "Violence, threats, harassment, impairment, reckless driving, or endangerment." },
                                    { left: "Fraud/payment abuse", right: "Chargeback abuse, fake claims, stolen payment methods, identity fraud." },
                                    { left: "Minors safeguarding", right: "Unauthorized minor transport, boundary violations, failure to follow safeguarding rules." },
                                    { left: "Platform integrity", right: "Bypassing fees, hacking/exploitation, evading enforcement with multiple accounts." },
                                ]}
                            />

                            <Callout title="Effect of termination">
                                If terminated, you may lose access to services and associated data/features, subject to legal retention requirements and the Privacy Policy.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="disclaimers"
                            eyebrow="Risk"
                            title="17. Disclaimers & Limitation of Liability"
                            subtitle="The platform is provided as-is and as-available, subject to local consumer protections."
                        >
                            <p>
                                Services are provided “as is” and “as available.” To the maximum extent permitted by law, 6Ride disclaims liability for indirect, incidental, special, or
                                consequential damages. Some jurisdictions do not allow certain limitations; in those jurisdictions, limitations apply only to the extent permitted.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Third-party limitations", body: "Partners and merchants are third parties; 6Ride does not control their conduct beyond platform standards." },
                                    { head: "No guarantee", body: "We do not guarantee availability, response times, or outcomes in every city." },
                                    { head: "Emergency limitation", body: "Emergency ride coordination is not medical care; call local emergency services for life-threatening situations." },
                                    { head: "Consumer rights", body: "Local consumer laws may provide rights that cannot be waived." },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="indemnity"
                            eyebrow="Responsibility"
                            title="18. Indemnity"
                            subtitle="You agree to cover losses arising from your unlawful or harmful use."
                        >
                            <p>
                                To the extent permitted by law, you agree to indemnify and hold harmless 6Ride, its affiliates, and personnel from claims, liabilities, damages, losses, and
                                expenses (including reasonable legal fees) arising from your breach of these Terms, misuse of services, unlawful actions, or violation of third-party rights.
                            </p>
                        </GlassCard>

                        <GlassCard
                            id="privacy"
                            eyebrow="Privacy"
                            title="19. Privacy & Data Protection"
                            subtitle="Privacy is governed by the Privacy Policy and applicable data protection laws."
                        >
                            <p>
                                Personal data is handled according to our{" "}
                                <a className="underline" href="/policies/privacy">
                                    Privacy Policy
                                </a>
                                . Data protection laws vary globally; where required, we provide additional notices and controls for specific regions.
                            </p>

                            <Callout title="Safety and legal retention">
                                We may retain certain records for safety, fraud prevention, dispute resolution, and legal compliance consistent with the Privacy Policy.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="international"
                            eyebrow="Global"
                            title="20. International Use & Cross-Border Terms"
                            subtitle="Local laws apply; services vary by region."
                        >
                            <p>
                                If you access 6Ride from outside Nigeria, you are responsible for compliance with local laws. Certain features, categories, and payment methods may vary by region.
                                Where local mandatory terms conflict with these Terms, those local terms control to the extent required by law.
                            </p>

                            <MiniTable
                                title="Cross-border principles"
                                rows={[
                                    { left: "Local variations", right: "Pricing, vehicle categories, permitted items, and compliance requirements vary by country/city." },
                                    { left: "Language", right: "If we provide translations, the English version may control unless local law requires otherwise." },
                                    { left: "Transfers", right: "Cross-border data processing may occur as described in the Privacy Policy." },
                                    { left: "Local consumer rights", right: "Mandatory rights under your local law remain effective." },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="disputes"
                            eyebrow="Disputes"
                            title="21. Disputes, Governing Law & Venue"
                            subtitle="How disputes are handled depends on location and mandatory law."
                        >
                            <p>
                                Dispute processes may vary by jurisdiction. Where permitted, disputes may be handled in the courts of Nigeria (with operational ties to Cross River State) or as
                                otherwise specified in local terms or enterprise agreements. Nothing in these Terms limits rights you may have under mandatory local consumer protection laws.
                            </p>

                            <Callout title="Before formal escalation">
                                Contact support first with trip/order IDs and timelines. Many issues are resolved faster through support and evidence-based review.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="changes"
                            eyebrow="Updates"
                            title="22. Changes to These Terms"
                            subtitle="We update the last-updated date when this document changes."
                        >
                            <p>
                                We may update these Terms periodically. Continued use of the platform after changes constitutes acceptance of the revised Terms from the effective date. When we
                                update this page, we update the “Last updated” date at the top.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Notice", body: "We may provide notice via the app, website banners, or email where feasible." },
                                    { head: "Effective date", body: "Updates take effect on the stated effective date unless otherwise required by law." },
                                    { head: "Enterprise override", body: "Written enterprise agreements control for enterprise users where they conflict." },
                                    { head: "Automation note", body: "Set NEXT_PUBLIC_POLICY_BUILD_DATE=YYYY-MM-DD in your deployment environment when you update this page." },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="contact"
                            eyebrow="Contact"
                            title="23. Contact"
                            subtitle="Use the right channel so issues are handled quickly."
                        >
                            <BulletGrid
                                items={[
                                    { head: "General support", body: `Email: ${SUPPORT_EMAIL} or use /policies/contact.` },
                                    { head: "Billing", body: `Email: ${BILLING_EMAIL} (include transaction ID and trip/order ID).` },
                                    { head: "Emergency coordination", body: `Email: ${EMERGENCY_EMAIL} (not for life-threatening emergencies).` },
                                    { head: "Legal", body: `Email: ${LEGAL_EMAIL} (formal requests and legal notices).` },
                                ]}
                            />

                            <Callout title="Do not send sensitive secrets">
                                Do not email full card numbers, OTP codes, or passwords. If identity verification is required, follow the in-app secure process.
                            </Callout>
                        </GlassCard>

                        <div className="mt-6 rounded-3xl border border-black/10 bg-white/[0.55] p-5 text-xs text-black/60 backdrop-blur">
                            These Terms form a legally binding agreement between you and 6Ride. For related rules, read Acceptable Use, Safety Guidelines, Privacy, Refunds, Subscription & Billing,
                            Partner Terms, and applicable addenda.
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
