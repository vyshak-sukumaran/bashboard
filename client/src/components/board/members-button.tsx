import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Users2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMembersStore } from "@/stores";
import { useToast } from "../ui/use-toast";
import { socket } from "@/lib/socket";

const MembersButton: React.FC = () => {
  const [members, setMembers] = useMembersStore((state) => [
    state.members,
    state.setMembers,
  ]);
  const { toast } = useToast();
  useEffect(() => {
    socket.on("update-members", (members) => {
      setMembers(members);
    });

    socket.on("send-notification", ({ message, title }) => {
      toast({
        title,
        description: message,
      });
    });

    return () => {
      socket.off("update-members");
      socket.off("send-notification");
    };
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <Users2 className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Members</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {members.filter(({ id }) => id !== socket.id).map(({ id, username }) => (
          <DropdownMenuItem key={id} className="flex gap-2 items-center">
            <span>{username}</span>
          </DropdownMenuItem>
        ))}

        <DropdownMenuItem className="flex gap-2 items-center">
          <span>You</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MembersButton;
