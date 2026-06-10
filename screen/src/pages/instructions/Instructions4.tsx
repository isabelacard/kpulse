import { useEffect } from "react";
import ImagenFondo from "../../assets/Instrucciones1.webp";
import Check1 from "../../assets/check1.png";
import LoadingBar from "../../components/LoadingBar";
import { useNavigate } from "react-router-dom";
import { useResponsiveScale } from "../../hooks/useResponsiveScale";
import { socket } from "../../socket";

function Instructions4() {
    const navigate = useNavigate();
    const scale = useResponsiveScale();

    useEffect(() => {
        const timer = setTimeout(() => {
            socket.emit("changePage", "/calibration1");
            navigate("/calibration1");
        }, 7000);

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
                    <img fetchPriority="high" loading="eager" className="absolute z-0 w-full scale-98 h-full object-cover top-0 left-0" src={ImagenFondo} />
                    <div className="relative z-10 flex flex-col items-center mt-20 h-full">
                        <div className="flex items-center gap-4 mb-8">
                            <div
                                className="w-20 h-20 rounded-full bg-white flex items-center 
                            justify-center text-white font-bold"
                            >
                                <img fetchPriority="high" loading="eager" className="absolute w-15" src={Check1}></img>
                            </div>
                            <div className="w-15 h-1 bg-white/53 rounded" />
                            <div
                                className="w-20 h-20 rounded-full bg-white flex items-center 
                            justify-center text-white font-bold"
                            >
                                <img fetchPriority="high" loading="eager" className="absolute w-15" src={Check1}></img>
                            </div>
                            <div className="w-15 h-1 bg-white/53 rounded" />
                            <div
                                className="w-20 h-20 rounded-full bg-[#00FFD5] flex items-center 
                            justify-center text-white font-bold"
                            >
                                <p className="text-4xl text-white text-shadow-lg">3</p>
                            </div>
                        </div>

                        <div className="flex flex-col mt-22 absolute top-20">
                            <h1 className="text-white text-4xl text-center">
                                Before we <span className="text-[#F6CF84] font-bold">Begin, </span>let's
                            </h1>
                            <h1 className="text-white text-4xl text-center">
                                calibrate the <span className="text-[#F6CF84] font-bold">sphere</span>
                            </h1>
                        </div>

                        <LoadingBar></LoadingBar>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Instructions4;
