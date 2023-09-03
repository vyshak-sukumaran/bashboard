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

type JoinFormProps = {
  handleCreateForm: () => void;
};

const JoinForm: React.FC<JoinFormProps> = ({ handleCreateForm }) => {
  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Joining room");
  };
  return (
    <Card className="w-[400px] mt-10 mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Join A Room</CardTitle>
        <CardDescription className="text-center">
          Collab with your friends.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="joinRoomForm" onSubmit={handleJoinRoom}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Enter your name</Label>
              <Input id="name" placeholder="e.g. Alex Paul" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="roomId">Enter room ID</Label>
              <Input
                id="roomId"
                placeholder="e.g. 7fcd8a8b-8f7d-4f3e-a3a1-1b77b07e3f7d"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full" form="joinRoomForm">
          Join Room
        </Button>
        <CardDescription>or</CardDescription>
        <Button variant="outline" className="w-full" onClick={handleCreateForm}>
          Create Room
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JoinForm;
