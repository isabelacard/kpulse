import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImagenFondo from "../../../assets/fondote.webp";
import { socket } from "../../../socket";
import { useResponsiveScale } from "../../../hooks/useResponsiveScale";

const GAME_DURATION = 15;
const BALL_RADIUS = 22;
const BAR_WIDTH = 260;
const BAR_HEIGHT = 20;
const BALL_SPEED_MIN = 3;
const BALL_SPEED_MAX = 6;
const MAX_BALLS_ALIVE = 5;

type Ball = {
    id: number;
    x: number;
    y: number;
    speed: number;
};

type SensorPayload = {
    orientation: { x: number; y: number };
};

let ballIdCounter = 0;

function GameTwo() {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const animFrameRef = useRef<number>(0);
    const lastSpawnRef = useRef<number>(0);

    const [barX, setBarX] = useState(0);
    const [balls, setBalls] = useState<Ball[]>([]);
    const [strayBalls, setStrayBalls] = useState(0);
    const [caughtBalls, setCaughtBalls] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [started, setStarted] = useState(false);
    const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
    const scale = useResponsiveScale();

    // Measure container
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => {
            setContainerSize({ w: el.clientWidth, h: el.clientHeight });
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // Timer
    useEffect(() => {
        if (!started) return;
        if (timeLeft <= 0) {
            navigate("/statstwo", { state: { strayBalls, caughtBalls } });
            return;
        }
        const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
        return () => clearTimeout(id);
    }, [started, timeLeft, navigate, strayBalls, caughtBalls]);

    // Handle incoming socket messages for bar movement
    useEffect(() => {
        const handleSensorMove = (data: SensorPayload) => {
            const el = containerRef.current;
            if (!el) return;

            // Constrain movement within the container bounds
            const percentageX = (data.orientation.x + 45) / 90;
            const newBarX = percentageX * el.clientWidth;

            if (!started) setStarted(true);
            setBarX(newBarX);
        };

        socket.on("screen:data", handleSensorMove);
        return () => {
            socket.off("screen:data", handleSensorMove);
        };
    }, [started]);

    // Game loop for ball physics
    useEffect(() => {
        if (!started || timeLeft <= 0) return;

        const loop = (timestamp: number) => {
            // Spawn balls periodically
            if (timestamp - lastSpawnRef.current > 2000 && balls.length < MAX_BALLS_ALIVE) {
                lastSpawnRef.current = timestamp;
                const newBall: Ball = {
                    id: ballIdCounter++,
                    x: Math.random() * (containerSize.w - BALL_RADIUS * 2) + BALL_RADIUS,
                    y: 40,
                    speed: Math.random() * (BALL_SPEED_MAX - BALL_SPEED_MIN) + BALL_SPEED_MIN,
                };
                setBalls((prev) => [...prev, newBall]);
            }

            // Move and collide
            setBalls((prev) => {
                const next: Ball[] = [];
                prev.forEach((ball) => {
                    const nextY = ball.y + ball.speed;

                    // Check if it reached the bar collision zone
                    const barY = containerSize.h - 60;
                    if (nextY >= barY && nextY <= barY + BAR_HEIGHT) {
                        const barLeft = barX - BAR_WIDTH / 2;
                        const barRight = barX + BAR_WIDTH / 2;

                        if (ball.x >= barLeft && ball.x <= barRight) {
                            setCaughtBalls((c) => c + 1);
                            return; // Caught, remove from list
                        }
                    }

                    // Check if it went off screen bottom
                    if (nextY > containerSize.h) {
                        setStrayBalls((s) => s + 1);
                        return; // Missed, remove
                    }

                    next.push({ ...ball, y: nextY });
                });
                return next;
            });

            animFrameRef.current = requestAnimationFrame(loop);
        };

        animFrameRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animFrameRef.current);
    }, [started, timeLeft, containerSize, balls.length, barX]);

    const barY = containerSize.h - 60;

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
                    ref={containerRef}
                    style={{
                        width: 1176,
                        height: 648,
                        transform: `scale(${scale})`,
                        transformOrigin: "center",
                        position: "absolute",
                    }}
                    className="shrink-0 overflow-hidden rounded-xl cursor-none"
                >
                    {/* Background */}
                    <img fetchPriority="high" loading="eager" className="absolute scale-98 inset-0 w-full h-full object-cover" src={ImagenFondo} alt="Background" />

                    {/* Top UI */}
                    <div className="relative z-1 flex flex-col items-center pt-20">
                        <h1 className="text-white text-[50px] font-medium text-center">
                            Level <span className="text-[#FFB143] font-bold">Two</span>
                        </h1>
                        <p className="text-white text-[15px] text-center -mt-2">Don't drop the balls</p>

                        {/* Stats */}
                        <div className="absolute top-30 left-8 text-white">
                            <p className="font-bold text-lg">Time Remaining</p>
                            <p>{timeLeft} Seg</p>
                        </div>
                        <div className="absolute top-30 right-8 text-white text-right">
                            <p className="font-bold text-lg">Stray Balls</p>
                            <p>{strayBalls}</p>
                        </div>

                        {/* Divider line */}
                        <div className="absolute top-50 left-8 right-8 border-t border-white/40" />
                    </div>

                    {/* Balls */}
                    {balls.map((ball) => (
                        <div
                            key={ball.id}
                            className="absolute rounded-full bg-[#FFB143] z-20"
                            style={{
                                width: BALL_RADIUS * 2,
                                height: BALL_RADIUS * 2,
                                left: ball.x - BALL_RADIUS,
                                top: ball.y - BALL_RADIUS,
                            }}
                        />
                    ))}

                    {/* Bar */}
                    <div
                        className="absolute z-20 rounded-full bg-[#FFB143]"
                        style={{
                            width: BAR_WIDTH,
                            height: BAR_HEIGHT,
                            left: barX - BAR_WIDTH / 2,
                            top: barY,
                            transition: "left 0.05s linear",
                        }}
                    />

                    {/* Waiting message if not started */}
                    {!started && (
                        <div className="absolute inset-0 flex items-center justify-center z-30">
                            <p className="text-white text-2xl animate-pulse">Move your device to start</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GameTwo;
