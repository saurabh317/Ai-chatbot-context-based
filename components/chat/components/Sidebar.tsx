"use client";

import {
  Plus,
  User,
  Bot,
  X,
  LogOut,
  Trash2,
  Pin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Chat } from "./types";
import { useCallback, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearMessages, resetChat, setSelectedChatId } from "@/store/chatSlice";
import { clearUser } from "@/store/userSlice";
import { AUTH_ROUTES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useCreateChat } from "@/hooks/api/use-chat";
import Loading from "@/components/common/Loading";

const getRelativeDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "1 day ago";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  } else {
    const months = Math.floor(diffDays / 30);
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onChatDelete: (chatId: string) => void;
  isLoading: boolean;
}

export default function Sidebar({
  isOpen,
  onClose,
  onChatDelete,
  isLoading,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { mutate: createChat } = useCreateChat();

  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const { chats, selectedChatId } = useAppSelector((state) => state.chat);

  const handleToggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleSignOut = () => {
    dispatch(resetChat());
    dispatch(clearUser());
    localStorage.removeItem("user");
    router.push(AUTH_ROUTES.AUTH_PAGE);
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to sign out?")) {
      handleSignOut();
    }
  };

  const handleNewChat = async () => {
    createChat(undefined, {
      onSuccess: (result) => {
        dispatch(setSelectedChatId(result.chat._id));
        dispatch(clearMessages());
      },
    });
  };

  const handleChatSelect = (chatId: string) => {
    if (chatId === selectedChatId) {
      return;
    }
    dispatch(setSelectedChatId(chatId));
    dispatch(clearMessages());
  };

  // Group chats by date
  const groupChatsByDate = useCallback(() => {
    const groups: { [key: string]: Chat[] } = {};

    chats.forEach((chat) => {
      const dateKey = getRelativeDate(chat.createdAt);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(chat);
    });

    return groups;
  }, [chats]);

  const groupedChats = useMemo(() => groupChatsByDate(), [groupChatsByDate]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-50 lg:z-auto ${isCollapsed ? "w-16" : "w-80"} h-full flex flex-col
        bg-[#1a1f2e]/95 backdrop-blur-xl
        transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Top */}
        <div className="p-4 flex items-center gap-2">
          {!isCollapsed && (
            <button
              onClick={handleNewChat}
              className="
                flex-1 flex items-center justify-center gap-2
                px-4 py-3 rounded-xl
                bg-gradient-to-r from-purple-500 to-blue-500
                hover:opacity-90 transition
                shadow-lg shadow-purple-500/20
                text-sm font-medium
              "
            >
              <Plus className="w-4 h-4" />
              New Thread
            </button>
          )}

          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>

          {/* Collapse Toggle */}
          <button
            onClick={handleToggleCollapse}
            className="hidden lg:block p-2 rounded-lg hover:bg-white/10 transition"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-white/70" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-white/70" />
            )}
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-3">
          {isLoading ? (
            <div className="px-3 py-2 text-sm text-white/40">
              <Loading size={18} />
            </div>
          ) : chats.length === 0 ? (
            <div className="px-3 py-2 text-sm text-white/40">No chats yet</div>
          ) : (
            Object.entries(groupedChats).map(([dateLabel, dateChats]) => (
              <div key={dateLabel}>
                {!isCollapsed && (
                  <div className="text-xs text-white/40 px-3 py-3 font-medium">
                    {dateLabel}
                  </div>
                )}
                {dateChats.map((chat) => {
                  const isActive = selectedChatId === chat._id;

                  return (
                    <div
                      key={chat._id}
                      className={`
                        group flex items-center gap-3 px-3 py-3 rounded-xl text-sm
                        transition-all duration-200
                        ${
                          isActive
                            ? "bg-white/15 text-white"
                            : "text-white/60 hover:text-white hover:bg-white/8"
                        }
                      `}
                    >
                      {/* Chat select */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChatSelect(chat._id);
                        }}
                        className={`${isCollapsed ? "justify-center" : "flex-1 flex items-center gap-2"} text-left`}
                      >
                        <Bot className="w-4 h-4 flex-shrink-0 opacity-70" />

                        {!isCollapsed && (
                          <span className="truncate font-medium">
                            {chat.title}
                          </span>
                        )}

                        {!isCollapsed && chat.isPinned && (
                          <Pin
                            className="w-3 h-3 text-purple-400 flex-shrink-0"
                            fill="currentColor"
                          />
                        )}
                      </button>

                      {/* Delete */}
                      {!isCollapsed && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onChatDelete(chat._id);
                          }}
                          className="
                            p-1 rounded-md flex-shrink-0
                            opacity-0 group-hover:opacity-100
                            hover:bg-red-500/20 transition
                          "
                          title="Delete chat"
                        >
                          <Trash2 className="w-3 h-3 text-red-400" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-white/5">
          <div
            className={`${isCollapsed ? "justify-center" : "flex items-center gap-3"}`}
          >
            {/* Avatar */}
            <div
              className="
              w-9 h-9 rounded-xl 
              bg-gradient-to-br from-purple-500 to-blue-500
              flex items-center justify-center
              shadow-md shadow-purple-500/20
            "
            >
              <User className="w-4 h-4 text-white" />
            </div>

            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white truncate">
                  {user?.name || "User"}
                </div>
                <div className="text-xs text-white/40 truncate">
                  {user?.email || "user@example.com"}
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="
                p-2 rounded-lg 
                hover:bg-white/10 transition
              "
              title="Sign out"
            >
              <LogOut className="w-4 h-4 text-white/60" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
