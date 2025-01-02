import { Music4, Music } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MusicControllerProps {
  isStarted: boolean;
  isMusicOn: boolean;
  onToggleMusic: (e: React.MouseEvent) => void;
}

const MusicController = ({ isStarted, isMusicOn, onToggleMusic }: MusicControllerProps) => {
  const [audio] = useState(new Audio('/Wii Music - Rate Your Vid.mp3'));
  const hasInitialized = useRef(false);

  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.5;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  useEffect(() => {
    if (!hasInitialized.current && isStarted && isMusicOn) {
      hasInitialized.current = true;
    }

    if (isStarted && isMusicOn) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Playback prevented:", error);
        });
      }
    } else {
      audio.pause();
    }
  }, [isStarted, isMusicOn, audio]);

  return (
    <button
      onClick={onToggleMusic}
      className="fixed top-4 right-4 z-50 p-4 rounded-full hover:scale-110 transition-transform duration-200 bg-white/10 backdrop-blur-sm border-2 border-white/20"
      style={{
        background: isMusicOn ? '#E5DEFF' : '#FFDEE2',
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
      }}
    >
      {isMusicOn ? (
        <Music4 className="w-8 h-8 text-[#9b87f5] animate-bounce" />
      ) : (
        <Music className="w-8 h-8 text-[#403E43]" />
      )}
    </button>
  );
};

export default MusicController;