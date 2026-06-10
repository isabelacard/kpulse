import { useEffect, useRef, useState } from "react";
import ImagenFondoCalibration from "../../../assets/calibration1.webp";
import LoadingBar from "../../../components/LoadingBar";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../socket";
import { useResponsiveScale } from "../../../hooks/useResponsiveScale";

function InstructionsFinal() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [inside, setInside] = useState(false);
    const zoneRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const scale = useResponsiveScale();

    useEffect(() => {
        const timer = setTimeout(() => {
            socket.emit("changePage", "/pregameone");
            navigate("/pregameone");
        }, 8000);

        return () => clearTimeout(timer);
    }, [navigate]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = zoneRef.current?.getBoundingClientRect();
        if (!rect) return;

        setPos({
            x: (e.clientX - rect.left) / scale,
            y: (e.clientY - rect.top) / scale,
        });
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen overflow-hidden">
            <div
                style={{
                    width: 1176 * scale,
                    height: 648 * scale,
                    position: "relative",
                }}
                className="flex items-center justify-center overflow-hidden"
            >
                <div
                    ref={zoneRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setInside(true)}
                    onMouseLeave={() => setInside(false)}
                    style={{
                        width: 1176,
                        height: 648,
                        transform: `scale(${scale})`,
                        transformOrigin: "center",
                        position: "absolute",
                    }}
                    className="shrink-0 overflow-hidden rounded-xl"
                >
                    <img className="absolute scale-98 inset-0 w-full h-full object-cover" src={ImagenFondoCalibration} alt="Background" />

                    <div className="relative z-10 flex flex-col items-center mt-20 h-full">
                        <div className="flex flex-col absolute top-40">
                            <h1 className="text-white text-4xl text-center">
                                You are <span className="text-[#1FD0D3] font-bold">Ready!!</span>
                            </h1>

                            <h1 className="text-white text-4xl text-center">
                                Lets start the
                                <span className="text-[#F6CF84] font-bold"> Game</span>
                            </h1>
                        </div>

                        <LoadingBar />
                    </div>

                    {inside && (
                        <div
                            style={{
                                left: pos.x,
                                top: pos.y,
                            }}
                            className="absolute w-5 h-5 bg-[#FFB143] rounded-full z-20"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default InstructionsFinal;
