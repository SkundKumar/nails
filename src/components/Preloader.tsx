"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NUM_POINTS = 10;
const NUM_PATHS = 2;
const DELAY_POINTS_MAX = 0.3;
const DELAY_PER_PATH = 0.25;

const BRAND_TEXT = "NailedIT";

export default function Preloader() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const brandRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (paths.length === 0) return;

    const allPoints: number[][] = [];
    const pointsDelay: number[] = [];

    for (let i = 0; i < NUM_PATHS; i++) {
      const points: number[] = [];
      allPoints.push(points);
      for (let j = 0; j < NUM_POINTS; j++) {
        points.push(100);
      }
    }

    function render() {
      for (let i = 0; i < NUM_PATHS; i++) {
        const path = paths[i];
        const points = allPoints[i];

        let d = `M 0 ${points[0]} C`;

        for (let j = 0; j < NUM_POINTS - 1; j++) {
          const p = ((j + 1) / (NUM_POINTS - 1)) * 100;
          const cp = p - (1 / (NUM_POINTS - 1)) * 100 / 2;
          d += ` ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${points[j + 1]}`;
        }

        d += ` V 0 H 0`;
        path.setAttribute("d", d);
      }
    }

    // Initial render (fully covered)
    render();

    // Set letters hidden initially
    gsap.set(letters, { y: 60, opacity: 0, rotateX: -90 });

    // Master timeline: text in → hold → text out → curtain reveal
    const master = gsap.timeline();

    // Step 1: Letters animate in one by one
    master.to(letters, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.04,
    }, 0.3);

    // Step 2: Hold for a beat, then animate letters out
    master.to(letters, {
      y: -40,
      opacity: 0,
      rotateX: 90,
      duration: 0.4,
      ease: "power2.in",
      stagger: 0.02,
    }, "+=0.5");

    // Step 3: SVG curtain reveal
    master.call(() => {
      for (let i = 0; i < NUM_POINTS; i++) {
        pointsDelay[i] = Math.random() * DELAY_POINTS_MAX;
      }

      const curtainTl = gsap.timeline({
        onUpdate: render,
        onComplete: () => {
          window.dispatchEvent(new Event("preloader-done"));
          setTimeout(() => setVisible(false), 100);
        },
        defaults: {
          ease: "power2.inOut",
          duration: 0.9,
        },
      });

      for (let i = 0; i < NUM_PATHS; i++) {
        const points = allPoints[i];
        const pathDelay = DELAY_PER_PATH * (NUM_PATHS - i - 1);

        for (let j = 0; j < NUM_POINTS; j++) {
          const delay = pointsDelay[j];
          curtainTl.to(points, { [j]: 0 }, delay + pathDelay);
        }
      }
    }, [], "+=0.1");

    return () => { master.kill(); };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Brand name centered — letter by letter */}
      <div
        ref={brandRef}
        className="absolute inset-0 flex items-center justify-center z-10"
        style={{ perspective: "600px" }}
      >
        <span className="text-2xl md:text-4xl font-mono tracking-[0.3em] uppercase text-black select-none flex overflow-hidden">
          {BRAND_TEXT.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => { lettersRef.current[i] = el; }}
              className="inline-block"
              style={{ minWidth: char === " " ? "0.5em" : undefined }}
            >
              {char}
            </span>
          ))}
        </span>
      </div>
      <svg
        ref={svgRef}
        className="w-full h-full fixed top-0 left-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="preloader-grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8c8d8" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <linearGradient id="preloader-grad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5e6d8" />
            <stop offset="100%" stopColor="#f8c8d8" />
          </linearGradient>
        </defs>
        <path
          ref={(el) => { pathRefs.current[0] = el; }}
          fill="url(#preloader-grad2)"
        />
        <path
          ref={(el) => { pathRefs.current[1] = el; }}
          fill="url(#preloader-grad1)"
        />
      </svg>
    </div>
  );
}
