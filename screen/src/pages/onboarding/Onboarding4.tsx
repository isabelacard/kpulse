import { useState, useEffect } from "react";
import { ProgressBar } from "./components/ProgressBar";
import fondocarga3 from "../../assets/fondocarga3.webp";

export default function Onboarding4() {
    const [progress, setProgress] = useState(50);

    useEffect(() => {
        const animationTimer = setTimeout(() => {
            setProgress(100);
        }, 100);

        return () => clearTimeout(animationTimer);
    }, []);

    return (
        <div className="flex items-center justify-center w-full h-screen relative bg-white overflow-hidden">
            <img src={fondocarga3} alt="Fondo Carga Final" className="w-full scale-104 h-screen object-contain z-0 absolute" />

            <div className="z-10 flex w-full flex-col px-6 md:px-20 lg:px-35">
                <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl md:translate-x-8 lg:translate-x-16">
                    <header className="text-center md:text-left lg:text-left">
                        <h1 className="text-white text-5xl md:text-6xl lg:text-6xl font-bold leading-[1.05] tracking-tight font-poppins mb-10 mr-10">
                            <span className="block mb-2 md:mb-3 font-poppins font-bold">Connected</span>
                            <span className="bg-linear-to-b from-white to-orange-400 bg-clip-text text-transparent font-poppins font-bold">succesfully</span>
                        </h1>
                    </header>

                    <div className="flex justify-center md:justify-start mt-4">
                        <ProgressBar progress={progress} />
                    </div>
                </div>
            </div>
        </div>
    );
}
