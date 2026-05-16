import { createChatController, getChatsController } from "@/controllers/chat-controller";

export async function POST(req: Request) {
  return createChatController(req);
}

export async function GET(req: Request) {
  return getChatsController(req);
}
