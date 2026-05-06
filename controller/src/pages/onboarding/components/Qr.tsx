import { useEffect, useRef } from "react";

export default function Qr() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "environment" }, // Usa la cámara trasera si está disponible
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accediendo a la cámara:", err);
            }
        }

        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    return (
        <div className="relative w-70 h-70 sm:w-[320px] sm:h-80 p-1.5 bg-[#FBB03B] rounded-2xl shadow-lg">
            <div className="relative w-full h-full bg-black rounded-xl overflow-hidden flex items-center justify-center">
                <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
                {/* Overlay opcional para que parezca un scanner */}
                <div className="absolute inset-0 border-2 border-white/30 rounded-xl pointer-events-none"></div>
            </div>
        </div>
    );
}
