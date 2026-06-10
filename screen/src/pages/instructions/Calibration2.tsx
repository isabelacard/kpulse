import { useEffect, useRef, useState } from "react";
import ImagenFondoCalibration from "../../assets/calibration1.webp";
import CalibrationLines from "../../assets/Lines1.png";
import LoadingBarLines from "../../components/LoadingBarLines";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";
import { useResponsiveScale } from "../../hooks/useResponsiveScale";

export interface SensorPayload {
    orientation: { x: number; y: number };
}

function Calibration2() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const zoneRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const scale = useResponsiveScale();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/instructionsfinal");
        }, 13000);

        return () => clearTimeout(timer);
    }, [navigate]);

    useEffect(() => {
        const moveDot = (data: SensorPayload) => {
            const unscaledWidth = 1176;
            const unscaledHeight = 648;

            const percentageX = (data.orientation.x + 45) / 90;
            const percentageY = (-data.orientation.y + 45) / 90;

            const posX = percentageX * unscaledWidth;
            const posY = percentageY * unscaledHeight;

            setPos({ x: posX, y: posY });
        };

        socket.on("screen:data", moveDot);

        return () => {
            socket.off("screen:data", moveDot);
        };
    }, []);

    return (
        <div className="flex items-center justify-center w-full h-screen overflow-hidden">
            <div
                ref={zoneRef}
                className="relative shrink-0 overflow-hidden rounded-xl"
                style={{
                    width: "1176px",
                    height: "648px",
                    transform: `scale(${scale})`,
                    transformOrigin: "center center",
                }}
            >
                <img className="absolute w-full h-full object-cover scale-98" src={ImagenFondoCalibration} alt="Background" />
                <div className="relative z-10 flex flex-col items-center mt-20 h-full">
                    <div className="flex flex-col absolute">
                        <h1 className="text-white text-4xl text-center">
                            Move your <span className="text-[#FFB143] font-bold">Orange Dot </span>up and down
                        </h1>
                        <h1 className="text-white text-4xl text-center">
                            within the
                            <span className="text-[#1FD0D3] font-bold"> Lines</span> to adapt
                        </h1>
                    </div>
                    <img className="w-140 mt-30" src={CalibrationLines} alt="Calibration Lines" />
                    <LoadingBarLines />
                </div>

                <div
                    style={{
                        left: pos.x,
                        top: pos.y,
                        transition: "left 0.05s linear, top 0.05s linear",
                    }}
                    className="absolute w-5 h-5 bg-[#FFB143] rounded-4xl z-15"
                ></div>
            </div>
        </div>
    );
}

export default Calibration2;
