import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import fondomobile from "../../assets/fondomobile1.webp";
import { socket } from "../../socket";

import { useSession } from "../../context/Sessioncontext";
import { api } from "../../services/api";

export default function Onboarding2() {
    const navigate = useNavigate();
    const sessionCtx = useSession();
    const sessionCreated = useRef(false);

    // Wake up Render backend immediately when controller loads
    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        if (apiUrl) {
            fetch(`${apiUrl.replace(/\/$/, "")}/health`).catch(() => {});
        }
    }, []);

    // Sync screen to /onboarding2 and start automatic session creation and transition
    useEffect(() => {
        // Tell the screen to transition to onboarding2
        socket.emit("changePage", "/onboarding2");

        let active = true;
        const startTime = Date.now();

        const initSession = async () => {
            try {
                if (!sessionCreated.current) {
                    const randomCode = "KPULSE_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
                    const newSession = await api.createSession(randomCode);
                    if (newSession && newSession.id) {
                        sessionCtx?.setSessionId(newSession.id);
                        sessionCreated.current = true;
                    } else {
                        console.error("createSession no devolvió id:", newSession);
                    }
                }
            } catch (error) {
                console.error("Error al crear sesión:", error);
            }

            if (!active) return;

            // Wait a minimum of 2 seconds from mount before transitioning to onboarding3
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, 2000 - elapsedTime);

            setTimeout(() => {
                if (active) {
                    socket.emit("changePage", "/onboarding3");
                    navigate("/onboarding3");
                }
            }, remainingTime);
        };

        initSession();

        return () => {
            active = false;
        };
    }, [navigate, sessionCtx]);

    return (
        <div className="relative w-full h-screen flex flex-col items-center bg-center bg-size-[100%_100%] bg-no-repeat overflow-hidden" style={{ backgroundImage: `url(${fondomobile})` }}>
            <div className="flex flex-col items-center justify-center w-full h-full max-w-sm pt-[20%] pb-[15%] px-6">
                <div className="text-center my-auto flex flex-col items-center">
                    <h1 className="text-white text-3xl font-poppins font-medium tracking-wide">connecting with</h1>
                    <h2 className="bg-linear-to-b from-white to-yellow-500 bg-clip-text text-transparent text-4xl font-poppins font-medium mt-2">the screen...</h2>
                </div>
            </div>
        </div>
    );
}
