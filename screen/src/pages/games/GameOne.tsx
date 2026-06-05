import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImagenFondoCalibration from "../../assets/calibration1.png";
import PatronJuegoUno from "../../assets/patronjuego1.png";
import { socket } from "../../socket";

type SensorPayload = {
    orientation: { x: number; y: number };
};

function GameOne() {
    const navigate = useNavigate();

    const zoneRef = useRef<HTMLDivElement>(null);
    const patternImgRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const finishBallRef = useRef<HTMLDivElement>(null);

    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [showBall, setShowBall] = useState(false);

    const [started, setStarted] = useState(false);
    const [totalMs, setTotalMs] = useState(0);
    const [outMs, setOutMs] = useState(0);

    const [isOut, setIsOut] = useState(false);
    const [finished, setFinished] = useState(false);

    const buildCollisionMap = () => {
        const img = patternImgRef.current;
        const canvas = canvasRef.current;

        if (!img || !canvas) return;

        const ctx = canvas.getContext("2d", {
            willReadFrequently: true,
        });

        if (!ctx) return;

        const width = img.clientWidth;
        const height = img.clientHeight;

        canvas.width = width;
        canvas.height = height;

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
    };

    useEffect(() => {
        window.addEventListener("resize", buildCollisionMap);

        return () => {
            window.removeEventListener("resize", buildCollisionMap);
        };
    }, []);

    const isBallInsideLine = (ballX: number, ballY: number) => {
        const img = patternImgRef.current;
        const canvas = canvasRef.current;
        const zone = zoneRef.current;

        if (!img || !canvas || !zone) return false;

        const ctx = canvas.getContext("2d", {
            willReadFrequently: true,
        });

        if (!ctx) return false;

        const imgRect = img.getBoundingClientRect();
        const zoneRect = zone.getBoundingClientRect();

        const radius = 10;

        for (let x = -radius; x <= radius; x++) {
            for (let y = -radius; y <= radius; y++) {
                if (x * x + y * y <= radius * radius) {
                    const px = ballX + radius + x - (imgRect.left - zoneRect.left);
                    const py = ballY + radius + y - (imgRect.top - zoneRect.top);

                    if (px < 0 || py < 0 || px >= canvas.width || py >= canvas.height) {
                        return false;
                    }

                    const pixel = ctx.getImageData(px, py, 1, 1).data;

                    const r = pixel[0];
                    const g = pixel[1];
                    const b = pixel[2];
                    const a = pixel[3];

                    const inside = a > 0 && r > 20 && r < 90 && g > 170 && b > 170;

                    if (!inside) {
                        return false;
                    }
                }
            }
        }
        return true;
    };

    useEffect(() => {
        if (!started || finished) return;

        const interval = setInterval(() => {
            setTotalMs((prev) => prev + 10);

            if (isOut) {
                setOutMs((prev) => prev + 10);
            }
        }, 10);
        return () => clearInterval(interval);
    }, [started, isOut, finished]);

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milli = ms % 1000;

        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milli.toString().padStart(3, "0")}`;
    };

    const checkFinishCollision = (ballX: number, ballY: number) => {
        const finish = finishBallRef.current;
        const zone = zoneRef.current;

        if (!finish || !zone || finished) return;

        const finishRect = finish.getBoundingClientRect();
        const zoneRect = zone.getBoundingClientRect();

        const finishX = finishRect.left - zoneRect.left + finishRect.width / 2;
        const finishY = finishRect.top - zoneRect.top + finishRect.height / 2;

        const playerX = ballX + 12;
        const playerY = ballY + 12;

        const distance = Math.sqrt((playerX - finishX) ** 2 + (playerY - finishY) ** 2);

        if (distance <= 24) {
            setFinished(true);

            navigate("/statsgameone", {
                state: {
                    totalTime: totalMs,
                    outTime: outMs,
                },
            });
        }
    };

    // Connection with the Controller's physical sensors
    useEffect(() => {
        const handleSensorMove = (data: SensorPayload) => {
            const zone = zoneRef.current?.getBoundingClientRect();
            if (!zone || finished) return;

            const percentageX = (data.orientation.x + 45) / 90;
            const percentageY = (-data.orientation.y + 45) / 90;

            // Calculate exact position in pixels minus half the dot size
            const posX = percentageX * zone.width - 10;
            const posY = percentageY * zone.height - 10;

            if (!started) setStarted(true);

            setShowBall(true);
            setPos({ x: posX, y: posY });

            // Execute the existing logic for line out and finish collision
            const inside = isBallInsideLine(posX, posY);
            setIsOut(!inside);
            checkFinishCollision(posX, posY);
        };

        socket.on("screen:data", handleSensorMove);

        return () => {
            socket.off("screen:data", handleSensorMove);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [started, finished, totalMs, outMs, isOut]);

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div ref={zoneRef} className="relative w-294 h-162 shrink-0 overflow-hidden rounded-xl">
                <img className="absolute" src={ImagenFondoCalibration} alt="Background" />

                <img ref={patternImgRef} className="absolute w-235 top-40 left-30" src={PatronJuegoUno} onLoad={buildCollisionMap} alt="Level Map" />

                <canvas ref={canvasRef} className="hidden" />

                <div className="relative z-10 flex flex-col items-center mt-20 h-full">
                    <div className="absolute w-48 right-30 top-8 text-right">
                        <h1 className="text-white text-[15px] font-bold">Time Out of the Line</h1>
                        <h1 className="text-white text-[18px]">{formatTime(outMs)}</h1>
                    </div>

                    <div className="absolute w-48 left-30 top-8">
                        <h1 className="text-white text-[15px] font-bold">Total Time</h1>
                        <h1 className="text-white text-[18px]">{formatTime(totalMs)}</h1>
                    </div>

                    <div className="absolute -top-10">
                        <h1 className="text-white text-[50px] text-center font-medium">
                            Level <span className="text-[#1FD0D3] font-bold">One</span>
                        </h1>

                        <h1 className="text-white text-[15px] text-center absolute self-center top-15 left-1/2 -translate-x-1/2 whitespace-nowrap">
                            Reach the <span className="font-bold">end</span> of the line
                        </h1>
                    </div>
                </div>

                <div
                    ref={finishBallRef}
                    className="absolute w-10 h-10 bg-[#FF9900] rounded-full z-20"
                    style={{
                        top: "225px",
                        right: "204px",
                    }}
                />

                {showBall && (
                    <div
                        style={{
                            left: pos.x,
                            top: pos.y,
                            transition: "left 0.05s linear, top 0.05s linear",
                        }}
                        className={`absolute w-5 h-5 rounded-full z-20 ${isOut ? "bg-red-500" : "bg-[#FFB143]"}`}
                    />
                )}
            </div>
        </div>
    );
}

export default GameOne;
