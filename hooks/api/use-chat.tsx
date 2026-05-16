import {
  createChatClient,
  getChatsClient,
  getChatMessagesClient,
  sendMessageClient,
  deleteChatClient,
  pinChatClient,
  unpinChatClient,
} from "@/service/client/chat";
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
  return useMutation({
    mutationFn: ({ chatId, content }: { chatId: string; content: string }) =>
      sendMessageClient(chatId, content),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["messages", variables.chatId] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
}

export function usePinChat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (chatId: string) => pinChatClient(chatId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
}

export function useUnpinChat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (chatId: string) => unpinChatClient(chatId),
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
