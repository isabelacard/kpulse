import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImagenFondoCalibration from "../../../assets/fondote.png";
import BreathingCircle from "../../../components/BreathingCircle";

function PreGameOne() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [sensorPos, setSensorPos] = useState({ x: 0, y: 0 });
    const [inside, setInside] = useState(false);
    const zoneRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = zoneRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left - 8;
        const y = e.clientY - rect.top - 8;
        setPos({ x, y });

        const circleRect = circleRef.current?.getBoundingClientRect();
        if (!circleRect) return;

        const circleCenterX = circleRect.left + circleRect.width / 2 - rect.left;
        const circleCenterY = circleRect.top + circleRect.height / 2 - rect.top + 170;

        //VISTA SENSOR
        setSensorPos({ x: circleCenterX, y: circleCenterY });

        const dx = x - circleCenterX;
        const dy = y - circleCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 10) {
            navigate("/gametwo");
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div onMouseMove={handleMouseMove} ref={zoneRef} onMouseEnter={() => setInside(true)} onMouseLeave={() => setInside(false)} className="relative w-294 h-162 shrink-0 overflow-hidden rounded-xl">
                <img className="absolute" src={ImagenFondoCalibration} />
                <div className="relative z-10 flex flex-col items-center mt-20 h-full">
                    <div className="flex flex-col absolute -top-10">
                        <h1 className="text-white text-[50px] text-center font-medium">
                            Level <span className="text-[#F18D01] font-bold">Two </span>
                        </h1>
                        <h1 className="text-white text-[15px] text-center mb-20 absolute self-center top-15">Don't drop the balls</h1>
                    </div>
                    <div className="flex flex-col absolute top-14">
                        <h1 className="text-white text-2xl text-center">
                            {inside && <div style={{ left: pos.x, top: pos.y }} className="absolute w-5 h-5 bg-[#FFB143] rounded-4xl z-15" />}
                            {inside && (
                                <div style={{ left: sensorPos.x, top: sensorPos.y }} className="absolute z-20 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-red-500 bg-red-500/30">
                                    <div className="h-2 w-2 rounded-full bg-red-500" />
                                </div>
                            )}
                            <span className="text-[#1FD0D3] font-bold"> Center </span>
                        </h1>
                        <h1 className="text-white text-2xl text-center">of the screen to start the game</h1>
                    </div>

                    <div ref={circleRef}>
                        <BreathingCircle />
                    </div>
                </div>
                {inside && <div style={{ left: pos.x, top: pos.y }} className="absolute w-5 h-5 bg-[#FFB143] rounded-4xl z-15" />}
            </div>
        </div>
    );
}

export default PreGameOne;
