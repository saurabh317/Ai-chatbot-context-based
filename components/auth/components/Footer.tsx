function Footer({
  isSignIn,
  setIsSignIn,
}: {
  isSignIn: boolean;
  setIsSignIn: (v: boolean) => void;
}) {
  return (
    <p className="text-center text-white/60 text-sm mt-6">
      {isSignIn ? "New here?" : "Already have an account?"}
      <span
        onClick={() => setIsSignIn(!isSignIn)}
        className="ml-2 text-purple-400 cursor-pointer hover:text-purple-300"
      >
        {isSignIn ? "Create account" : "Sign in"}
      </span>
    </p>
  );
}

export default Footer;
