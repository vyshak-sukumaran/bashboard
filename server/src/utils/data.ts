import type { IUser } from "@/types";

let users: IUser[] = [];

const getUser = (id: string) => {
    return users.find((user) => user.id === id);
};

const getRoomMembers = (roomId: string) => {
    return users.filter((user) => user.roomId === roomId).map(({id, username}) => ({id, username}));
}

const addUser = (user: IUser) => {
    users.push(user);
}

const removeUser = (id: string) => {
    users = users.filter((user) => user.id !== id);
}

export { getUser, getRoomMembers, addUser, removeUser };