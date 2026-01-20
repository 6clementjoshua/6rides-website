// app/api/bookings/attempt/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import { BOOKING_VEHICLES } from "@/lib/bookingVehicles";

// IMPORTANT: ensure Node runtime (crypto + resend)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function mustGet(name: string) {
    const v = process.env[name];
    if (!v) throw new Error(`Missing env: ${name}`);
    return v;
}

function base64url(input: Buffer | string) {
    const b = Buffer.isBuffer(input) ? input : Buffer.from(input);
    return b.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function signToken(payload: object) {
    const secret = mustGet("BOOKING_TOKEN_SECRET");
    const body = base64url(JSON.stringify(payload));
    const sig = base64url(crypto.createHmac("sha256", secret).update(body).digest());
    return `${body}.${sig}`;
}

function escapeHtml(s: string) {
    return String(s ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function bookingEmailHTML(args: {
    customer_name: string;
    customer_email: string;
    attempt_id: string;
    created_at: string;

    pickup_location: string;
    dropoff_location: string;
    notes: string;

    selected_car_name: string;
    selected_car_price: string;
    selected_car_image_url: string;

    availability_message: string;
    subscribe_url: string;
}) {
    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>6Ride Booking Update</title>
  <style>
    body {margin:0;padding:0;background-color:#ffffff;color:#0b0b0f;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;}
    .container {background-color:#ffffff;}
    .title {color:#0b0b0f;}
    .text {color:#3a3a3a;}
    .muted {color:#6b6b6b;}
    @media (prefers-color-scheme: dark){
      body{background-color:#050505 !important;color:#ffffff !important;}
      .container{background-color:#050505 !important;}
      .title{color:#ffffff !important;}
      .text{color:rgba(255,255,255,.72) !important;}
      .muted{color:rgba(255,255,255,.45) !important;}
    }
    .card{border:1px solid rgba(0,0,0,.08);border-radius:22px;overflow:hidden;background:#ffffff;box-shadow:0 18px 40px rgba(0,0,0,.12);}
    .divider{height:1px;background:rgba(0,0,0,.08);margin:0;}
    .pill{display:inline-block;padding:8px 12px;border-radius:999px;border:1px solid rgba(0,0,0,.08);background:rgba(0,0,0,.02);font-size:12px;font-weight:800;color:rgba(0,0,0,.70);}
    .btn-dark{display:inline-block;padding:16px 28px;border-radius:999px;background:#0b0b0f;color:#ffffff;text-decoration:none;font-weight:900;font-size:16px;border:1px solid rgba(255,255,255,.10);box-shadow:0 18px 40px rgba(0,0,0,.35);}
    .btn{display:inline-block;padding:16px 28px;border-radius:999px;background:#ffffff;color:#0b0b0f;text-decoration:none;font-weight:900;font-size:16px;border:1px solid rgba(0,0,0,.08);box-shadow:0 18px 40px rgba(0,0,0,.22);}
    .kv{width:100%;border-collapse:collapse;}
    .kv td{padding:10px 0;vertical-align:top;font-size:14px;line-height:1.6;}
    .k{width:40%;color:rgba(0,0,0,.58);font-weight:900;padding-right:12px;}
    .v{width:60%;color:rgba(0,0,0,.82);font-weight:650;}
    @media (max-width:640px){.k,.v{display:block;width:100% !important;}.k{padding-bottom:4px;}}
    @media (prefers-color-scheme: dark){
      .card{background:#070707 !important;border-color:rgba(255,255,255,.12) !important;box-shadow:0 18px 40px rgba(0,0,0,.55) !important;}
      .divider{background:rgba(255,255,255,.12) !important;}
      .pill{border-color:rgba(255,255,255,.14) !important;background:rgba(255,255,255,.06) !important;color:rgba(255,255,255,.70) !important;}
      .k{color:rgba(255,255,255,.55) !important;}
      .v{color:rgba(255,255,255,.82) !important;}
      .btn{background:#ffffff !important;color:#0b0b0f !important;border-color:rgba(255,255,255,.14) !important;}
    }
  </style>
</head>
<body>
  <table width="100%" cellspacing="0" cellpadding="0" class="container">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="620" style="max-width:620px;">

          <tr>
            <td align="center" style="padding:10px 0 18px;">
              <img src="https://bhgasznglvennqqqthvs.supabase.co/storage/v1/object/public/public-assets/6logo.PNG"
                width="56" height="56" alt="6Ride"
                style="display:block;border-radius:16px;padding:10px;background:#ffffff;box-shadow:0 10px 30px rgba(0,0,0,.25);" />
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:10px 0 6px;">
              <div class="title" style="font-size:44px;font-weight:900;letter-spacing:-.02em;">Booking Update</div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:8px 18px 18px;">
              <div class="text" style="font-size:17px;line-height:1.65;max-width:560px;">
                Hello <b>${escapeHtml(args.customer_name)}</b>, thank you for choosing <b>6Ride</b>.
                We received your booking attempt and reviewed availability.
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:10px 0 18px;">
              <table width="100%" cellspacing="0" cellpadding="0" class="card">
                <tr>
                  <td style="padding:18px 18px 12px;">
                    <span class="pill">Status</span>
                    <div class="title" style="margin-top:10px;font-size:22px;font-weight:900;">Unavailable right now</div>
                    <div class="text" style="margin-top:8px;font-size:15px;line-height:1.7;">
                      ${escapeHtml(args.availability_message)}
                    </div>
                  </td>
                </tr>

                <tr><td><div class="divider"></div></td></tr>

                <tr>
                  <td style="padding:16px 18px;">
                    <div class="title" style="font-size:14px;font-weight:900;opacity:.85;">Vehicle you selected</div>

                    <table width="100%" cellspacing="0" cellpadding="0" style="margin-top:12px;">
                      <tr>
                        <td style="width:140px;vertical-align:top;padding-right:14px;">
                          <img
                            src="${escapeHtml(args.selected_car_image_url)}"
                            width="140" height="96"
                            alt="${escapeHtml(args.selected_car_name)}"
                            style="display:block;width:140px;height:96px;object-fit:contain;border-radius:16px;border:1px solid rgba(0,0,0,.08);background:rgba(0,0,0,.02);"
                          />
                        </td>
                        <td style="vertical-align:top;">
                          <div class="title" style="font-size:18px;font-weight:900;">${escapeHtml(args.selected_car_name)}</div>
                          <div class="text" style="margin-top:6px;font-size:14px;line-height:1.6;">
                            Price: <b>${escapeHtml(args.selected_car_price)}</b>
                          </div>
                          <div class="muted" style="margin-top:10px;font-size:12px;line-height:1.6;">
                            Reference: ${escapeHtml(args.attempt_id)} • ${escapeHtml(args.created_at)}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr><td><div class="divider"></div></td></tr>

                <tr>
                  <td style="padding:16px 18px 10px;">
                    <div class="title" style="font-size:14px;font-weight:900;opacity:.85;">Your submitted details</div>

                    <table class="kv" style="margin-top:10px;">
                      <tr><td class="k">Pickup location</td><td class="v">${escapeHtml(args.pickup_location || "—")}</td></tr>
                      <tr><td class="k">Destination</td><td class="v">${escapeHtml(args.dropoff_location || "—")}</td></tr>
                      <tr><td class="k">Email</td><td class="v">${escapeHtml(args.customer_email)}</td></tr>
                      <tr><td class="k">Notes</td><td class="v">${escapeHtml(args.notes || "—")}</td></tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:16px 18px 18px;">
                    <div class="text" style="font-size:14px;line-height:1.7;">
                      Want an update the moment <b>6Ride</b> becomes available? Subscribe and we’ll notify you first.
                    </div>

                    <div style="text-align:center;padding:14px 0 0;">
                      <a href="${escapeHtml(args.subscribe_url)}" class="btn-dark">Subscribe for Availability Updates</a>
                    </div>

                    <div style="text-align:center;padding:12px 0 0;">
                      <a href="https://6rides.com" class="btn">Visit 6Ride</a>
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:18px 18px 6px;">
              <div class="muted" style="font-size:14px;line-height:1.7;">
                6Clement Joshua<br />
                Calabar, NNigeriaria<br />
                © 6Ride. All rights reserved.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: Request) {
    try {
        // Match working waitlist pattern where possible
        const RESEND_API_KEY = mustGet("RESEND_API_KEY");
        const BOOKING_TOKEN_SECRET = mustGet("BOOKING_TOKEN_SECRET");
        void BOOKING_TOKEN_SECRET; // ensures it is present

        // IMPORTANT: many projects only have NEXT_PUBLIC_SUPABASE_URL (like your working waitlist)
        const SUPABASE_URL =
            process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
        if (!SUPABASE_URL) throw new Error("Missing env: SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)");

        const SUPABASE_SERVICE_ROLE_KEY =
            process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error("Missing env: SUPABASE_SERVICE_ROLE_KEY");

        const SITE_URL = mustGet("NEXT_PUBLIC_SITE_URL").replace(/\/$/, "");

        // Prefer a known-good verified sender like your waitlist route.
        // If RESEND_FROM is present, use it; otherwise fallback.
        const RESEND_FROM = process.env.RESEND_FROM || "6Ride <no-reply@6rides.com>";

        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
            auth: { persistSession: false },
        });
        const resend = new Resend(RESEND_API_KEY);

        const body = await req.json();

        const name = String(body?.name ?? "").trim();
        const email = String(body?.email ?? "").trim().toLowerCase();
        const phone = String(body?.phone ?? "").trim();
        const pickup_location = String(body?.pickup_location ?? "").trim();
        const dropoff_location = String(body?.dropoff_location ?? "").trim();
        const notes = String(body?.notes ?? "").trim();
        const vehicle_id = String(body?.vehicle_id ?? "").trim(); // baseId from modal

        if (!name || !email || !vehicle_id) {
            return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
        }

        // FIX: bookingVehicles now uses baseId/uid; API receives baseId
        const vehicle =
            (BOOKING_VEHICLES as any).find((v: any) => v.baseId === vehicle_id) ??
            BOOKING_VEHICLES.find((v: any) => v.id === vehicle_id);

        if (!vehicle) {
            return NextResponse.json({ ok: false, error: "Vehicle not found" }, { status: 400 });
        }

        const availability_message =
            `Hello ${name}. Sorry, this ride is in use. ${vehicle.name} is currently unavailable due to high demand and ongoing orders. ` +
            `Please try other rides and do well to book early next time. Thank you — 6Ride.`;
        const carImageAbs =
            `${SITE_URL}${String(vehicle.image ?? "").startsWith("/") ? vehicle.image : `/${vehicle.image}`}`;

        const { data: inserted, error: insErr } = await supabase
            .from("booking_attempts")
            .insert({
                name,
                email,
                phone,
                pickup_location,
                dropoff_location,
                notes,
                car_key: vehicle.baseId ?? vehicle.id,
                car_name: vehicle.name,
                car_price: vehicle.priceLabel,
                car_image_url: carImageAbs, // store absolute for safety
                availability_status: "unavailable",
                availability_message,
            })
            .select("id, created_at")
            .single();

        if (insErr || !inserted?.id) {
            console.error("Supabase insert error (booking_attempts):", insErr);
            return NextResponse.json(
                { ok: false, error: "Failed to save booking attempt", detail: insErr?.message ?? null },
                { status: 500 }
            );
        }

        const token = signToken({ email, attempt_id: inserted.id, ts: Date.now() });
        const subscribe_url = `${SITE_URL}/api/notify/subscribe?token=${encodeURIComponent(token)}`;

        const html = bookingEmailHTML({
            customer_name: name,
            customer_email: email,
            attempt_id: inserted.id,
            created_at: new Date(inserted.created_at).toISOString(),
            pickup_location,
            dropoff_location,
            notes,
            selected_car_name: vehicle.name,
            selected_car_price: vehicle.priceLabel,
            selected_car_image_url: carImageAbs,
            availability_message,
            subscribe_url,
        });

        // FIX: check resend result and return real error if it fails (and log it)
        const { data: sent, error: sendErr } = await resend.emails.send({
            from: RESEND_FROM,
            to: email, // keep same as waitlist (string), not array
            subject: "6Ride Booking Update — Unavailable right now",
            html,
        });

        if (sendErr) {
            console.error("Resend send error (booking):", sendErr);
            return NextResponse.json(
                {
                    ok: false,
                    error: "Email failed to send",
                    resend_message: sendErr.message,
                    attempt_id: inserted.id,
                    from: RESEND_FROM,
                },
                { status: 502 }
            );
        }

        return NextResponse.json({
            ok: true,
            attempt_id: inserted.id,
            availability_message,
            resend_id: sent?.id ?? null,
        });
    } catch (e: any) {
        console.error("Booking route error:", e);
        return NextResponse.json({ ok: false, error: e?.message ?? "Server error" }, { status: 500 });
    }
}
