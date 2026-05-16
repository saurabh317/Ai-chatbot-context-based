"use client";

import { Check, X, Info } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

type Props = {
  type?: "success" | "error" | "info";
  message: string;
  closeToast?: () => void;
};

export function GlassToast({ type = "info", message, closeToast }: Props) {
  const config = {
    success: {
      icon: <Check className="w-5 h-5 text-green-400" />,
      circle: "bg-green-500/20",
      progress: "from-green-400 to-emerald-500",
    },
    error: {
      icon: <X className="w-5 h-5 text-red-400" />,
      circle: "bg-red-500/20",
      progress: "from-red-400 to-rose-500",
    },
    info: {
      icon: <Info className="w-5 h-5 text-blue-400" />,
      circle: "bg-blue-500/20",
      progress: "from-blue-400 to-indigo-500",
    },
  };

  const { icon, circle, progress } = config[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.98 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative w-full max-w-md rounded-2xl bg-white/20 p-[6px] shadow-2xl"
    >
      {/* Inner glass card */}
      <div className="relative flex items-center gap-4 rounded-2xl bg-gradient-to-br from-[#1a1a1a]/95 to-[#0f0f0f]/95 backdrop-blur-xl px-5 py-4">
        {/* Icon */}
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-full ${circle}`}
        >
          {icon}
        </div>

        {/* Message */}
        <p className="text-white/90 text-lg font-medium flex-1">{message}</p>

        {/* Close button */}
        <button
          onClick={closeToast}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
        >
          <X className="w-4 h-4 text-white/70" />
        </button>
      </div>
    </motion.div>
  );
}

export const showToast = (
  type: "success" | "error" | "info",
  message: string,
) => {
  toast(<GlassToast type={type} message={message} />, {
    className: "!bg-transparent !shadow-none !p-0",
    autoClose: 2000,
  });
};
