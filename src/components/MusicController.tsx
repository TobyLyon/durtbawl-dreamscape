import { Music4, Music } from "lucide-react";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { createAudioElement } from "@/utils/audioUtils";

interface MusicControllerProps {
  isStarted: boolean;
  isMusicOn: boolean;
  onToggleMusic: (e: React.MouseEvent) => void;
}

const MusicController = ({ isStarted, isMusicOn, onToggleMusic }: MusicControllerProps) => {
  const { toast } = useToast();
  const bgMusicRef = useRef(createAudioElement('/Wii Music - Rate Your Vid.mp3'));

  useEffect(() => {
    const bgMusic = bgMusicRef.current;
    
    const playMusic = async () => {
      if (isStarted && isMusicOn) {
        try {
          const playPromise = bgMusic.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
        } catch (err) {
          console.error('Background music playback failed:', err);
          toast({
            title: "Music Playback Failed",
            description: "Please interact with the page to enable music",
            duration: 5000,
          });
        }
      } else {
        bgMusic.pause();
      }
    };

    playMusic();

    return () => {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    };
  }, [isStarted, isMusicOn, toast]);

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