import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  "Dynamic Website Development",
  "E-commerce Website Development",
  "App Development",
  "Google Ads / Meta Ads",
  "Digital Marketing",
  "Google My Business Setup",
  "Social Media Marketing",
  "SEO",
  "Video Production",
  "Graphic Designing",
  "Social Media Management",
  "Content Writing",
  "Logo Designing",
  "Data Entry",
];

const stats = [
  { num: "2025", label: "Founded" },
  { num: "14+", label: "Services offered" },
  { num: "100%", label: "Client focus" },
  { num: "24hr", label: "Response time" },
];

export default function AboutSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const rootInView = useInView(rootRef, { once: true, margin: "-60px" });

  const imgRef = useRef<HTMLDivElement>(null);
  const imgInView = useInView(imgRef, { once: true, margin: "-80px" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');

        .about-section {
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
          --border-warm: rgba(240, 120, 32, 0.18);

          background: #ffffff;
          padding: 80px 40px 100px;
          font-family: 'DM Mono', monospace;
          position: relative;
          overflow: hidden;
        }

      

        /* subtle dot-grid background */
        .about-dotgrid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(circle, rgba(26,95,212,0.08) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.5;
        }

        /* large ghost text watermark */
        .about-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(6rem, 18vw, 16rem);
          color: rgba(26,95,212,0.04);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
          line-height: 1;
          z-index: 0;
        }

        .about-inner {
          max-width: 1160px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Header ── */
        .about-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.9rem;
          font-size: 0.60rem;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--blue);
          opacity: 0.9;
          margin-bottom: 20px;
        }
        .about-pill::before,
        .about-pill::after {
          content: '';
          display: block;
          width: 24px; height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--orange));
          border-radius: 2px;
          flex-shrink: 0;
        }

        .about-headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2.4rem, 3.5vw, 4rem);
          color: var(--text);
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin: 0 0 14px 0;
        }
        .about-headline .hl-blue {
          font-style: italic;
          background: linear-gradient(100deg, var(--blue), var(--orange));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 10px var(--blue-glow));
        }
        .about-headline .hl-orange {
          font-style: italic;
          color: var(--orange);
        }

        .about-sub {
          font-size: 0.70rem;
          letter-spacing: 0.08em;
          color: var(--text-mid);
          line-height: 1.8;
          margin: 0 0 52px 0;
          max-width: 560px;
        }

        /* ── Body grid ── */
        .about-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }

        /* ── LEFT column ── */
        .about-left { display: flex; flex-direction: column; gap: 28px; }

        /* Text card — same as cta-form-card */
        .about-text-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 0;
          padding: 32px;
          box-shadow: 0 4px 24px var(--blue-glow), 0 1px 4px rgba(0,0,0,0.03);
          position: relative;
          overflow: hidden;
        }
        .about-text-card::before,
        .about-text-card::after {
          content: '';
          position: absolute;
          width: 18px; height: 18px;
        }
        .about-text-card::before {
          top: -1px; left: -1px;
          border-top: 2px solid var(--blue);
          border-left: 2px solid var(--blue);
        }
        .about-text-card::after {
          bottom: -1px; right: -1px;
          border-bottom: 2px solid var(--orange);
          border-right: 2px solid var(--orange);
        }

        .about-card-label {
          font-size: 0.55rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--blue);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .about-card-label::after {
          content: '';
          flex: 1;
          height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--orange), transparent);
          border-radius: 2px;
          opacity: 0.3;
        }

        .about-card-text {
          font-size: 0.68rem;
          letter-spacing: 0.06em;
          color: var(--text-mid);
          line-height: 1.85;
          margin: 0;
        }
        .about-card-text + .about-card-text {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid var(--border);
        }

        /* ── Stats strip — clipped polygon badges ── */
        .about-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .about-stat {
          background: var(--blue-light);
          border: 1px solid var(--border);
          padding: 16px 12px;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          text-align: center;
        }
        .about-stat:nth-child(even) {
          background: var(--orange-light);
          border-color: var(--border-warm);
          clip-path: polygon(0% 0%, calc(100% - 8px) 0%, 100% 100%, 8px 100%);
        }

        .about-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.7rem;
          color: var(--text);
          line-height: 1;
          margin-bottom: 5px;
          letter-spacing: -0.02em;
        }
        .about-stat:nth-child(even) .about-stat-num { color: var(--orange-dark); }
        .about-stat-label {
          font-size: 0.52rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-faint);
          line-height: 1.3;
        }

        /* ── RIGHT column ── */
        .about-right { display: flex; flex-direction: column; gap: 28px; }

        /* Image panel */
        .about-img-panel {
          position: relative;
          height: 300px;
          overflow: hidden;
        }
        .about-img-panel::before,
        .about-img-panel::after {
          content: '';
          position: absolute;
          width: 22px; height: 22px;
          z-index: 4; pointer-events: none;
        }
        .about-img-panel::before {
          top: -1px; left: -1px;
          border-top: 2px solid var(--blue);
          border-left: 2px solid var(--blue);
        }
        .about-img-panel::after {
          bottom: -1px; right: -1px;
          border-bottom: 2px solid var(--orange);
          border-right: 2px solid var(--orange);
        }
        .about-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          filter: saturate(0.85);
          transition: transform 0.7s ease;
        }
        .about-img-panel:hover .about-img { transform: scale(1.04); }

        /* image overlay */
        .about-img-overlay {
          position: absolute; inset: 0; z-index: 2;
          background: linear-gradient(135deg, rgba(26,95,212,0.45) 0%, rgba(240,120,32,0.3) 100%);
          mix-blend-mode: multiply;
        }
        .about-img-scanlines {
          position: absolute; inset: 0; z-index: 3; pointer-events: none;
          background-image: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.018) 3px, rgba(255,255,255,0.018) 4px);
        }
        .about-img-border {
          position: absolute; inset: 0; z-index: 4; pointer-events: none;
          border: 1px solid var(--border);
          box-shadow: 0 8px 40px var(--blue-glow);
        }
        .about-img-strip {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 5;
          padding: 24px 20px 18px;
          background: linear-gradient(0deg, rgba(10,22,48,0.88) 0%, transparent 100%);
          display: flex; align-items: flex-end; justify-content: space-between;
        }
        .about-img-strip-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.25rem;
          color: #fff;
          letter-spacing: 0.04em;
        }
        .about-img-strip-loc {
          font-size: 0.52rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          text-align: right;
        }

        /* location badge */
        .about-loc-badge {
          position: absolute;
          top: 14px; right: 14px; z-index: 5;
          display: flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 6px 12px;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }
        .about-loc-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.25);
          animation: about-pulse 2.2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes about-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.25); }
          50%       { box-shadow: 0 0 0 6px rgba(34,197,94,0.06); }
        }
        .about-loc-text {
          font-size: 0.52rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.85);
        }

        /* Services card */
        .about-services-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 0;
          padding: 28px;
          box-shadow: 0 4px 24px var(--blue-glow);
          position: relative;
          overflow: hidden;
        }
        .about-services-card::before,
        .about-services-card::after {
          content: '';
          position: absolute;
          width: 18px; height: 18px;
        }
        .about-services-card::before {
          top: -1px; left: -1px;
          border-top: 2px solid var(--blue);
          border-left: 2px solid var(--blue);
        }
        .about-services-card::after {
          bottom: -1px; right: -1px;
          border-bottom: 2px solid var(--orange);
          border-right: 2px solid var(--orange);
        }

        .about-services-label {
          font-size: 0.55rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--orange);
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .about-services-label::after {
          content: '';
          flex: 1; height: 2px;
          background: linear-gradient(90deg, var(--orange), transparent);
          border-radius: 2px;
          opacity: 0.35;
        }

        .about-services-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .about-service-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          font-size: 0.55rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: 1px solid var(--border);
          clip-path: polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%);
          color: var(--text-mid);
          background: rgba(26,95,212,0.03);
          cursor: default;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .about-service-tag:hover {
          background: var(--blue-light);
          color: var(--blue);
          border-color: rgba(26,95,212,0.22);
        }
        .about-service-tag::before {
          content: '';
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--blue);
          opacity: 0.4;
          flex-shrink: 0;
          transition: opacity 0.2s;
        }
        .about-service-tag:hover::before { opacity: 1; }

        /* Mission strip */
        .about-mission {
          background: linear-gradient(135deg, var(--blue-light) 0%, #fff 50%, var(--orange-light) 100%);
          border: 1px solid var(--border);
          border-radius: 0;
          padding: 24px 28px;
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
          box-shadow: 0 4px 24px var(--blue-glow);
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .about-mission-icon {
          width: 40px; height: 40px;
          background: var(--blue-light);
          color: var(--blue);
          display: flex; align-items: center; justify-content: center;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
          flex-shrink: 0;
        }
        .about-mission-label {
          font-size: 0.55rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--blue);
          margin-bottom: 6px;
        }
        .about-mission-text {
          font-size: 0.65rem;
          letter-spacing: 0.06em;
          color: var(--text-mid);
          line-height: 1.75;
          margin: 0;
        }

        /* divider */
        .about-divider {
          border: none; height: 1px;
          background: linear-gradient(90deg, var(--blue), transparent);
          opacity: 0.20;
          margin: 0 0 28px 0;
        }

        /* responsive */
        @media (max-width: 900px) {
          .about-body { grid-template-columns: 1fr; gap: 32px; }
          .about-stats { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .about-section { padding: 56px 20px 72px; }
          .about-stats { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <section className="about-section">
        {/* dot grid */}
        <div className="about-dotgrid" />
        {/* ghost watermark */}
        <div className="about-watermark">WebSOL</div>

        <div className="about-inner" ref={rootRef}>

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={rootInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="about-pill">About Us</span>
          </motion.div>

          <motion.h2
            className="about-headline"
            initial={{ opacity: 0, y: 18 }}
            animate={rootInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            Empowering businesses with{" "}
            <span className="hl-blue">smart</span>{" "}
            digital{" "}
            <span className="hl-orange">solutions</span>
          </motion.h2>

          <motion.p
            className="about-sub"
            initial={{ opacity: 0, y: 14 }}
            animate={rootInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.13, ease: [0.16, 1, 0.3, 1] }}
          >
            A fast-growing digital agency born in 2025 — headquartered in Udaipur, Tripura, India. We turn bold ideas into measurable digital growth.
          </motion.p>

          <hr className="about-divider" />

          {/* ── Stats ── */}
          <motion.div
            className="about-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={rootInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: "48px" }}
          >
            {stats.map((s, i) => (
              <div className="about-stat" key={i}>
                <div className="about-stat-num">{s.num}</div>
                <div className="about-stat-label">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* ── Body ── */}
          <motion.div
            className="about-body"
            initial={{ opacity: 0, y: 24 }}
            animate={rootInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* LEFT */}
            <div className="about-left">

              {/* Who we are card */}
              <div className="about-text-card">
                <p className="about-card-label">Who we are</p>
                <p className="about-card-text">
                  WebSOL Soffttech is a fast-growing startup established in 2025, headquartered in Udaipur, Tripura, India. As a forward-thinking digital marketing and web solutions company, we specialize in delivering impactful online strategies tailored to modern business needs.
                </p>
                <p className="about-card-text">
                  We work with businesses of all scales — from emerging startups to established enterprises across diverse industries. Our smart, scalable solutions are designed to empower small and medium businesses, helping them strengthen their digital presence, improve visibility, and drive consistent growth in sales.
                </p>
              </div>

              {/* What we do card */}
              <div className="about-text-card">
                <p className="about-card-label">Our objective</p>
                <p className="about-card-text">
                  From concept to execution, our customized strategies focus on one clear objective — enhancing our clients' online identity and connecting them effectively with their target audience. Every solution we build is scalable, results-driven, and uniquely tailored to your business goals.
                </p>
              </div>

              {/* Mission strip */}
              <div className="about-mission">
                <div className="about-mission-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="about-mission-label">Our mission</div>
                  <p className="about-mission-text">
                    To be the most trusted digital growth partner for small and medium businesses — delivering measurable results through innovation, transparency, and relentless execution.
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT */}
            <div className="about-right">

              {/* Image panel */}
              <div className="about-img-panel" ref={imgRef}>
                <motion.img
                  className="about-img"
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80"
                  alt="WebSOL Soffttech team"
                  initial={{ scale: 1.08, opacity: 0 }}
                  animate={imgInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="about-img-overlay" />
                <div className="about-img-scanlines" />
                <div className="about-img-border" />

                {/* location badge */}
                <div className="about-loc-badge">
                  <div className="about-loc-dot" />
                  <span className="about-loc-text">Udaipur, Tripura · India</span>
                </div>

                <div className="about-img-strip">
                  <div>
                    <div className="about-img-strip-title">WebSOL Soffttech</div>
                    <div style={{ fontSize: "0.52rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginTop: 3 }}>Est. 2025</div>
                  </div>
                  <div className="about-img-strip-loc">
                    Digital Agency<br/>Tripura · India
                  </div>
                </div>
              </div>

              {/* Services card */}
              <div className="about-services-card">
                <p className="about-services-label">Services we offer</p>
                <div className="about-services-grid">
                  {services.map((svc, i) => (
                    <motion.span
                      key={i}
                      className="about-service-tag"
                      initial={{ opacity: 0, y: 8 }}
                      animate={rootInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.35, delay: 0.3 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {svc}
                    </motion.span>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
