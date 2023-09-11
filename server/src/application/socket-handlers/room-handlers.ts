import { type SocketType } from "@/types/socket-types";
import { addUser, getRoomMembers, getUser, removeUser } from "../../utils/data";
import { type IJoinRoomData } from "@/types";
import { validateJoinRoomData } from "../validators/room-validator";

export function createRoomHandler(
  socket: SocketType,
  joinRoomData: IJoinRoomData
) {
  const validatedData = validateJoinRoomData(socket, joinRoomData);
  if (!validatedData) return;
  const { roomId, username } = validatedData;

  socket.join(roomId);
  const user = {
    id: socket.id,
    username,
  };
  addUser({ ...user, roomId });
  const members = getRoomMembers(roomId);

  socket.emit("room-joined", { user, roomId, members });
  socket.to(roomId).emit("update-members", members);
  socket.to(roomId).emit("send-notification", {
    title: "New member arrived!",
    message: `${username} has joined the room`,
  });
}

export function joinRoomHandler(
  socket: SocketType,
  joinRoomData: IJoinRoomData,
  isRoomCreated: (roomId: string) => boolean
) {
  const validatedData = validateJoinRoomData(socket, joinRoomData);

  if (!validatedData) return;
  const { roomId, username } = validatedData;

  if (!isRoomCreated(roomId)) {
    socket.emit("room-not-found", {
      message: "Oops! Room with the given ID does not exist",
    });
    return;
  }

  socket.join(roomId);
  const user = {
    id: socket.id,
    username,
  };
  addUser({ ...user, roomId });
  const members = getRoomMembers(roomId);

  socket.emit("room-joined", { user, roomId, members });
  socket.to(roomId).emit("update-members", members);
  socket.to(roomId).emit("send-notification", {
    title: "New member arrived!",
    message: `${username} has joined the room`,
  });
}

export function leaveRoomHandler(socket: SocketType) {
  const user = getUser(socket.id);
  if (!user) return;

  const { roomId, username } = user;

  removeUser(socket.id);
  const members = getRoomMembers(roomId);

  socket.to(roomId).emit("update-members", members);
  socket.to(roomId).emit("send-notification", {
    title: "Member left!",
    message: `${username} has left the room`,
  });
  socket.leave(roomId);
}
