export default function EmergencyDisclaimerPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            <div className="mx-auto max-w-4xl px-6 py-16">
                <h1 className="text-3xl font-semibold md:text-4xl">
                    Emergency Services Disclaimer
                </h1>

                <p className="mt-4 text-sm text-black/70">
                    This Emergency Services Disclaimer clarifies the scope and limitations
                    of emergency-related support provided through the 6Rides platform.
                </p>

                <section className="policy-section">
                    <h2>Not a Replacement for Emergency Services</h2>
                    <p>
                        6Rides is not a hospital, ambulance provider, police service, or
                        fire department. Users must contact local emergency services
                        directly in urgent or life-threatening situations.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>Emergency Support Scope</h2>
                    <p>
                        Any emergency-related assistance offered by 6Rides is limited to
                        transportation coordination and does not include medical diagnosis,
                        treatment, or rescue operations.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>No Medical or Legal Advice</h2>
                    <p>
                        6Rides does not provide medical, legal, or emergency advice.
                        Decisions made during emergencies remain the responsibility of
                        users and authorities.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>Limitation of Liability</h2>
                    <p>
                        To the maximum extent permitted by law, 6Rides is not liable for
                        outcomes arising from emergency situations, delays, or third-party
                        actions.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>Law Enforcement & Authorities</h2>
                    <p>
                        6Rides may cooperate with emergency responders, hospitals, and law
                        enforcement when required by law or public safety.
                    </p>
                </section>

                <footer className="policy-footnote">
                    This disclaimer supplements the Terms of Service and Safety Guidelines.
                </footer>
            </div>
        </main>
    );
}
