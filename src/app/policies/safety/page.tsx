export default function SafetyGuidelinesPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            <div className="mx-auto max-w-5xl px-6 py-16">
                {/* HEADER */}
                <header className="mb-12">
                    <h1 className="text-3xl font-semibold md:text-4xl">
                        Safety & Community Guidelines
                    </h1>
                    <p className="mt-4 max-w-3xl text-sm text-black/70">
                        Safety is the foundation of 6Rides. These Safety & Community Guidelines
                        outline how riders, drivers, partners, students, and all users are
                        expected to behave to maintain a secure, respectful, and lawful
                        environment on the 6Rides platform.
                    </p>
                    <p className="mt-2 text-xs text-black/50">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>

                    {/* Cross-links */}
                    <div className="mt-6 flex flex-wrap gap-2 text-xs">
                        <a href="/policies/terms" className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-black/70 hover:text-black">
                            Terms of Service
                        </a>
                        <a href="/policies/acceptable-use" className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-black/70 hover:text-black">
                            Acceptable Use
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
                        <li><a href="#principles" className="hover:underline">1. Safety Principles</a></li>
                        <li><a href="#mutual-respect" className="hover:underline">2. Mutual Respect</a></li>
                        <li><a href="#rider-safety" className="hover:underline">3. Rider Safety</a></li>
                        <li><a href="#driver-safety" className="hover:underline">4. Driver & Partner Safety</a></li>
                        <li><a href="#vehicle-safety" className="hover:underline">5. Vehicle Safety Standards</a></li>
                        <li><a href="#road" className="hover:underline">6. Road & Traffic Compliance</a></li>
                        <li><a href="#minors" className="hover:underline">7. Minors & Student Safety</a></li>
                        <li><a href="#emergency" className="hover:underline">8. Emergency Situations</a></li>
                        <li><a href="#reporting" className="hover:underline">9. Reporting Safety Concerns</a></li>
                        <li><a href="#investigation" className="hover:underline">10. Investigation & Enforcement</a></li>
                        <li><a href="#law" className="hover:underline">11. Law Enforcement Cooperation</a></li>
                        <li><a href="#wellbeing" className="hover:underline">12. Community Wellbeing</a></li>
                        <li><a href="#updates" className="hover:underline">13. Updates to These Guidelines</a></li>
                    </ul>
                </section>

                {/* SECTIONS */}

                <section id="principles" className="mb-10">
                    <h2 className="text-xl font-semibold">1. Safety Principles</h2>
                    <p className="mt-3 text-sm text-black/70">
                        6Rides is built on trust, accountability, and responsibility.
                        Everyone using the platform is expected to prioritize safety over
                        convenience, speed, or profit.
                    </p>
                </section>

                <section id="mutual-respect" className="mb-10">
                    <h2 className="text-xl font-semibold">2. Mutual Respect</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Riders, drivers, partners, and support staff must treat one another
                        with dignity and respect. Harassment, discrimination, threats, or
                        abusive behavior are not tolerated.
                    </p>
                </section>

                <section id="rider-safety" className="mb-10">
                    <h2 className="text-xl font-semibold">3. Rider Safety</h2>
                    <ul className="mt-3 list-disc pl-5 text-sm text-black/70">
                        <li>Confirm vehicle and driver details before entering a car</li>
                        <li>Wear seatbelts where provided</li>
                        <li>Do not pressure drivers to speed or violate traffic laws</li>
                        <li>Report any unsafe behavior immediately</li>
                    </ul>
                </section>

                <section id="driver-safety" className="mb-10">
                    <h2 className="text-xl font-semibold">4. Driver & Partner Safety</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Drivers should refuse trips that feel unsafe or unlawful and may
                        end trips where safety is compromised. Partners must never operate
                        vehicles while impaired or fatigued.
                    </p>
                </section>

                <section id="vehicle-safety" className="mb-10">
                    <h2 className="text-xl font-semibold">5. Vehicle Safety Standards</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Vehicles must be roadworthy, clean, mechanically sound, and compliant
                        with applicable inspection and insurance requirements.
                    </p>
                </section>

                <section id="road" className="mb-10">
                    <h2 className="text-xl font-semibold">6. Road & Traffic Compliance</h2>
                    <p className="mt-3 text-sm text-black/70">
                        All users must comply with Nigerian federal traffic laws, Cross River
                        State regulations, municipal road rules, and international transport
                        laws where applicable.
                    </p>
                </section>

                <section id="minors" className="mb-10">
                    <h2 className="text-xl font-semibold">7. Minors & Student Safety</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Transport involving minors or students is permitted only under
                        verified guardian, school, or institutional authorization. Any
                        deviation is treated as a serious safety violation.
                    </p>
                </section>

                <section id="emergency" className="mb-10">
                    <h2 className="text-xl font-semibold">8. Emergency Situations</h2>
                    <p className="mt-3 text-sm text-black/70">
                        In emergencies, users should prioritize contacting local emergency
                        services (police, ambulance, fire). 6Rides emergency support does not
                        replace government emergency services.
                    </p>
                </section>

                <section id="reporting" className="mb-10">
                    <h2 className="text-xl font-semibold">9. Reporting Safety Concerns</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Safety issues should be reported through the app or via our{" "}
                        <a href="/policies/contact" className="underline">
                            Contact page
                        </a>
                        . Reports are reviewed by safety and compliance teams.
                    </p>
                </section>

                <section id="investigation" className="mb-10">
                    <h2 className="text-xl font-semibold">10. Investigation & Enforcement</h2>
                    <p className="mt-3 text-sm text-black/70">
                        6Rides may investigate incidents, suspend accounts, restrict access,
                        or permanently remove users or partners to protect the community.
                    </p>
                </section>

                <section id="law" className="mb-10">
                    <h2 className="text-xl font-semibold">11. Law Enforcement Cooperation</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Where required by law or public safety needs, 6Rides may cooperate
                        with law enforcement and regulatory authorities.
                    </p>
                </section>

                <section id="wellbeing" className="mb-10">
                    <h2 className="text-xl font-semibold">12. Community Wellbeing</h2>
                    <p className="mt-3 text-sm text-black/70">
                        We encourage a culture of responsibility, calm driving, respectful
                        communication, and care for passengers, partners, and the public.
                    </p>
                </section>

                <section id="updates" className="mb-12">
                    <h2 className="text-xl font-semibold">13. Updates to These Guidelines</h2>
                    <p className="mt-3 text-sm text-black/70">
                        These Safety & Community Guidelines may be updated periodically.
                        Continued use of the platform constitutes acceptance of updates.
                    </p>
                </section>

                {/* FOOTNOTE */}
                <div className="border-t border-black/10 pt-6 text-xs text-black/50">
                    These Safety & Community Guidelines supplement the 6Rides Terms of
                    Service and Acceptable Use Policy.
                </div>
            </div>
        </main>
    );
}
