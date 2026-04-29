import { InfoCard } from "./components/InfoCard";
import { Qrcode } from "./components/QrCode";
import { HelpCircle, Target, Trophy } from "lucide-react";

import fondo from "../../assets/fondo.png";

export default function Onboarding() {
    return (
        <div className="flex items-center justify-center w-full h-screen relative bg-black/5 overflow-hidden">
            <img src={fondo} alt="Fondo Onboarding" className="w-full h-screen object-contain z-0 absolute" />

            <div className="z-10 gap-6 md:gap-10 flex w-full flex-col lg:flex-row items-center justify-between px-6 md:px-20 lg:px-42">
                <div className="w-full max-w-2xl lg:translate-x-9">
                    <header className="mb-6 md:mb-10 text-center lg:text-left">
                        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
                            <span className="relative inline-block font-poppins font-medium mt-2 md:mt-5">Welcome to</span>
                            <br />
                            <span className="inline-flex items-center">
                                <span className="bg-linear-to-b from-white to-cyan-300 bg-clip-text text-transparent font-poppins font-medium">K-Pulse</span>
                            </span>
                        </h1>
                        <p className="font-poppins font-light text-white/90 mt-5 md:mt-5 md:text-sm max-w-sm mx-auto lg:mx-0">Transform traditional arm rehabilitation into an immersive game experience that tracks movement and progress.</p>
                    </header>

                    <div className="flex flex-col gap-3 md:gap-4">
                        <InfoCard icon={<HelpCircle className="w-8 h-8 md:w-12 md:h-12 text-white" strokeWidth={1.9} />} title="What is K-pulse?" description="K-Pulse is the first 'Smart Rehab' ball designed for the modern Korean hospital." />
                        <InfoCard
                            icon={<Target className="w-8 h-8 md:w-12 md:h-12 text-white" strokeWidth={1.7} />}
                            title="What can you do?"
                            description="K-pulse guides patients through a full upper limb rehabilitation session, combining smart ball technology and immersive minigames."
                        />
                        <InfoCard
                            icon={<Trophy className="w-8 h-8 md:w-11 md:h-11 text-white" strokeWidth={1.7} />}
                            title="Choose your game!"
                            description="The smart ball controls the action on screen, guiding the user through a series of dynamic minigames powered by real movement."
                        />
                    </div>
                </div>

                <div className="relative shrink-0 lg:mt-40 flex justify-center w-full lg:w-auto lg:translate-x-8">
                    <Qrcode icon={<div className="w-full h-full flex items-center justify-center text-gray-400 text-sm rounded-lg border-2 border-dashed border-gray-400/50">[Aqui va el qr]</div>} description="Scan the QR to start your experience" />
                </div>
            </div>
        </div>
    );
}
