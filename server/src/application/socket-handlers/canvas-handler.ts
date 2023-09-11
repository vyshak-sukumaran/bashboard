import { type SocketType } from "@/types/socket-types";
import { getRoomMembers } from "../../utils/data";
import { getLastUndoPoint, hasUndoPointsLeft } from "../../utils/undoPoints";

export function canvasReadyHandler(socket: SocketType, roomId: string) {
  const members = getRoomMembers(roomId);
  if (members.length === 1) {
    return socket.emit("client-loaded");
  }
  const adminMember = members[0];
  if (!adminMember) return;

  socket.to(adminMember.id).emit("get-canvas-state");
}

export function sendCanvasStateHandler(
  socket: SocketType,
  roomId: string,
  canvasState: string
) {
  const members = getRoomMembers(roomId);
  const lastMember = members[members.length - 1];

  if (!lastMember) return;
  // send the canvas state to the last member
  socket.to(lastMember.id).emit("canvas-state-from-server", canvasState);
}

export function getLastUndoPointHandler(socket: SocketType, roomId: string) {
  const lastUndoPoint = getLastUndoPoint(roomId);
  const hasUndoPoints = hasUndoPointsLeft(roomId);
  if (!hasUndoPoints) {
    socket.emit("disable-undo-button");
  }

  if (!lastUndoPoint) return;
  socket.emit("last-undo-point-from-server", lastUndoPoint);
}
