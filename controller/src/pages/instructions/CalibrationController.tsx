import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ImagenFondoCelular from "../../assets/fondocelularinstructions.webp";
import { socket } from "../../socket";
import { useSensors } from "../../hooks/useSensors";

function CalibratingController() {
    const navigate = useNavigate();
    const { sensorData, hasPermission, requestAccess } = useSensors();

    // Listen for server sync to switch to the game
    useEffect(() => {
        const handleSync = (path: string) => {
            if (path === "/pregameone") {
                navigate("/gameonemobile");
            }
        };
        socket.on("syncPage", handleSync);
        return () => {
            socket.off("syncPage", handleSync);
        };
    }, [navigate]);

    const sensorDataRef = useRef(sensorData);

    // Update ref when sensorData changes
    useEffect(() => {
        sensorDataRef.current = sensorData;
    }, [sensorData]);

    // Send sensor data every 50ms
    useEffect(() => {
        if (!hasPermission) return;

        const interval = setInterval(() => {
            socket.emit("sensor:data", sensorDataRef.current);
        }, 50);

        return () => clearInterval(interval);
    }, [hasPermission]);

    // Clear permission screen (Shown at startup)
    if (!hasPermission) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A3D44] text-white p-6">
                <h1 className="text-3xl font-bold mb-6 text-[#00B4A9]">K-Pulse</h1>
                <p className="text-center mb-8 text-lg">To get started, we need to connect your device.</p>
                <button onClick={requestAccess} className="bg-[#FF8A00] hover:bg-[#E67A00] text-white px-8 py-4 rounded-full text-xl font-bold">
                    Allow Sensor Access
                </button>
            </div>
        );
    }

    // Calibration screen (Shown only after granting permission)
    return (
        <div className="flex items-center justify-center w-full h-screen p-6 overflow-hidden bg-[#0A3D44]">
            <div className="relative flex items-center justify-center">
                <img className="max-w-full max-h-full object-contain" src={ImagenFondoCelular} alt="Background" />
                <div className="absolute z-10 flex flex-col items-center h-full top-80">
                    <div className="flex flex-col mt-10">
                        <h1 className="text-white text-4xl text-center">Calibrating...</h1>
                        <p className="text-white text-xl text-center mt-4">
                            X: {sensorData.orientation.x.toFixed(2)}
                            <br />
                            Y: {sensorData.orientation.y.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CalibratingController;
