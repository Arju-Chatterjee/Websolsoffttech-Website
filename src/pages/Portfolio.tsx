import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const categories = ["All", "Website", "Mobile App", "Marketing", "Branding", "Video"];

const projects = [
  {
    id: 1,
    title: "NeoCommerce",
    category: "Website",
    sub: "Full-stack e-commerce platform with real-time inventory and custom checkout flow.",
    tags: ["Next.js", "Tailwind", "Stripe"],
    accent: "blue" as const,
    year: "2025",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    result: "3× conversion rate",
  },
  {
    id: 2,
    title: "Zenith Fitness",
    category: "Mobile App",
    sub: "Cross-platform fitness tracking app with AI-powered workout recommendations.",
    tags: ["React Native", "Node.js", "AI"],
    accent: "amber" as const,
    year: "2025",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    result: "50k+ downloads",
  },
  {
    id: 3,
    title: "GreenLeaf Organics",
    category: "Marketing",
    sub: "End-to-end digital marketing campaign driving organic reach and paid conversions.",
    tags: ["SEO", "Meta Ads", "Google Ads"],
    accent: "blue" as const,
    year: "2025",
    img: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80",
    result: "280% ROAS",
  },
  {
    id: 4,
    title: "Luminary Studio",
    category: "Branding",
    sub: "Complete brand identity system — logo, palette, typography, and brand guidelines.",
    tags: ["Logo", "Brand Kit", "Print"],
    accent: "amber" as const,
    year: "2025",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    result: "Full rebrand",
  },
  {
    id: 5,
    title: "Apex Realty",
    category: "Website",
    sub: "Property listing platform with interactive maps, virtual tours, and lead capture.",
    tags: ["React", "Maps API", "CRM"],
    accent: "blue" as const,
    year: "2025",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    result: "40% more leads",
  },
  {
    id: 6,
    title: "PulseMedia",
    category: "Video",
    sub: "Brand story video series and social media reels for product launch campaign.",
    tags: ["Production", "Editing", "Reels"],
    accent: "amber" as const,
    year: "2025",
    img: "https://images.unsplash.com/photo-1536240478700-b869ad10e2b4?w=800&q=80",
    result: "2M+ views",
  },
  {
    id: 7,
    title: "SwiftDeliver",
    category: "Mobile App",
    sub: "Last-mile delivery management app with live driver tracking and route optimization.",
    tags: ["Flutter", "Firebase", "Maps"],
    accent: "blue" as const,
    year: "2025",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    result: "30% faster delivery",
  },
  {
    id: 8,
    title: "Solaris Solar",
    category: "Marketing",
    sub: "Lead generation funnel with landing pages, Google Ads, and CRM automation.",
    tags: ["Google Ads", "Landing Page", "CRM"],
    accent: "amber" as const,
    year: "2025",
    img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
    result: "5× lead volume",
  },
  {
    id: 9,
    title: "Arcana Jewelry",
    category: "Branding",
    sub: "Luxury brand identity with editorial photography direction and packaging design.",
    tags: ["Logo", "Packaging", "Photography"],
    accent: "blue" as const,
    year: "2025",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    result: "Luxury relaunch",
  },
];

const accentMap = {
  blue: {
    pill: { bg: "var(--blue-light)", color: "var(--blue)" },
    tagBorder: "rgba(26,95,212,0.20)",
    tagBg: "var(--blue-light)",
    tagColor: "var(--blue)",
    overlayColor: "rgba(14,40,90,0.55)",
    resultBg: "var(--blue-light)",
    resultColor: "var(--blue)",
  },
  amber: {
    pill: { bg: "var(--orange-light)", color: "var(--orange)" },
    tagBorder: "rgba(240,120,32,0.22)",
    tagBg: "var(--orange-light)",
    tagColor: "var(--orange)",
    overlayColor: "rgba(90,38,8,0.50)",
    resultBg: "var(--orange-light)",
    resultColor: "var(--orange)",
  },
};

