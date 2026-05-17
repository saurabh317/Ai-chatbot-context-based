"use client";

import { Menu } from "lucide-react";
import ChatActions from "./ChatActions";
import { Logo } from "@/components/common/Logo";

interface ChatHeaderProps {
  onMenuClick: () => void;
  chatId: string | null;
  isPinned: boolean;
  onPinUnpin: () => void;
  onDelete: () => void;
}

export default function ChatHeader({
  onMenuClick,
  chatId,
  isPinned,
  onPinUnpin,
  onDelete,
}: ChatHeaderProps) {
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-3
      bg-black backdrop-blur-xl">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
        >
          <Menu className="w-5 h-5 text-white/70 hover:text-white" />
        </button>

        {/* Logo instead of plain icon */}
        <div className="flex items-center gap-2">
          <Logo className="scale-75" size={44} />
        </div>
      </div>

      {/* RIGHT ACTIONS */}
      {chatId && (
        <div className="flex items-center">
          <ChatActions
            chatId={chatId}
            isPinned={isPinned}
            onPinUnpin={onPinUnpin}
            onDelete={onDelete}
          />
        </div>
      )}
    </div>
  );
}