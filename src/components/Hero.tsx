import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

interface LensPos {
  lx: number;
  ly: number;
  rx: number;
  ry: number;
  r: number;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lens, setLens] = useState<LensPos | null>(null);
  const marqueeText =
    "See better.  ·  Ray Precis.  ·  Comfort Vision.  ·  Clear vision care.  ·  ";
  const fullText = marqueeText.repeat(8);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const svg = containerRef.current.querySelector(".glasses-svg");
      if (!svg) return;
      const svgRect = svg.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const scaleX = svgRect.width / 800;
      const scaleY = svgRect.height / 400;
      const offsetX = svgRect.left - containerRect.left;
      const offsetY = svgRect.top - containerRect.top;

      setLens({
        lx: offsetX + 270 * scaleX,
        ly: offsetY + 200 * scaleY,
        rx: offsetX + 530 * scaleX,
        ry: offsetY + 200 * scaleY,
        r: 118 * Math.min(scaleX, scaleY),
      });
    };

    update();
    window.addEventListener("resize", update);
    const t = setTimeout(update, 50);
    const t2 = setTimeout(update, 200);
    return () => {
      window.removeEventListener("resize", update);
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  const leftClip = lens
    ? `circle(${lens.r}px at ${lens.lx}px ${lens.ly}px)`
    : "circle(0px at 0px 0px)";
  const rightClip = lens
    ? `circle(${lens.r}px at ${lens.rx}px ${lens.ry}px)`
    : "circle(0px at 0px 0px)";

  const MagnifiedText = () => (
    <div className="marquee-text whitespace-nowrap">
      <span
        className="font-black tracking-tight select-none"
        style={{
          fontFamily: "Inter, sans-serif",
          color: "rgba(10, 10, 10, 0.93)",
          fontSize: "clamp(4rem, 9vw, 7rem)",
          lineHeight: "1",
          display: "inline-block",
          transform: "scale(1.4)",
          transformOrigin: "left center",
        }}
      >
        {fullText}
      </span>
      <span
        className="font-black tracking-tight select-none"
        style={{
          fontFamily: "Inter, sans-serif",
          color: "rgba(10, 10, 10, 0.93)",
          fontSize: "clamp(4rem, 9vw, 7rem)",
          lineHeight: "1",
          display: "inline-block",
          transform: "scale(1.4)",
          transformOrigin: "left center",
        }}
      >
        {fullText}
      </span>
    </div>
  );

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 via-gray-50 to-white"
      style={{ height: "min(88vh, 750px)" }}
    >
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
        <div
          ref={containerRef}
          className="relative w-full mx-auto"
          style={{
            maxWidth: "none",
            aspectRatio: "2 / 1",
            paddingLeft: "0",
            paddingRight: "0",
          }}
        >
          {/* LAYER 1: Normal text behind glasses */}
          <div
            className="absolute inset-0 flex items-center overflow-hidden"
            style={{ zIndex: 1 }}
          >
            <div className="marquee-text whitespace-nowrap w-full">
              <span
                className="text3xl sm:text-4xl md:text-5xl font-black tracking-tight select-none"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "rgba(180, 180, 185, 0.45)",
                }}
              >
                {fullText}
              </span>
              <span
                className="text3xl sm:text-4xl md:text-5xl font-black tracking-tight select-none"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "rgba(180, 180, 185, 0.45)",
                }}
              >
                {fullText}
              </span>
            </div>
          </div>

          {/* LAYER 2a: Magnified text clipped to LEFT lens */}
          <div
            className="absolute inset-0 flex items-center overflow-hidden"
            style={{ zIndex: 2, clipPath: leftClip }}
          >
            <MagnifiedText />
          </div>

          {/* LAYER 2b: Magnified text clipped to RIGHT lens */}
          <div
            className="absolute inset-0 flex items-center overflow-hidden"
            style={{ zIndex: 2, clipPath: rightClip }}
          >
            <MagnifiedText />
          </div>

          {/* LAYER 3: SVG Glasses Frame */}
          <svg
            viewBox="0 0 800 400"
            className="glasses-svg absolute inset-0 w-full h-full"
            style={{ zIndex: 4 }}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="fGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#72E8E0" />
                <stop offset="25%" stopColor="#4ECDC4" />
                <stop offset="50%" stopColor="#3AB8B0" />
                <stop offset="75%" stopColor="#4ECDC4" />
                <stop offset="100%" stopColor="#6DE4DC" />
              </linearGradient>
              <linearGradient id="fHigh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A0F0EA" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="lFill" cx="0.3" cy="0.3" r="0.7">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.04" />
                <stop offset="60%" stopColor="#4ECDC4" stopOpacity="0.008" />
                <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0.02" />
              </radialGradient>
              <radialGradient id="lRef" cx="0.3" cy="0.25" r="0.35">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.07" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              <filter id="fShadow">
                <feDropShadow
                  dx="0"
                  dy="3"
                  stdDeviation="4"
                  floodColor="#4ECDC4"
                  floodOpacity="0.1"
                />
              </filter>
            </defs>

            {/* Lens fills */}
            <circle cx="270" cy="200" r="118" fill="url(#lFill)" />
            <circle cx="530" cy="200" r="118" fill="url(#lFill)" />
            <circle cx="270" cy="200" r="118" fill="url(#lRef)" />
            <circle cx="530" cy="200" r="118" fill="url(#lRef)" />

            {/* Frame rings */}
            <g filter="url(#fShadow)">
              <circle
                cx="270"
                cy="200"
                r="122"
                fill="none"
                stroke="url(#fGrad)"
                strokeWidth="9"
              />
              <circle
                cx="530"
                cy="200"
                r="122"
                fill="none"
                stroke="url(#fGrad)"
                strokeWidth="9"
              />
            </g>

            {/* Inner ring */}
            <circle
              cx="270"
              cy="200"
              r="117"
              fill="none"
              stroke="#3DBDB4"
              strokeWidth="1"
              opacity="0.2"
            />
            <circle
              cx="530"
              cy="200"
              r="117"
              fill="none"
              stroke="#3DBDB4"
              strokeWidth="1"
              opacity="0.2"
            />

            {/* Outer glow */}
            <circle
              cx="270"
              cy="200"
              r="127"
              fill="none"
              stroke="#7EDDD6"
              strokeWidth="0.5"
              opacity="0.12"
            />
            <circle
              cx="530"
              cy="200"
              r="127"
              fill="none"
              stroke="#7EDDD6"
              strokeWidth="0.5"
              opacity="0.12"
            />

            {/* Highlight arcs */}
            <path
              d="M 190 128 A 122 122 0 0 1 350 128"
              fill="none"
              stroke="url(#fHigh)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 450 128 A 122 122 0 0 1 610 128"
              fill="none"
              stroke="url(#fHigh)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Bridge */}
            <path
              d="M 392 178 Q 400 150 408 178"
              fill="none"
              stroke="url(#fGrad)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 394 176 Q 400 154 406 176"
              fill="none"
              stroke="#8AEEE8"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.3"
            />

            {/* Nose pads */}
            <ellipse
              cx="365"
              cy="222"
              rx="5"
              ry="8"
              fill="#4ECDC4"
              opacity="0.3"
            />
            <ellipse
              cx="435"
              cy="222"
              rx="5"
              ry="8"
              fill="#4ECDC4"
              opacity="0.3"
            />
            <line
              x1="368"
              y1="216"
              x2="391"
              y2="184"
              stroke="#4ECDC4"
              strokeWidth="1.5"
              opacity="0.35"
              strokeLinecap="round"
            />
            <line
              x1="432"
              y1="216"
              x2="409"
              y2="184"
              stroke="#4ECDC4"
              strokeWidth="1.5"
              opacity="0.35"
              strokeLinecap="round"
            />

            {/* Temple stubs */}
            <line
              x1="148"
              y1="178"
              x2="95"
              y2="170"
              stroke="url(#fGrad)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <line
              x1="652"
              y1="178"
              x2="705"
              y2="170"
              stroke="url(#fGrad)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <line
              x1="148"
              y1="176"
              x2="102"
              y2="169"
              stroke="#8AEEE8"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.25"
            />
            <line
              x1="652"
              y1="176"
              x2="698"
              y2="169"
              stroke="#8AEEE8"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.25"
            />
          </svg>
        </div>

        {/* CTA */}
        <div className="relative z-10 text-center px-4 mt-4 sm:mt-6">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Precision <span className="text-teal">Eyewear</span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg mx-auto mb-7 leading-relaxed">
            Premium prescription glasses crafted for clarity, comfort, and
            style.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/shop"
              className="px-8 py-3.5 bg-teal text-white font-semibold rounded-full hover:bg-teal-dark transition-all shadow-lg shadow-teal/25 hover:shadow-xl hover:shadow-teal/30 hover:-translate-y-0.5 duration-300"
            >
              Shop Collection
            </Link>
            <Link
              to="/about"
              className="px-8 py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-teal hover:text-teal transition-all hover:-translate-y-0.5 duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
