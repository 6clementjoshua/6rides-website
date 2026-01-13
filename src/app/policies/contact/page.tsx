export default function ContactPolicyPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            <div className="mx-auto max-w-4xl px-6 py-16">
                <h1 className="text-3xl font-semibold md:text-4xl">Contact & Support</h1>

                <p className="mt-4 text-sm text-black/70">
                    This page explains how to contact 6Rides for support, safety reports,
                    legal inquiries, corporate partnerships, and regulatory matters.
                </p>

                <section className="policy-section">
                    <h2>Customer Support</h2>
                    <p>
                        Support is available through in-app channels and official contact
                        methods. Response times may vary based on issue type and urgency.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>Safety & Emergency Reports</h2>
                    <p>
                        Safety-related issues should be reported immediately via the app
                        or through official emergency channels. 6Rides may escalate reports
                        internally or to authorities when required.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>Legal & Regulatory Contact</h2>
                    <p>
                        Government agencies, regulators, and legal representatives may
                        submit formal requests through designated legal contact channels.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>Corporate & Partnerships</h2>
                    <p>
                        Corporate accounts, institutions, schools, and partners may contact
                        6Rides for onboarding, billing, and compliance matters.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>Abuse of Support Channels</h2>
                    <p>
                        Misuse of support systems, false reports, or harassment of staff
                        may result in account restrictions.
                    </p>
                </section>

                <footer className="policy-footnote">
                    Contact details may change. Always use official 6Rides channels.
                </footer>
            </div>
        </main>
    );
}
