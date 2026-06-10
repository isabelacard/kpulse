import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ImagenFondoCalibration from "../../../assets/calibration1.webp";
import { socket } from "../../../socket";
import { useResponsiveScale } from "../../../hooks/useResponsiveScale";

type SensorPayload = {
    orientation: { x: number; y: number };
};

// Path sits in the lower 2/3 of the 648px space (Y: 260-620)
// leaving the top ~100px clean for the HUD
// NO offsets anywhere — canvas must stay at inset-0 always
const PATH_POINTS: [number, number][] = [
    [80, 610], // START — bottom left
    [80, 310], // go up
    [280, 310], // go right
    [280, 570], // go down
    [500, 570], // go right
    [500, 290], // go up
    [720, 290], // go right
    [720, 580], // go down
    [960, 580], // go right
    [960, 310], // go up
    [1100, 310], // go right — END
];

const PATH_WIDTH = 90;
const TEAL_COLOR = "#1FBFC3";

function drawPath(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, 1176, 648);

    ctx.strokeStyle = TEAL_COLOR;
    ctx.lineWidth = PATH_WIDTH;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(PATH_POINTS[0][0], PATH_POINTS[0][1]);
    for (let i = 1; i < PATH_POINTS.length; i++) {
        ctx.lineTo(PATH_POINTS[i][0], PATH_POINTS[i][1]);
    }
    ctx.stroke();

    // Start indicator
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.beginPath();
    ctx.arc(PATH_POINTS[0][0], PATH_POINTS[0][1], 22, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("START", PATH_POINTS[0][0], PATH_POINTS[0][1] + 5);
}

