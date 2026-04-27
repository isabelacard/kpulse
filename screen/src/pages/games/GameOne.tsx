import { useRef, useState } from "react";
import ImagenFondoCalibration from "../../assets/calibration1.png";
import PatronJuegoUno from "../../assets/patronjuego1.png";

function GameOne() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [inside, setInside] = useState(false);
    const zoneRef = useRef<HTMLDivElement>(null);

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
                <img className="absolute w-235 top-40 left-30" src={PatronJuegoUno}></img>
                <div className="relative z-10 flex flex-col items-center mt-20 h-full">
                    <div className="flex flex-col absolute w-40 right-30 top-8 text-right">
                        <h1 className="text-white text-[15px] top-15">
                            <span className="font-bold"> Time Out of the Line</span>
                        </h1>
                        <h1 className="text-white text-[15px] top-5 left-29 text-righ">{"time"}</h1>
                    </div>

                    <div className="flex flex-col absolute w-20 left-30 top-8">
                        <h1 className="text-white text-[15px] top-15">
                            <span className="font-bold"> Total Time</span>
                        </h1>
                        <h1 className="text-white absolute text-[15px] top-5">{"time"}</h1>
                    </div>

                    <div className="flex flex-col absolute -top-10">
                        <h1 className="text-white text-[50px] text-center font-medium">
                            Level <span className="text-[#1FD0D3] font-bold">One </span>
                        </h1>
                        <h1 className="text-white text-[15px] text-center mb-20 absolute self-center top-15">
                            Reach the
                            <span className="font-bold"> end</span> of the line
                        </h1>
                    </div>
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

export default GameOne;
