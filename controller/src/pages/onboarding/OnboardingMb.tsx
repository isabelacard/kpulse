import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fondomobile from "../../assets/fondomobile1.png";
import Qr from "./components/Qr";

export default function OnboardingMb() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/onboarding2");
        }, 10000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="relative w-full h-screen flex flex-col items-center bg-center bg-cover bg-no-repeat overflow-hidden" style={{ backgroundImage: `url(${fondomobile})` }}>
            <div className="flex flex-col items-center justify-between w-full h-full max-w-97.5 pt-[20%] pb-[15%] px-6">
                <div className="flex flex-col items-center text-center mt-12">
                    <h1 className="text-white text-3xl font-poppins font-medium tracking-wide">Welcome to</h1>
                    <h2 className="text-white text-4xl font-poppins font-medium mt-2">K-Pulse</h2>
                    <div className="w-48 h-1 bg-white mt-6 rounded-full"></div>
                </div>

                <div className="w-full flex justify-center my-auto">
                    <Qr />
                </div>

                <div className="flex flex-col items-center text-center mb-8">
                    <p className="text-white text-2xl font-poppins font-medium">
                        Scan the <span className="bg-linear-to-b from-white to-yellow-500 bg-clip-text text-transparent font-poppins font-bold">QR</span> to
                    </p>
                    <p className="bg-linear-to-b from-white to-yellow-500 bg-clip-text text-transparent text-2xl font-poppins font-bold mt-1">start</p>
                </div>
            </div>
        </div>
    );
}
