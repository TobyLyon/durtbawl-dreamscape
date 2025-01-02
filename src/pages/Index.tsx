import { useRef } from "react";
import CustomCursor from "@/components/CustomCursor";
import Fireworks from "@/components/Fireworks";
import SocialLinks from "@/components/SocialLinks";

const Index = () => {
  const fireworksRef = useRef<{ createFirework: (x: number, y: number) => void }>(null);

  const handleClick = (e: React.MouseEvent) => {
    fireworksRef.current?.createFirework(e.clientX, e.clientY);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" onClick={handleClick}>
      <CustomCursor />
      <Fireworks />
      
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
        <SocialLinks />
      </div>
    </div>
  );
};

export default Index;