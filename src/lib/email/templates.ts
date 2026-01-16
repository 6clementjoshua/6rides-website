// src/lib/email/templates.ts

export type TemplateKey =
  | "custom"
  | "booking_update"
  | "payment_receipt"
  | "billing_issue"
  | "legal_notice"
  | "emergency_update"
  | "partner_message"
  | "sales_followup"
  | "privacy_notice";

type CommonVars = {
  customerName?: string;
};

type BookingVars = CommonVars & {
  // Header area
  introHtml?: string; // optional intro paragraph under headline

  // Status card
  statusPill?: string; // e.g. "Status"
  statusTitle: string; // required
  statusMessage: string; // required (may include <br/>)

  // Vehicle block
  vehicleName?: string;
  vehicleImageUrl?: string;
  vehicleImageAlt?: string;
  vehiclePrice?: string;

  // Reference line (e.g. "UUID • ISO timestamp")
  reference?: string;

  // Details
  pickup?: string;
  destination?: string;
  email?: string;
  notes?: string;

  // CTA
  primaryCtaLabel?: string;
  primaryCtaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;

  // Optional message below details
  closingNoteHtml?: string;
};

type SimpleNoticeVars = CommonVars & {
  title: string;
  message: string; // can include <br/>
  primaryCtaLabel?: string;
  primaryCtaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  footnote?: string;
};

export function templateKeys(): { key: TemplateKey; label: string }[] {
  return [
    { key: "custom", label: "Custom" },
    { key: "booking_update", label: "Booking Update" },
    { key: "payment_receipt", label: "Payment Receipt" },
    { key: "billing_issue", label: "Billing Issue" },
    { key: "legal_notice", label: "Legal Notice" },
    { key: "emergency_update", label: "Emergency Update" },
    { key: "partner_message", label: "Partner Message" },
    { key: "sales_followup", label: "Sales Follow-up" },
    { key: "privacy_notice", label: "Privacy Notice" },
  ];
}

/**
 * Returns BODY HTML ONLY (goes inside emailShell bodyHtml wrapper)
 * Uses the CSS classes defined in emailShell: card, divider, pill, btn-dark, btn, title, text, muted.
 */
export function renderTemplate(
  key: TemplateKey,
  vars: Record<string, any>
): { headline: string; bodyHtml: string; subjectHint: string } {
  switch (key) {
    case "booking_update":
      return renderBookingUpdate(vars as BookingVars);

    case "payment_receipt":
      return renderSimpleNotice("Payment Receipt", {
        title: "Payment confirmed",
        message:
          `Hello${vars?.customerName ? ` <b>${escape(vars.customerName)}</b>` : ""}, your payment has been received successfully.<br/><br/>` +
          `If you have any questions, reply to this email and our team will help.`,
        primaryCtaLabel: "Visit 6ride",
        primaryCtaUrl: "https://www.6rides.com",
        secondaryCtaLabel: "Contact Support",
        secondaryCtaUrl: "https://www.6rides.com/policies/contact",
      });

    case "billing_issue":
      return renderSimpleNotice("Billing Issue", {
        title: "Action needed on billing",
        message:
          `Hello${vars?.customerName ? ` <b>${escape(vars.customerName)}</b>` : ""}, we couldn’t process your billing update.<br/><br/>` +
          `Please review your payment method to avoid service interruption.`,
        primaryCtaLabel: "Update Billing",
        primaryCtaUrl: "https://www.6rides.com",
        secondaryCtaLabel: "Contact Billing",
        secondaryCtaUrl: "https://www.6rides.com/policies/contact",
      });

    case "legal_notice":
      return renderSimpleNotice("Legal Notice", {
        title: "Important legal notice",
        message:
          `This message contains an important notice related to your use of our services.<br/><br/>` +
          `Please review and keep for your records.`,
        primaryCtaLabel: "View Terms",
        primaryCtaUrl: "https://www.6rides.com/policies/terms",
        secondaryCtaLabel: "Contact Legal",
        secondaryCtaUrl: "https://www.6rides.com/policies/contact",
        footnote: "This is an informational notice and does not waive any rights.",
      });

    case "emergency_update":
      return renderSimpleNotice("Emergency Update", {
        title: "Emergency request update",
        message:
          `We received your emergency-related request and our team is reviewing it.<br/><br/>` +
          `If immediate danger exists, contact local emergency services first. Our program is humanitarian support, not a hospital or clinic.`,
        primaryCtaLabel: "Contact Emergency Desk",
        primaryCtaUrl: "https://www.6rides.com/policies/contact",
        secondaryCtaLabel: "Visit 6ride",
        secondaryCtaUrl: "https://www.6rides.com",
      });

    case "partner_message":
      return renderSimpleNotice("Partner Message", {
        title: "Partner communication",
        message:
          `Hello${vars?.customerName ? ` <b>${escape(vars.customerName)}</b>` : ""}, here is an update from the 6ride partnerships desk.<br/><br/>` +
          `Reply to this email with any questions.`,
        primaryCtaLabel: "Visit 6ride",
        primaryCtaUrl: "https://www.6rides.com",
        secondaryCtaLabel: "Contact Partnerships",
        secondaryCtaUrl: "https://www.6rides.com/policies/contact",
      });

    case "sales_followup":
      return renderSimpleNotice("Sales Follow-up", {
        title: "Following up",
        message:
          `Hello${vars?.customerName ? ` <b>${escape(vars.customerName)}</b>` : ""}, we’re following up on your request.<br/><br/>` +
          `Tell us what you need and we’ll respond quickly.`,
        primaryCtaLabel: "Visit 6ride",
        primaryCtaUrl: "https://www.6rides.com",
        secondaryCtaLabel: "Contact Sales",
        secondaryCtaUrl: "https://www.6rides.com/policies/contact",
      });

    case "privacy_notice":
      return renderSimpleNotice("Privacy Notice", {
        title: "Privacy update",
        message:
          `We’re sharing an update related to privacy and data handling.<br/><br/>` +
          `For details, review our Privacy Policy.`,
        primaryCtaLabel: "View Privacy Policy",
        primaryCtaUrl: "https://www.6rides.com/policies/privacy",
        secondaryCtaLabel: "Contact Privacy",
        secondaryCtaUrl: "https://www.6rides.com/policies/contact",
      });

    case "custom":
    default:
      return {
        headline: "Message",
        subjectHint: "6ride Message",
        bodyHtml: `
<tr>
  <td align="center" style="padding:8px 18px 18px;">
    <table width="100%" cellspacing="0" cellpadding="0" class="card">
      <tr>
        <td style="padding:18px 18px 18px;">
          <div class="text" style="font-size:15px;line-height:1.7;">
            ${safeHtml(String(vars?.messageHtml ?? "Type your message."))}
          </div>
        </td>
      </tr>
    </table>
  </td>
</tr>`,
      };
  }
}

