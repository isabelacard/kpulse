import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { useGameResults } from "../hooks/useGameResults";
import ImagePreloader from "./ImagePreloader";

export default function SocketListener({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    useGameResults();

    useEffect(() => {
        const handleSyncPage = (path: string) => {
            console.log("Sincronizando página a:", path);

            // Mapeo de rutas: si la pantalla pide ir a X, el celular debe ir a Y
            const pathMap: Record<string, string> = {
                "/instructions1": "/instructions1mobile",
                "/instructions2": "/instructions2mobile",
                "/instructions3": "/instructions3mobile",
                "/instructions4": "/instructions4mobile",
                "/calibration1": "/calibratingmobile",
                "/pregameone": "/gameonemobile",
                "/pregametwo": "/gametwo",
                "/gametwo": "/gametwo",
                "/allset": "/allset",
                "/final": "/ending",
                // Si hay otras rutas que difieran, se agregan aquí
            };

            const targetPath = pathMap[path] || path;
            navigate(targetPath);
        };

        socket.on("syncPage", handleSyncPage);

        return () => {
            socket.off("syncPage", handleSyncPage);
        };
    }, [navigate]);

    return (
        <>
            <ImagePreloader />
            {children}
        </>
    );
}
