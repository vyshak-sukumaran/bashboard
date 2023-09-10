import { ICanvasData, IDrawData, IDrawOptions, IJoinRoomData, IRoomMembers, IUndoPointData } from ".";
import type { Server, Socket } from "socket.io";

export interface IServerToClientEvents {
    "room-joined": (data: { user: IRoomMembers; roomId: string; members: IRoomMembers[] }) => void;
    "update-members": (members: IRoomMembers[]) => void;
    "send-notification": (data: { title: string; message: string }) => void;
    "room-not-found": (data: { message: string }) => void;
    "client-loaded": () => void;
    "get-canvas-state": () => void;
    // canvas state from server
    "canvas-state-from-server": (canvasState: string) => void;
    "update-canvas-state": (drawOptions: IDrawOptions) => void;
    "clear-canvas": () => void;
    "undo-canvas": (canvasState: string) => void;
    // undo point from server
    "last-undo-point-from-server": (undoPoint: string | undefined) => void;
    "disconnected": () => void;
    "invalid-data": (data: { message: string }) => void;
    "disable-undo-button": () => void;
}

export interface IClientToServerEvents {
    "create-room": (joinRoomData: IJoinRoomData) => void;
    "join-room": (joinRoomData: IJoinRoomData) => void;
    "client-ready": (roomId: string) => void;
    "send-canvas-state": (canvasData: ICanvasData) => void;
    "draw": (drawData: IDrawData) => void;
    "clear-canvas": (roomId: string) => void;
    "undo" : (canvasData: ICanvasData) => void;
    "get-last-undo-point": (roomId: string) => void;
    "add-undo-point": (undoPointData: IUndoPointData) => void;
    "delete-last-undo-point": (roomId: string) => void;
    "leave-room": () => void;
    "disconnect": () => void;

}

export interface IInterServerEvents {
    "ping": () => void;
}

export type SocketType = Socket<IClientToServerEvents, IServerToClientEvents, IInterServerEvents>
export type ServerType = Server<IClientToServerEvents, IServerToClientEvents, IInterServerEvents>