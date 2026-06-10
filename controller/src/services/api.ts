const getBaseUrl = () => {
    const envUrl = import.meta.env.VITE_API_URL;
    if (envUrl) {
        return envUrl.replace(/\/$/, "");
    }
    if (typeof window !== "undefined" && window.location) {
        const { hostname, protocol } = window.location;
        if (hostname.includes("devtunnels.ms")) {
            const parts = hostname.split(".");
            const clusterPart = parts.slice(1).join(".");
            const nameAndPort = parts[0];
            const nameParts = nameAndPort.split("-");
            if (nameParts.length > 0) {
                const tunnelId = nameParts[0];
                return `https://${tunnelId}-3001.${clusterPart}`;
            }
        }
        return `${protocol}//${hostname}:3001`;
    }
    return "https://9kjbhqxg-3001.use2.devtunnels.ms";
};

export const BASE_URL = getBaseUrl();

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

    sendReport: (session_id: string | number, email: string) =>
        fetch(`${BASE_URL}/report`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id, email }),
        }).then(safeJson),
};
