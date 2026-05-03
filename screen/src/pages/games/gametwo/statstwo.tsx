import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ImagenFondoCalibration from "../../../assets/fondote.png";
import squarestats from "../../../assets/squaregameone.png";
import LoadingBar from "../../../components/LoadingBar";

function StatsTwo() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [inside, setInside] = useState(false);
    const zoneRef = useRef<HTMLDivElement>(null);

    const location = useLocation();
    const { strayBalls, caughtBalls } = location.state ?? {
        strayBalls: 0,
        caughtBalls: 0,
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = zoneRef.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({
            x: e.clientX - rect.left - 8,
            y: e.clientY - rect.top - 8,
        });
    };

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div onMouseMove={handleMouseMove} ref={zoneRef} onMouseEnter={() => setInside(true)} onMouseLeave={() => setInside(false)} className="relative w-294 h-162 shrink-0 overflow-hidden rounded-xl">
                <img className="absolute" src={ImagenFondoCalibration} />

                <div className="relative z-10 flex flex-col items-center mt-20 h-full">
                    <img className="absolute w-70 top-34 right-79" src={squarestats} />

                    {/* Título */}
                    <div className="flex flex-col absolute -top-10">
                        <h1 className="text-white text-[50px] text-center font-medium">
                            Level <span className="text-[#FFB143] font-bold">Two </span>
                        </h1>
                        <h1 className="text-white text-[50px] text-center mb-20 absolute self-center top-15">
                            <span className="font-bold text-[#F6CF84]">Complete</span>
                        </h1>
                    </div>

                    {/* Label Stats */}
                    <div className="flex flex-col absolute top-42 left-100">
                        <h1 className="text-white text-[55px] text-left font-medium">
                            <span className="font-bold">Stats</span>
                        </h1>
                        <h1 className="text-white text-[45px] absolute text-left top-15">
                            <span className="">Second</span>
                        </h1>
                        <h1 className="text-white text-[45px] absolute text-left top-27">
                            <span className="">Game</span>
                        </h1>
                    </div>

                    {/* Stats labels + valores */}
                    <div>
                        <div className="absolute top-49 right-140">
                            <h1 className="text-white font-medium text-[20px] absolute w-200">Total</h1>
                        </div>
                        <div className="absolute top-55 right-140">
                            <h1 className="text-white font-bold text-[20px] absolute w-200">Balls Caught</h1>
                        </div>
                        <div className="absolute top-74 right-140">
                            <h1 className="text-white font-medium text-[20px] absolute w-200">Total</h1>
                        </div>
                        <div className="absolute top-80 right-140">
                            <p className="text-white text-[20px] absolute w-50 font-bold">Balls Stray</p>
                        </div>

                        {/* Valores */}
                        <div className="absolute">
                            <h1 className="flex items-baseline gap-2 text-white absolute left-40 top-50 whitespace-nowrap">
                                <span className="font-medium text-[30px]">{caughtBalls}</span> <span className="text-[20px] text-white font-medium">balls</span>
                            </h1>
                            <h1 className="flex items-baseline gap-2 text-white absolute left-40 top-75 whitespace-nowrap">
                                <span className="font-medium text-[30px]">{strayBalls}</span> <span className="text-[20px] text-white font-medium">seg</span>
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Loading bar */}
                <div className="flex justify-center absolute top-75 left-147">
                    <LoadingBar />
                </div>

                {/* Dot naranja */}
                {inside && <div style={{ left: pos.x, top: pos.y }} className="absolute w-6 h-6 bg-[#FFB143] rounded-4xl z-15" />}
            </div>
        </div>
    );
}

export default StatsTwo;
