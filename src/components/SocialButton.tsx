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
        "relative flex items-center gap-2 text-white",
        "bg-white/10 backdrop-blur-sm",
        "transition-all duration-300 ease-out",
        "hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
        "active:scale-95 active:bg-white/30",
        "before:absolute before:inset-0 before:rounded-md before:bg-white/0",
        "before:transition-colors before:duration-300",
        "hover:before:bg-white/5",
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