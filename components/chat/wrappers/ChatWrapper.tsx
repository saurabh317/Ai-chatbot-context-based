"use client";

import { useState } from "react";
import ChatAreaWrapper from "./ChatAreaWrapper";
import SidebarWrapper from "./SideBarWrapper";

export default function ChatWrapper() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-black text-white">
      <SidebarWrapper
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <ChatAreaWrapper onMenuClick={() => setSidebarOpen(true)} />
    </div>
  );
}
