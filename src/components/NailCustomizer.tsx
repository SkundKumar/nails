"use client";

import { useState, useEffect, useCallback } from "react";
import Stepper, { Step } from "@/components/ui/Stepper";

// ─── Nail shape definitions ───
const NAIL_SHAPES = [
  {
    id: "almond",
    label: "Almond",
    description: "Tapered sides, rounded tip",
    path: "M25 85 Q25 10 50 2 Q75 10 75 85 Q50 90 25 85Z",
  },
  {
    id: "oval",
    label: "Oval",
    description: "Classic rounded shape",
    path: "M25 85 Q25 25 50 8 Q75 25 75 85 Q50 90 25 85Z",
  },
  {
    id: "round",
    label: "Round",
    description: "Short & natural look",
    path: "M25 85 Q25 35 50 18 Q75 35 75 85 Q50 90 25 85Z",
  },
  {
    id: "square",
    label: "Square",
    description: "Flat top, sharp corners",
    path: "M25 85 L25 15 Q25 10 30 10 L70 10 Q75 10 75 15 L75 85 Q50 90 25 85Z",
  },
  {
    id: "squoval",
    label: "Squoval",
    description: "Square + oval blend",
    path: "M25 85 L25 20 Q25 10 40 10 L60 10 Q75 10 75 20 L75 85 Q50 90 25 85Z",
  },
  {
    id: "coffin",
    label: "Coffin",
    description: "Tapered with flat tip",
    path: "M28 85 Q25 10 40 4 L60 4 Q75 10 72 85 Q50 90 28 85Z",
  },
  {
    id: "stiletto",
    label: "Stiletto",
    description: "Long & dramatically pointed",
    path: "M28 85 Q28 20 50 0 Q72 20 72 85 Q50 90 28 85Z",
  },
];

const SIZES = ["Short", "Medium", "Long"];

// ─── localStorage helpers ───
const STORAGE_KEY = "nailPreferences";

interface NailPreferences {
  shape: string;
  size: string;
}

function loadPreferences(): NailPreferences {
  if (typeof window === "undefined") return { shape: "", size: "Medium" };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { shape: "", size: "Medium" };
}

function savePreferences(prefs: NailPreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {}
}

export function getNailPreferences(): NailPreferences {
  return loadPreferences();
}

