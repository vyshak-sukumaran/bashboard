import React, { useEffect, useState } from "react";
import { ReactComponent as Logo } from "@/assets/Bashboard.svg";
import JoinForm from "@/components/home/join-form";
import { Forms } from "@/lib/enums";
import CreateForm from "@/components/home/create-form";
import SwitchTheme from "@/components/switch-theme";
import { type IRoomJoinedData } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/user-store";
import { useMembersStore } from "@/stores/members-store";
import { canvasSocket as socket } from "@/lib/socket";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CopyButton from "@/components/copy-button";

const Home: React.FC = () => {
  const [currentForm, setCurrentForm] = useState<Forms>(Forms.Join);
  const [roomKey, setRoomKey] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const setUser = useUserStore((state) => state.setUser);
  const setMembers = useMembersStore((state) => state.setMembers);

  const handleCreateForm = () => {
    setCurrentForm(Forms.Create);
  };
  const handleJoinForm = () => {
    setCurrentForm(Forms.Join);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate(`/${roomKey}`);
  }

  useEffect(() => {
    console.log("loopin'");
    
    const handleRoomJoined = ({ user, members, roomId }: IRoomJoinedData) => {
      setUser(user);
      setMembers(members);
      console.log(roomId, "roomId");
      if (currentForm === Forms.Join) {
        navigate(`/${roomId}`);
        return;
      }
      setRoomKey(roomId);
      setOpenDialog(true);
    };
    const handleErrorMessage = ({ message }: { message: string }) => {
      toast({
        title: "Failed to join room",
        description: message,
      });
    };

    socket.on("room-joined", handleRoomJoined);
    socket.on("room-not-found", handleErrorMessage);
    socket.on("invalid-data", handleErrorMessage);

    return () => {
      socket.off("room-joined", handleRoomJoined);
      socket.off("room-not-found", handleErrorMessage);
      socket.off("invalid-data", handleErrorMessage);
    };
  }, [currentForm]);
  return (
    <div className="h-full w-full">
      <nav className="flex justify-between items-center p-4">
        <Logo className="fill-black dark:fill-slate-100 h-5" />
        <SwitchTheme />
      </nav>
      <main>
        {currentForm === Forms.Join ? (
          <JoinForm handleCreateForm={handleCreateForm} />
        ) : currentForm === Forms.Create ? (
          <CreateForm handleJoinForm={handleJoinForm} />
        ) : null}

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Copy Room ID</DialogTitle>
              <DialogDescription>
                Copy room ID and hit continue
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-1.5">
              <div className="w-full flex items-center justify-between border rounded-md h-10 p-0.5 pl-2.5">
                <span className="block flex-grow text-sm">{roomKey}</span>
                <CopyButton value={roomKey} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCloseDialog} type="submit">Continue</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Home;
