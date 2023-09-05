import { type Socket } from 'socket.io';
import RoomService from '../services/room-service';
import { type IJoinRoomData } from '@/types';
import RoomValidator from '../validators/room-validator';
import UserRepository from '../../infrastructure/repositories/user-repository';
const canvasStream = (socket: Socket) => {
    const userRepository = new UserRepository()
    const roomService = new RoomService(socket, userRepository);
    const roomValidator = new RoomValidator(socket);

    socket.on("create-room", (joinRoomData: IJoinRoomData) => {
        const validatedData = roomValidator.validateJoinRoomData(joinRoomData);
        if (!validatedData) return

        const { roomId, username } = validatedData;
        roomService.joinRoom(roomId, username);

    });
}

export default canvasStream
