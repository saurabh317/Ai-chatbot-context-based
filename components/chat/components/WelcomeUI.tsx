type FeatureCardProps = {
  icon: string;
  title: string;
  desc: string;
  color: "purple" | "blue" | "green";
};

function FeatureCard({ icon, title, desc, color }: FeatureCardProps) {
  const colorMap = {
    purple: "bg-purple-500/20 text-purple-400",
    blue: "bg-blue-500/20 text-blue-400",
    green: "bg-green-500/20 text-green-400",
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:bg-white/10 transition">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${colorMap[color]}`}
      >
        <span className="text-sm">{icon}</span>
      </div>
      <h3 className="text-white font-medium mb-1">{title}</h3>
      <p className="text-white/60 text-sm">{desc}</p>
    </div>
  );
}

type SuggestionProps = {
  text: string;
  setInput: (value: string) => void;
};

function Suggestion({ text, setInput }: SuggestionProps) {
  return (
    <button
      onClick={() => setInput(text)}
      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white/80 hover:text-white transition"
    >
      {text}
    </button>
  );
}

type Props = {
  setInput: (value: string) => void;
};

export default function WelcomeUI({ setInput }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-6 shadow-2xl shadow-purple-500/20">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
          <span className="text-white text-xl font-bold">T</span>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-white mb-3">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          ThreadAI
        </span>
      </h2>

      <p className="text-white/70 text-lg mb-8 max-w-md text-center">
        Your intelligent conversation partner that remembers context and
        delivers smarter responses
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl w-full mb-8">
        <FeatureCard
          icon="💡"
          title="Context Aware"
          desc="Remembers your conversation history"
          color="purple"
        />
        <FeatureCard
          icon="⚡"
          title="Fast Response"
          desc="Get instant answers to your questions"
          color="blue"
        />
        <FeatureCard
          icon="🔒"
          title="Secure & Private"
          desc="Your conversations are encrypted"
          color="green"
        />
      </div>

      <div className="flex flex-col items-center">
        <p className="text-white/50 text-sm mb-4">Try asking:</p>

        <div className="flex flex-wrap gap-2 justify-center">
          <Suggestion
            text="Help me write a Python script to analyze data"
            setInput={setInput}
          />
          <Suggestion
            text="Explain machine learning in simple terms"
            setInput={setInput}
          />
          <Suggestion
            text="What are the best practices for web development?"
            setInput={setInput}
          />
        </div>
      </div>
    </div>
  );
}
