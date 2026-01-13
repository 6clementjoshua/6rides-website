// src/lib/vehicles.ts
export type VehicleCategory = "sedans" | "suvs" | "special";

export type VehicleItem = {
    id: string;
    name: string;
    category: VehicleCategory;
    image: string; // path from /public
    badge?: string;
};

export const VEHICLES: VehicleItem[] = [
    // Sedans
    {
        id: "mercedes-cla",
        name: "Mercedes CLA",
        category: "sedans",
        image: "/vehicles/sedans/6ride-sedan-mercedes-cla.png",
        badge: "Sedan • Premium",
    },
    {
        id: "mercedes-c300",
        name: "Mercedes C300",
        category: "sedans",
        image: "/vehicles/sedans/6ride-sedan-mercedes-c300.png",
        badge: "Sedan • Executive",
    },
    {
        id: "toyota-camry",
        name: "Toyota Camry",
        category: "sedans",
        image: "/vehicles/sedans/6ride-sedan-toyota-camry.png",
        badge: "Sedan • Comfort",
    },
    {
        id: "toyota-camry-sport",
        name: "Toyota Camry Sport",
        category: "sedans",
        image: "/vehicles/sedans/6ride-sedan-toyota-camry-sport.png",
        badge: "Sedan • Sport",
    },

    // SUVs
    {
        id: "lexus-rx350-sport",
        name: "Lexus RX 350 Sport",
        category: "suvs",
        image: "/vehicles/suvs/6ride-suv-lexus-rx350-sport.png",
        badge: "SUV • Premium",
    },
    {
        id: "mercedes-gle",
        name: "Mercedes GLE",
        category: "suvs",
        image: "/vehicles/suvs/6ride-suv-mercedes-gle.png",
        badge: "SUV • Luxury",
    },
    {
        id: "mercedes-gle-coupe",
        name: "Mercedes GLE Coupé",
        category: "suvs",
        image: "/vehicles/suvs/6ride-suv-mercedes-gle-coupe.png",
        badge: "SUV • Sport",
    },
    {
        id: "mercedes-gwagon",
        name: "Mercedes G-Wagon",
        category: "suvs",
        image: "/vehicles/suvs/6ride-suv-mercedes-gwagon.png",
        badge: "SUV • Elite",
    },
    {
        id: "lamborghini-urus",
        name: "Lamborghini Urus",
        category: "suvs",
        image: "/vehicles/suvs/6ride-suv-lamborghini-urus.png",
        badge: "SUV • Ultra",
    },

    // Special
    {
        id: "cyber-truck",
        name: "Cyber Truck (Special)",
        category: "special",
        image: "/vehicles/special/6ride-special-cyber-truck.png",
        badge: "Special",
    },
];
