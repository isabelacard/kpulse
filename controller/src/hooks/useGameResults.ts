import { useEffect } from "react";
import { socket } from "../socket";
import { useSession } from "../context/Sessioncontext";
import { api } from "../services/api";

type GameResultPayload = {
    game_number: number;
    score: number;
    duration_seconds: number;
};

export function useGameResults() {
    const sessionCtx = useSession();

    useEffect(() => {
        if (!sessionCtx) return;

        const handleGameResults = async (data: GameResultPayload) => {
            console.log("Received game results:", data);
            
            // 1. Guardar en el contexto local (estado de la sesión)
            sessionCtx.addGameResult(data.game_number, data.score, data.duration_seconds);

            // 2. Enviar a Supabase a través del API del servidor
            if (sessionCtx.session.session_id) {
                try {
                    await api.submitResults(
                        sessionCtx.session.session_id,
                        data.game_number,
                        data.score,
                        data.duration_seconds
                    );
                    console.log(`Results for game ${data.game_number} saved to Supabase.`);
                } catch (error) {
                    console.error("Failed to save game results to Supabase:", error);
                }
            }
        };

        socket.on("game:results", handleGameResults);

        return () => {
            socket.off("game:results", handleGameResults);
        };
    }, [sessionCtx]);
}
