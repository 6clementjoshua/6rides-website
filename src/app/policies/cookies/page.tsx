// app/policies/cookies/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

type TocItem = { id: string; label: string; note: string };
type GridItem = { head: string; body: string };

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
            <span className="relative z-10 text-black/80 transition-colors group-hover:text-black">
                {children}
            </span>
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
                    <h2 className="text-xl font-semibold tracking-tight text-black md:text-2xl">
                        {title}
                    </h2>
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

export default function CookiesPolicyPage() {
    const { effectiveDate, lastUpdated } = usePolicyDates();
    const [mobileTocOpen, setMobileTocOpen] = useState(false);

    const toc: TocItem[] = useMemo(
        () => [
            { id: "overview", label: "1. Overview", note: "What cookies are and why this policy matters." },
            { id: "types", label: "2. Types of Cookies", note: "Essential, preferences, analytics, marketing." },
            { id: "current-use", label: "3. Our Current Use", note: "What we use now (and what we don’t)." },
            { id: "consent", label: "4. Consent & Controls", note: "When consent is needed and how choices work." },
            { id: "manage", label: "5. Managing Cookies", note: "Browser settings and how to delete cookies." },
            { id: "third-parties", label: "6. Third-Party Services", note: "Embedded tools and vendor cookies." },
            { id: "do-not-track", label: "7. Do Not Track", note: "How we treat DNT signals." },
            { id: "changes", label: "8. Changes to This Policy", note: "How updates are published." },
            { id: "contact", label: "9. Contact", note: "Questions about cookies and privacy." },
        ],
        []
    );

    // Smooth anchor scrolling (same as privacy)
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
                                <span>6ride Cookies</span>
                            </div>

                            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                                Cookies Policy
                            </h1>

                            <p className="mt-3 max-w-3xl text-sm leading-6 text-black/70">
                                This Cookies Policy explains how 6ride uses cookies and similar technologies on our website.
                                Cookies help with security, basic functionality, and—when enabled—measurement tools like analytics.
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
                                    "No ad pixels by default",
                                    "Consent where required",
                                    "Security-first cookies",
                                    "Browser controls supported",
                                ]}
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <BevelButton href="/policies/privacy">Privacy</BevelButton>
                            <BevelButton href="/policies/terms">Terms</BevelButton>
                            <BevelButton href="/policies/acceptable-use">Acceptable Use</BevelButton>
                            <BevelButton href="/policies/contact">Contact</BevelButton>
                        </div>
                    </div>

                    {/* quick cookie signal cards */}
                    <div className="mt-7 grid gap-3 md:grid-cols-3">
                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Essential first</div>
                                <div className="mt-1 text-sm text-black/75">
                                    We use cookies primarily for security and core functionality.
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Consent where required</div>
                                <div className="mt-1 text-sm text-black/75">
                                    If we add analytics later, we’ll request consent where law requires.
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-black/10 bg-white/[0.55] p-4 backdrop-blur">
                            <div className="pointer-events-none absolute inset-[1px] rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-10px_18px_rgba(0,0,0,0.05)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold text-black/60">Control is yours</div>
                                <div className="mt-1 text-sm text-black/75">
                                    You can manage cookies in your browser settings any time.
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
                                        Cookie rules can vary by region. We aim to follow NDPR principles and global privacy standards.
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
                                    <div className="mt-1 text-xs text-black/55">
                                        Tap to {mobileTocOpen ? "collapse" : "expand"}
                                    </div>
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
                            subtitle="Cookies help websites work. Some cookies are essential; others are optional."
                        >
                            <p>
                                Cookies are small text files stored on your device when you visit a website. They are used to support
                                website functionality, security, user preferences, and (when enabled) measurement tools such as analytics.
                            </p>

                            <Callout title="Key point">
                                We keep cookie use minimal and only expand cookie categories when there’s a clear product reason.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="types"
                            eyebrow="Categories"
                            title="2. Types of Cookies"
                            subtitle="Different cookies serve different functions."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Essential cookies",
                                        body:
                                            "Needed for core site behavior and security. Without these, parts of the site may not work correctly.",
                                    },
                                    {
                                        head: "Preference cookies",
                                        body:
                                            "Remember choices you make (e.g., language or region) to improve usability where applicable.",
                                    },
                                    {
                                        head: "Analytics cookies (optional)",
                                        body:
                                            "Help us understand usage patterns so we can improve performance and content. These may require consent depending on your region.",
                                    },
                                    {
                                        head: "Marketing cookies / pixels (optional)",
                                        body:
                                            "Used for ads and retargeting. We do not use advertising pixels by default; if introduced, consent controls will apply.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="current-use"
                            eyebrow="Today"
                            title="3. Our Current Use"
                            subtitle="What we use right now and what we do not use."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Currently used",
                                        body:
                                            "Cookies/technologies that support basic website security and reliability (e.g., abuse prevention, load balancing, core functionality).",
                                    },
                                    {
                                        head: "Not currently used",
                                        body:
                                            "Advertising/retargeting pixels and marketing cookies. If we add them later, we will update this policy and provide controls where required.",
                                    },
                                    {
                                        head: "Analytics",
                                        body:
                                            "If we enable analytics later (e.g., Google Analytics), we will implement consent where required by law and ensure non-essential cookies don’t load before consent where applicable.",
                                    },
                                    {
                                        head: "Mobile apps",
                                        body:
                                            "If you use a mobile app, it may use device identifiers and permissions differently than the website. See the Privacy Policy for details.",
                                    },
                                ]}
                            />

                            <Callout title="Transparency promise">
                                If we change cookie behavior in a meaningful way, we update this policy and reflect it in the “Last updated” date.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="consent"
                            eyebrow="Consent"
                            title="4. Consent & Controls"
                            subtitle="Some regions require opt-in consent for non-essential cookies."
                        >
                            <p>
                                Cookie consent requirements depend on your jurisdiction. Where required, we will request consent before
                                placing non-essential cookies (such as analytics or marketing cookies). Where consent is not required,
                                we may still offer controls to manage optional cookies.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Essential cookies",
                                        body:
                                            "These may be set without consent because they are needed for security and core functionality.",
                                    },
                                    {
                                        head: "Optional cookies",
                                        body:
                                            "Analytics and marketing cookies (if enabled) may require consent depending on applicable law.",
                                    },
                                    {
                                        head: "Withdrawal",
                                        body:
                                            "If we provide a cookie preferences tool, you can change your choices at any time. You can also manage cookies in your browser settings.",
                                    },
                                    {
                                        head: "Law alignment",
                                        body:
                                            "We aim to comply with NDPR principles and global privacy standards (including GDPR-style consent where applicable).",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="manage"
                            eyebrow="Browser"
                            title="5. Managing Cookies"
                            subtitle="You can control cookies through browser settings."
                        >
                            <p>
                                Most browsers let you delete cookies and block future cookies. You can also block third-party cookies in
                                many browsers. Keep in mind that disabling certain cookies may affect website functionality.
                            </p>

                            <Callout title="Tip">
                                If the website feels broken after blocking cookies, try enabling essential cookies or resetting site permissions for 6ride.
                            </Callout>
                        </GlassCard>

                        <GlassCard
                            id="third-parties"
                            eyebrow="Vendors"
                            title="6. Third-Party Services"
                            subtitle="Some third parties may set cookies if you use embedded features."
                        >
                            <p>
                                If we embed third-party services (e.g., video players, maps, chat widgets), those services may set their
                                own cookies or collect device identifiers. We do not control third-party cookies and recommend reviewing
                                the provider’s documentation where relevant.
                            </p>

                            <BulletGrid
                                items={[
                                    {
                                        head: "Examples",
                                        body:
                                            "Embedded videos, maps, customer support tools, payment provider pages, or social media embeds (if used).",
                                    },
                                    {
                                        head: "Our rule",
                                        body:
                                            "We only add third-party tools when they provide a clear product benefit and we evaluate privacy impact.",
                                    },
                                ]}
                            />
                        </GlassCard>

                        <GlassCard
                            id="do-not-track"
                            eyebrow="Signals"
                            title="7. Do Not Track"
                            subtitle="Some browsers send DNT signals; responses vary."
                        >
                            <p>
                                Some browsers offer a “Do Not Track” (DNT) signal. Because there is no single industry standard for how
                                to respond, responses vary. We evaluate signals and available controls where feasible.
                            </p>
                        </GlassCard>

                        <GlassCard
                            id="changes"
                            eyebrow="Updates"
                            title="8. Changes to This Policy"
                            subtitle="We update the “Last updated” date when this page changes."
                        >
                            <BulletGrid
                                items={[
                                    {
                                        head: "Material changes",
                                        body:
                                            "If changes materially affect user understanding, we may provide additional notice through the site or apps where feasible.",
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
                            title="9. Contact"
                            subtitle="Questions about cookies and privacy."
                        >
                            <p>
                                If you have questions about cookies or privacy, contact us via the Contact page.
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                <BevelButton href="/policies/contact">Contact</BevelButton>
                                <BevelButton href="/policies/privacy">Privacy Policy</BevelButton>
                            </div>

                            <Callout title="Reminder">
                                This Cookies Policy should be read together with the Privacy Policy and Terms of Service.
                            </Callout>
                        </GlassCard>

                        <div className="mt-6 rounded-3xl border border-black/10 bg-white/[0.55] p-5 text-xs text-black/60 backdrop-blur">
                            We minimize cookie use. We do not use advertising pixels by default. If we introduce analytics or marketing
                            cookies later, we will update this policy and provide consent controls where required.
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
