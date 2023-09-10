
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


export interface ICanvasData {
    canvasState: string;
    roomId: string;
}

export interface IPoint {
    x: number;
    y: number;
}

export interface IDrawProps {
    ctx: CanvasRenderingContext2D;
    currentPoint: IPoint;
    prevPoint: IPoint | undefined;
}

export interface IDrawOptions extends IDrawProps {
    strokeColor: string;
    strokeWidth: number[];
    dashGap: number[];
}

export interface IDrawData {
    drawOptions: IDrawOptions;
    roomId: string;
}

export interface IUndoPointData {
    undoPoint: string;
    roomId: string;
}
