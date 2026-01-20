"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

type Props = {
    open: boolean;
    onClose: () => void;
    source?: string; // e.g. "hero"
};

export default function WaitlistModal({ open, onClose, source = "hero" }: Props) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [error, setError] = useState<string>("");

    const canSubmit = useMemo(() => {
        const e = email.trim().toLowerCase();
        return e.length > 5 && e.includes("@") && e.includes(".");
    }, [email]);

    useEffect(() => {
        if (!open) return;
        setStatus("idle");
        setError("");
        // keep inputs; feels premium (user can retry)
    }, [open]);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        if (open) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    async function submit() {
        if (!canSubmit || status === "loading") return;
        setStatus("loading");
        setError("");

        try {
            // Prevent duplicates on this device (simple, effective for landing)
            const key = "sixrides_waitlist_emails";
            const existing = JSON.parse(localStorage.getItem(key) || "[]") as string[];
            const normalized = email.trim().toLowerCase();

            if (existing.includes(normalized)) {
                setStatus("success");
                return;
            }

            // Optional: send to API route (safe even if you later change backend)
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: normalized,
                    name: name.trim() || null,
                    source,
                    createdAt: new Date().toISOString(),
                }),
            });

            if (!res.ok) throw new Error("Request failed");

            localStorage.setItem(key, JSON.stringify([...existing, normalized]));
            setStatus("success");
        } catch (e) {
            setStatus("error");
            setError("Could not join waitlist right now. Please try again.");
        }
    }

    return (
        <AnimatePresence>
            {open ? (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <motion.button
                        aria-label="Close modal"
                        className="absolute inset-0 bg-black/70"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Dialog */}
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        className="relative w-full max-w-[520px] rounded-3xl border border-white/10 bg-[#0b0b0f]/85 p-5 shadow-2xl backdrop-blur-xl"
                        initial={{ y: 18, scale: 0.985, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        exit={{ y: 12, scale: 0.99, opacity: 0 }}
                        transition={{ duration: 0.35, ease: easeOut }}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <div className="text-lg font-semibold text-white">Join the 6Ride Waitlist</div>
                                <div className="mt-1 text-sm text-white/60">
                                    Get early access to the 6Ride app and premium features.
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70 transition hover:border-white/30 hover:text-white"
                            >
                                Close
                            </button>
                        </div>

                        <div className="mt-5 space-y-3">
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <div className="text-xs font-medium text-white/70">Name (optional)</div>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="6Clement Joshua"
                                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <div className="text-xs font-medium text-white/70">Email</div>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@email.com"
                                        inputMode="email"
                                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25"
                                    />
                                </div>
                            </div>

                            {status === "error" ? (
                                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                                    {error}
                                </div>
                            ) : null}

                            {status === "success" ? (
                                <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                                    You’re on the waitlist. Check your email for updates.
                                </div>
                            ) : null}

                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div className="text-xs text-white/45">
                                    By joining, you agree to be contacted about 6Ride updates.
                                </div>

                                <button
                                    onClick={submit}
                                    disabled={!canSubmit || status === "loading"}
                                    className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition disabled:opacity-50"
                                >
                                    {status === "loading" ? "Joining..." : status === "success" ? "Joined" : "Join Waitlist"}
                                </button>
                            </div>
                        </div>

                        {/* subtle corner glow */}
                        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
