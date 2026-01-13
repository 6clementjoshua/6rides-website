export default function AcceptableUsePage() {
    return (
        <main className="min-h-screen bg-white text-black">
            <div className="mx-auto max-w-5xl px-6 py-16">
                {/* HEADER */}
                <header className="mb-12">
                    <h1 className="text-3xl font-semibold md:text-4xl">
                        Acceptable Use Policy
                    </h1>
                    <p className="mt-4 max-w-3xl text-sm text-black/70">
                        This Acceptable Use Policy (“AUP”) defines permitted and prohibited
                        behavior on the 6Rides platform. It applies to riders, drivers,
                        vehicle owners, partners, corporate users, and all other users of
                        6Rides services in Nigeria and internationally.
                    </p>
                    <p className="mt-2 text-xs text-black/50">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>

                    {/* Cross-links */}
                    <div className="mt-6 flex flex-wrap gap-2 text-xs">
                        <a href="/policies/terms" className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-black/70 hover:text-black">
                            Terms of Service
                        </a>
                        <a href="/policies/privacy" className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-black/70 hover:text-black">
                            Privacy Policy
                        </a>
                        <a href="/policies/partner-terms" className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-black/70 hover:text-black">
                            Partner Terms
                        </a>
                        <a href="/policies/contact" className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-black/70 hover:text-black">
                            Contact
                        </a>
                    </div>
                </header>

                {/* TOC */}
                <section className="mb-14 rounded-2xl border border-black/10 bg-black/[0.02] p-6">
                    <h2 className="text-lg font-semibold">Table of Contents</h2>
                    <ul className="mt-4 grid gap-2 text-sm text-black/70 md:grid-cols-2">
                        <li><a href="#purpose" className="hover:underline">1. Purpose of This Policy</a></li>
                        <li><a href="#general" className="hover:underline">2. General Use Standards</a></li>
                        <li><a href="#illegal" className="hover:underline">3. Illegal & Prohibited Activities</a></li>
                        <li><a href="#safety" className="hover:underline">4. Safety & Physical Harm</a></li>
                        <li><a href="#harassment" className="hover:underline">5. Harassment & Abuse</a></li>
                        <li><a href="#fraud" className="hover:underline">6. Fraud, Deception & Misuse</a></li>
                        <li><a href="#minors" className="hover:underline">7. Minors & Student Protection</a></li>
                        <li><a href="#platform" className="hover:underline">8. Platform Integrity</a></li>
                        <li><a href="#content" className="hover:underline">9. Content & Communications</a></li>
                        <li><a href="#enforcement" className="hover:underline">10. Enforcement Actions</a></li>
                        <li><a href="#reporting" className="hover:underline">11. Reporting Violations</a></li>
                        <li><a href="#law" className="hover:underline">12. Law Enforcement Cooperation</a></li>
                        <li><a href="#changes" className="hover:underline">13. Changes to This Policy</a></li>
                    </ul>
                </section>

                {/* SECTIONS */}

                <section id="purpose" className="mb-10">
                    <h2 className="text-xl font-semibold">1. Purpose of This Policy</h2>
                    <p className="mt-3 text-sm text-black/70">
                        6Rides is designed to provide safe, professional, and reliable
                        mobility services. This policy exists to protect users, partners,
                        minors, the public, and the integrity of the platform.
                    </p>
                </section>

                <section id="general" className="mb-10">
                    <h2 className="text-xl font-semibold">2. General Use Standards</h2>
                    <p className="mt-3 text-sm text-black/70">
                        All users must act lawfully, respectfully, and responsibly while
                        using the 6Rides platform. You may only use 6Rides for its intended
                        transportation, logistics, and mobility purposes.
                    </p>
                </section>

                <section id="illegal" className="mb-10">
                    <h2 className="text-xl font-semibold">3. Illegal & Prohibited Activities</h2>
                    <ul className="mt-3 list-disc pl-5 text-sm text-black/70">
                        <li>Using 6Rides to commit or facilitate any crime</li>
                        <li>Transporting illegal substances, weapons, or contraband</li>
                        <li>Evading law enforcement or regulatory authorities</li>
                        <li>Violating traffic, transport, or public safety laws</li>
                    </ul>
                </section>

                <section id="safety" className="mb-10">
                    <h2 className="text-xl font-semibold">4. Safety & Physical Harm</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Behavior that endangers life, property, or public safety is strictly
                        prohibited. This includes reckless driving, unsafe loading,
                        threatening conduct, or refusal to follow safety instructions.
                    </p>
                </section>

                <section id="harassment" className="mb-10">
                    <h2 className="text-xl font-semibold">5. Harassment & Abuse</h2>
                    <ul className="mt-3 list-disc pl-5 text-sm text-black/70">
                        <li>Verbal abuse, threats, or intimidation</li>
                        <li>Sexual harassment or inappropriate behavior</li>
                        <li>Discrimination based on gender, religion, ethnicity, or disability</li>
                        <li>Unwanted contact outside trip purposes</li>
                    </ul>
                </section>

                <section id="fraud" className="mb-10">
                    <h2 className="text-xl font-semibold">6. Fraud, Deception & Misuse</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Fraudulent activity is strictly prohibited, including:
                    </p>
                    <ul className="mt-3 list-disc pl-5 text-sm text-black/70">
                        <li>False trip claims or manipulated bookings</li>
                        <li>Payment abuse, chargeback fraud, or cash diversion</li>
                        <li>Impersonation of drivers, riders, or officials</li>
                    </ul>
                </section>

                <section id="minors" className="mb-10">
                    <h2 className="text-xl font-semibold">7. Minors & Student Protection</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Any misuse involving minors is treated as a serious violation.
                        Transporting minors without verified guardian, school, or
                        institutional authorization is prohibited.
                    </p>
                </section>

                <section id="platform" className="mb-10">
                    <h2 className="text-xl font-semibold">8. Platform Integrity</h2>
                    <ul className="mt-3 list-disc pl-5 text-sm text-black/70">
                        <li>Attempting to bypass platform fees or systems</li>
                        <li>Reverse engineering or exploiting the app</li>
                        <li>Interfering with dispatch, routing, or safety systems</li>
                    </ul>
                </section>

                <section id="content" className="mb-10">
                    <h2 className="text-xl font-semibold">9. Content & Communications</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Messages, names, and content shared on the platform must not be
                        offensive, misleading, or unlawful. 6Rides may moderate or remove
                        content at its discretion.
                    </p>
                </section>

                <section id="enforcement" className="mb-10">
                    <h2 className="text-xl font-semibold">10. Enforcement Actions</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Violations may result in actions including:
                    </p>
                    <ul className="mt-3 list-disc pl-5 text-sm text-black/70">
                        <li>Warnings</li>
                        <li>Temporary suspension</li>
                        <li>Permanent account termination</li>
                        <li>Loss of earnings or access to services</li>
                    </ul>
                </section>

                <section id="reporting" className="mb-10">
                    <h2 className="text-xl font-semibold">11. Reporting Violations</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Users and partners are encouraged to report violations through our{" "}
                        <a href="/policies/contact" className="underline">
                            Contact page
                        </a>
                        . Reports may be reviewed by safety, compliance, or legal teams.
                    </p>
                </section>

                <section id="law" className="mb-10">
                    <h2 className="text-xl font-semibold">12. Law Enforcement Cooperation</h2>
                    <p className="mt-3 text-sm text-black/70">
                        6Rides may cooperate with law enforcement and regulatory authorities
                        where required by law or to protect public safety.
                    </p>
                </section>

                <section id="changes" className="mb-12">
                    <h2 className="text-xl font-semibold">13. Changes to This Policy</h2>
                    <p className="mt-3 text-sm text-black/70">
                        This Acceptable Use Policy may be updated periodically. Continued use
                        of the platform constitutes acceptance of any revised version.
                    </p>
                </section>

                {/* FOOTNOTE */}
                <div className="border-t border-black/10 pt-6 text-xs text-black/50">
                    This Acceptable Use Policy is enforceable under the 6Rides Terms of
                    Service.
                </div>
            </div>
        </main>
    );
}
