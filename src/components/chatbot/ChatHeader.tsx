import { RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  isRestoredConversation: boolean;
  onNewConversation: () => void;
}

const ChatHeader = ({
  isRestoredConversation,
  onNewConversation,
}: ChatHeaderProps) => {
  return (
    <div className="gradient-hero px-4 py-3 text-primary-foreground">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Assistente Explora</h3>
            <p className="text-xs opacity-80">Guia educacional sobre estudos nos EUA</p>
          </div>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onNewConversation}
          className="h-8 bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25"
        >
          <RotateCcw className="mr-1 h-3.5 w-3.5" />
          Nova conversa
        </Button>
      </div>
      {isRestoredConversation && (
        <p className="mt-2 text-xs opacity-80">Conversa anterior restaurada.</p>
      )}
    </div>
  );
};

export default ChatHeader;
