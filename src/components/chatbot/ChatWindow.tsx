import type { RefObject } from "react";
import ChatComposer from "./ChatComposer";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
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
      <ChatHeader
        isRestoredConversation={isRestoredConversation}
        onNewConversation={onNewConversation}
      />

      <ChatMessageList
        error={error}
        isInitializing={isInitializing}
        isLoading={isLoading}
        messages={messages}
        scrollAreaRef={scrollAreaRef}
        showSuggestions={showSuggestions}
        onDismissError={onDismissError}
        onSuggestionClick={onSuggestionClick}
      />

      <ChatComposer
        input={input}
        inputRef={inputRef}
        isInitializing={isInitializing}
        isLoading={isLoading}
        setInput={setInput}
        onInputSubmit={onInputSubmit}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default ChatWindow;
