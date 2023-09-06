import type { IUserRepository } from '@/infrastructure/repositories/user-repository';
import { type Socket } from 'socket.io';

interface IRoomService {
    joinRoom(roomId: string, username: string): void;
  }

class RoomService implements IRoomService {
    readonly socket: Socket;
    private userRepository: IUserRepository


    constructor(socket: Socket, userRepository: IUserRepository) {
        this.socket = socket;
        this.userRepository = userRepository
    }

    joinRoom(roomId: string, username: string): void {
        this.socket.join(roomId);
        const user = {
            id: this.socket.id,
            username
        }
        
        this.userRepository.addUser({...user, roomId});
        const members = this.userRepository.getRoomMembers(roomId)

        this.socket.emit("room-joined", {
            user,
            roomId,
            members
        })
        
        this.socket.to(roomId).emit("update-members", members)
        this.socket.to(roomId).emit("send-notification", {
            title: "New member arrived!",
            message: `${username} has joined the room`
        })

    }

    isRoomCreated(roomId: string): boolean {
        const rooms = this.socket.rooms;
        return rooms.has(roomId);
    }

}

export default RoomService