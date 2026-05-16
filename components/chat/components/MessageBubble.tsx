"use client";

import { Bot, User } from "lucide-react";
import type { Message } from "./types";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  console.log("message", message);

  return (
    <div
      className={`flex items-start gap-3 sm:gap-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div
          className="
          w-9 h-9 rounded-xl 
          bg-gradient-to-br from-purple-500 to-blue-500 
          flex items-center justify-center 
          flex-shrink-0
          shadow-md shadow-purple-500/20
        "
        >
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Message */}
      <div
        className={`
          max-w-[85%] sm:max-w-[75%] 
          px-4 py-3 rounded-2xl text-sm leading-relaxed
          ${
            isUser
              ? `
                bg-gradient-to-r from-purple-500 to-blue-500 
                text-white 
                shadow-lg shadow-purple-500/20
              `
              : `
                bg-white/5 backdrop-blur-xl 
                border border-white/10 
                text-white/90
              `
          }
        `}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div
          className="
          w-9 h-9 rounded-xl 
          bg-gradient-to-br from-blue-500 to-cyan-500 
          flex items-center justify-center 
          flex-shrink-0
          shadow-md shadow-blue-500/20
        "
        >
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
}
