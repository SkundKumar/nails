"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ScrollTextSection() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const el = textRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex h-[30vh] items-center justify-center overflow-hidden bg-[#f5f4f3]">
      <div
        ref={textRef}
        className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-black uppercase text-center select-none"
      >
        Browse Our Collection
      </div>
    </section>
  );
}
