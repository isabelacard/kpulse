import { createContext, useContext, useState } from "react";

interface SessionData {
    session_id: string | number;
    patient_id: string | number;
    survey: { question: string; answer: string }[];
    gameResults: { game_number: number; score: number; duration_seconds: number }[];
}

interface SessionContextType {
    session: SessionData;
    setSessionId: (id: string) => void;
    setPatientId: (id: string) => void;
    addSurveyAnswer: (question: string, answer: string) => void;
    addGameResult: (game_number: number, score: number, duration_seconds: number) => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<SessionData>(() => {
        const saved = localStorage.getItem("kpulse_session");
        return saved ? JSON.parse(saved) : { session_id: "", patient_id: "", survey: [], gameResults: [] };
    });

    const setSessionId = (id: string) => {
        setSession((prev) => {
            const newState = { ...prev, session_id: id, survey: [], gameResults: [] };
            localStorage.setItem("kpulse_session", JSON.stringify(newState));
            return newState;
        });
    };

    const setPatientId = (id: string) => {
        setSession((prev) => {
            const newState = { ...prev, patient_id: id };
            localStorage.setItem("kpulse_session", JSON.stringify(newState));
            return newState;
        });
    };

    const addSurveyAnswer = (question: string, answer: string) => {
        setSession((prev) => {
            const existingIndex = prev.survey.findIndex((s) => s.question === question);
            const newSurvey = [...prev.survey];
            if (existingIndex >= 0) {
                newSurvey[existingIndex] = { question, answer };
            } else {
                newSurvey.push({ question, answer });
            }

            const newState = {
                ...prev,
                survey: newSurvey,
            };
            localStorage.setItem("kpulse_session", JSON.stringify(newState));
            return newState;
        });
    };

    const addGameResult = (game_number: number, score: number, duration_seconds: number) => {
        setSession((prev) => {
            // Reemplazar si ya existe un resultado para ese juego (por si acaso re-envía)
            const filteredResults = (prev.gameResults || []).filter((r) => r.game_number !== game_number);
            const newState = {
                ...prev,
                gameResults: [...filteredResults, { game_number, score, duration_seconds }],
            };
            localStorage.setItem("kpulse_session", JSON.stringify(newState));
            return newState;
        });
    };

    return <SessionContext.Provider value={{ session, setSessionId, setPatientId, addSurveyAnswer, addGameResult }}>{children}</SessionContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => useContext(SessionContext);
