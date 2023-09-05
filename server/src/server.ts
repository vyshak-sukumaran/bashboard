import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import canvasStream from "./application/ws/canvas-stream";

const port = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(cors());

io.of("/canvas", canvasStream);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
