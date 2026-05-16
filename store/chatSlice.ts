import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Chat = {
  _id: string;
  userId: string;
  title: string;
  isPinned: boolean;
  pinnedOrder: number | null;
  createdAt: string;
  updatedAt: string;
};

type Message = {
  _id: string;
  chatId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

interface ChatState {
  chats: Chat[];
  selectedChatId: string | null;
  messages: Message[];
}

const initialState: ChatState = {
  chats: [],
  selectedChatId: null,
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    setSelectedChatId: (state, action: PayloadAction<string | null>) => {
      state.selectedChatId = action.payload;
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    clearChats: (state) => {
      state.chats = [];
    },
    resetChat: (state) => {
      state.chats = [];
      state.selectedChatId = null;
      state.messages = [];
    },
  },
});

export const { setChats, setSelectedChatId, setMessages, addMessage, clearMessages, clearChats, resetChat } = chatSlice.actions;
export default chatSlice.reducer;
