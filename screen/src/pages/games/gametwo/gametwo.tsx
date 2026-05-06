import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImagenFondo from "../../../assets/fondote.png";

const GAME_DURATION = 15;
const BALL_RADIUS = 22;
const BAR_WIDTH = 260;
const BAR_HEIGHT = 20;
const BALL_SPEED_MIN = 3;
const BALL_SPEED_MAX = 6;
const MAX_BALLS_ALIVE = 5;

interface Ball {
    id: number;
    x: number;
    y: number;
    speed: number;
}

let ballIdCounter = 0;

function GameTwo() {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const animFrameRef = useRef<number>(0);
    const lastSpawnRef = useRef<number>(0);

    const [barX, setBarX] = useState(0); // centro de la barra
    const [balls, setBalls] = useState<Ball[]>([]);
    const [strayBalls, setStrayBalls] = useState(0);
    const [caughtBalls, setCaughtBalls] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [started, setStarted] = useState(false);
    const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

    // Medir contenedor
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => {
            setContainerSize({ w: el.clientWidth, h: el.clientHeight });
            setBarX(el.clientWidth / 2);
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
    }, [started, timeLeft, navigate]);

    // Mouse move → mover barra
    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;
            if (!started) setStarted(true);
            const x = e.clientX - rect.left;
            setBarX(Math.max(BAR_WIDTH / 2, Math.min(rect.width - BAR_WIDTH / 2, x)));
        },
        [started]
    );

    // Ref mutable para barX (accesible dentro del loop sin stale closure)
    const barXRef = useRef(barX);
    useEffect(() => {
        barXRef.current = barX;
    }, [barX]);

    // Game loop — spawn + física
    useEffect(() => {
        if (!started || timeLeft <= 0) return;

        const { w, h } = containerSize;
        if (!w || !h) return;

        const barY = h - 60; // posición Y fija de la barra

        const loop = (timestamp: number) => {
            // Spawn nueva bola cada ~1.2s si hay menos de MAX_BALLS_ALIVE
            if (timestamp - lastSpawnRef.current > 1200) {
                lastSpawnRef.current = timestamp;
                setBalls((prev) => {
                    if (prev.length >= MAX_BALLS_ALIVE) return prev;
                    const newBall: Ball = {
                        id: ballIdCounter++,
                        x: BALL_RADIUS + Math.random() * (w - BALL_RADIUS * 2),
                        y: -BALL_RADIUS,
                        speed: BALL_SPEED_MIN + Math.random() * (BALL_SPEED_MAX - BALL_SPEED_MIN),
                    };
                    return [...prev, newBall];
                });
            }

            // Mover bolas y detectar colisiones
            setBalls((prev) => {
                const surviving: Ball[] = [];
                let dropped = 0;

                for (const ball of prev) {
                    const newY = ball.y + ball.speed;

                    // ¿Colisiona con la barra?
                    const barLeft = barXRef.current - BAR_WIDTH / 2;
                    const barRight = barXRef.current + BAR_WIDTH / 2;
                    const hitBar = newY + BALL_RADIUS >= barY && newY - BALL_RADIUS <= barY + BAR_HEIGHT && ball.x >= barLeft && ball.x <= barRight;

                    if (hitBar) {
                        setCaughtBalls((c) => c + 1);
                        continue;
                    }

                    if (newY - BALL_RADIUS > h) {
                        // Cayó al suelo
                        dropped++;
                        continue;
                    }

                    surviving.push({ ...ball, y: newY });
                }

                if (dropped > 0) setStrayBalls((s) => s + dropped);
                return surviving;
            });

            animFrameRef.current = requestAnimationFrame(loop);
        };

        animFrameRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animFrameRef.current);
    }, [started, timeLeft, containerSize]);

    const barY = containerSize.h - 60;

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div ref={containerRef} onMouseMove={handleMouseMove} className="relative w-294 h-162 shrink-0 overflow-hidden rounded-xl cursor-none">
                {/* Fondo */}
                <img className="absolute" src={ImagenFondo} />

                {/* UI superior */}
                <div className="relative z-1 flex flex-col items-center pt-15">
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

                    {/* Línea divisoria */}
                    <div className="absolute top-50 left-8 right-8 border-t border-white/40" />
                </div>

                {/* Bolas */}
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

                {/* Barra */}
                <div
                    className="absolute z-20 rounded-full bg-[#FFB143]"
                    style={{
                        width: BAR_WIDTH,
                        height: BAR_HEIGHT,
                        left: barX - BAR_WIDTH / 2,
                        top: barY,
                    }}
                />

                {/* Waiting message si no ha empezado */}
                {!started && (
                    <div className="absolute inset-0 flex items-center justify-center z-30">
                        <p className="text-white text-2xl animate-pulse">Move your mouse to start</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GameTwo;
