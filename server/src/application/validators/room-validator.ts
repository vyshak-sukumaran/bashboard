import { z } from "zod";
import { type Socket } from 'socket.io';
import { joinRoomDataSchema } from "./schema";
import { IJoinRoomData } from "@/types";

class RoomValidator {
    readonly socket: Socket;
    static joinRoomDataSchema = joinRoomDataSchema;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    validateJoinRoomData(joinRoomData: IJoinRoomData) {
        try {
            return RoomValidator.joinRoomDataSchema.parse(joinRoomData);
        } catch (error) {
            if (error instanceof z.ZodError) {
                this.socket.emit("invalid-data", {
                    message: "The data provided is invalid",
                })
            }
        }
    }
}

export default RoomValidator