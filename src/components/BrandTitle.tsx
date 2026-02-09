"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BrandTitle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  const text = "NailedIT";

  useEffect(() => {
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];

    // Set initial state — hidden
    gsap.set(letters, { y: 60, opacity: 0, rotateX: -90 });

    const animateIn = () => {
      gsap.to(letters, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.04,
        delay: 0.2,
      });
    };

    // Listen for preloader complete event
    window.addEventListener("preloader-done", animateIn);

    // Fallback if preloader already done or missing
    const fallback = setTimeout(animateIn, 3000);

    return () => {
      window.removeEventListener("preloader-done", animateIn);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute top-8 left-0 w-full flex justify-center z-20 pointer-events-none"
      style={{ perspective: "600px" }}
    >
      <h1 className="text-lg md:text-2xl font-mono tracking-[0.3em] uppercase text-black select-none flex overflow-hidden">
        {text.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => { lettersRef.current[i] = el; }}
            className="inline-block opacity-0"
            style={{ display: char === " " ? "inline" : "inline-block", minWidth: char === " " ? "0.5em" : undefined }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}
