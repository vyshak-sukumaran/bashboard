import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL;

export const canvasSocket = io(`${API_URL}/canvas`, {
  transports: ["websocket"],
});
