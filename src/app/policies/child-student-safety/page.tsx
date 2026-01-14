// app/policies/child-student-safety/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

type TocItem = { id: string; label: string; note: string };

function formatDate(d: Date) {
    return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function parseBuildDate(input?: string | null) {
    if (!input) return null;
    const d = new Date(input);
    return Number.isNaN(d.getTime()) ? null : d;
}

const FALLBACK_LAST_UPDATED_ISO = "2025-11-01"; // keep as past date unless you intentionally update
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

export default function ChildStudentSafetyPage() {
    const { effectiveDate, lastUpdated } = usePolicyDates();
    const [mobileTocOpen, setMobileTocOpen] = useState(false);

    const toc: TocItem[] = useMemo(
        () => [
            { id: "scope", label: "1. Scope & Purpose", note: "Why this exists, which services it covers, and how it integrates with Terms." },
            { id: "definitions", label: "2. Key Definitions", note: "Minor, student, guardian, institution, authorized pickup, and school zone." },
            { id: "authorization", label: "3. Guardian & Institutional Authorization", note: "Verified permission, school approvals, and documentation." },
            { id: "eligibility", label: "4. Eligibility & Age Rules", note: "Account ownership, student programs, and jurisdiction variability." },
            { id: "products", label: "5. Covered Services & Use Cases", note: "School runs, campus rides, events, tutoring trips, and deliveries." },
            { id: "pickup", label: "6. Pickup & Drop-off Controls", note: "Approved locations, authorized contacts, and no handoffs to unknown persons." },
            { id: "driver", label: "7. Driver, Courier & Partner Responsibilities", note: "Professional boundaries, route discipline, and safeguarding duties." },
            { id: "conduct", label: "8. Conduct Standards & Boundaries", note: "No inappropriate interaction; strict rules for communications." },
            { id: "monitoring", label: "9. Safety Monitoring & Reporting", note: "Guardian visibility, school coordination, and escalation pathways." },
            { id: "emergency", label: "10. Emergencies Involving Minors", note: "Immediate actions, member/subscriber gating where applicable, and cooperation." },
            { id: "violations", label: "11. Violations & Enforcement", note: "Zero tolerance categories, removals, and legal cooperation." },
            { id: "geo", label: "12. Global Operations & Local Law", note: `Worldwide rules; HQ: ${HQ_LOCATION}; stricter standard prevails.` },
            { id: "changes", label: "13. Policy Updates", note: "How updates are reflected and how notice may be provided." },
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
                                <span>6Ride Safety Addendum</span>
                            </div>

                            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                                Child & Student Safety Addendum
                            </h1>

                            <p className="mt-3 max-w-3xl text-sm leading-6 text-black/70">
                                This addendum supplements the 6Ride Terms of Service, Acceptable Use Policy, and Safety Guidelines. It
                                applies specifically to services involving minors, students, schools, campuses, educational institutions,
                                and youth-centered events. It is designed to meet the expectations of guardians, institutions, regulators,
                                and investors across all regions where 6Ride operates.
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
                                <InlineTag>Applies to rides + delivery + campus logistics</InlineTag>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <BevelButton href="/policies/terms">Terms of Service</BevelButton>
                            <BevelButton href="/policies/acceptable-use">Acceptable Use</BevelButton>
                            <BevelButton href="/policies/privacy">Privacy Policy</BevelButton>
                            <BevelButton href="/policies/contact">Contact</BevelButton>
                        </div>
                    </div>

                    {/* quick signal cards */}
                    <div className="mt-7 grid gap-3 md:grid-cols-3">
                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Safeguarding first</div>
                                <div className="mt-1 text-sm text-black/75">
                                    Strict boundaries, authorized handoffs only, and fast enforcement for any suspicious behavior.
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Guardian + school controls</div>
                                <div className="mt-1 text-sm text-black/75">
                                    Verified permission, approved pickup points, and institutional coordination where required.
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Zero tolerance</div>
                                <div className="mt-1 text-sm text-black/75">
                                    Inappropriate interaction, unauthorized transport, or grooming signals trigger immediate action.
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
                                        Guardian trust is earned through clear controls: authorization, handoff discipline, boundaries, and
                                        enforceable consequences. Sections 3, 6, 8, and 11 are the backbone.
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
                            title="1. Scope & Purpose"
                            subtitle="A safeguarding standard for any trip, delivery, or campus movement involving minors and students."
                        >
                            <p>
                                This addendum exists to reduce risk and protect minors and students when using 6Ride—whether for school transport,
                                campus movement, tutoring trips, youth events, sports activities, or guardian-approved errands. It applies to
                                passengers, guardians, drivers, couriers, merchants, partner fleets, and institutions interacting with the platform.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Primary objective",
                                        body:
                                            "Protect minors/students through strict authorization, controlled handoffs, professional boundaries, and fast enforcement.",
                                    },
                                    {
                                        head: "Investor-grade safeguards",
                                        body:
                                            "Clear restrictions, documentation expectations, risk-based reviews, and traceability for incidents and escalations.",
                                    },
                                    {
                                        head: "Service lines covered",
                                        body:
                                            "Rides, scheduled rides, school runs, campus travel, deliveries to/from schools, and institution-managed logistics.",
                                    },
                                    {
                                        head: "Integration with core policies",
                                        body:
                                            "This addendum supplements Terms, Acceptable Use, and Safety Guidelines. If rules conflict, the stricter rule applies.",
                                    },
                                ]}
                            />

                            <Callout title="Non-negotiable principle">
                                Minors and students are not treated as “normal rides.” The platform applies heightened expectations and heightened enforcement.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="definitions"
                            eyebrow="Clarity"
                            title="2. Key Definitions"
                            subtitle="Shared definitions reduce confusion and strengthen enforcement."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Minor",
                                        body:
                                            "A person under the age of majority in the relevant jurisdiction. Where laws differ, the higher-protection interpretation applies.",
                                    },
                                    {
                                        head: "Student",
                                        body:
                                            "A learner enrolled in an educational institution (primary, secondary, tertiary, vocational, or equivalent).",
                                    },
                                    {
                                        head: "Guardian",
                                        body:
                                            "A parent or legal guardian with authority to consent to transport and to approve authorized pickup/drop-off contacts.",
                                    },
                                    {
                                        head: "Institution",
                                        body:
                                            "A school, campus, training center, or education provider authorized to coordinate transport under this addendum.",
                                    },
                                    {
                                        head: "Authorized pickup/drop-off",
                                        body:
                                            "Locations and people pre-approved by a guardian/institution; not “whoever is nearby,” not “a friend,” not “a stranger.”",
                                    },
                                    {
                                        head: "School zone / campus zone",
                                        body:
                                            "Designated boundaries where special rules apply (entry points, security gates, drop-off bays, pickup queues).",
                                    },
                                ]}
                            />

                            <Callout title="Why definitions matter">
                                Safety rules are enforceable only when terms are precise. These definitions guide investigations, training, and account actions.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="authorization"
                            eyebrow="Permission"
                            title="3. Guardian & Institutional Authorization"
                            subtitle="No authorization, no trip. Authorization is a safety requirement, not an administrative preference."
                        >
                            <p>
                                Any transport involving minors requires explicit authorization by a parent/legal guardian or an approved institution.
                                Unauthorized transport, ambiguous handoffs, or “I’m helping a friend” narratives are not acceptable under this addendum.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Guardian consent (baseline)",
                                        body:
                                            "A guardian must initiate or approve the trip where required, confirm pickup/drop-off locations, and validate the authorized recipient.",
                                    },
                                    {
                                        head: "Institutional authorization (where applicable)",
                                        body:
                                            "Schools/campuses may require institutional verification, roster matching, pickup windows, or security gate procedures.",
                                    },
                                    {
                                        head: "Authorized contact controls",
                                        body:
                                            "Guardians/institutions should designate who can receive the child/student. Drivers may require confirmation at handoff.",
                                    },
                                    {
                                        head: "Documentation expectations",
                                        body:
                                            "Where permitted and required, we may request documentation to validate authorization, resolve disputes, or investigate incidents.",
                                    },
                                ]}
                            />

                            <Callout title="Strict prohibition">
                                A driver/courier must not proceed if authorization is unclear, if pickup/destination appears deceptive, or if a handoff recipient is not authorized.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="eligibility"
                            eyebrow="Age rules"
                            title="4. Eligibility & Age Rules"
                            subtitle="Account ownership, student programs, and jurisdiction variability are handled conservatively for safety."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Account ownership",
                                        body:
                                            "Minors may be restricted from creating independent accounts. Where permitted, guardian-managed accounts and controls may apply.",
                                    },
                                    {
                                        head: "Student verification programs",
                                        body:
                                            "Student services may require institutional verification, student ID checks, campus email validation, or program enrollment.",
                                    },
                                    {
                                        head: "Jurisdiction differences",
                                        body:
                                            "Age thresholds, consent rules, and student transport laws vary. The stricter standard applies unless explicitly stated otherwise.",
                                    },
                                    {
                                        head: "Risk-based restrictions",
                                        body:
                                            "We may restrict features (late-night pickups, unverified destinations, certain delivery categories) for youth safety.",
                                    },
                                ]}
                            />

                            <Callout title="Operational reality">
                                Some regions require additional safeguarding flows. If you see “extra steps,” it is a safety measure, not friction for friction’s sake.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="products"
                            eyebrow="Use cases"
                            title="5. Covered Services & Use Cases"
                            subtitle="This addendum applies to any youth-associated movement—direct or indirect."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "School runs and daily commutes",
                                        body:
                                            "Home-to-school, school-to-home, and multi-stop schedules (where supported) with controlled pickup windows.",
                                    },
                                    {
                                        head: "Campus movement",
                                        body:
                                            "Dorm-to-class, library-to-hostel, campus event transport, gate-to-faculty routing, and shuttle-like patterns.",
                                    },
                                    {
                                        head: "Tutoring, lessons, and extracurriculars",
                                        body:
                                            "Sports, music, training sessions, exam centers, and youth events requiring verified handoff procedures.",
                                    },
                                    {
                                        head: "Delivery to/from institutions",
                                        body:
                                            "Food or goods deliveries to schools/campuses must comply with school-zone rules and authorized recipient policies.",
                                    },
                                ]}
                            />

                            <Callout title="School zones are special zones">
                                Institutions may require drop-off bays, security confirmations, and no-idling rules. Drivers and riders must respect them.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="pickup"
                            eyebrow="Handoffs"
                            title="6. Pickup & Drop-off Controls"
                            subtitle="Controlled handoffs prevent the most common real-world risks."
                        >
                            <p>
                                Pickups and drop-offs involving minors/students must occur at approved locations and with authorized recipients.
                                Drivers may refuse or terminate trips where safety or authorization is unclear.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Approved pickup points",
                                        body:
                                            "Use clearly identifiable pickup points (school gate, security post, dorm entrance). Avoid isolated or hidden locations.",
                                    },
                                    {
                                        head: "No unknown recipient handoff",
                                        body:
                                            "Do not release a minor to an unverified person. If in doubt, contact guardian/institution and use reporting tools.",
                                    },
                                    {
                                        head: "No route deviation for “quick stops”",
                                        body:
                                            "Avoid unapproved stops, detours, or private errands unless explicitly authorized through the platform where available.",
                                    },
                                    {
                                        head: "Missed pickup protocols",
                                        body:
                                            "If a minor/student does not appear, do not search in secluded areas. Follow platform guidance and contact the authorized party.",
                                    },
                                ]}
                            />

                            <Callout title="Driver refusal is permitted">
                                Drivers may refuse a trip when pickup/drop-off appears unsafe or authorization cannot be confirmed, without penalty where policy allows.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="driver"
                            eyebrow="Professional duty"
                            title="7. Driver, Courier & Partner Responsibilities"
                            subtitle="Drivers/couriers must operate with strict boundaries and safeguarding discipline."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Professional boundaries",
                                        body:
                                            "No personal relationships, no flirtation, no private offers, no gifting, and no requests for contact outside trip needs.",
                                    },
                                    {
                                        head: "Route discipline",
                                        body:
                                            "Follow approved routes and stops. Avoid “shortcuts” through unsafe areas unless required by traffic/safety and consistent with policy.",
                                    },
                                    {
                                        head: "No unnecessary conversation",
                                        body:
                                            "Keep communication minimal, respectful, and trip-related. No intrusive questions about home address, family, or personal life.",
                                    },
                                    {
                                        head: "Partner fleet accountability",
                                        body:
                                            "Fleet owners and partners must ensure training, supervision, vehicle readiness, and immediate escalation of any incident.",
                                    },
                                ]}
                            />

                            <Callout title="Training expectation">
                                6Ride may require additional training modules for youth transport eligibility and may revoke eligibility based on risk signals.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="conduct"
                            eyebrow="Boundaries"
                            title="8. Conduct Standards & Boundaries"
                            subtitle="Any boundary violation is treated as high severity."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "No harassment or grooming",
                                        body:
                                            "Any behavior that suggests grooming, coercion, manipulation, or inappropriate attention results in immediate investigation and likely termination.",
                                    },
                                    {
                                        head: "No private meetings",
                                        body:
                                            "Drivers/couriers must not invite minors/students to private locations or “help with something” outside the trip.",
                                    },
                                    {
                                        head: "Communications controls",
                                        body:
                                            "Keep all communications in-app where possible. Do not request social media, photos, or off-platform chats.",
                                    },
                                    {
                                        head: "No intimidation or retaliation",
                                        body:
                                            "No threats, pressure, or retaliation for reporting concerns. Retaliation is a serious enforceable violation.",
                                    },
                                ]}
                            />

                            <Callout title="Strict enforcement note">
                                Even a single credible incident can trigger immediate suspension while we investigate. Safety is prioritized over convenience.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="monitoring"
                            eyebrow="Visibility"
                            title="9. Safety Monitoring & Reporting"
                            subtitle="We encourage guardian/institution visibility and clear, fast reporting channels."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Guardian and school reporting",
                                        body:
                                            "Guardians/institutions may report concerns through official channels. We may request trip references and relevant evidence.",
                                    },
                                    {
                                        head: "Risk-based monitoring",
                                        body:
                                            "We may flag accounts for additional review where patterns suggest risk (repeat cancellations, route anomalies, unusual messaging).",
                                    },
                                    {
                                        head: "Evidence integrity",
                                        body:
                                            "Do not fabricate or alter evidence. False reporting is treated as a serious integrity violation.",
                                    },
                                    {
                                        head: "Privacy-aware processes",
                                        body:
                                            "We limit internal access to sensitive data and follow applicable privacy obligations when handling youth-related reports.",
                                    },
                                ]}
                            />

                            <Callout title="How to report">
                                Use the <a href="/policies/contact" className="underline decoration-black/30 hover:decoration-black/60">Contact</a>{" "}
                                page or in-app reporting (where available). For urgent danger, follow local emergency guidance and then inform 6Ride.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="emergency"
                            eyebrow="Urgent situations"
                            title="10. Emergencies Involving Minors"
                            subtitle="Emergencies involving minors require immediate seriousness, truthful reporting, and cooperation."
                        >
                            <p>
                                If a credible emergency occurs during a youth-related trip (medical situation, immediate safety threat, missing handoff recipient, or credible danger),
                                users must act responsibly and provide truthful details. Emergency tooling (where offered) may be gated by eligibility rules,
                                including verified membership and active emergency subscription.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Immediate actions",
                                        body:
                                            "Move to a safe public location when appropriate, follow platform guidance, and contact the authorized guardian/institution promptly.",
                                    },
                                    {
                                        head: "No misuse of emergency",
                                        body:
                                            "Emergency tools must not be triggered for disputes, lateness, price arguments, or retaliation. Misuse harms real response capacity.",
                                    },
                                    {
                                        head: "Cooperation requirements",
                                        body:
                                            "If an emergency is initiated, you must cooperate with safety checks and provide accurate information.",
                                    },
                                    {
                                        head: "Escalation where required",
                                        body:
                                            "We may escalate to relevant authorities where required by law or where credible risk to life/safety is identified.",
                                    },
                                ]}
                            />

                            <Callout title="Safeguarding priority">
                                When minors are involved, we apply heightened scrutiny. We may pause accounts immediately while verifying facts to prevent harm.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="violations"
                            eyebrow="Consequences"
                            title="11. Violations & Enforcement"
                            subtitle="Youth safety violations are treated as among the highest severity categories on the platform."
                        >
                            <p>
                                Violations of this addendum may result in immediate enforcement actions—often without warning—due to the elevated safeguarding risk.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Immediate suspension",
                                        body:
                                            "Accounts may be suspended immediately during investigation where risk signals are credible or severe.",
                                    },
                                    {
                                        head: "Permanent termination",
                                        body:
                                            "Boundary violations, unauthorized transport, grooming signals, or intimidation can trigger permanent removal.",
                                    },
                                    {
                                        head: "Loss of access and earnings",
                                        body:
                                            "Where permitted, we may restrict access, remove incentives, and withhold payouts linked to policy-violating activity.",
                                    },
                                    {
                                        head: "Legal cooperation",
                                        body:
                                            "We may cooperate with law enforcement or regulators in response to valid legal process or safety emergencies.",
                                    },
                                ]}
                            />

                            <Callout title="Zero tolerance examples">
                                Unauthorized handoff, inappropriate interaction, harassment, coercion, exploitation, or deliberate concealment of youth-related trip details.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="geo"
                            eyebrow="Worldwide"
                            title="12. Global Operations & Local Law"
                            subtitle="Local law governs each city/region; this addendum establishes a global minimum safeguarding standard."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Local rules apply",
                                        body:
                                            "School transport laws, consent rules, and student safeguarding requirements vary. You must comply with your location’s rules.",
                                    },
                                    {
                                        head: "Stricter standard prevails",
                                        body:
                                            "If local practice is weaker than this addendum, we still enforce the stricter platform standard to protect minors.",
                                    },
                                    {
                                        head: "HQ reference",
                                        body:
                                            `Administrative headquarters: ${HQ_LOCATION}. Operational support may be distributed as 6Ride expands globally.`,
                                    },
                                    {
                                        head: "Institution procedures",
                                        body:
                                            "Some campuses require gate passes, pick-up codes, staff sign-out logs, or time windows. Respect them without exception.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="changes"
                            eyebrow="Updates"
                            title="13. Policy Updates"
                            subtitle="Updates are reflected via the “Last updated” date and may be announced depending on materiality."
                        >
                            <p>
                                We may update this addendum to reflect evolving safety standards, regulatory requirements, or new service lines.
                                When we do, we update the “Last updated” date at the top of this page.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Material changes",
                                        body:
                                            "Significant changes (authorization flows, handoff controls, enforcement rules) may be accompanied by additional notices.",
                                    },
                                    {
                                        head: "Operational note (automation)",
                                        body:
                                            "Set NEXT_PUBLIC_POLICY_BUILD_DATE=YYYY-MM-DD in your deployment environment when you update this page to reflect the current date.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <div className="mt-6 rounded-3xl border border-black/10 bg-white/[0.55] p-5 text-xs text-black/60 backdrop-blur">
                            This addendum forms part of the 6Ride Terms of Service, Acceptable Use Policy, and Safety Guidelines. Where this addendum sets
                            higher safeguards for minors and students, those safeguards apply across all 6Ride services and regions.
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
