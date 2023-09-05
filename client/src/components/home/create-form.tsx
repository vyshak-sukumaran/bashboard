import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { nanoid } from "nanoid";
import CopyButton from "../copy-button";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/user-store";
import { useMembersStore } from "@/stores/members-store";
import { z } from "zod";
import { createRoomSchema } from "@/lib/validations/create-room";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { canvasSocket as socket } from "@/lib/socket";
import { type IRoomJoinedData } from "@/types";
import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";

type CreateFormProps = {
  handleJoinForm: () => void;
};

type CreateRoomForm = z.infer<typeof createRoomSchema>;
const CreateForm: React.FC<CreateFormProps> = ({ handleJoinForm }) => {
  const roomId = nanoid();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setUser = useUserStore((state) => state.setUser);
  const setMembers = useMembersStore((state) => state.setMembers);

  const form = useForm<CreateRoomForm>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = ({ username }: CreateRoomForm) => {
    if (isLoading) return;
    setIsLoading(true);
    socket.emit("create-room", { roomId, username });
  };

  useEffect(() => {
    const handleRoomJoined = ({ user, members, roomId }: IRoomJoinedData) => {
      setUser(user);
      setMembers(members);
      navigate(`/${roomId}`);
    };
    const handleErrorMessage = ({ message }: { message: string }) => {
      toast({
        title: "Failed to join room",
        description: message,
      });
    }

    socket.on("room-joined", handleRoomJoined);
    socket.on("room-not-found", handleErrorMessage);
    socket.on("invalid-data", handleErrorMessage);

    return () => {
      socket.off("room-joined", handleRoomJoined);
      socket.off("room-not-found", handleErrorMessage);
      socket.off("invalid-data", handleErrorMessage);
    };
  }, []);

  return (
    <Card className="w-[400px] mt-10 mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Create A Room</CardTitle>
        <CardDescription className="text-center">
          Collab with your friends.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 grid w-full items-center"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Alex Paul" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col space-y-1.5">
              <Label>Room ID</Label>
              <div className="w-full flex items-center justify-between border rounded-md h-10 p-0.5 pl-2.5">
                <span className="block flex-grow text-sm">{roomId}</span>
                <CopyButton value={roomId} />
              </div>
            </div>
            <Button type="submit" className="w-full">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Room"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <CardDescription>OR</CardDescription>
        <Button variant="outline" className="w-full" onClick={handleJoinForm} disabled={isLoading}>
          Join Room
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateForm;
