import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { nanoid } from 'nanoid'
import CopyButton from "../copy-button";

type CreateFormProps = {
  handleJoinForm: () => void;
};
const CreateForm: React.FC<CreateFormProps> = ({ handleJoinForm }) => {
  const roomId = nanoid();
  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Create room");
  };

  return (
    <Card className="w-[400px] mt-10 mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Create A Room</CardTitle>
        <CardDescription className="text-center">
          Collab with your friends.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="joinRoomForm" onSubmit={handleCreateRoom}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Enter your name</Label>
              <Input id="name" placeholder="e.g. Alex Paul" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Room ID</Label>
              <div className="w-full flex items-center justify-between border rounded-md h-10 p-0.5 pl-2.5">
                <span className="block flex-grow text-sm">{roomId}</span>
                <CopyButton value={roomId} />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full" form="joinRoomForm">
          Create Room
        </Button>
        <CardDescription>OR</CardDescription>
        <Button variant="outline" className="w-full" onClick={handleJoinForm}>
          Join Room
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateForm;