function renderBookingUpdate(v: BookingVars) {
  const headline = "Booking Update";
  const subjectHint = "6ride Booking Update";

  const customerName = v.customerName ? escape(v.customerName) : "";
  const intro =
    v.introHtml?.trim() ||
    `Hello${customerName ? ` <b>${customerName}</b>` : ""}, thank you for choosing <b>6ride</b>. We received your booking attempt and reviewed availability.`;

  const statusPill = escape(v.statusPill ?? "Status");
  const statusTitle = escape(v.statusTitle || "Update");
  const statusMessage = safeHtml(v.statusMessage || "We have an update regarding your booking.");

  const vehicleName = v.vehicleName ? escape(v.vehicleName) : "";
  const vehicleImg = v.vehicleImageUrl ? escape(v.vehicleImageUrl) : "";
  const vehicleAlt = escape(v.vehicleImageAlt || v.vehicleName || "Vehicle");
  const vehiclePrice = v.vehiclePrice ? escape(v.vehiclePrice) : "";
  const reference = v.reference ? escape(v.reference) : "";

  const pickup = v.pickup ? escape(v.pickup) : "";
  const destination = v.destination ? escape(v.destination) : "";
  const email = v.email ? escape(v.email) : "";
  const notes = v.notes ? escape(v.notes) : "";

  const primaryCta =
    v.primaryCtaLabel && v.primaryCtaUrl
      ? `<div style="text-align:center;padding:14px 0 0;">
           <a href="${escape(v.primaryCtaUrl)}" class="btn-dark">${escape(v.primaryCtaLabel)}</a>
         </div>`
      : "";

  const secondaryCta =
    v.secondaryCtaLabel && v.secondaryCtaUrl
      ? `<div style="text-align:center;padding:12px 0 0;">
           <a href="${escape(v.secondaryCtaUrl)}" class="btn">${escape(v.secondaryCtaLabel)}</a>
         </div>`
      : "";

  const closingNote =
    v.closingNoteHtml?.trim()
      ? `<div class="text" style="margin-top:14px;font-size:14px;line-height:1.7;">
           ${safeHtml(v.closingNoteHtml)}
         </div>`
      : "";

  const vehicleBlock = vehicleName
    ? `
<tr><td><div class="divider"></div></td></tr>
<tr>
  <td style="padding:16px 18px;">
    <div class="title" style="font-size:14px;font-weight:900;opacity:.85;">Vehicle you selected</div>
    <table width="100%" cellspacing="0" cellpadding="0" style="margin-top:12px;">
      <tr>
        <td style="width:140px;vertical-align:top;padding-right:14px;">
          ${vehicleImg
      ? `<img src="${vehicleImg}" width="140" height="96" alt="${vehicleAlt}"
                   style="display:block;width:140px;height:96px;object-fit:contain;border-radius:16px;border:1px solid rgba(0,0,0,.08);background:rgba(0,0,0,.02);" />`
      : ""
    }
        </td>
        <td style="vertical-align:top;">
          <div class="title" style="font-size:18px;font-weight:900;">${vehicleName}</div>
          ${vehiclePrice
      ? `<div class="text" style="margin-top:6px;font-size:14px;line-height:1.6;">Price: <b>${vehiclePrice}</b></div>`
      : ""
    }
          ${reference
      ? `<div class="muted" style="margin-top:10px;font-size:12px;line-height:1.6;">
                   Reference: ${reference}
                 </div>`
      : ""
    }
        </td>
      </tr>
    </table>
  </td>
</tr>`
    : "";

  const detailsRows = [
    pickup ? kvRow("Pickup location", pickup) : "",
    destination ? kvRow("Destination", destination) : "",
    email ? kvRow("Email", email) : "",
    notes ? kvRow("Notes", notes) : "",
  ]
    .filter(Boolean)
    .join("");

  const detailsBlock = detailsRows
    ? `
<tr><td><div class="divider"></div></td></tr>
<tr>
  <td style="padding:16px 18px 10px;">
    <div class="title" style="font-size:14px;font-weight:900;opacity:.85;">Your submitted details</div>
    <table width="100%" cellspacing="0" cellpadding="0" style="margin-top:10px;">
      ${detailsRows}
    </table>
  </td>
</tr>`
    : "";

  const bodyHtml = `
<tr>
  <td align="center" style="padding:8px 18px 18px;">
    <div class="text" style="font-size:17px;line-height:1.65;max-width:560px;">
      ${safeHtml(intro)}
    </div>
  </td>
</tr>

<tr>
  <td style="padding:10px 0 18px;">
    <table width="100%" cellspacing="0" cellpadding="0" class="card">
      <tr>
        <td style="padding:18px 18px 12px;">
          <span class="pill">${statusPill}</span>
          <div class="title" style="margin-top:10px;font-size:22px;font-weight:900;">${statusTitle}</div>
          <div class="text" style="margin-top:8px;font-size:15px;line-height:1.7;">
            ${statusMessage}
          </div>
        </td>
      </tr>

      ${vehicleBlock}
      ${detailsBlock}

      <tr>
        <td style="padding:16px 18px 18px;">
          ${primaryCta}
          ${secondaryCta}
          ${closingNote}
        </td>
      </tr>
    </table>
  </td>
</tr>`;

  return { headline, subjectHint, bodyHtml };
}

