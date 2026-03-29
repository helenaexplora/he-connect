import { CONVERSATION_ID_STORAGE_KEY } from "./constants";

export const createConversationId = () => {
  const nextConversationId = crypto.randomUUID();
  localStorage.setItem(CONVERSATION_ID_STORAGE_KEY, nextConversationId);
  return nextConversationId;
};

export const getStoredConversationId = () =>
  localStorage.getItem(CONVERSATION_ID_STORAGE_KEY);

export const getConversationId = () => {
  const savedConversationId = localStorage.getItem(CONVERSATION_ID_STORAGE_KEY);

  if (savedConversationId) {
    return savedConversationId;
  }

  return createConversationId();
};

export const clearConversationId = () => {
  localStorage.removeItem(CONVERSATION_ID_STORAGE_KEY);
};
