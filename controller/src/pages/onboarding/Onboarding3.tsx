import { useNavigate } from "react-router-dom";
import fondomobile from "../../assets/fondomobile1.webp";
import { socket } from "../../socket";

export default function Onboarding3() {
    const navigate = useNavigate();

    const handleTap = () => {
        socket.emit("changePage", "/onboarding4");
        navigate("/onboarding4");
    };

    return (
        <div onClick={handleTap} className="relative w-full h-screen flex flex-col items-center bg-center bg-size-[100%_100%] bg-no-repeat overflow-hidden cursor-pointer" style={{ backgroundImage: `url(${fondomobile})` }}>
            <div className="flex flex-col items-center justify-center w-full h-full max-w-sm pt-[20%] pb-[15%] px-6">
                <div className="text-center my-auto flex flex-col items-center">
                    <h1 className="text-white text-3xl font-poppins font-medium tracking-wide">connecting with</h1>
                    <h2 className="bg-linear-to-b from-white to-yellow-500 bg-clip-text text-transparent text-4xl font-poppins font-medium mt-2">the screen...</h2>
                </div>
            </div>
        </div>
    );
}
