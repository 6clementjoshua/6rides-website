import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

// Server-only Supabase client (Service Role) for inserts from API route
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        const normalizedEmail = String(email || "")
            .trim()
            .toLowerCase();

        if (!normalizedEmail) {
            return new Response(JSON.stringify({ error: "Email is required" }), {
                status: 400,
            });
        }

        // 1) Save to Supabase waitlist (real waitlist)
        // Table must exist: public.waitlist_6rides with UNIQUE(email)
        const { error: insertError } = await supabase
            .from("waitlist_6rides")
            .insert({ email: normalizedEmail });

        // If email already exists, do not fail the whole request
        // Postgres unique violation code = 23505
        if (insertError && (insertError as any).code !== "23505") {
            console.error("Supabase insert error:", insertError);
            return new Response(JSON.stringify({ error: "Failed to save waitlist" }), {
                status: 500,
            });
        }

        // 2) Send confirmation email
        await resend.emails.send({
            from: "6Rides <no-reply@6rides.com>",
            to: normalizedEmail,
            subject: "You’re on the 6Rides Waitlist",
            html: WAITLIST_EMAIL_HTML,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("Waitlist route error:", error);
        return new Response(JSON.stringify({ error: "Failed to join waitlist" }), {
            status: 500,
        });
    }
}

const WAITLIST_EMAIL_HTML = `
<!doctype html>
<html>

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>You're on the 6Ride Waitlist</title>

  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      color: #0b0b0f;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    }

    .container { background-color: #ffffff; }
    .title { color: #0b0b0f; }
    .text { color: #3a3a3a; }
    .muted { color: #6b6b6b; }

    @media (prefers-color-scheme: dark) {
      body { background-color: #050505 !important; color: #ffffff !important; }
      .container { background-color: #050505 !important; }
      .title { color: #ffffff !important; }
      .text { color: rgba(255,255,255,.72) !important; }
      .muted { color: rgba(255,255,255,.45) !important; }
      .logo-wrap { background: #ffffff !important; }
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
              <img
                src="https://bhgasznglvennqqqthvs.supabase.co/storage/v1/object/public/public-assets/6logo.PNG"
                width="56"
                height="56"
                alt="6Ride"
                class="logo-wrap"
                style="
                  display:block;
                  border-radius:16px;
                  padding:10px;
                  background:#ffffff;
                  box-shadow:0 10px 30px rgba(0,0,0,.25);
                "
              />
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:10px 0 8px;">
              <div class="title" style="font-size:46px;font-weight:800;">
                You’re on the Waitlist
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:10px 18px 26px;">
              <div class="text" style="font-size:18px;line-height:1.6;max-width:520px;">
                Thanks for joining <b>6Ride</b>.
                We’ll email you the moment the app is live on the stores.
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:8px 18px 18px;">
              <a href="https://6rides.com" style="
                display:inline-block;
                padding:18px 34px;
                border-radius:999px;
                background:#ffffff;
                color:#0b0b0f;
                text-decoration:none;
                font-weight:800;
                font-size:18px;
                border:1px solid rgba(0,0,0,.08);
                box-shadow:0 18px 40px rgba(0,0,0,.35);
              ">
                Visit 6Ride
              </a>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:32px 18px 6px;">
              <div class="muted" style="font-size:14px;line-height:1.7;">
                6Clement Joshua<br/>
                Calabar, Nigeria<br/>
                © 6Ride. All rights reserved.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>

</html>
`;
