import type { IDrawProps } from "@/hooks/useDraw";

export interface IDrawOptions extends IDrawProps {
    strokeColor: string;
    strokeWidth: number[];
    dashGap: number[];
}

export interface IUser {
    id: string;
    username: string;
}

export interface IRoomJoinedData {
    roomId: string;
    user: IUser;
    members: IUser[];
}