import React from "react";
import UndoButton from "./undo-button";
import ClearButton from "./clear-button";
import { Separator } from "../ui/separator";
import { useToolsStore } from "@/stores";
import { Tools } from "@/lib/enums";
import BrushOptions from "./brush-options";

interface ICanvasNavProps {
  canUndo: boolean;
  undo: (undoPoint: string) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  clear: () => void;
}
const CanvasNav: React.FC<ICanvasNavProps> = (props) => {
  const { canUndo, undo, canvasRef, clear } = props;

  const tool = useToolsStore((state) => state.tool);
  return (
    <div className="bg-white dark:bg-slate-900 w-full relative p-1 border-b flex justify-between gap-2">
      <div className="flex gap-2 items-center">
        <h3>{tool}</h3>
        <Separator orientation="vertical" />
        {tool === Tools.Brush && (
            <BrushOptions />
        )}
      </div>

      <ul className="ml-auto px-2 flex list-none gap-2 items-center">
        <li>
          <UndoButton canUndo={canUndo} undo={undo} />
        </li>
        <Separator orientation="vertical" />
        <li>
          <ClearButton canvasRef={canvasRef} clear={clear} />
        </li>
      </ul>
    </div>
  );
};

export default CanvasNav;
