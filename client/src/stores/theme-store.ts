import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Themes } from "@/lib/enums";

interface ThemeState {
  theme: Themes;
  setTheme: (theme: Themes) => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: Themes.Light,
      setTheme: (theme) => set({ theme }),
    }),
    { name: "theme-storage", storage: createJSONStorage(() => localStorage) }
  )
);

export const useTheme = () => {
    const theme = useThemeStore((state) => state.theme);
    const setTheme = useThemeStore((state) => state.setTheme);
    return { theme, setTheme };
}