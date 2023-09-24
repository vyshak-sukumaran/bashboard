import React from "react";
import Nav from "@/components/board/nav";
import DrawingCanvas from "@/components/board/drawing-canvas";
const Board: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-zinc-100 dark:bg-slate-800">
      <Nav />
      <DrawingCanvas />
    </div>
  );
};

export default Board;
