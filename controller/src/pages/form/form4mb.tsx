import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Square, Circle, Triangle, Star } from "lucide-react";
import fondoform from "../../assets/fondoteform.webp";
import { socket } from "../../socket";
import { useSession } from "../../context/Sessioncontext";

const options = [
    { color: "bg-[#F88888]", icon: Square, label: "Never" },
    { color: "bg-[#A6CFFF]", icon: Circle, label: "Occasionally" },
    { color: "bg-[#E8D676]", icon: Triangle, label: "Once or twice" },
    { color: "bg-[#F7A3FF]", icon: Star, label: "Regularly" },
];

export default function MobileForm4() {
    const sessionCtx = useSession();
    const [selected, setSelected] = useState<string | null>(null);
    const navigate = useNavigate();

    return (
        <div className="relative flex flex-col items-center w-full min-h-screen overflow-hidden font-sans cursor-pointer">
            <img src={fondoform} className="max-w-full max-h-full object-contain z-0 absolute" alt="" />

            <div className="z-1">
                {/* Barrita */}
                <div className="w-60 h-2 bg-gray-200 rounded-full mt-30 overflow-hidden mx-auto">
                    <div className="w-40 h-full bg-yellow-300 rounded-full" />
                </div>

                {/* Preguntapp */}
                <h1 className="text-white text-[35px] font-medium text-center px-15 mt-15 leading-tight">Have you used any digital or game-based therapy before?</h1>

                {/* Contenedor */}
                <div className="grid grid-cols-2 gap-4 mt-12 px-10 w-full max-w-sm">
                    {options.map(({ color, icon: Icon, label }) => (
                        <button
                            key={color}
                            onClick={() => {
                                sessionCtx?.addSurveyAnswer("Have you used any digital or game-based therapy before?", label);
                                socket.emit("changePage", "/forms5");
                                navigate("/forms5");
                                setSelected(color);
                            }}
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
