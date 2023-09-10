import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { socket } from "@/lib/socket";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

const LeaveButton: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  function handleLeaveRoom() {
    setIsLoading(true);
    socket.emit("leave-room");
    setTimeout(() => {
        navigate("/", { replace: true });
        
    }, 300)
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Leaving Room</DialogTitle>
            <DialogDescription>Are you sure you want to leave the room ?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
            <Button variant="secondary">
              Cancel
            </Button>
            </DialogClose>
            <Button onClick={handleLeaveRoom} type="submit">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Leave"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LeaveButton;
