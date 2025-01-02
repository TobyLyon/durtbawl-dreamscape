import { Twitter, Globe } from "lucide-react";
import SocialButton from "./SocialButton";
import ContractAddress from "./ContractAddress";

const SocialLinks = () => {
  const contractAddress = "0x1234567890123456789012345678901234567890";

  return (
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
  );
};

export default SocialLinks;