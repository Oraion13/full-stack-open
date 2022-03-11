"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
app.use(express_1.default.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)());
app.get("/api/ping", (_req, res) => {
    console.log("someone pinged");
    res.send("pong");
});
const PORT = 3001;
const server = http_1.default.createServer(app);
server.listen(PORT, () => {
    console.log(`server listening at ${PORT}`);
});
