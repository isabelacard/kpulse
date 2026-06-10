import { useEffect } from "react";
import { useNavigate } from "react-router";
import ImagenFondo from "../../../assets/Instrucciones1.webp";
import Pelota2 from "../../../assets/pelota2.webp";
import { useResponsiveScale } from "../../../hooks/useResponsiveScale";

function Instructions2() {
    const navigate = useNavigate();
    const scale = useResponsiveScale();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/instructions3");
        }, 10000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div
                style={{
                    width: 1176 * scale,
                    height: 648 * scale,
                    position: "relative",
                }}
                className="flex items-center justify-center overflow-hidden"
            >
                <div
                    style={{
                        width: 1176,
                        height: 648,
                        transform: `scale(${scale})`,
                        transformOrigin: "center",
                        position: "absolute",
                    }}
                    className="shrink-0 overflow-hidden rounded-xl"
                >
                    <img className="absolute z-10 w-280 left-80 top-30" src={Pelota2}></img>
                    <img className="absolute" src={ImagenFondo} />
                    <div className="relative z-10 flex flex-col items-center mt-20 h-full">
                        <div className="flex items-center gap-4 mb-8">
                            <div
                                className="w-20 h-20 rounded-full bg-[#00FFD5] flex items-center 
                            justify-center text-white font-bold"
                            >
                                <p className="text-4xl text-white text-shadow-lg">1</p>
                            </div>
                            <div className="w-15 h-1 bg-white/53 rounded" />
                            <div
                                className="w-20 h-20 rounded-full bg-[#A9A9A9] flex items-center 
                            justify-center text-white font-bold"
                            >
                                <p className="text-4xl text-white/70 text-shadow-lg">2</p>
                            </div>
                            <div className="w-15 h-1 bg-white/53 rounded" />
                            <div
                                className="w-20 h-20 rounded-full bg-[#A9A9A9] flex items-center 
                            justify-center text-white font-bold"
                            >
                                <p className="text-4xl text-white/70 text-shadow-lg">3</p>
                            </div>
                        </div>

                        <div className="flex flex-col mt-22 absolute left-10 top-35">
                            <h1 className="text-white text-4xl text-center">
                                Insert your <span className="text-[#F6CF84] font-bold">phone </span>into the sphere
                            </h1>
                            <h1 className="text-white text-4xl text-center">
                                and <span className="text-[#F6CF84] font-bold">hold it firmly with both hands.</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Instructions2;
