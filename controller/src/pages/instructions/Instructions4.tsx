import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ImagenFondoCelular from "../../assets/fondoteform.webp";
import { socket } from "../../socket";

function Instructions4() {
    const navigate = useNavigate();

    const handleContinue = useCallback(() => {
        socket.emit("changePage", "/calibration1");
        navigate("/calibratingmobile");
    }, [navigate]);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleContinue();
        }, 10000);

        return () => clearTimeout(timer);
    }, [handleContinue]);

    return (
        <div onClick={handleContinue} className="relative w-full h-screen overflow-hidden bg-center bg-size-[100%_100%] bg-no-repeat flex flex-col items-center cursor-pointer" style={{ backgroundImage: `url(${ImagenFondoCelular})` }}>
            <div className="absolute z-10 flex flex-col items-center top-[40%] w-full px-6 text-center">
                <h1 className="text-white text-3xl sm:text-4xl font-bold">Calibration prep</h1>
                <h2 className="text-[#F6CF84] text-2xl font-bold mt-4 leading-snug">
                    Get ready to <br /> calibrate the sphere
                </h2>
            </div>
        </div>
    );
}

export default Instructions4;
