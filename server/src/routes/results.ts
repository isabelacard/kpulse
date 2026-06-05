import { Router } from "express";
import { supabase } from "../db";

const router = Router();

router.post("/", async (req, res) => {
  const { session_id, game_number, score, duration_seconds } = req.body;

  const { data, error } = await supabase
    .from("game_results")
    .insert({ session_id, game_number, score, duration_seconds })
    .select()
    .single();

  if (error) return res.status(500).json({ error });
  res.json(data);
});

export default router;
