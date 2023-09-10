import { type SocketType } from "@/types/socket-types";
import { addUser, getRoomMembers, getUser, removeUser } from "../../utils/data";

export function joinRoomHandler(
  socket: SocketType,
  roomId: string,
  username: string
) {
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