function renderSimpleNotice(headline: string, v: SimpleNoticeVars) {
  const subjectHint = headline;

  const primaryCta =
    v.primaryCtaLabel && v.primaryCtaUrl
      ? `<div style="text-align:center;padding:14px 0 0;">
           <a href="${escape(v.primaryCtaUrl)}" class="btn-dark">${escape(v.primaryCtaLabel)}</a>
         </div>`
      : "";

  const secondaryCta =
    v.secondaryCtaLabel && v.secondaryCtaUrl
      ? `<div style="text-align:center;padding:12px 0 0;">
           <a href="${escape(v.secondaryCtaUrl)}" class="btn">${escape(v.secondaryCtaLabel)}</a>
         </div>`
      : "";

  const foot = v.footnote
    ? `<div class="muted" style="margin-top:14px;font-size:12px;line-height:1.6;">${safeHtml(v.footnote)}</div>`
    : "";

  const bodyHtml = `
<tr>
  <td align="center" style="padding:8px 18px 18px;">
    <table width="100%" cellspacing="0" cellpadding="0" class="card">
      <tr>
        <td style="padding:18px 18px 18px;">
          <div class="title" style="font-size:22px;font-weight:900;">${escape(v.title)}</div>
          <div class="text" style="margin-top:10px;font-size:15px;line-height:1.7;">
            ${safeHtml(v.message)}
          </div>
          ${primaryCta}
          ${secondaryCta}
          ${foot}
        </td>
      </tr>
    </table>
  </td>
</tr>`;

  return { headline, subjectHint, bodyHtml };
}

function kvRow(k: string, v: string) {
  return `<tr>
    <td style="padding:10px 0;vertical-align:top;font-size:14px;line-height:1.6;width:40%;color:rgba(0,0,0,.58);font-weight:900;padding-right:12px;">
      ${escape(k)}
    </td>
    <td style="padding:10px 0;vertical-align:top;font-size:14px;line-height:1.6;width:60%;color:rgba(0,0,0,.82);font-weight:650;">
      ${escape(v)}
    </td>
  </tr>`;
}

function escape(input: string) {
  return String(input)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Allows safe HTML like <br/> in your message strings.
// We block script tags. (If you want even stricter sanitizing later, tell me.)
function safeHtml(input: string) {
  return String(input)
    .replaceAll("<script", "&lt;script")
    .replaceAll("</script", "&lt;/script");
}
