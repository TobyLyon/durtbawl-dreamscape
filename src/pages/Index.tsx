import { Twitter, Globe } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import SocialButton from "@/components/SocialButton";
import ContractAddress from "@/components/ContractAddress";

interface Firework {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const Index = () => {
  const contractAddress = "0x2aBedBB669C4d6C4e14721dE8e67Dfe69B713630";
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [audio] = useState(new Audio('/firework-sound.wav'));
  const [isDragging, setIsDragging] = useState(false);
  const [titlePosition, setTitlePosition] = useState({ x: 0, y: 0 });
  const titleRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0, elemX: 0, elemY: 0 });

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      if (isDragging && titleRef.current) {
        const dx = e.clientX - dragStartPos.current.x;
        const dy = e.clientY - dragStartPos.current.y;
        
        setTitlePosition({
          x: dragStartPos.current.elemX + dx,
          y: dragStartPos.current.elemY + dy,
        });
      }

      setTrails(prev => [
        { x: e.clientX, y: e.clientY, id: Date.now() },
        ...prev.slice(0, 5),
      ]);
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (titleRef.current) {
      setIsDragging(true);
      const rect = titleRef.current.getBoundingClientRect();
      dragStartPos.current = {
        x: e.clientX,
        y: e.clientY,
        elemX: titlePosition.x,
        elemY: titlePosition.y,
      };
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
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
    if (!isDragging) {
      createFirework(e.clientX, e.clientY);
    }
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
          backgroundImage: `url('/DURTBAWL.png')`,
        }}
      />

      {/* Title GIF Container */}
      <div 
        ref={titleRef}
        className="absolute top-4 left-0 w-full flex flex-col items-center cursor-move"
        style={{
          transform: `translate(${titlePosition.x}px, ${titlePosition.y}px)`,
        }}
        onMouseDown={handleMouseDown}
      >
        <img 
          src="/text.gif" 
          alt="Title GIF" 
          className="w-[120%] md:w-[85%] lg:w-[75%] h-auto max-w-[1000px]"
          draggable="false"
        />
        
        {/* FUGLY Labs Tag - Directly under the title */}
        <div className="mt-1">
          <span className="text-sm font-medium tracking-wider text-white/90">
            a project by FUGLY Labs
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end p-6 md:p-12">
        {/* Social Links & Contract Address */}
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 mb-8 mt-auto pt-20 md:pt-0">
          <ContractAddress address={contractAddress} />
          
          <div className="flex flex-wrap justify-center gap-4">
            <SocialButton
              icon={Twitter}
              href="https://twitter.com/durtbawl_AI"
              label="Twitter"
            />
            <SocialButton
              icon={Globe}
              href="https://app.virtuals.io/prototypes/0x2aBedBB669C4d6C4e14721dE8e67Dfe69B713630"
              label="Virtuals App"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;