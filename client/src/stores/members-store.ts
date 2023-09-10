import { type IRoomMembers } from "@/types";
import { create } from "zustand";


interface IMembersState {
    members: IRoomMembers[],
    setMembers: (members: IRoomMembers[]) => void
}

export const useMembersStore = create<IMembersState>((set) => ({
    members: [],
    setMembers: (members) => set({ members }),
}))