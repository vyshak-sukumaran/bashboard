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
import { nanoid } from "nanoid";
import { z } from "zod";
import { createRoomSchema } from "@/lib/validations/room";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { socket } from "@/lib/socket";
import { Loader2 } from "lucide-react";

type CreateFormProps = {
  handleJoinForm: () => void;
};

type CreateRoomForm = z.infer<typeof createRoomSchema>;
const CreateForm: React.FC<CreateFormProps> = ({ handleJoinForm }) => {
  const roomId = nanoid();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    const handleRoomNotFound = () => {
      setIsLoading(false);
    };
    socket.on("room-not-found", handleRoomNotFound);
    return () => {
      socket.off("room-not-found");
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
            <Button type="submit" className="w-full">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Create Room"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <CardDescription>OR</CardDescription>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleJoinForm}
          disabled={isLoading}
        >
          Join Room
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateForm;
