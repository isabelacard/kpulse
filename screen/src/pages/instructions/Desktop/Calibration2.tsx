import { useRef, useState } from "react";
import ImagenFondoCalibration from "../../../assets/calibration1.png";
import CalibrationLines from "../../../assets/Lines1.png";
import LoadingBarLines from "../../../components/LoadingBarLines";

function Calibration2() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [inside, setInside] = useState(false);
    const zoneRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = zoneRef.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div onMouseMove={handleMouseMove} ref={zoneRef} onMouseEnter={() => setInside(true)} onMouseLeave={() => setInside(false)} className="relative w-294 h-162 shrink-0 overflow-hidden rounded-xl">
                <img className="absolute" src={ImagenFondoCalibration} />
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
                    <img className="w-140 mt-30" src={CalibrationLines} />
                    <LoadingBarLines></LoadingBarLines>
                </div>
                {inside && (
                    <div
                        style={{ left: pos.x, top: pos.y }}
                        className={`absolute w-5 h-5 bg-[#FFB143] rounded-4xl
                            z-15`}
                    ></div>
                )}
            </div>
        </div>
    );
}

export default Calibration2;
