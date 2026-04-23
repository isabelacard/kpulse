import { useEffect, useState } from "react";

function LoadingBar() {
    const [progress, setProgress] = useState(0);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const duration = 4000;
        const interval = 50;
        const step = (interval / duration) * 100;

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setReady(true);
                    return 100;
                }
                return prev + step;
            });
        }, interval);

        return () => clearInterval(timer);
    }, []);

    const circleLeft = `calc(2px + (100% - 34px) * ${progress / 100})`;

    return (
        <div className="border-2 border-[#FFB349] w-100 h-9.5 rounded-4xl absolute mt-18 top-48 overflow-hidden">
            <div
                className="absolute top-0 left-0 h-7.5 rounded-4xl mt-0.5 transition-all opacity-50"
                style={{
                    width: `${progress + 1}%`,
                    background: "linear-gradient(to right, #3a2a00, #FFB349)",
                }}
            />

            <div
                className="absolute top-0.5 h-7.5 w-7.5 bg-[#F6CF84] rounded-4xl transition-all"
                style={{
                    left: circleLeft,
                }}
            />
            <p className="text-[#F6CF84]/70 text-[15px] flex justify-center items-center h-full relative z-10">{ready ? "Ready" : "Wait a few seconds"}</p>
        </div>
    );
}

export default LoadingBar;
