"use client";

import { useState } from "react";
import Link from "next/link";
import Masonry, { MasonryItem } from "@/components/ui/Masonry";
import DesignModal from "@/components/DesignModal";

interface CollectionPageLayoutProps {
  title: string;
  subtitle: string;
  price: string;
  items: MasonryItem[];
  instagramUsername?: string;
  showCustomCta?: boolean;
}

export default function CollectionPageLayout({
  title,
  subtitle,
  price,
  items,
  instagramUsername = "fresh.ons",
  showCustomCta = false,
}: CollectionPageLayoutProps) {
  const [selectedItem, setSelectedItem] = useState<MasonryItem | null>(null);

  return (
    <main className="min-h-screen bg-[#f5f4f3] relative">
      {/* Top gradient */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[#f0d4d8] to-transparent pointer-events-none" />

      {/* Back nav */}
      <div className="px-6 pt-6 relative">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[11px] text-[#b8a8a8] tracking-[0.12em] uppercase hover:text-[#d4707a] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 2L4 7L9 12"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          back
        </Link>
      </div>

      {/* Header */}
      <header className="px-6 pt-8 pb-10 text-center relative">
        <h1
          className="text-4xl md:text-6xl text-[#3a2a2a]"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          {title} <span className="text-[0.5em] opacity-30">✦</span>
        </h1>
        <p className="text-[11px] md:text-xs text-[#c4b0b0] tracking-[0.15em] uppercase mt-3">
          {subtitle}
        </p>
        <p className="mt-3" style={{ fontFamily: "var(--font-dancing)" }}>
          <span className="text-[11px] text-[#d4a0a8] tracking-wider uppercase font-sans">
            from{" "}
          </span>
          <span className="text-2xl text-[#d4707a]">{price}</span>
          <span className="text-[11px] text-[#d4a0a8] tracking-wide font-sans">
            {" "}
            only ✨
          </span>
        </p>
      </header>

      {/* Masonry gallery */}
      <div className="px-4 md:px-8 pb-16 relative">
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover
          hoverScale={0.95}
          blurToFocus
          colorShiftOnHover={false}
          onItemClick={(item) => setSelectedItem(item)}
        />
      </div>

      {/* Custom CTA */}
      {showCustomCta && (
        <section className="relative px-6 pb-20 pt-8 flex flex-col items-center text-center">
          <div className="w-16 h-px bg-[#e0cece] mb-8" />
          <p
            className="text-2xl md:text-3xl text-[#3a2a2a] mb-2"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            Didn&apos;t find the one? 💕
          </p>
          <p className="text-[11px] md:text-xs text-[#b8a8a8] tracking-[0.12em] uppercase max-w-sm">
            No worries babe! Tell us your dream design & we&apos;ll make it just for you
          </p>
          <a
            href="https://ig.me/m/fresh.ons"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#d4a0a8]/50 text-[11px] md:text-xs font-sans uppercase tracking-[0.18em] text-[#d4707a] hover:bg-[#d4707a] hover:text-white hover:border-transparent transition-all duration-300"
          >
            Get a custom set
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </section>
      )}

      {/* Modal */}
      <DesignModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        instagramUsername={instagramUsername}
      />
    </main>
  );
}
