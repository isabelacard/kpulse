import { useEffect, useRef, useState } from "react";
import ImagenFondoCalibration from "../../../assets/calibration1.png";
import LoadingBar from "../../../components/LoadingBar";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../socket";

function InstructionsFinal() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [inside, setInside] = useState(false);
    const zoneRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

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
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div onMouseMove={handleMouseMove} ref={zoneRef} onMouseEnter={() => setInside(true)} onMouseLeave={() => setInside(false)} className="relative w-294 h-162 shrink-0 overflow-hidden rounded-xl">
                <img className="absolute" src={ImagenFondoCalibration} />
                <div className="relative z-10 flex flex-col items-center mt-20 h-full">
                    <div className="flex flex-col absolute top-40">
                        <h1 className="text-white text-4xl text-center">
                            You are <span className="text-[#1FD0D3] font-bold">Ready!! </span>
                        </h1>
                        <h1 className="text-white text-4xl text-center">
                            Lets start the
                            <span className="text-[#F6CF84] font-bold"> Game</span>
                        </h1>
                    </div>

                    <LoadingBar></LoadingBar>
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

export default InstructionsFinal;
