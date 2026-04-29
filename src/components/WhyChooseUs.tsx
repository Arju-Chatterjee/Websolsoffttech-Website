import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const reasons = [
  {
    num: "01",
    title: "End-to-End Ownership",
    body: "From strategy and design to development and launch — we own every phase. No handoffs, no gaps, no excuses.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={32} height={32}>
        <path d="M4 14h20M14 4l10 10-10 10" stroke="#3d82f5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    accent: "#3d82f5",
    shadow: "rgba(61,130,245,0.45)",
    warm: false,
  },
  {
    num: "02",
    title: "Performance First",
    body: "Every decision — from architecture to animation — is made with speed, scalability, and real-world load in mind.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={32} height={32}>
        <circle cx="14" cy="14" r="10" stroke="#f07820" strokeWidth="1.6"/>
        <path d="M14 8v6l4 2" stroke="#f07820" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    accent: "#f07820",
    shadow: "rgba(240,120,32,0.45)",
    warm: true,
  },
  {
    num: "03",
    title: "Strategy-Led Thinking",
    body: "We don't just execute briefs. We challenge assumptions, identify opportunities, and build products that solve real problems.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={32} height={32}>
        <rect x="3" y="8" width="22" height="14" rx="1.5" stroke="#3d82f5" strokeWidth="1.6"/>
        <path d="M9 8V6a5 5 0 0110 0v2" stroke="#3d82f5" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="14" cy="15" r="2" fill="#3d82f5" opacity=".6"/>
      </svg>
    ),
    accent: "#3d82f5",
    shadow: "rgba(61,130,245,0.45)",
    warm: false,
  },
  {
    num: "04",
    title: "Transparent Process",
    body: "Weekly updates, open communication, and no black boxes. You always know where your project stands and why.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={32} height={32}>
        <path d="M5 7h18M5 14h12M5 21h8" stroke="#f07820" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="22" cy="20" r="4" stroke="#f07820" strokeWidth="1.6"/>
        <path d="M22 18v2l1.5 1" stroke="#f07820" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    accent: "#f07820",
    shadow: "rgba(240,120,32,0.45)",
    warm: true,
  },
  {
    num: "05",
    title: "Built to Scale",
    body: "Our solutions are architected to grow with you — whether you're onboarding 100 or 100,000 users.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={32} height={32}>
        <path d="M4 20l5-6 4 4 5-7 6 4" stroke="#3d82f5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="14" r="1.5" fill="#3d82f5"/>
        <circle cx="18" cy="11" r="1.5" fill="#f07820"/>
      </svg>
    ),
    accent: "#3d82f5",
    shadow: "rgba(61,130,245,0.45)",
    warm: false,
  },
  {
    num: "06",
    title: "Long-Term Partnership",
    body: "Launch is just the beginning. We stay involved — monitoring, optimizing, and evolving your product over time.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={32} height={32}>
        <path d="M14 4C8.48 4 4 8.48 4 14s4.48 10 10 10 10-4.48 10-10" stroke="#f07820" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M19 4l5 5-5 5" stroke="#f07820" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    accent: "#f07820",
    shadow: "rgba(240,120,32,0.45)",
    warm: true,
  },
];

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
  { top: "18%", left: "12%",  size: 3, dur: "7s",   color: "#3d82f5", delay: "0s"   },
  { top: "62%", left: "6%",   size: 2, dur: "9s",   color: "#f07820", delay: "1.4s" },
  { top: "35%", right: "8%",  size: 4, dur: "6.5s", color: "#3d82f5", delay: "2.2s" },
  { top: "75%", right: "20%", size: 2, dur: "8s",   color: "#ff9340", delay: "0.7s" },
  { top: "12%", right: "38%", size: 2, dur: "10s",  color: "#3d82f5", delay: "3.1s" },
];

const WHATSAPP_URL = "https://wa.me/9233770627";

