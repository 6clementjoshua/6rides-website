// src/app/api/partner/route.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "6Ride <no-reply@6rides.com>";
const ADMIN_TO = process.env.PARTNER_ADMIN_EMAIL || "partners@6rides.com";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            fullName,
            email,
            phone,
            city,
            vehicleType,
            vehicleMake,
            vehicleModel,
            vehicleYear,
            notes,
        } = body || {};

        if (!fullName || !email || !phone || !city || !vehicleType || !vehicleMake || !vehicleModel || !vehicleYear) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
        }

        const normalizedEmail = String(email).trim().toLowerCase();

        // 1) Send confirmation to applicant
        await resend.emails.send({
            from: FROM,
            to: normalizedEmail,
            subject: "6Ride Partner Application Received",
            html: partnerApplicantEmailHTML({ fullName }),
        });

        // 2) Notify admin inbox
        await resend.emails.send({
            from: FROM,
            to: ADMIN_TO,
            subject: "New 6Ride Partner Application",
            html: partnerAdminEmailHTML({
                fullName,
                email: normalizedEmail,
                phone,
                city,
                vehicleType,
                vehicleMake,
                vehicleModel,
                vehicleYear,
                notes,
            }),
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        console.error("Partner API error:", err);
        return new Response(JSON.stringify({ error: "Failed to submit partner application" }), { status: 500 });
    }
}

function partnerApplicantEmailHTML({ fullName }: { fullName: string }) {
    return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#ffffff;color:#0b0b0f;">
    <div style="max-width:620px;margin:0 auto;padding:40px 16px;">
      <img src="https://bhgasznglvennqqqthvs.supabase.co/storage/v1/object/public/public-assets/6logo.PNG"
        width="56" height="56border-radius"
        style="display:block;border-radius:16px;padding:10px;background:#ffffff;box-shadow:0 10px 30px rgba(0,0,0,.18);" />
      <h1 style="margin:22px 0 10px;font-size:34px;letter-spacing:-0.02em;">Application received</h1>
      <p style="margin:0 0 14px;font-size:16px;line-height:1.7;color:#3a3a3a;">
        Hello ${escapeHtml(fullName)},<br/>
        We received your 6Ride Partner Fleet application. Our team will review it and contact you.
      </p>
      <a href="https://6rides.com/partners" style="display:inline-block;margin-top:14px;padding:14px 22px;border-radius:999px;background:#0b0b0f;color:#ffffff;text-decoration:none;font-weight:700;">
        View Partner Program
      </a>
      <p style="margin:26px 0 0;font-size:12px;color:#6b6b6b;">
        6Ride. A 6clement Joshua service
      </p>
    </div>
  </body>
</html>`;
}

function partnerAdminEmailHTML(data: any) {
    return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#ffffff;color:#0b0b0f;">
    <div style="max-width:720px;margin:0 auto;padding:36px 16px;">
      <h2 style="margin:0 0 10px;">New Partner Application</h2>
      <div style="padding:14px 16px;border:1px solid rgba(0,0,0,.08);border-radius:16px;background:#fafafa;">
        <div><b>Name:</b> ${escapeHtml(data.fullName)}</div>
        <div><b>Email:</b> ${escapeHtml(data.email)}</div>
        <div><b>Phone:</b> ${escapeHtml(data.phone)}</div>
        <div><b>City:</b> ${escapeHtml(data.city)}</div>
        <div><b>Vehicle:</b> ${escapeHtml(data.vehicleYear)} ${escapeHtml(data.vehicleMake)} ${escapeHtml(data.vehicleModel)} (${escapeHtml(data.vehicleType)})</div>
        <div style="margin-top:10px;"><b>Notes:</b> ${escapeHtml(data.notes || "—")}</div>
      </div>
      <p style="margin:16px 0 0;font-size:12px;color:#6b6b6b;">6Ride. A 6clement Joshua service</p>
    </div>
  </body>
</html>`;
}

function escapeHtml(v: string) {
    return String(v)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
