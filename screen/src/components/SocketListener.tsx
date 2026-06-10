import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import ImagePreloader from "./ImagePreloader";

export default function SocketListener({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();

    useEffect(() => {
        const handleSyncPage = (path: string) => {
            console.log("Sincronizando página a:", path);
            navigate(path);
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
