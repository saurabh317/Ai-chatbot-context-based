const API_URL = "http://localhost:3000/api";

export const API_URLS = {
  AUTH: {
    SIGNUP: `${API_URL}/auth/sign-up`,
    SIGNIN: `${API_URL}/auth/sign-in`,
  },
  CHAT: {
    BASE: `${API_URL}/chat`,
    CREATE: `${API_URL}/chat`,
    GET_ALL: `${API_URL}/chat`,
    GET_MESSAGES: (chatId: string) => `${API_URL}/chat/${chatId}`,
    SEND_MESSAGE: (chatId: string) => `${API_URL}/chat/${chatId}`,
    DELETE: (chatId: string) => `${API_URL}/chat/${chatId}`,
  },
};
