export const BASE_URL = "https://55qphc8b-3001.use2.devtunnels.ms";

async function safeJson(res: Response) {
    const text = await res.text();
    try {
        return JSON.parse(text);
    } catch {
        throw new Error(`Server error ${res.status}: ${text.slice(0, 200)}`);
    }
}

export const api = {
    submitSurvey: (session_id: string | number, responses: { question: string; answer: string }[]) =>
        fetch(`${BASE_URL}/survey`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id, responses }),
        }).then(safeJson),

    linkPatient: (session_id: string | number, email: string) =>
        fetch(`${BASE_URL}/patient`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id, email }),
        }).then(safeJson),

    submitResults: (session_id: string | number, game_number: number, score: number, duration_seconds: number) =>
        fetch(`${BASE_URL}/results`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id, game_number, score, duration_seconds }),
        }).then(safeJson),

    createSession: (room_code: string) =>
        fetch(`${BASE_URL}/session`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ room_code }),
        }).then(safeJson),

    endSession: (session_id: string | number) =>
        fetch(`${BASE_URL}/session/${session_id}/end`, {
            method: "PATCH",
        }).then(safeJson),
};
