import { InfoCard } from "./components/InfoCard";
import { Qrcode } from "./components/QrCode";
import { HelpCircle, Target, Trophy } from "lucide-react";

import imagendefondo from "../../assets/imagendefondo.png";
import circuloamarillo from "../../assets/circuloamarillo.png";
import grupodecorativo2 from "../../assets/grupodecorativo2.png";
import grupodecorativo1 from "../../assets/grupodecorativo1.png";
import granny from "../../assets/granny.png";

export default function Onboarding() {
    return (
        <div className="h-screen w-full flex items-center justify-center p-5 bg-white">
            <section
                className="relative w-full h-full rounded-[55px] overflow-hidden flex flex-col justify-center p-8 md:p-16"
                style={{
                    backgroundImage: `url(${imagendefondo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >

                <img 
                    src={circuloamarillo} 
                    alt="Decoración" 
                    className="absolute bottom-0 right-0 w-[88.5%] opacity-90 object-contain z-0" 
                />
                <img
                    src={granny}
                    alt="abuelita"
                    className="absolute bottom-0 right-70 h-[92%] z-0"
                />

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-91.5px h-[42px]">
                    <svg 
                        viewBox="0 0 366 59" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="w-full h-full"
                    >
                        <path 
                            d="M0 0 C 45 0, 65 59, 110 59 L 256 59 C 301 59, 321 0, 366 0 Z" 
                            fill="white"
                        />
                    </svg>
                </div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 w-full max-w-7xl ml-7 pr-10">
                    
                    <div className="max-w-2xl relative z-10">
                        <header className="mb-10">
                            <h1 className="text-white text-[90px] font-bold leading-[1.05] tracking-tight">
                                <span className="relative inline-block font-poppins font-medium mt-5">
                                    <img 
                                        src={grupodecorativo1} 
                                        alt="icono de bienvenida" 
                                        className="absolute top-1/2 -translate-y-1/2 -left-22 w-20 object-contain" 
                                    />
                                    Welcome to
                                </span>
                                <br />

                                <span className="inline-flex items-center">
                                    <span className="bg-linear-to-b from-white to-cyan-300 bg-clip-text text-transparent font-poppins font-medium">K-Pulse</span>
                                    <img 
                                        src={grupodecorativo2} 
                                        alt="icono2" 
                                        className="ml-4 w-12 object-contain" 
                                    />
                                </span>
                            </h1>
                            <p className="font-poppins font-light text-white/90 mt-5 text-[15px] max-w-md">
                                Transform traditional arm rehabilitation into an immersive game experience that tracks movement and progress.
                            </p>
                        </header>

                        <div className="flex flex-col gap-1">
                            <InfoCard 
                                icon={<HelpCircle className="w-12 h-12 text-white" strokeWidth={1.9} />}  
                                title="What is K-pulse?" 
                                description="K-Pulse is the first 'Smart Rehab' ball designed for the modern Korean hospital." 
                            />
                            <InfoCard 
                                icon={<Target className="w-12 h-12 text-white" strokeWidth={1.7}/>}
                                title="What can you do?" 
                                description="K-pulse guides patients through a full upper limb rehabilitation session, combining smart ball technology and immersive minigames." 
                            />
                            <InfoCard 
                                icon={<Trophy className="w-11 h-11 text-white" strokeWidth={1.7}/>}
                                title="Choose your game!" 
                                description="The smart ball controls the action on screen, guiding the user through a series of dynamic minigames powered by real movement." 
                            />
                        </div>
                    </div>

                    <div className="relative z-50 shrink-0 mt-35 translate-x-20">
                        <Qrcode 
                            icon={
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm rounded-lg">
                                    [Aqui va el qr]
                                </div>
                            } 
                            description="Scan the QR to start your experience"
                        />
                    </div>

                </div>
            </section>
        </div>
    );
}