import Image from 'next/image';

export function Logo({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon */}
      <Image 
        src="/threadAi.png" 
        alt="ThreadAI" 
        width={size}
        height={size}
        className="rounded-lg"
      />

      {/* Text */}
      <h1 className="text-2xl font-semibold">
        <span className="text-white">Thread</span>
        <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          AI
        </span>
      </h1>
    </div>
  );
}

export default function ThreadAILogo({ size = 64 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gradient */}
      <defs>
        <linearGradient id="threadGradient" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>

      {/* Background Rounded Square */}
      <rect
        x="2"
        y="2"
        width="96"
        height="96"
        rx="20"
        fill="#0B0F17"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="2"
      />

      {/* Main "P" Circuit Path */}
      <path
        d="
          M25 30 
          H65 
          Q75 30 75 40 
          V50 
          Q75 60 65 60 
          H50 
          V75
        "
        stroke="url(#threadGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner Horizontal Line */}
      <path
        d="M25 45 H55"
        stroke="url(#threadGradient)"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Nodes */}
      <circle cx="25" cy="30" r="4" fill="url(#threadGradient)" />
      <circle cx="25" cy="45" r="4" fill="url(#threadGradient)" />
      <circle cx="55" cy="45" r="4" fill="url(#threadGradient)" />
      <circle cx="50" cy="75" r="4" fill="url(#threadGradient)" />
    </svg>
  );
}
