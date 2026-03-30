import { useEffect, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import {
  ChatApiError,
  fetchConversationHistory,
  mapHistoryMessagesToChatMessages,
  sendChatPrompt,
} from "./api";
import {
  CHAT_ERROR_MESSAGES,
  INITIAL_MESSAGE,
} from "./constants";
import {
  clearConversationId,
  createConversationId,
  getConversationId,
  getStoredConversationId,
} from "./storage";
import type { ChatMessage } from "./types";

const notificationSoundFile = "/sounds/notification.mp3";
const popSoundFile = "/sounds/pop.mp3";

const getErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (error instanceof ChatApiError) {
    if (error.status === 400) {
      return CHAT_ERROR_MESSAGES.invalidRequest;
    }

    if (error.status === 429) {
      return CHAT_ERROR_MESSAGES.rateLimited;
    }

    if (error.status >= 500) {
      return CHAT_ERROR_MESSAGES.unavailable;
    }
  }

  if (error instanceof TypeError) {
    return CHAT_ERROR_MESSAGES.unavailable;
  }

  return fallbackMessage;
};

const playAudio = async (audioRef: MutableRefObject<HTMLAudioElement | null>) => {
  if (!audioRef.current) {
    return;
  }

  try {
    audioRef.current.currentTime = 0;
    await audioRef.current.play();
  } catch (error) {
    console.error("Audio playback error:", error);
  }
};

export const useChatbot = () => {
  const [conversationId, setConversationId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isRestoredConversation, setIsRestoredConversation] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const botReplyAudioRef = useRef<HTMLAudioElement | null>(null);
  const userMessageAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setConversationId(getConversationId());
  }, []);

  useEffect(() => {
    botReplyAudioRef.current = new Audio(notificationSoundFile);
    botReplyAudioRef.current.preload = "auto";

    userMessageAudioRef.current = new Audio(popSoundFile);
    userMessageAudioRef.current.preload = "auto";

    return () => {
      if (botReplyAudioRef.current) {
        botReplyAudioRef.current.pause();
        botReplyAudioRef.current.currentTime = 0;
      }

      if (userMessageAudioRef.current) {
        userMessageAudioRef.current.pause();
        userMessageAudioRef.current.currentTime = 0;
      }
    };
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
          setError(getErrorMessage(error, CHAT_ERROR_MESSAGES.history));
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
  }, [conversationId]);

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

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading || !conversationId) {
      return;
    }

    setError(null);
    setInput("");
    setShowSuggestions(false);
    setMessages((prev) => [...prev, { role: "user", content: textToSend }]);
    void playAudio(userMessageAudioRef);
    setIsLoading(true);

    try {
      const assistantMessage = await sendChatPrompt(textToSend, conversationId);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);
      void playAudio(botReplyAudioRef);
    } catch (error) {
      console.error("Chat error:", error);
      setError(getErrorMessage(error, CHAT_ERROR_MESSAGES.generic));
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
