export const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export const api = {
    submitSurvey: (session_id: string, responses: { question: string; answer: string }[]) =>
        fetch(`${BASE_URL}/survey`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id, responses }),
        }).then((r) => r.json()),

    submitResults: (session_id: string, game_number: number, score: number, duration_seconds: number) =>
        fetch(`${BASE_URL}/results`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id, game_number, score, duration_seconds }),
        }).then((r) => r.json()),

    createSession: (room_code: string) =>
        fetch(`${BASE_URL}/session`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ room_code }),
        }).then((r) => r.json()),

    endSession: (session_id: string) =>
        fetch(`${BASE_URL}/session/${session_id}/end`, {
            method: "PATCH",
        }).then((r) => r.json()),
};
