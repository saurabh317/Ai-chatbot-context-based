import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { chatService } from "@/service/server/chat/chat-service";
import { verifyToken } from "@/lib/jwt";
import { openai } from "@/lib/openai";
import {
  AI_MODELS,
  ERROR_MESSAGES,
  CHAT_CONFIG,
  API_CONFIG,
} from "@/lib/constants";

// Helper to get userId from token
const getUserIdFromRequest = (req: Request): string | null => {
  const cookieHeader = req.headers.get(API_CONFIG.COOKIE_HEADER);
  if (!cookieHeader) {
    return null;
  }

  const tokenMatch = cookieHeader.match(
    new RegExp(`${API_CONFIG.TOKEN_NAME}=([^;]+)`),
  );
  if (!tokenMatch) {
    return null;
  }

  const token = tokenMatch[1];
  const decoded = verifyToken(token);
  return decoded?.userId || null;
};

// POST /api/chat - Create new chat
export const createChatController = async (req: Request) => {
  try {
    await connectDB();

    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.UNAUTHORIZED },
        { status: 401 },
      );
    }

    const { title } = await req.json();
    const chat = await chatService.createChat(userId, title);

    return NextResponse.json({ chat });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: ERROR_MESSAGES.UNKNOWN_ERROR },
      { status: 400 },
    );
  }
};

// GET /api/chat - Get all chats for user
export const getChatsController = async (req: Request) => {
  try {
    await connectDB();

    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.UNAUTHORIZED },
        { status: 401 },
      );
    }

    const chats = await chatService.getChatsByUserId(userId);

    return NextResponse.json({ chats });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: ERROR_MESSAGES.UNKNOWN_ERROR },
      { status: 400 },
    );
  }
};

// GET /api/chat/[chatId] - Get messages for a chat
export const getChatMessagesController = async (
  req: Request,
  chatId: string,
) => {
  try {
    await connectDB();

    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.UNAUTHORIZED },
        { status: 401 },
      );
    }

    // Verify user owns the chat
    const chat = await chatService.getChatById(chatId);
    if (!chat) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.CHAT_NOT_FOUND },
        { status: 404 },
      );
    }
    if (chat.userId.toString() !== userId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.CHAT_NOT_FOUND },
        { status: 404 },
      );
    }

    const messages = await chatService.getMessagesByChatId(chatId);

    return NextResponse.json({ messages });
  } catch (err: unknown) {
    console.error("Error in getChatMessagesController:", err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: ERROR_MESSAGES.UNKNOWN_ERROR },
      { status: 400 },
    );
  }
};

// POST /api/chat/[chatId] - Send message
export const sendMessageController = async (req: Request, chatId: string) => {
  try {
    await connectDB();

    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.UNAUTHORIZED },
        { status: 401 },
      );
    }

    // Verify user owns the chat
    const chat = await chatService.getChatById(chatId);
    if (!chat || chat.userId.toString() !== userId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.CHAT_NOT_FOUND },
        { status: 404 },
      );
    }

    const body = await req.json();

    const { content } = body;

    // Get previous messages for AI context
    const previousMessages = await chatService.getMessagesByChatId(chatId);

    // Save user message
    const userMessage = await chatService.createMessage(
      chatId,
      "user",
      content,
    );

    // Get previous messages for AI context (limit to last 5 messages)
    const lastMessages = previousMessages.slice(
      -CHAT_CONFIG.CONTEXT_WINDOW_SIZE,
    );
    // TODO: implement proper context window management with short term and long term context, management of context window size, etc.

    // Call OpenRouter API
    let aiResponse: string;
    try {
      console.log(`Using model: ${AI_MODELS.FREE_MODELS[0]}`);
      const completion = await openai.chat.completions.create({
        model: AI_MODELS.FREE_MODELS[0],
        messages: [
          ...lastMessages.map((msg) => ({
            role: msg.role as "user" | "assistant",
            content: msg.content,
          })),
          { role: "user", content },
        ],
      });

      aiResponse =
        completion.choices[0]?.message?.content ||
        ERROR_MESSAGES.NO_AI_RESPONSE;
      console.log(`Success with model: ${AI_MODELS.FREE_MODELS[0]}`);
    } catch (aiError) {
      aiResponse = ERROR_MESSAGES.AI_RESPONSE_FAILED;
    }

    // Save AI message
    const assistantMessage = await chatService.createMessage(
      chatId,
      "assistant",
      aiResponse,
    );

    // Update chat title if it's the first message
    if (previousMessages.length === 0) {
      await chatService.updateChatTitle(
        chatId,
        content.slice(0, CHAT_CONFIG.TITLE_MAX_LENGTH) +
          (content.length > CHAT_CONFIG.TITLE_MAX_LENGTH
            ? CHAT_CONFIG.TITLE_ELLIPSIS
            : ""),
      );
    }

    return NextResponse.json({
      userMessage,
      assistantMessage,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: ERROR_MESSAGES.UNKNOWN_ERROR },
      { status: 400 },
    );
  }
};

// POST /api/chat/[chatId]/pin - Pin chat
export const pinChatController = async (req: Request, chatId: string) => {
  try {
    await connectDB();

    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.UNAUTHORIZED },
        { status: 401 },
      );
    }

    // Verify user owns the chat
    const chat = await chatService.getChatById(chatId);
    if (!chat || chat.userId.toString() !== userId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.CHAT_NOT_FOUND },
        { status: 404 },
      );
    }

    const updatedChat = await chatService.pinChat(chatId);

    return NextResponse.json({ chat: updatedChat });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: ERROR_MESSAGES.UNKNOWN_ERROR },
      { status: 400 },
    );
  }
};

// POST /api/chat/[chatId]/unpin - Unpin chat
export const unpinChatController = async (req: Request, chatId: string) => {
  try {
    await connectDB();

    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.UNAUTHORIZED },
        { status: 401 },
      );
    }

    // Verify user owns the chat
    const chat = await chatService.getChatById(chatId);
    if (!chat || chat.userId.toString() !== userId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.CHAT_NOT_FOUND },
        { status: 404 },
      );
    }

    const updatedChat = await chatService.unpinChat(chatId);

    return NextResponse.json({ chat: updatedChat });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: ERROR_MESSAGES.UNKNOWN_ERROR },
      { status: 400 },
    );
  }
};

// DELETE /api/chat/[chatId] - Delete chat
export const deleteChatController = async (req: Request, chatId: string) => {
  try {
    await connectDB();

    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.UNAUTHORIZED },
        { status: 401 },
      );
    }

    // Verify user owns the chat
    const chat = await chatService.getChatById(chatId);
    if (!chat || chat.userId.toString() !== userId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.CHAT_NOT_FOUND },
        { status: 404 },
      );
    }

    await chatService.deleteChat(chatId);

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: ERROR_MESSAGES.UNKNOWN_ERROR },
      { status: 400 },
    );
  }
};
