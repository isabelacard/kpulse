import { io } from "socket.io-client";

const URL = "https://9kjbhqxg-3001.use2.devtunnels.ms/";

export const socket = io(URL, {
    autoConnect: true,
    transports: ["websocket", "polling"],
    // Remove credentials to simplify CORS; server allows any origin
    withCredentials: false,
    extraHeaders: {
        "X-Tunnel-Skip-Browser-Warning": "true",
    },
});

// Debug connection events
socket.on("connect", () => {
    console.log("[Controller] Socket connected, id:", socket.id);
});
socket.on("connect_error", (err) => {
    console.error("[Controller] Socket connection error:", err);
});
socket.on("disconnect", (reason) => {
    console.warn("[Controller] Socket disconnected:", reason);
});
