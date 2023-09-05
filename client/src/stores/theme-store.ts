import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Themes } from "@/lib/enums";

interface ThemeState {
  theme: Themes;
  setTheme: (theme: Themes) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: Themes.Light,
      setTheme: (theme) => set({ theme }),
    }),
    { name: "theme-storage", storage: createJSONStorage(() => localStorage) }
  )
);