import { useNavigate } from "react-router-dom";
import ImagenFondoCelular from "../../assets/fondoteform.webp";
import { socket } from "../../socket";

function Instructions1() {
    const navigate = useNavigate();

    const handleTap = () => {
        socket.emit("changePage", "/instructions2");
        navigate("/instructions2mobile");
    };

    return (
        <div onClick={handleTap} className="relative w-full h-screen overflow-hidden cursor-pointer bg-center bg-size-[100%_100%] bg-no-repeat flex flex-col items-center" style={{ backgroundImage: `url(${ImagenFondoCelular})` }}>
            <div className="absolute z-10 flex flex-col items-center top-[42%] w-full px-6 text-center">
                <h1 className="text-white text-3xl sm:text-4xl">Look at the</h1>
                <h1 className="text-white text-3xl sm:text-4xl mt-1">
                    <span className="text-[#F6CF84] font-bold">Instructions </span> in
                </h1>
                <h1 className="text-white text-3xl sm:text-4xl mt-1">
                    the <span className="text-[#F6CF84] font-bold">screen</span>
                </h1>
            </div>
        </div>
    );
}

export default Instructions1;
