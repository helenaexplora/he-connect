import type { RefObject } from "react";
import { AlertCircle, Loader2, RotateCcw, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CHAT_HELPER_TEXT, CHAT_PLACEHOLDER, SUGGESTIONS } from "./constants";
import type { ChatMessage } from "./types";

interface ChatWindowProps {
  error: string | null;
  input: string;
  inputRef: RefObject<HTMLTextAreaElement>;
  isInitializing: boolean;
  isLoading: boolean;
  isRestoredConversation: boolean;
  messages: ChatMessage[];
  scrollAreaRef: RefObject<HTMLDivElement>;
  setInput: (value: string) => void;
  showSuggestions: boolean;
  onDismissError: () => void;
  onInputSubmit: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onNewConversation: () => void;
  onSuggestionClick: (suggestion: string) => void;
}

const ChatWindow = ({
  error,
  input,
  inputRef,
  isInitializing,
  isLoading,
  isRestoredConversation,
  messages,
  scrollAreaRef,
  setInput,
  showSuggestions,
  onDismissError,
  onInputSubmit,
  onKeyDown,
  onNewConversation,
  onSuggestionClick,
}: ChatWindowProps) => {
  return (
    <div className="fixed bottom-20 right-4 z-50 flex h-[500px] max-h-[70vh] w-[calc(100%-2rem)] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl animate-slide-in-right md:right-8 md:w-96">
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

      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4" aria-live="polite" aria-busy={isLoading || isInitializing}>
          {error && (
            <div
              className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
              role="alert"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <div className="flex-1">
                <p>{error}</p>
                <button
                  type="button"
                  onClick={onDismissError}
                  className="mt-2 text-xs underline underline-offset-2"
                >
                  Fechar aviso
                </button>
              </div>
            </div>
          )}

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

      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={CHAT_PLACEHOLDER}
            disabled={isLoading || isInitializing}
            className="min-h-[88px] flex-1 resize-none"
            rows={3}
            aria-label="Mensagem para o assistente"
          />
          <Button
            type="button"
            onClick={onInputSubmit}
            disabled={!input.trim() || isLoading || isInitializing}
            size="icon"
            className="h-auto self-end"
            aria-label="Enviar mensagem"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {CHAT_HELPER_TEXT}
        </p>
      </div>
    </div>
  );
};

export default ChatWindow;
