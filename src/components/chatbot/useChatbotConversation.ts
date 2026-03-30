import { useEffect, useState } from "react";
import { fetchConversationHistory, mapHistoryMessagesToChatMessages } from "./api";
import { CHAT_ERROR_MESSAGES, INITIAL_MESSAGE } from "./constants";
import { clearConversationId, createConversationId, getConversationId, getStoredConversationId } from "./storage";
import { getChatErrorMessage } from "./chatbotError";
import type { ChatMessage } from "./types";

interface UseChatbotConversationOptions {
  setError: (value: string | null) => void;
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setShowWelcome: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useChatbotConversation = ({
  setError,
  setMessages,
  setShowSuggestions,
  setInput,
  setShowWelcome,
}: UseChatbotConversationOptions) => {
  const [conversationId, setConversationId] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);
  const [isRestoredConversation, setIsRestoredConversation] = useState(false);

  useEffect(() => {
    setConversationId(getConversationId());
  }, []);

  useEffect(() => {
    if (!conversationId) {
      return;
    }

    let isCancelled = false;

    const loadConversationHistory = async () => {
      try {
        const historyMessages = await fetchConversationHistory(conversationId);
        if (isCancelled) {
          return;
        }

        if (historyMessages.length > 0) {
          setMessages(mapHistoryMessagesToChatMessages(historyMessages));
          setIsRestoredConversation(true);
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error("History load error:", error);
        if (!isCancelled && getStoredConversationId()) {
          setError(getChatErrorMessage(error, CHAT_ERROR_MESSAGES.history));
        }
      } finally {
        if (!isCancelled) {
          setIsInitializing(false);
        }
      }
    };

    void loadConversationHistory();

    return () => {
      isCancelled = true;
    };
  }, [conversationId, setError, setMessages, setShowSuggestions]);

  const startNewConversation = () => {
    clearConversationId();
    const nextConversationId = createConversationId();
    setConversationId(nextConversationId);
    setMessages([INITIAL_MESSAGE]);
    setInput("");
    setError(null);
    setIsRestoredConversation(false);
    setShowSuggestions(true);
    setShowWelcome(false);
  };

  return {
    conversationId,
    isInitializing,
    isRestoredConversation,
    startNewConversation,
  };
};
