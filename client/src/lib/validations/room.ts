import { z } from 'zod'

export const createRoomSchema = z.object({
    username: z.string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long"),
})

export const joinRoomSchema = z.object({
    username: z.string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long"),
    roomId: z.string().trim().length(21, "Room ID must be exactly 21 characters long"),
})