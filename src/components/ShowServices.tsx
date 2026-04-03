import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const services = [
  { text: "Web\nDevelopment",  sub: "Pixel-perfect, performance-first websites",  num: "01" },
  { text: "Mobile\nApps",      sub: "Native & cross-platform experiences",         num: "02" },
  { text: "UI / UX\nDesign",   sub: "Interfaces that captivate and convert",       num: "03" },
  { text: "Cloud\nSolutions",  sub: "Scalable infrastructure, zero downtime",      num: "04" },
  { text: "AI\nIntegration",   sub: "Intelligent systems built for tomorrow",      num: "05" },
  { text: "SEO &\nGrowth",     sub: "Rank higher, reach further, grow faster",     num: "06" },
  { text: "Software\nDev",     sub: "Robust systems engineered to scale",          num: "07" },
  { text: "Cyber\nSecurity",   sub: "Protect your data, secure your future",       num: "08" },
];

const bgImages = [
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1800&q=80",
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1800&q=80",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1800&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80",
  "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1800&q=80",
  "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1800&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1800&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1800&q=80",
];

const ScrollServices = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 35, damping: 14 });

  const [idx, setIdx]   = useState(0);
  const [local, setLocal] = useState(0);

  useEffect(() => {
    return smooth.on("change", (v) => {
      const raw = v * services.length;
      setIdx(Math.min(Math.floor(raw), services.length - 1));
      setLocal(raw % 1);
    });
  }, [smooth]);

  // Scale: 8 → 1 in phase A, holds in B, shrinks in C
  const scale = useTransform(smooth, (v) => {
    const loc = (v * services.length) % 1;
    if (loc < 0.50) return 8 - (loc / 0.50) * 7;
    if (loc < 0.70) return 1;
    if (loc < 0.88) return 1 - ((loc - 0.70) / 0.18) * 0.75;
    return 0.25;
  });

  // Overall stage visibility — gap between services = hidden
  const stageOpacity = useTransform(smooth, (v) => {
    if (v < 0.005) return 0;
    const loc = (v * services.length) % 1;
    if (loc < 0.04) return 0;
    if (loc < 0.10) return (loc - 0.04) / 0.06;
    if (loc < 0.84) return 1;
    if (loc < 0.94) return 1 - ((loc - 0.84) / 0.10);
    return 0;
  });

  // Phase A: outline/stroke text visible (big hollow letters, bg shows through)
  const outlineOpacity = useTransform(smooth, (v) => {
    if (v < 0.005) return 0;
    const loc = (v * services.length) % 1;
    if (loc < 0.04) return 0;
    if (loc < 0.10) return (loc - 0.04) / 0.06;
    if (loc < 0.40) return 1;
    if (loc < 0.60) return 1 - ((loc - 0.40) / 0.20);
    return 0;
  });

  // Phase B: solid white text appears
  const whiteOpacity = useTransform(smooth, (v) => {
    const loc = (v * services.length) % 1;
    if (loc < 0.48) return 0;
    if (loc < 0.60) return (loc - 0.48) / 0.12;
    if (loc < 0.72) return 1;
    if (loc < 0.84) return 1 - ((loc - 0.72) / 0.12);
    return 0;
  });

  // Subtitle
  const subOpacity = useTransform(smooth, (v) => {
    const loc = (v * services.length) % 1;
    if (loc < 0.52) return 0;
    if (loc < 0.63) return (loc - 0.52) / 0.11;
    if (loc < 0.70) return 1;
    return Math.max(1 - ((loc - 0.70) / 0.10), 0);
  });

  // Stroke width: thicker when huge, thinner when normal size
  // const strokeWidth = useTransform(scale, (s) => {
  //   // At scale 8 → stroke 1px (looks thick due to scale), at scale 1 → stroke 3px
  //   return Math.max(1, 4 - s * 0.4);
  // });

  const progress = `${((idx + local) / services.length) * 100}%`;
  const bgImg    = bgImages[idx] ?? bgImages[0];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@900&family=DM+Mono:wght@400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        .ss-wrap { position: relative; }

        .ss-stick {
          position: sticky; top: 0;
          height: 100vh; width: 100%;
          overflow: hidden;
          background: #090b10;
          display: flex; align-items: center; justify-content: center;
        }

        /* Fixed background — no zoom, always full screen */
        .ss-bg {
          position: absolute; inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 1;
          transition: background-image 0.3s ease;
        }

        /* Dark overlay on top of bg — always present */
        .ss-overlay {
          position: absolute; inset: 0;
          background: rgba(9, 11, 16, 0.72);
          z-index: 2;
        }

        .ss-grid {
          position: absolute; inset: 0; z-index: 3; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 64px 64px;
        }

        .ss-vignette {
          position: absolute; inset: 0; z-index: 4; pointer-events: none;
          background: radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, #090b10 100%);
        }

        .ss-bar {
          position: absolute; top: 0; left: 0; height: 2px; z-index: 40;
          background: #fff; transition: width 0.1s linear;
        }

        .ss-c { position:absolute; width:40px; height:40px; z-index:30; pointer-events:none; border-color:rgba(255,255,255,0.15) !important; }
        .ss-tl { top:1.5rem; left:1.5rem;  border-top:1px solid; border-left:1px solid; }
        .ss-tr { top:1.5rem; right:1.5rem; border-top:1px solid; border-right:1px solid; }
        .ss-bl { bottom:1.5rem; left:1.5rem;  border-bottom:1px solid; border-left:1px solid; }
        .ss-br { bottom:1.5rem; right:1.5rem; border-bottom:1px solid; border-right:1px solid; }

        .ss-dots { position:absolute; left:2rem; top:50%; transform:translateY(-50%); display:flex; flex-direction:column; gap:9px; z-index:30; }
        .ss-dot  { width:4px; height:4px; border-radius:50%; background:rgba(255,255,255,0.2); transition:all 0.4s cubic-bezier(0.16,1,0.3,1); }
        .ss-dot.on { height:24px; border-radius:2px; background:#fff; }

        .ss-num {
          position:absolute; top:2.2rem; right:2.2rem; z-index:30;
          font-family:'DM Mono',monospace; font-size:0.56rem;
          letter-spacing:0.24em; text-transform:uppercase; color:rgba(255,255,255,0.45);
        }
        .ss-label {
          position:absolute; bottom:2.2rem; right:2.2rem; z-index:30;
          font-family:'DM Mono',monospace; font-size:0.52rem;
          letter-spacing:0.2em; color:rgba(255,255,255,0.25);
        }

        .ss-start-hint {
          position: absolute;
          bottom: 3rem; left: 50%; transform: translateX(-50%);
          z-index: 30;
          font-family: 'DM Mono', monospace; font-size: 0.55rem;
          letter-spacing: 0.3em; text-transform: uppercase; color: rgba(255,255,255,0.5);
          animation: pulse 2s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }

        .ss-stage {
          position:absolute; inset:0; z-index:10;
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          pointer-events:none; overflow:hidden;
        }

        /* Base text style shared by both layers */
        .ss-text {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(6rem, 20vw, 22rem);
          line-height: 0.86;
          letter-spacing: -0.025em;
          text-transform: uppercase;
          text-align: center;
          white-space: pre-line;
          width: 100%;
          padding: 0 1rem;
          transform-origin: center center;
          position: absolute;
        }

        /*
          OUTLINE TEXT — hollow letters, only border/stroke visible.
          -webkit-text-stroke draws the stroke; fill is transparent.
          Background image shows through the transparent fill.
        */
        .ss-text-outline {
          color: transparent;
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.9);
        }

        /* SOLID WHITE TEXT — shown when text shrinks to normal size */
        .ss-text-white {
          color: #ffffff;
        }

        .ss-sub {
          position: absolute;
          bottom: calc(50% - clamp(3rem, 10vw, 11rem) - 3.5rem);
          font-family: 'DM Mono', monospace;
          font-size: 0.66rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.38);
          text-align: center;
          z-index: 11;
        }
      `}</style>

      <div ref={containerRef} className="ss-wrap" style={{ height: `${(services.length + 1) * 100}vh` }}>
        <div className="ss-stick">

          {/* Background — fixed, no zoom */}
          <div className="ss-bg" style={{ backgroundImage: `url(${bgImg})` }} />

          {/* Dark overlay — always present, bg shows dimly behind outline letters */}
          <div className="ss-overlay" />

          <div className="ss-grid" />
          <div className="ss-vignette" />

          <div className="ss-bar" style={{ width: progress }} />

          {["tl", "tr", "bl", "br"].map((c) => (
            <div key={c} className={`ss-c ss-${c}`} />
          ))}

          <div className="ss-dots">
            {services.map((_, i) => (
              <div key={i} className={`ss-dot ${i === idx ? "on" : ""}`} />
            ))}
          </div>

          <div
            className="ss-num"
            style={{ opacity: local > 0.03 || idx > 0 ? 1 : 0, transition: "opacity 0.5s" }}
          >
            {services[idx].num} / {String(services.length).padStart(2, "0")}
          </div>
          <div className="ss-label">Our Services</div>

          <div
            className="ss-start-hint"
            style={{ opacity: smooth.get() < 0.01 ? 1 : 0, transition: "opacity 0.5s" }}
          >
            ↓ &nbsp; Scroll to explore
          </div>

          {/* ── TEXT STAGE ── */}
          <motion.div className="ss-stage" style={{ opacity: stageOpacity }}>

            {/*
              LAYER 1 — OUTLINE TEXT (Phase A: big hollow letters)
              color: transparent + -webkit-text-stroke = only the border/outline is visible.
              The fixed background image shows through the transparent letter fills.
              As text zooms from 8x → 1x, the hollow giant letters reveal the bg image.
            */}
            <motion.div
              className="ss-text ss-text-outline"
              style={{
                scale,
                opacity: outlineOpacity,
                // Stroke thinner when huge (natural scale makes it look right)
                WebkitTextStroke: useTransform(scale, (s) =>
                  `${Math.max(0.5, 3 - s * 0.3)}px rgba(255,255,255,0.85)`
                ) as any,
              }}
            >
              {services[idx].text}
            </motion.div>

            {/*
              LAYER 2 — SOLID WHITE TEXT (Phase B: normal size)
              Plain white, no outline. Clean minimal look.
            */}
            <motion.div
              className="ss-text ss-text-white"
              style={{
                scale,
                opacity: whiteOpacity,
              }}
            >
              {services[idx].text}
            </motion.div>

            {/* Subtitle */}
            <motion.div className="ss-sub" style={{ opacity: subOpacity }}>
              {services[idx].sub}
            </motion.div>

          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ScrollServices;