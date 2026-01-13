export default function CorporateSLAPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            <div className="mx-auto max-w-5xl px-6 py-16">
                <h1 className="text-3xl font-semibold md:text-4xl">
                    Corporate SLA & Enterprise Terms
                </h1>

                <p className="mt-4 max-w-3xl text-sm text-black/70">
                    These Corporate SLA & Enterprise Terms apply to organizations,
                    institutions, hotels, campuses, and government entities using
                    6Rides for structured transportation services.
                </p>

                <section className="policy-section">
                    <h2>Service Scope</h2>
                    <p>
                        Corporate services may include scheduled trips, invoicing,
                        reporting, priority support, and compliance-based operations.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>Availability & Performance</h2>
                    <p>
                        While 6Rides targets high availability, services are subject to
                        traffic, weather, regulatory, and operational conditions.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>Billing & Invoicing</h2>
                    <p>
                        Corporate accounts may receive consolidated invoices and
                        customized billing cycles under written agreements.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>Compliance & Conduct</h2>
                    <p>
                        Corporate users must ensure employees and guests comply with
                        platform rules, safety standards, and local laws.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>Suspension & Termination</h2>
                    <p>
                        6Rides may suspend or terminate enterprise services for serious
                        violations, non-payment, or legal requirements.
                    </p>
                </section>

                <footer className="policy-footnote">
                    Enterprise services may also be governed by separate written agreements.
                </footer>
            </div>
        </main>
    );
}
