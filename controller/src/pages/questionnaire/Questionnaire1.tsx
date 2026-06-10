import { useSession } from "../../context/Sessioncontext";
import { socket } from "../../socket";
import { useNavigate } from "react-router-dom";
import { Square, Circle, Triangle, Star } from "lucide-react";
import fondoform from "../../assets/fondoteform.webp";

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
        <div className="relative flex flex-col items-center w-full h-screen overflow-hidden font-sans cursor-pointer bg-center bg-size-[100%_100%] bg-no-repeat" style={{ backgroundImage: `url(${fondoform})` }}>
            <div className="z-10 flex flex-col items-center justify-between w-full h-full max-w-sm px-6 pb-6">
                <div className="w-full mt-[15vh]">
                    <div className="w-48 h-2 bg-gray-200/30 rounded-full overflow-hidden mx-auto">
                        <div className="w-8 h-full bg-yellow-300 rounded-full" />
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center w-full my-auto">
                    <h1 className="text-white text-[30px] font-medium text-center px-4 leading-tight">What age range do you belong to?</h1>

                    <div className="grid grid-cols-2 gap-4 mt-8 w-full px-2">
                        {options.map(({ color, icon: Icon, label }) => (
                            <button key={color} onClick={() => handleSelect(label)} className={`${color} aspect-square rounded-[24px] flex flex-col items-center justify-center p-4 transition-all duration-200 active:scale-90 shadow-lg`}>
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
