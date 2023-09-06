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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { canvasSocket as socket } from "@/lib/socket";
import { joinRoomSchema } from "@/lib/validations/room";
import { z } from "zod";
import { Loader2 } from "lucide-react";

type JoinFormProps = {
  handleCreateForm: () => void;
};

type JoinRoomForm = z.infer<typeof joinRoomSchema>;

const JoinForm: React.FC<JoinFormProps> = ({ handleCreateForm }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<JoinRoomForm>({
    resolver: zodResolver(joinRoomSchema),
    defaultValues: {
      username: "",
      roomId: "",
    },
  });
  const onSubmit = ({ username, roomId }: JoinRoomForm) => {
    setIsLoading(true);
    socket.emit("join-room", { username, roomId });
  };

  useEffect(() => {
    const handleRoomNotFound = () => {
      setIsLoading(false);
    };
    socket.on("room-not-found", handleRoomNotFound);
    return () => {
      socket.off("room-not-found", handleRoomNotFound);
    }
  }, []);
  return (
    <Card className="w-[400px] mt-10 mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Join A Room</CardTitle>
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
            <FormField
              control={form.control}
              name="roomId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter room ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 7fcd8a8b-8f7d-4f3e-a3a1-1b77b07e3f7d"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Join Room"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <CardDescription>OR</CardDescription>
        <Button variant="outline" className="w-full" onClick={handleCreateForm}>
          Create Room
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JoinForm;
