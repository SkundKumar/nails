"use client";

import Link from "next/link";
import Footer from "@/components/Footer";

export default function CustomCollection() {
  return (
    <>
      <main className="min-h-screen bg-[#f5f4f3] flex flex-col items-center justify-center px-6 text-center">
        {/* Decorative sparkles */}
        <p className="text-4xl mb-4 animate-pulse">✨💅✨</p>

        <h1
          className="text-4xl md:text-5xl text-[#3a2a2a] mb-3"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          Made For You
        </h1>
        <p className="text-sm text-[#c4b0b0] tracking-[0.15em] uppercase mb-10 max-w-sm">
          your dream nails, designed together
        </p>

        <Link
          href="https://www.instagram.com/fresh.ons?utm_source=qr&igsh=MTRnYmMzOGp6MzE4bg=="
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full text-white font-medium text-sm tracking-wide overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #f0a6ca, #d4707a, #c9a0dc)",
            boxShadow:
              "0 0 20px rgba(212, 112, 122, 0.4), 0 0 60px rgba(212, 112, 122, 0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          {/* Shimmer overlay */}
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.3) 50%, transparent 80%)",
              animation: "shimmer 2s infinite",
            }}
          />
          <span className="relative z-10">💌</span>
          <span className="relative z-10">Let&apos;s Design Yours Together, Babe!</span>
        </Link>

        <p className="mt-6 text-xs text-[#c4b0b0] tracking-wide">
          tap to DM us on Instagram &hearts;
        </p>
      </main>
      <Footer />

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  );
}
