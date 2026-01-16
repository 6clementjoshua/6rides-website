import { BRAND } from "./brand";

type ShellOptions = {
    title: string;          // <title> tag + top headline
    preheader?: string;     // hidden preview text in inbox
    bodyHtml: string;       // the main inner content (card(s), tables, etc.)
};

export function emailShell({ title, preheader, bodyHtml }: ShellOptions) {
    const pre = (preheader ?? "").trim();

    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>${escapeHtml(title)}</title>

  <style>
    body{margin:0;padding:0;background-color:#ffffff;color:#0b0b0f;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;}
    .container{background-color:#ffffff;}
    .title{color:#0b0b0f;}
    .text{color:#3a3a3a;}
    .muted{color:#6b6b6b;}

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

    .footer-links a{color:inherit;text-decoration:underline;text-underline-offset:3px;}
    @media (prefers-color-scheme: dark){
      .card{background:#070707 !important;border-color:rgba(255,255,255,.12) !important;box-shadow:0 18px 40px rgba(0,0,0,.55) !important;}
      .divider{background:rgba(255,255,255,.12) !important;}
      .pill{border-color:rgba(255,255,255,.14) !important;background:rgba(255,255,255,.06) !important;color:rgba(255,255,255,.70) !important;}
      .btn{background:#ffffff !important;color:#0b0b0f !important;border-color:rgba(255,255,255,.14) !important;}
    }
  </style>
</head>

<body>
  ${pre ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(pre)}</div>` : ""}

  <table width="100%" cellspacing="0" cellpadding="0" class="container">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="620" style="max-width:620px;">

          <tr>
            <td align="center" style="padding:10px 0 18px;">
              <img
                src="${BRAND.logoUrl}"
                width="56" height="56" alt="${escapeHtml(BRAND.name)}"
                style="display:block;border-radius:16px;padding:10px;background:#ffffff;box-shadow:0 10px 30px rgba(0,0,0,.25);"
              />
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:10px 0 6px;">
              <div class="title" style="font-size:44px;font-weight:900;letter-spacing:-.02em;">
                ${escapeHtml(title)}
              </div>
            </td>
          </tr>

          ${bodyHtml}

          <tr>
            <td align="center" style="padding:16px 18px 6px;">
              <div class="muted footer-links" style="font-size:12px;line-height:1.7;">
                <a href="${BRAND.links.privacy}">Privacy</a> ·
                <a href="${BRAND.links.terms}">Terms</a> ·
                <a href="${BRAND.links.contact}">Contact</a> ·
                <a href="${BRAND.links.cookies}">Cookies</a>
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:8px 18px 6px;">
              <div class="muted" style="font-size:14px;line-height:1.7;">
                ${BRAND.addressLines.map((l) => `${escapeHtml(l)}<br/>`).join("")}
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

function escapeHtml(input: string) {
    return input
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
