export interface IPoint {
    x: number
    y: number
  }
  export interface IDrawProps {
    ctx: CanvasRenderingContext2D,
    currentPoint: IPoint,
    prevPoint: IPoint | undefined
  }
  
export interface IDrawOptions extends IDrawProps {
    strokeColor: string;
    strokeWidth: number[];
    dashGap: number[];
}

export interface IRoomJoinedData {
    roomId: string;
    user: IUser;
    members: IUser[];
}

// from here copied from server

export interface IJoinRoomData {
    roomId: string | undefined;
    username: string;
}

export interface IRoomMembers {
    id: string;
    username: string;
}

export interface IUser extends IRoomMembers {
    roomId: string | undefined;
}


export interface ICanvasData {
    canvasState: string;
    roomId: string | undefined;
}


export interface IDrawOptions extends IDrawProps {
    strokeColor: string;
    strokeWidth: number[];
    dashGap: number[];
}

export interface IDrawData {
    drawOptions: IDrawOptions;
    roomId: string | undefined;
}

export interface IUndoPointData {
    undoPoint: string;
    roomId: string | undefined;
}
