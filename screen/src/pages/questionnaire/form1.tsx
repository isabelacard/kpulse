import fondoform from "../../assets/fondote.png";
import { useState } from "react";
import { Square, Circle, Triangle, Star } from "lucide-react";

const options = [
    { label: "Under 18", color: "bg-[#F88888]", icon: Square },
    { label: "36 – 60", color: "bg-[#A6CFFF]", icon: Circle },
    { label: "18 – 35", color: "bg-[#E8D676]", icon: Triangle },
    { label: "60 or older", color: "bg-[#F7A3FF]", icon: Star },
];

export default function Forms() {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <img src={fondoform} alt="Group 11" className="w-270 z-0 absolute" />

            <div className="z-1 gap-10 flex flex-col items-center">
                {/* Progress bar */}
                <div className="absolute top-25 left-1/2 -translate-x-1/2 w-1/3 h-2.5 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full w-1/4 bg-yellow-300 rounded-full" />
                </div>

                {/* Question */}
                <h1 className="text-white text-4xl mt-20 w-100 font-medium text-center mb-3 max-w-lg leading-tight">What age range do you belong to?</h1>

                {/* Options */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-5xl z-1">
                    {options.map((op) => {
                        const Icon = op.icon;

                        return (
                            <button
                                key={op.label}
                                onClick={() => setSelected(op.label)}
                                className={`${op.color} w-full flex items-center gap-4 px-40 py-7 rounded-2xl text-white font-bold text-xl transition-all active:scale-95
                            ${selected === op.label ? "ring-4 ring-white scale-95" : "hover:brightness-110"}`}
                            >
                                <Icon className="w-8 h-8 text-white" strokeWidth={2.5} fill="white" />
                                {op.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
