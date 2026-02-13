"use client";

import { motion } from "framer-motion";

type SectionScrollHintProps = {
  label?: string;
  className?: string;
  buttonClassName?: string;
  offset?: number;
  tone?: "dark" | "light";
};

export default function SectionScrollHint({
  label = "Scroll to start your custom website",
  className = "",
  buttonClassName = "",
  offset = 0.85,
  tone = "dark",
}: SectionScrollHintProps) {
  const toneClasses =
    tone === "light"
      ? "border-[#d9c7c7]/80 bg-white/70 text-[#9a7a6a] hover:text-[#d4707a]"
      : "border-white/15 bg-white/5 text-white/70 hover:text-white";
  const iconClasses = tone === "light" ? "text-[#9a7a6a] group-hover:text-[#d4707a]" : "text-white/70 group-hover:text-white";
  const handleClick = () => {
    window.scrollBy({ top: window.innerHeight * offset, behavior: "smooth" });
  };

  return (
    <div className={`flex items-center justify-center ${className}`.trim()}>
      <button
        type="button"
        onClick={handleClick}
        className={`group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.22em] backdrop-blur transition ${toneClasses} ${buttonClassName}`.trim()}
        aria-label={label}
      >
        <span>{label}</span>
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClasses}
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M7 10l5 5 5-5" />
        </motion.svg>
      </button>
    </div>
  );
}
