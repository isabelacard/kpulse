import { Router } from "express";
import { supabase } from "../db";

const router = Router();

router.post("/", async (req, res) => {
    const { email, session_id } = req.body;

    let patient;
    // Intentar buscar el paciente primero
    const { data: existingPatient } = await supabase.from("patients").select().eq("email", email).single();
    
    if (existingPatient) {
        patient = existingPatient;
    } else {
        const { data: newPatient, error: patientError } = await supabase.from("patients").insert({ email }).select().single();
        if (patientError) return res.status(500).json({ error: patientError });
        patient = newPatient;
    }

    if (session_id) {
        const { error: sessionError } = await supabase.from("sessions").update({ patient_id: patient.id }).eq("id", session_id);
        if (sessionError) console.error("Session update error:", sessionError);
    }

    res.json(patient);
});

export default router;
