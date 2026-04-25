import { InfoCard } from "./components/InfoCard";
import imagendefondo from "../../assets/imagendefondo.png";
import circuloamarillo from "../../assets/circuloamarillo.png";
import grupodecorativo2 from "../../assets/grupodecorativo2.png"
import grupodecorativo1 from "../../assets/grupodecorativo1.png"

export default function Onboarding() {
    return (
        <div className="h-screen w-full flex items-center justify-center p-5 bg-green-400">
            <section
                className="relative w-full h-full rounded-[55px] overflow-hidden flex flex-col justify-center p-8 md:p-16"
                style={{
                    backgroundImage: `url(${imagendefondo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Círculo Amarillo Decorativo */}
                <img src={circuloamarillo} alt="Decoración" className="absolute bottom-0 right-0 w-[88.5%] opacity-90 object-contain" />

                <div className="relative z-10 max-w-2xl">
                    <header className="mb-10">
                        <div className="text-[#f38d16] text-4xl mb-4 font-bold">★</div>
                        <h1 className="text-white text-[90px] font-bold leading-[1.05] tracking-tight">
                            <span className="flex items-center">
                                <img src={grupodecorativo1} alt="icono de bienvenida" className="ml-4 w-12 object-contain" />
                                Welcome
                                {/* Ajusta ml-4 y w-12 según necesites para el tamaño y separación */}
                            </span>
                            <br />
                            {/* texto e imagen */}
                            <span className="inline-flex items-center">
                                <span className="bg-linear-to-b from-white to-cyan-400 bg-clip-text text-transparent">K-Pulse</span>
                                <img src={grupodecorativo2} alt="icono2" className="ml-4 w-12 object-contain" />
                            </span>
                        </h1>
                        <p className="text-white/90 mt-5 text-[17px] max-w-md leading-relaxed font-medium">Transform traditional arm rehabilitation into an immersive game experience that tracks movement and progress.</p>
                    </header>

                    {/* Listado de Tarjetas */}
                    <div className="flex flex-col gap-1">
                        <InfoCard icon="?" title="What is K-pulse?" description="K-Pulse is the first 'Smart Rehab' ball designed for the modern Korean hospital." />
                        <InfoCard icon="◎" title="What can you do?" description="K-pulse guides patients through a full upper limb rehabilitation session, combining smart ball technology and immersive minigames." />
                        <InfoCard icon="🏆" title="Choose your game!" description="The smart ball controls the action on screen, guiding the user through a series of dynamic minigames powered by real movement." />
                    </div>
                </div>
            </section>
        </div>
    );
}
