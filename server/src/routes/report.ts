import { Router } from "express";
import { supabase } from "../db";
import nodemailer from "nodemailer";

const router = Router();

// Configuración de nodemailer (SMTP)
// En producción, estas variables deben estar en .env
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true para 465, false para otros puertos
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

router.post("/", async (req, res) => {
    let { session_id, email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email es requerido" });
    }

    try {
        // Fallback: Si no hay session_id en el front (ej. al recargar), buscar el paciente y su última sesión
        if (!session_id) {
            const { data: patient } = await supabase.from("patients").select("id").eq("email", email).single();
            if (patient) {
                const { data: recentSession } = await supabase
                    .from("sessions")
                    .select("id")
                    .eq("patient_id", patient.id)
                    .order("created_at", { ascending: false })
                    .limit(1)
                    .single();
                if (recentSession) {
                    session_id = recentSession.id;
                }
            }
            if (!session_id) {
                return res.status(400).json({ error: "No session_id found for this user." });
            }
        }

        //Obtener resultados de los juegos
        const { data: gameResults, error: gameError } = await supabase
            .from("game_results")
            .select("*")
            .eq("session_id", session_id);

        if (gameError) throw gameError;

        // Obtener respuestas de la encuesta
        const { data: surveyResponses, error: surveyError } = await supabase
            .from("survey_responses")
            .select("*")
            .eq("session_id", session_id);

        if (surveyError) throw surveyError;

        // Obtener info de la sesión (fecha)
        const { data: sessionData, error: sessionError } = await supabase
            .from("sessions")
            .select("started_at, ended_at")
            .eq("id", session_id)
            .single();

        if (sessionError) throw sessionError;

        // Calcular puntaje motriz
        let scoreG1 = 0; // Precisión juego 1
        let scoreG2 = 0; // Precisión juego 2
        
        const g1 = gameResults.find(g => g.game_number === 1);
        const g2 = gameResults.find(g => g.game_number === 2);

        if (g1) {
            // Juego 1 score = outMs, duration_seconds = totalMs / 1000
            const outMs = g1.score;
            const totalMs = g1.duration_seconds * 1000;
            if (totalMs > 0) {
                // Precisión = 1 - (tiempo fuera / tiempo total)
                scoreG1 = Math.max(0, 1 - (outMs / totalMs));
            }
        }

        if (g2) {
            // Juego 2 score = caughtBalls, duration_seconds = strayBalls
            const caughtBalls = g2.score;
            const strayBalls = g2.duration_seconds;
            const totalBalls = caughtBalls + strayBalls;
            if (totalBalls > 0) {
                // Precisión = pelotas atrapadas / total de pelotas
                scoreG2 = caughtBalls / totalBalls;
            }
        }

        // Puntaje final (0-100) ponderado (50% cada juego)
        const motorScore = Math.round((scoreG1 * 0.5 + scoreG2 * 0.5) * 100);

        // Clasificación
        let classification = "";
        let color = "";
        let recommendation = "";

        if (motorScore >= 85) {
            classification = "Excelente";
            color = "#28a745"; // Verde
            recommendation = "Tu control motor fino se encuentra en excelente estado.";
        } else if (motorScore >= 65) {
            classification = "Bueno";
            color = "#007bff"; // Azul
            recommendation = "Control motor adecuado, con leve margen de mejora.";
        } else if (motorScore >= 45) {
            classification = "Moderado";
            color = "#ffc107"; // Amarillo
            recommendation = "Se recomienda continuar con ejercicios de rehabilitación motriz.";
        } else {
            classification = "Requiere atención";
            color = "#dc3545"; // Rojo
            recommendation = "Te recomendamos consultar con un especialista para un programa de rehabilitación activa.";
        }

        // Preparar respuestas de la encuesta para el email
        const surveyHtml = surveyResponses.map(r => `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>${r.question}</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${r.answer}</td>
            </tr>
        `).join("");

        const sessionDate = sessionData?.started_at ? new Date(sessionData.started_at).toLocaleDateString() : new Date().toLocaleDateString();

        // Construir Email HTML
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px; overflow: hidden;">
                <div style="background-color: #EA8D1C; padding: 20px; text-align: center;">
                    <h1 style="color: white; margin: 0;">KPulse</h1>
                    <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0 0;">Reporte de Evaluación Motriz</p>
                </div>
                
                <div style="padding: 30px;">
                    <p>Hola,</p>
                    <p>Gracias por completar tu sesión de evaluación con KPulse el día <strong>${sessionDate}</strong>. Aquí tienes tus resultados:</p>
                    
                    <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
                        <h2 style="margin: 0; color: #555;">Puntuación de Control Motor</h2>
                        <div style="font-size: 48px; font-weight: bold; color: ${color}; margin: 10px 0;">
                            ${motorScore}/100
                        </div>
                        <div style="font-size: 20px; font-weight: bold; color: ${color};">
                            ${classification}
                        </div>
                        <p style="color: #666; margin-top: 15px;">${recommendation}</p>
                    </div>

                    <h3>Detalle por Juegos</h3>
                    <ul style="line-height: 1.6;">
                        <li><strong>Juego 1 (Precisión de Trazo):</strong> ${Math.round(scoreG1 * 100)}% de precisión.</li>
                        <li><strong>Juego 2 (Coordinación Ojo-Mano):</strong> ${Math.round(scoreG2 * 100)}% de precisión.</li>
                    </ul>

                    <h3>Tus respuestas (Contexto de Evaluación)</h3>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;">
                        ${surveyHtml || '<tr><td colspan="2">No se registraron respuestas.</td></tr>'}
                    </table>

                    <p style="margin-top: 30px; font-size: 13px; color: #888; text-align: center;">
                        Nota: Este reporte es orientativo y no sustituye un diagnóstico médico profesional.
                    </p>
                </div>
            </div>
        `;

        // Enviar Email
        if (!process.env.SMTP_USER) {
            console.warn("⚠️ SMTP_USER no está configurado. Simulación de envío de email:");
            console.log("To:", email);
            console.log("Score:", motorScore);
            return res.json({ success: true, motorScore, classification, simulated: true });
        }

        await transporter.sendMail({
            from: process.env.SMTP_FROM || '"KPulse Reports" <noreply@kpulse.com>',
            to: email,
            subject: "Tu Reporte de Evaluación Motriz - KPulse",
            html: htmlContent,
        });

        res.json({ success: true, motorScore, classification });

    } catch (error: any) {
        console.error("Error generating report:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
