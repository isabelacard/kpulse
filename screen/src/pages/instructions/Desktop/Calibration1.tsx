import { useRef, useState, useEffect } from "react";
import ImagenFondoCalibration from "../../../assets/calibration1.webp";
import BreathingCircle from "../../../components/BreathingCircle";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../socket";
import { useResponsiveScale } from "../../../hooks/useResponsiveScale";

export interface SensorPayload {
    orientation: { x: number; y: number };
}

function Calibration1() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const circleRef = useRef<HTMLDivElement>(null);
    const zoneRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const scale = useResponsiveScale();

    useEffect(() => {
        const moveDot = (data: SensorPayload) => {
            const zone = zoneRef.current?.getBoundingClientRect();
            const circle = circleRef.current?.getBoundingClientRect();

            if (!zone || !circle) return;

            const percentageX = (data.orientation.x + 45) / 90;
            const percentageY = (-data.orientation.y + 45) / 90;

            const posX = percentageX * 1176;
            const posY = percentageY * 648;

            setPos({ x: posX, y: posY });

            const circleCenterX = (circle.left + circle.width / 2 - zone.left) / scale;
            const circleCenterY = (circle.top + circle.height / 2 - zone.top) / scale + 100;

            const distance = Math.hypot(posX - circleCenterX, posY - circleCenterY);

            if (distance < 15) {
                navigate("/calibration2");
            }
        };

        socket.on("screen:data", moveDot);

        return () => {
            socket.off("screen:data", moveDot);
        };
    }, [navigate, scale]);

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
                    style={{
                        width: 1176,
                        height: 648,
                        transform: `scale(${scale})`,
                        transformOrigin: "center",
                        position: "absolute",
                    }}
                    className="shrink-0 overflow-hidden rounded-xl"
                >
                    <img className="absolute inset-0 scale-98 w-full h-full object-cover z-0" src={ImagenFondoCalibration} alt="Calibration Background" />

                    <div className="relative z-10 flex flex-col items-center mt-20 h-full">
                        <div className="flex flex-col absolute">
                            <h1 className="text-white text-4xl text-center">
                                Place your <span className="text-[#FFB143] font-bold">Orange Dot</span> in the
                                <span className="text-[#1FD0D3] font-bold"> Center</span>
                            </h1>

                            <h1 className="text-white text-4xl text-center">of the screen to start the calibration</h1>
                        </div>

                        <div ref={circleRef}>
                            <BreathingCircle />
                        </div>

                        <div className="absolute border-b-2 w-30 border-white top-132"></div>

                        <p className="flex mt-50 text-white">Waiting for your move</p>
                    </div>

                    <div style={{ left: pos.x, top: pos.y }} className="absolute w-5 h-5 bg-[#FFB143] rounded-full z-20" />
                </div>
            </div>
        </div>
    );
}

export default Calibration1;
