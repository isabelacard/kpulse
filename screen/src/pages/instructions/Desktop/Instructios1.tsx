import { useResponsiveScale } from "../../../hooks/useResponsiveScale";
import ImagenFondo from "../../../assets/Instrucciones1.webp";
import Pelota1 from "../../../assets/pelota1.webp";
import Celular1 from "../../../assets/celular1.webp";

function Instructions1() {
    const scale = useResponsiveScale();

    return (
        <div className="flex items-center justify-center w-full h-screen overflow-hidden bg-white">
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
                    className="shrink-0 overflow-hidden"
                >
                    <img className="absolute w-full h-full object-cover top-0 left-0 z-0" src={ImagenFondo} alt="Background" />
                    <img className="absolute z-10 w-200 right-150 top-20" src={Pelota1} alt="Pelota" />
                    <img className="absolute z-10 w-120 left-195 top-40" src={Celular1} alt="Celular" />

                    <div className="absolute inset-0 z-10 flex flex-col items-center pt-28">
                        {/* Stepper */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-20 h-20 rounded-full bg-[#A9A9A9] flex items-center justify-center">
                                <p className="text-4xl text-white/70">1</p>
                            </div>
                            <div className="w-15 h-1 bg-white/53 rounded" />
                            <div className="w-20 h-20 rounded-full bg-[#A9A9A9] flex items-center justify-center">
                                <p className="text-4xl text-white/70">2</p>
                            </div>
                            <div className="w-15 h-1 bg-white/53 rounded" />
                            <div className="w-20 h-20 rounded-full bg-[#A9A9A9] flex items-center justify-center">
                                <p className="text-4xl text-white/70">3</p>
                            </div>
                        </div>

                        {/* Texto */}
                        <div className="flex flex-col mt-28">
                            <h1 className="text-white text-center" style={{ fontSize: 36 }}>
                                Follow the <span className="text-[#F6CF84] font-bold">Instructions</span>, to
                            </h1>
                            <h1 className="text-white text-center" style={{ fontSize: 36 }}>
                                use the <span className="text-[#F6CF84] font-bold">sphere</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Instructions1;
