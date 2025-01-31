import { Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import SocialButton from "@/components/SocialButton";

interface Firework {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const Index = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [audio] = useState(new Audio('/firework-sound.wav'));

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setTrails(prev => [
        { x: e.clientX, y: e.clientY, id: Date.now() },
        ...prev.slice(0, 5),
      ]);
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  const createFirework = (x: number, y: number) => {
    const emojis = ['✨', '🌟', '💫', '⭐'];
    
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
    createFirework(e.clientX, e.clientY);
  };

  return (
    <div className="h-screen w-full fixed inset-0 overflow-hidden" onClick={handleClick}>
      {/* Custom Cursor */}
      <div
        className="custom-cursor"
        style={{
          left: `${cursorPosition.x - 15}px`,
          top: `${cursorPosition.y - 15}px`,
        }}
      />
      
      {/* Cursor Trails */}
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
          backgroundImage: `url('/lovable-uploads/c4f01bc7-98d3-46ee-9b80-54505deb6ec6.png')`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end p-6 md:p-12">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 mb-8 mt-24 md:mt-24">
          <div className="flex flex-wrap justify-center gap-4">
            <SocialButton
              icon={Twitter}
              href="https://x.com/fuglyfam"
              label="Twitter"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;