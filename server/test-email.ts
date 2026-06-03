import nodemailer from "nodemailer";

console.log("Comprobando variables de entorno...");
console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_FROM:", process.env.SMTP_FROM);
console.log("SMTP_PASS está configurada:", !!process.env.SMTP_PASS);

if (!process.env.SMTP_USER) {
    console.error("❌ ERROR: Las variables SMTP no están cargando. Revisa tu archivo .env.production");
    process.exit(1);
}

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

async function runTest() {
    try {
        console.log("Intentando enviar correo de prueba...");
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: process.env.SMTP_USER, // Te lo enviamos a ti mismo
            subject: "Prueba de KPulse",
            text: "Si recibes esto, Nodemailer funciona perfectamente.",
        });
        console.log("✅ ¡Correo enviado exitosamente!");
        console.log("Mensaje ID:", info.messageId);
    } catch (error) {
        console.error("❌ Error al enviar correo:");
        console.error(error);
    }
}

runTest();
