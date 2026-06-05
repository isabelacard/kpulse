import { io } from "socket.io-client";

const URL = "https://9kjbhqxg-3001.use2.devtunnels.ms/";

export const socket = io(URL, {
    autoConnect: true,
    transports: ["polling", "websocket"],
    withCredentials: true,
    extraHeaders: {
        "X-Tunnel-Skip-Browser-Warning": "true"  
    }
});