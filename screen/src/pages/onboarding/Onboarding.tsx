// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { InfoCard } from "./components/InfoCard";
import { Qrcode } from "./components/QrCode";
import { HelpCircle, Target, Trophy } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useResponsiveScale } from "../../hooks/useResponsiveScale";

import fondo from "../../assets/fondo.webp";

export default function Onboarding() {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         navigate("/onboarding2");
    //     }, 10000);

    //     return () => clearTimeout(timer);
    // }, [navigate]);

    const scale = useResponsiveScale();

    const getControllerUrl = () => {
        const { protocol, hostname, port } = window.location;
        if (hostname.includes("devtunnels.ms")) {
            if (hostname.includes("-5173")) return window.location.href.replace("-5173", "-5174");
            if (hostname.includes("-5174")) return window.location.href.replace("-5174", "-5173");
            return window.location.href;
        }
        const otherPort = port === "5173" ? "5174" : "5173";
        return `${protocol}//${hostname}:${otherPort}/`;
    };

    return (
        <div className="flex items-center justify-center w-full h-screen overflow-hidden bg-black/5">
            <div
                style={{
                    width: 1176 * scale,
                    height: 648 * scale,
                    position: "relative",
                }}
                className="flex items-center justify-center overflow-hidden"
            >
                <div
                    style={{
                        width: 1176,
                        height: 648,
                        transform: `scale(${scale})`,
                        transformOrigin: "center",
                        position: "absolute",
                    }}
                    className="shrink-0 overflow-hidden"
                >
                    <img fetchPriority="high" loading="eager" src={fondo} alt="Fondo Onboarding" className="w-full h-full scale-102 object-cover z-0 absolute top-0 left-0" />

                    {/* Layout fijo: izquierda texto + cards, derecha QR */}
                    <div className="absolute inset-0 z-10 flex flex-row items-center justify-between px-20">
                        {/* Columna izquierda */}
                        <div className="flex flex-col" style={{ width: 560 }}>
                            <header className="mb-6">
                                <h1 className="text-white font-poppins font-medium leading-tight" style={{ fontSize: 80 }}>
                                    Welcome to
                                    <br />
                                    <span className="bg-linear-to-b from-white to-cyan-300 bg-clip-text text-transparent">K-Pulse</span>
                                </h1>
                                <p className="font-mclaren text-white/90 mt-3" style={{ fontSize: 15, maxWidth: 360 }}>
                                    Transform traditional arm rehabilitation into an immersive game experience that tracks movement and progress.
                                </p>
                            </header>

                            <div className="flex flex-col ">
                                <InfoCard
                                    icon={<HelpCircle style={{ width: 36, height: 36 }} className="text-white" strokeWidth={1.9} />}
                                    title="What is K-pulse?"
                                    description="K-Pulse is the first 'Smart Rehab' ball designed for the modern Korean hospital."
                                />
                                <InfoCard
                                    icon={<Target style={{ width: 36, height: 36 }} className="text-white" strokeWidth={1.7} />}
                                    title="What can you do?"
                                    description="K-pulse guides patients through a full upper limb rehabilitation session, combining smart ball technology and immersive minigames."
                                />
                                <InfoCard
                                    icon={<Trophy style={{ width: 34, height: 34 }} className="text-white" strokeWidth={1.7} />}
                                    title="Choose your game!"
                                    description="The smart ball controls the action on screen, guiding the user through a series of dynamic minigames powered by real movement."
                                />
                            </div>
                        </div>

                        {/* Columna derecha — QR */}
                        <div className="flex pl-40 pt-50" style={{ width: 460 }}>
                            <Qrcode
                                icon={
                                    <div className="w-full h-full flex items-center justify-center p-2 bg-white rounded-lg">
                                        <QRCodeSVG value={getControllerUrl()} size={200} className="w-full h-full" />
                                    </div>
                                }
                                description="Scan the QR to start your experience"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
