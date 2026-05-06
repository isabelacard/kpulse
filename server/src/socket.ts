import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export const initSocket = (httpServer: HttpServer) => {
    const io = new Server(httpServer, {
        cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
        console.log("Cliente conectado:", socket.id);

        socket.on("changePage", (data) => {
            console.log("Recibido changePage con data:", data);
            io.emit("syncPage", data);
        });

        socket.on("disconnect", () => {
            console.log("Cliente desconectado:", socket.id);
        });
    });

    return io;
};
