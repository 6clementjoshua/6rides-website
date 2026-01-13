export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            <div className="mx-auto max-w-5xl px-6 py-16">
                {/* HEADER */}
                <header className="mb-12">
                    <h1 className="text-3xl font-semibold md:text-4xl">
                        Terms of Service
                    </h1>
                    <p className="mt-4 max-w-3xl text-sm text-black/70">
                        These Terms of Service (“Terms”) govern access to and use of the 6Rides
                        platform, including ride coordination, chauffeur services, partner
                        vehicles, food delivery, emergency support, and related mobility
                        services operated by or through 6Rides.
                    </p>
                    <p className="mt-2 text-xs text-black/50">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </header>

                {/* TOC */}
                <section className="mb-14 rounded-2xl border border-black/10 bg-black/[0.02] p-6">
                    <h2 className="text-lg font-semibold">Table of Contents</h2>
                    <ul className="mt-4 grid gap-2 text-sm text-black/70 md:grid-cols-2">
                        <li><a href="#acceptance" className="hover:underline">1. Acceptance of Terms</a></li>
                        <li><a href="#about" className="hover:underline">2. About 6Rides</a></li>
                        <li><a href="#eligibility" className="hover:underline">3. Eligibility & Age Requirements</a></li>
                        <li><a href="#services" className="hover:underline">4. Scope of Services</a></li>
                        <li><a href="#accounts" className="hover:underline">5. Accounts & Verification</a></li>
                        <li><a href="#payments" className="hover:underline">6. Payments, Pricing & Fees</a></li>
                        <li><a href="#safety" className="hover:underline">7. Safety & Conduct Standards</a></li>
                        <li><a href="#drivers" className="hover:underline">8. Drivers & Partner Vehicles</a></li>
                        <li><a href="#minors" className="hover:underline">9. Minors, Students & Guardians</a></li>
                        <li><a href="#emergency" className="hover:underline">10. Emergency & Medical Transport</a></li>
                        <li><a href="#delivery" className="hover:underline">11. Food & Item Delivery</a></li>
                        <li><a href="#compliance" className="hover:underline">12. Legal & Regulatory Compliance</a></li>
                        <li><a href="#termination" className="hover:underline">13. Suspension & Termination</a></li>
                        <li><a href="#liability" className="hover:underline">14. Liability & Disclaimers</a></li>
                        <li><a href="#privacy" className="hover:underline">15. Privacy & Data Protection</a></li>
                        <li><a href="#international" className="hover:underline">16. International Use</a></li>
                        <li><a href="#changes" className="hover:underline">17. Changes to These Terms</a></li>
                        <li><a href="#contact" className="hover:underline">18. Contact Information</a></li>
                    </ul>
                </section>

                {/* SECTIONS */}

                <section id="acceptance" className="mb-10">
                    <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
                    <p className="mt-3 text-sm text-black/70">
                        By accessing or using the 6Rides website, mobile application, or
                        services, you confirm that you have read, understood, and agreed to
                        these Terms. If you do not agree, you must not use the platform.
                    </p>
                </section>

                <section id="about" className="mb-10">
                    <h2 className="text-xl font-semibold">2. About 6Rides</h2>
                    <p className="mt-3 text-sm text-black/70">
                        6Rides is a mobility coordination platform offering ride-hailing,
                        chauffeur services, partner-listed premium vehicles, food delivery,
                        emergency support, and related transportation services. Operations
                        originate in Nigeria, with headquarters focus in Cross River State,
                        and extend to other Nigerian cities and international markets.
                    </p>
                </section>

                <section id="eligibility" className="mb-10">
                    <h2 className="text-xl font-semibold">3. Eligibility & Age Requirements</h2>
                    <p className="mt-3 text-sm text-black/70">
                        You must be at least 18 years old to create an independent account.
                        Minors may only use 6Rides under a verified parent, guardian, school,
                        or institutional arrangement, and only where permitted by law.
                    </p>
                </section>

                <section id="services" className="mb-10">
                    <h2 className="text-xl font-semibold">4. Scope of Services</h2>
                    <ul className="mt-3 list-disc pl-5 text-sm text-black/70">
                        <li>On-demand and scheduled rides</li>
                        <li>Chauffeur and executive transport</li>
                        <li>Partner-listed premium vehicles</li>
                        <li>Food and item delivery</li>
                        <li>Emergency and support transport</li>
                    </ul>
                </section>

                <section id="accounts" className="mb-10">
                    <h2 className="text-xl font-semibold">5. Accounts & Verification</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Users may be required to provide accurate personal information,
                        identity verification, and contact details. Providing false,
                        misleading, or fraudulent information may result in suspension or
                        permanent account termination.
                    </p>
                </section>

                <section id="payments" className="mb-10">
                    <h2 className="text-xl font-semibold">6. Payments, Pricing & Fees</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Pricing may vary by location, service type, demand, and regulatory
                        requirements. Payments may be processed through approved payment
                        providers. See our{" "}
                        <a href="/policies/subscription-billing" className="underline">
                            Subscription & Billing Policy
                        </a>{" "}
                        for details.
                    </p>
                </section>

                <section id="safety" className="mb-10">
                    <h2 className="text-xl font-semibold">7. Safety & Conduct Standards</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Users, drivers, and partners must behave respectfully, lawfully, and
                        safely at all times. Violence, harassment, abuse, illegal activity,
                        or misuse of the platform will result in immediate action.
                    </p>
                </section>

                <section id="drivers" className="mb-10">
                    <h2 className="text-xl font-semibold">8. Drivers & Partner Vehicles</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Drivers and partner vehicle owners are independent contractors, not
                        employees of 6Rides. 6Rides enforces brand, safety, and quality
                        standards but does not control day-to-day driving decisions.
                    </p>
                </section>

                <section id="minors" className="mb-10">
                    <h2 className="text-xl font-semibold">9. Minors, Students & Guardians</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Student and minor transportation may be offered only under verified
                        guardian, school, or institutional arrangements. Guardians assume
                        responsibility for authorization, supervision, and consent.
                    </p>
                </section>

                <section id="emergency" className="mb-10">
                    <h2 className="text-xl font-semibold">10. Emergency & Medical Transport</h2>
                    <p className="mt-3 text-sm text-black/70">
                        6Rides emergency services are not a replacement for government
                        ambulance, police, or fire services. In life-threatening situations,
                        users must contact local emergency authorities immediately.
                    </p>
                </section>

                <section id="delivery" className="mb-10">
                    <h2 className="text-xl font-semibold">11. Food & Item Delivery</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Delivery services are subject to availability, safety standards, and
                        local regulations. 6Rides is not responsible for restaurant food
                        preparation, quality, or third-party packaging failures.
                    </p>
                </section>

                <section id="compliance" className="mb-10">
                    <h2 className="text-xl font-semibold">12. Legal & Regulatory Compliance</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Users must comply with all applicable laws, including Nigerian
                        federal laws, Cross River State regulations, municipal transport
                        rules, and international laws where services are offered.
                    </p>
                </section>

                <section id="termination" className="mb-10">
                    <h2 className="text-xl font-semibold">13. Suspension & Termination</h2>
                    <p className="mt-3 text-sm text-black/70">
                        6Rides may suspend or permanently terminate accounts that violate
                        these Terms, applicable laws, or our{" "}
                        <a href="/policies/acceptable-use" className="underline">
                            Acceptable Use Policy
                        </a>
                        .
                    </p>
                </section>

                <section id="liability" className="mb-10">
                    <h2 className="text-xl font-semibold">14. Liability & Disclaimers</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Services are provided “as is” and “as available.” To the maximum
                        extent permitted by law, 6Rides disclaims liability for indirect,
                        incidental, or consequential damages.
                    </p>
                </section>

                <section id="privacy" className="mb-10">
                    <h2 className="text-xl font-semibold">15. Privacy & Data Protection</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Personal data is handled according to our{" "}
                        <a href="/policies/privacy" className="underline">
                            Privacy Policy
                        </a>
                        , including data protection laws applicable in Nigeria and
                        internationally.
                    </p>
                </section>

                <section id="international" className="mb-10">
                    <h2 className="text-xl font-semibold">16. International Use</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Users accessing 6Rides from outside Nigeria are responsible for
                        compliance with local laws. Certain features may vary by region.
                    </p>
                </section>

                <section id="changes" className="mb-10">
                    <h2 className="text-xl font-semibold">17. Changes to These Terms</h2>
                    <p className="mt-3 text-sm text-black/70">
                        We may update these Terms periodically. Continued use of the platform
                        after changes constitutes acceptance of the revised Terms.
                    </p>
                </section>

                <section id="contact" className="mb-12">
                    <h2 className="text-xl font-semibold">18. Contact Information</h2>
                    <p className="mt-3 text-sm text-black/70">
                        For questions about these Terms, please visit our{" "}
                        <a href="/policies/contact" className="underline">
                            Contact page
                        </a>
                        .
                    </p>
                </section>

                {/* FOOTNOTE */}
                <div className="border-t border-black/10 pt-6 text-xs text-black/50">
                    These Terms form a legally binding agreement between you and 6Rides.
                </div>
            </div>
        </main>
    );
}