const CardItem = ({ reason, index }: { reason: typeof reasons[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={`wcu-card${reason.warm ? " wcu-card-warm" : ""}`}
      style={{ "--card-accent": reason.accent, "--card-shadow": reason.shadow } as React.CSSProperties}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
    >
      {/* Bold outer glow shadow layer */}
      <div className="wcu-card-shadow" />

      {/* Top accent border */}
      <div className="wcu-card-top-border" />

      {/* Corner decoration */}
      <div className="wcu-card-corner" />

      {/* Number badge */}
      <div className="wcu-card-num-badge">{reason.num}</div>

      {/* Icon block */}
      <div className="wcu-card-icon-wrap">
        <div className="wcu-card-icon-ring" />
        <div className="wcu-card-icon">{reason.icon}</div>
      </div>

      {/* Text */}
      <div className="wcu-card-title">{reason.title}</div>
      <div className="wcu-card-body">{reason.body}</div>

      {/* Bottom bar */}
      <div className="wcu-card-footer">
        <div className="wcu-card-footer-line" />
        <div className="wcu-card-footer-dot" />
      </div>
    </motion.div>
  );
};

const WhyChooseUs = () => {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');

        .wcu-root {
          font-family: 'DM Mono', monospace;
          background: #060c1a;
          color: #e8edf8;
          padding: 7rem 2.5rem 8rem;
          position: relative;
          overflow: hidden;
        }

        .wcu-root::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #3d82f5 0%, #f07820 50%, #3d82f5 100%);
          box-shadow: 0 0 12px rgba(26,95,212,0.5), 0 0 24px rgba(240,120,32,0.3);
        }

        .wcu-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 65% 55% at 5% 15%,  rgba(26,95,212,0.13) 0%, transparent 60%),
            radial-gradient(ellipse 50% 45% at 95% 85%, rgba(240,120,32,0.10) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(26,95,212,0.05) 0%, transparent 60%);
        }
        .wcu-orb-a {
          position: absolute; border-radius: 50%; pointer-events: none;
          width: 500px; height: 500px;
          top: -180px; left: -180px;
          background: radial-gradient(circle, #1a5fd4 0%, transparent 70%);
          filter: blur(90px); opacity: 0.18;
          animation: wcu-drift 14s ease-in-out infinite alternate;
        }
        .wcu-orb-b {
          position: absolute; border-radius: 50%; pointer-events: none;
          width: 400px; height: 400px;
          bottom: -120px; right: -100px;
          background: radial-gradient(circle, #f07820 0%, transparent 70%);
          filter: blur(90px); opacity: 0.14;
          animation: wcu-drift 11s ease-in-out infinite alternate-reverse;
        }
        @keyframes wcu-drift {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(35px,25px) scale(1.07); }
        }

        .wcu-diag {
          position: absolute; top: 0; right: 30%;
          width: 1px; height: 120%;
          background: linear-gradient(to bottom, transparent 0%, rgba(61,130,245,0.14) 40%, rgba(240,120,32,0.10) 70%, transparent 100%);
          transform: rotate(14deg); transform-origin: top center;
          pointer-events: none;
        }
        .wcu-scan {
          position: absolute; left: 0; right: 0; top: 42%; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(61,130,245,0.08) 30%, rgba(240,120,32,0.08) 70%, transparent 100%);
          pointer-events: none;
        }

        .wcu-particle {
          position: absolute; border-radius: 50%; pointer-events: none;
          animation: wcu-float linear infinite;
        }
        @keyframes wcu-float {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.5; }
          50%  { opacity: 1; }
          100% { transform: translateY(-70px) translateX(12px) scale(0.3); opacity: 0; }
        }

        .wcu-inner {
          position: relative; z-index: 2;
          max-width: 1280px; margin: 0 auto;
        }

        /* ── HEADER ── */
        .wcu-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: end;
          margin-bottom: 5rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(61,130,245,0.1);
        }
        @media (max-width: 768px) {
          .wcu-header { grid-template-columns: 1fr; gap: 1.5rem; }
        }

        .wcu-eyebrow {
          display: flex; align-items: center; gap: 1rem;
          margin-bottom: 1.2rem;
        }
        .wcu-eyebrow-line {
          width: 40px; height: 2px;
          background: linear-gradient(90deg, #3d82f5, #f07820);
          box-shadow: 0 0 8px rgba(26,95,212,0.55);
        }
        .wcu-eyebrow-text {
          font-size: 0.62rem; letter-spacing: 0.24em;
          text-transform: uppercase; color: #3d82f5; opacity: 0.9;
        }

        .wcu-headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2.6rem, 5.5vw, 4.4rem);
          line-height: 1.06; color: #e8edf8;
          letter-spacing: -0.01em;
        }
        .wcu-headline em {
          font-style: italic;
          background: linear-gradient(100deg, #3d82f5, #ff9340);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 18px rgba(26,95,212,0.4));
        }

        .wcu-right-col {
          display: flex; flex-direction: column;
          gap: 1.6rem; align-self: end;
        }
        .wcu-desc {
          font-size: 0.72rem; line-height: 1.9;
          letter-spacing: 0.04em; color: #7a90b5;
          max-width: 440px;
        }
        .wcu-cta {
          display: flex; align-items: center; gap: 1.2rem;
        }

        /* WhatsApp button */
        .wcu-btn {
          position: relative;
          display: inline-flex; align-items: center; gap: 10px;
          padding: 13px 32px;
          font-family: 'DM Mono', monospace;
          font-size: 0.66rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: #fff;
          text-decoration: none;
          background: linear-gradient(135deg, #25d366 0%, #1aab4f 100%);
          border: none; cursor: pointer;
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          box-shadow:
            0 0 0 1px rgba(37,211,102,0.3),
            0 0 28px rgba(37,211,102,0.35),
            0 8px 32px rgba(0,0,0,0.4);
          transition: all 0.3s ease; overflow: hidden;
        }
        .wcu-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #1aab4f 0%, #128c3e 100%);
          opacity: 0; transition: opacity 0.3s;
        }
        .wcu-btn:hover::before { opacity: 1; }
        .wcu-btn:hover {
          box-shadow:
            0 0 0 1px rgba(37,211,102,0.5),
            0 0 40px rgba(37,211,102,0.5),
            0 12px 40px rgba(0,0,0,0.5);
          transform: translateY(-2px);
        }
        .wcu-btn svg { position: relative; z-index: 1; flex-shrink: 0; }
        .wcu-btn span { position: relative; z-index: 1; }

        /* ── CARDS GRID ── */
        .wcu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .wcu-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .wcu-grid { grid-template-columns: 1fr; }
        }

        /* ── BOLD SHADOW CARD ── */
        .wcu-card {
          position: relative;
          background: #0a1426;
          border: 1px solid rgba(61,130,245,0.15);
          padding: 2.2rem 2rem 1.8rem;
          overflow: hidden;
          cursor: default;
          transition: border-color 0.35s ease;
          /* Bold dramatic shadow — the key effect */
          box-shadow:
            0 0 0 1px rgba(61,130,245,0.08),
            0 4px 12px rgba(0,0,0,0.5),
            0 12px 40px rgba(0,0,0,0.4),
            0 24px 64px rgba(0,0,0,0.3),
            /* colored bottom shadow */
            0 32px 80px -16px rgba(61,130,245,0.25),
            /* inner top highlight */
            inset 0 1px 0 rgba(61,130,245,0.12);
        }
        .wcu-card:hover {
          border-color: rgba(61,130,245,0.35);
          box-shadow:
            0 0 0 1px rgba(61,130,245,0.2),
            0 4px 12px rgba(0,0,0,0.6),
            0 16px 48px rgba(0,0,0,0.5),
            0 32px 80px rgba(0,0,0,0.4),
            0 40px 100px -16px rgba(61,130,245,0.45),
            inset 0 1px 0 rgba(61,130,245,0.2);
        }
        .wcu-card-warm {
          border-color: rgba(240,120,32,0.15);
          box-shadow:
            0 0 0 1px rgba(240,120,32,0.08),
            0 4px 12px rgba(0,0,0,0.5),
            0 12px 40px rgba(0,0,0,0.4),
            0 24px 64px rgba(0,0,0,0.3),
            0 32px 80px -16px rgba(240,120,32,0.22),
            inset 0 1px 0 rgba(240,120,32,0.1);
        }
        .wcu-card-warm:hover {
          border-color: rgba(240,120,32,0.38);
          box-shadow:
            0 0 0 1px rgba(240,120,32,0.22),
            0 4px 12px rgba(0,0,0,0.6),
            0 16px 48px rgba(0,0,0,0.5),
            0 32px 80px rgba(0,0,0,0.4),
            0 40px 100px -16px rgba(240,120,32,0.42),
            inset 0 1px 0 rgba(240,120,32,0.18);
        }

        /* Glowing bottom shadow blob (pseudo) */
        .wcu-card-shadow {
          position: absolute;
          bottom: -40px; left: 50%;
          transform: translateX(-50%);
          width: 80%; height: 80px;
          background: radial-gradient(ellipse, var(--card-shadow, rgba(61,130,245,0.3)) 0%, transparent 70%);
          filter: blur(20px);
          opacity: 0.5;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .wcu-card:hover .wcu-card-shadow { opacity: 0.9; }

        /* Top accent border */
        .wcu-card-top-border {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent 0%, var(--card-accent, #3d82f5) 50%, transparent 100%);
          opacity: 0.6;
          transition: opacity 0.35s;
        }
        .wcu-card:hover .wcu-card-top-border { opacity: 1; }

        /* Corner bracket decoration */
        .wcu-card-corner {
          position: absolute; top: 12px; right: 12px;
          width: 16px; height: 16px;
          border-top: 1px solid var(--card-accent, #3d82f5);
          border-right: 1px solid var(--card-accent, #3d82f5);
          opacity: 0.3;
          transition: opacity 0.35s, width 0.35s, height 0.35s;
        }
        .wcu-card:hover .wcu-card-corner {
          opacity: 0.7; width: 22px; height: 22px;
        }

        /* Number badge */
        .wcu-card-num-badge {
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 0.5rem; letter-spacing: 0.2em;
          color: var(--card-accent, #3d82f5);
          border: 1px solid var(--card-accent, #3d82f5);
          padding: 2px 8px;
          margin-bottom: 1.4rem;
          opacity: 0.6;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
          background: rgba(0,0,0,0.3);
          transition: opacity 0.3s;
        }
        .wcu-card:hover .wcu-card-num-badge { opacity: 1; }

        /* Icon */
        .wcu-card-icon-wrap {
          position: relative;
          width: 56px; height: 56px;
          margin-bottom: 1.4rem;
        }
        .wcu-card-icon-ring {
          position: absolute; inset: 0;
          border: 1px solid var(--card-accent, #3d82f5);
          opacity: 0.2;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          background: rgba(0,0,0,0.4);
          transition: opacity 0.3s, background 0.3s;
        }
        .wcu-card:hover .wcu-card-icon-ring {
          opacity: 0.5;
          background: color-mix(in srgb, var(--card-accent, #3d82f5) 10%, transparent);
          box-shadow: 0 0 20px var(--card-shadow, rgba(61,130,245,0.3));
        }
        .wcu-card-icon {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
        }

        /* Title */
        .wcu-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 600;
          font-size: 1.55rem;
          line-height: 1.2;
          color: #e8edf8;
          letter-spacing: 0.01em;
          margin-bottom: 0.75rem;
          transition: color 0.3s;
          /* Bold text shadow for depth */
          text-shadow:
            0 2px 12px rgba(0,0,0,0.8),
            0 0 40px var(--card-shadow, rgba(61,130,245,0.2));
        }
        .wcu-card:hover .wcu-card-title { color: #fff; }

        /* Body */
        .wcu-card-body {
          font-size: 0.63rem; line-height: 1.9;
          letter-spacing: 0.04em;
          color: #4a6480;
          transition: color 0.3s;
        }
        .wcu-card:hover .wcu-card-body { color: #7a90b5; }

        /* Footer line */
        .wcu-card-footer {
          display: flex; align-items: center; gap: 8px;
          margin-top: 1.6rem;
        }
        .wcu-card-footer-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, var(--card-accent, #3d82f5), transparent);
          opacity: 0.2;
          transition: opacity 0.3s;
        }
        .wcu-card:hover .wcu-card-footer-line { opacity: 0.5; }
        .wcu-card-footer-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--card-accent, #3d82f5);
          opacity: 0.4;
          box-shadow: 0 0 6px var(--card-accent, #3d82f5);
          transition: opacity 0.3s;
        }
        .wcu-card:hover .wcu-card-footer-dot { opacity: 1; }

        .wcu-side-label {
          position: absolute; left: 1.2rem; top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          font-size: 0.52rem; letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(120,150,200,0.25);
          white-space: nowrap; display: none; z-index: 10;
        }
        @media (min-width: 1280px) { .wcu-side-label { display: block; } }
      `}</style>

      <section className="wcu-root">
        <div className="wcu-bg" />
        <div className="wcu-orb-a" />
        <div className="wcu-orb-b" />
        <div className="wcu-diag" />
        <div className="wcu-scan" />

        {particles.map((p, i) => (
          <div key={i} className="wcu-particle" style={{
            top: p.top,
            left: p.left,
            right: p.right,
            width: p.size, height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animationDuration: p.dur,
            animationDelay: p.delay,
          }} />
        ))}

        <div className="wcu-side-label">Websolsoffttech — Why Choose Us</div>

        <div className="wcu-inner">

          {/* Header */}
          <div className="wcu-header" ref={headRef}>
            <div>
              <motion.div
                className="wcu-eyebrow"
                initial={{ opacity: 0, x: -24 }}
                animate={headInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="wcu-eyebrow-line" />
                <span className="wcu-eyebrow-text">Why Choose Us</span>
              </motion.div>

              <motion.h2
                className="wcu-headline"
                initial={{ opacity: 0, y: 36 }}
                animate={headInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                The difference is in<br />
                how we <em>think & build</em>
              </motion.h2>
            </div>

            <motion.div
              className="wcu-right-col"
              initial={{ opacity: 0, y: 24 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="wcu-desc">
                We don't just deliver projects — we build partnerships grounded in transparency, technical excellence, and a genuine investment in your success. Here's what sets us apart.
              </p>
              <div className="wcu-cta">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wcu-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Start Your Project With us</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Cards grid */}
          <div className="wcu-grid">
            {reasons.map((reason, i) => (
              <CardItem key={reason.num} reason={reason} index={i} />
            ))}
          </div>



        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
