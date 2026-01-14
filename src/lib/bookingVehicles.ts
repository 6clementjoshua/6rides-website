// src/lib/bookingVehicles.ts
import { VEHICLES, type VehicleItem } from "@/lib/vehicles";

export type BookingVehicle = VehicleItem & {
    priceNgn: number;
    priceLabel: string;
};

function ngn(n: number) {
    return `₦${n.toLocaleString("en-NG")}`;
}

/**
 * Pricing (NGN) per your instructions:
 * - CLA: 120k
 * - C300: 60k
 * - Mercedes GLE Coupé: 260k
 * - RX 350 Sport: 360k
 * - Urus: 1.6m
 * - Others: assigned based on fuel/segment within 160k–1.6m range
 */
const PRICE_MAP: Record<string, number> = {
    "mercedes-cla": 120_000,
    "mercedes-c300": 100_000,
    "lexus-rx350-sport": 360_000,
    "mercedes-gle-coupe": 260_000,
    "lamborghini-urus": 1_600_000,
    "toyota-camry": 160_000,
    "toyota-camry-sport": 190_000,
    "mercedes-gle": 320_000,
    "mercedes-gwagon": 800_000,
    "cyber-truck": 950_000,
};

export const BOOKING_VEHICLES: BookingVehicle[] = VEHICLES.map((v) => {
    const priceNgn = PRICE_MAP[v.id] ?? 200_000;
    return { ...v, priceNgn, priceLabel: ngn(priceNgn) };
});
