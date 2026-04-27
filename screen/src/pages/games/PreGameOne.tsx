import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImagenFondoCalibration from "../../assets/calibration1.png";
import BreathingCircle from "../../components/BreathingCircle";

function PreGameOne() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
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

        // Obtener centro del BreathingCircle en coordenadas del contenedor
        const circleRect = circleRef.current?.getBoundingClientRect();
        if (!circleRect) return;

        const circleCenterX = circleRect.left + circleRect.width / 2 - rect.left;
        const circleCenterY = circleRect.top + circleRect.height / 2 - rect.top + 100;

        const dx = x - circleCenterX;
        const dy = y - circleCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Si la bolita toca el círculo (ajusta el radio según el tamaño de tu BreathingCircle)
        if (distance < 10) {
            navigate("/gameone");
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div onMouseMove={handleMouseMove} ref={zoneRef} onMouseEnter={() => setInside(true)} onMouseLeave={() => setInside(false)} className="relative w-294 h-162 shrink-0 overflow-hidden rounded-xl">
                <img className="absolute" src={ImagenFondoCalibration} />
                <div className="relative z-10 flex flex-col items-center mt-20 h-full">
                    <div className="flex flex-col absolute -top-10">
                        <h1 className="text-white text-[50px] text-center font-medium">
                            Level <span className="text-[#1FD0D3] font-bold">One </span>
                        </h1>
                        <h1 className="text-white text-[15px] text-center mb-20 absolute self-center top-15">
                            Reach the <span className="font-bold">end</span> of the line
                        </h1>
                    </div>
                    <div className="flex flex-col absolute top-14">
                        <h1 className="text-white text-2xl text-center">
                            Place your <span className="text-[#FFB143] font-bold">Orange Dot </span>in the
                            <span className="text-[#1FD0D3] font-bold"> Center </span>
                        </h1>
                        <h1 className="text-white text-2xl text-center">of the screen to start the game</h1>
                    </div>

                    {/* ref aquí para medir su posición */}
                    <div ref={circleRef}>
                        <BreathingCircle />
                    </div>

                    <div className="absolute border-b-2 w-30 border-white top-132"></div>
                    <p className="flex mt-50 text-white">Waiting for your move</p>
                </div>
                {inside && <div style={{ left: pos.x, top: pos.y }} className="absolute w-5 h-5 bg-[#FFB143] rounded-4xl z-15" />}
            </div>
        </div>
    );
}

export default PreGameOne;
