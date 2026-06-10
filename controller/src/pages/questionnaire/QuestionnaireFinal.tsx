import { useNavigate } from "react-router-dom";
import fondoform from "../../assets/fondoteform.webp";
import { socket } from "../../socket";

export default function MobileFormFinal() {
    const navigate = useNavigate();

    const handleTap = () => {
        socket.emit("changePage", "/instructions1");
        navigate("/instructions1mobile");
    };

    return (
        <div onClick={handleTap} className="relative flex flex-col items-center w-full h-screen overflow-hidden font-sans cursor-pointer bg-center bg-size-[100%_100%] bg-no-repeat" style={{ backgroundImage: `url(${fondoform})` }}>
            <div className="z-10 flex flex-col items-center justify-between w-full h-full max-w-sm px-6 pb-6">
                <div className="w-full mt-[15vh]">
                    <div className="w-48 h-2 bg-gray-200/30 rounded-full overflow-hidden mx-auto">
                        <div className="w-48 h-full bg-yellow-300 rounded-full" />
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center w-full my-auto text-center gap-6 px-4">
                    <h1 className="text-white text-3xl font-medium leading-tight">
                        You successfully completed your <span className="text-yellow-300">diagnostic form!</span>
                    </h1>
                    <h2 className="text-white text-2xl font-medium leading-tight mt-4">
                        Let’s start <br /> instructions
                    </h2>
                    <div className="w-32 h-1.5 bg-yellow-200 rounded-full mt-4 mx-auto" />
                </div>
            </div>
        </div>
    );
}
