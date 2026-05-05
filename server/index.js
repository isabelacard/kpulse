import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ ok: true, message: "Socket Server Running" });
});

io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    // Evento clave: Recibir cambio de pagina desde controller y reenviarlo a screen
    socket.on("changePage", (data) => {
        console.log("Recibido changePage con data:", data);
        io.emit("syncPage", data);
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
    });
});

const PORT = 3001; // Usando 3001 para evitar conflictos con el 3000 de server
httpServer.listen(PORT, () => {
    console.log(`Socket Server corriendo en puerto ${PORT}`);
});
