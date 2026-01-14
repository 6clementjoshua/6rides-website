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
    "mercedes-cla": 260_000,
    "mercedes-c300": 250_000,
    "lexus-rx350-sport": 360_000,
    "mercedes-gle-coupe": 460_000,
    "lamborghini-urus": 2_600_000,
    "toyota-camry": 260_000,
    "toyota-camry-sport": 390_000,
    "mercedes-gle": 520_000,
    "mercedes-gwagon": 800_000,
    "cyber-truck": 1_950_000,
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
