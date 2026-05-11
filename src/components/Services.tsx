import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: 1,
    num: "01",
    title: "Website Development",
    sub: "High-performance websites and web applications optimized for speed, scalability, and conversions.",
    tags: [],
    accent: "blue" as const,
    leftImg: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    rightImg: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 2,
    num: "02",
    title: "Mobile Apps",
    sub: "Robust iOS and Android applications designed for seamless performance and user engagement.",
    tags: [],
    accent: "amber" as const,
    leftImg: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    rightImg: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&q=80",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="12" cy="17" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 3,
    num: "03",
    title: "Software Development",
    sub: "Custom software solutions, SaaS platforms, and automation systems tailored for business efficiency.",
    tags: [],
    accent: "blue" as const,
    leftImg: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&q=80",
    rightImg: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M8 6l-4 6 4 6M16 6l4 6-4 6M14 4l-4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 4,
    num: "04",
    title: "Digital Marketing",
    sub: "Data-driven SEO, paid advertising, and performance marketing strategies that generate measurable growth.",
    tags: ["SEO", "Google Ads", "Meta Ads", "Performance Marketing", "Social Media Management", "Google My Business"],
    accent: "amber" as const,
    leftImg: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80",
    rightImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M3 17l5-6 4 4 5-7 5 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="8" cy="11" r="1.5" fill="currentColor"/>
        <circle cx="17" cy="8" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 5,
    num: "05",
    title: "Video & Production",
    sub: "Professional video production, editing, and storytelling to enhance brand visibility and engagement.",
    tags: [],
    accent: "blue" as const,
    leftImg: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
    rightImg: "https://www.lemonlight.com/wp-content/uploads/2023/11/Video-Production-101-Pillar-Page-Hero-Image.png",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M16 10l6-3v10l-6-3v-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 6,
    num: "06",
    title: "Graphic Designing",
    sub: "Creative graphic design solutions including branding, social media creatives, and marketing materials.",
    tags: [],
    accent: "amber" as const,
    leftImg: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    rightImg: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3"/>
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const accentColors = {
  blue: {
    bg: "var(--blue-light)",
    color: "var(--blue)",
    hover: "rgba(26,95,212,0.25)",
    tagBg: "var(--blue-light)",
    tagBorder: "rgba(26,95,212,0.20)",
    overlayColor: "rgba(14,40,90,0.52)",
    stripAccent: "var(--blue)",
  },
  amber: {
    bg: "var(--orange-light)",
    color: "var(--orange)",
    hover: "rgba(240,120,32,0.25)",
    tagBg: "var(--orange-light)",
    tagBorder: "rgba(240,120,32,0.22)",
    overlayColor: "rgba(90,38,8,0.48)",
    stripAccent: "var(--orange)",
  },
};

const TOTAL = services.length;

