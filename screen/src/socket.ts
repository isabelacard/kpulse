import { io } from "socket.io-client";

const getSocketUrl = () => {
    const envUrl = import.meta.env.VITE_SOCKET_URL;
    if (envUrl) {
        return envUrl;
    }
    if (typeof window !== "undefined" && window.location) {
        const { hostname, protocol } = window.location;
        if (hostname.includes("devtunnels.ms")) {
            const parts = hostname.split(".");
            const clusterPart = parts.slice(1).join(".");
            const nameAndPort = parts[0];
            const nameParts = nameAndPort.split("-");
            if (nameParts.length > 0) {
                const tunnelId = nameParts[0];
                return `https://${tunnelId}-3001.${clusterPart}/`;
            }
        }
        return `${protocol}//${hostname}:3001/`;
    }
    return "https://9kjbhqxg-3001.use2.devtunnels.ms/";
};

const URL = getSocketUrl();

export const socket = io(URL, {
    autoConnect: true,
    transports: ["websocket", "polling"],
    withCredentials: true,
    extraHeaders: {
        "X-Tunnel-Skip-Browser-Warning": "true",
    },
});
