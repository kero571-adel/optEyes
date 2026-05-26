"use client";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const MARQUEE_TEXT =
  "See better.  ·  Ray Precis.  ·  Comfort Vision.  ·  Clear vision care.  ·  ";
const FULL_TEXT = MARQUEE_TEXT.repeat(8);

// ─── shared RAF offset so every strip moves identically ───────────────────────
let rafId: number | null = null;
let startTs: number | null = null;
const SPEED = 0.0004;
const subscribers: Set<(offset: number) => void> = new Set();

function startLoop() {
  if (rafId !== null) return;
  const tick = (ts: number) => {
    if (startTs === null) startTs = ts;
    const offset = ((ts - startTs) * SPEED) % 50;
    subscribers.forEach((fn) => fn(offset));
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);
}

function stopLoop() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
    startTs = null;
  }
}

// ─── single marquee strip ──────────────────────────────────────────────────────
function MarqueeStrip({ color, fontSize }: { color: string; fontSize: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (offset: number) => {
      if (ref.current) ref.current.style.transform = `translateX(-${offset}%)`;
    };
    subscribers.add(handler);
    startLoop();
    return () => {
      subscribers.delete(handler);
      if (subscribers.size === 0) stopLoop();
    };
  }, []);

  return (
    <div
      style={{ display: "flex", whiteSpace: "nowrap", willChange: "transform" }}
      ref={ref}
    >
      {[0, 1].map((i) => (
        <span
          key={i}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize,
            lineHeight: 1,
            letterSpacing: "-2px",
            color,
            display: "inline-block",
            paddingRight: "60px",
            userSelect: "none",
          }}
        >
          {FULL_TEXT}
        </span>
      ))}
    </div>
  );
}

