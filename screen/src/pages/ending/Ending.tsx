import graciasfondo from "../../assets/graciasfondo.webp";
import { useResponsiveScale } from "../../hooks/useResponsiveScale";

export default function Ending() {
    const scale = useResponsiveScale();

    return (
        <div className="flex items-center justify-center w-full h-screen overflow-hidden bg-black/5">
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
                    <img fetchPriority="high" loading="eager" src={graciasfondo} alt="Fondo final" className="w-full h-full scale-102 object-cover absolute top-0 left-0" />

                    <div className="absolute inset-0 z-10 flex items-center px-20">
                        <div className="max-w-2xl">
                            <header className="text-left">
                                <h1 className="text-white text-[80px] font-bold leading-[1.05] tracking-tight">
                                    <span className="font-poppins font-medium">Thanks for</span>
                                    <br />
                                    <span className="bg-linear-to-b from-white to-cyan-300 bg-clip-text text-transparent font-poppins font-medium pb-4">Playing!</span>
                                </h1>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
