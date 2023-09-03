import React from "react";
import { Brush, Eraser, LayoutGrid, Type } from "lucide-react";
import TooltipWrapper from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
const Sidebar: React.FC = () => {
  return (
    <aside className="block p-2 bg-slate-700 sticky top-0 left-0 z-30">
      <ul className="list-none space-y-3">
        <li>
          <TooltipWrapper content="Brush">
            <Button
              variant="outline"
              size="icon"
              className="bg-transparent group rounded-full"
            >
              <Brush className="w-5 h-5 text-white group-hover:text-black" />
            </Button>
          </TooltipWrapper>
        </li>
        <li>
          <TooltipWrapper content="Eraser">
            <Button
              variant="outline"
              size="icon"
              className="bg-transparent group rounded-full"
            >
              <Eraser className="w-5 h-5 text-white group-hover:text-black" />
            </Button>
          </TooltipWrapper>
        </li>
        <li>
          <TooltipWrapper content="Text">
            <Button
              variant="outline"
              size="icon"
              className="bg-transparent group rounded-full"
            >
              <Type className="w-5 h-5 text-white group-hover:text-black" />
            </Button>
          </TooltipWrapper>
        </li>
        <li>
          <TooltipWrapper content="Widgets">
            <Button
              variant="outline"
              size="icon"
              className="bg-transparent group rounded-full"
            >
              <LayoutGrid className="w-5 h-5 text-white group-hover:text-black" />
            </Button>
          </TooltipWrapper>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
