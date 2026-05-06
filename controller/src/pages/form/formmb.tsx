import { useSession } from "../../context/Sessioncontext";
import { socket } from "../../socket";
import { useNavigate } from "react-router-dom";
import { Square, Circle, Triangle, Star } from "lucide-react";
import fondoform from "../../assets/fondoteform.png";

const options = [
    { label: "18-30", color: "bg-[#F88888]", icon: Square },
    { label: "31-45", color: "bg-[#A6CFFF]", icon: Circle },
    { label: "46-60", color: "bg-[#E8D676]", icon: Triangle },
    { label: "60+", color: "bg-[#F7A3FF]", icon: Star },
];

export default function MobileForm() {
    const sessionCtx = useSession();
    const navigate = useNavigate();

    const handleSelect = (label: string) => {
        sessionCtx?.addSurveyAnswer("What age range do you belong to?", label);
        socket.emit("changePage", "/forms2");
        navigate("/forms2");
    };

    return (
        <div className="relative flex flex-col items-center w-full min-h-screen overflow-hidden font-sans cursor-pointer">
            <img src={fondoform} className="max-w-full max-h-full object-contain z-0 absolute" alt="" />

            <div className="z-1">
                <div className="w-60 h-2 bg-gray-200 rounded-full mt-30 overflow-hidden mx-auto">
                    <div className="w-10 h-full bg-yellow-300 rounded-full" />
                </div>

                <h1 className="text-white text-[35px] font-medium text-center px-15 mt-15 leading-tight">What age range do you belong to?</h1>

                <div className="grid grid-cols-2 gap-4 mt-12 px-10 w-full max-w-sm">
                    {options.map(({ color, icon: Icon, label }) => (
                        <button key={color} onClick={() => handleSelect(label)} className={`${color} aspect-square rounded-[30px] flex flex-col items-center justify-center p-4 transition-all duration-200 active:scale-90`}>
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
