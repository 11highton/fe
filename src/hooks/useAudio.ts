import { useRef, useCallback, useState } from 'react';
import axios, { type AxiosRequestConfig } from 'axios';

interface UseStreamingAudioOptions {
  onLoadStart?: () => void;
  onCanPlay?: () => void;
  onError?: (error: Error) => void;
  onEnded?: () => void;
}

interface UseStreamingAudioReturn {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isLoading: boolean;
  isPlaying: boolean;
  error: string | null;
  timeline: number;
  isMuted: boolean;
  volume: number;
  startStreaming: (url: string, config?: AxiosRequestConfig) => Promise<void>;
  startStreamingByPostId: (postId: string, config?: AxiosRequestConfig) => Promise<void>;
  startRealTimeStreaming: (url: string, config?: AxiosRequestConfig) => Promise<void>;
  play: () => void;
  pause: () => void;
  stop: () => void;
  setTimeline: (timeline: number) => void;
  setMuted: (isMuted: boolean) => void;
  setVolume: (volume: number) => void;
  setupEventListeners: () => void;
  cleanup: () => void;
}

export const useStreamingAudio = (options: UseStreamingAudioOptions = {}): UseStreamingAudioReturn => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentSourceRef = useRef<string | null>(null);
  const [timeline, setTimeline] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setStVolume] = useState(1);

  const startStreaming = useCallback(async (url: string, config: AxiosRequestConfig = {}) => {
    if (!audioRef.current) {
      throw new Error('Audio element not found');
    }

    setIsLoading(true);
    setError(null);
    options.onLoadStart?.();

    try {
      // 이전 소스 정리
      if (currentSourceRef.current) {
        URL.revokeObjectURL(currentSourceRef.current);
        currentSourceRef.current = null;
      }

      // axios로 스트림 요청 (브라우저에서는 responseType을 'blob'으로 사용)
      const response = await axios({
        ...config,
        url,
        method: 'GET',
        responseType: 'blob', // 브라우저에서는 blob 사용
        headers: {
          'Accept': 'audio/mpeg',
          'Range': 'bytes=0-', // Range 헤더 추가
          ...config.headers,
        },
      });

      // Blob을 Object URL로 변환
      const blob = response.data;
      const audioUrl = URL.createObjectURL(blob);
      
      // audio element에 소스 설정
      audioRef.current.src = audioUrl;
      currentSourceRef.current = audioUrl;
      
      setIsLoading(false);
      options.onCanPlay?.();

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load audio stream';
      setError(errorMessage);
      setIsLoading(false);
      options.onError?.(new Error(errorMessage));
    }
  }, [options]);

  // postId로 직접 스트리밍하는 편의 메서드
  const startStreamingByPostId = useCallback(async (postId: string, config: AxiosRequestConfig = {}) => {
    const streamUrl = `/audio/stream/${postId}`;
    return startStreaming(streamUrl, config);
  }, [startStreaming]);

  // 실시간 스트리밍용 (MediaSource API 사용)
  const startRealTimeStreaming = useCallback(async (url: string, config: AxiosRequestConfig = {}) => {
    if (!audioRef.current) {
      throw new Error('Audio element not found');
    }

    if (!MediaSource.isTypeSupported('audio/mpeg')) {
      throw new Error('MediaSource not supported for audio/mpeg');
    }

    setIsLoading(true);
    setError(null);
    options.onLoadStart?.();

    try {
      const mediaSource = new MediaSource();
      const objectUrl = URL.createObjectURL(mediaSource);
      
      if (currentSourceRef.current) {
        URL.revokeObjectURL(currentSourceRef.current);
      }
      
      audioRef.current.src = objectUrl;
      currentSourceRef.current = objectUrl;

      mediaSource.addEventListener('sourceopen', async () => {
        const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
        
        const response = await axios({
          ...config,
          url,
          method: 'GET',
          responseType: 'stream',
          headers: {
            'Accept': 'audio/*',
            ...config.headers,
          },
        });

        const reader = response.data.getReader();

        const pump = async (): Promise<void> => {
          const { done, value } = await reader.read();
          
          if (done) {
            if (mediaSource.readyState === 'open') {
              mediaSource.endOfStream();
            }
            setIsLoading(false);
            return;
          }

          if (sourceBuffer.updating) {
            await new Promise(resolve => {
              sourceBuffer.addEventListener('updateend', resolve, { once: true });
            });
          }

          try {
            sourceBuffer.appendBuffer(value);
            await pump();
          } catch (err) {
            console.error('Error appending buffer:', err);
            setError('Error during streaming');
            setIsLoading(false);
          }
        };

        await pump();
      });

      options.onCanPlay?.();

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start real-time streaming';
      setError(errorMessage);
      setIsLoading(false);
      options.onError?.(new Error(errorMessage));
    }
  }, [options]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  const setMuted = useCallback((isMuted: boolean) => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      setIsMuted(isMuted);
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      setStVolume(volume);
    }
  }, []);

  // audio element 이벤트 리스너 설정
  const setupEventListeners = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      options.onEnded?.();
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [options]);

  // cleanup
  const cleanup = useCallback(() => {
    if (currentSourceRef.current) {
      URL.revokeObjectURL(currentSourceRef.current);
      currentSourceRef.current = null;
    }
  }, []);

  return {
    audioRef,
    isLoading,
    isPlaying,
    isMuted,
    volume,
    error,
    timeline,
    startStreaming,
    startStreamingByPostId, // postId로 직접 스트리밍
    startRealTimeStreaming, // 실시간 스트리밍용
    play,
    pause,
    stop,
    setTimeline,
    setMuted,
    setVolume,
    setupEventListeners,
    cleanup,
  };
};