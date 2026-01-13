export default function RefundCancellationPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            <div className="mx-auto max-w-5xl px-6 py-16">
                {/* HEADER */}
                <header className="mb-12">
                    <h1 className="text-3xl font-semibold md:text-4xl">
                        Refund & Cancellation Policy
                    </h1>
                    <p className="mt-4 max-w-3xl text-sm text-black/70">
                        This Refund & Cancellation Policy explains how trip cancellations,
                        refunds, fees, and adjustments are handled on the 6Rides platform.
                        It applies to ride bookings, food delivery, emergency support,
                        scheduled trips, corporate accounts, and partner services.
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
                        <a href="/policies/safety" className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-black/70 hover:text-black">
                            Safety Guidelines
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
                        <li><a href="#overview" className="hover:underline">1. Policy Overview</a></li>
                        <li><a href="#booking" className="hover:underline">2. Booking & Charges</a></li>
                        <li><a href="#rider-cancel" className="hover:underline">3. Rider Cancellations</a></li>
                        <li><a href="#driver-cancel" className="hover:underline">4. Driver or Partner Cancellations</a></li>
                        <li><a href="#no-show" className="hover:underline">5. No-Show Situations</a></li>
                        <li><a href="#food" className="hover:underline">6. Food Delivery Orders</a></li>
                        <li><a href="#emergency" className="hover:underline">7. Emergency Services</a></li>
                        <li><a href="#scheduled" className="hover:underline">8. Scheduled & Corporate Trips</a></li>
                        <li><a href="#refunds" className="hover:underline">9. Refund Eligibility</a></li>
                        <li><a href="#method" className="hover:underline">10. Refund Method & Timing</a></li>
                        <li><a href="#disputes" className="hover:underline">11. Disputes & Chargebacks</a></li>
                        <li><a href="#abuse" className="hover:underline">12. Abuse of Policy</a></li>
                        <li><a href="#changes" className="hover:underline">13. Policy Changes</a></li>
                    </ul>
                </section>

                {/* SECTIONS */}

                <section id="overview" className="mb-10">
                    <h2 className="text-xl font-semibold">1. Policy Overview</h2>
                    <p className="mt-3 text-sm text-black/70">
                        6Rides aims to be fair to riders while protecting drivers, partners,
                        and the platform from misuse. Refunds are evaluated based on timing,
                        service type, and circumstances surrounding the trip.
                    </p>
                </section>

                <section id="booking" className="mb-10">
                    <h2 className="text-xl font-semibold">2. Booking & Charges</h2>
                    <p className="mt-3 text-sm text-black/70">
                        When a booking is confirmed, applicable charges may include trip
                        fare, service fees, waiting time, tolls, or delivery handling fees.
                        Charges may vary by city, service type, and demand conditions.
                    </p>
                </section>

                <section id="rider-cancel" className="mb-10">
                    <h2 className="text-xl font-semibold">3. Rider Cancellations</h2>
                    <ul className="mt-3 list-disc pl-5 text-sm text-black/70">
                        <li>Free cancellation may apply if canceled shortly after booking</li>
                        <li>Late cancellations may incur a cancellation fee</li>
                        <li>Fees compensate drivers or partners for time and fuel</li>
                    </ul>
                </section>

                <section id="driver-cancel" className="mb-10">
                    <h2 className="text-xl font-semibold">4. Driver or Partner Cancellations</h2>
                    <p className="mt-3 text-sm text-black/70">
                        If a driver or partner cancels after accepting a trip, riders may be
                        eligible for a full refund or automatic rebooking, depending on
                        availability.
                    </p>
                </section>

                <section id="no-show" className="mb-10">
                    <h2 className="text-xl font-semibold">5. No-Show Situations</h2>
                    <p className="mt-3 text-sm text-black/70">
                        If a rider fails to appear within the allowed waiting period, the
                        trip may be marked as a no-show and a fee may apply. No-show fees are
                        non-refundable.
                    </p>
                </section>

                <section id="food" className="mb-10">
                    <h2 className="text-xl font-semibold">6. Food Delivery Orders</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Food orders are typically non-refundable once preparation has begun.
                        Refunds may be considered for incorrect, damaged, or undelivered
                        orders, subject to verification.
                    </p>
                </section>

                <section id="emergency" className="mb-10">
                    <h2 className="text-xl font-semibold">7. Emergency Services</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Emergency response support involves immediate resource allocation.
                        Once dispatched, emergency trips are generally non-refundable unless
                        failure is directly attributable to 6Rides.
                    </p>
                </section>

                <section id="scheduled" className="mb-10">
                    <h2 className="text-xl font-semibold">8. Scheduled & Corporate Trips</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Scheduled or corporate bookings may have specific cancellation
                        windows. Late cancellations may result in partial or full charges
                        based on contractual terms.
                    </p>
                </section>

                <section id="refunds" className="mb-10">
                    <h2 className="text-xl font-semibold">9. Refund Eligibility</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Refunds may be granted where service was not delivered as promised,
                        subject to review. Refunds are not guaranteed and are evaluated on a
                        case-by-case basis.
                    </p>
                </section>

                <section id="method" className="mb-10">
                    <h2 className="text-xl font-semibold">10. Refund Method & Timing</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Approved refunds are processed to the original payment method.
                        Processing times depend on banks, card networks, and payment
                        providers and may take several business days.
                    </p>
                </section>

                <section id="disputes" className="mb-10">
                    <h2 className="text-xl font-semibold">11. Disputes & Chargebacks</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Users are encouraged to contact 6Rides before initiating chargebacks.
                        Abuse of chargeback systems may result in account suspension.
                    </p>
                </section>

                <section id="abuse" className="mb-10">
                    <h2 className="text-xl font-semibold">12. Abuse of Policy</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Repeated refund requests, false claims, or manipulation of the
                        cancellation system may lead to account restrictions or termination.
                    </p>
                </section>

                <section id="changes" className="mb-12">
                    <h2 className="text-xl font-semibold">13. Policy Changes</h2>
                    <p className="mt-3 text-sm text-black/70">
                        This Refund & Cancellation Policy may be updated periodically.
                        Continued use of 6Rides constitutes acceptance of the updated policy.
                    </p>
                </section>

                {/* FOOTNOTE */}
                <div className="border-t border-black/10 pt-6 text-xs text-black/50">
                    This policy forms part of the 6Rides Terms of Service.
                </div>
            </div>
        </main>
    );
}
