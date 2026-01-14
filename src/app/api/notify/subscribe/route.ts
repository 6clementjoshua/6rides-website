// app/api/notify/subscribe/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

function mustGet(name: string) {
    const v = process.env[name];
    if (!v) throw new Error(`Missing env: ${name}`);
    return v;
}

function base64urlToStr(s: string) {
    const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
    const b64 = (s + pad).replace(/-/g, "+").replace(/_/g, "/");
    return Buffer.from(b64, "base64").toString("utf8");
}

function base64url(input: Buffer | string) {
    const b = Buffer.isBuffer(input) ? input : Buffer.from(input);
    return b.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function verifyToken(token: string) {
    const secret = mustGet("BOOKING_TOKEN_SECRET");
    const [body, sig] = token.split(".");
    if (!body || !sig) return null;

    const expected = base64url(crypto.createHmac("sha256", secret).update(body).digest());
    if (expected !== sig) return null;

    try {
        const payload = JSON.parse(base64urlToStr(body));
        if (!payload?.email || !payload?.attempt_id) return null;
        return payload as { email: string; attempt_id: string; ts?: number };
    } catch {
        return null;
    }
}

function escapeHtml(s: string) {
    return String(s ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function pageHtml(title: string, message: string) {
    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>${escapeHtml(title)}</title>
  <style>
    body{margin:0;padding:0;background:#050505;color:#fff;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;}
    .wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:30px 16px;}
    .card{width:min(680px,94vw);border-radius:26px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);backdrop-filter: blur(18px);padding:26px;box-shadow:0 30px 90px rgba(0,0,0,.65);}
    .logo{width:54px;height:54px;border-radius:16px;background:#fff;padding:10px;display:block;box-shadow:0 10px 30px rgba(0,0,0,.35);}
    .h{margin-top:16px;font-size:28px;font-weight:900;}
    .p{margin-top:10px;font-size:15px;line-height:1.7;color:rgba(255,255,255,.74);}
    .btn{display:inline-block;margin-top:16px;padding:14px 22px;border-radius:999px;background:#fff;color:#0b0b0f;border:1px solid rgba(255,255,255,.18);text-decoration:none;font-weight:900;}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <img class="logo" src="https://bhgasznglvennqqqthvs.supabase.co/storage/v1/object/public/public-assets/6logo.PNG" alt="6Rides" />
      <div class="h">${escapeHtml(title)}</div>
      <div class="p">${escapeHtml(message)}</div>
      <a class="btn" href="https://6rides.com">Back to 6Rides</a>
    </div>
  </div>
</body>
</html>`;
}

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const token = url.searchParams.get("token") ?? "";
        const payload = verifyToken(token);

        if (!payload) {
            return new NextResponse(pageHtml("Invalid link", "This subscription link is invalid or expired."), {
                status: 400,
                headers: { "content-type": "text/html; charset=utf-8" },
            });
        }

        const SUPABASE_URL = mustGet("SUPABASE_URL");
        const SUPABASE_SERVICE_ROLE_KEY = mustGet("SUPABASE_SERVICE_ROLE_KEY");

        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
            auth: { persistSession: false },
        });

        const { data: attempt } = await supabase
            .from("booking_attempts")
            .select("id, name, email, car_name, pickup_location")
            .eq("id", payload.attempt_id)
            .single();

        const email = String(payload.email).toLowerCase();

        await supabase.from("availability_subscribers").upsert(
            {
                email,
                name: attempt?.name ?? null,
                last_car_name: attempt?.car_name ?? null,
                last_pickup_location: attempt?.pickup_location ?? null,
                last_attempt_id: attempt?.id ?? payload.attempt_id,
                status: "active",
            },
            { onConflict: "email" }
        );

        await supabase.from("booking_attempts").update({ subscribe_opt_in: true }).eq("id", payload.attempt_id);

        return new NextResponse(pageHtml("Subscribed", "You will be notified when 6Rides becomes available. Thank you."), {
            status: 200,
            headers: { "content-type": "text/html; charset=utf-8" },
        });
    } catch {
        return new NextResponse(pageHtml("Error", "Something went wrong. Please try again later."), {
            status: 500,
            headers: { "content-type": "text/html; charset=utf-8" },
        });
    }
}
