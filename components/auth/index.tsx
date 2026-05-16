import BackgroundGlow from "./components/BackgroundGlow";
import FormWrapper from "./wrappers/FormWrapper";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F17] relative overflow-hidden text-white">
      <BackgroundGlow />
      <FormWrapper />
    </div>
  );
}
