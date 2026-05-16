import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "New Thread",
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    pinnedOrder: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

export const Chat =
  mongoose.models.Chat || mongoose.model("Chat", chatSchema);
