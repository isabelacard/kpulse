import { Router } from "express";
import { supabase } from "../db";

const router = Router();

router.post("/", async (req, res) => {
  const { room_code } = req.body;

  const { data, error } = await supabase
    .from("sessions")
    .insert({ room_code })
    .select()
    .single();

  if (error) {
    console.error("[POST /session] Supabase error:", error);
    return res.status(500).json({ error });
  }
  res.json(data);
});

router.patch("/:id/end", async (req, res) => {
  const { id } = req.params;

  if (!id || id === "undefined" || id === "") {
    return res.json({ success: true, warning: "No valid session ID to end" });
  }

  const { error } = await supabase
    .from("sessions")
    .update({ ended_at: new Date() })
    .eq("id", id);
  if (error) return res.status(500).json({ error });
  res.json({ success: true });
});

export default router;
