"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(ScrollTrigger, Flip);

const galleryImages = [
  "/nails/cherry red with white star on middle and ring finger.jpg",
  "/nails/cherry red and white hearts.jpg",
  "/nails/french tips with cherries.jpg",
  "/nails/french with just bow on every finger.jpg",
  "/nails/pink heart nails.jpg",
  "/nails/red and white frenchies.jpg",
  "/nails/subtle white flowers.jpg",
  ,
  "/nails/pink and silver gradient.jpg",
];

export default function BentoGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const flipCtxRef = useRef<gsap.Context | null>(null);

  const createTween = useCallback(() => {
    const galleryEl = galleryRef.current;
    if (!galleryEl) return;

    const items = galleryEl.querySelectorAll(".bento-item");
    if (items.length === 0) return;

    // Clean up previous context
    if (flipCtxRef.current) {
      flipCtxRef.current.revert();
    }
    galleryEl.classList.remove("bento-final");

    flipCtxRef.current = gsap.context(() => {
      // Capture final state
      galleryEl.classList.add("bento-final");
      const flipState = Flip.getState(items);
      galleryEl.classList.remove("bento-final");

      const flip = Flip.to(flipState, {
        simple: true,
        ease: "power2.inOut",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: galleryEl,
          start: "center center",
          end: "+=100%",
          scrub: true,
          pin: wrapRef.current,
        },
      });

      tl.add(flip);

      return () => gsap.set(items, { clearProps: "all" });
    });
  }, []);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timeout = setTimeout(createTween, 100);
    window.addEventListener("resize", createTween);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", createTween);
      if (flipCtxRef.current) {
        flipCtxRef.current.revert();
      }
    };
  }, [createTween]);

  return (
    <>
      <div ref={wrapRef} className="bento-wrap">
        <div ref={galleryRef} className="bento-gallery" id="gallery-bento">
          {galleryImages.map((src, i) => (
            <div key={i} className="bento-item">
              <img src={src} alt={`Nail design ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .bento-wrap {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #f5f4f3;
        }

        .bento-gallery {
          position: relative;
          width: 100%;
          height: 100%;
          display: grid;
          gap: 1vh;
          grid-template-columns: repeat(3, 32.5vw);
          grid-template-rows: repeat(4, 23vh);
          justify-content: center;
          align-content: center;
        }

        .bento-gallery.bento-final {
          grid-template-columns: repeat(3, 100vw);
          grid-template-rows: repeat(4, 49.5vh);
          gap: 1vh;
        }

        .bento-item {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
        }

        .bento-item img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        .bento-item:nth-child(1) {
          grid-area: 1 / 1 / 3 / 2;
        }

        .bento-item:nth-child(2) {
          grid-area: 1 / 2 / 2 / 3;
        }

        .bento-item:nth-child(3) {
          grid-area: 2 / 2 / 4 / 3;
        }

        .bento-item:nth-child(4) {
          grid-area: 1 / 3 / 3 / 3;
        }

        .bento-item:nth-child(5) {
          grid-area: 3 / 1 / 3 / 2;
        }

        .bento-item:nth-child(6) {
          grid-area: 3 / 3 / 5 / 4;
        }

        .bento-item:nth-child(7) {
          grid-area: 4 / 1 / 5 / 2;
        }

        .bento-item:nth-child(8) {
          grid-area: 4 / 2 / 5 / 3;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .bento-gallery {
            grid-template-columns: repeat(2, 47vw);
            grid-template-rows: repeat(4, 23vh);
            gap: 0.5vh;
          }

          .bento-gallery.bento-final {
            grid-template-columns: repeat(2, 100vw);
            grid-template-rows: repeat(4, 49.5vh);
            gap: 0.5vh;
          }

          .bento-item:nth-child(1) {
            grid-area: 1 / 1 / 2 / 2;
          }

          .bento-item:nth-child(2) {
            grid-area: 1 / 2 / 2 / 3;
          }

          .bento-item:nth-child(3) {
            grid-area: 2 / 1 / 3 / 2;
          }

          .bento-item:nth-child(4) {
            grid-area: 2 / 2 / 3 / 3;
          }

          .bento-item:nth-child(5) {
            grid-area: 3 / 1 / 4 / 2;
          }

          .bento-item:nth-child(6) {
            grid-area: 3 / 2 / 4 / 3;
          }

          .bento-item:nth-child(7) {
            grid-area: 4 / 1 / 5 / 2;
          }

          .bento-item:nth-child(8) {
            grid-area: 4 / 2 / 5 / 3;
          }
        }
      `}</style>
    </>
  );
}
