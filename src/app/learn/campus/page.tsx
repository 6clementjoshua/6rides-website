// src/app/learn/campus/page.tsx
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

export default function LearnCampusPage() {
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
                            src="/images/6ride/lifestyle/6ride_campus_student_transport.png"
                            alt="6ride campus student transport scene"
                            fill
                            className="object-contain md:object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/22 to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                            <div className={cx(HERO_GLASS, "backdrop-blur-md")}>
                                <div className="text-[11px] font-semibold tracking-wide text-white/90">
                                    Campus • Student movement
                                </div>
                                <h1 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
                                    Campus movement that feels safer and more organized.
                                </h1>
                                <p className="mt-2 text-sm text-white/90 md:text-[15px] leading-relaxed">
                                    Students need reliability and safe pickup culture. 6ride emphasizes clearer pickup behavior,
                                    calmer movement, and support-first escalation — built for daily campus trips and local movement.
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {["Clear pickups", "Safer mindset", "Predictable movement", "Support escalation"].map(
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
                                title="Campus movement needs stricter expectations"
                                desc="Campus zones are crowded, time-sensitive, and often involve young adults or minors. This page expands the promise: clearer pickup behavior, safer movement, respectful conduct, and policy-backed enforcement."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Common campus problems
                                    </div>
                                    <Bullets
                                        items={[
                                            "Confusing pickup points and missed arrivals",
                                            "Crowded gates and unsafe stopping behavior",
                                            "Unprofessional talk or uncomfortable behavior",
                                            "Aggressive driving that increases fear and risk",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        The 6ride campus standard
                                    </div>
                                    <Bullets
                                        items={[
                                            "Clear pickup culture and safer stop choices",
                                            "Respectful conduct and professional language",
                                            "Compliance-first driving mindset",
                                            "Support escalation if anything feels unsafe",
                                        ]}
                                    />
                                </Tile>
                            </div>

                            <div className="mt-6 rounded-2xl border border-black/10 bg-neutral-50 p-5">
                                <div className="text-sm font-semibold text-neutral-950">
                                    The goal
                                </div>
                                <p className="mt-2 text-sm text-neutral-800 leading-relaxed">
                                    A safer, calmer routine for students: less confusion, fewer risky pickups, and stronger rules that
                                    protect riders and the brand.
                                </p>
                            </div>
                        </Panel>

                        {/* What you get */}
                        <Panel>
                            <Section
                                eyebrow="Package contents"
                                title="What you get for campus movement"
                                desc="These standards improve safety culture and reduce stress around crowded pickup areas."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Experience standards
                                    </div>
                                    <Bullets
                                        items={[
                                            "Clear pickup behavior and more predictable arrival culture",
                                            "Safer stop decisions (especially around gates)",
                                            "Respectful communication and professional conduct",
                                            "Compliance-first driving posture in busy areas",
                                            "Support-first escalation and reporting paths",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        Use cases
                                    </div>
                                    <Bullets
                                        items={[
                                            "Hostel to campus and campus to hostel movement",
                                            "Local errands and everyday city trips",
                                            "Student events and group outings",
                                            "Parent/guardian visits and pickup coordination",
                                            "Late movement where safety matters more",
                                        ]}
                                    />
                                </Tile>
                            </div>

                            <div className="mt-5 grid gap-4 sm:grid-cols-3">
                                {[
                                    { title: "Best for", body: "Daily student trips, hostel movement, safe pickups, predictable arrivals." },
                                    { title: "Feels like", body: "Clear pickup + safer movement + calmer experience." },
                                    { title: "Positioning", body: "A standards-first approach to student mobility." },
                                ].map((x) => (
                                    <Tile key={x.title}>
                                        <div className="text-sm font-semibold text-neutral-950">{x.title}</div>
                                        <div className="mt-2 text-sm text-neutral-800 leading-relaxed">{x.body}</div>
                                    </Tile>
                                ))}
                            </div>
                        </Panel>

                        {/* Flow */}
                        <Panel>
                            <Section
                                eyebrow="Flow"
                                title="How campus trips work"
                                desc="A simple flow built for crowded pickup zones."
                            />
                            <div className="grid gap-3">
                                {[
                                    {
                                        step: "01",
                                        title: "Choose a clear landmark pickup",
                                        body: "Use a gate name, faculty building, junction, or known landmark. Clarity prevents missed arrivals.",
                                    },
                                    {
                                        step: "02",
                                        title: "Arrival with safer stopping choices",
                                        body: "Crowds matter. Drivers should prioritize safer stop points instead of risky moves for speed.",
                                    },
                                    {
                                        step: "03",
                                        title: "Movement with respect and compliance",
                                        body: "No harassment, no intimidation, no reckless driving. The expectation is professional conduct.",
                                    },
                                    {
                                        step: "04",
                                        title: "Drop-off with calm finishing",
                                        body: "A respectful finish and a safer experience that builds trust over time.",
                                    },
                                ].map((s) => (
                                    <Tile key={s.step}>
                                        <div className="text-xs font-semibold text-neutral-800">Step {s.step}</div>
                                        <div className="mt-1 text-sm font-semibold text-neutral-950">{s.title}</div>
                                        <div className="mt-2 text-sm text-neutral-800 leading-relaxed">{s.body}</div>
                                    </Tile>
                                ))}
                            </div>
                        </Panel>

                        {/* Safety alignment */}
                        <Panel>
                            <Section
                                eyebrow="Safety layer"
                                title="Child & student safety alignment"
                                desc="If a rider is a minor or a vulnerable student, expectations are stricter. These standards and policies exist to protect riders, partners, and the 6ride brand."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">
                                        What we enforce
                                    </div>
                                    <Bullets
                                        items={[
                                            "No harassment, intimidation, or inappropriate conduct",
                                            "No unsafe driving, reckless moves, or dangerous stops",
                                            "Respectful language and professional behavior",
                                            "Support escalation and reporting paths",
                                            "Suspension/removal may occur for repeated violations",
                                        ]}
                                    />
                                </Tile>

                                <Tile>
                                    <div className="text-sm font-semibold text-neutral-950">References</div>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        <Link className={CHIP} href="/policies/child-student-safety" target="_blank">
                                            Child & Student Safety
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
                                        These documents define prohibited behavior, enforcement actions, and how we protect riders.
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
                                        q: "Is this only for universities?",
                                        a: "No. It applies to any campus-style environment where crowded pickups and student safety matter.",
                                    },
                                    {
                                        q: "What if I feel unsafe?",
                                        a: "Use support escalation and report the issue. Repeated violations may lead to restrictions or removal.",
                                    },
                                    {
                                        q: "Does 6ride escort minors alone?",
                                        a: "Rules and eligibility depend on policy and local requirements. Where minors are involved, expectations are stricter.",
                                    },
                                    {
                                        q: "Where are the rules written?",
                                        a: "Child & Student Safety, Safety Guidelines, Acceptable Use, and Terms of Service.",
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
                                <div className="text-sm font-semibold text-neutral-950">Next actions</div>
                                <div className="mt-3 grid gap-2">
                                    <Link
                                        href="/"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Back to home
                                    </Link>
                                    <Link
                                        href="/policies/child-student-safety"
                                        target="_blank"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Read child & student safety
                                    </Link>
                                    <Link
                                        href="/policies/safety"
                                        target="_blank"
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-50"
                                    >
                                        Read safety guidelines
                                    </Link>
                                </div>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {["Campus", "Students", "Safety-first", "Clear pickups"].map((t) => (
                                        <span key={t} className={CHIP}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </Panel>

                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
