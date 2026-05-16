"use client";

import { useCallback } from "react";
import Sidebar from "../components/Sidebar";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setSelectedChatId, clearMessages } from "@/store/chatSlice";
import { useGetChats, useDeleteChat } from "@/hooks/api/use-chat";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SidebarWrapper({ isOpen, onClose }: Props) {
  const dispatch = useAppDispatch();
  const selectedChatId = useAppSelector((state) => state.chat.selectedChatId);
  const { isLoading } = useGetChats();
  const { mutate: deleteChat } = useDeleteChat();

  const handleChatDelete = useCallback(
    (chatId: string) => {
      if (confirm("Are you sure you want to delete this chat?")) {
        deleteChat(chatId, {
          onSuccess: () => {
            if (selectedChatId === chatId) {
              dispatch(setSelectedChatId(null));
              dispatch(clearMessages());
            }
          },
        });
      }
    },
    [deleteChat, selectedChatId, dispatch],
  );

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      onChatDelete={handleChatDelete}
      isLoading={isLoading}
    />
  );
}
