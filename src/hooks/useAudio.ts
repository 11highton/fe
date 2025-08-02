export interface IAudioHandlers {
    onDeviceChange?: () => void;
    onError?: (error: Error) => void;
    onConnect?: () => void;
    onDisconnect?: () => void;
    onStreamChange?: (stream: MediaStream) => void;
    onCapabilitiesChange?: (capabilities: MediaTrackCapabilities) => void;
    
    onPlay?: () => void;
    onPause?: () => void;
    onEnded?: () => void;
    
    onVolumeChange?: (volume: number) => void;
    onMuteChange?: (isMuted: boolean) => void;
    
    onOutputDeviceChange?: (deviceId: string) => void;
}

export default class AudioService {
  private readonly elementHandlers = new Map<HTMLMediaElement, { handlers: Partial<IAudioHandlers>; cleanup: () => void }>();
  private readonly deviceChangeListeners = new Set<() => void>();

  constructor() {
    if (navigator.mediaDevices) {
      if ('addEventListener' in navigator.mediaDevices) {
        navigator.mediaDevices.addEventListener('devicechange', this.handleDeviceChange);
      }
      navigator.mediaDevices.ondevicechange = this.handleDeviceChange;
    }
  }

  async listOutputs(): Promise<MediaDeviceInfo[]> {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((d) => d.kind === 'audiooutput');
  }

  async getStream(
    element: HTMLMediaElement,
    deviceId?: string,
    handlers: Partial<IAudioHandlers> = {}
  ): Promise<MediaStream> {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    if (deviceId) await this.setOutputDevice(element, deviceId);

    this.registerElement(element, handlers);
    handlers.onStreamChange?.(stream);
    handlers.onConnect?.();

    element.srcObject = stream;
    return stream;
  }

  stopStream(stream: MediaStream): void {
    stream.getTracks().forEach((t) => t.stop());
  }

  async setOutputDevice(element: HTMLMediaElement, deviceId: string): Promise<void> {
    if ('setSinkId' in element) {
      await (element as any).setSinkId(deviceId);
      this.elementHandlers.get(element)?.handlers.onOutputDeviceChange?.(deviceId);
    } else {
      console.warn('오디오 장치 선택을 지원하지 않는 브라우저입니다.');
    }
  }

  async play(element: HTMLMediaElement): Promise<void> {
    await element.play();
    this.elementHandlers.get(element)?.handlers.onPlay?.();
  }

  pause(element: HTMLMediaElement): void {
    element.pause();
    this.elementHandlers.get(element)?.handlers.onPause?.();
  }

  stop(element: HTMLMediaElement): void {
    element.pause();
    element.currentTime = 0;
    this.elementHandlers.get(element)?.handlers.onEnded?.();
  }

  getVolume(element: HTMLMediaElement): number {
    return element.volume;
  }

  setVolume(element: HTMLMediaElement, volume: number): void {
    element.volume = Math.max(0, Math.min(1, volume));
    this.elementHandlers.get(element)?.handlers.onVolumeChange?.(element.volume);
  }

  isMuted(element: HTMLMediaElement): boolean {
    return element.muted;
  }

  setMuted(element: HTMLMediaElement, muted: boolean): void {
    element.muted = muted;
    this.elementHandlers.get(element)?.handlers.onMuteChange?.(muted);
  }

  async getCapabilities(constraints?: MediaTrackConstraints): Promise<MediaTrackCapabilities | null> {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: constraints || true });
    const [track] = stream.getAudioTracks();
    const caps = track?.getCapabilities ? track.getCapabilities() : null;
    track.stop();
    return caps;
  }

  onDeviceChange(callback: () => void): () => void {
    this.deviceChangeListeners.add(callback);
    return () => this.deviceChangeListeners.delete(callback);
  }

  private handleDeviceChange = (): void => {
    this.deviceChangeListeners.forEach((cb) => cb());
    this.elementHandlers.forEach(({ handlers }) => handlers.onDeviceChange?.());
  };

  private registerElement(element: HTMLMediaElement, handlers: Partial<IAudioHandlers>): void {
    this.dispose(element);

    const onPlay = () => handlers.onPlay?.();
    const onPause = () => handlers.onPause?.();
    const onEnded = () => handlers.onEnded?.();
    const onVolumeChange = () => {
      handlers.onVolumeChange?.(element.volume);
      handlers.onMuteChange?.(element.muted);
    };

    element.addEventListener('play', onPlay);
    element.addEventListener('pause', onPause);
    element.addEventListener('ended', onEnded);
    element.addEventListener('volumechange', onVolumeChange);

    const _cleanup = () => {
      element.removeEventListener('play', onPlay);
      element.removeEventListener('pause', onPause);
      element.removeEventListener('ended', onEnded);
      element.removeEventListener('volumechange', onVolumeChange);
    };

    this.elementHandlers.set(element, { handlers, cleanup: _cleanup });
  }

  dispose(element: HTMLMediaElement): void {
    this.elementHandlers.get(element)?.cleanup();
    this.elementHandlers.delete(element);
  }
}