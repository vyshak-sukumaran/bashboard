import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { getCorsOptions } from "./configuration/cors-config";
import { initializeSocket } from "./socket";

const port = process.env.PORT || 8000;
const corsOptions = getCorsOptions();

const app = express();
app.use(cors(corsOptions));

const server = http.createServer(app);

const io = new Server(server);

// initialize websocket connection and events
initializeSocket(io);

app.get("/", (_, res) => {
  res.send("App is running");
})


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
