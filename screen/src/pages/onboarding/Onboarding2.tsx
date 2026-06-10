import { ProgressBar } from "./components/ProgressBar";
import fondocarga from "../../assets/fondocarga.webp";

export default function Onboarding2() {
    return (
        <div className="flex items-center justify-center w-full h-screen relative bg-white overflow-hidden">
            <img fetchPriority="high" loading="eager" src={fondocarga} alt="Fondo Carga" className="w-full h-screen scale-104 object-contain z-0 absolute" />

            <div className="z-10 flex w-full flex-col px-6 md:px-20 lg:px-35">
                <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl md:translate-x-8 lg:translate-x-16">
                    <header className="text-center md:text-left lg:text-left">
                        <h1 className="text-white text-5xl md:text-6xl lg:text-6xl font-bold leading-[1.05] tracking-tight font-poppins mb-10 mr-10">
                            <span className="block mb-2 md:mb-3 font-poppins font-medium">Are you</span>
                            <span className="bg-linear-to-b from-white to-orange-400 bg-clip-text text-transparent font-poppins font-medium">in now?</span>
                        </h1>
                    </header>

                    <div className="flex justify-center md:justify-start mt-4">
                        <ProgressBar progress={0} />
                    </div>
                </div>
            </div>
        </div>
    );
}
