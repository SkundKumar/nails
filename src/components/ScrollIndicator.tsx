"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY < 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={handleClick}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-[#e8d8d8] cursor-pointer group"
          aria-label="Scroll down"
        >
          <span className="text-xs font-medium tracking-[0.12em] text-[#9a7a6a] group-hover:text-[#d4707a] transition-colors select-none">
            Scroll down
          </span>
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#d4707a]"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M7 10l5 5 5-5" />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
