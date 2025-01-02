import { Twitter, Globe } from "lucide-react";
import { useState } from "react";
import SocialButton from "@/components/SocialButton";
import ContractAddress from "@/components/ContractAddress";
import MusicController from "@/components/MusicController";
import CustomCursor from "@/components/CustomCursor";
import Fireworks from "@/components/Fireworks";

const Index = () => {
  const contractAddress = "0x1234567890123456789012345678901234567890";
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [fireworksRef, setFireworksRef] = useState<any>(null);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMusicOn(!isMusicOn);
  };

  const handleContractClick = () => {
    setIsStarted(true);
    setIsMusicOn(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (fireworksRef && fireworksRef.createFirework) {
      fireworksRef.createFirework(e.clientX, e.clientY);
    }
  };

  return (
    <div className="h-screen w-full fixed inset-0 overflow-hidden" onClick={handleClick}>
      <MusicController 
        isStarted={isStarted}
        isMusicOn={isMusicOn}
        onToggleMusic={toggleMusic}
      />

      <CustomCursor />
      <Fireworks ref={fireworksRef} />

      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/48af7768-67d7-4f6a-bcd2-42a710962483.png')`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end p-6 md:p-12">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 mb-8">
          <div onClick={handleContractClick}>
            <ContractAddress address={contractAddress} />
          </div>
          
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