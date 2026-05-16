// AI Models
export const AI_MODELS = {
  FREE_MODELS: [
    "microsoft/wizardlm-2-8x22b", // Working - larger but capable
    // Add more verified models here as needed
  ] as const,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Unauthorized",
  CHAT_NOT_FOUND: "Chat not found",
  UNKNOWN_ERROR: "Unknown error",
  AI_RESPONSE_FAILED: "I'm sorry, I couldn't generate a response at the moment. Please try again.",
  NO_AI_RESPONSE: "No response from AI",
} as const;

// Chat Configuration
export const CHAT_CONFIG = {
  CONTEXT_WINDOW_SIZE: 5, // Number of previous messages to include in AI context
  TITLE_MAX_LENGTH: 30, // Maximum length for chat title
  TITLE_ELLIPSIS: "...", // Ellipsis for truncated titles
} as const;

// API Configuration
export const API_CONFIG = {
  TOKEN_COOKIE_NAME: "token",
  TOKEN_NAME: "token",
  COOKIE_HEADER: "cookie",
} as const;

// Cookie Management
export const COOKIE_CONFIG = {
  TOKEN_NAME: "token",
  CLEAR_TOKEN_STRING: "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
  DELETE_TOKEN_FUNCTION: () => {
    document.cookie = `${COOKIE_CONFIG.TOKEN_NAME}=; path=${COOKIE_CONFIG.PATH}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  },
  PATH: "/",
} as const;

// Auth Routes
export const AUTH_ROUTES = {
  SIGN_IN: "/api/auth/sign-in",
  SIGN_UP: "/api/auth/sign-up",
  AUTH_PAGE: "/auth-page",
  CHAT_PAGE: "/chat",
} as const;
