"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setSelectedChatId, addMessage } from "@/store/chatSlice";
import ChatHeader from "../components/ChatHeader";
import MessageBubble from "../components/MessageBubble";
import LoadingIndicator from "../components/LoadingIndicator";
import ChatInput from "../components/ChatInput";
import {
  useGetChats,
  useCreateChat,
  useSendMessage,
  useGetChatMessages,
  usePinChat,
  useUnpinChat,
  useDeleteChat,
} from "@/hooks/api/use-chat";
import { useChatSync } from "@/hooks/useChatSync";
import type { Message } from "../components/types";
import WelcomeUI from "../components/WelcomeUI";

type Props = {
  onMenuClick: () => void;
};

export default function ChatAreaWrapper({ onMenuClick }: Props) {
  const [input, setInput] = useState("What can I help you with today?");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const { chats, selectedChatId, messages } = useAppSelector(
    (state) => state.chat,
  );

  const { data: chatsData } = useGetChats();
  const { mutate: createChat } = useCreateChat();
  const { mutate: sendMessage, isPending: isSending } = useSendMessage();
  const { data: messagesData } = useGetChatMessages(selectedChatId || "");
  const { mutate: pinChat } = usePinChat();
  const { mutate: unpinChat } = useUnpinChat();
  const { mutate: deleteChat } = useDeleteChat();

  useChatSync({ chatsData, messagesData });

  const currentChat = useMemo(
    () => chats.find((chat) => chat._id === selectedChatId),
    [chats, selectedChatId],
  );

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const createUserMessage = useCallback(
    (chatId: string, content: string): Message => ({
      _id: Date.now().toString(),
      chatId,
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    }),
    [],
  );

  const handleSendMessage = useCallback(
    (chatId: string, content: string) => {
      const userMessage = createUserMessage(chatId, content);
      dispatch(addMessage(userMessage));
      setInput("");

      sendMessage(
        { chatId, content },
        {
          onSuccess: (data) => {
            dispatch(addMessage(data.assistantMessage));
          },
          onError: (error) => {
            console.error("Failed to send message:", error);
          },
        },
      );
    },
    [dispatch, sendMessage, createUserMessage],
  );

  const handleSend = useCallback(() => {
    if (!input.trim()) return;

    const messageContent = input;

    if (!selectedChatId) {
      createChat(undefined, {
        onSuccess: (result) => {
          const newChatId = result.chat._id;
          dispatch(setSelectedChatId(newChatId));
          handleSendMessage(newChatId, messageContent);
        },
      });
      return;
    }

    handleSendMessage(selectedChatId, messageContent);
  }, [input, selectedChatId, createChat, dispatch, handleSendMessage]);

  const handleChatDelete = useCallback(
    (chatId: string) => {
      if (confirm("Are you sure you want to delete this chat?")) {
        deleteChat(chatId, {
          onSuccess: () => {
            if (selectedChatId === chatId) {
              dispatch(setSelectedChatId(null));
            }
          },
        });
      }
    },
    [deleteChat, selectedChatId, dispatch],
  );

  const handlePinChat = useCallback(() => {
    if (selectedChatId) pinChat(selectedChatId);
  }, [selectedChatId, pinChat]);

  const handleUnpinChat = useCallback(() => {
    if (selectedChatId) unpinChat(selectedChatId);
  }, [selectedChatId, unpinChat]);

  return (
    <div className="flex-1 flex flex-col bg-black">
      <ChatHeader
        onMenuClick={onMenuClick}
        chatId={selectedChatId}
        isPinned={currentChat?.isPinned || false}
        onPin={handlePinChat}
        onUnpin={handleUnpinChat}
        onDelete={() => selectedChatId && handleChatDelete(selectedChatId)}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {messages.length === 0 && !selectedChatId && (
            <WelcomeUI setInput={setInput} />
          )}

          {messages.map((message) => (
            <MessageBubble key={message._id} message={message} />
          ))}

          {isSending && <LoadingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
        isLoading={isSending}
      />
    </div>
  );
}
