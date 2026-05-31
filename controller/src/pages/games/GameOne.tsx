import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImagenFondoCelular from "../../assets/fondocelularinstructions.png";
import { socket } from "../../socket";
import { useSensors } from "../../hooks/useSensors";

function GameOneMobile() {
    const navigate = useNavigate();
    
    // Bring the sensors hook
    const { sensorData, hasPermission } = useSensors();

    // Listen for server sync to switch to the next page
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

    useEffect(() => {
        // If for some reason there's no permission, don't send anything
        if (!hasPermission) return;
        
        const interval = setInterval(() => {
            socket.emit("sensor:data", sensorData);
        }, 50);
        
        return () => clearInterval(interval);
    }, [hasPermission, sensorData]);

    return (
        <div className="flex items-center justify-center w-full h-screen p-4 overflow-hidden bg-[#0A3D44]">
            <div className="relative flex items-center justify-center">
                <img className="max-w-full max-h-full object-contain" src={ImagenFondoCelular} alt="Background" />
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