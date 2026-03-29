import type { ChatMessage } from "./types";

const configuredChatApiUrl = import.meta.env.VITE_CHATBOT_API_URL?.replace(/\/$/, "");

export const CHAT_API_BASE_URL =
  configuredChatApiUrl ?? (import.meta.env.DEV ? "" : "http://aichatbot-api.hmpedro.com");

export const CONVERSATION_ID_STORAGE_KEY = "helena-explora-chat-conversation-id";

export const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  content: `Olá! Sou o Assistente Explora.

Este é o website oficial do projeto Helena Explora, criado para ajudar você que sonha estudar ou viver nos Estados Unidos.

Posso te explicar:
- O que é este website e o projeto Helena Explora
- Para que serve o formulário "Faça Parte da Nossa Comunidade"
- Programas de estudo nos EUA
- Diferenças entre CPT e OPT
- Bolsas de estudo, vida acadêmica e dicas de inglês

Como posso te ajudar hoje?`,
};

export const SUGGESTIONS = [
  "Me fale sobre este website",
  "O que é o formulário 'Faça Parte da Nossa Comunidade'?",
  "Como funciona CPT/OPT?",
  "Quero estudar nos EUA, por onde começo?",
];

export const CHAT_PLACEHOLDER = "Pergunte sobre estudar nos Estados Unidos...";

export const CHAT_HELPER_TEXT =
  "Informações gerais sobre universidades, vistos estudantis e vida acadêmica nos EUA.";

export const CHAT_ERROR_MESSAGES = {
  generic: "Não foi possível responder agora. Tente novamente.",
  history: "Não foi possível restaurar a conversa anterior.",
  invalidRequest: "Sua mensagem não pôde ser enviada. Revise o texto e tente novamente.",
  rateLimited: "Muitas tentativas em pouco tempo. Aguarde um instante e tente novamente.",
  unavailable: "Assistente indisponível no momento. Tente novamente em instantes.",
} as const;
