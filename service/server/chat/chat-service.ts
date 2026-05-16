import { Chat } from "@/models/chat-model";
import { Message } from "@/models/message-model";
import mongoose from "mongoose";

export const chatService = {
  // Create new chat
  createChat: async (userId: string, title?: string) => {
    const chat = await Chat.create({
      userId,
      title: title || "New Thread",
    });
    return chat;
  },

  // Get all chats for a user
  getChatsByUserId: async (userId: string) => {
    const chats = await Chat.find({ userId })
      .sort({ isPinned: -1, pinnedOrder: 1, updatedAt: -1 })
      .lean();
    return chats;
  },

  // Get chat by ID
  getChatById: async (chatId: string) => {
    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return null;
    }
    const chat = await Chat.findById(chatId).lean();
    return chat;
  },

  // Update chat title
  updateChatTitle: async (chatId: string, title: string) => {
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { title },
      { returnDocument: 'after' }
    ).lean();
    return chat;
  },

  // Delete chat
  deleteChat: async (chatId: string) => {
    await Chat.findByIdAndDelete(chatId);
    await Message.deleteMany({ chatId });
  },

  // Pin chat
  pinChat: async (chatId: string) => {
    
    // Get the highest pinned order for this user
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return null;
    }

    const highestPinnedOrder = await Chat.findOne({ 
      userId: chat.userId, 
      isPinned: true 
    }).sort({ pinnedOrder: -1 }).select('pinnedOrder');

    const newOrder = highestPinnedOrder?.pinnedOrder ? highestPinnedOrder.pinnedOrder + 1 : 1;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { isPinned: true, pinnedOrder: newOrder },
      { returnDocument: 'after' }
    ).lean();

    return updatedChat;
  },

  // Unpin chat
  unpinChat: async (chatId: string) => {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { isPinned: false, pinnedOrder: null },
      { returnDocument: 'after' }
    ).lean();

    return updatedChat;
  },

  // Create message
  createMessage: async (chatId: string, role: "user" | "assistant", content: string) => {
    const message = await Message.create({
      chatId,
      role,
      content,
    });
    return message;
  },

  // Get messages for a chat
  getMessagesByChatId: async (chatId: string) => {
    const messages = await Message.find({ chatId })
      .sort({ createdAt: 1 })
      .lean();
    return messages;
  },
};
