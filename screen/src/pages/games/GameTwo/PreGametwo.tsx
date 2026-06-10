import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImagenFondoCalibration from "../../../assets/calibration1.webp";
import BreathingCircle from "../../../components/BreathingCircle";
import { socket } from "../../../socket";
import { useResponsiveScale } from "../../../hooks/useResponsiveScale";

type SensorPayload = {
    orientation: { x: number; y: number };
};

function PreGameTwo() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [isCentering, setIsCentering] = useState(false);

    const zoneRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const scale = useResponsiveScale();

    useEffect(() => {
        const moveDot = (data: SensorPayload) => {
            const zone = zoneRef.current?.getBoundingClientRect();
            const circle = circleRef.current?.getBoundingClientRect();

            if (!zone || !circle) return;

            const percentageX = (data.orientation.x + 45) / 90;
            const percentageY = (-data.orientation.y + 45) / 90;

            const posX = percentageX * 1176;
            const posY = percentageY * 648;

            setPos({ x: posX, y: posY });

            const circleCenterX = (circle.left + circle.width / 2 - zone.left) / scale;
            const circleCenterY = (circle.top + circle.height / 2 - zone.top) / scale;

            const distance = Math.hypot(posX - circleCenterX, posY - circleCenterY);

            setIsCentering(distance < 40);
        };

        socket.on("screen:data", moveDot);
        return () => {
            socket.off("screen:data", moveDot);
        };
    }, [scale]);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (isCentering) {
            timer = setTimeout(() => {
                socket.emit("changePage", "/gametwo");
                navigate("/gametwo");
            }, 6000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isCentering, navigate]);

    return (
        <div className="flex items-center justify-center w-screen h-screen overflow-hidden">
            <div
                style={{
                    width: 1176 * scale,
                    height: 648 * scale,
                    position: "relative",
                }}
                className="flex items-center justify-center overflow-hidden"
            >
                <div
                    ref={zoneRef}
                    style={{
                        width: 1176,
                        height: 648,
                        transform: `scale(${scale})`,
                        transformOrigin: "center",
                        position: "absolute",
                    }}
                    className="shrink-0 overflow-hidden rounded-xl"
                >
                    <img fetchPriority="high" loading="eager" className="absolute scale-98 inset-0 w-full h-full object-cover" src={ImagenFondoCalibration} alt="Background" />

                    <div className="relative z-10 flex flex-col items-center mt-20 h-full">
                        <div className="flex flex-col absolute -top-10">
                            <h1 className="text-white text-[50px] text-center font-medium">
                                Level <span className="text-[#FFB143] font-bold">Two</span>
                            </h1>

                            <h1 className="text-white text-[15px] text-center mb-20 absolute self-center top-15">
                                Dont <span className="font-bold">drop </span> the balls
                            </h1>
                        </div>

                        <div className="flex flex-col absolute top-14">
                            <h1 className="text-white text-2xl text-center">
                                Place your <span className="text-[#FFB143] font-bold">Orange Dot</span> in the
                                <span className="text-[#1FD0D3] font-bold"> Center</span>
                            </h1>

                            <h1 className="text-white text-2xl text-center">of the screen to start the game</h1>
                        </div>

                        <div ref={circleRef} className="mt-60">
                            <BreathingCircle />
                        </div>

                        <div className="absolute border-b-2 w-30 border-white top-132" />

                        <p className={`flex mt-48 font-bold ${isCentering ? "text-[#1FD0D3]" : "text-white"}`}>{isCentering ? "Hold it there for 6 seconds!" : "Waiting for your move"}</p>
                    </div>

                    <div
                        style={{
                            left: pos.x,
                            top: pos.y,
                            transform: "translate(-50%, -50%)",
                        }}
                        className="absolute w-5 h-5 bg-[#FFB143] rounded-full z-20"
                    />
                </div>
            </div>
        </div>
    );
}

export default PreGameTwo;
