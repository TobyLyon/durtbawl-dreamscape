import { Twitter, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import SocialButton from "@/components/SocialButton";
import ContractAddress from "@/components/ContractAddress";

const Index = () => {
  const contractAddress = "0x1234567890123456789012345678901234567890";
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Add new trail point
      setTrails(prev => [
        { x: e.clientX, y: e.clientY, id: Date.now() },
        ...prev.slice(0, 5), // Keep only 6 trail points
      ]);
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Custom Cursor */}
      <div
        className="custom-cursor"
        style={{
          left: `${cursorPosition.x - 10}px`,
          top: `${cursorPosition.y - 10}px`,
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

      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/48af7768-67d7-4f6a-bcd2-42a710962483.png')`,
        }}
      />
      
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