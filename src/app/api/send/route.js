// app/api/send/route.js
import nodemailer from "nodemailer";

export async function POST(request) {
  const body = await request.json();
  const { to, subject, text, html } = body;
  if (!to || !subject) return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
    });

    return new Response(JSON.stringify({ ok: true, messageId: info.messageId }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
