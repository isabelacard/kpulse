import { useNavigate } from "react-router-dom";
import allsetfondo from "../../assets/allsetfondo.webp";
import { useEffect } from "react";
import { useResponsiveScale } from "../../hooks/useResponsiveScale";
import { socket } from "../../socket";

export default function AllSet() {
    const navigate = useNavigate();
    const scale = useResponsiveScale();

    useEffect(() => {
        const timer = setTimeout(() => {
            socket.emit("changePage", "/final");
            navigate("/final");
        }, 10000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex items-center justify-center w-full h-screen overflow-hidden bg-black/5">
            <div
                style={{
                    width: 1176 * scale,
                    height: 648 * scale,
                    position: "relative",
                }}
                className="flex items-center justify-center overflow-hidden"
            >
                <div
                    style={{
                        width: 1176,
                        height: 648,
                        transform: `scale(${scale})`,
                        transformOrigin: "center",
                        position: "absolute",
                    }}
                    className="shrink-0 overflow-hidden"
                >
                    <img fetchPriority="high" loading="eager" src={allsetfondo} alt="correo" className="w-full h-full scale-102 object-cover absolute top-0 left-0" />

                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                        <header className="text-center font-poppins font-medium text-white">
                            <p className="bg-linear-to-b from-white to-yellow-400 bg-clip-text text-transparent text-[48px]">You're all set!</p>

                            <p className="text-[36px]">enter your email to</p>

                            <p className="text-[36px]">recieve your results.</p>
                        </header>
                    </div>
                </div>
            </div>
        </div>
    );
}
