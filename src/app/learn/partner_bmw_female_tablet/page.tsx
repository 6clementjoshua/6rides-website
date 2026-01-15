// src/app/learn/partner_bmw_female_tablet/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

function cx(...p: Array<string | false | null | undefined>) {
    return p.filter(Boolean).join(" ");
}

/* ====== Premium crisp UI system ====== */
const PANEL =
    "relative isolate overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.10)]";
const PANEL_BG =
    "before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-[radial-gradient(1100px_520px_at_20%_0%,rgba(255,255,255,0.98),rgba(255,255,255,0.55),rgba(255,255,255,0))]";
const PANEL_EDGE =
    "after:content-[''] after:absolute after:inset-0 after:-z-10 after:rounded-3xl after:ring-1 after:ring-white/70";

const TILE =
    "relative isolate overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.06)]";
const TILE_BG =
    "before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-[radial-gradient(760px_420px_at_15%_0%,rgba(255,255,255,0.98),rgba(255,255,255,0.50),rgba(255,255,255,0))]";

const CHIP =
    "rounded-full border border-black/15 bg-white px-3 py-1 text-[11px] font-semibold text-neutral-900 shadow-[0_10px_22px_rgba(0,0,0,0.06)]";

const HERO_GLASS =
    "max-w-3xl rounded-2xl border border-white/30 bg-black/55 p-4 md:p-5 shadow-[0_18px_55px_rgba(0,0,0,0.18)]";

function Panel({ children }: { children: React.ReactNode }) {
    return (
        <div className={cx(PANEL, PANEL_BG, PANEL_EDGE)}>
            <div className="relative z-10 p-6">{children}</div>
        </div>
    );
}

function Tile({ children }: { children: React.ReactNode }) {
    return (
        <div className={cx(TILE, TILE_BG)}>
            <div className="relative z-10 p-5">{children}</div>
        </div>
    );
}

function Section({
    eyebrow,
    title,
    desc,
}: {
    eyebrow?: string;
    title: string;
    desc?: string;
}) {
    return (
        <div className="mb-4">
            {eyebrow && (
                <div className="text-[11px] font-semibold tracking-wide text-neutral-800">
                    {eyebrow}
                </div>
            )}
            <h2 className="mt-1 text-xl font-semibold text-neutral-950 md:text-2xl">
                {title}
            </h2>
            {desc && (
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-800">
                    {desc}
                </p>
            )}
        </div>
    );
}

function Bullets({ items }: { items: string[] }) {
    return (
        <ul className="mt-3 grid gap-2 text-sm text-neutral-900">
            {items.map((i) => (
                <li key={i} className="flex gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-neutral-500" />
                    <span>{i}</span>
                </li>
            ))}
        </ul>
    );
}

export default function LearnPartnerBMWFemaleTabletPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            {/* Header */}
            <header className="sticky top-0 z-30 border-b border-black/10 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/6logo.PNG" alt="6ride" width={28} height={28} />
                        <span className="text-sm font-semibold text-neutral-950">ride</span>
                    </Link>

                    <Link
                        href="/"
                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                    >
                        Back to home
                    </Link>
                </div>
            </header>

            <section className="mx-auto max-w-6xl px-6 pb-14 pt-8">
                {/* HERO */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: easeOut }}
                    className="overflow-hidden rounded-3xl border border-black/10 bg-black shadow-[0_18px_55px_rgba(0,0,0,0.14)]"
                >
                    <div className="relative h-[360px] sm:h-[440px] md:h-[540px]">
                        <Image
                            src="/images/6ride/partner/6ride_partner_vehicle_bmw_female_tablet.png"
                            alt="6ride partner BMW with female using tablet"
                            fill
                            className="object-contain md:object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/22 to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                            <div className={cx(HERO_GLASS, "backdrop-blur-md")}>
                                <div className="text-[11px] font-semibold tracking-wide text-white/90">
                                    Partner vehicles • Business-ready
                                </div>
                                <h1 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
                                    A partner program designed for professionals.
                                </h1>
                                <p className="mt-2 text-sm text-white/90 md:text-[15px] leading-relaxed">
                                    This tier is for owners who value professionalism: verified onboarding,
                                    disciplined standards, and a premium rider experience that protects your
                                    vehicle’s image while building consistent income.
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {["Verified onboarding", "Premium standards", "Professional conduct", "Brand protection"].map(
                                        (c) => (
                                            <span
                                                key={c}
                                                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white"
                                            >
                                                {c}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* BODY */}
                <div className="mt-10 grid gap-8 md:grid-cols-12">
                    {/* MAIN */}
                    <div className="md:col-span-8 space-y-8">
                        {/* Explanation */}
                        <Panel>
                            <Section
                                eyebrow="Full explanation"
                                title="Professional partners get positioned differently"
                                desc="6ride is building a premium partner network that behaves like a professional service — not random ride-hailing. That means verification, standards, and accountability are part of how we protect your earning potential."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        What “business-ready” means
                                    </div>
                                    <Bullets
                                        items={[
                                            "Vehicle maintained to premium presentation",
                                            "Professional arrival and calm pickup culture",
                                            "Respectful communication and reliability",
                                            "Ability to handle executive and corporate trips",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        What 6ride protects
                                    </div>
                                    <Bullets
                                        items={[
                                            "Your vehicle’s public image and brand value",
                                            "Rider trust and premium demand retention",
                                            "Safety-first, compliance-first service culture",
                                            "Partner fairness through standards enforcement",
                                        ]}
                                    />
                                </Tile>
                            </div>

                            <div className="mt-6 rounded-2xl border border-black/10 bg-neutral-50 p-5">
                                <div className="text-sm font-semibold text-neutral-950">
                                    Why enforcement matters
                                </div>
                                <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                    Premium services fail when standards become “optional.” That creates stress,
                                    complaints, and destroys premium demand. 6ride treats standards as a core
                                    operating system — and we enforce them.
                                </p>
                            </div>
                        </Panel>

                        {/* Standards */}
                        <Panel>
                            <Section
                                eyebrow="Standards"
                                title="Professional partner standards (what we expect)"
                                desc="Partners in this tier commit to consistently delivering a premium experience."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Vehicle & presentation
                                    </div>
                                    <Bullets
                                        items={[
                                            "Clean interior/exterior, consistently",
                                            "Working comfort features where applicable (AC, seat quality)",
                                            "No unsafe mechanical issues",
                                            "Documents compliant and ready for verification",
                                            "Professional look: no messy or chaotic presentation",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Conduct & operations
                                    </div>
                                    <Bullets
                                        items={[
                                            "Respectful communication, calm behavior",
                                            "No harassment, intimidation, or discrimination",
                                            "Compliance-first driving culture",
                                            "Escalate issues to support (avoid conflict)",
                                            "Account action possible for repeat violations",
                                        ]}
                                    />
                                </Tile>
                            </div>
                        </Panel>

                        {/* Onboarding */}
                        <Panel>
                            <Section
                                eyebrow="Onboarding"
                                title="How onboarding works (professional tier)"
                                desc="Clear steps that protect the brand, riders, and serious partners."
                            />

                            <div className="grid gap-3">
                                {[
                                    {
                                        step: "01",
                                        title: "Apply to partner",
                                        body: "Submit your vehicle details and partner request. We focus on premium suitability.",
                                    },
                                    {
                                        step: "02",
                                        title: "Verification + review",
                                        body: "We verify identity and review vehicle quality. This reduces fraud and protects trust.",
                                    },
                                    {
                                        step: "03",
                                        title: "Standards agreement",
                                        body: "Partners agree to enforce cleanliness, professionalism, and compliance rules.",
                                    },
                                    {
                                        step: "04",
                                        title: "Premium positioning",
                                        body: "Approved partners are positioned for corporate and premium movement demand.",
                                    },
                                ].map((s) => (
                                    <Tile key={s.step}>
                                        <div className="text-xs font-semibold text-neutral-800">
                                            Step {s.step}
                                        </div>
                                        <div className="mt-1 text-sm font-semibold text-neutral-950">
                                            {s.title}
                                        </div>
                                        <div className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                            {s.body}
                                        </div>
                                    </Tile>
                                ))}
                            </div>

                            <div className="mt-5 rounded-2xl border border-black/10 bg-neutral-50 p-5">
                                <div className="text-sm font-semibold text-neutral-950">
                                    Enforcement note
                                </div>
                                <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                    If standards are repeatedly violated, we may restrict access, suspend,
                                    or remove a partner. This protects professional partners and keeps the
                                    premium tier credible.
                                </p>
                            </div>
                        </Panel>

                        {/* Policy layer */}
                        <Panel>
                            <Section
                                eyebrow="Policy layer"
                                title="Rules and references"
                                desc="These policies define expectations and protect partners, riders, and the brand."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        What policies cover
                                    </div>
                                    <Bullets
                                        items={[
                                            "Partner eligibility and truthfulness",
                                            "Cleanliness and professional conduct rules",
                                            "Safety culture and compliance expectations",
                                            "Consequences for misuse, abuse, or violations",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        References
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        <Link className={CHIP} href="/policies/partner-terms" target="_blank">
                                            Partner Terms
                                        </Link>
                                        <Link className={CHIP} href="/policies/safety" target="_blank">
                                            Safety Guidelines
                                        </Link>
                                        <Link className={CHIP} href="/policies/acceptable-use" target="_blank">
                                            Acceptable Use
                                        </Link>
                                        <Link className={CHIP} href="/policies/terms" target="_blank">
                                            Terms of Service
                                        </Link>
                                    </div>
                                    <div className="mt-3 text-[12px] text-neutral-800 leading-relaxed">
                                        These documents explain enforcement and account actions in detail.
                                    </div>
                                </Tile>
                            </div>
                        </Panel>

                        {/* FAQ */}
                        <Panel>
                            <Section eyebrow="FAQ" title="Common questions" />
                            <div className="grid gap-3">
                                {[
                                    {
                                        q: "Is this different from normal partner onboarding?",
                                        a: "Yes. This tier is positioned for professional premium movement, so standards and verification are stronger.",
                                    },
                                    {
                                        q: "What if a partner violates standards?",
                                        a: "We can restrict access, suspend, or remove partners for repeated violations to protect premium trust.",
                                    },
                                    {
                                        q: "How do I join?",
                                        a: "Go to the partner route to apply. We will guide the verification and onboarding process.",
                                    },
                                    {
                                        q: "Where are rules written?",
                                        a: "Partner Terms, Safety Guidelines, Acceptable Use, and Terms of Service.",
                                    },
                                ].map((x) => (
                                    <Tile key={x.q}>
                                        <div className="text-sm font-semibold text-neutral-950">{x.q}</div>
                                        <div className="mt-2 text-sm text-neutral-800 leading-relaxed">{x.a}</div>
                                    </Tile>
                                ))}
                            </div>
                        </Panel>
                    </div>

                    {/* ASIDE */}
                    <aside className="md:col-span-4">
                        <div className="sticky top-24 space-y-4">
                            <Panel>
                                <div className="text-sm font-semibold text-neutral-950">
                                    Next actions
                                </div>
                                <div className="mt-3 grid gap-2">
                                    <Link
                                        href="/partner"
                                        className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-black/90"
                                    >
                                        Partner with 6ride
                                    </Link>
                                    <Link
                                        href="/policies/partner-terms"
                                        target="_blank"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Read partner terms
                                    </Link>
                                    <Link
                                        href="/"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Back to home
                                    </Link>
                                </div>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {["Professional tier", "Verification", "Standards", "Brand protection"].map((t) => (
                                        <span key={t} className={CHIP}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </Panel>

                            <Panel>
                                <div className="text-[11px] font-semibold text-neutral-900">
                                    We appreciate your interest in 6Rides Partner Program.
                                </div>
                                <div className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                    For inquiries or to get started, please contact our partner support team at{" "}
                                    <a
                                        href="mailto:partnerships@6rides.com"
                                        className="text-blue-600 hover:underline"
                                    >
                                        partnerships@6rides.com
                                    </a>
                                </div>
                                
                            </Panel>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
