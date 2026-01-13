import { resend, EMAIL_FROM } from "./email";

export async function sendConfirmationEmail(
    to: string,
    name: string
) {
    await resend.emails.send({
        from: EMAIL_FROM,
        to,
        subject: "Welcome to 6Ride",
        html: `
      <div style="font-family:system-ui;padding:24px">
        <h2>Welcome to 6Ride</h2>
        <p>Hello ${name},</p>
        <p>Your email has been successfully confirmed.</p>
        <p>You can now book premium rides with confidence.</p>
        <br/>
        <strong>— 6Ride Team</strong>
      </div>
    `,
    });
}
