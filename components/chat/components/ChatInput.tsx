"use client";

import Loading from "@/components/common/Loading";
import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  isLoading,
}: ChatInputProps) {
  return (
    <div className="bg-black backdrop-blur-xl px-4 py-4">
      <div className="max-w-4xl mx-auto">
        {/* Input Container */}
        <div
          className="
          flex items-center gap-3 
          rounded-2xl 
          bg-[#1a1f2e]/95 backdrop-blur-xl 
          px-3 py-2
          focus-within:bg-[#1a1f2e]/80 
          transition
        "
        >
          {/* Input */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            placeholder="Ask anything..."
            disabled={isLoading}
            className="
              flex-1 bg-transparent 
              px-3 py-2 
              text-sm text-white 
              placeholder-white/40 
              outline-none
            "
          />

          {/* Send Button */}
          <button
            onClick={onSend}
            disabled={!value.trim() || isLoading}
            className="
              flex items-center justify-center
              w-10 h-10 rounded-xl
              bg-gradient-to-r from-purple-500 to-blue-500
              hover:opacity-90
              disabled:opacity-40 disabled:cursor-not-allowed
              transition
              shadow-lg shadow-purple-500/20
            "
          >
            {isLoading ? (
              <Loading size={16} />
            ) : (
              <Send className="w-4 h-4 text-white" />
            )}
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-white/40 text-center mt-3 hidden sm:block">
          AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}
