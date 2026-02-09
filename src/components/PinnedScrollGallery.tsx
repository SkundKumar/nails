"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BentoGallery from "./BentoGallery";

gsap.registerPlugin(ScrollTrigger);

interface PinnedItem {
  title: string;
  subtitle: string;
  price: string;
  image: string;
  href: string;
}

interface PinnedScrollGalleryProps {
  items: PinnedItem[];
}

export default function PinnedScrollGallery({ items }: PinnedScrollGalleryProps) {
  const pinSectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const router = useRouter();

  const handleNavigate = useCallback((href: string) => {
    // Kill all ScrollTrigger instances and revert GSAP context before navigating
    // This prevents the "removeChild" error from pinned elements
    if (ctxRef.current) {
      ctxRef.current.revert();
      ctxRef.current = null;
    }
    ScrollTrigger.getAll().forEach((st) => st.kill());
    router.push(href);
  }, [router]);

  useEffect(() => {
    if (!pinSectionRef.current || !listRef.current || !fillRef.current) return;

    const listItems = gsap.utils.toArray<HTMLLIElement>("li", listRef.current);
    const slides = gsap.utils.toArray<HTMLDivElement>(".pinned-slide", pinSectionRef.current);
    const fill = fillRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: "top top",
          end: "+=" + listItems.length * 50 + "%",
          pin: true,
          scrub: true,
        },
      });

      // First element visible, set the marker
      gsap.set(fill, {
        scaleY: 1 / listItems.length,
        transformOrigin: "top left",
      });

      listItems.forEach((item, i) => {
        const previousItem = listItems[i - 1];
        if (previousItem) {
          tl.set(item, { color: "#d4707a" }, 0.5 * i)
            .to(
              slides[i],
              {
                autoAlpha: 1,
                duration: 0.2,
              },
              0.5 * i
            )
            .set(previousItem, { color: "#9a8a8a" }, 0.5 * i)
            .to(
              slides[i - 1],
              {
                autoAlpha: 0,
                duration: 0.2,
              },
              0.5 * i
            );
        } else {
          gsap.set(item, { color: "#d4707a" });
          gsap.set(slides[i], { autoAlpha: 1 });
        }
      });

      // Fill bar: animate across the full timeline, synced to items
      // Total timeline ends at 0.5 * (listItems.length - 1) + some buffer
      const totalDuration = 0.5 * (listItems.length - 1) + 0.5;
      tl.to(
        fill,
        {
          scaleY: 1,
          transformOrigin: "top left",
          ease: "none",
          duration: totalDuration,
        },
        0
      );

      tl.to({}, { duration: 0.3 }); // small pause at the end before un-pin
    });

    ctxRef.current = ctx;

    return () => {
      ctx.revert();
      ctxRef.current = null;
    };
  }, [items]);

  return (
    <>
      {/* Spacer section above */}
      <section className="flex mb-20 h-screen w-full items-center justify-center bg-[#f5f4f3]">
        <BentoGallery />
      </section>

      {/* Pinned scroll section */}
      <section
        ref={pinSectionRef}
        className="relative z-10 flex h-screen w-full items-center justify-center bg-[#f5f4f3]"
        style={{
          borderTop: "dashed 2px #e8d8d8",
          borderBottom: "dashed 2px #e8d8d8",
        }}
      >
        <div className="relative mx-auto flex w-full max-w-300 px-6 md:px-10">
          {/* List */}
          <ul
            ref={listRef}
            className="m-0 list-none p-0 pr-8 md:pr-14"
            style={{ flexGrow: 0 }}
          >
            {items.map((item, i) => (
              <li key={i} className="mb-8 md:mb-10">
                <button onClick={() => handleNavigate(item.href)} className="group block text-left cursor-pointer">
                  <span
                    className="block text-[1.7rem] md:text-[2.4rem] leading-snug group-hover:text-[#d4707a] transition-colors"
                    style={{ fontFamily: "var(--font-dancing)" }}
                  >
                    {item.title} <span className="text-[0.6em] opacity-40">✦</span>
                  </span>
                  <span className="block text-[10px] md:text-[11px] font-sans text-[#c4b0b0] mt-1 tracking-[0.15em] uppercase font-light">
                    {item.subtitle}
                  </span>
                  <span className="flex items-baseline gap-1 mt-2">
                    <span className="text-[10px] text-[#d4a0a8] tracking-wider uppercase font-sans">from</span>
                    <span
                      className="text-2xl md:text-3xl font-normal"
                      style={{ fontFamily: "var(--font-dancing)" }}
                    >
                      {item.price}
                    </span>
                    <span className="text-[10px] text-[#d4a0a8] tracking-wide font-sans">only ✨</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Fill / progress bar */}
          <div
            ref={fillRef}
            className="absolute left-0 top-0 h-full w-0.5"
            style={{ backgroundColor: "#d4707a" }}
          />

          {/* Right side with slides */}
          <div className="relative" style={{ flexGrow: 1 }}>
            {items.map((item, i) => (
              <div
                key={i}
                className="pinned-slide absolute right-4 flex items-center justify-center"
                style={{
                  width: "50%",
                  top: "50%",
                  transform: "translateY(-50%)",
                  opacity: 0,
                  visibility: "hidden",
                  borderRadius: "14px",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full max-w-75 rounded-2xl object-cover shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    
    </>
  );
}
