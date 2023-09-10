import React from "react";
import Sidebar from "@/components/board/sidebar";
import Nav from "@/components/board/nav";
import DrawingCanvas from "@/components/board/drawing-canvas";
const Board: React.FC = () => {

  return (
    <div className="h-full flex flex-col">
      <Nav />
      <div className="grow flex relative overflow-hidden">
        <Sidebar />
        <DrawingCanvas />
      </div>
    </div>
  );
};

export default Board;
