import { useEffect, useRef, useState } from "react";
import ImagenFondoCalibration from "../../../assets/calibration1.png";
import CalibrationLines from "../../../assets/Lines1.png";
import LoadingBarLines from "../../../components/LoadingBarLines";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../socket";

export interface SensorPayload {
    orientation: { x: number; y: number; };
}

function Calibration2() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const zoneRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/instructionsfinal");
        }, 13000);

        return () => clearTimeout(timer);
    }, [navigate]);

    // 3. Sensor movement logic
    useEffect(() => {
        const moveDot = (data: SensorPayload) => {
            const zone = zoneRef.current?.getBoundingClientRect();
            if (!zone) return;

            const percentageX = (data.orientation.x + 45) / 90;
            const percentageY = (-data.orientation.y + 45) / 90;

            const posX = percentageX * zone.width;
            const posY = percentageY * zone.height;

            setPos({ x: posX, y: posY });
        };

        // Listen for the sensor data coming from the server
        socket.on("screen:data", moveDot);

        return () => {
            socket.off("screen:data", moveDot);
        };
    }, []);

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div ref={zoneRef} className="relative w-294 h-162 shrink-0 overflow-hidden rounded-xl">
                <img className="absolute" src={ImagenFondoCalibration} alt="Background" />
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
                
                {/* Orange Dot with smooth transition */}
                <div
                    style={{ 
                        left: pos.x, 
                        top: pos.y,
                        transition: 'left 0.05s linear, top 0.05s linear'
                    }}
                    className="absolute w-5 h-5 bg-[#FFB143] rounded-4xl z-15"
                ></div>
            </div>
        </div>
    );
}

export default Calibration2;