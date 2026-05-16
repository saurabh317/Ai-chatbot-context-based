import { Logo } from "@/components/common/Logo";

function Header({ isSignIn }: { isSignIn: boolean }) {
  return (
    <div className="text-center mb-10">
      <div className="flex justify-center mb-6">
        <Logo />
      </div>

      <p className="text-white/60 mt-2 text-sm">
        {isSignIn
          ? "Welcome back. Continue your conversations."
          : "Create your account and start building."}
      </p>
    </div>
  );
}

export default Header;
