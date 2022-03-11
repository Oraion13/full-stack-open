import express, { Request, Response } from "express";
const app = express();
import cors from "cors";
import http from "http";


import diagnosesRouter from "./routers/diagnose";
import patientsRouter from "./routers/patients";

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get("/api/ping", (_req: Request, res: Response) => {
    console.log("someone pinged");
    res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

const PORT = 3001;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`server listening at ${PORT}`);
});