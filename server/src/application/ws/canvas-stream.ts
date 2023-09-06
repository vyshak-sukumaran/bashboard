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

    socket.on("join-room", (joinRoomData: IJoinRoomData) => {
        const  validatedData = roomValidator.validateJoinRoomData(joinRoomData);
        if (!validatedData) return;

        const { roomId, username } = validatedData;
        console.log(socket.rooms, "roooooms");
        console.log(roomId, "roomId");
        
        
        if (roomService.isRoomCreated(roomId)) {
            return roomService.joinRoom(roomId, username);
        }
        socket.emit("room-not-found", {
            message: "Oops! Room with the given ID does not exist",
        });

    })
    
    socket.on("client-ready", (roomId: string) => {
        const members = userRepository.getRoomMembers(roomId);
        if (members.length === 1) {
            // don't need to set canvas state if creator joined
            console.log(socket.rooms, "socket.rooms");
            
            return socket.emit("client-loaded")
        }
    })
}

export default canvasStream
