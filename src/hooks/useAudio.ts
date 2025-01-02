import { useState, useEffect, useRef } from 'react';

interface AudioOptions {
  loop?: boolean;
  volume?: number;
}

export const useAudio = (src: string, options: AudioOptions = {}) => {
  const [audio] = useState(new Audio(src));
  const [isPlaying, setIsPlaying] = useState(false);
  const hasInitialized = useRef(false);

  useEffect(() => {
    audio.loop = options.loop ?? false;
    audio.volume = options.volume ?? 1;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio, options.loop, options.volume]);

  const play = () => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
    }

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.log("Playback prevented:", error);
          setIsPlaying(false);
        });
    }
  };

  const pause = () => {
    audio.pause();
    setIsPlaying(false);
  };

  return { play, pause, isPlaying };
};