import { Twitter, Globe } from "lucide-react";
import SocialButton from "@/components/SocialButton";
import ContractAddress from "@/components/ContractAddress";

const Index = () => {
  const contractAddress = "0x1234567890123456789012345678901234567890"; // Replace with actual address

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/48af7768-67d7-4f6a-bcd2-42a710962483.png')`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-between p-6 md:p-12">
        {/* Hero Section - Moved to top with padding */}
        <div className="flex-1 flex flex-col items-center justify-start pt-12 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-pulse cursor-pointer 
            [text-shadow:_2px_2px_0_rgb(255_51_102),_4px_4px_0_rgb(155_135_245),_6px_6px_0_rgb(255_123_0),_8px_8px_8px_rgba(0,0,0,0.4)] 
            bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 
            bg-clip-text text-transparent 
            transition-all duration-300 hover:scale-105
            hover:[text-shadow:_-2px_-2px_0_rgb(255_51_102),_-4px_-4px_0_rgb(155_135_245),_-6px_-6px_0_rgb(255_123_0),_8px_8px_12px_rgba(0,0,0,0.6)]
            glow">
            DURTBAWL
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 animate-fade-in
            [text-shadow:_1px_1px_2px_rgb(255_51_102),_2px_2px_4px_rgb(155_135_245)]
            hover:scale-105 transition-transform duration-300 cursor-pointer">
            He's a lil durtbawl, but he's OUR durtbawl
          </p>
        </div>

        {/* Social Links & Contract Address */}
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8">
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