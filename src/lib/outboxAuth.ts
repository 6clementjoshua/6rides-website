import crypto from "crypto";

function mustGet(name: string) {
    const v = process.env[name];
    if (!v) throw new Error(`Missing env: ${name}`);
    return v;
}

export function parseAdminEmails(): string[] {
    const raw = mustGet("OUTBOX_ADMIN_EMAILS");
    return raw
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
}

export function isAllowedAdmin(email: string | null | undefined): boolean {
    if (!email) return false;
    return parseAdminEmails().includes(email.toLowerCase());
}

// OUTBOX_PIN_HASH format: pbkdf2:ITERATIONS:HEXHASH
export function verifyPin(pin: string): boolean {
    const salt = mustGet("OUTBOX_PIN_SALT");
    const spec = mustGet("OUTBOX_PIN_HASH");
    const [kind, iterStr, expectedHex] = spec.split(":");
    if (kind !== "pbkdf2") return false;

    const it = Number(iterStr);
    if (!Number.isFinite(it) || it < 50000) return false;

    const derivedHex = crypto.pbkdf2Sync(pin, salt, it, 32, "sha256").toString("hex");

    const a = Buffer.from(derivedHex, "hex");
    const b = Buffer.from(expectedHex, "hex");
    if (a.length !== b.length) return false;

    return crypto.timingSafeEqual(a, b);
}
