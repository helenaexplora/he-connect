import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CHAT_HELPER_TEXT, CHAT_PLACEHOLDER } from "./constants";

interface ChatComposerProps {
  input: string;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  isInitializing: boolean;
  isLoading: boolean;
  setInput: (value: string) => void;
  onInputSubmit: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const ChatComposer = ({
  input,
  inputRef,
  isInitializing,
  isLoading,
  setInput,
  onInputSubmit,
  onKeyDown,
}: ChatComposerProps) => {
  return (
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
  );
};

export default ChatComposer;
