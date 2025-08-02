import { useEffect, useRef, useState, useCallback } from "react";

export function useAudio(setTimeline: (v: number) => void) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Blob을 받아서 오디오 태그에 붙이기
  const loadBlob = useCallback((blob: Blob) => {
    const url = URL.createObjectURL(blob);

    if (audioRef.current) {
      // 기존 소스 정리
      if (audioRef.current.src) {
        URL.revokeObjectURL(audioRef.current.src);
      }
      audioRef.current.src = url;
    }
  }, []);

  // 안전한 play
  const play = useCallback(async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("Audio play failed:", err);
    }
  }, []);

  // 안전한 pause
  const pause = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  // 음소거 토글
  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  }, []);

  const setTime = useCallback((ms: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = ms / 1000;
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setTimeline(audio.currentTime * 1000);
    };
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      if (audioRef.current?.src) {
        URL.revokeObjectURL(audioRef.current.src);
      }
    };
  }, []);

  return {
    audioRef,
    isPlaying,
    isMuted,
    loadBlob,
    play,
    pause,
    toggleMute,
    setTime,
  };
}
