import JoinRoomForm from "@/components/forms/JoinRoomForm";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
          Welcome to MeetNest
        </h1>
        <p className="text-zinc-600 dark:text-zinc-300">
          Join or create a video room instantly.
        </p>
        <JoinRoomForm />
      </div>
    </div>
  );
}
