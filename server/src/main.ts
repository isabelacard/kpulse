import express, { Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { initSocket } from "./socket";

import sessionRouter from "./routes/session";
import patientRouter from "./routes/patient";
import surveyRouter from "./routes/survey";
import resultsRouter from "./routes/results";
import reportRouter from "./routes/report";

const app = express();

app.use((req, res, next) => {
  res.setHeader("X-Tunnel-Skip-Browser-Warning", "true");
  next();
});

app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-tunnel-skip-browser-warning",
    ],
  }),
);
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.json({ ok: true, message: "Socket Server Running" });
});

app.use("/session", sessionRouter);
app.use("/patient", patientRouter);
app.use("/survey", surveyRouter);
app.use("/results", resultsRouter);
app.use("/report", reportRouter);

const httpServer = createServer(app);
initSocket(httpServer);

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}`);
});
