export interface IJoinRoomData {
    roomId: string;
    username: string;
}

export interface IRoomMembers {
    id: string;
    username: string;
}

export interface IUser extends IRoomMembers {
    roomId: string;
}