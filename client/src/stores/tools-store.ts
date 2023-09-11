import { Tools } from "@/lib/enums";
import { create } from "zustand";

interface IToolsState {
    tool: Tools;
    allTools: Tools[]
    setTool: (tool: Tools) => void
}
export const useToolsStore = create<IToolsState>((set) => ({
    tool: Tools.Brush,
    allTools: [Tools.Brush, Tools.Eraser, Tools.Text, Tools.Widgets],
    setTool: (tool) => set({ tool }),
}))