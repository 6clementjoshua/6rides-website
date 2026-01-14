// app/policies/safety/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

type TocItem = { id: string; label: string; note: string };
type GridItem = { head: string; body: string };
type RuleCard = { title: string; bullets: string[]; note?: string };
type FeatureRow = { feature: string; howItHelps: string; expectations: string };

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

function FeatureTable({ rows }: { rows: FeatureRow[] }) {
    return (
        <div className="mt-4 overflow-hidden rounded-3xl border border-black/10 bg-white/[0.55] backdrop-blur">
            <div className="relative overflow-x-auto">
                <table className="min-w-[980px] w-full text-left text-sm">
                    <thead className="bg-white/[0.55]">
                        <tr className="border-b border-black/10">
                            <th className="px-5 py-4 text-xs font-semibold text-black/70">Safety feature / control</th>
                            <th className="px-5 py-4 text-xs font-semibold text-black/70">How it helps</th>
                            <th className="px-5 py-4 text-xs font-semibold text-black/70">What we expect from users/partners</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r) => (
                            <tr key={r.feature} className="border-b border-black/10 last:border-b-0">
                                <td className="px-5 py-4 font-semibold text-black/80">{r.feature}</td>
                                <td className="px-5 py-4 text-black/70">{r.howItHelps}</td>
                                <td className="px-5 py-4 text-black/70">{r.expectations}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function SafetyGuidelinesPage() {
    const { effectiveDate, lastUpdated } = usePolicyDates();
    const [mobileTocOpen, setMobileTocOpen] = useState(false);

    const toc: TocItem[] = useMemo(
        () => [
            { id: "principles", label: "1. Safety Principles", note: "The non-negotiables: safety over speed, trust, and accountability." },
            { id: "mutual-respect", label: "2. Mutual Respect", note: "Anti-harassment, anti-discrimination, and respectful communication." },
            { id: "rider-safety", label: "3. Rider Safety", note: "Before, during, and after the trip—what riders should do." },
            { id: "driver-safety", label: "4. Driver & Partner Safety", note: "Protecting partners, refusing unsafe trips, fatigue and impairment rules." },
            { id: "vehicle-safety", label: "5. Vehicle Safety Standards", note: "Roadworthiness, cleanliness, inspections, and insurance expectations." },
            { id: "road", label: "6. Road & Traffic Compliance", note: "Local laws in Nigeria/Cross River and global compliance where operating." },
            { id: "minors", label: "7. Minors & Student Safety", note: "Guardian/institution authorization and strict pickup/drop-off rules." },
            { id: "emergency", label: "8. Emergency Situations", note: "When to call local responders; what 6Ride can and cannot do." },
            { id: "reporting", label: "9. Reporting Safety Concerns", note: "How to report, what evidence helps, and response expectations." },
            { id: "investigation", label: "10. Investigation & Enforcement", note: "How we investigate and enforce; suspensions/terminations." },
            { id: "law", label: "11. Law Enforcement Cooperation", note: "Cooperation with lawful requests and public safety needs." },
            { id: "wellbeing", label: "12. Community Wellbeing", note: "A calm, responsible culture that protects everyone." },
            { id: "updates", label: "13. Updates to These Guidelines", note: "How updates work and how to stay informed." },
        ],
        []
    );

    const featureRows: FeatureRow[] = useMemo(
        () => [
            {
                feature: "Identity & account controls",
                howItHelps: "Reduces impersonation, fraud, and repeated abuse across accounts.",
                expectations: "Use accurate information; keep your account secure; never share verification codes.",
            },
            {
                feature: "Trip records & timestamps",
                howItHelps: "Enables fair dispute review and helps investigate safety incidents.",
                expectations: "Use in-app booking; avoid off-platform arrangements that remove protections.",
            },
            {
                feature: "Location & routing signals",
                howItHelps: "Supports dispatch, safety checks, and trip verification where permitted.",
                expectations: "Enable location when using the service; do not falsify GPS or spoof location.",
            },
            {
                feature: "Partner standards & enforcement",
                howItHelps: "Improves reliability and safety by removing bad actors and enforcing professionalism.",
                expectations: "Partners must comply with conduct, vehicle, and legal standards at all times.",
            },
            {
                feature: "Reporting and escalation pathways",
                howItHelps: "Allows users to report issues quickly and enables timely action.",
                expectations: "Report accurately; provide trip ID and evidence when possible; do not file false reports.",
            },
            {
                feature: "Emergency ride coordination (subscription-based)",
                howItHelps: "Coordinates urgent transport for eligible members/subscribed emergency users.",
                expectations: "Call local emergency services for life-threatening issues; do not misuse emergency dispatch.",
            },
        ],
        []
    );

    const respectRules: RuleCard[] = useMemo(
        () => [
            {
                title: "Zero tolerance for harassment and threats",
                bullets: [
                    "No threats, intimidation, stalking, or coercion.",
                    "No sexual harassment or unwanted advances.",
                    "No hate speech or discrimination based on protected characteristics.",
                    "No doxxing, blackmail, or sharing personal data without consent.",
                ],
                note: "Violations can lead to immediate suspension or termination and may be reported to authorities where required.",
            },
            {
                title: "Respectful communication expectations",
                bullets: [
                    "Use calm, professional language in chat/calls.",
                    "Keep communications trip-related (pickup coordination, safety, delivery instructions).",
                    "Do not contact users outside a trip/delivery context.",
                    "Do not pressure anyone to break rules (speeding, unsafe stops, illegal items).",
                ],
            },
        ],
        []
    );

    const riderRules: RuleCard[] = useMemo(
        () => [
            {
                title: "Before you enter the vehicle",
                bullets: [
                    "Confirm the vehicle matches the app details (plate/model where shown).",
                    "Confirm the driver/partner identity indicators in-app where available.",
                    "Do not accept off-platform price negotiations that remove protections.",
                    "Choose a safe pickup point (lit, public area where possible).",
                ],
            },
            {
                title: "During the trip",
                bullets: [
                    "Wear a seatbelt where provided and follow basic safety instructions.",
                    "Do not pressure partners to speed, take illegal turns, or violate traffic laws.",
                    "Do not distract the driver (avoid aggressive arguments or unsafe demands).",
                    "Report unsafe behavior promptly through official channels.",
                ],
            },
            {
                title: "After the trip",
                bullets: [
                    "Report lost items promptly; keep communications factual and specific.",
                    "Rate honestly and provide constructive feedback.",
                    "Do not retaliate with false reports—this is enforceable abuse.",
                ],
            },
        ],
        []
    );

    const partnerRules: RuleCard[] = useMemo(
        () => [
            {
                title: "Refuse or end unsafe trips",
                bullets: [
                    "You may refuse trips that appear unsafe, unlawful, or involve prohibited items.",
                    "You may end trips if safety becomes compromised (seek a safe stopping point).",
                    "Do not engage in arguments; use calm de-escalation and report through support.",
                    "Do not carry weapons or illegal items while operating on the platform.",
                ],
            },
            {
                title: "Impairment, fatigue, and fitness to drive",
                bullets: [
                    "No driving under the influence of alcohol, drugs, or impairing substances.",
                    "No operating while dangerously fatigued or medically unfit to drive.",
                    "Take breaks and follow local road safety best practices.",
                    "Maintain a safe driving posture and minimize phone use while driving (hands-free where legal).",
                ],
                note: "Impairment violations are treated as severe and may lead to permanent removal.",
            },
            {
                title: "Professional conduct and boundaries",
                bullets: [
                    "Keep conversations respectful and trip-focused.",
                    "No solicitation, harassment, or off-app contact with riders.",
                    "No cash diversion or “pay me directly” attempts unless explicitly allowed by local 6Ride rules.",
                    "Do not share rider data or trip details outside service needs.",
                ],
            },
        ],
        []
    );

    const vehicleRules: RuleCard[] = useMemo(
        () => [
            {
                title: "Vehicle roadworthiness",
                bullets: [
                    "Maintain mechanical soundness (brakes, tyres, lights, wipers, horn).",
                    "Keep valid registrations, permits, and documentation as required by law.",
                    "Maintain required insurance coverage for your jurisdiction and category.",
                    "Keep the interior clean and free of hazards (loose items, sharp objects).",
                ],
            },
            {
                title: "Safety equipment and standards (where applicable)",
                bullets: [
                    "Seatbelts must be functional where provided.",
                    "Fire extinguisher/first aid kit where required by local rules or programs.",
                    "Child restraints when legally required and properly available.",
                    "Delivery boxes and cargo restraints must be secured for food/goods deliveries.",
                ],
                note: "Vehicle requirements may vary by category (car, bike delivery, premium tiers) and local regulation.",
            },
        ],
        []
    );

    const roadRules: RuleCard[] = useMemo(
        () => [
            {
                title: "Traffic law compliance",
                bullets: [
                    "All partners must comply with Nigerian federal traffic laws, Cross River State regulations, municipal rules, and international laws where operating.",
                    "No reckless driving, dangerous overtaking, illegal U-turns, or red-light violations.",
                    "No speeding or aggressive driving behavior.",
                    "Follow road closures, weather advisories, and safety instructions from authorities.",
                ],
            },
            {
                title: "Routing, stops, and safe pickup/drop-off",
                bullets: [
                    "Use safe pickup/drop-off points; avoid unsafe stops that endanger passengers or traffic.",
                    "Route changes should be agreed in-app where possible and remain lawful.",
                    "Do not deviate to unauthorized locations for improper purposes.",
                    "If you feel unsafe, prioritize a public, well-lit area and contact support.",
                ],
            },
        ],
        []
    );

    const minorsRules: RuleCard[] = useMemo(
        () => [
            {
                title: "Minors & student transport is strictly controlled",
                bullets: [
                    "Only permitted under verified guardian, school, or institutional authorization.",
                    "Pickup and drop-off must follow approved locations and authorized contacts.",
                    "Partners must never isolate a minor, request personal contact, or deviate from approved routing.",
                    "Any boundary violation triggers immediate suspension and investigation.",
                ],
                note: "See the Child & Student Safety Addendum for detailed safeguarding processes.",
            },
            {
                title: "Safe pickup/drop-off safeguards (recommended)",
                bullets: [
                    "Use well-lit pickup points with visible landmarks.",
                    "Authorized guardians/institutions should ensure the student is ready before partner arrival.",
                    "Avoid last-minute changes; if changes are needed, confirm through official channels.",
                    "Report concerns immediately; do not delay reporting.",
                ],
            },
        ],
        []
    );

    const emergencyRules: RuleCard[] = useMemo(
        () => [
            {
                title: "What to do in emergencies",
                bullets: [
                    "If life-threatening, call local emergency services immediately (police/ambulance/fire).",
                    "Use 6Ride emergency ride coordination if eligible and subscribed, for urgent transport coordination.",
                    "Follow instructions from authorities and prioritize safe locations.",
                    "Do not attempt to handle dangerous situations alone.",
                ],
                note: "6Ride is not a hospital, ambulance provider, police service, or fire department.",
            },
            {
                title: "Emergency ride coordination limitations",
                bullets: [
                    "Transport coordination only; no medical diagnosis or treatment.",
                    "Availability depends on local coverage, partner availability, and conditions.",
                    "Misuse of emergency dispatch is prohibited and enforceable.",
                    "We may share necessary trip details with authorities where required by law or public safety needs.",
                ],
            },
        ],
        []
    );

    const reportingGrid: GridItem[] = useMemo(
        () => [
            { head: "In-app reporting", body: "Use in-app safety/report tools when available to ensure the trip ID is attached automatically." },
            { head: "Contact channels", body: "Use the Contact page for non-urgent issues; provide trip ID, time, city, and a clear summary." },
            { head: "Evidence that helps", body: "Screenshots, photos (when safe/legal), receipts, and a timeline of what happened." },
            { head: "False reports prohibited", body: "Submitting false claims is abuse and can lead to suspension/termination." },
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
                                <span>6Ride Safety</span>
                            </div>

                            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Safety & Community Guidelines</h1>

                            <p className="mt-3 max-w-3xl text-sm leading-6 text-black/70">
                                Safety is the foundation of 6Ride. These guidelines explain how riders, drivers, partners, students, and all users are expected to behave to maintain a secure,
                                respectful, and lawful environment across all 6Ride services in Nigeria (including Cross River) and globally.
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
                                <InlineTag>Zero tolerance for violence/harassment</InlineTag>
                            </div>

                            <Callout title="How to use this document">
                                If you are a rider, focus on Rider Safety and Reporting. If you are a partner (driver/courier), focus on Partner Safety, Vehicle Standards, and Road Compliance.
                                If you operate a student program, read the Minors & Student Safety section and the Child & Student Safety Addendum.
                            </Callout>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <BevelButton href="/policies/terms">Terms</BevelButton>
                            <BevelButton href="/policies/acceptable-use">Acceptable Use</BevelButton>
                            <BevelButton href="/policies/privacy">Privacy</BevelButton>
                            <BevelButton href="/policies/partner-terms">Partner Terms</BevelButton>
                            <BevelButton href="/policies/contact">Contact</BevelButton>
                        </div>
                    </div>

                    {/* quick signal cards */}
                    <div className="mt-7 grid gap-3 md:grid-cols-3">
                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Safety over speed</div>
                                <div className="mt-1 text-sm text-black/75">No trip is worth risking life, injury, or legal breach.</div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Boundaries and respect</div>
                                <div className="mt-1 text-sm text-black/75">Harassment, discrimination, and threats are enforceable violations.</div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Report early</div>
                                <div className="mt-1 text-sm text-black/75">Early reporting helps prevent harm and supports fair investigation.</div>
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
                                        These guidelines work alongside Acceptable Use, Partner Terms, and the Child/Student Safety Addendum.
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
                            id="principles"
                            eyebrow="Principles"
                            title="1. Safety Principles"
                            subtitle="Non-negotiables for everyone using 6Ride."
                        >
                            <p>
                                6Ride is built on trust, accountability, and responsibility. Everyone using the platform is expected to prioritize safety over convenience, speed, or profit.
                                Where there is any conflict between “fast” and “safe,” safety wins.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Safety first", body: "No trip objective or schedule justifies reckless driving, unlawful behavior, or unsafe stops." },
                                    { head: "Respect and boundaries", body: "Treat others with dignity. Boundaries are mandatory, not optional." },
                                    { head: "Truthfulness", body: "Provide accurate pickup/destination and honest reports—false reports are abuse." },
                                    { head: "Compliance", body: "Follow local road laws and platform rules in every city where 6Ride operates." },
                                ]}
                            />

                            <Callout title="If you feel unsafe">
                                End the interaction as safely as possible, move to a public area, and report using official channels. For life-threatening situations, contact local emergency
                                services first.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="mutual-respect"
                            eyebrow="Respect"
                            title="2. Mutual Respect"
                            subtitle="A platform-wide standard for riders, partners, and staff."
                        >
                            <div className="mt-2 grid gap-3 lg:grid-cols-2">
                                {respectRules.map((r) => (
                                    <Rule key={r.title} r={r} />
                                ))}
                            </div>
                        </GlassCard>

                        <GlassCard
                            id="rider-safety"
                            eyebrow="Riders"
                            title="3. Rider Safety"
                            subtitle="Practical steps for safer trips."
                        >
                            <div className="mt-2 grid gap-3 lg:grid-cols-2">
                                {riderRules.map((r) => (
                                    <Rule key={r.title} r={r} />
                                ))}
                            </div>

                            <Callout title="Destination accuracy matters">
                                Entering the correct destination helps route planning, cost transparency, and safety. Avoid changing destinations off-platform.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="driver-safety"
                            eyebrow="Partners"
                            title="4. Driver & Partner Safety"
                            subtitle="Partner safety is community safety."
                        >
                            <div className="mt-2 grid gap-3 lg:grid-cols-2">
                                {partnerRules.map((r) => (
                                    <Rule key={r.title} r={r} />
                                ))}
                            </div>
                        </GlassCard>

                        <GlassCard
                            id="vehicle-safety"
                            eyebrow="Vehicles"
                            title="5. Vehicle Safety Standards"
                            subtitle="Roadworthy vehicles protect everyone."
                        >
                            <div className="mt-2 grid gap-3 lg:grid-cols-2">
                                {vehicleRules.map((r) => (
                                    <Rule key={r.title} r={r} />
                                ))}
                            </div>

                            <Callout title="Inspections and compliance">
                                6Ride may require physical or digital inspections and may restrict access for vehicles that fail to meet safety standards.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="road"
                            eyebrow="Road rules"
                            title="6. Road & Traffic Compliance"
                            subtitle="Compliance is mandatory in Cross River and globally."
                        >
                            <div className="mt-2 grid gap-3 lg:grid-cols-2">
                                {roadRules.map((r) => (
                                    <Rule key={r.title} r={r} />
                                ))}
                            </div>
                        </GlassCard>

                        <GlassCard
                            id="minors"
                            eyebrow="Safeguarding"
                            title="7. Minors & Student Safety"
                            subtitle="Strict rules apply for any service involving minors or students."
                        >
                            <div className="mt-2 grid gap-3 lg:grid-cols-2">
                                {minorsRules.map((r) => (
                                    <Rule key={r.title} r={r} />
                                ))}
                            </div>

                            <Callout title="Zero tolerance">
                                Any exploitation, harassment, or boundary violation involving minors is treated as a severe violation and may be escalated to authorities where required.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="emergency"
                            eyebrow="Emergency"
                            title="8. Emergency Situations"
                            subtitle="Call local responders first; 6Ride emergency coordination is not a replacement."
                        >
                            <div className="mt-2 grid gap-3 lg:grid-cols-2">
                                {emergencyRules.map((r) => (
                                    <Rule key={r.title} r={r} />
                                ))}
                            </div>

                            <Callout title="Membership/subscription note">
                                Emergency ride coordination is available only to eligible members and subscribed users of the emergency response feature, subject to coverage and availability.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="reporting"
                            eyebrow="Reporting"
                            title="9. Reporting Safety Concerns"
                            subtitle="Reporting quickly helps prevent harm and supports fair investigations."
                        >
                            <p>
                                Safety issues should be reported through the app when possible, or via the Contact page for non-urgent issues. Include trip ID, time, city, and a short timeline
                                of what happened. We review reports through safety and compliance processes.
                            </p>

                            <BulletGrid items={reportingGrid} />

                            <Callout title="Where to report">
                                For non-urgent safety reports, use the Contact page. For life-threatening situations, contact local emergency services immediately.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="investigation"
                            eyebrow="Enforcement"
                            title="10. Investigation & Enforcement"
                            subtitle="We may suspend or remove accounts to protect the community."
                        >
                            <p>
                                6Ride may investigate incidents, suspend accounts, restrict access, or permanently remove users or partners to protect the community. Investigations may consider
                                trip logs, communications, telemetry (where available), and evidence submitted.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Possible actions", body: "Warnings, temporary suspension, permanent removal, and loss of access to certain features." },
                                    { head: "Evidence-based review", body: "We rely on system records and evidence; false reports are enforceable violations." },
                                    { head: "Partner consequences", body: "Partners may be removed for safety violations, impairment, fraud, or harassment." },
                                    { head: "User consequences", body: "Users may be restricted for threats, abuse, fraud, or repeated policy violations." },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="law"
                            eyebrow="Legal"
                            title="11. Law Enforcement Cooperation"
                            subtitle="We cooperate with lawful requests and public safety needs."
                        >
                            <p>
                                Where required by law or public safety needs, 6Ride may cooperate with law enforcement and regulatory authorities. We may preserve or disclose information in
                                response to valid legal process or to address credible imminent harm, consistent with applicable law.
                            </p>

                            <Callout title="Privacy alignment">
                                Disclosures are handled in line with the Privacy Policy and applicable legal requirements.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="wellbeing"
                            eyebrow="Culture"
                            title="12. Community Wellbeing"
                            subtitle="A calm, responsible culture protects everyone."
                        >
                            <p>
                                We encourage calm driving, respectful communication, and shared responsibility for public safety. Small actions—being on time, being respectful, and following
                                instructions—reduce friction and prevent incidents.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "De-escalation", body: "Avoid arguments; keep communications short, factual, and trip-related." },
                                    { head: "Care for property", body: "Do not damage vehicles; do not leave hazards; keep deliveries secured." },
                                    { head: "Respect public spaces", body: "Avoid blocking roads and entrances during pickup/drop-off." },
                                    { head: "Support staff respect", body: "No harassment of support staff; abuse of channels is enforceable." },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="updates"
                            eyebrow="Updates"
                            title="13. Updates to These Guidelines"
                            subtitle="We update the last-updated date when this document changes."
                        >
                            <p>
                                These Safety & Community Guidelines may be updated periodically. Continued use of the platform constitutes acceptance of updates. When we update this page, we
                                update the “Last updated” date at the top.
                            </p>

                            <BulletGrid
                                items={[
                                    { head: "Material updates", body: "If changes materially affect user understanding, we may provide additional notice where feasible." },
                                    { head: "Automation note", body: "Set NEXT_PUBLIC_POLICY_BUILD_DATE=YYYY-MM-DD in your deployment environment when you update this page." },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            eyebrow="Safety systems"
                            title="Safety tools and expectations"
                            subtitle="A structured view of how controls map to behavior."
                        >
                            <p>
                                Safety is a shared system: platform controls, partner standards, and user behavior. The table below outlines how major controls work and what we expect from users
                                and partners.
                            </p>

                            <FeatureTable rows={featureRows} />

                            <Callout title="Related documents">
                                These guidelines supplement the Terms of Service and Acceptable Use Policy, and align with the Partner Terms and Child/Student Safety Addendum.
                            </Callout>
                        </GlassCard>

                        <div className="mt-6 rounded-3xl border border-black/10 bg-white/[0.55] p-5 text-xs text-black/60 backdrop-blur">
                            These Safety & Community Guidelines supplement the 6Ride Terms of Service and Acceptable Use Policy. Serious violations may result in suspension or permanent
                            account removal.
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
