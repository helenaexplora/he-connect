import { CHAT_API_BASE_URL } from "./constants";
import type { ChatHistoryMessage, ChatMessage } from "./types";

export class ChatApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ChatApiError";
    this.status = status;
  }
}

export const mapHistoryMessagesToChatMessages = (
  historyMessages: ChatHistoryMessage[]
): ChatMessage[] =>
  historyMessages.map(({ role, content }) => ({
    role: role === "bot" ? "assistant" : role,
    content,
  }));

export const fetchConversationHistory = async (conversationId: string) => {
  const response = await fetch(
    `${CHAT_API_BASE_URL}/api/conversations/${conversationId}/messages`
  );

  if (!response.ok) {
    throw new ChatApiError("Failed to load conversation history", response.status);
  }

  const data = (await response.json()) as { messages?: ChatHistoryMessage[] };
  return data.messages ?? [];
};

export const sendChatPrompt = async (prompt: string, conversationId: string) => {
  const response = await fetch(`${CHAT_API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      conversationId,
    }),
  });

  if (!response.ok) {
    throw new ChatApiError("Failed to get response", response.status);
  }

  const data = (await response.json()) as { message?: string };
  const message = data.message?.trim();

  if (!message) {
    throw new Error("Empty assistant response");
  }

  return message;
};
