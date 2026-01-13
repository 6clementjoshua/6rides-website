// src/app/partners/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

type Status = "idle" | "loading" | "success" | "error";

export default function PartnersPage() {
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState("");

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [vehicleType, setVehicleType] = useState<"Sedan" | "SUV" | "Special">("SUV");
    const [vehicleMake, setVehicleMake] = useState("");
    const [vehicleModel, setVehicleModel] = useState("");
    const [vehicleYear, setVehicleYear] = useState("");
    const [notes, setNotes] = useState("");

    const canSubmit = useMemo(() => {
        const e = email.trim().toLowerCase();
        return (
            fullName.trim().length >= 2 &&
            e.includes("@") &&
            e.includes(".") &&
            phone.trim().length >= 7 &&
            city.trim().length >= 2 &&
            vehicleMake.trim().length >= 2 &&
            vehicleModel.trim().length >= 1 &&
            vehicleYear.trim().length >= 4
        );
    }, [fullName, email, phone, city, vehicleMake, vehicleModel, vehicleYear]);

    async function submit() {
        if (!canSubmit || status === "loading") return;
        setStatus("loading");
        setError("");

        try {
            const res = await fetch("/api/partner", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: fullName.trim(),
                    email: email.trim().toLowerCase(),
                    phone: phone.trim(),
                    city: city.trim(),
                    vehicleType,
                    vehicleMake: vehicleMake.trim(),
                    vehicleModel: vehicleModel.trim(),
                    vehicleYear: vehicleYear.trim(),
                    notes: notes.trim() || null,
                    createdAt: new Date().toISOString(),
                }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.error || "Request failed");
            }

            setStatus("success");
        } catch (e: any) {
            setStatus("error");
            setError(e?.message || "Could not submit right now. Please try again.");
        }
    }

    return (
        <main className="min-h-screen bg-white text-black">
            <div className="mx-auto max-w-5xl px-6 py-14">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-xs font-semibold text-black/60">6Rides</div>
                        <h1 className="mt-2 text-3xl font-semibold md:text-4xl">Partner Fleet Program</h1>
                        <p className="mt-3 max-w-2xl text-sm text-black/60">
                            List your premium vehicle with 6Rides. We uphold brand standards, verification, and premium service quality.
                        </p>
                    </div>

                    <Link
                        href="/"
                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black hover:border-black/20"
                    >
                        Back Home
                    </Link>
                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-2">
                    {/* Left: standards */}
                    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                        <div className="text-sm font-semibold">What partners get</div>
                        <ul className="mt-3 space-y-2 text-sm text-black/70">
                            <li>• Monthly payout structure based on vehicle class + utilization</li>
                            <li>• Brand standards and premium presentation</li>
                            <li>• Verified operations and customer support</li>
                            <li>• Clear rules to protect partners, riders, and drivers</li>
                        </ul>

                        <div className="mt-6 text-sm font-semibold">Requirements</div>
                        <ul className="mt-3 space-y-2 text-sm text-black/70">
                            <li>• Valid vehicle documents (ownership/registration/insurance as required)</li>
                            <li>• Vehicle must meet premium condition standards</li>
                            <li>• Partner contact and verification checks</li>
                        </ul>
                    </div>

                    {/* Right: form */}
                    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                        <div className="text-sm font-semibold">Apply to become a partner</div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <Field label="Full name">
                                <input
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/20"
                                    placeholder="6Clement Joshua"
                                />
                            </Field>

                            <Field label="Email">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/20"
                                    placeholder="you@email.com"
                                    inputMode="email"
                                />
                            </Field>

                            <Field label="Phone">
                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/20"
                                    placeholder="+234..."
                                />
                            </Field>

                            <Field label="City">
                                <input
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/20"
                                    placeholder="Calabar"
                                />
                            </Field>

                            <Field label="Vehicle class">
                                <select
                                    value={vehicleType}
                                    onChange={(e) => setVehicleType(e.target.value as any)}
                                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/20"
                                >
                                    <option>Sedan</option>
                                    <option>SUV</option>
                                    <option>Special</option>
                                </select>
                            </Field>

                            <Field label="Vehicle year">
                                <input
                                    value={vehicleYear}
                                    onChange={(e) => setVehicleYear(e.target.value)}
                                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/20"
                                    placeholder="2021"
                                />
                            </Field>

                            <Field label="Make (e.g., Mercedes)">
                                <input
                                    value={vehicleMake}
                                    onChange={(e) => setVehicleMake(e.target.value)}
                                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/20"
                                    placeholder="Mercedes"
                                />
                            </Field>

                            <Field label="Model (e.g., GLE Coupe)">
                                <input
                                    value={vehicleModel}
                                    onChange={(e) => setVehicleModel(e.target.value)}
                                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/20"
                                    placeholder="GLE Coupe"
                                />
                            </Field>
                        </div>

                        <Field label="Notes (optional)">
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/20"
                                placeholder="Anything you want us to know..."
                                rows={4}
                            />
                        </Field>

                        {status === "error" ? (
                            <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700">
                                {error}
                            </div>
                        ) : null}

                        {status === "success" ? (
                            <div className="mt-4 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-800">
                                Application received. We will contact you after review.
                            </div>
                        ) : null}

                        <div className="mt-5 flex items-center justify-between gap-3">
                            <div className="text-xs text-black/45">
                                By applying, you agree to the Partner Policy.
                            </div>

                            <motion.button
                                onClick={submit}
                                disabled={!canSubmit || status === "loading" || status === "success"}
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.98 }}
                                className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition disabled:opacity-50"
                            >
                                {status === "loading" ? "Submitting..." : status === "success" ? "Submitted" : "Submit"}
                            </motion.button>
                        </div>

                        <div className="mt-4 text-xs text-black/50">
                            If you need faster onboarding, contact support@6rides.com.
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function Field({ label, children }: { label: string; children: any }) {
    return (
        <div className="mt-4">
            <div className="text-xs font-semibold text-black/60">{label}</div>
            <div className="mt-1">{children}</div>
        </div>
    );
}
