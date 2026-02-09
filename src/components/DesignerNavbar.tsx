"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "#gallery" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function DesignerNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-[#f5f4f3]/90 border-b border-black/10 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-3xl font-serif tracking-widest uppercase text-black select-none" style={{letterSpacing: '0.25em'}}>
          <span className="font-bold">Nails</span> Studio
        </Link>
        <div className="hidden gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-lg font-serif uppercase tracking-widest text-black px-2 py-1 transition-all duration-200 hover:after:w-full after:content-[''] after:block after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 after:mt-1"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`block h-0.5 w-7 bg-black transition-all ${open ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block h-0.5 w-7 bg-black transition-all ${open ? "opacity-0" : ""}`}></span>
          <span className={`block h-0.5 w-7 bg-black transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#f5f4f3] md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="mb-6"
              >
                <Link
                  href={link.href}
                  className="text-2xl font-serif uppercase tracking-widest text-black px-4 py-2"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
