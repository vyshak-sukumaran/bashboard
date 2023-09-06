import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Undo } from "lucide-react";
import { useParams } from "react-router-dom";
import useDraw, { type IDrawProps } from "@/hooks/useDraw";
import { useCanvasStore } from "@/stores/canvas-store";
import { draw } from "@/lib/utils";
import { canvasSocket as socket } from "@/lib/socket";

const DrawingCanvas: React.FC = () => {
  let { roomId } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCanvasLoading, setIsCanvasLoading] = useState<boolean>(true);

  const strokeColor = useCanvasStore(state => state.strokeColor);
  const strokeWidth = useCanvasStore(state => state.strokeWidth);
  const dashGap = useCanvasStore(state => state.dashGap);

  const onDraw = useCallback(({ ctx, currentPoint, prevPoint} : IDrawProps) => {
    const drawOptions = {
      ctx,
      currentPoint,
      dashGap,
      prevPoint,
      strokeColor,
      strokeWidth
    }
    draw(drawOptions)
  }, [strokeColor, strokeWidth, dashGap, roomId])

  const { canvasRef, onInteractionStart, clear, undo} = useDraw(onDraw)
  const handleInteractStart = () => {
    const canvasElement = canvasRef.current
    if (!canvasElement) return;

    socket.emit("add-undo-point", {
      roomId,
      undoPoint: canvasElement.toDataURL()
    })
    onInteractionStart();
  };

  useEffect(() => {
    // setting canvas dimentions on load
    if (!containerRef.current || !canvasRef.current) return;
    const { width, height } = containerRef.current?.getBoundingClientRect();
    canvasRef.current.width = width;
    canvasRef.current.height = height;
  }, [canvasRef]);

  useEffect(() => {
    const canvasElement = canvasRef.current
    if (!canvasElement) return;

    const ctx = canvasElement.getContext("2d")

    socket.emit("client-ready", roomId)
    socket.on("client-loaded", () => {
      setIsCanvasLoading(false)
    })

  }, [canvasRef, roomId])
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
          <Button variant="outline" size="default" onClick={clear}>
            Clear
          </Button>
        </div>
      )}

      {isCanvasLoading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 items-end">
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
