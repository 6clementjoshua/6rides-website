// app/policies/privacy/page.tsx
export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            <div className="mx-auto max-w-5xl px-6 py-16">
                {/* HEADER */}
                <header className="mb-12">
                    <h1 className="text-3xl font-semibold md:text-4xl">Privacy Policy</h1>
                    <p className="mt-4 max-w-3xl text-sm text-black/70">
                        This Privacy Policy explains how 6Rides collects, uses, shares, and protects personal information when you use
                        our website, apps, and services (ride coordination, chauffeur services, partner vehicles, food delivery,
                        emergency support, and related mobility services).
                    </p>
                    <p className="mt-2 text-xs text-black/50">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>

                    {/* Cross-links */}
                    <div className="mt-6 flex flex-wrap gap-2 text-xs">
                        <a
                            href="/policies/terms"
                            className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-black/70 hover:text-black"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="/policies/acceptable-use"
                            className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-black/70 hover:text-black"
                        >
                            Acceptable Use
                        </a>
                        <a
                            href="/policies/subscription-billing"
                            className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-black/70 hover:text-black"
                        >
                            Subscription & Billing
                        </a>
                        <a
                            href="/policies/refunds"
                            className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-black/70 hover:text-black"
                        >
                            Refund & Cancellation
                        </a>
                        <a
                            href="/policies/contact"
                            className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-black/70 hover:text-black"
                        >
                            Contact
                        </a>
                    </div>
                </header>

                {/* TOC */}
                <section className="mb-14 rounded-2xl border border-black/10 bg-black/[0.02] p-6">
                    <h2 className="text-lg font-semibold">Table of Contents</h2>
                    <ul className="mt-4 grid gap-2 text-sm text-black/70 md:grid-cols-2">
                        <li>
                            <a href="#scope" className="hover:underline">
                                1. Scope & Who We Are
                            </a>
                        </li>
                        <li>
                            <a href="#data-we-collect" className="hover:underline">
                                2. Information We Collect
                            </a>
                        </li>
                        <li>
                            <a href="#location" className="hover:underline">
                                3. Location Data
                            </a>
                        </li>
                        <li>
                            <a href="#how-we-use" className="hover:underline">
                                4. How We Use Information
                            </a>
                        </li>
                        <li>
                            <a href="#legal-bases" className="hover:underline">
                                5. Legal Bases (Nigeria NDPR + Global)
                            </a>
                        </li>
                        <li>
                            <a href="#sharing" className="hover:underline">
                                6. Sharing & Disclosure
                            </a>
                        </li>
                        <li>
                            <a href="#drivers-partners" className="hover:underline">
                                7. Drivers, Riders & Partners
                            </a>
                        </li>
                        <li>
                            <a href="#payments" className="hover:underline">
                                8. Payments & Financial Data
                            </a>
                        </li>
                        <li>
                            <a href="#minors" className="hover:underline">
                                9. Minors, Students & Guardians
                            </a>
                        </li>
                        <li>
                            <a href="#cookies" className="hover:underline">
                                10. Cookies & Analytics
                            </a>
                        </li>
                        <li>
                            <a href="#retention" className="hover:underline">
                                11. Data Retention
                            </a>
                        </li>
                        <li>
                            <a href="#security" className="hover:underline">
                                12. Security
                            </a>
                        </li>
                        <li>
                            <a href="#rights" className="hover:underline">
                                13. Your Rights & Choices
                            </a>
                        </li>
                        <li>
                            <a href="#international" className="hover:underline">
                                14. International Transfers
                            </a>
                        </li>
                        <li>
                            <a href="#changes" className="hover:underline">
                                15. Changes to This Policy
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:underline">
                                16. Contact & Complaints
                            </a>
                        </li>
                    </ul>
                </section>

                {/* SECTIONS */}
                <section id="scope" className="mb-10">
                    <h2 className="text-xl font-semibold">1. Scope & Who We Are</h2>
                    <p className="mt-3 text-sm text-black/70">
                        This Policy applies to 6Rides services and platforms, including our website and mobile applications. 6Rides
                        operates in Nigeria (including Cross River State and other cities) and may provide services internationally.
                        Where local laws require additional disclosures, those will apply to users in those regions.
                    </p>
                </section>

                <section id="data-we-collect" className="mb-10">
                    <h2 className="text-xl font-semibold">2. Information We Collect</h2>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-black/10 bg-white p-5">
                            <div className="text-sm font-semibold">Information you provide</div>
                            <ul className="mt-2 list-disc pl-5 text-sm text-black/70">
                                <li>Name, phone number, email address</li>
                                <li>Account profile details and preferences</li>
                                <li>Support messages and communications</li>
                                <li>Trip requests, schedules, and delivery instructions</li>
                                <li>Identity verification information (where required)</li>
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-black/10 bg-white p-5">
                            <div className="text-sm font-semibold">Information collected automatically</div>
                            <ul className="mt-2 list-disc pl-5 text-sm text-black/70">
                                <li>Device identifiers, app version, browser type</li>
                                <li>Log data, diagnostics, performance data</li>
                                <li>Usage data (pages viewed, features used)</li>
                                <li>Approximate location inferred from IP (web)</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-black/10 bg-black/[0.02] p-5 text-sm text-black/70">
                        <span className="font-semibold">Note:</span> We aim to minimize data collection and only collect data that is
                        necessary to provide services, improve safety, comply with law, and prevent fraud.
                    </div>
                </section>

                <section id="location" className="mb-10">
                    <h2 className="text-xl font-semibold">3. Location Data</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Location data is essential for ride coordination, dispatch, navigation, safety, fraud prevention, and trip
                        verification. Depending on your device settings and service type, we may collect:
                    </p>
                    <ul className="mt-3 list-disc pl-5 text-sm text-black/70">
                        <li>
                            <span className="font-semibold">Precise location</span> (GPS) while using the app for pickup, drop-off, and
                            routing.
                        </li>
                        <li>
                            <span className="font-semibold">Background location</span> only where you explicitly permit it, and only to
                            support core functions such as driver dispatch, trip safety checks, and fraud prevention.
                        </li>
                        <li>
                            <span className="font-semibold">Approximate location</span> via IP for website features and security.
                        </li>
                    </ul>
                    <p className="mt-3 text-sm text-black/70">
                        You can manage location permissions in your device settings. Disabling location may prevent some features
                        from functioning properly.
                    </p>
                </section>

                <section id="how-we-use" className="mb-10">
                    <h2 className="text-xl font-semibold">4. How We Use Information</h2>
                    <ul className="mt-3 list-disc pl-5 text-sm text-black/70">
                        <li>Provide, operate, and improve rides, deliveries, and support services</li>
                        <li>Enable safety features, incident response, and trip verification</li>
                        <li>Process payments, refunds, and billing support</li>
                        <li>Prevent fraud, abuse, and unauthorized access</li>
                        <li>Provide customer support and respond to requests</li>
                        <li>Comply with legal obligations and lawful requests</li>
                        <li>Communicate service updates, receipts, and essential notices</li>
                    </ul>
                </section>

                <section id="legal-bases" className="mb-10">
                    <h2 className="text-xl font-semibold">5. Legal Bases (Nigeria NDPR + Global)</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Where required by law, we rely on one or more legal bases to process personal data, including:
                    </p>
                    <ul className="mt-3 list-disc pl-5 text-sm text-black/70">
                        <li>
                            <span className="font-semibold">Contractual necessity</span> (to provide rides, deliveries, and requested
                            services)
                        </li>
                        <li>
                            <span className="font-semibold">Legitimate interests</span> (safety, fraud prevention, service improvement)
                        </li>
                        <li>
                            <span className="font-semibold">Consent</span> (where you grant permissions, such as location access)
                        </li>
                        <li>
                            <span className="font-semibold">Legal obligation</span> (to comply with applicable laws and regulations)
                        </li>
                    </ul>
                </section>

                <section id="sharing" className="mb-10">
                    <h2 className="text-xl font-semibold">6. Sharing & Disclosure</h2>
                    <p className="mt-3 text-sm text-black/70">
                        We do not sell personal information. We may share information only as needed to provide services, maintain
                        safety, and comply with law, including with:
                    </p>
                    <ul className="mt-3 list-disc pl-5 text-sm text-black/70">
                        <li>
                            <span className="font-semibold">Drivers, riders, and delivery personnel</span> (pickup location, name,
                            limited contact details needed for coordination)
                        </li>
                        <li>
                            <span className="font-semibold">Partner vehicle owners</span> (trip and payout information necessary for
                            program operations)
                        </li>
                        <li>
                            <span className="font-semibold">Payment providers</span> (to process transactions; see{" "}
                            <a href="/policies/subscription-billing" className="underline">
                                Subscription & Billing
                            </a>
                            )
                        </li>
                        <li>
                            <span className="font-semibold">Service providers</span> (hosting, analytics, security, customer support)
                        </li>
                        <li>
                            <span className="font-semibold">Law enforcement / regulators</span> where required by law or legal process
                        </li>
                    </ul>
                </section>

                <section id="drivers-partners" className="mb-10">
                    <h2 className="text-xl font-semibold">7. Drivers, Riders & Partners</h2>
                    <p className="mt-3 text-sm text-black/70">
                        To coordinate trips and deliveries, 6Rides shares limited information between riders and drivers (e.g., first
                        name, pickup point, trip status). Drivers and partners may be required to meet quality and compliance
                        standards and may receive limited trip-related records for operational purposes.
                    </p>
                    <p className="mt-3 text-sm text-black/70">
                        For prohibited behavior and enforcement actions, see our{" "}
                        <a href="/policies/acceptable-use" className="underline">
                            Acceptable Use Policy
                        </a>
                        .
                    </p>
                </section>

                <section id="payments" className="mb-10">
                    <h2 className="text-xl font-semibold">8. Payments & Financial Data</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Payment processing is handled through approved providers. 6Rides does not store full card details on our
                        servers when processed by third-party payment providers. We may store transaction records, receipts, and
                        billing history for accounting, fraud prevention, and customer support.
                    </p>
                </section>

                <section id="minors" className="mb-10">
                    <h2 className="text-xl font-semibold">9. Minors, Students & Guardians</h2>
                    <p className="mt-3 text-sm text-black/70">
                        6Rides is generally intended for adults. If minors or students use 6Rides under permitted guardian or
                        institutional arrangements, we collect and process data only as necessary for safety and service delivery.
                        Guardians are responsible for authorization and supervision.
                    </p>
                    <p className="mt-3 text-sm text-black/70">
                        If you believe a minor has provided personal information without appropriate consent, contact us via{" "}
                        <a href="/policies/contact" className="underline">
                            Contact
                        </a>{" "}
                        so we can review and take appropriate action.
                    </p>
                </section>

                <section id="cookies" className="mb-10">
                    <h2 className="text-xl font-semibold">10. Cookies & Analytics</h2>
                    <p className="mt-3 text-sm text-black/70">
                        We may use cookies or similar technologies to operate the website, remember preferences, and understand
                        performance. Where required, we will request consent for non-essential cookies.
                    </p>
                </section>

                <section id="retention" className="mb-10">
                    <h2 className="text-xl font-semibold">11. Data Retention</h2>
                    <p className="mt-3 text-sm text-black/70">
                        We keep personal information only as long as necessary for providing services, maintaining safety,
                        preventing fraud, resolving disputes, and complying with legal and regulatory requirements. Retention
                        periods vary depending on the type of data and the reason it was collected.
                    </p>
                </section>

                <section id="security" className="mb-10">
                    <h2 className="text-xl font-semibold">12. Security</h2>
                    <p className="mt-3 text-sm text-black/70">
                        We use reasonable administrative, technical, and organizational safeguards designed to protect information.
                        However, no system is completely secure, and we cannot guarantee absolute security.
                    </p>
                </section>

                <section id="rights" className="mb-10">
                    <h2 className="text-xl font-semibold">13. Your Rights & Choices</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Depending on your location and applicable law, you may have rights to access, correct, delete, or restrict
                        processing of your personal information, and to object to certain processing. You may also withdraw consent
                        where processing is based on consent.
                    </p>
                    <p className="mt-3 text-sm text-black/70">
                        Requests can be submitted via{" "}
                        <a href="/policies/contact" className="underline">
                            Contact
                        </a>
                        . We may need to verify your identity before acting on a request.
                    </p>
                </section>

                <section id="international" className="mb-10">
                    <h2 className="text-xl font-semibold">14. International Transfers</h2>
                    <p className="mt-3 text-sm text-black/70">
                        If 6Rides operates internationally or uses service providers outside your country, your personal information
                        may be transferred and processed in other jurisdictions. We take steps to ensure appropriate protections are
                        in place where required.
                    </p>
                </section>

                <section id="changes" className="mb-10">
                    <h2 className="text-xl font-semibold">15. Changes to This Policy</h2>
                    <p className="mt-3 text-sm text-black/70">
                        We may update this Privacy Policy periodically. Continued use of the platform after changes means you accept
                        the updated policy.
                    </p>
                </section>

                <section id="contact" className="mb-12">
                    <h2 className="text-xl font-semibold">16. Contact & Complaints</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Questions, requests, or complaints about privacy can be submitted via{" "}
                        <a href="/policies/contact" className="underline">
                            Contact
                        </a>
                        . If you are located in Nigeria, you may also have rights under applicable Nigerian data protection rules.
                    </p>
                </section>

                {/* FOOTNOTE */}
                <div className="border-t border-black/10 pt-6 text-xs text-black/50">
                    This Privacy Policy should be read together with our{" "}
                    <a href="/policies/terms" className="underline">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/policies/acceptable-use" className="underline">
                        Acceptable Use Policy
                    </a>
                    .
                </div>
            </div>
        </main>
    );
}
