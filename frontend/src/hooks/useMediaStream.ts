// src/hooks/useMediaStream.ts
import { useEffect, useState, useCallback } from "react";

export function useMediaStream() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startStream = useCallback(async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(media);
    } catch (err) {
      console.error(err);
      setError("Could not access camera or microphone");
    }
  }, []);

  const stopVideo = useCallback(() => {
    if (!stream) return;
    stream.getVideoTracks().forEach((track) => track.stop());
    setStream((prev) => {
      const newStream = new MediaStream(prev?.getAudioTracks() || []);
      return newStream;
    });
  }, [stream]);

  const startVideo = useCallback(async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoTrack = media.getVideoTracks()[0];
      if (stream) {
        stream.addTrack(videoTrack);
        setStream(new MediaStream([...stream.getAudioTracks(), videoTrack]));
      }
    } catch (err) {
      console.error("Failed to start video:", err);
    }
  }, [stream]);

  useEffect(() => {
    startStream();
    return () => stream?.getTracks().forEach((track) => track.stop());
  }, [startStream]);

  return { stream, error, startVideo, stopVideo };
}
