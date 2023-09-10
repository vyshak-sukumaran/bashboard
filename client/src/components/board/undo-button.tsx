import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Loader2, Undo } from "lucide-react";
import { useParams } from "react-router-dom";
import { socket } from "@/lib/socket";
import { useHotkeys } from "react-hotkeys-hook";
import { isMacOs } from "@/lib/utils";
import TooltipWrapper from "../tooltip-wrapper";

interface IUndoButtonProps {
  undo: (undoPoint: string) => void;
  canUndo: boolean;
}
const UndoButton: React.FC<IUndoButtonProps> = ({ undo, canUndo }) => {
  const { roomId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleUndoButtonClick() {
    setIsLoading(true);
    socket.emit("get-last-undo-point", roomId);
  }
  const isMac = isMacOs();
  const hotKey = `${isMac ? "Meta" : "Ctrl"}+z`;

  useHotkeys(hotKey, handleUndoButtonClick);

  useEffect(() => {
    socket.on("last-undo-point-from-server", (undoPoint) => {
      undo(undoPoint);
      socket.emit("undo",{
        canvasState: undoPoint,
        roomId: roomId
      })

      socket.emit("delete-last-undo-point", roomId);
      setIsLoading(false)
    })

    
    
    return () => {
      socket.off("last-undo-point-from-server");
    }
  }, [roomId, undo])

  return (
    <TooltipWrapper content="Undo" align="center" side="bottom">
      <Button variant="outline" size="icon" onClick={handleUndoButtonClick} disabled={!canUndo}>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Undo className="h-4 w-4" />
        )}
      </Button>
    </TooltipWrapper>
  );
};

export default UndoButton;
