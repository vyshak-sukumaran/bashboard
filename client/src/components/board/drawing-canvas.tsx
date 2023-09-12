import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCanvasStore, useUserStore } from "@/stores";
import { draw, drawWithDataURL } from "@/lib/utils";
import { socket } from "@/lib/socket";
import UndoButton from "./undo-button";
import ClearButton from "./clear-button";
import { useDraw } from "@/hooks";
import type { IDrawProps } from "@/types";
import { Skeleton } from "../ui/skeleton";

const DrawingCanvas: React.FC = () => {
  let { roomId } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCanvasLoading, setIsCanvasLoading] = useState<boolean>(true);
  const [canUndo, setCanUndo] = useState<boolean>(true);

  const strokeColor = useCanvasStore((state) => state.strokeColor);
  const strokeWidth = useCanvasStore((state) => state.strokeWidth);
  const dashGap = useCanvasStore((state) => state.dashGap);
  const user = useUserStore((state) => state.user);

  const onDraw = useCallback(
    ({ ctx, currentPoint, prevPoint }: IDrawProps) => {
      const drawOptions = {
        ctx,
        currentPoint,
        dashGap,
        prevPoint,
        strokeColor,
        strokeWidth,
      };
      draw(drawOptions);
      socket.emit("draw", { drawOptions, roomId });
    },
    [strokeColor, strokeWidth, dashGap, roomId]
  );

  const { canvasRef, onInteractionStart, clear, undo } = useDraw(onDraw);

  const handleInteractStart = () => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    socket.emit("add-undo-point", {
      roomId,
      undoPoint: canvasElement.toDataURL(),
    });
    setCanUndo(true);
    onInteractionStart();
  };

  useEffect(() => {
    // setting canvas dimensions on load
    if (!containerRef.current || !canvasRef.current) return;
    const { width, height } = containerRef.current?.getBoundingClientRect();
    canvasRef.current.width = width - 20;
    canvasRef.current.height = height - 20;
  }, [canvasRef]);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const ctx = canvasElement.getContext("2d");

    socket.emit("client-ready", roomId);
    socket.on("client-loaded", () => {
      setIsCanvasLoading(false);
    });

    socket.on("get-canvas-state", () => {
      const canvasState = canvasElement.toDataURL();
      if (!canvasState) return;

      socket.emit("send-canvas-state", { canvasState, roomId });
    });

    socket.on("canvas-state-from-server", (canvasState: string) => {
      if (!ctx) return;
      drawWithDataURL(canvasState, ctx, canvasElement);
      setIsCanvasLoading(false);
    });

    socket.on("update-canvas-state", (drawOptions) => {
      if (!ctx) return;
      draw({ ...drawOptions, ctx });
    });

    socket.on("undo-canvas", (canvasState) => {
      if (!ctx) return;
      drawWithDataURL(canvasState, ctx, canvasElement);
    });
    socket.on("disable-undo-button", () => {
      setCanUndo(false);
    });
    return () => {
      socket.off("client-loaded");
      socket.off("get-canvas-state");
      socket.off("canvas-state-from-server");
      socket.off("disable-undo-button");
    };
  }, [canvasRef, roomId]);

  useEffect(() => {
    if (!user) {
      return navigate("/", {
        replace: true,
      });
    }
  }, [user]);
  return (
    <main
      ref={containerRef}
      className="overflow-auto canvas-scrollbar grow w-full relative flex items-center justify-center"
    >
      {!isCanvasLoading && (
        <div className="flex gap-2 items-center absolute top-5 right-5">
          <UndoButton undo={undo} canUndo={canUndo} />
          <ClearButton canvasRef={canvasRef} clear={clear} />
        </div>
      )}

      {isCanvasLoading && (
        <Skeleton className="absolute h-[calc(100%-20px)] w-[calc(100%-20px)]" />
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