function GameOne() {
    const navigate = useNavigate();

    const zoneRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const collisionCanvasRef = useRef<HTMLCanvasElement>(null);
    const finishBallRef = useRef<HTMLDivElement>(null);

    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [showBall, setShowBall] = useState(false);
    const [started, setStarted] = useState(false);
    const [totalMs, setTotalMs] = useState(0);
    const [outMs, setOutMs] = useState(0);
    const [isOut, setIsOut] = useState(false);
    const [finished, setFinished] = useState(false);

    const totalMsRef = useRef(0);
    const outMsRef = useRef(0);
    const startedRef = useRef(false);

    const scale = useResponsiveScale();

    useEffect(() => {
        const canvas = canvasRef.current;
        const collision = collisionCanvasRef.current;
        if (!canvas || !collision) return;

        canvas.width = 1176;
        canvas.height = 648;
        collision.width = 1176;
        collision.height = 648;

        const ctx = canvas.getContext("2d");
        const colCtx = collision.getContext("2d", { willReadFrequently: true });

        if (ctx) drawPath(ctx);

        // Collision canvas: identical path, pure detectable teal
        if (colCtx) {
            colCtx.strokeStyle = "#10CCCC";
            colCtx.lineWidth = PATH_WIDTH;
            colCtx.lineCap = "round";
            colCtx.lineJoin = "round";
            colCtx.beginPath();
            colCtx.moveTo(PATH_POINTS[0][0], PATH_POINTS[0][1]);
            for (let i = 1; i < PATH_POINTS.length; i++) {
                colCtx.lineTo(PATH_POINTS[i][0], PATH_POINTS[i][1]);
            }
            colCtx.stroke();
        }
    }, []);

    // ballX/ballY = true center in logical 1176x648 space — same coords as collision canvas
    const isBallInsideLine = useCallback((ballX: number, ballY: number): boolean => {
        const canvas = collisionCanvasRef.current;
        if (!canvas) return false;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return false;

        const checkPoints = [
            [ballX, ballY],
            [ballX - 8, ballY],
            [ballX + 8, ballY],
            [ballX, ballY - 8],
            [ballX, ballY + 8],
        ];

        for (const [px, py] of checkPoints) {
            const x = Math.round(px);
            const y = Math.round(py);
            if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return false;
            const [, g, b, a] = ctx.getImageData(x, y, 1, 1).data;
            if (!(a > 100 && g > 150 && b > 150)) return false;
        }

        return true;
    }, []);

    useEffect(() => {
        if (!started || finished) return;
        const interval = setInterval(() => {
            setTotalMs((prev) => {
                const next = prev + 10;
                totalMsRef.current = next;
                return next;
            });
            if (isOut) {
                setOutMs((prev) => {
                    const next = prev + 10;
                    outMsRef.current = next;
                    return next;
                });
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

    const checkFinishCollision = useCallback(
        (ballCX: number, ballCY: number) => {
            const finish = finishBallRef.current;
            if (!finish || finished) return;

            const finishX = finish.offsetLeft + finish.clientWidth / 2;
            const finishY = finish.offsetTop + finish.clientHeight / 2;
            const distance = Math.hypot(ballCX - finishX, ballCY - finishY);

            if (distance <= 30) {
                setFinished(true);
                navigate("/statsgameone", {
                    state: { totalTime: totalMsRef.current, outTime: outMsRef.current },
                });
            }
        },
        [navigate, finished]
    );

    useEffect(() => {
        const handleSensorMove = (data: SensorPayload) => {
            if (finished) return;

            const percentageX = (data.orientation.x + 45) / 90;
            const percentageY = (-data.orientation.y + 45) / 90;

            // True center in logical 1176x648 — no offset adjustments
            const ballCX = percentageX * 1176;
            const ballCY = percentageY * 648;

            setShowBall(true);
            setPos({ x: ballCX, y: ballCY });

            let currentlyStarted = startedRef.current;
            if (!currentlyStarted) {
                const startX = PATH_POINTS[0][0];
                const startY = PATH_POINTS[0][1];
                const distToStart = Math.hypot(ballCX - startX, ballCY - startY);
                if (distToStart <= 30) {
                    setStarted(true);
                    startedRef.current = true;
                    currentlyStarted = true;
                }
            }

            if (currentlyStarted) {
                const inside = isBallInsideLine(ballCX, ballCY);
                setIsOut(!inside);
                checkFinishCollision(ballCX, ballCY);
            }
        };

        socket.on("screen:data", handleSensorMove);
        return () => {
            socket.off("screen:data", handleSensorMove);
        };
    }, [finished, isBallInsideLine, checkFinishCollision]);

    const finishPoint = PATH_POINTS[PATH_POINTS.length - 1];

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
                    {/* Background */}
                    <img fetchPriority="high" loading="eager" className="absolute inset-0 w-full h-full scale-98 object-cover" src={ImagenFondoCalibration} alt="Background" />

                    {/* Visible path canvas — ALWAYS inset-0, never offset, collision canvas mirrors this exactly */}
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.92 }} />

                    {/* Collision canvas — hidden, identical draw to visible canvas */}
                    <canvas ref={collisionCanvasRef} className="hidden" />

                    <div className="absolute top-50 left-8 right-8 border-t border-white/40" />

                    {/* HUD — z-index above canvas */}
                    <div className="absolute inset-0 z-10 mt-20">
                        <div className="absolute w-48 right-8 top-4 text-right">
                            <p className="text-white text-[15px] font-bold">Time Out of the Line</p>
                            <p className="text-white text-[18px]">{formatTime(outMs)}</p>
                        </div>
                        <div className="absolute w-48 left-8 top-4">
                            <p className="text-white text-[15px] font-bold">Total Time</p>
                            <p className="text-white text-[18px]">{formatTime(totalMs)}</p>
                        </div>
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                            <h1 className="text-white text-[50px] font-medium leading-tight">
                                Level <span className="text-[#1FD0D3] font-bold">One</span>
                            </h1>
                            <p className="text-white text-[15px]">
                                {!started ? (
                                    <span className="text-yellow-300 font-bold animate-pulse">Move the ball to START to begin!</span>
                                ) : (
                                    <span>
                                        Reach the <span className="font-bold">end</span> of the line
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Finish ball — at last path point, no scale adjustment needed (same logical space) */}
                    <div
                        ref={finishBallRef}
                        className="absolute w-10 h-10 bg-[#FF9900] rounded-full z-20"
                        style={{
                            left: finishPoint[0] - 20,
                            top: finishPoint[1] - 20,
                        }}
                    />

                    {/* Player ball — translate-50 centers it on the logical coord */}
                    {showBall && (
                        <div
                            style={{
                                left: pos.x,
                                top: pos.y,
                                transform: "translate(-50%, -50%)",
                                transition: "left 0.05s linear, top 0.05s linear",
                            }}
                            className={`absolute w-5 h-5 rounded-full z-30 ${isOut ? "bg-red-500" : "bg-[#FFB143]"}`}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default GameOne;
