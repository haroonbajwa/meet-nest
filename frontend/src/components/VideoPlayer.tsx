// src/components/VideoPlayer.tsx
import { useEffect, useRef } from "react";

interface Props {
  stream: MediaStream;
  muted?: boolean;
}

export default function VideoPlayer({ stream, muted = false }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted={muted}
      className="w-full h-full object-cover rounded-xl transform scale-x-[-1]"
    />
  );
}
