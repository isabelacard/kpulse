import { Router } from "express";
import { supabase } from "../db";

const router = Router();

router.post("/", async (req, res) => {
    const { room_code } = req.body;

    const { data, error } = await supabase.from("sessions").insert({ room_code }).select().single();

    if (error) return res.status(500).json({ error });
    res.json(data);
});

router.patch("/:id/end", async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase.from("sessions").update({ ended_at: new Date().toISOString() }).eq("id", id).select().single();

    if (error) return res.status(500).json({ error });
    res.json(data);
});

export default router;
