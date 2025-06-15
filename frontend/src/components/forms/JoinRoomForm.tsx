import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateRoomId } from "@/lib/generateRoomId";

export default function JoinRoomForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");

  const handleJoin = () => {
    if (!name || !roomId) return;
    navigate(`/room/${roomId}?name=${encodeURIComponent(name)}`);
  };

  const handleCreateRoom = () => {
    if (!name) return;
    const newRoomId = generateRoomId();
    navigate(`/room/${newRoomId}?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="max-w-md w-full space-y-4">
      <Input
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Room ID (if joining)"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <div className="flex gap-2">
        <Button className="w-full" onClick={handleJoin}>
          Join Room
        </Button>
        <Button variant="secondary" className="w-full" onClick={handleCreateRoom}>
          Create Room
        </Button>
      </div>
    </div>
  );
}
