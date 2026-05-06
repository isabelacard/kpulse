import { Router } from "express";
import { supabase } from "../db";

const router = Router();

router.post("/", async (req, res) => {
    const { email, session_id } = req.body;

    const { data: patient, error: patientError } = await supabase.from("patients").insert({ email }).select().single();

    if (patientError) return res.status(500).json({ error: patientError });

    const { error: sessionError } = await supabase.from("sessions").update({ patient_id: patient.id }).eq("id", session_id);

    if (sessionError) return res.status(500).json({ error: sessionError });

    res.json(patient);
});

export default router;
