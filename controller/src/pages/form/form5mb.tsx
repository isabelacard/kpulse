import { useState } from "react";
import { Square, Circle, Triangle, Star } from "lucide-react";
import fondoform from "../../assets/fondoteform.png";

const options = [
    { color: "bg-[#F88888]", icon: Square },
    { color: "bg-[#A6CFFF]", icon: Circle },
    { color: "bg-[#E8D676]", icon: Triangle },
    { color: "bg-[#F7A3FF]", icon: Star },
];

export default function MobileForm5() {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <div className="relative flex flex-col items-center w-full min-h-screen bg- overflow-hidden font-sans">
            <img src={fondoform} className="max-w-full max-h-full object-contain z-0 absolute" alt="" />

            <div className="z-1">
                {/* Barrita */}
                <div className="w-60 h-2 bg-gray-200 rounded-full mt-30 overflow-hidden mx-auto">
                    <div className="w-50 h-full bg-yellow-300 rounded-full" />
                </div>

                {/* Preguntapp */}
                <h1 className="text-white text-[35px] font-medium text-center px-13 mt-15 leading-tight">Which upper limb movement is most difficult for you?</h1>

                {/* Contenedor */}
                <div className="grid grid-cols-2 gap-4 mt-12 px-10 w-full max-w-sm">
                    {options.map(({ color, icon: Icon }) => (
                        <button
                            key={color}
                            onClick={() => setSelected(color)}
                            className={`
                ${color} aspect-square rounded-[30px] flex flex-col items-center justify-center p-4
                transition-all duration-200 active:scale-90
                ${selected === color ? "ring-8 ring-white/50 scale-95" : "hover:brightness-105"}
            `}
                        >
                            {/* Iconos */}
                            <div className="flex-1 flex items-center justify-center">
                                <Icon className="w-18 h-18 text-white fill-white" strokeWidth={1.5} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
