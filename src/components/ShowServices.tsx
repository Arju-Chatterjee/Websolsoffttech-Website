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

// Background image for each service (clipping mask source)
const bgImages = [
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1800&q=80",  // code
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1800&q=80",  // mobile
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1800&q=80",     // design
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80",  // cloud
  "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1800&q=80",  // AI
  "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1800&q=80",  // seo
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1800&q=80",     // software
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1800&q=80",     // security
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

  // ── PER-SERVICE SCROLL PHASES ──────────────────────────────────────────────
  // Phase A  0.00 → 0.40  : text is HUGE (covers viewport), image shows through letterforms
  //                          scale goes from ~6 down toward 1
  // Phase B  0.40 → 0.60  : text settles at normal size — white solid
  // Phase C  0.60 → 0.85  : text shrinks further + fades out
  // Phase D  0.85 → 1.00  : blank, next service incoming

  const scale = useTransform(smooth, (v) => {
    const loc = (v * services.length) % 1;
    if (loc < 0.40) return 6 - (loc / 0.40) * 5;   // 6 → 1
    if (loc < 0.60) return 1;
    if (loc < 0.85) return 1 - ((loc - 0.60) / 0.25) * 0.80;  // 1 → 0.20
    return 0.20;
  });

  // const opacity = useTransform(smooth, (v) => {
  //   const loc = (v * services.length) % 1;
  //   if (loc < 0.05) return loc / 0.05;              // quick fade in
  //   if (loc < 0.65) return 1;
  //   if (loc < 0.88) return 1 - ((loc - 0.65) / 0.23); // fade out
  //   return 0;
  // });

  // When text is huge → image fills it (mask). When text is small → white text.
  // We achieve this by blending between bg-clip:text (image) and solid white.
  // Trick: use TWO overlaid elements — image-clipped one fades out as text shrinks,
  // white solid one fades in. They share the same scale motion.

  const imageLayerOpacity = useTransform(smooth, (v) => {
    const loc = (v * services.length) % 1;
    // Full image when huge, fade to white as it settles
    if (loc < 0.30) return 1;
    if (loc < 0.55) return 1 - ((loc - 0.30) / 0.25); // 1 → 0
    return 0;
  });

  const whiteLayerOpacity = useTransform(smooth, (v) => {
    const loc = (v * services.length) % 1;
    if (loc < 0.30) return 0;
    if (loc < 0.55) return (loc - 0.30) / 0.25;        // 0 → 1
    return 1;
  });

  // Subtitle fades in only when text is at normal size
  const subOpacity = useTransform(smooth, (v) => {
    const loc = (v * services.length) % 1;
    if (loc < 0.50) return 0;
    if (loc < 0.62) return (loc - 0.50) / 0.12;
    if (loc < 0.68) return 1;
    return Math.max(1 - ((loc - 0.68) / 0.10), 0);
  });

  // bg-size for the image layer: huge when scale is huge so mask covers screen
  const bgSize = useTransform(scale, (s) => {
    const pct = Math.round(Math.min(s * 100, 700));
    return `${pct}% auto`;
  });

  const progress = `${((idx + local) / services.length) * 100}%`;
  const bgImg    = bgImages[idx] ?? bgImages[0];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Proza+Libre:wght@800&family=Barlow+Condensed:wght@900&family=DM+Mono:wght@400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .ss-wrap { position: relative; }

        .ss-stick {
          position: sticky; top: 0;
          height: 100vh; width: 100%;
          overflow: hidden;
          background: #090b10;
          display: flex; align-items: center; justify-content: center;
        }

        /* fixed background image — always full screen, never moves */
        .ss-bg {
          position: absolute; inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0;
          transition: background-image 0.01s, opacity 0.6s ease;
        }
        .ss-bg.visible { opacity: 1; }

        /* dark overlay so bg is subtle */
        .ss-overlay {
          position: absolute; inset: 0;
          background: rgba(9,11,16,0.72);
          z-index: 1;
        }

        /* subtle grid */
        .ss-grid {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 64px 64px;
        }

        /* vignette — darkens edges so text pops */
        .ss-vignette {
          position: absolute; inset: 0; z-index: 3; pointer-events: none;
          background: radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, #090b10 100%);
        }

        /* progress bar */
        .ss-bar {
          position: absolute; top: 0; left: 0; height: 2px; z-index: 40;
          background: #fff; transition: width 0.1s linear;
        }

        /* corner brackets */
        .ss-c { position:absolute; width:40px; height:40px; z-index:30; pointer-events:none; border-color:rgba(255,255,255,0.15) !important; }
        .ss-tl { top:1.5rem; left:1.5rem;  border-top:1px solid; border-left:1px solid; }
        .ss-tr { top:1.5rem; right:1.5rem; border-top:1px solid; border-right:1px solid; }
        .ss-bl { bottom:1.5rem; left:1.5rem;  border-bottom:1px solid; border-left:1px solid; }
        .ss-br { bottom:1.5rem; right:1.5rem; border-bottom:1px solid; border-right:1px solid; }

        /* side dots */
        .ss-dots { position:absolute; left:2rem; top:50%; transform:translateY(-50%); display:flex; flex-direction:column; gap:9px; z-index:30; }
        .ss-dot  { width:4px; height:4px; border-radius:50%; background:rgba(255,255,255,0.2); transition:all 0.4s cubic-bezier(0.16,1,0.3,1); }
        .ss-dot.on { height:24px; border-radius:2px; background:#fff; }

        /* HUD */
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
        .ss-hint {
          position:absolute; bottom:2.2rem; left:50%; transform:translateX(-50%); z-index:30;
          font-family:'DM Mono',monospace; font-size:0.50rem;
          letter-spacing:0.28em; text-transform:uppercase; color:rgba(255,255,255,0.2);
        }

        /* ── STAGE ── */
        .ss-stage {
          position:absolute; inset:0; z-index:10;
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          pointer-events:none; overflow:hidden;
        }

        /* shared text style */
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

        /* image-clipped layer */
        .ss-text-img {
          background-position: center;
          background-repeat: no-repeat;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        /* white solid layer */
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

          {/* Fixed background — subtle, behind everything */}
          <div
            className={`ss-bg ${local > 0.04 && local < 0.90 ? "visible" : ""}`}
            style={{ backgroundImage: `url(${bgImg})` }}
          />
          <div className="ss-overlay" />
          <div className="ss-grid" />
          <div className="ss-vignette" />

          {/* Progress */}
          <div className="ss-bar" style={{ width: progress }} />

          {/* Corners */}
          {["tl","tr","bl","br"].map(c => <div key={c} className={`ss-c ss-${c}`} />)}

          {/* Side dots */}
          <div className="ss-dots">
            {services.map((_,i) => <div key={i} className={`ss-dot ${i===idx?"on":""}`} />)}
          </div>

          {/* HUD */}
          <div className="ss-num">{services[idx].num} / {String(services.length).padStart(2,"0")}</div>
          <div className="ss-label">Our Services</div>
          <div className="ss-hint">Scroll to explore</div>

          {/* ── TEXT STAGE ── */}
          <div className="ss-stage">

            {/* LAYER 1: Image clipped through text (huge phase → shows bg image through letters) */}
            <motion.div
              className="ss-text ss-text-img"
              style={{
                backgroundImage: `url(${bgImg})`,
                backgroundSize: bgSize,
                scale,
                opacity: imageLayerOpacity,
              }}
            >
              {services[idx].text}
            </motion.div>

            {/* LAYER 2: Solid white text (normal/small phase) */}
            <motion.div
              className="ss-text ss-text-white"
              style={{
                scale,
                opacity: whiteLayerOpacity,
              }}
            >
              {services[idx].text}
            </motion.div>

            {/* Subtitle — appears when text is at normal size */}
            <motion.div className="ss-sub" style={{ opacity: subOpacity }}>
              {services[idx].sub}
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollServices;
