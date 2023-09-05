import { type IUser } from "@/types";
import { create } from "zustand";

interface UserState {
    user: IUser | null,
    setUser: (user: IUser) => void
}
export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}))