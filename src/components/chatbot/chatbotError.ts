import { ChatApiError } from "./api";
import { CHAT_ERROR_MESSAGES } from "./constants";

export const getChatErrorMessage = (error: unknown, fallbackMessage: string) => {
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
