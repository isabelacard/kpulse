import { Router } from "express";
import { supabase } from "../db";

const router = Router();

router.post("/", async (req, res) => {
    const { session_id, responses } = req.body;

    if (!session_id) {
        // Si no hay session_id (ej. pruebas aisladas), no guardamos
        return res.json({ success: true, warning: "No session_id provided, skipped" });
    }

    const rows = responses.map((r: { question: string; answer: string }) => ({
        session_id,
        ...r,
    }));

    const { data, error } = await supabase.from("survey_responses").insert(rows).select();

    if (error) return res.status(500).json({ error });
    res.json(data);
});

export default router;
