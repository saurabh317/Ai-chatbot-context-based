import { API_URLS } from "@/api-urls";
import { handleRequest, headers, Methods } from "../utility";

export const createChatClient = async (title?: string) => {
  const options = {
    method: Methods.POST,
    headers,
    body: JSON.stringify({ title }),
  };

  return handleRequest(API_URLS.CHAT.CREATE, options);
};

export const getChatsClient = async () => {
  const options = {
    method: Methods.GET,
    headers,
  };

  return handleRequest(API_URLS.CHAT.GET_ALL, options);
};

export const getChatMessagesClient = async (chatId: string) => {
  const options = {
    method: Methods.GET,
    headers,
  };

  return handleRequest(API_URLS.CHAT.GET_MESSAGES(chatId), options);
};

export const sendMessageClient = async (chatId: string, content: string) => {
  const options = {
    method: Methods.POST,
    headers,
    body: JSON.stringify({ content }),
  };

  return handleRequest(API_URLS.CHAT.SEND_MESSAGE(chatId), options);
};

export const pinChatClient = async (chatId: string) => {
  const options = {
    method: Methods.POST,
    headers,
  };

  return handleRequest(`${API_URLS.CHAT.SEND_MESSAGE(chatId)}?action=pin`, options);
};

export const unpinChatClient = async (chatId: string) => {
  const options = {
    method: Methods.POST,
    headers,
  };

  return handleRequest(`${API_URLS.CHAT.SEND_MESSAGE(chatId)}?action=unpin`, options);
};

export const deleteChatClient = async (chatId: string) => {
  const options = {
    method: Methods.DELETE,
    headers,
  };

  return handleRequest(API_URLS.CHAT.DELETE(chatId), options);
};
