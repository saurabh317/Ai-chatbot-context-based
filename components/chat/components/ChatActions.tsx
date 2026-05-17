"use client";

import { useState } from "react";
import { Share2, MoreVertical, Pin, PinOff, Trash2 } from "lucide-react";

interface ChatActionsProps {
  chatId: string;
  isPinned: boolean;
  onPinUnpin: () => void;
  onDelete: () => void;
}

export default function ChatActions({
  chatId,
  isPinned,
  onPinUnpin,
  onDelete,
}: ChatActionsProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/chat/${chatId}`;

    if (navigator.share) {
      navigator
        .share({
          title: "ThreadAI Conversation",
          text: "Check out this AI chat conversation",
          url: shareUrl,
        })
        .catch(() => copyToClipboard(shareUrl));
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Chat link copied to clipboard!");
    });
  };

  return (
    <div className="relative flex items-center">
      {/* Share */}
      <button
        onClick={handleShare}
        className="p-2 rounded-lg hover:bg-white/10 transition"
        title="Share chat"
      >
        <Share2 className="w-5 h-5 text-white/60 hover:text-white transition" />
      </button>

      {/* More */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="p-2 rounded-lg hover:bg-white/10 transition ml-1"
        title="More options"
      >
        <MoreVertical className="w-5 h-5 text-white/60 hover:text-white transition" />
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10 bg-transparent"
            onClick={() => setShowDropdown(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 top-12 z-20 w-44 rounded-xl border border-white/10 bg-[#1a1f2e]/95 backdrop-blur-xl shadow-2xl p-1">
            {/* Pin / Unpin */}
            <button
              onClick={() => {
                onPinUnpin();
                setShowDropdown(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition"
            >
              {isPinned ? (
                <>
                  <PinOff className="w-4 h-4" />
                  Unpin Chat
                </>
              ) : (
                <>
                  <Pin className="w-4 h-4" />
                  Pin Chat
                </>
              )}
            </button>

            {/* Divider */}
            <div className="h-px bg-white/10 my-1" />

            {/* Delete */}
            <button
              onClick={() => {
                onDelete();
                setShowDropdown(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition"
            >
              <Trash2 className="w-4 h-4" />
              Delete Chat
            </button>
          </div>
        </>
      )}
    </div>
  );
}
