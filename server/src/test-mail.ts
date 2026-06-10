import "./loadEnv.ts";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

console.log("Checking SMTP config...");
console.log("SMTP_USER:", process.env.SMTP_USER);

const testEmail = "isacardonaval@gmail.com";

console.log("Sending a real test email to:", testEmail);

transporter.sendMail(
  {
    from: process.env.SMTP_FROM || '"KPulse Reports" <noreply@kpulse.com>',
    to: testEmail,
    subject: "Prueba de Envío KPulse",
    text: "Hola! Si recibes este correo, el envío de emails de KPulse funciona al 100%.",
  },
  (error, info) => {
    if (error) {
      console.error("❌ SMTP Send Failed:", error);
    } else {
      console.log("✅ SMTP Send Succeeded! Message ID:", info.messageId);
    }
    process.exit(0);
  },
);