export default function PortfolioSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const rootInView = useInView(rootRef, { once: true, margin: "-60px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');

        .port-section {
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

       

        /* dot grid */
        .port-dotgrid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(26,95,212,0.08) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.5;
        }

        /* ghost watermark */
        .port-watermark {
          position: absolute;
          bottom: -2%;
          right: -2%;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(6rem, 20vw, 18rem);
          color: rgba(26,95,212,0.03);
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
          line-height: 1;
          z-index: 0;
        }

        .port-inner {
          max-width: 1160px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Header ── */
        .port-pill {
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
        .port-pill::before, .port-pill::after {
          content: '';
          display: block;
          width: 24px; height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--orange));
          border-radius: 2px;
          flex-shrink: 0;
        }

        .port-headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2.4rem, 3.5vw, 4rem);
          color: var(--text);
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin: 0 0 14px 0;
        }
        .port-headline .hl-blue {
          font-style: italic;
          background: linear-gradient(100deg, var(--blue), var(--orange));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 10px var(--blue-glow));
        }
        .port-headline .hl-orange {
          font-style: italic;
          color: var(--orange);
        }

        .port-sub {
          font-size: 0.70rem;
          letter-spacing: 0.08em;
          color: var(--text-mid);
          line-height: 1.8;
          margin: 0 0 36px 0;
          max-width: 520px;
        }

        /* ── Filter bar ── */
        .port-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 48px;
          align-items: center;
        }

        .port-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          font-family: 'DM Mono', monospace;
          font-size: 0.57rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text-muted);
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .port-filter-btn:hover {
          background: var(--blue-light);
          color: var(--blue);
          border-color: rgba(26,95,212,0.25);
        }
        .port-filter-btn.active {
          background: linear-gradient(135deg, var(--blue), #1249aa);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 4px 14px var(--blue-glow);
        }

        /* count badge */
        .port-filter-count {
          font-size: 0.50rem;
          letter-spacing: 0.1em;
          opacity: 0.7;
        }

        /* divider */
        .port-divider {
          border: none; height: 1px;
          background: linear-gradient(90deg, var(--blue), transparent);
          opacity: 0.18;
          margin: 0 0 48px 0;
        }

        /* ── Grid ── */
        .port-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* ── Card ── */
        .port-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 0;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          box-shadow: 0 4px 24px var(--blue-glow), 0 1px 4px rgba(0,0,0,0.03);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        /* corner accents */
        .port-card::before, .port-card::after {
          content: '';
          position: absolute;
          width: 16px; height: 16px;
          z-index: 5; pointer-events: none;
        }
        .port-card::before {
          top: -1px; left: -1px;
          border-top: 2px solid var(--blue);
          border-left: 2px solid var(--blue);
        }
        .port-card::after {
          bottom: -1px; right: -1px;
          border-bottom: 2px solid var(--orange);
          border-right: 2px solid var(--orange);
        }
        .port-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 48px var(--blue-glow), 0 4px 12px rgba(0,0,0,0.06);
        }

        /* image area */
        .port-card-img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .port-card-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.6s ease;
          filter: saturate(0.85);
        }
        .port-card:hover .port-card-img { transform: scale(1.06); }

        .port-card-overlay {
          position: absolute; inset: 0; z-index: 2;
          transition: background 0.4s ease;
        }
        .port-card-scanlines {
          position: absolute; inset: 0; z-index: 3; pointer-events: none;
          background-image: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.016) 3px, rgba(255,255,255,0.016) 4px);
        }

        /* year badge top-left */
        .port-card-year {
          position: absolute;
          top: 12px; left: 12px; z-index: 4;
          font-size: 0.50rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.18);
          padding: 4px 10px;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
        }

        /* category pill top-right */
        .port-card-cat {
          position: absolute;
          top: 12px; right: 12px; z-index: 4;
          font-size: 0.50rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 4px 10px;
          clip-path: polygon(0% 0%, calc(100% - 4px) 0%, 100% 100%, 4px 100%);
        }

        /* result strip at bottom of image */
        .port-card-result-strip {
          position: absolute;
          bottom: 0; left: 0; right: 0; z-index: 4;
          padding: 22px 14px 12px;
          background: linear-gradient(0deg, rgba(10,22,48,0.80) 0%, transparent 100%);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .port-card-result-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
          flex-shrink: 0;
        }
        .port-card-result-text {
          font-size: 0.55rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.80);
        }

        /* body */
        .port-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        /* title — Cormorant Garamond */
        .port-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.30rem;
          letter-spacing: 0.04em;
          color: var(--text);
          line-height: 1.2;
          margin: 0;
        }

        /* desc — DM Mono small */
        .port-card-desc {
          font-size: 0.60rem;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          line-height: 1.75;
          margin: 0;
        }

        /* tech tags */
        .port-card-tags {
          display: flex; flex-wrap: wrap; gap: 6px;
          margin-top: 4px;
        }
        .port-card-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          font-size: 0.52rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: 1px solid;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
        }
        .port-card-tag::before {
          content: '';
          width: 4px; height: 4px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.5;
          flex-shrink: 0;
        }

        /* arrow row at card bottom */
        .port-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid var(--border);
          margin-top: auto;
        }
        .port-card-footer-label {
          font-size: 0.52rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-faint);
        }
        .port-card-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px; height: 28px;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
          background: var(--blue-light);
          color: var(--blue);
          transition: background 0.2s, color 0.2s;
          flex-shrink: 0;
        }
        .port-card:hover .port-card-arrow {
          background: var(--blue);
          color: #fff;
        }

        /* ── Empty state ── */
        .port-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 80px 20px;
          color: var(--text-faint);
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        /* ── CTA strip ── */
        .port-cta-strip {
          margin-top: 56px;
          background: linear-gradient(135deg, var(--blue-light) 0%, #fff 50%, var(--orange-light) 100%);
          border: 1px solid var(--border);
          padding: 32px 36px;
          clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
          box-shadow: 0 4px 24px var(--blue-glow);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }

        .port-cta-left {}
        .port-cta-label {
          font-size: 0.55rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--blue);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .port-cta-label::after {
          content: '';
          width: 28px; height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--orange));
          border-radius: 2px;
          opacity: 0.5;
        }
        .port-cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          color: var(--text);
          letter-spacing: -0.01em;
          line-height: 1.2;
          margin: 0;
        }
        .port-cta-title .hl-orange { font-style: italic; color: var(--orange); }

        .port-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 28px;
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
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
          flex-shrink: 0;
        }
        .port-cta-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--blue), #1249aa);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .port-cta-btn:hover::before { opacity: 1; }
        .port-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 22px var(--blue-glow);
        }
        .port-cta-btn span, .port-cta-btn svg { position: relative; z-index: 1; }

        /* responsive */
        @media (max-width: 960px) {
          .port-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .port-section { padding: 56px 20px 72px; }
          .port-grid { grid-template-columns: 1fr; }
          .port-cta-strip { padding: 24px 20px; }
        }
      `}</style>

      <section className="port-section">
        <div className="port-dotgrid" />
        <div className="port-watermark">Work</div>

        <div className="port-inner" ref={rootRef}>

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={rootInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="port-pill">Our Work</span>
          </motion.div>

          <motion.h2
            className="port-headline"
            initial={{ opacity: 0, y: 18 }}
            animate={rootInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            Projects that{" "}
            <span className="hl-blue">speak</span>{" "}
            for{" "}
            <span className="hl-orange">themselves</span>
          </motion.h2>

          <motion.p
            className="port-sub"
            initial={{ opacity: 0, y: 14 }}
            animate={rootInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.13, ease: [0.16, 1, 0.3, 1] }}
          >
            A curated selection of work spanning websites, apps, marketing campaigns, branding, and video — each built to deliver measurable results.
          </motion.p>

          {/* ── Filter bar ── */}
          <motion.div
            className="port-filters"
            initial={{ opacity: 0, y: 12 }}
            animate={rootInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {categories.map((cat) => {
              const count = cat === "All" ? projects.length : projects.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  className={`port-filter-btn${activeFilter === cat ? " active" : ""}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                  <span className="port-filter-count">{count}</span>
                </button>
              );
            })}
          </motion.div>

          <hr className="port-divider" />

          {/* ── Grid ── */}
          <motion.div
            className="port-grid"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <div className="port-empty">No projects in this category yet.</div>
              ) : (
                filtered.map((project, i) => {
                  const c = accentMap[project.accent];
                  return (
                    <motion.div
                      key={project.id}
                      className="port-card"
                      layout
                      initial={{ opacity: 0, y: 28, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      onMouseEnter={() => setHovered(project.id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {/* Image */}
                      <div className="port-card-img-wrap">
                        <img className="port-card-img" src={project.img} alt={project.title} />
                        <div
                          className="port-card-overlay"
                          style={{ background: hovered === project.id ? c.overlayColor.replace("0.55", "0.68") : c.overlayColor }}
                        />
                        <div className="port-card-scanlines" />

                        {/* year */}
                        <div className="port-card-year">{project.year}</div>

                        {/* category */}
                        <div
                          className="port-card-cat"
                          style={{ background: c.pill.bg, color: c.pill.color, border: `1px solid ${c.tagBorder}` }}
                        >
                          {project.category}
                        </div>

                        {/* result */}
                        <div className="port-card-result-strip">
                          <div className="port-card-result-dot" />
                          <span className="port-card-result-text">{project.result}</span>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="port-card-body">
                        <h3 className="port-card-title">{project.title}</h3>
                        <p className="port-card-desc">{project.sub}</p>

                        <div className="port-card-tags">
                          {project.tags.map(t => (
                            <span
                              key={t}
                              className="port-card-tag"
                              style={{ background: c.tagBg, color: c.tagColor, borderColor: c.tagBorder }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="port-card-footer">
                          <span className="port-card-footer-label">View project</span>
                          <div className="port-card-arrow">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M13 6l6 6-6 6"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── CTA strip ── */}
          <motion.div
            className="port-cta-strip"
            initial={{ opacity: 0, y: 24 }}
            animate={rootInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="port-cta-left">
              <div className="port-cta-label">Ready to collaborate?</div>
              <p className="port-cta-title">
                Let's build your next{" "}
                <span className="hl-orange">success story</span>
              </p>
            </div>
            <a href="#contact" className="port-cta-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              <span>Start a project</span>
            </a>
          </motion.div>

        </div>
      </section>
    </>
  );
}
