export default function InsuranceLiabilityPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            <div className="mx-auto max-w-5xl px-6 py-16">
                <h1 className="text-3xl font-semibold md:text-4xl">
                    Insurance & Liability Disclosure
                </h1>

                <p className="mt-4 max-w-3xl text-sm text-black/70">
                    This disclosure explains insurance coverage, liability limitations,
                    and responsibility allocation between 6Rides, drivers, partners,
                    riders, and third parties.
                </p>

                <section className="policy-section">
                    <h2>Platform Role</h2>
                    <p>
                        6Rides is a technology and coordination platform. Drivers and
                        partners operate independently unless explicitly stated otherwise.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>Insurance Coverage</h2>
                    <p>
                        Insurance coverage may be provided by partners, third-party insurers,
                        or required by law. Coverage scope varies by location and service.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>User Responsibility</h2>
                    <p>
                        Users are responsible for personal belongings, conduct, and
                        compliance with applicable laws during trips.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>Limitation of Liability</h2>
                    <p>
                        To the maximum extent permitted by law, 6Rides is not liable for
                        indirect, incidental, or consequential damages.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>Third-Party Claims</h2>
                    <p>
                        Claims involving third parties may be handled by insurers,
                        authorities, or courts according to jurisdictional rules.
                    </p>
                </section>

                <footer className="policy-footnote">
                    This disclosure supplements the Terms of Service and Partner Terms.
                </footer>
            </div>
        </main>
    );
}
