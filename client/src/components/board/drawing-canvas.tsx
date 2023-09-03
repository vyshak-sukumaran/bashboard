import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Undo } from "lucide-react";
import { useParams } from "react-router-dom";

const DrawingCanvas: React.FC = () => {
  let { boardId } = useParams();
  console.log(boardId);
  const [isCanvasLoading, setIsCanvasLoading] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleInteractStart = () => {
    console.log("heey");
  };

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const { width, height } = containerRef.current?.getBoundingClientRect();
    canvasRef.current.width = width;
    canvasRef.current.height = height;
  }, [canvasRef]);
  return (
    <main
      ref={containerRef}
      className="overflow-auto canvas-scrollbar grow w-full relative flex items-center justify-center"
    >
      {!isCanvasLoading && (
        <div className="flex gap-2 items-center absolute top-2 right-2">
          <Button variant="outline" size="icon">
            <Undo className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="default">
            Clear
          </Button>
        </div>
      )}

      {isCanvasLoading && (
        <div className="flex gap-2 items-end">
          <p className="text-lg font-medium tracking-wider font-poppins">
            Loading
          </p>
          <span className="block w-1 h-1 bg-black rounded-full mb-1.5 animate-pulse"></span>
          <span className="block w-1 h-1 bg-black rounded-full mb-1.5 delay-150 animate-pulse"></span>
          <span className="block w-1 h-1 bg-black rounded-full mb-1.5 delay-300 animate-pulse"></span>
        </div>
      )}

      <canvas
        id="canvas"
        ref={canvasRef}
        onMouseDown={handleInteractStart}
        onTouchStart={handleInteractStart}
        width={0}
        height={0}
        className="touch-none rounded border bg-white"
      />
    </main>
  );
};

export default DrawingCanvas;
