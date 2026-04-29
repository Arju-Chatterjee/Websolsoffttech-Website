import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: 1,
    num: "01",
    title: "Website\nDevelopment",
    sub: "High-performance websites and web applications optimized for speed, scalability, and conversions.",
    tags: [],
    accent: "#3d82f5",
    glow: "rgba(26,95,212,0.45)",
    meshA: "rgba(26,95,212,0.18)",
    meshB: "rgba(26,95,212,0.08)",
  },
  {
    id: 2,
    num: "02",
    title: "Mobile\nApps",
    sub: "Robust iOS and Android applications designed for seamless performance and user engagement.",
    tags: [],
    accent: "#f07820",
    glow: "rgba(240,120,32,0.45)",
    meshA: "rgba(240,120,32,0.16)",
    meshB: "rgba(240,120,32,0.08)",
  },
  {
    id: 3,
    num: "03",
    title: "Software\nDevelopment",
    sub: "Custom software solutions, SaaS platforms, and automation systems tailored for business efficiency.",
    tags: [],
    accent: "#3d82f5",
    glow: "rgba(26,95,212,0.45)",
    meshA: "rgba(26,95,212,0.18)",
    meshB: "rgba(240,120,32,0.10)",
  },
  {
    id: 4,
    num: "04",
    title: "Digital\nMarketing",
    sub: "Data-driven SEO, paid advertising, and performance marketing strategies that generate measurable growth.",
    tags: [
      "SEO",
      "Google Ads",
      "Meta Ads",
      "Performance Marketing",
      "Social Media Management",
      "Google My Business Setup",
    ],
    accent: "#f07820",
    glow: "rgba(240,120,32,0.45)",
    meshA: "rgba(240,120,32,0.16)",
    meshB: "rgba(26,95,212,0.10)",
  },
  {
    id: 5,
    num: "05",
    title: "Video &\nProduction",
    sub: "Professional video production, editing, and storytelling to enhance brand visibility and engagement.",
    tags: [],
    accent: "#3d82f5",
    glow: "rgba(26,95,212,0.45)",
    meshA: "rgba(26,95,212,0.18)",
    meshB: "rgba(240,120,32,0.10)",
  },
  {
    id: 6,
    num: "06",
    title: "Graphic\nDesigning",
    sub: "Creative graphic design solutions including branding, social media creatives, and marketing materials.",
    tags: [],
    accent: "#f07820",
    glow: "rgba(240,120,32,0.45)",
    meshA: "rgba(240,120,32,0.16)",
    meshB: "rgba(26,95,212,0.10)",
  },
];

// Fix 1: Properly typed particle interface — eliminates the `(p as any)` casts
interface Particle {
  top: string;
  left?: string;
  right?: string;
  size: number;
  dur: string;
  color: string;
  delay: string;
}

const particles: Particle[] = [
  {
    top: "22%",
    left: "14%",
    size: 3,
    dur: "6s",
    color: "#3d82f5",
    delay: "0s",
  },
  {
    top: "58%",
    left: "7%",
    size: 2,
    dur: "8s",
    color: "#f07820",
    delay: "1.2s",
  },
  {
    top: "38%",
    right: "10%",
    size: 4,
    dur: "7s",
    color: "#3d82f5",
    delay: "2s",
  },
  {
    top: "72%",
    right: "18%",
    size: 2,
    dur: "9s",
    color: "#ff9340",
    delay: "0.5s",
  },
  {
    top: "15%",
    right: "35%",
    size: 2,
    dur: "11s",
    color: "#3d82f5",
    delay: "3s",
  },
  {
    top: "80%",
    left: "30%",
    size: 3,
    dur: "7.5s",
    color: "#f07820",
    delay: "1.8s",
  },
];

const TOTAL = services.length;

