import type { KeyboardEvent } from "react";
import ChatToggleButton from "./chatbot/ChatToggleButton";
import ChatWindow from "./chatbot/ChatWindow";
import { useChatbot } from "./chatbot/useChatbot";
import WelcomeBubble from "./chatbot/WelcomeBubble";

const AIChatbot = () => {
  const {
    clearError,
    dismissWelcome,
    error,
    input,
    inputRef,
    isInitializing,
    isLoading,
    isOpen,
    isRestoredConversation,
    messages,
    openChat,
    scrollAreaRef,
    sendMessage,
    setInput,
    showSuggestions,
    showWelcome,
    startNewConversation,
    toggleChat,
  } = useChatbot();

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  return (
    <>
      <WelcomeBubble isVisible={showWelcome && !isOpen} onOpen={openChat} onDismiss={dismissWelcome} />
      <ChatToggleButton isOpen={isOpen} onToggle={toggleChat} />
      {isOpen && (
        <ChatWindow
          error={error}
          input={input}
          inputRef={inputRef}
          isInitializing={isInitializing}
          isLoading={isLoading}
          isRestoredConversation={isRestoredConversation}
          messages={messages}
          scrollAreaRef={scrollAreaRef}
          setInput={setInput}
          showSuggestions={showSuggestions}
          onDismissError={clearError}
          onInputSubmit={() => {
            void sendMessage();
          }}
          onKeyDown={handleKeyPress}
          onNewConversation={startNewConversation}
          onSuggestionClick={(suggestion) => {
            void sendMessage(suggestion);
          }}
        />
      )}
    </>
  );
};

export default AIChatbot;
