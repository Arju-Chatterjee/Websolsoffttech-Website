import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const stats = [
  { value: "10+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "3+", label: "Years Experience" },
  { value: "10+", label: "Expert Team" },
];

const tags = [
  "Web Development",
  "Mobile Apps",
  "Software Development",
  "Digital Marketing",
  "SEO",
  "Branding",
  "Advertising",
  "Content Delivering",
];

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
          --blue:         #1a5fd4;
          --blue-bright:  #1a5fd4;
          --blue-glow:    rgba(26, 95, 212, 0.20);
          --orange:       #f07820;
          --orange-bright:#f07820;
          --orange-glow:  rgba(240, 120, 32, 0.20);
          --bg:           #ffffff;
          --bg-card:      rgba(232, 240, 252, 0.80);
          --text:         #0f2545;
          --text-dim:     #3d5a8a;
          --text-faint:   rgba(26, 95, 212, 0.30);
          --border:       rgba(26, 95, 212, 0.12);
          --border-warm:  rgba(240, 120, 32, 0.18);
        }

        .hero-root {
          font-family: 'DM Mono', monospace;
          background: var(--bg);
          min-height: 100vh;
          padding-top: 72px;
          padding-bottom: 4rem;
          position: relative;
          overflow: hidden;
          width: 100%;
          max-width: 100%;
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

        /* Light white overlay instead of dark */
        .hero-bg-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to bottom, rgba(255,255,255,0.93) 0%, rgba(255,255,255,0.83) 50%, rgba(255,255,255,0.97) 100%),
            linear-gradient(to right,  rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.25) 60%);
          pointer-events: none;
        }

        /* ── MESH ── */
        .hero-mesh {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 70% 60% at 15% 20%, rgba(26,95,212,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 85% 75%, rgba(240,120,32,0.05) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 60% 10%, rgba(26,95,212,0.04) 0%, transparent 50%);
        }

        /* ── GLOW ORBS ── */
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
          opacity: 0.15;
        }
        .glow-orb-blue {
          width: min(600px, 80vw);
          height: min(600px, 80vw);
          top: -8%;
          left: -10%;
          background: radial-gradient(circle, var(--blue) 0%, transparent 70%);
          animation: orb-drift 12s ease-in-out infinite alternate;
        }
        .glow-orb-orange {
          width: min(480px, 70vw);
          height: min(480px, 70vw);
          bottom: -8%;
          right: -8%;
          background: radial-gradient(circle, var(--orange) 0%, transparent 70%);
          animation: orb-drift 10s ease-in-out infinite alternate-reverse;
        }
        .glow-orb-blue2 {
          width: min(300px, 50vw);
          height: min(300px, 50vw);
          top: 55%;
          right: 25%;
          background: radial-gradient(circle, var(--blue-bright) 0%, transparent 70%);
          opacity: 0.07;
          filter: blur(60px);
          animation: orb-drift 15s ease-in-out infinite alternate;
        }
        @keyframes orb-drift {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, 20px) scale(1.08); }
        }

        /* ── DIAGONAL ACCENTS ── */
        .hero-diagonal {
          position: absolute;
          top: 0; right: 28%;
          width: 1px; height: 120%;
          background: linear-gradient(to bottom,
            transparent 0%,
            var(--blue-bright) 35%,
            var(--orange) 65%,
            transparent 100%);
          opacity: 0.10;
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
            rgba(240,120,32,0.08) 40%,
            transparent 100%);
          transform: rotate(14deg);
          transform-origin: top center;
          pointer-events: none;
        }

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
          opacity: 0.06;
          pointer-events: none;
        }

        /* ── LAYOUT ── */
        .hero-inner {
          position: relative;
          z-index: 10;
          max-width: 1280px;
          margin: 0 auto;
          padding: clamp(3rem, 8vw, 7rem) clamp(1rem, 4vw, 2.5rem) clamp(2rem, 5vw, 5rem);
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          overflow: hidden;
          min-width: 0;
        }
        @media (min-width: 1024px) {
          .hero-inner {
            grid-template-columns: 1.15fr 0.85fr;
            gap: 5rem;
          }
        }

        /* ── LEFT COLUMN ── */
        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          min-width: 0;
          overflow: hidden;
        }

        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .eyebrow-line {
          width: 40px; height: 2px;
          background: linear-gradient(90deg, var(--blue-bright), var(--orange));
          border-radius: 2px;
          box-shadow: 0 0 8px var(--blue-glow);
          flex-shrink: 0;
        }
        .eyebrow-text {
          font-size: 0.62rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--blue-bright);
          opacity: 0.9;
          white-space: nowrap;
        }

        .hero-headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          font-size: clamp(2.4rem, 7vw, 5.8rem);
          line-height: 1.05;
          letter-spacing: -0.01em;
          color: var(--text);
          word-break: break-word;
        }
        .hero-headline em {
          font-style: italic;
          background: linear-gradient(100deg, var(--blue-bright), var(--orange-bright));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 10px var(--blue-glow));
        }
        .hero-headline .outline-text {
          -webkit-text-stroke: 1px #f07820;
          color: transparent;
        }

        .hero-body {
          font-size: 0.75rem;
          line-height: 1.9;
          letter-spacing: 0.05em;
          color: #3d5a8a;
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
          background: rgba(26, 95, 212, 0.05);
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          transition: all 0.3s ease;
          cursor: default;
        }
        .hero-tag:hover {
          background: rgba(240, 120, 32, 0.07);
          border-color: var(--border-warm);
          color: var(--orange);
          box-shadow: 0 0 10px var(--orange-glow);
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
          background: linear-gradient(135deg, var(--orange) 0%, #c75f0f 100%);
          border: none;
          cursor: pointer;
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          box-shadow: 0 4px 18px var(--orange-glow), 0 2px 8px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          overflow: hidden;
          text-decoration: none;
          display: inline-block;
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
          box-shadow: 0 4px 22px var(--blue-glow), 0 2px 8px rgba(0,0,0,0.10);
          transform: translateY(-2px);
          text-decoration: none;
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
          color: #7a90b5;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.3s;
          text-decoration: none;
        }
        .btn-secondary:hover { color: var(--blue-bright); text-shadow: 0 0 8px var(--blue-glow); text-decoration: none; }
        .btn-secondary::after { content: '→'; transition: transform 0.3s; }
        .btn-secondary:hover::after { transform: translateX(5px); }

        /* ── RIGHT COLUMN ── */
        .hero-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
        }

        .hero-card-glow {
          position: absolute;
          inset: -30px;
          background: radial-gradient(ellipse at 50% 50%,
            rgba(26,95,212,0.08) 0%,
            rgba(240,120,32,0.05) 50%,
            transparent 70%);
          filter: blur(20px);
          border-radius: 50%;
          pointer-events: none;
        }

        /* ── CTA GLASS CARD — light frosted ── */
        .cta-glass {
          width: 100%;
          max-width: 380px;
          padding: clamp(1.5rem, 4vw, 2.5rem);
          background: rgba(232, 240, 252, 0.72);
          border: 1px solid rgba(26, 95, 212, 0.14);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          box-shadow:
            0 20px 60px rgba(26, 95, 212, 0.07),
            0 4px 20px rgba(0,0,0,0.05);
          text-align: center;
        }

        .cta-title {
          font-size: clamp(1.2rem, 3vw, 1.6rem);
          font-family: 'Cormorant Garamond', serif;
          color: #0f2545;
          margin-bottom: 1rem;
          word-break: break-word;
        }

        .cta-sub {
          font-size: 0.7rem;
          letter-spacing: 0.05em;
          color: #7a90b5;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .cta-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }

        /* ── SCROLL INDICATOR ── */
        .hero-scroll {
          position: relative;
          z-index: 10;
          margin-top: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .scroll-text {
          font-size: 0.55rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #7a90b5;
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

        /* Shine layer */
.btn-primary::after {
  content: "";
  position: absolute;
  top: 0;
  left: -120%; /* start outside */

  width: 60%;
  height: 100%;

  background: linear-gradient(
    120deg,
    transparent,
    rgba(255,255,255,0.45),
    transparent
  );

  transform: skewX(-20deg);
  transition: left 0.7s ease;
}

/* On hover → sweep across */
.btn-primary:hover::after {
  left: 120%;
}

        /* ── PARTICLES ── */
        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: float-particle linear infinite;
        }
        @keyframes float-particle {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.45; }
          50%  { opacity: 0.7; }
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
          color: rgba(26, 95, 212, 0.22);
          white-space: nowrap;
          display: none;
          z-index: 10;
        }
        @media (min-width: 1280px) { .hero-side-label { display: block; } }

        /* ── MOBILE TWEAKS ── */
        @media (max-width: 480px) {
          .hero-tags { gap: 0.4rem; }
          .hero-tag  { font-size: 0.54rem; padding: 4px 10px; }
          .eyebrow-text { font-size: 0.56rem; letter-spacing: 0.16em; }
          .hero-scroll { margin-top: 2rem; }
        }
      `}</style>

      <section className="hero-root" ref={containerRef}>
        <div className="hero-bg-image" />
        <div className="hero-bg-overlay" />
        <div className="hero-mesh" />

        <div className="glow-orb glow-orb-blue" />
        <div className="glow-orb glow-orb-orange" />
        <div className="glow-orb glow-orb-blue2" />

        <div className="hero-diagonal" />
        <div className="hero-diagonal-2" />
        <div className="hero-scan" />

        {/* Particles */}
        {[
          { top: "22%", left: "14%",  size: 3, dur: "6s",  color: "#1a5fd4", delay: "0s"   },
          { top: "58%", left: "7%",   size: 2, dur: "8s",  color: "#f07820", delay: "1.2s" },
          { top: "38%", right: "10%", size: 4, dur: "7s",  color: "#1a5fd4", delay: "2s"   },
          { top: "72%", right: "18%", size: 2, dur: "9s",  color: "#f07820", delay: "0.5s" },
          { top: "15%", right: "35%", size: 2, dur: "11s", color: "#1a5fd4", delay: "3s"   },
          { top: "80%", left: "30%",  size: 3, dur: "7.5s",color: "#f07820", delay: "1.8s" },
        ].map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              top: p.top,
              left: (p as any).left,
              right: (p as any).right,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              animationDuration: p.dur,
              animationDelay: p.delay,
            }}
          />
        ))}

        <div className="hero-side-label">Websolsoffttech — Digital Excellence</div>

        <div className="hero-inner">
          {/* LEFT */}
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
              We Engineer
              <br />
              <em>Digital</em> Solutions
              <br />
              <span className="outline-text">That Perform</span>
            </motion.h1>

            <motion.p
              className="hero-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              From concept to deployment — we craft high-performance websites,
              mobile apps, and software solutions tailored to your vision.
              Beyond development, we drive growth through strategic digital
              marketing, SEO, branding, advertising, and content—delivering
              complete digital solutions with precision and purpose.
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
            />
          </div>

          {/* RIGHT */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-card-glow" />
            <div className="cta-glass">
              <h3 className="cta-title">Let's Build Something Powerful</h3>
              <p className="cta-sub">
                Start your digital journey with a team that delivers results.
              </p>
              <div className="cta-actions">
                <Link to="/contact-cta" className="btn-primary">
                  <span>Start Project</span>
                </Link>
                <Link to="/services" className="btn-secondary">
                  View Services
                </Link>
              </div>
            </div>
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
