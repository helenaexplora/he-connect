export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatHistoryMessage {
  id: number;
  role: "user" | "assistant" | "bot";
  content: string;
  createdAt: string;
}
