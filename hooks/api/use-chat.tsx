import {
  createChatClient,
  getChatsClient,
  getChatMessagesClient,
  sendMessageClient,
  deleteChatClient,
  pinChatClient,
  unpinChatClient,
} from "@/service/client/chat";
import { useAppSelector } from "@/store/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreateChat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (title?: string) => createChatClient(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
}

export function useGetChats() {
  return useQuery({
    queryKey: ["chats"],
    queryFn: getChatsClient,
  });
}

export function useGetChatMessages(chatId: string) {
  return useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => getChatMessagesClient(chatId),
    enabled: !!chatId,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  const chatState = useAppSelector((state) => state.chat);

  return useMutation({
    mutationFn: ({ chatId, content }: { chatId: string; content: string }) =>
      sendMessageClient(chatId, content),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.chatId],
      });
      // only validate chat if it's the first message (length <= 2 means 0 or 1 message)
      if (chatState?.messages?.length <= 2) {
        queryClient.invalidateQueries({ queryKey: ["chats"] });
      }
    },
  });
}

export function usePinUnpinChat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      chatId,
      isPinned,
    }: {
      chatId: string;
      isPinned: boolean;
    }) => (isPinned ? unpinChatClient(chatId) : pinChatClient(chatId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
}

export function useDeleteChat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (chatId: string) => deleteChatClient(chatId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
}
