// app/policies/emergency-disclaimer/page.tsx
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

export default function EmergencyDisclaimerPage() {
    const { effectiveDate, lastUpdated } = usePolicyDates();
    const [mobileTocOpen, setMobileTocOpen] = useState(false);

    const toc: TocItem[] = useMemo(
        () => [
            { id: "purpose", label: "1. Purpose of This Disclaimer", note: "What emergency support means on 6Ride and what it does not mean." },
            { id: "eligibility", label: "2. Eligibility: Members & Subscribers Only", note: "Emergency ride access is restricted to eligible users." },
            { id: "not-medical", label: "3. Not a Hospital or Ambulance Provider", note: "We are not a medical facility and do not provide treatment." },
            { id: "scope", label: "4. Emergency Ride Support Scope", note: "Transportation coordination only—no diagnosis, rescue, or clinical care." },
            { id: "user-duties", label: "5. User Responsibilities in Emergencies", note: "Call local emergency services first and provide accurate information." },
            { id: "limits", label: "6. Service Limitations & Operational Constraints", note: "Traffic, weather, supply, verification, and local restrictions." },
            { id: "liability", label: "7. Limitation of Liability", note: "Allocation of risk within lawful bounds." },
            { id: "authorities", label: "8. Authorities & Legal Cooperation", note: "We may cooperate with authorities when required by law or safety." },
            { id: "global", label: "9. Global Service Areas", note: `Applies in all regions where 6Ride operates; HQ: ${HQ_LOCATION}.` },
            { id: "contact", label: "10. Emergency Contact Channels", note: "How to reach emergency@6rides.com and support for emergency matters." },
            { id: "changes", label: "11. Updates to This Disclaimer", note: "How last-updated is reflected and how notice may be given." },
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
                                <span>6Ride Emergency Ride Program</span>
                            </div>

                            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                                Emergency Services Disclaimer
                            </h1>

                            <p className="mt-3 max-w-3xl text-sm leading-6 text-black/70">
                                This Emergency Services Disclaimer clarifies the scope and limitations of emergency-related support provided through the 6Ride platform.
                                6Ride is a transportation service. We are not a hospital, we do not operate ambulances, and we do not affiliate with hospitals.
                                Our emergency-focused offering is a humanitarian transport coordination service, available only to eligible 6Clement Joshua members
                                with an active Emergency Response subscription (where required by the feature).
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
                                <InlineTag>Members + subscribers only</InlineTag>
                            </div>

                            <EmailChip email="emergency@6rides.com" label="Emergency" />
                            <EmailChip email="support@6rides.com" label="Support" />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <BevelButton href="/policies/terms">Terms</BevelButton>
                            <BevelButton href="/policies/safety">Safety</BevelButton>
                            <BevelButton href="/policies/acceptable-use">Acceptable Use</BevelButton>
                            <BevelButton href="/policies/contact">Contact</BevelButton>
                        </div>
                    </div>

                    {/* premium signal cards */}
                    <div className="mt-7 grid gap-3 md:grid-cols-3">
                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Transportation only</div>
                                <div className="mt-1 text-sm text-black/75">
                                    We coordinate rides. We do not diagnose, treat, or provide clinical emergency services.
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Restricted access</div>
                                <div className="mt-1 text-sm text-black/75">
                                    Emergency Ride features may be available only to verified 6Clement Joshua members with active subscription.
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Call local emergency first</div>
                                <div className="mt-1 text-sm text-black/75">
                                    In life-threatening emergencies, contact local emergency services immediately. Then contact 6Ride.
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
                                        This program is humanitarian transport coordination. It is not clinical care, not an ambulance, and not a hospital affiliation.
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
                            eyebrow="Purpose"
                            title="1. Purpose of This Disclaimer"
                            subtitle="Transparency: what 6Ride emergency support is—and what it is not."
                        >
                            <p>
                                The 6Ride Emergency Ride Program is a humanitarian transportation coordination offering intended to help eligible users get
                                from one place to another faster during urgent situations. This disclaimer exists to prevent confusion about the nature of the service,
                                to ensure users contact the correct emergency authorities, and to clearly define responsibilities.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "What we provide",
                                        body:
                                            "Ride coordination and transport assistance (where available) through the 6Ride platform and approved drivers/partners.",
                                    },
                                    {
                                        head: "What we do not provide",
                                        body:
                                            "Medical care, diagnosis, treatment, rescue operations, firefighting, policing, or clinical emergency response.",
                                    },
                                    {
                                        head: "No hospital affiliation",
                                        body:
                                            "6Ride does not operate hospitals and does not affiliate with hospitals. Users select destinations at their discretion.",
                                    },
                                    {
                                        head: "Global applicability",
                                        body:
                                            "This disclaimer applies in every city/region where 6Ride operates, regardless of local naming or marketing.",
                                    },
                                ]}
                            />

                            <Callout title="If you are unsure">
                                Treat it as a real emergency: contact local emergency services first. Then contact 6Ride for transport coordination.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="eligibility"
                            eyebrow="Eligibility"
                            title="2. Eligibility: Members & Subscribers Only"
                            subtitle="Emergency ride support is restricted to verified users to ensure integrity and manageable response capacity."
                        >
                            <p>
                                Emergency Ride features may be restricted to verified 6Clement Joshua members and users with an active Emergency Response subscription.
                                This restriction exists to prevent abuse, protect response capacity, and enable stronger verification and accountability.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Membership requirement",
                                        body:
                                            "Eligibility may require a verified membership profile and compliance with platform verification processes.",
                                    },
                                    {
                                        head: "Active subscription requirement",
                                        body:
                                            "Some emergency features may require an active Emergency Response subscription, subject to plan availability in your region.",
                                    },
                                    {
                                        head: "No bypass attempts",
                                        body:
                                            "Impersonation, account sharing, or attempts to bypass eligibility controls may lead to suspension or termination.",
                                    },
                                    {
                                        head: "Always-available safety reporting",
                                        body:
                                            "Even if you cannot use emergency ride features, you can still report safety incidents through support/safety channels.",
                                    },
                                ]}
                            />

                            <Callout title="Why verification exists">
                                Emergency workflows are sensitive. Restricting access helps prevent fraud and prioritizes legitimate users.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="not-medical"
                            eyebrow="Not clinical care"
                            title="3. Not a Hospital or Ambulance Provider"
                            subtitle="6Ride is not a healthcare organization and does not deliver clinical emergency services."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Not a hospital",
                                        body:
                                            "We do not operate hospitals, clinics, or medical facilities and do not admit, diagnose, or treat patients.",
                                    },
                                    {
                                        head: "Not an ambulance service",
                                        body:
                                            "We do not provide paramedic services, emergency medical transport standards, or medical equipment.",
                                    },
                                    {
                                        head: "Not a public emergency agency",
                                        body:
                                            "We are not police, fire, or a government emergency response agency.",
                                    },
                                    {
                                        head: "No hospital affiliation",
                                        body:
                                            "We do not represent, partner with, or affiliate with any hospital as a default service arrangement.",
                                    },
                                ]}
                            />

                            <Callout title="Destination choice is yours">
                                You decide where you are going. 6Ride coordinates transport; we do not “assign” hospitals or guarantee hospital acceptance.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="scope"
                            eyebrow="Scope"
                            title="4. Emergency Ride Support Scope"
                            subtitle="Transportation coordination only—no diagnosis, rescue, or emergency instruction."
                        >
                            <p>
                                Emergency-related assistance offered by 6Ride is limited to coordinating transportation where possible, subject to driver availability,
                                route feasibility, and verification. We do not provide medical, legal, or emergency instruction.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Covered support (examples)",
                                        body:
                                            "Coordinating a ride from your location to your selected destination; prioritizing dispatch flows where offered.",
                                    },
                                    {
                                        head: "Not covered",
                                        body:
                                            "Medical advice, rescue operations, forced entry, evacuation, or any form of clinical emergency care.",
                                    },
                                    {
                                        head: "Service lines impacted",
                                        body:
                                            "The disclaimer applies across rides and, where relevant, delivery/logistics coordination during urgent situations.",
                                    },
                                    {
                                        head: "Verification controls",
                                        body:
                                            "We may require additional confirmation steps to reduce fraud and ensure safe handling of emergency claims.",
                                    },
                                ]}
                            />

                            <Callout title="Operational reality">
                                “Emergency” does not override physics, traffic, weather, or local restrictions. We will assist where feasible, but outcomes can vary.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="user-duties"
                            eyebrow="Your responsibilities"
                            title="5. User Responsibilities in Emergencies"
                            subtitle="Fastest outcomes happen when users contact the correct emergency authorities and share accurate details."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Call local emergency services first",
                                        body:
                                            "If the situation is life-threatening or requires immediate intervention, contact local emergency services before contacting 6Ride.",
                                    },
                                    {
                                        head: "Provide accurate trip info",
                                        body:
                                            "Use correct pickup location, destination, and contact details. Inaccurate details may delay coordination.",
                                    },
                                    {
                                        head: "Act safely",
                                        body:
                                            "Move to a safe public location when appropriate; do not take actions that increase personal risk.",
                                    },
                                    {
                                        head: "No false claims",
                                        body:
                                            "False emergency claims and misuse of emergency workflows are enforceable violations.",
                                    },
                                ]}
                            />

                            <Callout title="Protect response capacity">
                                Misuse of emergency tools diverts resources from real urgent needs. We enforce against abuse to keep capacity for legitimate users.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="limits"
                            eyebrow="Limitations"
                            title="6. Service Limitations & Operational Constraints"
                            subtitle="Constraints exist in every city globally: supply, traffic, weather, and legal restrictions."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Traffic and road conditions",
                                        body:
                                            "Congestion, accidents, checkpoints, closures, and infrastructure limitations can delay arrival times.",
                                    },
                                    {
                                        head: "Driver supply and proximity",
                                        body:
                                            "Availability varies by city and time; emergency dispatch priority (if offered) is still constrained by supply.",
                                    },
                                    {
                                        head: "Verification and integrity holds",
                                        body:
                                            "We may place holds to confirm membership/subscription status and prevent fraudulent use.",
                                    },
                                    {
                                        head: "Local restrictions",
                                        body:
                                            "Curfews, restricted zones, weather emergencies, and public safety directives may limit service.",
                                    },
                                ]}
                            />

                            <Callout title="No guarantee of dispatch">
                                We aim to assist, but we do not guarantee that a vehicle will always be available in every location at every time.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="liability"
                            eyebrow="Legal"
                            title="7. Limitation of Liability"
                            subtitle="We limit liability within lawful bounds for outcomes driven by emergencies and third-party conditions."
                        >
                            <p>
                                To the maximum extent permitted by law, 6Ride is not liable for outcomes arising from emergency situations, delays, or third-party actions,
                                including traffic, weather, infrastructure limitations, user-provided inaccuracies, or actions by authorities and other third parties.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "No outcome guarantees",
                                        body:
                                            "We do not guarantee medical outcomes, arrival times, acceptance by any facility, or availability of public services.",
                                    },
                                    {
                                        head: "Third-party dependencies",
                                        body:
                                            "Network outages, maps/payment provider issues, and external disruptions may affect coordination and timing.",
                                    },
                                    {
                                        head: "User decisions",
                                        body:
                                            "Users remain responsible for decisions during emergencies, including contacting authorities and choosing destinations.",
                                    },
                                    {
                                        head: "Consumer rights preserved",
                                        body:
                                            "Nothing in this disclaimer limits non-waivable consumer rights under applicable law.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="authorities"
                            eyebrow="Cooperation"
                            title="8. Authorities & Legal Cooperation"
                            subtitle="We may cooperate with authorities when required by law or to prevent imminent harm."
                        >
                            <p>
                                6Ride may cooperate with relevant authorities when required by law, pursuant to valid legal process, or to respond to credible, imminent safety threats.
                                This does not mean 6Ride is a public emergency service or affiliated with hospitals.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Legal process",
                                        body:
                                            "We respond to valid legal process and regulatory requirements, consistent with applicable law.",
                                    },
                                    {
                                        head: "Imminent harm",
                                        body:
                                            "Where permitted, we may provide limited information to prevent imminent harm or respond to a credible emergency threat.",
                                    },
                                    {
                                        head: "Privacy-aware handling",
                                        body:
                                            "We attempt to limit data disclosure to what is lawful, necessary, and proportionate.",
                                    },
                                    {
                                        head: "No informal demands",
                                        body:
                                            "We do not respond to informal requests sent via personal messages or unofficial channels.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="global"
                            eyebrow="Global"
                            title="9. Global Service Areas"
                            subtitle="This disclaimer applies across all 6Ride operating regions, cities, and service lines."
                        >
                            <p>
                                6Ride may operate across multiple regions globally. This disclaimer applies wherever the 6Ride platform is available, including all cities in Nigeria
                                and international service areas, whether for rides, delivery, or structured enterprise transport programs.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Cross-border consistency",
                                        body:
                                            "We keep a global minimum standard: transportation coordination only; no clinical or agency replacement.",
                                    },
                                    {
                                        head: "Local law still applies",
                                        body:
                                            "Emergency numbers, public response systems, and legal obligations differ by country and city.",
                                    },
                                    {
                                        head: "HQ reference",
                                        body:
                                            `Administrative headquarters: ${HQ_LOCATION}. Operations may be distributed across regions as the platform expands.`,
                                    },
                                    {
                                        head: "Service lines covered",
                                        body:
                                            "Passenger rides, driver services, bookings, scheduled trips, enterprise programs, and (where offered) deliveries.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="contact"
                            eyebrow="Contact"
                            title="10. Emergency Contact Channels"
                            subtitle="Use emergency@6rides.com for emergency ride matters; support remains available for all users."
                        >
                            <p>
                                For emergency ride coordination questions or issues related to the Emergency Ride Program, contact the dedicated emergency channel.
                                For non-urgent matters (subscriptions, billing, account access), use support.
                            </p>

                            <div className="mt-3 rounded-3xl border border-black/10 bg-white/[0.55] p-5 backdrop-blur">
                                <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-18px_28px_rgba(0,0,0,0.06)]" />
                                <div className="relative">
                                    <EmailChip email="emergency@6rides.com" label="Emergency" />
                                    <EmailChip email="support@6rides.com" label="Support" />

                                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                                        <div className="rounded-2xl border border-black/10 bg-white/[0.50] p-4">
                                            <div className="text-xs font-semibold text-black/65">Use emergency@6rides.com for</div>
                                            <ul className="mt-2 space-y-2 text-sm text-black/70">
                                                {[
                                                    "Emergency ride feature access issues for eligible members/subscribers",
                                                    "Active emergency ride coordination problems (pickup confusion, destination changes, safety escalations)",
                                                    "Post-incident documentation requests related to an emergency ride",
                                                    "Reports of emergency workflow misuse or impersonation",
                                                ].map((x) => (
                                                    <li key={x} className="flex gap-2">
                                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/30" />
                                                        <span>{x}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="rounded-2xl border border-black/10 bg-white/[0.50] p-4">
                                            <div className="text-xs font-semibold text-black/65">Use support@6rides.com for</div>
                                            <ul className="mt-2 space-y-2 text-sm text-black/70">
                                                {[
                                                    "Billing, subscription renewals, cancellations, and refunds",
                                                    "Account access, verification, and device changes",
                                                    "General trip support (non-emergency rides, delivery support)",
                                                    "Questions about policies, enterprise programs, or reporting",
                                                ].map((x) => (
                                                    <li key={x} className="flex gap-2">
                                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/30" />
                                                        <span>{x}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <Callout title="If immediate danger exists">
                                        Contact your local emergency services first. Email should not be your first step for life-threatening emergencies.
                                    </Callout>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard
                            id="changes"
                            eyebrow="Updates"
                            title="11. Updates to This Disclaimer"
                            subtitle="We update the last-updated date when we change the document."
                        >
                            <p>
                                We may update this disclaimer to reflect product changes, eligibility updates, or evolving regulatory guidance.
                                When we update it, we update the “Last updated” date at the top.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Material changes",
                                        body:
                                            "For significant changes, we may provide additional notice within the app or to members where feasible.",
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
                            This disclaimer supplements the 6Ride Terms of Service and Safety Guidelines. 6Ride emergency support is limited to transportation coordination.
                            6Ride is not a hospital and does not affiliate with hospitals. Emergency ride access may be limited to eligible 6Clement Joshua members
                            with an active Emergency Response subscription.
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
