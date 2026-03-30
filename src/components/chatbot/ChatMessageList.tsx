import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SUGGESTIONS } from "./constants";
import type { ChatMessage } from "./types";
import ChatErrorBanner from "./ChatErrorBanner";

interface ChatMessageListProps {
  error: string | null;
  isInitializing: boolean;
  isLoading: boolean;
  messages: ChatMessage[];
  scrollAreaRef: React.RefObject<HTMLDivElement>;
  showSuggestions: boolean;
  onDismissError: () => void;
  onSuggestionClick: (suggestion: string) => void;
}

const ChatMessageList = ({
  error,
  isInitializing,
  isLoading,
  messages,
  scrollAreaRef,
  showSuggestions,
  onDismissError,
  onSuggestionClick,
}: ChatMessageListProps) => {
  return (
    <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
      <div className="space-y-4" aria-live="polite" aria-busy={isLoading || isInitializing}>
        <ChatErrorBanner error={error} onDismissError={onDismissError} />

        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[80%] whitespace-pre-wrap rounded-lg px-4 py-2 text-sm",
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              )}
            >
              {message.content}
            </div>
          </div>
        ))}

        {(isLoading || isInitializing) && (
          <div className="flex justify-start">
            <div className="rounded-lg bg-muted px-4 py-2">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </div>
        )}

        {showSuggestions && messages.length === 1 && !isLoading && !isInitializing && (
          <div className="mt-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => onSuggestionClick(suggestion)}
                className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-secondary-foreground transition-colors hover:bg-secondary"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default ChatMessageList;
