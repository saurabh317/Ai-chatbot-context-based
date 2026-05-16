import { getChatMessagesController, sendMessageController, deleteChatController, pinChatController, unpinChatController } from "@/controllers/chat-controller";

export async function GET(req: Request, { params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await params;
  return getChatMessagesController(req, chatId);
}

export async function POST(req: Request, { params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await params;
  const url = new URL(req.url);
  const action = url.searchParams.get('action');
    
  if (action === 'pin') {
    return pinChatController(req, chatId);
  } else if (action === 'unpin') {
    return unpinChatController(req, chatId);
  } else {
    return sendMessageController(req, chatId);
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await params;
  return deleteChatController(req, chatId);
}
