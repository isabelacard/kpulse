import { useNavigate } from "react-router-dom";
import ImagenFondoCelular from "../../assets/fondocelularinstructions.png";
import { useEffect } from "react";
import { socket } from "../../socket.ts";

function GameOneMobile() {
    const navigate = useNavigate();
    useEffect(() => {
        const handleSync = (path: string) => {
            if (path === "/calibratetwo") {
                navigate("/gametwo");
            }
        };
        socket.on("syncPage", handleSync);
        return () => {
            socket.off("syncPage", handleSync);
        };
    }, [navigate]);

    return (
        <div className="flex items-center justify-center w-full h-screen p-4 overflow-hidden">
            <div className="relative flex items-center justify-center">
                <img className="max-w-full max-h-full object-contain" src={ImagenFondoCelular} />
                <div className="absolute z-10 flex flex-col items-center h-full top-80">
                    <div className="flex flex-col my-7">
                        <h1 className="text-white text-4xl text-center">Playing</h1>
                        <h1 className="text-white text-4xl text-center">
                            <span className="text-[#F6CF84] font-bold">Level One...</span>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameOneMobile;
