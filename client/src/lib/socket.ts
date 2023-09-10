import { IClientToServerEvents, IServerToClientEvents } from "@/types/socket-types";
import { io, type Socket } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL;

export const socket : Socket<IServerToClientEvents, IClientToServerEvents> = io(API_URL, {
  transports: ["websocket"],
});
