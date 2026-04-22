import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const reasons = [
  {
    num: "01",
    title: "End-to-End Ownership",
    body: "From strategy and design to development and launch — we own every phase. No handoffs, no gaps, no excuses.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={28} height={28}>
        <path d="M4 14h20M14 4l10 10-10 10" stroke="#3d82f5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    accent: "#3d82f5",
    warm: false,
  },
  {
    num: "02",
    title: "Performance First",
    body: "Every decision — from architecture to animation — is made with speed, scalability, and real-world load in mind.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={28} height={28}>
        <circle cx="14" cy="14" r="10" stroke="#f07820" strokeWidth="1.4"/>
        <path d="M14 8v6l4 2" stroke="#f07820" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    accent: "#f07820",
    warm: true,
  },
  {
    num: "03",
    title: "Strategy-Led Thinking",
    body: "We don't just execute briefs. We challenge assumptions, identify opportunities, and build products that solve real problems.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={28} height={28}>
        <rect x="3" y="8" width="22" height="14" rx="1.5" stroke="#3d82f5" strokeWidth="1.4"/>
        <path d="M9 8V6a5 5 0 0110 0v2" stroke="#3d82f5" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="14" cy="15" r="2" fill="#3d82f5" opacity=".6"/>
      </svg>
    ),
    accent: "#3d82f5",
    warm: false,
  },
  {
    num: "04",
    title: "Transparent Process",
    body: "Weekly updates, open communication, and no black boxes. You always know where your project stands and why.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={28} height={28}>
        <path d="M5 7h18M5 14h12M5 21h8" stroke="#f07820" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="22" cy="20" r="4" stroke="#f07820" strokeWidth="1.4"/>
        <path d="M22 18v2l1.5 1" stroke="#f07820" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    accent: "#f07820",
    warm: true,
  },
  {
    num: "05",
    title: "Built to Scale",
    body: "Our solutions are architected to grow with you — whether you're onboarding 100 or 100,000 users.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={28} height={28}>
        <path d="M4 20l5-6 4 4 5-7 6 4" stroke="#3d82f5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="14" r="1.5" fill="#3d82f5"/>
        <circle cx="18" cy="11" r="1.5" fill="#f07820"/>
      </svg>
    ),
    accent: "#3d82f5",
    warm: false,
  },
  {
    num: "06",
    title: "Long-Term Partnership",
    body: "Launch is just the beginning. We stay involved — monitoring, optimizing, and evolving your product over time.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={28} height={28}>
        <path d="M14 4C8.48 4 4 8.48 4 14s4.48 10 10 10 10-4.48 10-10" stroke="#f07820" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M19 4l5 5-5 5" stroke="#f07820" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    accent: "#f07820",
    warm: true,
  },
];

