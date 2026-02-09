"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MasonryItem } from "@/components/ui/Masonry";
import { getNailPreferences } from "@/components/NailCustomizer";

interface DesignModalProps {
  item: MasonryItem | null;
  onClose: () => void;
  instagramUsername: string;
}

export default function DesignModal({
  item,
  onClose,
  instagramUsername,
}: DesignModalProps) {
  const handleDmToOrder = () => {
    if (!item) return;
    // Get saved nail preferences
    const prefs = getNailPreferences();
    const prefsPart =
      prefs.shape || prefs.size
        ? `\nShape: ${prefs.shape || "not selected"} | Length: ${prefs.size || "not selected"}`
        : "";
    // Copy design name + preferences to clipboard
    navigator.clipboard.writeText(
      `Hi! I'd love to order the "${item.name}" design ✨${prefsPart}`
    );
    // Open Instagram DM
    window.open(
      `https://ig.me/m/${instagramUsername}`,
      "_blank",
      "noopener"
    );
  };

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#faf8f6] rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-[#9a8a8a] hover:text-[#d4707a] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 1L13 13M1 13L13 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Image */}
            <div className="w-full aspect-4/5 overflow-hidden">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="px-6 py-5 text-center">
              <h3
                className="text-2xl text-[#3a2a2a]"
                style={{ fontFamily: "var(--font-dancing)" }}
              >
                {item.name}
              </h3>

              <p className="text-[11px] text-[#c4b0b0] tracking-[0.15em] uppercase mt-1.5">
                tap below to order via dm ✨
              </p>

              <button
                onClick={handleDmToOrder}
                className="mt-4 mb-1 w-full py-3 rounded-full bg-[#d4707a] hover:bg-[#c4606a] text-white text-sm tracking-wider uppercase transition-colors"
                style={{ fontFamily: "var(--font-dancing)", fontSize: "1.1rem", letterSpacing: "0.05em", textTransform: "none" }}
              >
                DM to Order 💌
              </button>

              <p className="text-[10px] text-[#c4b0b0] mt-2">
                message copied to clipboard
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
