import { useEffect, useCallback } from "react";
import ImagenFondoCelular from "../../assets/fondoteform.webp";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";

function Instructions3() {
    const navigate = useNavigate();

    const handleContinue = useCallback(() => {
        socket.emit("changePage", "/instructions4");
        navigate("/instructions4mobile");
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
                <h1 className="text-white text-3xl sm:text-4xl">Stand Up</h1>
                <h1 className="text-white text-3xl sm:text-4xl mt-1">
                    <span className="text-[#F6CF84] font-bold">Straight</span>
                </h1>
            </div>
        </div>
    );
}

export default Instructions3;
