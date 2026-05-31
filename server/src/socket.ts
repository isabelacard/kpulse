import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export const initSocket = (httpServer: HttpServer) => {
    const io = new Server(httpServer, {
        cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        // General page synchronization
        socket.on("changePage", (data) => {
            console.log("Received changePage with data:", data);
            io.emit("syncPage", data);
        });

        // Sensor bridge
        socket.on("sensor:data", (data) => {
            // FIXED: Removed the extra space, now it perfectly matches your React code
            socket.broadcast.emit("screen:data", data);
        });

        // Post-calibration synchronization
        socket.on("calibration:completed", (path) => {
            console.log("Calibration completed, syncing to:", path);
            // FIXED: Capital "P" in syncPage
            io.emit("syncPage", path);
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });

    return io;
};