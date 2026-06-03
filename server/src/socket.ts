import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export const initSocket = (httpServer: HttpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: (origin, callback) => {
                // Permitir cualquier origen para facilitar el desarrollo con túneles
                callback(null, true);
            },
            methods: ["GET", "POST"],
            credentials: true,
            allowedHeaders: ["x-tunnel-skip-browser-warning"]
        },
        transports: ["polling", "websocket"],
        allowEIO3: true
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

        // Game results bridge
        socket.on("game:results", (data) => {
            console.log("Broadcasting game results:", data);
            socket.broadcast.emit("game:results", data);
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