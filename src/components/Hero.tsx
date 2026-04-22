import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const stats = [
  { value: "10+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "3+", label: "Years Experience" },
  { value: "10+", label: "Expert Team" },
];

const tags = ["Web Development", "Mobile Apps", "Software Development", "Digital Marketing", "SEO", "Branding", "Advertising", "Content Delivering"];

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(springY, [-300, 300], [6, -6]);
  const rotateY = useTransform(springX, [-300, 300], [-6, 6]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set(e.clientX - cx);
      mouseY.set(e.clientY - cy);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --blue:        #1a5fd4;
          --blue-bright: #3d82f5;
          --blue-glow:   rgba(26, 95, 212, 0.55);
          --orange:      #f07820;
          --orange-bright:#ff9340;
          --orange-glow: rgba(240, 120, 32, 0.5);
          --bg:          #060c1a;
          --bg-card:     rgba(8, 16, 38, 0.9);
          --text:        #e8edf8;
          --text-dim:    #7a90b5;
          --text-faint:  rgba(120, 150, 200, 0.45);
          --border:      rgba(61, 130, 245, 0.18);
          --border-warm: rgba(240, 120, 32, 0.22);
        }

        .hero-root {
          font-family: 'DM Mono', monospace;
          background: var(--bg);
          min-height: 100vh;
          padding-top: 72px;
          position: relative;
          overflow: hidden;
          color: var(--text);
        }

        /* ── BACKGROUND IMAGE ── */
        .hero-bg-image {
          position: absolute;
          inset: 0;
          background-image: url('src/assets/marvin-meyer-SYTO3xs06fU-unsplash.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          pointer-events: none;
        }

        /* dark overlay to keep text legible and on-brand */
        .hero-bg-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to bottom, rgba(6,12,26,0.82) 0%, rgba(6,12,26,0.70) 50%, rgba(6,12,26,0.92) 100%),
            linear-gradient(to right,  rgba(6,12,26,0.5) 0%, transparent 60%);
          pointer-events: none;
        }

        /* ── MESH (brand color tint on top of photo) ── */
        .hero-mesh {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 70% 60% at 15% 20%, rgba(26,95,212,0.22) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 85% 75%, rgba(240,120,32,0.16) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 60% 10%, rgba(26,95,212,0.10) 0%, transparent 50%);
        }

        /* ── GLOWING ORBS ── */
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
          opacity: 0.35;
        }
        .glow-orb-blue {
          width: 600px; height: 600px;
          top: -100px; left: -150px;
          background: radial-gradient(circle, var(--blue) 0%, transparent 70%);
          animation: orb-drift 12s ease-in-out infinite alternate;
        }
        .glow-orb-orange {
          width: 480px; height: 480px;
          bottom: -80px; right: -100px;
          background: radial-gradient(circle, var(--orange) 0%, transparent 70%);
          animation: orb-drift 10s ease-in-out infinite alternate-reverse;
        }
        .glow-orb-blue2 {
          width: 300px; height: 300px;
          top: 55%; right: 25%;
          background: radial-gradient(circle, var(--blue-bright) 0%, transparent 70%);
          opacity: 0.15;
          filter: blur(60px);
          animation: orb-drift 15s ease-in-out infinite alternate;
        }
        @keyframes orb-drift {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, 30px) scale(1.08); }
        }

        /* ── DIAGONAL ACCENT ── */
        .hero-diagonal {
          position: absolute;
          top: 0; right: 28%;
          width: 1px; height: 120%;
          background: linear-gradient(to bottom,
            transparent 0%,
            var(--blue-bright) 35%,
            var(--orange) 65%,
            transparent 100%);
          opacity: 0.2;
          transform: rotate(14deg);
          transform-origin: top center;
          pointer-events: none;
        }
        .hero-diagonal-2 {
          position: absolute;
          top: 0; right: 22%;
          width: 1px; height: 120%;
          background: linear-gradient(to bottom,
            transparent 0%,
            rgba(240,120,32,0.15) 40%,
            transparent 100%);
          transform: rotate(14deg);
          transform-origin: top center;
          pointer-events: none;
        }

        /* ── HORIZONTAL SCAN LINE ── */
        .hero-scan {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            var(--blue-bright) 30%,
            var(--orange) 70%,
            transparent 100%);
          top: 38%;
          opacity: 0.10;
          pointer-events: none;
        }

        /* ── LAYOUT ── */
        .hero-inner {
          position: relative;
          z-index: 10;
          max-width: 1280px;
          margin: 0 auto;
          padding: 6rem 2.5rem 4rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .hero-inner {
            grid-template-columns: 1.15fr 0.85fr;
            gap: 5rem;
            padding: 7rem 2.5rem 5rem;
          }
        }

        /* ── LEFT COLUMN ── */
        .hero-left { display: flex; flex-direction: column; gap: 2rem; }

        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .eyebrow-line {
          width: 40px; height: 2px;
          background: linear-gradient(90deg, var(--blue-bright), var(--orange));
          border-radius: px;
          box-shadow: 0 0 8px var(--blue-glow);
        }
        .eyebrow-text {
          font-size: 0.62rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--blue-bright);
          opacity: 0.9;
        }

        .hero-headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 1000;
          font-size: clamp(3rem, 7vw, 5.8rem);
          line-height: 1.05;
          letter-spacing: -0.01em;
          color: var(--text);
        }
        .hero-headline em {
          font-style: italic;
          background: linear-gradient(100deg, var(--blue-bright), var(--orange-bright));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 20px var(--blue-glow));
        }
        .hero-headline .outline-text {
          -webkit-text-stroke: 1px #f07820;
          color: transparent;
        }

        .hero-body {
          font-size: 0.75rem;
          line-height: 1.9;
          letter-spacing: 0.05em;
          color: var(--text);
          max-width: 480px;
        }

        /* ── TAGS ── */
        .hero-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .hero-tag {
          padding: 5px 14px;
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--blue-bright);
          border: 1px solid var(--border);
          background: rgba(26, 95, 212, 0.07);
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          transition: all 0.3s ease;
          cursor: default;
          backdrop-filter: blur(4px);
        }
        .hero-tag:hover {
          background: rgba(240, 120, 32, 0.12);
          border-color: var(--border-warm);
          color: var(--orange-bright);
          box-shadow: 0 0 14px var(--orange-glow);
        }

        /* ── CTA ROW ── */
        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .btn-primary {
          position: relative;
          padding: 13px 36px;
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fff;
          background: linear-gradient(135deg, var(--orange) 0%, #e05a08 100%);
          border: none;
          cursor: pointer;
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          box-shadow: 0 0 28px var(--orange-glow), 0 4px 16px rgba(0,0,0,0.4);
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--blue) 0%, #1249aa 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-primary:hover::before { opacity: 1; }
        .btn-primary:hover {
          box-shadow: 0 0 32px var(--blue-glow), 0 4px 16px rgba(0,0,0,0.4);
          transform: translateY(-2px);
        }
        .btn-primary span { position: relative; z-index: 1; }

        .btn-secondary {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-dim);
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.3s;
        }
        .btn-secondary:hover { color: var(--blue-bright); text-shadow: 0 0 12px var(--blue-glow); }
        .btn-secondary::after { content: '→'; transition: transform 0.3s; }
        .btn-secondary:hover::after { transform: translateX(5px); }

        /* ── RIGHT COLUMN ── */
        .hero-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-card-glow {
          position: absolute;
          inset: -30px;
          background: radial-gradient(ellipse at 50% 50%,
            rgba(26,95,212,0.2) 0%,
            rgba(240,120,32,0.1) 50%,
            transparent 70%);
          filter: blur(20px);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-card {
          position: relative;
          width: 100%;
          max-width: 420px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          backdrop-filter: blur(24px);
          clip-path: polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px));
          padding: 2.5rem;
          transform-style: preserve-3d;
          box-shadow:
            0 0 0 1px rgba(61,130,245,0.08),
            0 20px 60px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(61,130,245,0.15);
        }

        .hero-card::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 30%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--blue-bright), var(--orange), transparent);
          opacity: 0.5;
        }

        .card-corner-accent {
          position: absolute;
          top: 0; right: 0;
          width: 22px; height: 22px;
          background: var(--orange);
          clip-path: polygon(100% 0, 0 0, 100% 100%);
          box-shadow: 4px -4px 12px var(--orange-glow);
        }
        .card-corner-accent-bl {
          position: absolute;
          bottom: 0; left: 0;
          width: 22px; height: 22px;
          background: var(--blue-bright);
          clip-path: polygon(0 100%, 0 0, 100% 100%);
          opacity: 0.4;
          box-shadow: -4px 4px 12px var(--blue-glow);
        }

        .card-label {
          font-size: 0.58rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--blue-bright);
          opacity: 0.7;
          margin-bottom: 1rem;
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.6rem;
          color: var(--text);
          letter-spacing: 0.03em;
          margin-bottom: 1.5rem;
          line-height: 1.3;
        }

        .card-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, var(--blue-bright), var(--orange), transparent);
          margin-bottom: 1.5rem;
          opacity: 0.4;
        }

        .card-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
        }
        .stat-item { display: flex; flex-direction: column; gap: 4px; }
        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.1rem;
          font-weight: 300;
          line-height: 1;
        }
        .stat-item:nth-child(odd)  .stat-value { color: var(--blue-bright); text-shadow: 0 0 20px var(--blue-glow); }
        .stat-item:nth-child(even) .stat-value { color: var(--orange-bright); text-shadow: 0 0 20px var(--orange-glow); }
        .stat-label {
          font-size: 0.56rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-faint);
        }

        /* ── FLOATING BADGE ── */
        .hero-badge {
          position: absolute;
          top: -18px; left: -18px;
          background: rgba(6, 12, 30, 0.92);
          border: 1px solid var(--border-warm);
          padding: 11px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          backdrop-filter: blur(12px);
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          box-shadow: 0 4px 24px rgba(240,120,32,0.2), 0 0 0 1px rgba(240,120,32,0.08);
          z-index: 5;
        }
        .badge-dot {
          width: 8px; height: 8px;
          background: var(--orange-bright);
          border-radius: 50%;
          flex-shrink: 0;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 var(--orange-glow); }
          50%       { box-shadow: 0 0 0 6px transparent; }
        }
        .badge-text {
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text);
        }

        /* ── SCROLL INDICATOR ── */
        .hero-scroll {
          position: absolute;
          bottom: 2.5rem; left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }
        .scroll-text {
          font-size: 0.55rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--text);
        }
        .scroll-line {
          width: 1px; height: 44px;
          background: linear-gradient(to bottom, var(--blue-bright), var(--orange), transparent);
          animation: scroll-drop 2s ease-in-out infinite;
        }
        @keyframes scroll-drop {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          60%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }

        /* ── MINI PARTICLES ── */
        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: float-particle linear infinite;
        }
        @keyframes float-particle {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.6; }
          50%  { opacity: 1; }
          100% { transform: translateY(-80px) translateX(15px) scale(0.4); opacity: 0; }
        }

        /* ── SIDE LABEL ── */
        .hero-side-label {
          position: absolute;
          left: 1.2rem; top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          transform-origin: center;
          font-size: 0.52rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--text-faint);
          white-space: nowrap;
          display: none;
        }
        @media (min-width: 1280px) { .hero-side-label { display: block; } }
      `}</style>

      <section className="hero-root" ref={containerRef}>
        {/* ── BACKGROUND IMAGE + OVERLAY ── */}
        <div className="hero-bg-image" />
        <div className="hero-bg-overlay" />

        {/* ── BRAND COLOR MESH (on top of photo) ── */}
        <div className="hero-mesh" />

        {/* Glow orbs */}
        <div className="glow-orb glow-orb-blue" />
        <div className="glow-orb glow-orb-orange" />
        <div className="glow-orb glow-orb-blue2" />

        <div className="hero-diagonal" />
        <div className="hero-diagonal-2" />
        <div className="hero-scan" />

        {/* Mini particles */}
        {[
          { top:"22%", left:"14%", size:3, dur:"6s",  color:"#3d82f5", delay:"0s" },
          { top:"58%", left:"7%",  size:2, dur:"8s",  color:"#f07820", delay:"1.2s" },
          { top:"38%", right:"10%",size:4, dur:"7s",  color:"#3d82f5", delay:"2s" },
          { top:"72%", right:"18%",size:2, dur:"9s",  color:"#ff9340", delay:"0.5s" },
          { top:"15%", right:"35%",size:2, dur:"11s", color:"#3d82f5", delay:"3s" },
          { top:"80%", left:"30%", size:3, dur:"7.5s",color:"#f07820", delay:"1.8s" },
        ].map((p, i) => (
          <div key={i} className="particle" style={{
            top: p.top, left: (p as any).left, right: (p as any).right,
            width: p.size, height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animationDuration: p.dur,
            animationDelay: p.delay,
          }} />
        ))}

        <div className="hero-side-label">Websolsoffttech — Digital Excellence</div>

        <div className="hero-inner">
          {/* ── LEFT ── */}
          <div className="hero-left">

            <motion.div
              className="hero-eyebrow"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="eyebrow-line" />
              <span className="eyebrow-text">Digital Solutions Studio</span>
            </motion.div>

            <motion.h1
              className="hero-headline"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              We Engineer<br />
              <em>Digital</em> Solutions<br />
              <span className="outline-text">That Perform</span>
            </motion.h1>

            <motion.p
              className="hero-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              From concept to deployment — we craft high-performance websites, mobile apps, and software solutions tailored to your vision. Beyond development, we drive growth through strategic digital marketing, SEO, branding, advertising, and content—delivering complete digital solutions with precision and purpose.
            </motion.p>

            <motion.div
              className="hero-tags"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              {tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  className="hero-tag"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.07, duration: 0.5 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              className="hero-cta-row"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              <button className="btn-primary">
                <span>Start Your Project</span>
              </button>
              <button className="btn-secondary">View Our Work</button>
            </motion.div>
          </div>

          {/* ── RIGHT ── */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-card-glow" />

            <motion.div
              className="hero-badge"
              animate={{ y: [0, -7, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            >
              <div className="badge-dot" />
              <span className="badge-text">Available for Projects</span>
            </motion.div>

            <motion.div
              className="hero-card"
              style={{ rotateX, rotateY }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              <div className="card-corner-accent" />
              <div className="card-corner-accent-bl" />

              <div className="card-label">Studio Overview</div>
              <div className="card-title">
                Engineering the Future of Business,<br />Through Digital Solutions.
              </div>
              <div className="card-divider" />

              <div className="card-stats">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="stat-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                  >
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="hero-scroll">
          <span className="scroll-text">Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>
    </>
  );
};

export default HeroSection;
