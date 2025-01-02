import { Music4, Music } from "lucide-react";
import { useEffect, useRef } from "react";

interface MusicControllerProps {
  isMusicOn: boolean;
  onToggleMusic: (e: React.MouseEvent) => void;
}

const MusicController = ({ isMusicOn, onToggleMusic }: MusicControllerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element only once
    if (!audioRef.current) {
      audioRef.current = new Audio('/Wii Music - Rate Your Vid.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }

    // Play or pause based on isMusicOn state
    if (isMusicOn) {
      audioRef.current.play().catch(err => console.log('Audio playback failed:', err));
    } else {
      audioRef.current.pause();
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isMusicOn]);

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