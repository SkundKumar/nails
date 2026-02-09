"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Brand */}
        <h2 className="font-mono text-3xl tracking-[0.2em] mb-4">NailedIT</h2>
        <p className="font-serif text-lg text-white/70 mb-8">
          Premium nail artistry, crafted with care
        </p>

        {/* Instagram CTA */}
        <div className="mb-10">
          <p className="font-serif text-sm text-white/50 uppercase tracking-widest mb-4">
            Book your appointment
          </p>
          <Link
            href="https://www.instagram.com/manyaaawho?igsh=MTloMndyNndkY2tldQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#e8a0b8] hover:bg-[#d88fa8] text-black font-mono text-sm tracking-wider px-8 py-4 transition-colors duration-300"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            DM FOR QUERIES
          </Link>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-white/20 mx-auto mb-8" />

        {/* Bottom */}
        <p className="font-serif text-xs text-white/40">
          © {new Date().getFullYear()} NailedIT. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
