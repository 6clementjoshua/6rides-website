// src/lib/bookingVehicles.ts
import { VEHICLES, type VehicleItem } from "@/lib/vehicles";

export type BookingVehicle = VehicleItem & {
    // stable id used for booking/API
    baseId: string;

    // guaranteed unique id for UI keys/selection
    uid: string;

    priceNgn: number;
    priceLabel: string;
};

function ngn(n: number) {
    return `₦${n.toLocaleString("en-NG")}`;
}

/**
 * Pricing (NGN)
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

export const BOOKING_VEHICLES: BookingVehicle[] = VEHICLES.map((v, index) => {
    const baseId = String(v.id ?? "").trim() || `vehicle-${index}`;
    const uid = `${baseId}__${index}`; // GUARANTEED UNIQUE

    const priceNgn = PRICE_MAP[baseId] ?? 200_000;

    return {
        ...v,
        baseId,
        uid,
        priceNgn,
        priceLabel: ngn(priceNgn),
    };
});
