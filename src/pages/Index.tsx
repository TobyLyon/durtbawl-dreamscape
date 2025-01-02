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
        {/* Hero Section - Empty for now */}
        <div className="flex-1 flex flex-col items-center justify-start pt-4 text-center max-w-4xl mx-auto">
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