import { useNavigate } from "react-router-dom";
import ImagenFondoCelular from "../../assets/fondocelularinstructions.webp";
import { socket } from "../../socket";

function Instructions1Controller() {
    const navigate = useNavigate();

    const handleTap = () => {
        socket.emit("changePage", "/instructions2");
        navigate("/instructions2mobile");
    };

    return (
        <div onClick={handleTap} className="flex items-center justify-center w-full h-screen p-4 overflow-hidden cursor-pointer">
            <div className="relative flex items-center justify-center">
                <img className="max-w-full max-h-full object-contain" src={ImagenFondoCelular} />
                <div className="absolute z-10 flex flex-col items-center h-full top-80">
                    <div className="flex flex-col">
                        <h1 className="text-white text-4xl text-center">Look at the</h1>
                        <h1 className="text-white text-4xl text-center">
                            <span className="text-[#F6CF84] font-bold">Instructions </span> in
                        </h1>
                        <h1 className="text-white text-4xl text-center">
                            the <span className="text-[#F6CF84] font-bold">screen</span>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Instructions1Controller;
