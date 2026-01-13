export default function SubscriptionBillingPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            <div className="mx-auto max-w-5xl px-6 py-16">
                <header className="mb-12">
                    <h1 className="text-3xl font-semibold md:text-4xl">
                        Subscription & Billing Policy
                    </h1>
                    <p className="mt-4 max-w-3xl text-sm text-black/70">
                        This Subscription & Billing Policy explains how recurring payments,
                        usage-based charges, corporate billing, and partner payouts operate
                        on the 6Rides platform.
                    </p>
                    <p className="mt-2 text-xs text-black/50">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2 text-xs">
                        <a href="/policies/terms" className="policy-chip">Terms</a>
                        <a href="/policies/refunds" className="policy-chip">Refunds</a>
                        <a href="/policies/privacy" className="policy-chip">Privacy</a>
                        <a href="/policies/contact" className="policy-chip">Contact</a>
                    </div>
                </header>

                <section className="policy-toc">
                    <h2>Table of Contents</h2>
                    <ul>
                        <li><a href="#overview">1. Overview</a></li>
                        <li><a href="#subscriptions">2. Subscription Plans</a></li>
                        <li><a href="#billing">3. Billing & Charges</a></li>
                        <li><a href="#renewals">4. Auto-Renewals</a></li>
                        <li><a href="#corporate">5. Corporate Accounts</a></li>
                        <li><a href="#partners">6. Partner Earnings & Payouts</a></li>
                        <li><a href="#taxes">7. Taxes & Regulatory Fees</a></li>
                        <li><a href="#failed">8. Failed Payments</a></li>
                        <li><a href="#changes">9. Changes to Pricing</a></li>
                    </ul>
                </section>

                <section id="overview" className="policy-section">
                    <h2>1. Overview</h2>
                    <p>
                        6Rides may offer subscription plans, usage-based billing, corporate
                        invoicing, and partner earnings. By subscribing or using paid
                        services, you agree to this policy.
                    </p>
                </section>

                <section id="subscriptions" className="policy-section">
                    <h2>2. Subscription Plans</h2>
                    <p>
                        Subscriptions may include ride discounts, priority support,
                        business features, or premium access. Benefits vary by region
                        and availability.
                    </p>
                </section>

                <section id="billing" className="policy-section">
                    <h2>3. Billing & Charges</h2>
                    <ul>
                        <li>Recurring subscription fees</li>
                        <li>Trip fares and service fees</li>
                        <li>Waiting time, tolls, or surcharges</li>
                        <li>Applicable third-party processing fees</li>
                    </ul>
                </section>

                <section id="renewals" className="policy-section">
                    <h2>4. Auto-Renewals</h2>
                    <p>
                        Subscriptions renew automatically unless canceled before the next
                        billing cycle. Cancellation stops future charges but does not
                        retroactively refund prior periods.
                    </p>
                </section>

                <section id="corporate" className="policy-section">
                    <h2>5. Corporate Accounts</h2>
                    <p>
                        Corporate clients may receive consolidated billing, invoicing,
                        usage reports, and negotiated pricing under separate agreements.
                    </p>
                </section>

                <section id="partners" className="policy-section">
                    <h2>6. Partner Earnings & Payouts</h2>
                    <p>
                        Partner payouts are calculated based on completed services, fees,
                        and adjustments. Payout schedules depend on verification and
                        regulatory compliance.
                    </p>
                </section>

                <section id="taxes" className="policy-section">
                    <h2>7. Taxes & Regulatory Fees</h2>
                    <p>
                        Charges may include VAT, levies, or transport-related taxes as
                        required by Nigerian law or international jurisdictions.
                    </p>
                </section>

                <section id="failed" className="policy-section">
                    <h2>8. Failed Payments</h2>
                    <p>
                        Failed or reversed payments may result in service suspension until
                        outstanding balances are resolved.
                    </p>
                </section>

                <section id="changes" className="policy-section">
                    <h2>9. Changes to Pricing</h2>
                    <p>
                        Pricing and subscription benefits may change with notice. Continued
                        use confirms acceptance.
                    </p>
                </section>

                <footer className="policy-footnote">
                    This policy forms part of the 6Rides Terms of Service.
                </footer>
            </div>
        </main>
    );
}
