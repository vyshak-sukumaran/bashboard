import { z } from "zod";

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
  