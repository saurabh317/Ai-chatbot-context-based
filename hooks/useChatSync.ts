import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setChats, setMessages } from "@/store/chatSlice";

interface ChatSyncProps {
  chatsData?: { chats: any[] };
  messagesData?: { messages: any[] };
}

export const useChatSync = ({ chatsData, messagesData }: ChatSyncProps) => {
  const dispatch = useAppDispatch();
  const selectedChatId = useAppSelector((state) => state.chat.selectedChatId);

  // Sync chats to Redux store
  useEffect(() => {
    if (chatsData?.chats) {
      dispatch(setChats(chatsData.chats));
    }
  }, [chatsData, dispatch]);

  // Sync messages to Redux store
  useEffect(() => {
    if (messagesData?.messages && selectedChatId) {
      dispatch(setMessages(messagesData.messages));
    }
  }, [messagesData, selectedChatId, dispatch]);
};
