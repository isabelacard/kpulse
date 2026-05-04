import { io } from "socket.io-client";

// Reemplazar con la IP o URL de producción si es necesario
const URL = "https://55qphc8b-3001.use2.devtunnels.ms/";

export const socket = io(URL, {
    autoConnect: true,
});
