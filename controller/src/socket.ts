import { io } from "socket.io-client";

// URL dura del túnel de dev para acceso desde cualquier dispositivo externo
const URL = "https://55qphc8b-3002.use2.devtunnels.ms";

export const socket = io(URL, {
    autoConnect: true,
    transports: ["polling", "websocket"],
    withCredentials: true,
    extraHeaders: {
        "X-Tunnel-Skip-Browser-Warning": "true"  // 👈 esto
    }
});