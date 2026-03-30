import { useEffect, useRef, useState } from "react";
import { sendChatPrompt } from "./api";
import { CHAT_ERROR_MESSAGES, INITIAL_MESSAGE } from "./constants";
import { getChatErrorMessage } from "./chatbotError";
import { useChatbotAudio } from "./useChatbotAudio";
import { useChatbotConversation } from "./useChatbotConversation";
import type { ChatMessage } from "./types";

export const useChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { playBotReplySound, playUserMessageSound } = useChatbotAudio();
  const {
    conversationId,
    isInitializing,
    isRestoredConversation,
    startNewConversation,
  } = useChatbotConversation({
    setError,
    setMessages,
    setShowSuggestions,
    setInput,
    setShowWelcome,
  });

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowWelcome(true);
    }, 2000);

    const hideTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 8000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );

      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const openChat = () => {
    setIsOpen(true);
    setShowWelcome(false);
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
    setShowWelcome(false);
  };

  const dismissWelcome = () => {
    setShowWelcome(false);
  };

  const clearError = () => {
    setError(null);
  };

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading || !conversationId) {
      return;
    }

    setError(null);
    setInput("");
    setShowSuggestions(false);
    setMessages((prev) => [...prev, { role: "user", content: textToSend }]);
    void playUserMessageSound();
    setIsLoading(true);

    try {
      const assistantMessage = await sendChatPrompt(textToSend, conversationId);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);
      void playBotReplySound();
    } catch (error) {
      console.error("Chat error:", error);
      setError(getChatErrorMessage(error, CHAT_ERROR_MESSAGES.generic));
    } finally {
      setIsLoading(false);
    }
  };

  const retryLastAction = () => {
    setError(null);
  };

  return {
    clearError,
    input,
    inputRef,
    error,
    isInitializing,
    isLoading,
    isOpen,
    isRestoredConversation,
    messages,
    scrollAreaRef,
    setInput,
    showSuggestions,
    showWelcome,
    dismissWelcome,
    openChat,
    retryLastAction,
    sendMessage,
    startNewConversation,
    toggleChat,
  };
};
