import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ImagenFondoCelular from "../../../assets/fondoteform.webp";
import { socket } from "../../../socket";
import { useSensors } from "../../../hooks/useSensors";

function GameOneMobile() {
    const navigate = useNavigate();
    const { sensorData, hasPermission, requestAccess } = useSensors();
    const sensorDataRef = useRef(sensorData);

    useEffect(() => {
        sensorDataRef.current = sensorData;
    }, [sensorData]);

    // Request sensor permission on component mount
    useEffect(() => {
        // For iOS devices we need explicit permission
        if (hasPermission === null) {
            requestAccess();
        }
    }, [hasPermission, requestAccess]);

    // Sync navigation based on server commands
    useEffect(() => {
        const handleSync = (path: string) => {
            if (path === "/calibratetwo") navigate("/gametwo");
        };
        socket.on("syncPage", handleSync);
        return () => {
            socket.off("syncPage", handleSync);
        };
    }, [navigate]);

    // Emit sensor data at interval when permission granted
    useEffect(() => {
        if (!hasPermission) return;
        const interval = setInterval(() => {
            console.log("Emitting sensor data:", sensorDataRef.current);
            socket.emit("sensor:data", sensorDataRef.current);
        }, 50);
        return () => clearInterval(interval);
    }, [hasPermission]);

    // If permission unknown, show a button to request
    if (hasPermission === null) {
        return (
            <div className="flex items-center justify-center w-screen h-screen bg-black text-white">
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded" onClick={requestAccess}>
                    Activar sensores
                </button>
            </div>
        );
    }
    // If permission denied, show message
    if (hasPermission === false) {
        return (
            <div className="flex items-center justify-center w-screen h-screen bg-black text-white">
                <p>Permiso del sensor denegado. Por favor habilite motion & orientation.</p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen overflow-hidden bg-center bg-size-[100%_100%] bg-no-repeat flex flex-col items-center" style={{ backgroundImage: `url(${ImagenFondoCelular})` }}>
            <div className="absolute z-10 flex flex-col items-center justify-center h-full w-full px-6 text-center">
                <h1 className="text-white text-3xl sm:text-4xl font-poppins font-medium">Playing</h1>
                <h1 className="text-white text-3xl sm:text-4xl font-poppins font-medium mt-2">
                    <span className="text-[#F6CF84] font-bold">Level One...</span>
                </h1>
            </div>
        </div>
    );
}

export default GameOneMobile;
