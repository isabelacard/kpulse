import { useNavigate } from "react-router-dom";
import fondoform from "../../assets/fondoteform.png";
import { socket } from "../../socket";

export default function MobileFormFinal() {
    const navigate = useNavigate();

    const handleTap = () => {
        socket.emit("changePage", "/instructions1");
        navigate("/instructions1mobile");
    };

    return (
        <div onClick={handleTap} className="relative flex flex-col items-center w-full min-h-screen overflow-hidden font-sans cursor-pointer">
            <img src={fondoform} className="max-w-full max-h-full object-contain z-0 absolute" alt="" />

            <div className="z-1">
                {/* Barrita */}
                <div className="w-60 h-2 bg-gray-200 rounded-full mt-30 overflow-hidden mx-auto">
                    <div className="w-60 h-full bg-yellow-300 rounded-full" />
                </div>

                {/* Preguntapp */}
                <h1 className="text-white text-[35px] font-medium text-center px-15 mt-50 leading-tight">
                    You successfully completed your <span className="text-yellow-300">diagnostic form!</span>
                </h1>
                <h2 className="text-white text-[25px] font-medium text-center px-5 mt-15 leading-tight">
                    Let’s start <br /> instructions
                </h2>
                <div className="w-40 h-1.5 bg-yellow-200 rounded-full mt-1 mx-auto" />
            </div>
        </div>
    );
}
