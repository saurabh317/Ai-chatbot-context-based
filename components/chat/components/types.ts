export type Message = {
  _id: string;
  chatId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type Chat = {
  _id: string;
  userId: string;
  title: string;
  isPinned: boolean;
  pinnedOrder: number | null;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
};
