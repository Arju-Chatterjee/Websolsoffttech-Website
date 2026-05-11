import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaSearch, FaProjectDiagram, FaCode, FaRocket } from "react-icons/fa";

/* 🔹 Detect mobile */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

/* KEEP CARD ICONS */
const steps = [
  {
    step: "01",
    title: "Discovery",
    desc: "We understand your business goals.",
    icon: <FaSearch />,
  },
  {
    step: "02",
    title: "Planning",
    desc: "We define strategy and roadmap.",
    icon: <FaProjectDiagram />,
  },
  {
    step: "03",
    title: "Development",
    desc: "We build scalable solutions.",
    icon: <FaCode />,
  },
  {
    step: "04",
    title: "Launch",
    desc: "We deploy and optimize.",
    icon: <FaRocket />,
  },
];

export default function OurProcess() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  const isMobile = useIsMobile();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');

        .process-section {
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

          padding: 100px 40px 120px;
          background: #fff;
          font-family: 'DM Mono', monospace;
          position: relative;
        }

        // /* Top gradient line — same as CTA */
        // .process-section::before {
        //   content: '';
        //   position: absolute;
        //   top: 0; left: 0; right: 0;
        //   height: 3px;
        //   background: linear-gradient(90deg, var(--blue), var(--orange));
        // }

        .process-inner {
          max-width: 1160px;
          margin: auto;
        }

        /* ── Eyebrow pill — exact CTA .cta-pill ── */
        .process-pill {
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
        .process-pill::before,
        .process-pill::after {
          content: '';
          display: block;
          width: 24px; height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--orange));
          border-radius: 2px;
          flex-shrink: 0;
        }

        /* ── Headline — Cormorant Garamond, same as .cta-headline ── */
        .process-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(2.4rem, 3.5vw, 4rem);
  color: var(--text);
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin: 0 0 14px 0;
  text-align: left;
}

        /* gradient italic — same as .hl-blue */
        .process-title .hl-blue {
          font-style: italic;
          background: linear-gradient(100deg, var(--blue), var(--orange));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 10px var(--blue-glow));
        }

        /* plain orange italic — same as .hl-orange */
        .process-title .hl-orange {
          font-style: italic;
          color: var(--orange);
        }

        /* ── Sub — same as .cta-sub ── */
 .process-sub {
  font-size: 0.70rem;
  letter-spacing: 0.08em;
  color: var(--text-mid);
  line-height: 1.8;
  margin: 0 0 100px 0;
  max-width: 520px;
  text-align: left;
}

        /* ─────────── GRID (unchanged structure) ─────────── */
        .process-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
  justify-items: start;
}

.process-card {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 3;
  transition: 0.3s;
  box-shadow: 0 4px 24px var(--blue-glow), 0 1px 4px rgba(0,0,0,0.03);

  margin-left: 0;
}

        /* LINE (DESKTOP) */
        .process-line {
          position: absolute;
          top: 110px;
          left: 10%;
          width: 80%;
          height: 3px;
          background: #E5E7EB;
        }

        .process-line-fill {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, var(--blue), var(--orange));
        }

        @keyframes fillLine {
          to { width: 100%; }
        }

        /* VEHICLE */
        .process-car {
          position: absolute;
          top: 90px;
          left: 10%;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes moveCar {
          from { left: 10%; }
          to { left: 90%; }
        }

        .process-grid.active .process-line-fill {
          animation: fillLine 10s ease forwards;
        }

        .process-grid.active .process-car {
          animation: moveCar 10s ease forwards;
        }

        /* ── Cards — structure unchanged, text upgraded ── */
        .process-card {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          z-index: 3;
          transition: 0.3s;
          box-shadow: 0 4px 24px var(--blue-glow), 0 1px 4px rgba(0,0,0,0.03);
        }

        .process-card:hover {
          transform: translateY(-6px) scale(1.05);
          box-shadow: 0 20px 40px var(--blue-glow);
        }

        /* Icon — blue-light bg box like .cta-info-icon */
        .process-icon {
          font-size: 18px;
          margin-bottom: 10px;
          color: var(--blue);
          width: 36px; height: 36px;
          background: var(--blue-light);
          display: flex;
          align-items: center;
          justify-content: center;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
          flex-shrink: 0;
        }

        /* Step number — same as .cta-info-label */
        .process-step {
          font-size: 0.55rem;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--blue);
          margin-bottom: 4px;
        }

        /* Card title — Cormorant Garamond like .cta-form-title */
        .process-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.15rem;
          letter-spacing: 0.04em;
          color: var(--text);
          margin-bottom: 4px;
        }

        /* Card desc — same as .cta-form-subtitle */
        .process-card-desc {
          font-size: 0.58rem;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          line-height: 1.6;
          padding: 0 10px;
        }

        /* ================= MOBILE ================= */
        @media(max-width:900px){

          .process-section {
            padding: 80px 20px;
          }

          .process-title {
            font-size: clamp(2rem, 7vw, 2.8rem);
            margin-bottom: 12px;
          }

          .process-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          /* vertical line */
          .process-line {
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 3px;
            height: 100%;
          }

          .process-line-fill {
            width: 100%;
            height: 0%;
          }

          @keyframes fillLineMobile {
            to { height: 100%; }
          }

          /* vehicle position */
          .process-car {
            top: 0;
            left: 50%;
            transform: translateX(-50%);
          }

          @keyframes moveCarMobile {
            from { transform: translateX(-50%) translateY(0); }
            to { transform: translateX(-50%) translateY(80vh); }
          }

          .process-grid.active .process-line-fill {
            animation: fillLineMobile 6s ease forwards;
          }

          .process-grid.active .process-car {
            animation: moveCarMobile 6s ease forwards;
          }

          .process-card {
            margin-left: auto;
            margin-right: auto;
            width: 180px;
            height: 180px;
          }
        }
      `}</style>

      <section className="process-section" ref={ref}>
        <div className="process-inner">
          {/* ── Eyebrow pill ── */}
          <div>
            <span className="process-pill">Our Process</span>
          </div>

          {/* ── Headline ── */}
          <h2 className="process-title">
            How we deliver <span className="hl-blue">your</span>{" "}
            <span className="hl-orange">project</span>
          </h2>

          {/* ── Subtitle ── */}
          <p className="process-sub">
            A proven four-step approach — from understanding your vision to a
            polished, optimized launch.
          </p>

          {/* ── Grid (all animation logic unchanged) ── */}
          <div className={`process-grid ${inView ? "active" : ""}`}>
            {/* LINE */}
            <div className="process-line">
              <div className="process-line-fill"></div>
            </div>

            {/* IMAGE VEHICLE */}
            <div className="process-car">
              <img
                src={isMobile ? "/Mobile.png" : "/Computer.png"}
                alt="vehicle"
                style={{
                  width: isMobile ? "60px" : "70px",
                  objectFit: "contain",
                }}
              />
            </div>

            {steps.map((item, i) => (
              <motion.div
                key={i}
                className="process-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.25 }}
              >
                <div className="process-icon">{item.icon}</div>
                <div className="process-step">{item.step}</div>
                <div className="process-card-title">{item.title}</div>
                <div className="process-card-desc">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
