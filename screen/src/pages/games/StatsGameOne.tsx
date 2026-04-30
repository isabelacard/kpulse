import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ImagenFondoCalibration from "../../assets/calibration1.png";
import squarestats from "../../assets/squaregameone.png";
import LoadingBar from "../../components/LoadingBar";

function StatsGameOne() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [inside, setInside] = useState(false);
    const zoneRef = useRef<HTMLDivElement>(null);

    const location = useLocation();
    const { totalTime, outTime } = location.state ?? { totalTime: 0, outTime: 0 };

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milli = ms % 1000;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milli.toString().padStart(3, "0")}`;
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
                    <img className="absolute w-62 top-38 right-85" src={squarestats}></img>

                    <div className="flex flex-col absolute -top-10">
                        <h1 className="text-white text-[50px] text-center font-medium">
                            Level <span className="text-[#1FD0D3] font-bold">One </span>
                        </h1>
                        <h1 className="text-white text-[50px] text-center mb-20 absolute self-center top-15">
                            <span className="font-bold text-[#F6CF84]">Complete</span>
                        </h1>
                    </div>

                    <div className="flex flex-col absolute top-42 left-100">
                        <h1 className="text-white text-[55px] text-left font-medium">
                            <span className="font-bold">Stats</span>
                        </h1>
                        <h1 className="text-white text-[45px] absolute  text-left top-15">
                            <span className="">First</span>
                        </h1>

                        <h1 className="text-white text-[45px] absolute text-left top-27">
                            <span className="">Game</span>
                        </h1>
                    </div>

                    <div>
                        <div className="absolute top-51 right-140">
                            <h1 className="text-white text-[20px] absolute">Total</h1>
                            <h1 className="text-white font-bold text-[20px] absolute top-5">Time</h1>
                        </div>
                        <div className="absolute top-73 right-140">
                            <p className="text-white text-[20px] absolute w-50">
                                Time <span className="font-bold">Out</span>
                            </p>
                            <p className="text-white text-[20px] absolute top-5 w-50">of the line</p>
                        </div>
                        <div className="absolute">
                            <h1 className="text-white text-[15px] absolute left-40 top-54">{formatTime(totalTime)}</h1>
                            <h1 className="text-white text-[15px] absolute left-40 top-76">{formatTime(outTime)}</h1>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center absolute top-75 left-147">
                    <LoadingBar></LoadingBar>
                </div>
                {inside && (
                    <div
                        style={{ left: pos.x, top: pos.y }}
                        className={`absolute w-6 h-6 bg-[#FFB143] rounded-4xl
                            z-15`}
                    ></div>
                )}
            </div>
        </div>
    );
}

export default StatsGameOne;
