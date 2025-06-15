import { useParams } from "react-router-dom";

export default function Room() {
  const { id } = useParams();

  return (
    <div className="h-screen flex items-center justify-center">
      <h2 className="text-3xl font-semibold">Room ID: {id}</h2>
    </div>
  );
}
