import {
  addUndoPoint,
  deleteLastUndoPoint,
  getLastUndoPoint,
  hasUndoPointsLeft,
} from "../utils/undoPoints";
import {
  joinRoomHandler,
  leaveRoomHandler,
} from "../application/socket-handlers/room-handlers";
import { validateJoinRoomData } from "../application/validators/room-validator";
import { type ServerType } from "../types/socket-types";
import { getRoomMembers } from "../utils/data";

export function configureSocketIO(io: ServerType) {
  function isRoomCreated(roomId: string) {
    const rooms = [...io.sockets.adapter.rooms];
    return rooms?.some((room) => room[0] === roomId);
  }

  io.on("connection", (socket) => {
    socket.on("create-room", (joinRoomData) => {
      const validatedData = validateJoinRoomData(socket, joinRoomData);

      if (!validatedData) return;
      const { roomId, username } = validatedData;

      joinRoomHandler(socket, roomId, username);
    });

    socket.on("join-room", (joinRoomData) => {
      const validatedData = validateJoinRoomData(socket, joinRoomData);

      if (!validatedData) return;
      const { roomId, username } = validatedData;

      if (isRoomCreated(roomId)) {
        return joinRoomHandler(socket, roomId, username);
      }

      socket.emit("room-not-found", {
        message: "Oops! Room with the given ID does not exist",
      });
    });

    socket.on("client-ready", (roomId: string) => {
      const members = getRoomMembers(roomId);

      if (members.length === 1) {
        return socket.emit("client-loaded");
      }

      const adminMember = members[0];
      if (!adminMember) return;

      socket.to(adminMember.id).emit("get-canvas-state");
    });

    socket.on("send-canvas-state", ({ roomId, canvasState }) => {
      const members = getRoomMembers(roomId);
      const lastMember = members[members.length - 1];

      if (!lastMember) return;
      // send the canvas state to the last member
      socket.to(lastMember.id).emit("canvas-state-from-server", canvasState);
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
      const lastUndoPoint = getLastUndoPoint(roomId);
      const hasUndoPoints = hasUndoPointsLeft(roomId)
      if (!hasUndoPoints) {
        socket.emit("disable-undo-button")
      }
      
      if (!lastUndoPoint) return;
      socket.emit("last-undo-point-from-server", lastUndoPoint);
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
