import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SocialButtonProps {
  icon: LucideIcon;
  href: string;
  label: string;
  className?: string;
}

const SocialButton = ({ icon: Icon, href, label, className }: SocialButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="lg"
      className={cn(
        "flex items-center gap-2 text-white bg-white/10 backdrop-blur-sm",
        "transition-all duration-300 ease-in-out transform",
        "hover:bg-white/20 hover:shadow-lg hover:scale-105",
        "active:scale-95 active:bg-white/30",
        className
      )}
      onClick={() => window.open(href, "_blank")}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Button>
  );
};

export default SocialButton;