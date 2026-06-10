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
console.log(
  "SMTP_PASS length:",
  process.env.SMTP_PASS ? process.env.SMTP_PASS.length : 0,
);

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Verification Failed:", error);
  } else {
    console.log("SMTP Verification Succeeded! Server is ready to send emails.");
  }
});
