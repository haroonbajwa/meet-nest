import { useParams, useSearchParams } from "react-router-dom";
import { useMediaStream } from "@/hooks/useMediaStream";
import VideoPlayer from "@/components/VideoPlayer";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AvatarFallback } from "@/components/AvatarFallback";

export default function Room() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "Guest";
  const { stream, error, startVideo, stopVideo } = useMediaStream();

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);

  const toggleMic = () => {
    stream?.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setIsMicOn(track.enabled);
    });
  };

  const toggleCam = () => {
    if (isCamOn) {
      stopVideo();
      setIsCamOn(false);
    } else {
      startVideo();
      setIsCamOn(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-zinc-950 text-white flex flex-col items-center justify-between p-6 overflow-hidden">
      <header className="w-full flex justify-between items-center text-sm text-zinc-400">
        <span>Room ID: {id}</span>
        <span>User: {name}</span>
      </header>

      <main className="flex-grow flex items-center justify-center">
        {error && <p className="text-red-500">{error}</p>}

        {stream ? (
          <div className="relative w-full max-w-[720px] bg-zinc-900 rounded-xl shadow-xl overflow-hidden">
            {isCamOn ? (
              <VideoPlayer stream={stream} muted />
            ) : (
              <AvatarFallback name={name} />
            )}

            <div className="absolute bottom-2 left-2 text-xs bg-black/60 px-2 py-1 rounded text-white">
              You ({name})
            </div>
          </div>
        ) : (
          <p className="text-zinc-400">Loading camera preview...</p>
        )}
      </main>

      <footer className="flex flex-wrap gap-4 p-4 bg-zinc-900 rounded-xl shadow-md mt-6">
        <Button
          variant={isMicOn ? "default" : "outline"}
          onClick={toggleMic}
          className="flex items-center gap-2"
        >
          {isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
          Mic
        </Button>

        <Button
          variant={isCamOn ? "default" : "outline"}
          onClick={toggleCam}
          className="flex items-center gap-2"
        >
          {isCamOn ? <Video size={18} /> : <VideoOff size={18} />}
          Camera
        </Button>

        <Button
          variant="destructive"
          className="flex items-center gap-2"
          onClick={() => (window.location.href = "/")}
        >
          <PhoneOff size={18} />
          Leave
        </Button>
      </footer>
    </div>
  );
}
