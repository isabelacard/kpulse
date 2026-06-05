import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImagenFondoCalibration from "../../../assets/calibration1.png";
import BreathingCircle from "../../../components/BreathingCircle";
import { socket } from "../../../socket";

type SensorPayload = {
    orientation: {x: number; y: number; };
}

function PreGameOne() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [isCentering, setIsCentering] = useState(false);
    const zoneRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const moveDot = (data: SensorPayload) => {
            const zone = zoneRef.current?.getBoundingClientRect();
            if (!zone) return;

            // Percentage-based calculation — always update dot position
            const percentageX = (data.orientation.x + 45) / 90;
            const percentageY = (-data.orientation.y + 45) / 90;

            const posX = percentageX * zone.width;
            const posY = percentageY * zone.height;

            setPos({ x: posX, y: posY });

            // Calculate center collision only when circleRef is ready
            const circle = circleRef.current?.getBoundingClientRect();
            if (!circle) return;

            const circleCenterX = circle.left + circle.width / 2 - zone.left;
            const circleCenterY = circle.top + circle.height / 2 - zone.top + 100;

            const distance = Math.hypot(posX - circleCenterX, posY - circleCenterY);

            // Check if the orange dot is inside the central circle area
            setIsCentering(distance < 20);
        };

        socket.on("screen:data", moveDot);

        return () => {
            socket.off("screen:data", moveDot);
        };
    }, []);

    //Continuous 6-second hold timer
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (isCentering) {
            timer = setTimeout(() => {
                navigate("/gametwo");
            }, 6000);
        }

        // Reset timer instantly if the user leaves the center area
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isCentering, navigate]);


    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div ref={zoneRef} className="relative w-294 h-162 shrink-0 overflow-hidden rounded-xl">
                <img className="absolute" src={ImagenFondoCalibration} alt="Background" />
                <div className="relative z-10 flex flex-col items-center mt-20 h-full">
                    <div className="flex flex-col absolute -top-10">
                        <h1 className="text-white text-[50px] text-center font-medium">
                            Level <span className="text-[#FFB143] font-bold">Two </span>
                        </h1>
                        <h1 className="text-white text-[15px] text-center mb-20 absolute self-center top-15">
                            Dont drop the balls
                        </h1>
                    </div>
                    <div className="flex flex-col absolute top-14">
                        <h1 className="text-white text-2xl text-center">
                            Place your <span className="text-[#FFB143] font-bold">Orange Dot </span>in the
                            <span className="text-[#1FD0D3] font-bold"> Center </span>
                        </h1>
                        <h1 className="text-white text-2xl text-center">of the screen to start the game</h1>
                    </div>

                    <div ref={circleRef}>
                        <BreathingCircle />
                    </div>

                    <div className="absolute border-b-2 w-30 border-white top-132"></div>
                    
                    <p className={`flex mt-50 font-bold ${isCentering ? "text-[#1FD0D3]" : "text-white"}`}>
                        {isCentering ? "Hold it there for 6 seconds!" : "Waiting for your move"}
                    </p>
                </div>
                
                {/* Orange Dot */}
                <div 
                    style={{ 
                        left: pos.x, 
                        top: pos.y,
                        transition: "left 0.05s linear, top 0.05s linear"
                    }} 
                    className="absolute w-5 h-5 bg-[#FFB143] rounded-4xl z-15" 
                />
            </div>
        </div>
    );
}

export default PreGameOne;
