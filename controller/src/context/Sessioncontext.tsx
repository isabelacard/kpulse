import { createContext, useContext, useState } from "react";

interface SessionData {
    session_id: string | number;
    patient_id: string | number;
    survey: { question: string; answer: string }[];
}

interface SessionContextType {
    session: SessionData;
    setSessionId: (id: string) => void;
    setPatientId: (id: string) => void;
    addSurveyAnswer: (question: string, answer: string) => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<SessionData>(() => {
        const saved = localStorage.getItem("kpulse_session");
        return saved ? JSON.parse(saved) : { session_id: "", patient_id: "", survey: [] };
    });

    const setSessionId = (id: string) => {
        setSession((prev) => {
            const newState = { ...prev, session_id: id };
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
            const newState = {
                ...prev,
                survey: [...prev.survey, { question, answer }],
            };
            localStorage.setItem("kpulse_session", JSON.stringify(newState));
            return newState;
        });
    };

    return <SessionContext.Provider value={{ session, setSessionId, setPatientId, addSurveyAnswer }}>{children}</SessionContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => useContext(SessionContext);
