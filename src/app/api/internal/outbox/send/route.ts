import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { emailShell } from "@/lib/email/shell";
import { isAllowedAdmin, verifyPin } from "@/lib/outboxAuth";
import { isAllowedFrom } from "@/lib/email/from";
import { renderTemplate, type TemplateKey } from "@/lib/email/templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function mustGet(name: string) {
    const v = process.env[name];
    if (!v) throw new Error(`Missing env: ${name}`);
    return v;
}

function noindexHeaders() {
    return {
        "X-Robots-Tag": "noindex, nofollow, noarchive",
        "Cache-Control": "no-store",
    };
}

type Payload = {
    pin: string;
    from: string; // must be one of your 8
    to: string;
    cc?: string;
    bcc?: string;

    // If subject is empty in UI, we will fallback to template hint
    subject?: string;

    // Template support
    templateKey?: TemplateKey;
    vars?: Record<string, any>; // customerName, messageHtml, plus later booking vars

    // Optional headline override (if you want)
    headlineOverride?: string;
};

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as Payload;

        // PIN
        if (!body?.pin || !verifyPin(String(body.pin))) {
            return NextResponse.json({ error: "Invalid PIN" }, { status: 401, headers: noindexHeaders() });
        }

        // Validate "from" locked list
        const from = String(body.from || "").trim().toLowerCase();
        if (!isAllowedFrom(from)) {
            return NextResponse.json({ error: "From address not allowed" }, { status: 400, headers: noindexHeaders() });
        }

        // Auth token (Supabase session access token)
        const auth = req.headers.get("authorization") || "";
        const token = auth.startsWith("Bearer ") ? auth.slice("Bearer ".length) : null;
        if (!token) {
            return NextResponse.json({ error: "Missing auth token" }, { status: 401, headers: noindexHeaders() });
        }

        const supabaseUrl = mustGet("NEXT_PUBLIC_SUPABASE_URL");
        const anonKey = mustGet("NEXT_PUBLIC_SUPABASE_ANON_KEY");

        const authed = createClient(supabaseUrl, anonKey, {
            global: { headers: { Authorization: `Bearer ${token}` } },
        });

        const { data: userData, error: userErr } = await authed.auth.getUser();
        if (userErr || !userData?.user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401, headers: noindexHeaders() });
        }

        const adminEmail = userData.user.email ?? "";
        if (!isAllowedAdmin(adminEmail)) {
            return NextResponse.json({ error: "Not authorized" }, { status: 403, headers: noindexHeaders() });
        }

        // Validate fields
        const to = String(body.to || "").trim();
        if (!to) {
            return NextResponse.json({ error: "Missing required field: to" }, { status: 400, headers: noindexHeaders() });
        }

        const key: TemplateKey = (body.templateKey as TemplateKey) || "custom";
        const vars = body.vars || {};

        // Make sure custom has content
        if (key === "custom") {
            const msg = String(vars.messageHtml ?? "").trim();
            if (!msg) {
                return NextResponse.json(
                    { error: "Missing required field: vars.messageHtml" },
                    { status: 400, headers: noindexHeaders() }
                );
            }
        }

        // Render template (returns bodyHtml + headline + subjectHint)
        const tpl = renderTemplate(key, vars);

        const subject = String(body.subject || "").trim() || tpl.subjectHint || "6ride Message";
        const title = String(body.headlineOverride || vars.headlineOverride || "").trim() || tpl.headline || subject;

        // Wrap with your branded shell (logo + footer links + dark mode)
        const html = emailShell({
            title,
            preheader: subject,
            bodyHtml: tpl.bodyHtml,
        });

        const resend = new Resend(mustGet("RESEND_API_KEY"));
        const sendRes = await resend.emails.send({
            from,
            to,
            cc: body.cc?.trim() || undefined,
            bcc: body.bcc?.trim() || undefined,
            subject,
            html,
        });

        if (sendRes.error) {
            return NextResponse.json(
                { error: "Resend error", detail: sendRes.error },
                { status: 502, headers: noindexHeaders() }
            );
        }

        return NextResponse.json(
            { ok: true, id: (sendRes.data as any)?.id ?? null },
            { status: 200, headers: noindexHeaders() }
        );
    } catch (e: any) {
        return NextResponse.json({ error: e?.message || "Server error" }, { status: 500, headers: noindexHeaders() });
    }
}
