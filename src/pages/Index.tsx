import { Twitter, Globe, Music, Music4 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import SocialButton from "@/components/SocialButton";
import ContractAddress from "@/components/ContractAddress";
import { useToast } from "@/components/ui/use-toast";

interface Firework {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const Index = () => {
  const { toast } = useToast();
  const contractAddress = "0x1234567890123456789012345678901234567890";
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [audio] = useState(new Audio('/firework-sound.wav'));
  const bgMusicRef = useRef(new Audio('/Wii Music - Rate Your Vid.mp3'));
  const [isStarted, setIsStarted] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(true);

  useEffect(() => {
    const bgMusic = bgMusicRef.current;
    bgMusic.volume = 0.5;
    bgMusic.loop = true;
    
    const playMusic = async () => {
      if (isStarted && isMusicOn) {
        try {
          await bgMusic.play();
        } catch (err) {
          console.log('Background music playback failed:', err);
          toast({
            title: "Music Playback Failed",
            description: "Please click anywhere to enable music playback",
            duration: 3000,
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

  useEffect(() => {
    if (!isStarted) return;

    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      setTrails(prev => [
        { x: e.clientX, y: e.clientY, id: Date.now() },
        ...prev.slice(0, 5),
      ]);
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, [isStarted]);

  const createFirework = (x: number, y: number) => {
    const emojis = ['✨', '🌟', '💫', '⭐', '🎆', '🎇', '🌠'];
    
    const newFireworks = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 200,
      y: y + (Math.random() - 0.5) * 200,
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    }));

    setFireworks(prev => [...prev, ...newFireworks]);
    
    audio.currentTime = 0;
    audio.play().catch(err => console.log('Audio playback failed:', err));
    
    setTimeout(() => {
      setFireworks(prev => prev.filter(fw => !newFireworks.includes(fw)));
    }, 800);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isStarted) return;
    createFirework(e.clientX, e.clientY);
    
    // Try to resume music if it was interrupted
    if (isMusicOn && bgMusicRef.current.paused) {
      bgMusicRef.current.play().catch(err => console.log('Music resume failed:', err));
    }
  };

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent firework creation
    setIsMusicOn(!isMusicOn);
  };

  const handleStart = async () => {
    setIsStarted(true);
    // Pre-load audio context
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    await audioContext.resume();
  };

  if (!isStarted) {
    return (
      <div 
        className="h-screen w-full fixed inset-0 flex items-center justify-center bg-black"
        style={{
          backgroundImage: `url('/lovable-uploads/48af7768-67d7-4f6a-bcd2-42a710962483.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }}
      >
        <button
          onClick={handleStart}
          className="press-start text-4xl md:text-6xl text-white font-bold tracking-wider cursor-pointer"
        >
          PRESS START
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full fixed inset-0 overflow-hidden" onClick={handleClick}>
      {/* Music Toggle Button */}
      <button
        onClick={toggleMusic}
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

      {/* Custom Cursor */}
      <div
        className="custom-cursor"
        style={{
          left: `${cursorPosition.x - 15}px`,
          top: `${cursorPosition.y - 15}px`,
        }}
      />
      
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: `${trail.x - 5}px`,
            top: `${trail.y - 5}px`,
            opacity: 1 - (index * 0.15),
          }}
        />
      ))}

      {/* Fireworks */}
      {fireworks.map(firework => (
        <div
          key={firework.id}
          className="firework"
          style={{
            left: `${firework.x}px`,
            top: `${firework.y}px`,
          }}
        >
          {firework.emoji}
        </div>
      ))}

      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/48af7768-67d7-4f6a-bcd2-42a710962483.png')`,
        }}
      />

      {/* Title GIF */}
      <div className="absolute top-4 left-0 w-full flex justify-center">
        <img 
          src="/text.gif" 
          alt="Title GIF" 
          className="max-w-[135%] md:max-w-[105%] lg:max-w-[90%] h-auto"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end p-6 md:p-12">
        {/* Social Links & Contract Address */}
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 mb-8">
          <ContractAddress address={contractAddress} />
          
          <div className="flex flex-wrap justify-center gap-4">
            <SocialButton
              icon={Twitter}
              href="https://twitter.com/durtbawl"
              label="Twitter"
            />
            <SocialButton
              icon={Globe}
              href="https://durtbawl.com"
              label="Website"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
