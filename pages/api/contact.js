import nodemailer from "nodemailer";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const { name, email, subject, message, company } = req.body || {};

    // honeypot
    if (company) return res.status(200).json({ ok: true });

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required." });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL_USER,
        pass: process.env.CONTACT_EMAIL_PASS, // Gmail App Password
      },
    });

    const to = process.env.CONTACT_EMAIL_TO || process.env.CONTACT_EMAIL_USER;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.CONTACT_EMAIL_USER}>`,
      to,
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : "[Portfolio] New message",
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ message: "Failed to send message. Please try again later." });
  }
}
