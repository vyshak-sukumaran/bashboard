import { type IUser } from "@/types";
import { create } from "zustand";


interface IMembersState {
    members: IUser[],
    setMembers: (members: IUser[]) => void
}

export const useMembersStore = create<IMembersState>((set) => ({
    members: [],
    setMembers: (members) => set({ members }),
}))