// ─── Component ───
export default function NailCustomizer() {
  const [shape, setShape] = useState("");
  const [size, setSize] = useState("Medium");
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const prefs = loadPreferences();
    if (prefs.shape) setShape(prefs.shape);
    if (prefs.size) setSize(prefs.size);
    setHydrated(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated) return;
    savePreferences({ shape, size });
  }, [shape, size, hydrated]);

  const handleShapeSelect = useCallback((id: string) => {
    setShape(id);
  }, []);

  const sizeIndex = SIZES.indexOf(size);

  if (!hydrated) return null;

  return (
    <section className="w-full bg-[#f5f4f3] px-4 h-[700px] lg:h-full flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-lg mx-auto w-full">
        <h2
          className="text-3xl md:text-4xl text-center text-[#3a2a2a] mb-2"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          Customize Your Nails
        </h2>
        <p className="text-center text-[11px] text-[#c4b0b0] tracking-[0.15em] uppercase mb-8">
          pick your style before you browse ✨
        </p>

        <Stepper
          initialStep={1}
          backButtonText="Back"
          nextButtonText="Next"
          onFinalStepCompleted={() => {
            savePreferences({ shape, size });
          }}
        >
          {/* ─── Step 1: Nail Shape ─── */}
          <Step>
            <div className="text-center mb-4">
              <h3
                className="text-xl text-[#3a2a2a] mb-1"
                style={{ fontFamily: "var(--font-dancing)" }}
              >
                Choose Your Shape
              </h3>
              <p className="text-[10px] text-[#c4b0b0] tracking-[0.12em] uppercase">
                tap to select
              </p>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {NAIL_SHAPES.map((nail) => {
                const isSelected = shape === nail.id;
                return (
                  <button
                    key={nail.id}
                    onClick={() => handleShapeSelect(nail.id)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all duration-200 ${
                      isSelected
                        ? "border-[#d4707a] bg-[#fdf0f2] shadow-sm"
                        : "border-transparent bg-white/60 hover:bg-white hover:border-[#e8dede]"
                    }`}
                  >
                    <svg
                      viewBox="0 0 100 95"
                      className={`w-10 h-12 transition-colors ${
                        isSelected ? "text-[#d4707a]" : "text-[#dcc8c8]"
                      }`}
                    >
                      <path
                        d={nail.path}
                        fill={isSelected ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2.5"
                        opacity={isSelected ? 0.2 : 1}
                      />
                      <path
                        d={nail.path}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      />
                    </svg>
                    <span
                      className={`text-[10px] font-medium tracking-wide ${
                        isSelected ? "text-[#d4707a]" : "text-[#9a8a8a]"
                      }`}
                    >
                      {nail.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {shape && (
              <p className="text-center mt-3 text-[11px] text-[#d4a0a8]">
                {NAIL_SHAPES.find((n) => n.id === shape)?.description}
              </p>
            )}
          </Step>

          {/* ─── Step 2: Nail Length ─── */}
          <Step>
            <div className="text-center mb-6">
              <h3
                className="text-xl text-[#3a2a2a] mb-1"
                style={{ fontFamily: "var(--font-dancing)" }}
              >
                Pick Your Length
              </h3>
              <p className="text-[10px] text-[#c4b0b0] tracking-[0.12em] uppercase">
                drag to adjust
              </p>
            </div>

            {/* Finger with nail illustration */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative" style={{ transform: "scaleX(-1)" }}>
                {/* Finger body — flipped via parent so nail is on the right */}
                <svg viewBox="0 0 320 90" className="w-72 h-auto">
                  {/* Finger base */}
                  <rect
                    x="80"
                    y="15"
                    width="220"
                    height="60"
                    rx="30"
                    fill="#f5ddd0"
                    stroke="#e8c8bc"
                    strokeWidth="1.5"
                  />
                  {/* Fingertip */}
                  <ellipse
                    cx="100"
                    cy="45"
                    rx="30"
                    ry="30"
                    fill="#f5ddd0"
                    stroke="#e8c8bc"
                    strokeWidth="1.5"
                  />
                  {/* Nail on the finger */}
                  <rect
                    x={size === "Short" ? "58" : size === "Medium" ? "33" : "2"}
                    y="16"
                    width={size === "Short" ? "62" : size === "Medium" ? "90" : "120"}
                    height="58"
                    rx={size === "Short" ? "22" : "22"}
                    fill="#f8c8cc"
                    stroke="#d4707a"
                    strokeWidth="1.5"
                    opacity="0.7"
                    className="transition-all duration-300"
                  />
                  {/* Nail shine */}
                  <ellipse
                    cx={size === "Short" ? "90" : size === "Medium" ? "80" : "66"}
                    cy="34"
                    rx="6"
                    ry="13"
                    fill="white"
                    opacity="0.4"
                    className="transition-all duration-300"
                  />
                  {/* Knuckle lines */}
                  <line
                    x1="195"
                    y1="28"
                    x2="195"
                    y2="62"
                    stroke="#e8c8bc"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                  <line
                    x1="250"
                    y1="30"
                    x2="250"
                    y2="60"
                    stroke="#e8c8bc"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                </svg>
              </div>
            </div>

            {/* Size slider */}
            <div className="px-4">
              <div className="relative px-0">
                {/* Track */}
                <div className="h-1.5 bg-[#f0e6e8] rounded-full relative">
                  <div
                    className="absolute h-full bg-[#d4707a] rounded-full transition-all duration-300"
                    style={{ width: `${(sizeIndex / (SIZES.length - 1)) * 100}%` }}
                  />
                </div>

                {/* Clickable size buttons along the track */}
                <div className="flex justify-between mt-[-10px] relative">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className="flex flex-col items-center gap-2 group"
                    >
                      {/* Dot on track */}
                      <div
                        className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                          size === s
                            ? "bg-[#d4707a] border-[#d4707a] scale-125 shadow-md"
                            : "bg-white border-[#e0d0d0] group-hover:border-[#d4707a]"
                        }`}
                      />
                      {/* Label */}
                      <span
                        className={`text-xs transition-colors ${
                          size === s
                            ? "text-[#d4707a] font-medium"
                            : "text-[#b8a8a8]"
                        }`}
                      >
                        {s}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Step>

          {/* ─── Step 3: Browse ─── */}
          <Step>
            <div className="text-center py-4">
              <div className="text-5xl mb-4">💅</div>
              <h3
                className="text-xl text-[#3a2a2a] mb-2"
                style={{ fontFamily: "var(--font-dancing)" }}
              >
                You&apos;re All Set!
              </h3>
              <p className="text-sm text-[#9a8a8a] mb-4 leading-relaxed">
                {shape && (
                  <>
                    <span className="text-[#d4707a] font-medium capitalize">
                      {shape}
                    </span>{" "}
                    shape ·{" "}
                  </>
                )}
                <span className="text-[#d4707a] font-medium">{size}</span>{" "}
                length
              </p>
              <p className="text-[11px] text-[#c4b0b0] tracking-[0.1em] uppercase">
                scroll down & browse the collection ↓
              </p>
            </div>
          </Step>
        </Stepper>
      </div>
    </section>
  );
}
