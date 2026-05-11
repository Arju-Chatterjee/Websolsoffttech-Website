import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/9233770627";

const reasons = [
  {
    num: "01",
    title: "End-to-end ownership",
    body: "From strategy and design to development and launch — we own every phase. No handoffs, no gaps, no excuses.",
    tag: "Full delivery",
    accent: "blue" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Performance first",
    body: "Every decision — from architecture to animation — is made with speed, scalability, and real-world load in mind.",
    tag: "Optimized builds",
    accent: "amber" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Strategy-led thinking",
    body: "We don't just execute briefs. We challenge assumptions, identify opportunities, and build products that solve real problems.",
    tag: "Beyond the brief",
    accent: "blue" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Transparent process",
    body: "Weekly updates, open communication, and no black boxes. You always know where your project stands and why.",
    tag: "Always in the loop",
    accent: "amber" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h10M4 18h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Built to scale",
    body: "Our solutions are architected to grow with you — whether you're onboarding 100 or 100,000 users.",
    tag: "Growth-ready",
    accent: "blue" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 17l5-6 4 4 5-7 5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Long-term partnership",
    body: "Launch is just the beginning. We stay involved — monitoring, optimizing, and evolving your product over time.",
    tag: "Post-launch support",
    accent: "amber" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 4C7.6 4 4 7.6 4 12s3.6 8 8 8 8-3.6 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const colorMap = {
  blue: {
    iconBg: "var(--blue-light)",
    iconColor: "var(--blue)",
    dotColor: "var(--blue)",
    hoverBorder: "rgba(26,95,212,0.30)",
    hoverShadow: "0 4px 24px var(--blue-glow)",
  },
  amber: {
    iconBg: "var(--orange-light)",
    iconColor: "var(--orange)",
    dotColor: "var(--orange)",
    hoverBorder: "rgba(240,120,32,0.30)",
    hoverShadow: "0 4px 24px var(--orange-glow)",
  },
};

const CardItem = ({
  reason,
  index,
}: {
  reason: (typeof reasons)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const c = colorMap[reason.accent];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{ height: "100%" }}
    >
      <div
        className="wcu-card"
        style={{ "--hover-border": c.hoverBorder, "--hover-shadow": c.hoverShadow } as React.CSSProperties}
      >
        {/* Top row: number + icon */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "18px" }}>
          {/* Step number — .cta-info-label style */}
          <span className="wcu-card-num">{reason.num}</span>
          {/* Icon box — .cta-info-icon style */}
          <div
            className="wcu-card-icon"
            style={{ background: c.iconBg, color: c.iconColor }}
          >
            {reason.icon}
          </div>
        </div>

        {/* Title — Cormorant Garamond like .cta-form-title */}
        <p className="wcu-card-title">{reason.title}</p>

        {/* Body — DM Mono small like .cta-form-subtitle */}
        <p className="wcu-card-body">{reason.body}</p>

        {/* Footer tag */}
        <div className="wcu-card-footer">
          <span className="wcu-card-dot" style={{ background: c.dotColor }} />
          <span className="wcu-card-tag">{reason.tag}</span>
        </div>
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

        .wcu-section {
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
        }

      /* Shine effect */
.wcu-btn::after {
  content: "";
  position: absolute;
  top: 0;
  left: -120%;
  width: 60%;
  height: 100%;

  background: linear-gradient(
    120deg,
    transparent,
    rgba(255,255,255,0.45),
    transparent
  );

  transform: skewX(-20deg);
  transition: left 0.8s ease;
  z-index: 1;
}

/* Shine animation on hover */
.wcu-btn:hover::after {
  left: 120%;
}

        .wcu-inner {
          max-width: 1160px;
          margin: 0 auto;
        }

        .wcu-header {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
          margin-bottom: 52px;
        }

        /* ── Eyebrow pill — exact .cta-pill ── */
        .wcu-pill {
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
        .wcu-pill::before,
        .wcu-pill::after {
          content: '';
          display: block;
          width: 24px; height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--orange));
          border-radius: 2px;
          flex-shrink: 0;
        }

        /* ── Headline — Cormorant Garamond like .cta-headline ── */
        .wcu-headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2.4rem, 3.5vw, 4rem);
          color: var(--text);
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin: 0 0 14px 0;
        }
        .wcu-headline .hl-blue {
          font-style: italic;
          background: linear-gradient(100deg, var(--blue), var(--orange));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 10px var(--blue-glow));
        }
        .wcu-headline .hl-orange {
          font-style: italic;
          color: var(--orange);
        }

        /* ── Sub — same as .cta-sub ── */
        .wcu-sub {
          font-size: 0.70rem;
          letter-spacing: 0.08em;
          color: var(--text-mid);
          line-height: 1.8;
          margin: 0 0 28px 0;
          max-width: 480px;
        }

        /* ── CTA button — exact .cta-submit style ── */
        .wcu-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 28px;
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 400;
          color: #fff;
          background: linear-gradient(135deg, var(--orange), var(--orange-dark));
          border: none;
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 18px var(--orange-glow);
          position: relative;
          overflow: hidden;
        }
        .wcu-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--blue), #1249aa);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .wcu-btn:hover::before { opacity: 1; }
        .wcu-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 22px var(--blue-glow);
        }
        .wcu-btn:active { transform: translateY(0); }
        .wcu-btn svg, .wcu-btn span { position: relative; z-index: 1; }

        /* ── Divider — same as .cta-divider ── */
        .wcu-divider {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, var(--blue), transparent);
          opacity: 0.20;
          margin: 0 0 40px 0;
        }

        /* ── Grid ── */
        .wcu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        /* ── Card — border/shape from original, text tokens from CTA ── */
        .wcu-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 0;
          padding: 24px;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-sizing: border-box;
          box-shadow: 0 4px 24px var(--blue-glow), 0 1px 4px rgba(0,0,0,0.03);
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }
        /* Corner accents — same as .cta-form-card */
        .wcu-card::before,
        .wcu-card::after {
          content: '';
          position: absolute;
          width: 14px; height: 14px;
        }
        .wcu-card::before {
          top: -1px; left: -1px;
          border-top: 2px solid var(--blue);
          border-left: 2px solid var(--blue);
        }
        .wcu-card::after {
          bottom: -1px; right: -1px;
          border-bottom: 2px solid var(--orange);
          border-right: 2px solid var(--orange);
        }
        .wcu-card:hover {
          border-color: var(--hover-border);
          box-shadow: var(--hover-shadow);
          transform: translateY(-3px);
        }

        /* Step number — .cta-info-label style */
        .wcu-card-num {
          font-size: 0.55rem;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--text-faint);
        }

        /* Icon box — .cta-info-icon clipped parallelogram */
        .wcu-card-icon {
          width: 38px; height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
        }

        /* Card title — Cormorant Garamond like .cta-form-title */
        .wcu-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.35rem;
          letter-spacing: 0.04em;
          color: var(--text);
          line-height: 1.25;
          margin: 0 0 10px 0;
        }

        /* Card body — .cta-form-subtitle style */
        .wcu-card-body {
          font-size: 0.62rem;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          line-height: 1.75;
          margin: 0;
          flex: 1;
        }

        /* Footer tag */
        .wcu-card-footer {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 20px;
          padding-top: 14px;
          border-top: 1px solid var(--border);
        }
        .wcu-card-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
          display: block;
        }
        /* Tag text — .cta-avail-text style */
        .wcu-card-tag {
          font-size: 0.55rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-faint);
        }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .wcu-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .wcu-btn {
            width: 100%;
            justify-content: center;
            clip-path: none;
          }
        }
        @media (max-width: 520px) {
          .wcu-grid { grid-template-columns: 1fr; }
          .wcu-section { padding: 56px 20px 72px; }
        }
      `}</style>

      <section className="wcu-section">
        <div className="wcu-inner">
          {/* ── Header ── */}
          <div className="wcu-header" ref={headRef}>
            <div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={headInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="wcu-pill">Why choose us</span>
              </motion.div>

              <motion.h2
                className="wcu-headline"
                initial={{ opacity: 0, y: 18 }}
                animate={headInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                The difference is in how we{" "}
                <span className="hl-blue">think</span>
                {" & "}
                <span className="hl-orange">build</span>
              </motion.h2>

              <motion.p
                className="wcu-sub"
                initial={{ opacity: 0, y: 14 }}
                animate={headInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.13, ease: [0.16, 1, 0.3, 1] }}
              >
                We don't just deliver projects — we build partnerships grounded in transparency, technical excellence, and a genuine investment in your success.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={headInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="wcu-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ position: "relative", zIndex: 1 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Start your project with us</span>
                </a>
              </motion.div>
            </div>
          </div>

          <hr className="wcu-divider" />

          {/* ── Cards ── */}
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