const CardItem = ({ reason, index }: { reason: typeof reasons[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={`wcu-card${reason.warm ? " wcu-card-warm" : ""}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="wcu-card-num">{reason.num}</div>
      <div className={`wcu-card-icon${reason.warm ? " warm" : ""}`}>{reason.icon}</div>
      <div className="wcu-card-title">{reason.title}</div>
      <div className="wcu-card-body">{reason.body}</div>
      <div className={`wcu-card-line${reason.warm ? " warm" : ""}`} />
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

        /* ── TOP DIVIDER ── */
        .wcu-root::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #3d82f5 0%, #f07820 50%, #3d82f5 100%);
          box-shadow: 0 0 12px rgba(26,95,212,0.5), 0 0 24px rgba(240,120,32,0.3);
        }

        /* ── BG ── */
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

        /* ── PARTICLES ── */
        .wcu-particle {
          position: absolute; border-radius: 50%; pointer-events: none;
          animation: wcu-float linear infinite;
        }
        @keyframes wcu-float {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.5; }
          50%  { opacity: 1; }
          100% { transform: translateY(-70px) translateX(12px) scale(0.3); opacity: 0; }
        }

        /* ── INNER ── */
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
        .wcu-btn {
          position: relative;
          padding: 12px 32px;
          font-family: 'DM Mono', monospace;
          font-size: 0.66rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: #fff;
          background: linear-gradient(135deg, #f07820 0%, #e05a08 100%);
          border: none; cursor: pointer;
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          box-shadow: 0 0 28px rgba(240,120,32,0.4), 0 4px 16px rgba(0,0,0,0.3);
          transition: all 0.3s ease; overflow: hidden;
        }
        .wcu-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #1a5fd4 0%, #1249aa 100%);
          opacity: 0; transition: opacity 0.3s;
        }
        .wcu-btn:hover::before { opacity: 1; }
        .wcu-btn:hover {
          box-shadow: 0 0 32px rgba(26,95,212,0.5), 0 4px 16px rgba(0,0,0,0.4);
          transform: translateY(-2px);
        }
        .wcu-btn span { position: relative; z-index: 1; }

        /* ── GRID ── */
        .wcu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(61,130,245,0.08);
          border: 1px solid rgba(61,130,245,0.08);
        }
        @media (max-width: 900px) {
          .wcu-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .wcu-grid { grid-template-columns: 1fr; }
        }

        /* ── CARD ── */
        .wcu-card {
          position: relative;
          background: rgba(6,12,26,0.95);
          padding: 2.4rem 2rem 2rem;
          overflow: hidden;
          cursor: default;
          transition: background 0.3s;
        }
        .wcu-card:hover { background: rgba(26,95,212,0.06); }
        .wcu-card-warm:hover { background: rgba(240,120,32,0.05); }

        /* top accent line per card */
        .wcu-card-line {
          position: absolute; top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(61,130,245,0.35), transparent);
          transition: opacity 0.3s;
        }
        .wcu-card-line.warm {
          background: linear-gradient(90deg, transparent, rgba(240,120,32,0.35), transparent);
        }
        .wcu-card:hover .wcu-card-line { opacity: 1; }

        /* hover glow blob */
        .wcu-card::after {
          content: '';
          position: absolute; bottom: -60px; right: -60px;
          width: 160px; height: 160px; border-radius: 50%;
          background: radial-gradient(circle, rgba(61,130,245,0.12) 0%, transparent 70%);
          transition: opacity 0.4s;
          opacity: 0; pointer-events: none;
        }
        .wcu-card:hover::after { opacity: 1; }
        .wcu-card-warm::after {
          background: radial-gradient(circle, rgba(240,120,32,0.10) 0%, transparent 70%);
        }

        .wcu-card-num {
          font-size: 0.52rem; letter-spacing: 0.22em;
          color: rgba(120,150,200,0.3);
          margin-bottom: 1.2rem;
          transition: color 0.3s;
        }
        .wcu-card:hover .wcu-card-num { color: rgba(61,130,245,0.5); }
        .wcu-card-warm:hover .wcu-card-num { color: rgba(240,120,32,0.5); }

        .wcu-card-icon {
          width: 48px; height: 48px;
          border: 1px solid rgba(61,130,245,0.18);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.4rem;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          background: rgba(26,95,212,0.06);
          transition: border-color 0.3s, background 0.3s;
        }
        .wcu-card-icon.warm {
          border-color: rgba(240,120,32,0.18);
          background: rgba(240,120,32,0.06);
        }
        .wcu-card:hover .wcu-card-icon { border-color: rgba(61,130,245,0.4); background: rgba(26,95,212,0.12); }
        .wcu-card-warm:hover .wcu-card-icon { border-color: rgba(240,120,32,0.4); background: rgba(240,120,32,0.10); }

        .wcu-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400; font-size: 1.5rem;
          color: #e8edf8; letter-spacing: 0.02em;
          margin-bottom: 0.8rem; line-height: 1.2;
          transition: color 0.3s;
        }
        .wcu-card:hover .wcu-card-title { color: #fff; }

        .wcu-card-body {
          font-size: 0.64rem; line-height: 1.85;
          letter-spacing: 0.04em; color: #4a6480;
          transition: color 0.3s;
        }
        .wcu-card:hover .wcu-card-body { color: #7a90b5; }

        /* ── BOTTOM BAND ── */
        .wcu-band {
          margin-top: 4rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(61,130,245,0.08);
          border: 1px solid rgba(61,130,245,0.08);
        }
        @media (max-width: 768px) {
          .wcu-band { grid-template-columns: repeat(2, 1fr); }
        }
        .wcu-stat {
          background: rgba(6,12,26,0.95);
          padding: 1.8rem 1.6rem;
          display: flex; flex-direction: column; gap: 6px;
          transition: background 0.3s;
        }
        .wcu-stat:hover { background: rgba(26,95,212,0.06); }
        .wcu-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-size: 2.6rem;
          line-height: 1;
        }
        .wcu-stat:nth-child(odd)  .wcu-stat-val { color: #3d82f5; text-shadow: 0 0 20px rgba(26,95,212,0.45); }
        .wcu-stat:nth-child(even) .wcu-stat-val { color: #ff9340; text-shadow: 0 0 20px rgba(240,120,32,0.45); }
        .wcu-stat-lbl {
          font-size: 0.56rem; letter-spacing: 0.16em;
          text-transform: uppercase; color: rgba(120,150,200,0.4);
        }
        .wcu-stat-sub {
          font-size: 0.6rem; line-height: 1.7;
          color: #3a5068; margin-top: 2px;
        }

        /* ── SIDE LABEL ── */
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

        {/* Particles */}
        {[
          { top:"18%", left:"12%",  size:3, dur:"7s",   color:"#3d82f5", delay:"0s"   },
          { top:"62%", left:"6%",   size:2, dur:"9s",   color:"#f07820", delay:"1.4s" },
          { top:"35%", right:"8%",  size:4, dur:"6.5s", color:"#3d82f5", delay:"2.2s" },
          { top:"75%", right:"20%", size:2, dur:"8s",   color:"#ff9340", delay:"0.7s" },
          { top:"12%", right:"38%", size:2, dur:"10s",  color:"#3d82f5", delay:"3.1s" },
        ].map((p, i) => (
          <div key={i} className="wcu-particle" style={{
            top: p.top,
            left: (p as any).left,
            right: (p as any).right,
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
                <button className="wcu-btn"><span>Start Your Project</span></button>
              </div>
            </motion.div>
          </div>

          {/* Cards grid */}
          <div className="wcu-grid">
            {reasons.map((reason, i) => (
              <CardItem key={reason.num} reason={reason} index={i} />
            ))}
          </div>

          {/* Stats band */}
          <div className="wcu-band">
            {[
              { val: "10+",  lbl: "Projects Delivered",  sub: "Across startups & established brands" },
              { val: "98%",  lbl: "Client Satisfaction",  sub: "Measured by repeat work & referrals" },
              { val: "3+",   lbl: "Years of Expertise",   sub: "Building products that outlast trends" },
              { val: "10+",  lbl: "Expert Team Members",  sub: "Designers, engineers & strategists" },
            ].map((s, i) => (
              <motion.div
                key={s.lbl}
                className="wcu-stat"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="wcu-stat-val">{s.val}</span>
                <span className="wcu-stat-lbl">{s.lbl}</span>
                <span className="wcu-stat-sub">{s.sub}</span>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
