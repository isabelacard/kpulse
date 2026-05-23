import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { data } from "react-router-dom";
import path from "path";

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

        //puente de sensores
        socket.on("sensor:data", (data) => {
            socket.broadcast.emit("screen: data", data);
        });

        //Sincronicacion post calibración
        socket.on("calibración:completada", (path) => {
            console.log("Calibración completada, sincronizando hacia:", path);
            
            io.emit("syncpage", path);
        });

        socket.on("disconnect", () => {
            console.log("Cliente desconectado:", socket.id);
        });
    });

    return io;
};
