import { Sparkles } from "lucide-react";

function SubmitButton({
  isLoading,
  isSignIn,
}: {
  isLoading: boolean;
  isSignIn: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full py-3 mt-4 rounded-xl font-medium flex items-center justify-center gap-2
      bg-gradient-to-r from-purple-500 to-blue-500
      hover:opacity-90 transition shadow-lg shadow-purple-500/20
      disabled:opacity-50"
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <Sparkles className="w-4 h-4" />
      )}
      {isSignIn ? "Sign In" : "Sign Up"}
    </button>
  );
}

export default SubmitButton;
