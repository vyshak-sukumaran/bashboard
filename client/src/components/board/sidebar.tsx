import React from "react";
import { Brush, Eraser, LayoutGrid, type LucideIcon, Type } from "lucide-react";
import TooltipWrapper from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { useToolsStore } from "@/stores";
import { Tools } from "@/lib/enums";

type toolBarType = {
  name: Tools,
  icon: LucideIcon
}

const toolBar : toolBarType[] = [
  {
    name: Tools.Brush,
    icon: Brush,
  },
  {
    name: Tools.Eraser,
    icon: Eraser,
  },
  {
    name: Tools.Text,
    icon: Type,
  },
  {
    name: Tools.Widgets,
    icon: LayoutGrid,
  }
]

const Sidebar: React.FC = () => {
  const [tool, setTool] = useToolsStore(state => [state.tool, state.setTool])  
  return (
    <aside className="block p-2 pt-3 bg-slate-700 dark:bg-slate-900 sticky top-0 left-0 z-30">
      <ul className="list-none space-y-3">
        {toolBar.map((item, index) => {
          const isActive = tool === item.name
          return (
            <li key={index}>
              <TooltipWrapper content={item.name}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`hover:bg-slate-600 dark:hover:bg-slate-800 group rounded-full ${!isActive ? "bg-slate-500 dark:bg-slate-700" : "bg-slate-600 dark:bg-slate-800"}`}
                  onClick={() => setTool(item.name)}
                >
                  <item.icon className={`w-5 h-5 text-white dark:text-slate-200 dark:group-hover:text-white`} />
                </Button>
              </TooltipWrapper>
            </li>
          )
        })}
        
      </ul>
    </aside>
  );
};

export default Sidebar;
