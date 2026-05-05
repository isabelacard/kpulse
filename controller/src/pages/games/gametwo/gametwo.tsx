import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fondogametwo from "../../../assets/fondotegametwo.png";
import { socket } from "../../../socket";

export default function GameTwo() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleSync = (path: string) => {
            if (path === "/allset") {
                navigate("/allset");
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
                <img className="max-w-full max-h-full object-contain" src={fondogametwo} />
                <div className="absolute z-10 flex flex-col items-center h-full top-80">
                    <div className="flex flex-col my-7">
                        <h1 className="text-white text-4xl text-center">Playing</h1>
                        <h1 className="text-white text-4xl text-center">
                            <span className="text-[#F6CF84] font-bold">Level Two...</span>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
