export const ALLOWED_FROM = [
    "partners@6rides.com",
    "emergency@6rides.com",
    "sales@6rides.com",
    "booking@6rides.com",
    "support@6rides.com",
    "privacy@6rides.com",
    "billing@6rides.com",
    "legal@6rides.com",
] as const;

export type AllowedFrom = (typeof ALLOWED_FROM)[number];

export function isAllowedFrom(v: string): v is AllowedFrom {
    return (ALLOWED_FROM as readonly string[]).includes(v);
}
