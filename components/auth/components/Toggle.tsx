function AuthToggle({
  isSignIn,
  setIsSignIn,
}: {
  isSignIn: boolean;
  setIsSignIn: (v: boolean) => void;
}) {
  return (
    <div className="flex mb-8 bg-white/5 rounded-xl p-1 border border-white/10">
      <button
        onClick={() => setIsSignIn(true)}
        className={`w-1/2 py-2 rounded-lg text-sm transition ${
          isSignIn
            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
            : "text-white/50"
        }`}
      >
        Sign In
      </button>

      <button
        onClick={() => setIsSignIn(false)}
        className={`w-1/2 py-2 rounded-lg text-sm transition ${
          !isSignIn
            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
            : "text-white/50"
        }`}
      >
        Sign Up
      </button>
    </div>
  );
}

export default AuthToggle;
