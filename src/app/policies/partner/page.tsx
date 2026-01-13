export default function PartnerPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            <div className="mx-auto max-w-5xl px-6 py-16">
                {/* HEADER */}
                <header className="mb-12">
                    <h1 className="text-3xl font-semibold md:text-4xl">
                        Partner & Driver Terms
                    </h1>
                    <p className="mt-4 max-w-3xl text-sm text-black/70">
                        These Partner & Driver Terms (“Partner Terms”) govern participation
                        in the 6Rides platform as a driver, vehicle owner, fleet operator, or
                        service partner. They apply to operations in Nigeria (including Cross
                        River State and all cities) and internationally where 6Rides operates.
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
                        <a href="/policies/acceptable-use" className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-black/70 hover:text-black">
                            Acceptable Use
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
                        <li><a href="#relationship" className="hover:underline">1. Partner Relationship</a></li>
                        <li><a href="#eligibility" className="hover:underline">2. Eligibility & Onboarding</a></li>
                        <li><a href="#vehicles" className="hover:underline">3. Vehicle Requirements</a></li>
                        <li><a href="#conduct" className="hover:underline">4. Driver Conduct & Standards</a></li>
                        <li><a href="#operations" className="hover:underline">5. Operational Rules</a></li>
                        <li><a href="#payments" className="hover:underline">6. Earnings, Fees & Payouts</a></li>
                        <li><a href="#safety" className="hover:underline">7. Safety & Compliance</a></li>
                        <li><a href="#minors" className="hover:underline">8. Minors & Student Transport</a></li>
                        <li><a href="#insurance" className="hover:underline">9. Insurance & Liability</a></li>
                        <li><a href="#branding" className="hover:underline">10. Branding & Appearance</a></li>
                        <li><a href="#suspension" className="hover:underline">11. Suspension & Termination</a></li>
                        <li><a href="#data" className="hover:underline">12. Data & Privacy</a></li>
                        <li><a href="#international" className="hover:underline">13. International Operations</a></li>
                        <li><a href="#changes" className="hover:underline">14. Changes to These Terms</a></li>
                        <li><a href="#contact" className="hover:underline">15. Contact</a></li>
                    </ul>
                </section>

                {/* SECTIONS */}

                <section id="relationship" className="mb-10">
                    <h2 className="text-xl font-semibold">1. Partner Relationship</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Drivers and vehicle owners participating on 6Rides act as independent
                        contractors. Nothing in these Partner Terms creates an employment,
                        agency, or joint venture relationship between you and 6Rides.
                    </p>
                </section>

                <section id="eligibility" className="mb-10">
                    <h2 className="text-xl font-semibold">2. Eligibility & Onboarding</h2>
                    <ul className="mt-3 list-disc pl-5 text-sm text-black/70">
                        <li>Valid government-issued identification</li>
                        <li>Valid driver’s license (where applicable)</li>
                        <li>Background or document verification where required</li>
                        <li>Legal right to operate a vehicle in your jurisdiction</li>
                    </ul>
                    <p className="mt-3 text-sm text-black/70">
                        6Rides may approve, reject, or revoke partner access at its discretion.
                    </p>
                </section>

                <section id="vehicles" className="mb-10">
                    <h2 className="text-xl font-semibold">3. Vehicle Requirements</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Partner vehicles must meet category standards defined by 6Rides,
                        including cleanliness, mechanical condition, interior quality, and
                        legal registration. Vehicles may be inspected physically or digitally.
                    </p>
                </section>

                <section id="conduct" className="mb-10">
                    <h2 className="text-xl font-semibold">4. Driver Conduct & Standards</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Drivers must maintain professional conduct at all times. The
                        following are strictly prohibited:
                    </p>
                    <ul className="mt-3 list-disc pl-5 text-sm text-black/70">
                        <li>Harassment, abuse, or discrimination</li>
                        <li>Driving under the influence of alcohol or drugs</li>
                        <li>Unsafe or reckless driving</li>
                        <li>Soliciting cash payments outside the platform</li>
                    </ul>
                </section>

                <section id="operations" className="mb-10">
                    <h2 className="text-xl font-semibold">5. Operational Rules</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Partners must follow pickup instructions, routing guidance, and
                        service rules provided through the app. Trip acceptance, completion,
                        and cancellations are monitored to ensure platform reliability.
                    </p>
                </section>

                <section id="payments" className="mb-10">
                    <h2 className="text-xl font-semibold">6. Earnings, Fees & Payouts</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Earnings are calculated per trip or under partner programs as
                        disclosed in the app or agreements. Platform service fees, taxes, or
                        regulatory charges may apply.
                    </p>
                    <p className="mt-3 text-sm text-black/70">
                        Payouts are processed via approved payment providers. See{" "}
                        <a href="/policies/subscription-billing" className="underline">
                            Subscription & Billing
                        </a>{" "}
                        for details.
                    </p>
                </section>

                <section id="safety" className="mb-10">
                    <h2 className="text-xl font-semibold">7. Safety & Compliance</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Partners must comply with Nigerian federal law, Cross River State
                        transport regulations, local traffic rules, and applicable
                        international laws where operating.
                    </p>
                </section>

                <section id="minors" className="mb-10">
                    <h2 className="text-xl font-semibold">8. Minors & Student Transport</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Transport involving minors or students may only occur under verified
                        guardian, school, or institutional arrangements. Drivers must follow
                        all safety and consent requirements strictly.
                    </p>
                </section>

                <section id="insurance" className="mb-10">
                    <h2 className="text-xl font-semibold">9. Insurance & Liability</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Partners are responsible for maintaining valid vehicle insurance as
                        required by law. 6Rides does not provide personal vehicle insurance
                        unless explicitly stated in writing.
                    </p>
                </section>

                <section id="branding" className="mb-10">
                    <h2 className="text-xl font-semibold">10. Branding & Appearance</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Where branding is provided (uniforms, delivery boxes, decals),
                        partners must use them as instructed. Misuse of 6Rides branding is
                        prohibited.
                    </p>
                </section>

                <section id="suspension" className="mb-10">
                    <h2 className="text-xl font-semibold">11. Suspension & Termination</h2>
                    <p className="mt-3 text-sm text-black/70">
                        6Rides may suspend or permanently terminate partner access for safety
                        violations, legal non-compliance, poor service quality, fraud, or
                        breach of these Partner Terms.
                    </p>
                </section>

                <section id="data" className="mb-10">
                    <h2 className="text-xl font-semibold">12. Data & Privacy</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Partner data is processed according to our{" "}
                        <a href="/policies/privacy" className="underline">
                            Privacy Policy
                        </a>
                        . Trip records may be retained for compliance, safety, and dispute
                        resolution.
                    </p>
                </section>

                <section id="international" className="mb-10">
                    <h2 className="text-xl font-semibold">13. International Operations</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Partners operating outside Nigeria are responsible for complying
                        with local licensing, tax, and transport regulations.
                    </p>
                </section>

                <section id="changes" className="mb-10">
                    <h2 className="text-xl font-semibold">14. Changes to These Terms</h2>
                    <p className="mt-3 text-sm text-black/70">
                        These Partner Terms may be updated periodically. Continued
                        participation constitutes acceptance of any revised terms.
                    </p>
                </section>

                <section id="contact" className="mb-12">
                    <h2 className="text-xl font-semibold">15. Contact</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Questions regarding partner participation should be directed via our{" "}
                        <a href="/policies/contact" className="underline">
                            Contact page
                        </a>
                        .
                    </p>
                </section>

                {/* FOOTNOTE */}
                <div className="border-t border-black/10 pt-6 text-xs text-black/50">
                    These Partner & Driver Terms form a binding agreement between you and
                    6Rides.
                </div>
            </div>
        </main>
    );
}
