import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatToggleButton = ({ isOpen, onToggle }: ChatToggleButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 md:right-8",
        "bg-primary text-primary-foreground hover:scale-110"
      )}
      aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
    >
      {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
    </button>
  );
};

export default ChatToggleButton;
