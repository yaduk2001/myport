import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT ?? 587),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const ownerEmail = process.env.OWNER_EMAIL!;
        const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" });

        // ────────────────────────────────────────────────────────────
        // 1. NOTIFICATION TO OWNER (Yadu)
        // ────────────────────────────────────────────────────────────
        await transporter.sendMail({
            from: `"Portfolio" <${process.env.SMTP_USER}>`,
            to: ownerEmail,
            replyTo: email,
            subject: `📬 New inquiry from ${name}`,
            html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Inquiry</title></head>
<body style="margin:0;padding:0;background:#0f0f1a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f1a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#6366f1 0%,#4f46e5 50%,#0ea5e9 100%);border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
          <div style="width:56px;height:56px;background:rgba(255,255,255,0.15);border-radius:14px;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;">
            <span style="font-size:28px;line-height:56px;display:block;">📬</span>
          </div>
          <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">New Portfolio Inquiry</h1>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">${now}</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#1a1a2e;padding:36px 40px;">

          <!-- Sender info -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#242442;border-radius:12px;margin-bottom:24px;overflow:hidden;">
            <tr><td style="padding:20px 24px;border-bottom:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#6366f1;">From</p>
              <p style="margin:6px 0 0;font-size:18px;font-weight:700;color:#ffffff;">${name}</p>
            </td></tr>
            <tr><td style="padding:16px 24px;">
              <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#0ea5e9;">Reply To</p>
              <a href="mailto:${email}" style="margin:6px 0 0;display:block;font-size:15px;font-weight:600;color:#60a5fa;text-decoration:none;">${email}</a>
            </td></tr>
          </table>

          <!-- Message -->
          <p style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#94a3b8;">Message</p>
          <div style="background:#242442;border-radius:12px;padding:24px;border-left:3px solid #6366f1;">
            <p style="margin:0;font-size:15px;color:#cbd5e1;line-height:1.8;white-space:pre-wrap;">${message}</p>
          </div>

          <!-- CTA -->
          <div style="text-align:center;margin-top:32px;">
            <a href="mailto:${email}?subject=Re: Your message to Yadu Krishna&body=Hi ${name},%0A%0A"
               style="display:inline-block;background:linear-gradient(135deg,#6366f1,#0ea5e9);color:#ffffff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:50px;text-decoration:none;letter-spacing:0.3px;">
              ✉️ Reply to ${name}
            </a>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#111128;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
          <p style="margin:0;font-size:12px;color:#475569;">This notification was sent from your portfolio contact form.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
        });

        // ────────────────────────────────────────────────────────────
        // 2. AUTO-REPLY CONFIRMATION TO THE VISITOR
        // ────────────────────────────────────────────────────────────
        await transporter.sendMail({
            from: `"Yadu Krishna KS" <${process.env.SMTP_USER}>`,
            to: email,
            subject: `Hey ${name}, I got your message! ✅`,
            html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Message Received</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#6366f1 0%,#4f46e5 50%,#0ea5e9 100%);border-radius:16px 16px 0 0;padding:40px 40px 36px;text-align:center;">
          <div style="width:64px;height:64px;background:rgba(255,255,255,0.2);border-radius:50%;margin:0 auto 18px;">
            <span style="font-size:32px;line-height:64px;display:block;">✅</span>
          </div>
          <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:800;letter-spacing:-0.5px;">Message Received!</h1>
          <p style="margin:10px 0 0;color:rgba(255,255,255,0.85);font-size:15px;">Hey <strong>${name}</strong>, thanks for reaching out.</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:40px;">
          <p style="margin:0 0 16px;font-size:16px;color:#334155;line-height:1.7;">
            I've received your message and will get back to you as soon as possible — usually within <strong style="color:#6366f1;">24–48 hours</strong>.
          </p>
          <p style="margin:0 0 28px;font-size:15px;color:#64748b;line-height:1.7;">
            If you have any additional details to share or follow-up questions, simply <strong>reply to this email</strong> — it goes directly to my inbox.
          </p>

          <!-- Their message recap -->
          <div style="background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;margin-bottom:32px;">
            <div style="background:#6366f1;padding:10px 20px;">
              <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.9);">Your Message</p>
            </div>
            <div style="padding:20px;">
              <p style="margin:0;font-size:14px;color:#64748b;line-height:1.8;white-space:pre-wrap;">${message}</p>
            </div>
          </div>

          <!-- What's next -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border-radius:12px;border:1px solid #bfdbfe;margin-bottom:32px;">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 12px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#3b82f6;">What happens next</p>
              <table cellpadding="0" cellspacing="0">
                <tr><td style="padding:4px 0;font-size:14px;color:#1e40af;">⏱ &nbsp;I'll review your message within a few hours</td></tr>
                <tr><td style="padding:4px 0;font-size:14px;color:#1e40af;">📧 &nbsp;You'll receive a personal reply from me</td></tr>
                <tr><td style="padding:4px 0;font-size:14px;color:#1e40af;">🤝 &nbsp;We'll discuss how I can help with your project</td></tr>
              </table>
            </td></tr>
          </table>

          <!-- Signature -->
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <div style="width:50px;height:50px;border-radius:12px;background:linear-gradient(135deg,#6366f1,#0ea5e9);text-align:center;line-height:50px;">
                  <span style="color:#fff;font-weight:800;font-size:18px;">YK</span>
                </div>
              </td>
              <td style="padding-left:14px;">
                <p style="margin:0;font-size:15px;font-weight:700;color:#0f172a;">Yadu Krishna KS</p>
                <p style="margin:2px 0 0;font-size:13px;color:#64748b;">Full-Stack &amp; AI/ML Developer</p>
                <a href="https://www.linkedin.com/in/yk-krishna" style="font-size:12px;color:#6366f1;text-decoration:none;">linkedin.com/in/yk-krishna</a>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f8fafc;border-radius:0 0 16px 16px;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center;">
          <p style="margin:0;font-size:11px;color:#94a3b8;">
            This is an automated confirmation email — please do not mark it as spam.<br>
            You can reply to this email to reach Yadu directly.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
        });

        return NextResponse.json({ success: true });

    } catch (err: any) {
        console.error("[Contact API Error]", err);
        return NextResponse.json({ error: "Failed to send email. Please try again later." }, { status: 500 });
    }
}
