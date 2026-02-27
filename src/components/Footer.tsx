"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#f6f1ee] text-[#3a2d2a]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[#f1d6d2]/45 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#f4e3d6]/45 blur-3xl" />
      </div>
      <div className="relative mx-auto flex w-full max-w-5xl flex-col px-6 py-16 text-center">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#b18f86]">FreshOns Studio</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
              Need a custom website that feels as polished as your brand?
            </h2>
            <p className="mt-3 text-base text-[#6f5852]">
              We design and build tailored sites with story, motion, and conversion in mind. Share your idea and we will map the rest.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 md:w-auto md:items-end">
            <Link
              href="https://ig.me/m/fresh.ons"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#d4707a] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-[#c85f6a] md:w-auto"
            >
              Request your website
            </Link>
            <span className="text-xs uppercase tracking-[0.2em] text-[#9f7f76]">
              DM us for timelines and pricing
            </span>
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-[#e6d7d2]" />

        <div className="mt-12 flex flex-col items-center text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-[#b18f86]">FreshOns Studio</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[0.18em] md:text-4xl">Fresh Ons</h2>
          <p className="mt-3 text-base text-[#6f5852]">
            Premium nail artistry, crafted with care
          </p>

          <div className="mt-8 flex w-full flex-col items-center gap-4">
            <p className="text-xs uppercase tracking-[0.22em] text-[#9f7f76]">
              Book your appointment
            </p>
            <Link
              href="https://www.instagram.com/fresh.ons?utm_source=qr&igsh=MTRnYmMzOGp6MzE4bg=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#3a2d2a] transition hover:-translate-y-0.5 hover:bg-[#f3e6e2]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              DM for queries
            </Link>
          </div>

          <div className="mt-10 h-px w-16 bg-[#e6d7d2]" />
          <p className="mt-6 text-xs text-[#9f7f76]">
            © {new Date().getFullYear()} Fresh Ons. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
