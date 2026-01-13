"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { VehicleCategory, VehicleItem } from "@/lib/vehicles";
import { VEHICLES } from "@/lib/vehicles";

const easeOut = [0.16, 1, 0.3, 1] as const;

function cx(...v: Array<string | false | null | undefined>) {
    return v.filter(Boolean).join(" ");
}

const CATEGORIES: Array<{ key: VehicleCategory; label: string }> = [
    { key: "sedans", label: "Sedans" },
    { key: "suvs", label: "SUVs" },
    { key: "special", label: "Special" },
];

export default function VehicleShowcase() {
    const [category, setCategory] = useState<VehicleCategory>("suvs");
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    const items = useMemo<VehicleItem[]>(
        () => VEHICLES.filter((v) => v.category === category),
        [category]
    );

    useEffect(() => {
        setIndex(0);
    }, [category]);

    useEffect(() => {
        if (items.length === 0) return;
        if (index > items.length - 1) setIndex(0);
    }, [items.length, index]);

    // Auto-rotate
    useEffect(() => {
        if (paused) return;
        if (items.length <= 1) return;

        const t = setInterval(() => {
            setIndex((i) => (i + 1) % items.length);
        }, 4200);

        return () => clearInterval(t);
    }, [items.length, paused]);

    const active = items[index];

    function prev() {
        if (items.length <= 1) return;
        setIndex((i) => (i - 1 + items.length) % items.length);
    }

    function next() {
        if (items.length <= 1) return;
        setIndex((i) => (i + 1) % items.length);
    }

    /**
     * IMPORTANT:
     * Your cars are facing LEFT.
     * Forward driving direction = LEFT.
     *
     * - Enter from RIGHT (behind)
     * - Exit to LEFT (forward)
     */
    const driveVariants = {
        enter: {
            opacity: 0,
            x: 120, // comes in from the right
            y: 10,
            scale: 0.97,
            filter: "blur(3px)",
        },
        center: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
        },
        exit: {
            opacity: 0,
            x: -190, // exits to the left = forward (because car faces left)
            y: 14,
            scale: 1.08, // forward “toward camera” feel
            filter: "blur(3px)",
        },
    } as const;

    return (
        <div
            className="relative h-[420px] w-full max-w-[520px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Glass sheen */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent" />

            {/* Top controls */}
            <div className="relative z-10 flex items-center justify-between px-4 pt-4">
                <div className="flex items-center gap-2">
                    {CATEGORIES.map((c) => {
                        const isActive = c.key === category;
                        return (
                            <button
                                key={c.key}
                                onClick={() => setCategory(c.key)}
                                className={cx(
                                    "rounded-full px-3 py-1 text-xs transition",
                                    isActive
                                        ? "bg-white text-black"
                                        : "border border-white/15 text-white/70 hover:border-white/30 hover:text-white"
                                )}
                            >
                                {c.label}
                            </button>
                        );
                    })}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={prev}
                        className="rounded-full border border-white/15 bg-black/10 px-3 py-1 text-xs text-white/75 transition hover:border-white/30 hover:text-white"
                        aria-label="Previous vehicle"
                    >
                        ←
                    </button>
                    <button
                        onClick={next}
                        className="rounded-full border border-white/15 bg-black/10 px-3 py-1 text-xs text-white/75 transition hover:border-white/30 hover:text-white"
                        aria-label="Next vehicle"
                    >
                        →
                    </button>
                </div>
            </div>

            {/* Stage */}
            <div className="relative z-10 flex h-full items-center justify-center px-4 pb-12 pt-2">
                {!active ? (
                    <div className="text-center text-white/45">
                        <div className="text-sm font-medium">No vehicles found</div>
                        <div className="mt-2 text-xs text-white/35">
                            Check your vehicles.ts category names for “{category}”.
                        </div>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active.id}
                            variants={driveVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.8, ease: easeOut }}
                            className="relative h-full w-full"
                        >
                            <div className="relative h-full w-full">
                                <Image
                                    src={active.image}
                                    alt={active.name}
                                    fill
                                    priority
                                    className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
                                    sizes="(max-width: 768px) 90vw, 520px"
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>

            {/* Bottom label */}
            <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between px-5 pb-5">
                <div>
                    <div className="text-sm font-semibold text-white">
                        {active?.name ?? "—"}
                    </div>
                    <div className="mt-1 text-xs text-white/55">{active?.badge ?? ""}</div>
                </div>

                <div className="text-xs text-white/45">
                    {active ? `${index + 1}/${items.length}` : `0/${items.length}`}
                </div>
            </div>
        </div>
    );
}