const ServicesSection = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const directionRef = useRef<1 | -1>(1);
  const prevActive = useRef(0);
  const stepRef = useRef(800);

  useEffect(() => { stepRef.current = window.innerHeight; }, []);

  useEffect(() => {
    const onResize = () => { stepRef.current = window.innerHeight; };
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
        directionRef.current = clamped > prevActive.current ? 1 : -1;
        setActive(clamped);
        prevActive.current = clamped;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const svc = services[active];
  const c = accentColors[svc.accent];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');

        .sv-wrapper {
          --blue:        #1a5fd4;
          --blue-light:  #e8f0fc;
          --blue-glow:   rgba(26, 95, 212, 0.20);
          --orange:      #f07820;
          --orange-dark: #c75f0f;
          --orange-light:#fff3ea;
          --orange-glow: rgba(240, 120, 32, 0.20);
          --text:        #0f2545;
          --text-mid:    #3d5a8a;
          --text-muted:  #7a90b5;
          --text-faint:  #a8bcd8;
          --border:      rgba(26, 95, 212, 0.12);

          height: calc(${TOTAL} * 100vh);
          position: relative;
        }

        .sv-sticky {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: #ffffff;
          font-family: 'DM Mono', monospace;
          display: flex;
          flex-direction: column;
        }

        /* top gradient line */
        .sv-accent-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          z-index: 30;
          pointer-events: none;
          background: linear-gradient(90deg, var(--blue), var(--orange));
        }

        /* progress */
        .sv-progress {
          position: absolute; top: 3px; left: 0; right: 0;
          height: 2px;
          background: var(--border);
          z-index: 29;
          pointer-events: none;
        }
        .sv-progress-fill {
          height: 100%;
          transition: width 0.5s ease;
          background: linear-gradient(90deg, var(--blue), var(--orange));
        }

        /* ── LEFT background image (very subtle watermark) ── */
        .sv-left-img-bg {
          position: absolute;
          top: 0; left: 0;
          width: 55%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .sv-left-img-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 0.07;
          filter: grayscale(40%) saturate(0.7);
          transform: scale(1.04);
          transition: opacity 0.7s ease;
        }
        /* fade to white on right edge */
        .sv-left-img-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg,
            rgba(255,255,255,0.0) 0%,
            rgba(255,255,255,0.6) 65%,
            #ffffff 100%
          );
        }
        /* fade top + bottom edges */
        .sv-left-img-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(180deg,
            #ffffff 0%,
            transparent 14%,
            transparent 86%,
            #ffffff 100%
          );
        }

        /* ── MAIN GRID ── */
        .sv-inner {
          position: relative; z-index: 10;
          max-width: 1160px; margin: 0 auto; width: 100%;
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 4rem;
          align-items: center;
          padding: 0 40px;
        }

        /* ── LEFT text ── */
        .sv-left { display: flex; flex-direction: column; gap: 1.5rem; }

        .sv-eyebrow { display: flex; align-items: center; gap: 10px; }

        .sv-eyebrow-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.9rem;
          font-size: 0.60rem;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--blue);
          opacity: 0.9;
        }
        .sv-eyebrow-pill::before,
        .sv-eyebrow-pill::after {
          content: '';
          display: block;
          width: 24px; height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--orange));
          border-radius: 2px;
          flex-shrink: 0;
        }
        .sv-eyebrow-num {
          font-size: 0.55rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--text-faint);
        }

        .sv-big-num {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(6rem, 14vw, 11rem);
          line-height: 1;
          letter-spacing: -0.03em;
          transition: color 0.5s ease;
          user-select: none;
          pointer-events: none;
          margin-bottom: -0.5rem;
        }

        .sv-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2.4rem, 5vw, 4rem);
          color: var(--text);
          line-height: 1.1;
          letter-spacing: -0.01em;
        }
        .sv-title-accent-blue {
          font-style: italic;
          background: linear-gradient(100deg, var(--blue), var(--orange));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 10px var(--blue-glow));
        }
        .sv-title-accent-amber {
          font-style: italic;
          color: var(--orange);
        }

        .sv-sub {
          font-size: 0.70rem;
          letter-spacing: 0.08em;
          color: var(--text-mid);
          line-height: 1.8;
          max-width: 460px;
        }

        .sv-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
        .sv-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          font-size: 0.55rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border: 1px solid;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          cursor: default;
        }
        .sv-tag::before {
          content: '';
          width: 5px; height: 5px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.6;
          flex-shrink: 0;
        }

        /* ── RIGHT image panel ── */
        .sv-right-panel {
          position: relative;
          height: 430px;
          overflow: hidden;
          cursor: default;
        }
        /* CTA-style corner accents */
        .sv-right-panel::before,
        .sv-right-panel::after {
          content: '';
          position: absolute;
          width: 22px; height: 22px;
          z-index: 5;
          pointer-events: none;
        }
        .sv-right-panel::before {
          top: -1px; left: -1px;
          border-top: 2px solid var(--blue);
          border-left: 2px solid var(--blue);
        }
        .sv-right-panel::after {
          bottom: -1px; right: -1px;
          border-bottom: 2px solid var(--orange);
          border-right: 2px solid var(--orange);
        }

        .sv-right-img {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.8s ease;
        }
        .sv-right-panel:hover .sv-right-img {
          transform: scale(1.05);
        }

        /* dark tinted overlay so text is readable */
        .sv-right-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          transition: background 0.6s ease;
        }

        /* scanline texture */
        .sv-right-scanlines {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(255,255,255,0.018) 3px,
            rgba(255,255,255,0.018) 4px
          );
        }

        /* thin border frame */
        .sv-right-border {
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
          border: 1px solid var(--border);
          box-shadow: 0 8px 48px var(--blue-glow), inset 0 0 0 1px rgba(255,255,255,0.06);
        }

        /* bottom strip with title */
        .sv-right-strip {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 5;
          padding: 28px 22px 22px;
          background: linear-gradient(0deg, rgba(10,22,48,0.92) 0%, rgba(10,22,48,0.5) 60%, transparent 100%);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
        }
        .sv-right-strip-left { display: flex; flex-direction: column; gap: 5px; }

        /* thin accent line above title */
        .sv-right-strip-line {
          width: 28px; height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, var(--blue), var(--orange));
          margin-bottom: 2px;
        }
        .sv-right-strip-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.4rem;
          color: #ffffff;
          letter-spacing: 0.04em;
          line-height: 1.2;
        }
        .sv-right-strip-sub {
          font-size: 0.55rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          line-height: 1;
        }
        .sv-right-strip-num {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 2.4rem;
          color: rgba(255,255,255,0.18);
          line-height: 1;
          letter-spacing: -0.02em;
          align-self: flex-end;
        }

        /* icon badge top-right of image */
        .sv-right-badge {
          position: absolute;
          top: 16px; right: 16px;
          z-index: 5;
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.18);
          color: #fff;
        }

        /* ── BOTTOM BAR ── */
        .sv-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 64px;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          z-index: 20;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(8px);
        }

        .sv-counter { display: flex; align-items: baseline; gap: 5px; }
        .sv-counter-cur {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.6rem;
          letter-spacing: -0.02em;
          line-height: 1;
          transition: color 0.4s;
        }
        .sv-counter-sep { font-size: 0.55rem; letter-spacing: 0.14em; color: var(--text-faint); }
        .sv-counter-tot { font-size: 0.55rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-faint); }

        .sv-dots { display: flex; gap: 6px; align-items: center; }
        .sv-dot {
          height: 4px; border-radius: 2px; cursor: pointer;
          transition: width 0.35s ease, background 0.35s ease;
          width: 16px; background: var(--border);
        }
        .sv-dot.active { width: 32px; }

        .sv-scroll-hint { display: flex; align-items: center; gap: 8px; }
        .sv-scroll-text {
          font-size: 0.55rem; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--text-faint);
        }
        .sv-scroll-line {
          width: 32px; height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--orange));
          border-radius: 2px;
          animation: sv-pulse-line 2s ease-in-out infinite;
        }
        @keyframes sv-pulse-line {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }

        .sv-ruler {
          border: none; height: 1px;
          background: linear-gradient(90deg, var(--blue), var(--orange), transparent);
          opacity: 0.25; margin: 0;
        }

        @media (max-width: 900px) {
          .sv-inner { grid-template-columns: 1fr; padding: 0 24px; gap: 2rem; align-content: center; }
          .sv-right-panel { height: 240px; }
          .sv-left-img-bg { width: 100%; }
        }
        @media (max-width: 520px) {
          .sv-inner { padding: 0 20px; }
          .sv-bottom { padding: 0 20px; }
          .sv-right-panel { height: 190px; }
        }
      `}</style>

      <hr className="sv-ruler" />

      <div className="sv-wrapper" ref={wrapperRef}>
        <div className="sv-sticky">

          <div className="sv-accent-bar" />

          <div className="sv-progress">
            <div className="sv-progress-fill" style={{ width: `${((active + 1) / TOTAL) * 100}%` }} />
          </div>

          {/* Left watermark image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`bg-${svc.id}`}
              className="sv-left-img-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <img src={svc.leftImg} alt="" />
            </motion.div>
          </AnimatePresence>

          {/* Main grid */}
          <div className="sv-inner">

            {/* LEFT text */}
            <div className="sv-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={svc.id}
                  style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.div
                    className="sv-eyebrow"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="sv-eyebrow-pill">Our Services</span>
                    <span className="sv-eyebrow-num">{svc.num} / {String(TOTAL).padStart(2, "0")}</span>
                  </motion.div>

                  <motion.div
                    className="sv-big-num"
                    style={{ color: svc.accent === "blue" ? "var(--blue-light)" : "var(--orange-light)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {svc.num}
                  </motion.div>

                  <motion.h2
                    className="sv-title"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: directionRef.current > 0 ? -20 : 20, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {svc.title.split(" ").map((word, i) => (
                      <span key={i}>
                        {i === 0
                          ? <span className={svc.accent === "blue" ? "sv-title-accent-blue" : "sv-title-accent-amber"}>{word}</span>
                          : ` ${word}`}
                      </span>
                    ))}
                  </motion.h2>

                  <motion.p
                    className="sv-sub"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {svc.sub}
                  </motion.p>

                  {svc.tags.length > 0 && (
                    <motion.div
                      className="sv-tags"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {svc.tags.map((t) => (
                        <span key={t} className="sv-tag" style={{ background: c.tagBg, color: c.color, borderColor: c.tagBorder }}>
                          {t}
                        </span>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT image panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${svc.id}`}
                className="sv-right-panel"
                initial={{ opacity: 0, x: 28, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -16, scale: 0.97 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <img className="sv-right-img" src={svc.rightImg} alt={svc.title} />

                {/* dark tinted overlay */}
                <div className="sv-right-overlay" style={{ background: c.overlayColor }} />

                {/* scanlines */}
                <div className="sv-right-scanlines" />

                {/* border frame */}
                <div className="sv-right-border" />

                {/* icon badge */}
                <div className="sv-right-badge">{svc.icon}</div>

                {/* bottom strip */}
                <div className="sv-right-strip">
                  <div className="sv-right-strip-left">
                    <div className="sv-right-strip-line" />
                    <div className="sv-right-strip-title">{svc.title}</div>
                    <div className="sv-right-strip-sub">Service {svc.num}</div>
                  </div>
                  <div className="sv-right-strip-num">{svc.num}</div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Bottom bar */}
          <div className="sv-bottom">
            <div className="sv-counter">
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  className="sv-counter-cur"
                  style={{ color: c.color }}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {String(active + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              <span className="sv-counter-sep">/</span>
              <span className="sv-counter-tot">{String(TOTAL).padStart(2, "0")}</span>
            </div>

            <div className="sv-dots">
              {services.map((_, i) => (
                <div
                  key={i}
                  className={`sv-dot${i === active ? " active" : ""}`}
                  style={i === active ? { background: c.color } : {}}
                  onClick={() => {
                    const wrapper = wrapperRef.current;
                    if (!wrapper) return;
                    window.scrollTo({ top: wrapper.offsetTop + i * stepRef.current, behavior: "smooth" });
                  }}
                />
              ))}
            </div>

            {active < TOTAL - 1 ? (
              <div className="sv-scroll-hint">
                <span className="sv-scroll-text">Scroll</span>
                <div className="sv-scroll-line" />
              </div>
            ) : (
              <span className="sv-scroll-text" style={{ color: "var(--blue)" }}>All services shown</span>
            )}
          </div>

        </div>
      </div>

      <hr className="sv-ruler" />
    </>
  );
};

export default ServicesSection;
