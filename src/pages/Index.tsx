import { Twitter, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import SocialButton from "@/components/SocialButton";
import ContractAddress from "@/components/ContractAddress";

interface Firework {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const Index = () => {
  const contractAddress = "0x1234567890123456789012345678901234567890";
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);
  const [fireworks, setFireworks] = useState<Firework[]>([]);

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
    const emojis = ['✨', '🌟', '💫', '⭐', '🎆', '🎇', '🌠'];
    
    const newFireworks = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 200,
      y: y + (Math.random() - 0.5) * 200,
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    }));

    setFireworks(prev => [...prev, ...newFireworks]);
    setTimeout(() => {
      setFireworks(prev => prev.filter(fw => !newFireworks.includes(fw)));
    }, 800);
  };

  const handleClick = (e: React.MouseEvent) => {
    createFirework(e.clientX, e.clientY);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" onClick={handleClick}>
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

      {/* Title GIF */}
      <div className="absolute top-0 left-0 w-full flex justify-center pt-20">
        <img 
          src="/text.gif" 
          alt="Title GIF" 
          className="max-w-[90%] md:max-w-[70%] lg:max-w-[60%] h-auto"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-end p-6 md:p-12">
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