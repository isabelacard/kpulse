import { io } from "socket.io-client";

// URL dura del túnel de dev para acceso desde cualquier dispositivo externo
const URL = "https://9kjbhqxg-3001.use2.devtunnels.ms";

export const socket = io(URL, {
    autoConnect: true,
});
