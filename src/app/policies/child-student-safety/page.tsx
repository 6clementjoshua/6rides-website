export default function ChildStudentSafetyPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            <div className="mx-auto max-w-5xl px-6 py-16">
                <header className="mb-12">
                    <h1 className="text-3xl font-semibold md:text-4xl">
                        Child & Student Safety Addendum
                    </h1>
                    <p className="mt-4 max-w-3xl text-sm text-black/70">
                        This addendum supplements the 6Rides Terms of Service and Safety
                        Guidelines and applies specifically to services involving minors,
                        students, schools, campuses, and educational institutions.
                    </p>
                    <p className="mt-2 text-xs text-black/50">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </header>

                <section className="mb-10 rounded-2xl border border-black/10 bg-black/[0.02] p-6">
                    <h2 className="text-lg font-semibold">Table of Contents</h2>
                    <ul className="mt-4 grid gap-2 text-sm text-black/70 md:grid-cols-2">
                        <li><a href="#scope">1. Scope & Purpose</a></li>
                        <li><a href="#authorization">2. Guardian & Institutional Authorization</a></li>
                        <li><a href="#eligibility">3. Eligibility & Age Rules</a></li>
                        <li><a href="#driver">4. Driver & Partner Responsibilities</a></li>
                        <li><a href="#pickup">5. Pickup & Drop-off Rules</a></li>
                        <li><a href="#conduct">6. Conduct Standards</a></li>
                        <li><a href="#monitoring">7. Monitoring & Reporting</a></li>
                        <li><a href="#violations">8. Violations & Enforcement</a></li>
                    </ul>
                </section>

                <section id="scope" className="mb-10">
                    <h2 className="text-xl font-semibold">1. Scope & Purpose</h2>
                    <p className="mt-3 text-sm text-black/70">
                        This policy exists to protect minors and students using 6Rides,
                        whether for school transport, campus movement, tutoring, events,
                        or guardian-approved trips.
                    </p>
                </section>

                <section id="authorization" className="mb-10">
                    <h2 className="text-xl font-semibold">2. Guardian & Institutional Authorization</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Transportation involving minors requires explicit authorization
                        from a parent, legal guardian, or approved institution. Unauthorized
                        transport is strictly prohibited.
                    </p>
                </section>

                <section id="eligibility" className="mb-10">
                    <h2 className="text-xl font-semibold">3. Eligibility & Age Rules</h2>
                    <ul className="mt-3 list-disc pl-5 text-sm text-black/70">
                        <li>Minors may not create accounts independently</li>
                        <li>Student services may require institutional verification</li>
                        <li>Age-restricted services may vary by jurisdiction</li>
                    </ul>
                </section>

                <section id="driver" className="mb-10">
                    <h2 className="text-xl font-semibold">4. Driver & Partner Responsibilities</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Drivers must maintain professional conduct, avoid unnecessary
                        conversation, and never deviate from approved routes or stops.
                    </p>
                </section>

                <section id="pickup" className="mb-10">
                    <h2 className="text-xl font-semibold">5. Pickup & Drop-off Rules</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Pickups and drop-offs must occur at approved locations. Drivers may
                        refuse trips where safety or authorization is unclear.
                    </p>
                </section>

                <section id="conduct" className="mb-10">
                    <h2 className="text-xl font-semibold">6. Conduct Standards</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Any form of harassment, inappropriate interaction, or boundary
                        violation results in immediate suspension and investigation.
                    </p>
                </section>

                <section id="monitoring" className="mb-10">
                    <h2 className="text-xl font-semibold">7. Monitoring & Reporting</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Guardians, schools, and institutions may report concerns through
                        official 6Rides channels. Serious matters may be escalated to
                        authorities.
                    </p>
                </section>

                <section id="violations" className="mb-12">
                    <h2 className="text-xl font-semibold">8. Violations & Enforcement</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Violations may result in permanent account removal and cooperation
                        with law enforcement where required.
                    </p>
                </section>

                <div className="border-t border-black/10 pt-6 text-xs text-black/50">
                    This addendum forms part of the 6Rides Terms of Service and Safety Guidelines.
                </div>
            </div>
        </main>
    );
}
