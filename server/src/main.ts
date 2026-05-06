import express, { Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

import sessionRouter from "./routes/session";
import patientRouter from "./routes/patient";
import surveyRouter from "./routes/survey";
import resultsRouter from "./routes/results";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
    res.json({ ok: true, message: "Socket Server Running" });
});

app.use("/session", sessionRouter);
app.use("/patient", patientRouter);
app.use("/survey", surveyRouter);
app.use("/results", resultsRouter);

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: { origin: "*" },
});

io.on("connection", (socket: Socket) => {
    console.log("Cliente conectado:", socket.id);

    socket.on("changePage", (data: string) => {
        console.log("Recibido changePage con data:", data);
        socket.broadcast.emit("syncPage", data);
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
    });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
    console.log(`Server corriendo en puerto ${PORT}`);
});
