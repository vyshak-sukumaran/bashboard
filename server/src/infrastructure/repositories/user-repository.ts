import type { IRoomMembers, IUser } from "@/types";

export interface IUserRepository {
  addUser(user: IUser): void;
  findUserById(userId: string): IUser | undefined;
  removeUserById(userId: string): boolean;
  getRoomMembers(roomId: string): IRoomMembers[];
}

class UserRepository implements IUserRepository {
  private users: IUser[] = [];
  constructor() {}

  addUser(user: IUser) {
    return this.users.push(user);
  }
  getRoomMembers(roomId: string): IRoomMembers[] {
    return this.users.filter((user) => user.roomId === roomId).map(({id, username}) => ({id, username}));
  }
  findUserById(userId: string): IUser | undefined {
    return this.users.find((user) => user.id === userId);
  }
  removeUserById(userId: string): boolean {
    const index = this.users.findIndex((user) => user.id === userId);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}

export default UserRepository;
