import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Music } from "lucide-react";

interface ContractAddressProps {
  address: string;
}

const ContractAddress = ({ address }: ContractAddressProps) => {
  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success("Contract address copied to clipboard!");
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-md group cursor-pointer">
      <p className="text-sm text-white/60 flex items-center gap-2">
        Contract Address <Music className="w-4 h-4 animate-bounce" />
      </p>
      <Button
        variant="outline"
        className="w-full font-mono text-sm bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover-scale group-hover:border-white/40 transition-all"
        onClick={copyAddress}
      >
        <span className="truncate">{address}</span>
        <Copy className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default ContractAddress;