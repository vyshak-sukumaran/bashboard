import { type IRoomMembers } from "@/types";
import { create } from "zustand";

interface UserState {
    user: IRoomMembers | null,
    setUser: (user: IRoomMembers) => void
}
export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}))