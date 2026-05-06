export interface Patient {
    id: string;
    name: string;
    age: number | null;
    created_at: string;
}

export interface Session {
    id: string;
    patient_id: string | null;
    room_code: string;
    started_at: string;
    ended_at: string | null;
}

export interface SurveyResponse {
    id: string;
    session_id: string | null;
    question: string;
    answer: string;
}

export interface GameResult {
    id: string;
    session_id: string | null;
    game_number: number;
    score: number | null;
    duration_seconds: number | null;
    created_at: string;
}
