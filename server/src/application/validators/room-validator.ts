import { z } from "zod";
import { type Socket } from "socket.io";
import { IJoinRoomData } from "@/types";
import { SocketType } from "@/types/socket-types";

export const joinRoomDataSchema = z.object({
    roomId: z
      .string()
      .trim()
      .length(21, "Room ID must contain exactly 21 characters"),
    username: z
      .string()
      .min(2, "Username must be at least 2 characters")
      .max(20, "Username must be at most 20 characters"),
  });
  

export function validateJoinRoomData(socket: SocketType, joinRoomData: IJoinRoomData) {
  try {
    return joinRoomDataSchema.parse(joinRoomData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      socket.emit("invalid-data", {
        message: "The data provided is invalid",
      });
    }
  }
}