// ─── main component ────────────────────────────────────────────────────────────
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftLayerRef = useRef<HTMLDivElement>(null);
  const rightLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const svg = containerRef.current.querySelector<SVGSVGElement>(".glasses-svg");
      if (!svg) return;

      const svgRect = svg.getBoundingClientRect();
      const ctRect = containerRef.current.getBoundingClientRect();

      const scaleX = svgRect.width / 800;
      const scaleY = svgRect.height / 320;
      const offX = svgRect.left - ctRect.left;
      const offY = svgRect.top - ctRect.top;

      const lx = offX + 270 * scaleX;
      const ly = offY + 160 * scaleY;
      const rx = offX + 530 * scaleX;
      const ry = offY + 160 * scaleY;
      const r = 110 * Math.min(scaleX, scaleY);

      const leftClip = `circle(${r}px at ${lx}px ${ly}px)`;
      const rightClip = `circle(${r}px at ${rx}px ${ry}px)`;

      if (leftLayerRef.current) leftLayerRef.current.style.clipPath = leftClip;
      if (rightLayerRef.current) rightLayerRef.current.style.clipPath = rightClip;
    };

    update();
    window.addEventListener("resize", update);
    const t1 = setTimeout(update, 50);
    const t2 = setTimeout(update, 200);
    return () => {
      window.removeEventListener("resize", update);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleScrollDown = () => {
    const heroEl = document.querySelector("section");
    if (heroEl) {
      const nextSection = heroEl.nextElementSibling as HTMLElement | null;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      }
    }
  };

  const fontSize = "clamp(3.5rem, 8vw, 6rem)";

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 via-gray-50 to-white"
      style={{ height: "min(88vh, 750px)" }}
    >
      {/* subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #4ECDC4 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div
        className="relative w-full flex flex-col items-center justify-center"
        style={{ paddingTop: "32px" }}
      >
        {/* ── glasses + marquee container ── */}
        <div
          ref={containerRef}
          className="relative w-full"
          style={{ aspectRatio: "2.5 / 1" }}
        >
          {/* LAYER 1 – faded text */}
          <div
            className="absolute inset-0 flex items-center overflow-hidden"
            style={{ zIndex: 1 }}
          >
            <MarqueeStrip color="rgba(160,165,175,0.35)" fontSize={fontSize} />
          </div>

          {/* LAYER 2a – crisp text clipped to LEFT lens */}
          <div
            ref={leftLayerRef}
            className="absolute inset-0 flex items-center overflow-hidden"
            style={{ zIndex: 2, clipPath: "circle(0px at 0px 0px)" }}
          >
            <MarqueeStrip color="rgba(10,10,10,0.93)" fontSize={fontSize} />
          </div>

          {/* LAYER 2b – crisp text clipped to RIGHT lens */}
          <div
            ref={rightLayerRef}
            className="absolute inset-0 flex items-center overflow-hidden"
            style={{ zIndex: 2, clipPath: "circle(0px at 0px 0px)" }}
          >
            <MarqueeStrip color="rgba(10,10,10,0.93)" fontSize={fontSize} />
          </div>

          {/* LAYER 3 – SVG glasses frame */}
          <svg
            viewBox="0 0 800 320"
            className="glasses-svg absolute inset-0 w-full h-full"
            style={{ zIndex: 4 }}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="fGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="#72E8E0" />
                <stop offset="25%"  stopColor="#4ECDC4" />
                <stop offset="50%"  stopColor="#3AB8B0" />
                <stop offset="75%"  stopColor="#4ECDC4" />
                <stop offset="100%" stopColor="#6DE4DC" />
              </linearGradient>
              <linearGradient id="fHigh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#A0F0EA" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0"   />
              </linearGradient>
              <radialGradient id="lFill" cx="0.3" cy="0.3" r="0.7">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0.02" />
              </radialGradient>
              <filter id="fShadow">
                <feDropShadow dx="0" dy="3" stdDeviation="4"
                  floodColor="#4ECDC4" floodOpacity="0.1" />
              </filter>
            </defs>

            <circle cx="270" cy="160" r="110" fill="url(#lFill)" />
            <circle cx="530" cy="160" r="110" fill="url(#lFill)" />

            <g filter="url(#fShadow)">
              <circle cx="270" cy="160" r="114" fill="none" stroke="url(#fGrad)" strokeWidth="9" />
              <circle cx="530" cy="160" r="114" fill="none" stroke="url(#fGrad)" strokeWidth="9" />
            </g>

            <circle cx="270" cy="160" r="109" fill="none" stroke="#3DBDB4" strokeWidth="1" opacity="0.2" />
            <circle cx="530" cy="160" r="109" fill="none" stroke="#3DBDB4" strokeWidth="1" opacity="0.2" />

            <circle cx="270" cy="160" r="119" fill="none" stroke="#7EDDD6" strokeWidth="0.5" opacity="0.12" />
            <circle cx="530" cy="160" r="119" fill="none" stroke="#7EDDD6" strokeWidth="0.5" opacity="0.12" />

            <path d="M 196 90 A 114 114 0 0 1 344 90" fill="none" stroke="url(#fHigh)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 456 90 A 114 114 0 0 1 604 90" fill="none" stroke="url(#fHigh)" strokeWidth="2.5" strokeLinecap="round" />

            <path d="M 388 138 Q 400 114 412 138" fill="none" stroke="url(#fGrad)" strokeWidth="8" strokeLinecap="round" />
            <path d="M 390 136 Q 400 116 410 136" fill="none" stroke="#8AEEE8" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />

            <ellipse cx="366" cy="178" rx="5" ry="8" fill="#4ECDC4" opacity="0.3" />
            <ellipse cx="434" cy="178" rx="5" ry="8" fill="#4ECDC4" opacity="0.3" />
            <line x1="369" y1="172" x2="390" y2="146" stroke="#4ECDC4" strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />
            <line x1="431" y1="172" x2="410" y2="146" stroke="#4ECDC4" strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />

            <line x1="156" y1="142" x2="90"  y2="134" stroke="url(#fGrad)" strokeWidth="5" strokeLinecap="round" />
            <line x1="644" y1="142" x2="710" y2="134" stroke="url(#fGrad)" strokeWidth="5" strokeLinecap="round" />
            <line x1="156" y1="140" x2="96"  y2="133" stroke="#8AEEE8" strokeWidth="1" strokeLinecap="round" opacity="0.25" />
            <line x1="644" y1="140" x2="704" y2="133" stroke="#8AEEE8" strokeWidth="1" strokeLinecap="round" opacity="0.25" />
          </svg>
        </div>

        {/* ── CTA ── */}
        <div className="relative z-10 text-center px-4 mt-4 sm:mt-6">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Precision{" "}
            <span style={{ color: "#4ECDC4" }}>Eyewear</span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg mx-auto mb-7 leading-relaxed">
            Premium prescription glasses crafted for clarity, comfort, and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/shop"
              className="px-8 py-3.5 text-white font-semibold rounded-full transition-all shadow-lg hover:-translate-y-0.5 duration-300"
              style={{
                background: "#4ECDC4",
                boxShadow: "0 6px 20px rgba(78,205,196,0.3)",
              }}
            >
              Shop Collection
            </Link>
            <Link
              to="/about"
              className="px-8 py-3.5 font-semibold rounded-full transition-all hover:-translate-y-0.5 duration-300"
              style={{ border: "2px solid #4ECDC4", color: "#4ECDC4" }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* ── Scroll Down Button ── */}
      <button 
        onClick={handleScrollDown}
        aria-label="Scroll down"
        className="cursor-pointer absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 group"
      >
        {/* label */}
        <span
          className="text-xs font-medium tracking-widest uppercase opacity-40 group-hover:opacity-70 transition-opacity duration-300"
          style={{ color: "#13e4d6cf", letterSpacing: "0.18em" }}
        >
          Scroll
        </span>

        {/* pill container */}
        <div
          className="relative flex items-start justify-center w-6 h-10 rounded-full border-2 transition-all duration-300 group-hover:scale-110"
          style={{ borderColor: "rgba(78,205,196,0.45)" }}
        >
          {/* scrolling dot */}
          <div
            className="w-1.5 h-1.5 rounded-full mt-1.5"
            style={{
              background: "#13e4d6cf",
              animation: "scrollDot 1.6s cubic-bezier(0.45,0,0.55,1) infinite",
            }}
          />
        </div>

        {/* chevrons */}
        <div className="flex flex-col items-center -mt-0.5" style={{ gap: "1px" }}>
          <ChevronDown
            size={14}
            style={{
              color: "#13e4d6cf",
              opacity: 0.7,
              animation: "chevronFade 1.6s ease-in-out infinite",
            }}
          />
          <ChevronDown
            size={14}
            style={{
              color: "#13e4d6cf",
              opacity: 0.4,
              animation: "chevronFade 1.6s ease-in-out 0.2s infinite",
            }}
          />
        </div>
      </button>

      {/* ── keyframes ── */}
      <style>{`
        @keyframes scrollDot {
          0%   { transform: translateY(0);    opacity: 1;   }
          80%  { transform: translateY(18px); opacity: 0;   }
          81%  { transform: translateY(0);    opacity: 0;   }
          100% { transform: translateY(0);    opacity: 1;   }
        }
        @keyframes chevronFade {
          0%, 100% { opacity: 0.2; transform: translateY(-2px); }
          50%       { opacity: 0.8; transform: translateY(2px);  }
        }
      `}</style>
    </section>
  );
}