const ServicesSection = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Fix 2: Store direction in a ref so exit animations always read the latest value,
  // avoiding the stale-closure bug where the exiting element captured an old direction.
  const directionRef = useRef<1 | -1>(1);
  const prevActive = useRef(0);

  // Fix 3: Initialise stepRef safely — avoids SSR crash from accessing `window` directly
  // in the useRef initializer argument (runs synchronously on module load in some bundlers).
  const stepRef = useRef(800);
  useEffect(() => {
    stepRef.current = window.innerHeight;
  }, []);

  useEffect(() => {
    const onResize = () => {
      stepRef.current = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const scrolledInside = window.scrollY - wrapper.offsetTop;
      const index = Math.round(scrolledInside / stepRef.current);
      const clamped = Math.max(0, Math.min(TOTAL - 1, index));
      if (clamped !== prevActive.current) {
        // Fix 2 (cont.): Update ref synchronously before state so the value is available
        // immediately when Framer Motion reads it during the exit animation.
        directionRef.current = clamped > prevActive.current ? 1 : -1;
        setActive(clamped);
        prevActive.current = clamped;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const svc = services[active];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');

        .sv-wrapper {
          height: calc(${TOTAL} * 100vh);
          position: relative;
        }

        .sv-sticky {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: #060c1a;
          font-family: 'DM Mono', monospace;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── BG MESH ── */
        .sv-mesh {
          position: absolute; inset: 0; pointer-events: none;
          transition: background 0.9s ease;
        }

        /* ── GLOWING ORBS ── */
        .sv-orb {
          position: absolute; border-radius: 50%;
          pointer-events: none; filter: blur(90px);
          transition: background 0.9s ease, opacity 0.9s ease;
        }
        .sv-orb-a {
          width: 700px; height: 700px;
          top: -200px; left: -200px;
          opacity: 0.28;
          animation: sv-orb-drift 12s ease-in-out infinite alternate;
        }
        .sv-orb-b {
          width: 500px; height: 500px;
          bottom: -150px; right: -120px;
          opacity: 0.22;
          animation: sv-orb-drift 10s ease-in-out infinite alternate-reverse;
        }
        @keyframes sv-orb-drift {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(40px,30px) scale(1.08); }
        }

        /* ── DIAGONAL LINES ── */
        .sv-diag {
          position: absolute; top: 0; right: 28%;
          width: 1px; height: 120%;
          opacity: 0.15; pointer-events: none;
          background: linear-gradient(to bottom, transparent 0%, #3d82f5 35%, #f07820 65%, transparent 100%);
          transform: rotate(14deg); transform-origin: top center;
        }
        .sv-diag-2 {
          position: absolute; top: 0; right: 22%;
          width: 1px; height: 120%;
          opacity: 0.08; pointer-events: none;
          background: linear-gradient(to bottom, transparent 0%, #f07820 40%, transparent 100%);
          transform: rotate(14deg); transform-origin: top center;
        }

        /* ── SCAN LINE ── */
        .sv-scan {
          position: absolute; left: 0; right: 0; top: 38%; height: 1px;
          background: linear-gradient(90deg, transparent 0%, #3d82f5 30%, #f07820 70%, transparent 100%);
          opacity: 0.07; pointer-events: none;
        }

        /* ── PARTICLES ── */
        .sv-particle {
          position: absolute; border-radius: 50%; pointer-events: none;
          animation: sv-float linear infinite;
        }
        @keyframes sv-float {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.5; }
          50%  { opacity: 1; }
          100% { transform: translateY(-80px) translateX(15px) scale(0.4); opacity: 0; }
        }

        /* ── CENTRE CONTENT ── */
        .sv-center {
          position: relative; z-index: 10;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          padding: 0 2rem;
          width: 100%;
        }

        .sv-eyebrow {
          display: flex; align-items: center; gap: 1rem;
          margin-bottom: 2rem;
          font-size: 0.6rem; letter-spacing: 0.26em;
          text-transform: uppercase;
          transition: color 0.5s ease;
        }
        .sv-eyebrow-line {
          width: 36px; height: 1px;
          background: linear-gradient(90deg, #3d82f5, #f07820);
          box-shadow: 0 0 8px rgba(26,95,212,0.5);
        }

        .sv-big-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 600;
          font-size: clamp(4rem, 11vw, 9rem);
          line-height: 1.0;
          letter-spacing: -0.02em;
          color: #e8edf8;
          white-space: pre-line;
          text-align: center;
          margin-bottom: 2rem;
          text-shadow: 0 0 80px rgba(26,95,212,0.3);
        }

        .sv-big-title .sv-title-gradient {
          font-style: italic;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: background-image 0.5s ease;
        }

        .sv-sub {
          font-size: 0.72rem; line-height: 1.9;
          letter-spacing: 0.05em; color: #7a90b5;
          max-width: 500px; text-align: center;
          margin-bottom: 2.2rem;
        }

        .sv-tags {
          display: flex; flex-wrap: wrap;
          gap: 0.5rem; justify-content: center;
        }
        .sv-tag {
          padding: 5px 14px;
          font-size: 0.58rem; letter-spacing: 0.14em;
          text-transform: uppercase;
          border: 1px solid rgba(61,130,245,0.18);
          background: rgba(26,95,212,0.07);
          color: #3d82f5;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          backdrop-filter: blur(4px);
          transition: all 0.3s ease;
        }
        .sv-tag:hover {
          background: rgba(240,120,32,0.12);
          border-color: rgba(240,120,32,0.22);
          color: #ff9340;
          box-shadow: 0 0 14px rgba(240,120,32,0.4);
        }
        .sv-tag.warm {
          border-color: rgba(240,120,32,0.2);
          background: rgba(240,120,32,0.07);
          color: #f07820;
        }

        /* ── SIDE DOTS ── */
        .sv-dots {
          position: absolute; right: 3vw; top: 50%;
          transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 12px;
          z-index: 20;
        }
        .sv-dot {
          width: 2px; border-radius: 2px;
          background: rgba(255,255,255,0.18);
          cursor: pointer; height: 20px;
          transition: height 0.4s ease, background 0.4s ease;
        }
        .sv-dot-active {
          height: 48px;
          background: linear-gradient(to bottom, #3d82f5, #f07820);
        }

        /* ── COUNTER ── */
        .sv-counter {
          position: absolute; bottom: 2.5rem; left: 7vw;
          z-index: 20;
          display: flex; align-items: baseline; gap: 6px;
          font-family: 'DM Mono', monospace;
        }
        .sv-cur {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem; font-weight: 300;
          color: #e8edf8; line-height: 1;
        }
        .sv-sep { font-size: 0.6rem; color: rgba(255,255,255,0.2); }
        .sv-tot { font-size: 0.65rem; color: rgba(255,255,255,0.28); letter-spacing: 0.12em; }

        /* Fix 4: Removed conflicting width: 100% !important — the element is already
           absolutely positioned with left: 0 and the sticky parent is full-width. */
        .sv-progress {
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #3d82f5 0%, #f07820 50%, #3d82f5 100%);
          z-index: 30;
          box-shadow: 0 0 12px rgba(26,95,212,0.5), 0 0 24px rgba(240,120,32,0.3);
        }

        /* ── SCROLL HINT ── */
        .sv-scroll-hint {
          position: absolute; bottom: 2.5rem; left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          display: flex; flex-direction: column;
          align-items: center; gap: 8px;
        }
        .sv-scroll-text {
          font-size: 0.52rem; letter-spacing: 0.26em;
          text-transform: uppercase; color: rgba(232,237,248,0.5);
        }
        .sv-scroll-line {
          width: 1px; height: 44px;
          background: linear-gradient(to bottom, #3d82f5, #f07820, transparent);
          animation: sv-drop 2s ease-in-out infinite;
        }
        @keyframes sv-drop {
          0%   { transform: scaleY(0); transform-origin: top;    opacity: 1; }
          60%  { transform: scaleY(1); transform-origin: top;    opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }

        /* ── SIDE LABEL ── */
        .sv-side-label {
          position: absolute; left: 1.2rem; top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          font-size: 0.52rem; letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(120,150,200,0.3);
          white-space: nowrap; display: none; z-index: 10;
        }
        @media (min-width: 1280px) { .sv-side-label { display: block; } }
      `}</style>

      <div className="sv-wrapper" ref={wrapperRef}>
        <div className="sv-sticky">
          {/* Progress bar */}
          <div className="sv-progress" />

          {/* Animated BG mesh */}
          <AnimatePresence mode="sync">
            <motion.div
              key={`mesh-${svc.id}`}
              className="sv-mesh"
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background: `radial-gradient(ellipse 70% 60% at 20% 30%, ${svc.meshA} 0%, transparent 60%),
                             radial-gradient(ellipse 50% 50% at 80% 70%, ${svc.meshB} 0%, transparent 55%)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.9 } }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
            />
          </AnimatePresence>

          {/* Glow orbs */}
          <div
            className="sv-orb sv-orb-a"
            style={{
              background: `radial-gradient(circle, ${svc.accent} 0%, transparent 70%)`,
            }}
          />
          <div
            className="sv-orb sv-orb-b"
            style={{
              background: `radial-gradient(circle, ${svc.accent} 0%, transparent 70%)`,
            }}
          />

          {/* Diagonal lines */}
          <div className="sv-diag" />
          <div className="sv-diag-2" />
          <div className="sv-scan" />

          {/* Fix 1 (cont.): Use the properly typed particles array — no more `as any` casts */}
          {particles.map((p, i) => (
            <div
              key={i}
              className="sv-particle"
              style={{
                top: p.top,
                left: p.left,
                right: p.right,
                width: p.size,
                height: p.size,
                background: p.color,
                boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                animationDuration: p.dur,
                animationDelay: p.delay,
              }}
            />
          ))}

          <div className="sv-side-label">Websolsoffttech — Our Services</div>

          {/* Centre text */}
          <div className="sv-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={svc.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Eyebrow */}
                <motion.div
                  className="sv-eyebrow"
                  style={{ color: svc.accent }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                >
                  <span className="sv-eyebrow-line" />
                  Our Services — {svc.num}
                </motion.div>

                {/* BIG TITLE */}
                {/* Fix 2 (cont.): Read from directionRef.current instead of a stale `direction`
                    state variable so the exit Y offset is always correct. */}
                <motion.h2
                  className="sv-big-title"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.85,
                      delay: 0.18,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: directionRef.current > 0 ? -50 : 50,
                    transition: { duration: 0.35 },
                  }}
                >
                  {svc.title.split("\n").map((line, i) => (
                    <span key={i}>
                      {i === 0 ? (
                        <span
                          className="sv-title-gradient"
                          style={{
                            backgroundImage: `linear-gradient(100deg, ${svc.accent}, ${svc.id % 2 === 0 ? "#3d82f5" : "#ff9340"})`,
                          }}
                        >
                          {line}
                        </span>
                      ) : (
                        <span style={{ display: "block" }}>{line}</span>
                      )}
                    </span>
                  ))}
                </motion.h2>

                {/* Sub */}
                <motion.p
                  className="sv-sub"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.65,
                      delay: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  {svc.sub}
                </motion.p>

                {/* Tags */}
                <motion.div
                  className="sv-tags"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.55,
                      delay: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                >
                  {svc.tags.map((t, i) => (
                    <span
                      key={t}
                      className={`sv-tag${i % 2 === 1 ? " warm" : ""}`}
                    >
                      {t}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Side dots */}
          <div className="sv-dots">
            {services.map((_, i) => (
              <div
                key={i}
                className={`sv-dot${i === active ? " sv-dot-active" : ""}`}
                onClick={() => {
                  const wrapper = wrapperRef.current;
                  if (!wrapper) return;
                  window.scrollTo({
                    top: wrapper.offsetTop + i * stepRef.current,
                    behavior: "smooth",
                  });
                }}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="sv-counter">
            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                className="sv-cur"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {String(active + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            <span className="sv-sep">/</span>
            <span className="sv-tot">{String(TOTAL).padStart(2, "0")}</span>
          </div>

          {/* Scroll hint */}
          {active < TOTAL - 1 && (
            <div className="sv-scroll-hint">
              <span className="sv-scroll-text">Scroll</span>
              <div className="sv-scroll-line" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ServicesSection;
