import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImagenFondoCalibration from "../../assets/calibration1.webp";
import squarestats from "../../assets/squaregameone.png";
import LoadingBar from "../../components/LoadingBar";
import { socket } from "../../socket";
import { useResponsiveScale } from "../../hooks/useResponsiveScale";

type SensorPayload = {
    orientation: { x: number; y: number };
};

function StatsGameOne() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [showDot, setShowDot] = useState(false);
    const zoneRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const scale = useResponsiveScale();

    const location = useLocation();
    const { totalTime, outTime } = location.state ?? { totalTime: 0, outTime: 0 };

    useEffect(() => {
        // Emitir resultados del juego 1 al cargar la pantalla de stats
        socket.emit("game:results", {
            game_number: 1,
            score: outTime,
            duration_seconds: Math.round(totalTime / 1000),
        });

        const timer = setTimeout(() => {
            socket.emit("changePage", "/calibratetwo");
            navigate("/calibratetwo");
        }, 7000);

        return () => clearTimeout(timer);
    }, [navigate, outTime, totalTime]);

    // Listen for sensor data from the controller
    useEffect(() => {
        const moveDot = (data: SensorPayload) => {
            const percentageX = (data.orientation.x + 45) / 90;
            const percentageY = (-data.orientation.y + 45) / 90;

            setShowDot(true);
            setPos({
                x: percentageX * 1176 - 8,
                y: percentageY * 648 - 8,
            });
        };

        socket.on("screen:data", moveDot);
        return () => {
            socket.off("screen:data", moveDot);
        };
    }, []);

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milli = ms % 1000;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milli.toString().padStart(3, "0")}`;
    };

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
                    <img className="absolute scale-98 inset-0 w-full h-full object-cover" src={ImagenFondoCalibration} alt="Background" />
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
                    {showDot && <div style={{ left: pos.x, top: pos.y, transition: "left 0.05s linear, top 0.05s linear" }} className="absolute w-6 h-6 bg-[#FFB143] rounded-4xl z-15" />}
                </div>
            </div>
        </div>
    );
}

export default StatsGameOne;
