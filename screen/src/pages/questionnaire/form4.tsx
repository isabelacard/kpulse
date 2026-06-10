import fondoform from "../../assets/fondote.webp";
import { useState } from "react";
import { Square, Circle, Triangle, Star } from "lucide-react";

const options = [
    { label: "Never", color: "bg-[#F88888]", icon: Square },
    { label: "Occasionally", color: "bg-[#A6CFFF]", icon: Circle },
    { label: "Once or twice", color: "bg-[#E8D676]", icon: Triangle },
    { label: "Regularly", color: "bg-[#F7A3FF]", icon: Star },
];

export default function Forms4() {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <img fetchPriority="high" loading="eager" src={fondoform} alt="Group 11" className="w-full h-screen scale-98 object-contain z-0 absolute" />

            <div className="z-1 gap-6 md:gap-10 flex w-full flex-col items-center px-6 md:px-20 lg:px-42">
                {/* Barra de progreso */}
                <div className="absolute top-16 md:top-25 left-1/2 -translate-x-1/2 w-1/2 md:w-1/3 h-2 md:h-2.5 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full w-80 bg-yellow-200 rounded-full" />
                </div>

                {/* Pregunta */}
                <h1 className="text-white text-2xl md:text-4xl mt-16 md:mt-20 w-full md:w-200 font-medium text-center mb-2 md:mb-3 max-w-lg leading-tight">Have you used any digital or game-based therapy before?</h1>

                {/* Botones */}
                <div className="grid w-full max-w-sm md:max-w-screen-2xl grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 z-1">
                    {options.map(({ label, color, icon: Icon }) => (
                        <button
                            key={label}
                            onClick={() => setSelected(label)}
                            className={`${color} w-full min-h-16 md:min-h-24 flex items-center justify-start gap-4 px-6 md:px-9 py-5 md:py-8 rounded-2xl text-left text-white font-bold text-lg md:text-xl transition-all active:scale-95
                            ${selected === label ? "ring-4 ring-white scale-95" : "hover:brightness-110"}`}
                        >
                            <Icon className="w-6 h-6 md:w-8 md:h-8 shrink-0 text-white" strokeWidth={2.5} fill="white" />
                            <span className="flex-1 text-left">{label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
