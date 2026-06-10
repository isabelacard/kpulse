import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Square, Circle, Triangle, Star } from "lucide-react";
import fondoform from "../../assets/fondoteform.webp";
import { socket } from "../../socket";
import { useSession } from "../../context/Sessioncontext";

const options = [
    { color: "bg-[#F88888]", icon: Square, label: "Lifting your arm overhead" },
    { color: "bg-[#A6CFFF]", icon: Circle, label: "Extending or bending your elbow" },
    { color: "bg-[#E8D676]", icon: Triangle, label: "Rotating your wrist or forearm" },
    { color: "bg-[#F7A3FF]", icon: Star, label: "Gripping or squeezing objects" },
];

export default function MobileForm5() {
    const sessionCtx = useSession();
    const [selected, setSelected] = useState<string | null>(null);
    const navigate = useNavigate();

    return (
        <div className="relative flex flex-col items-center w-full h-screen overflow-hidden font-sans cursor-pointer bg-center bg-size-[100%_100%] bg-no-repeat" style={{ backgroundImage: `url(${fondoform})` }}>
            <div className="z-10 flex flex-col items-center justify-between w-full h-full max-w-sm px-6 pb-6">
                <div className="w-full mt-[15vh]">
                    <div className="w-48 h-2 bg-gray-200/30 rounded-full overflow-hidden mx-auto">
                        <div className="w-40 h-full bg-yellow-300 rounded-full" />
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center w-full my-auto">
                    <h1 className="text-white text-[28px] font-medium text-center px-4 leading-tight">Which upper limb movement is most difficult for you?</h1>

                    <div className="grid grid-cols-2 gap-4 mt-8 w-full px-2">
                        {options.map(({ color, icon: Icon, label }) => (
                            <button
                                key={color}
                                onClick={() => {
                                    sessionCtx?.addSurveyAnswer("Which upper limb movement is most difficult for you?", label);
                                    socket.emit("changePage", "/formsfinal");
                                    navigate("/formsfinal");
                                    setSelected(color);
                                }}
                                className={`
                                    ${color} aspect-square rounded-[24px] flex flex-col items-center justify-center p-4
                                    transition-all duration-200 active:scale-90 shadow-lg
                                    ${selected === color ? "ring-8 ring-white/50 scale-95" : "hover:brightness-105"}
                                `}
                            >
                                <div className="flex-1 flex items-center justify-center">
                                    <Icon className="w-14 h-14 text-white fill-white" strokeWidth={1.5} />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
