import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import fondomobile from "../../assets/fondomobile1.webp";
import { socket } from "../../socket";

import { useSession } from "../../context/Sessioncontext";
import { api } from "../../services/api";

export default function OnboardingMb2() {
    const navigate = useNavigate();
    const sessionCtx = useSession();
    const [processing, setProcessing] = useState(false);
    const sessionCreated = useRef(false);

    const handleTap = async () => {
        if (processing || sessionCreated.current) {
            socket.emit("changePage", "/onboarding3");
            navigate("/onboarding3");
            return;
        }
        setProcessing(true);
        try {
            const randomCode = "KPULSE_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
            const newSession = await api.createSession(randomCode);
            if (newSession && newSession.id) {
                sessionCtx?.setSessionId(newSession.id);
                sessionCreated.current = true;
            } else {
                console.error("createSession no devolvió id:", newSession);
            }
        } catch (error) {
            console.error("Error al crear sesión:", error);
        } finally {
            setProcessing(false);
        }

        socket.emit("changePage", "/onboarding3");
        navigate("/onboarding3");
    };

    return (
        <div onClick={handleTap} className="relative w-full h-screen flex flex-col items-center bg-center bg-cover bg-no-repeat overflow-hidden cursor-pointer" style={{ backgroundImage: `url(${fondomobile})` }}>
            <div className="flex flex-col items-center justify-center w-full h-full max-w-97.5 pt-[20%] pb-[15%] px-6">
                <div className="text-center my-auto flex flex-col items-center">
                    <h1 className="text-white text-3xl font-poppins font-medium tracking-wide">connecting with</h1>
                    <h2 className="bg-linear-to-b from-white to-yellow-500 bg-clip-text text-transparent text-4xl font-poppins font-medium mt-2">the screen...</h2>
                </div>
            </div>
        </div>
    );
}
