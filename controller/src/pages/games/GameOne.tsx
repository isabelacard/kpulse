import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ImagenFondoCelular from "../../assets/fondocelularinstructions.webp";
import { socket } from "../../socket";
import { useSensors } from "../../hooks/useSensors";

function GameOneMobile() {
    const navigate = useNavigate();
    const { sensorData, hasPermission } = useSensors();
    const sensorDataRef = useRef(sensorData);

    useEffect(() => {
        sensorDataRef.current = sensorData;
    }, [sensorData]);

    useEffect(() => {
        const handleSync = (path: string) => {
            if (path === "/calibratetwo") navigate("/gametwo");
        };
        socket.on("syncPage", handleSync);
        return () => {
            socket.off("syncPage", handleSync);
        };
    }, [navigate]);

    useEffect(() => {
        if (!hasPermission) return;
        const interval = setInterval(() => {
            socket.emit("sensor:data", sensorDataRef.current);
        }, 50);
        return () => clearInterval(interval);
    }, [hasPermission]);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#0A3D44]">
            <img className="absolute inset-0 w-full h-full object-cover" src={ImagenFondoCelular} alt="Background" />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-white text-4xl font-poppins font-medium">Playing</h1>
                <h1 className="text-white text-4xl font-poppins font-medium mt-1">
                    <span className="text-[#F6CF84] font-bold">Level One...</span>
                </h1>
            </div>
        </div>
    );
}

export default GameOneMobile;
