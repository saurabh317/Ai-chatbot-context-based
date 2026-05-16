import { Bot } from "lucide-react";

export default function LoadingIndicator() {
  return (
    <div className="flex gap-3 sm:gap-4 justify-start">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4" />
      </div>
      <div className="bg-gray-800 rounded-2xl px-4 py-3">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
        </div>
      </div>
    </div>
  );
}
