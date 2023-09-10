import React, { useEffect } from "react";
import TooltipWrapper from "../tooltip-wrapper";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { socket } from "@/lib/socket";
import { useHotkeys } from "react-hotkeys-hook";
import { X } from "lucide-react";
import { isMacOs } from "@/lib/utils";

interface IClearButtonProps {
  clear: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}
const ClearButton: React.FC<IClearButtonProps> = ({ clear, canvasRef }) => {
  const { roomId } = useParams();
  const handleClearCanvas = () => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    socket.emit("add-undo-point", {
      roomId,
      undoPoint: canvasElement.toDataURL(),
    });
    clear();
    socket.emit("clear-canvas", roomId);
  };
  const isMac = isMacOs();
  const hotKey = `${isMac ? "meta" : "ctrl"}+alt+c`;  
  useHotkeys(hotKey, handleClearCanvas);

  useEffect(() => {
    socket.on("clear-canvas", clear);
    return () => {
      socket.off("clear-canvas");
    };
  }, [clear]);
  return (
    <TooltipWrapper content="Clear" align="center" side="bottom">
      <Button variant="outline" size="icon" onClick={handleClearCanvas}>
        <X className="w-4 h-4" />
      </Button>
    </TooltipWrapper>
  );
};

export default ClearButton;
