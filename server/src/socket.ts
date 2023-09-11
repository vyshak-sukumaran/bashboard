import {
  canvasReadyHandler,
  getLastUndoPointHandler,
  sendCanvasStateHandler,
} from "./application/socket-handlers/canvas-handler";
import {
  createRoomHandler,
  joinRoomHandler,
  leaveRoomHandler,
} from "./application/socket-handlers/room-handlers";
import { type ServerType } from "./types/socket-types";
import { addUndoPoint, deleteLastUndoPoint } from "./utils/undoPoints";

export function initializeSocket(io: ServerType) {
  function isRoomCreated(roomId: string) {
    const rooms = [...io.sockets.adapter.rooms];
    return rooms?.some((room) => room[0] === roomId);
  }

  io.on("connection", (socket) => {
    socket.on("create-room", (joinRoomData) => {
      createRoomHandler(socket, joinRoomData);
    });

    socket.on("join-room", (joinRoomData) => {
      joinRoomHandler(socket, joinRoomData, isRoomCreated);
    });

    socket.on("client-ready", (roomId: string) => {
      canvasReadyHandler(socket, roomId);
    });

    // canvas state
    socket.on("send-canvas-state", ({ roomId, canvasState }) => {
      sendCanvasStateHandler(socket, roomId, canvasState);
    });

    socket.on("draw", ({ roomId, drawOptions }) => {
      socket.to(roomId).emit("update-canvas-state", drawOptions);
    });

    socket.on("clear-canvas", (roomId) => {
      socket.to(roomId).emit("clear-canvas");
    });

    socket.on("undo", ({ roomId, canvasState }) => {
      socket.to(roomId).emit("undo-canvas", canvasState);
    });

    socket.on("get-last-undo-point", (roomId) => {
      getLastUndoPointHandler(socket, roomId);
    });

    socket.on("add-undo-point", ({ roomId, undoPoint }) => {
      addUndoPoint(roomId, undoPoint);
    });

    socket.on("delete-last-undo-point", (roomId) => {
      deleteLastUndoPoint(roomId);
    });

    socket.on("leave-room", () => {
      leaveRoomHandler(socket);
    });

    socket.on("disconnect", () => {
      socket.emit("disconnected");
      leaveRoomHandler(socket);
    });
  });
}
