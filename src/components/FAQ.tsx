import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqCategories = ["All", "Services", "Pricing", "Process", "Support"];

const faqs = [
  {
    id: 1,
    category: "Services",
    q: "What services does WebSOL Soffttech offer?",
    a: "We offer a comprehensive range of digital services including Dynamic & E-commerce Website Development, App Development, Google Ads / Meta Ads, Digital Marketing, Google My Business Setup, Social Media Marketing, SEO, Video Production, Graphic Designing, Social Media Management, Content Writing, Logo Designing, and Data Entry.",
  },
  {
    id: 2,
    category: "Services",
    q: "Do you work with small businesses and startups?",
    a: "Absolutely. We specialize in empowering small and medium businesses. Our solutions are designed to be scalable and cost-effective, so whether you're a brand-new startup or a growing SME, we have a package and approach that fits your stage and budget.",
  },
  {
    id: 3,
    category: "Services",
    q: "Can you handle both design and development for a project?",
    a: "Yes — we are a full end-to-end agency. From initial strategy and UI/UX design to development, testing, launch, and post-launch support, our team handles every phase in-house. No outsourcing, no handoffs, no gaps.",
  },
  {
    id: 4,
    category: "Pricing",
    q: "How much does a website cost?",
    a: "Website costs vary depending on the complexity, number of pages, features required, and integrations needed. A basic informational website starts from ₹8,000, while a full e-commerce platform can range significantly higher. Contact us for a free, tailored quote.",
  },
  {
    id: 5,
    category: "Pricing",
    q: "Do you offer monthly retainer plans?",
    a: "Yes. We offer monthly retainer packages for services like SEO, Social Media Management, Content Writing, and Digital Marketing. Retainer plans ensure consistent growth and dedicated attention to your brand's online presence.",
  },
  {
    id: 6,
    category: "Pricing",
    q: "Are there any hidden charges?",
    a: "Never. We believe in complete transparency. All costs — including third-party tools, domain/hosting fees, and ad budgets — are clearly communicated upfront. You'll always know exactly what you're paying for and why.",
  },
  {
    id: 7,
    category: "Process",
    q: "What is your typical project timeline?",
    a: "Timelines depend on the scope. A standard website takes 2–4 weeks; a mobile app typically takes 6–12 weeks. Marketing campaigns can be live within 5–7 business days. We always provide a detailed timeline before starting.",
  },
  {
    id: 8,
    category: "Process",
    q: "How do you keep clients updated during a project?",
    a: "We provide weekly progress updates via WhatsApp or email, share milestone previews for approval, and maintain an open-door communication policy. You'll never be left wondering where your project stands.",
  },
  {
    id: 9,
    category: "Process",
    q: "Do you require full payment upfront?",
    a: "No. We typically work on a milestone-based payment structure — an initial deposit to begin, followed by payments at key project milestones. This keeps things fair and aligned with progress.",
  },
  {
    id: 10,
    category: "Support",
    q: "What kind of post-launch support do you provide?",
    a: "We offer a complimentary support window after launch to handle bugs, minor adjustments, and questions. Ongoing maintenance and support plans are also available for clients who want continued assistance.",
  },
  {
    id: 11,
    category: "Support",
    q: "What if I'm not satisfied with the work?",
    a: "Client satisfaction is our top priority. We work iteratively with your feedback throughout the project. If an agreed deliverable doesn't meet the brief, we revise it at no extra charge within our defined revision policy.",
  },
  {
    id: 12,
    category: "Support",
    q: "How quickly do you respond to queries?",
    a: "We respond to all queries within 24 hours on business days (Monday–Saturday, 9am–7pm IST). For urgent matters, you can reach us directly on WhatsApp at +91 92337 70627 for a faster response.",
  },
];

export default function FAQSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const rootInView = useInView(rootRef, { once: true, margin: "-60px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [openId, setOpenId] = useState<number | null>(1);

  const filtered = activeFilter === "All" ? faqs : faqs.filter(f => f.category === activeFilter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');

        .faq-section {
          --blue:        #1a5fd4;
          --blue-light:  #e8f0fc;
          --blue-glow:   rgba(26,95,212,0.20);
          --orange:      #f07820;
          --orange-dark: #c75f0f;
          --orange-light:#fff3ea;
          --orange-glow: rgba(240,120,32,0.20);
          --text:        #0f2545;
          --text-mid:    #3d5a8a;
          --text-muted:  #7a90b5;
          --text-faint:  #a8bcd8;
          --border:      rgba(26,95,212,0.12);
          --border-warm: rgba(240,120,32,0.18);

          background: #fff;
          padding: 80px 40px 100px;
          font-family: 'DM Mono', monospace;
          position: relative;
          overflow: hidden;
        }
        .faq-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--blue), var(--orange));
        }
        .faq-dotgrid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(26,95,212,0.08) 1px, transparent 1px);
          background-size: 28px 28px; opacity: 0.5;
        }
        .faq-watermark {
          position: absolute; bottom: -4%; right: -2%;
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: clamp(6rem, 20vw, 18rem);
          color: rgba(26,95,212,0.03);
          pointer-events: none; user-select: none;
          letter-spacing: -0.04em; line-height: 1; z-index: 0;
        }
        .faq-inner {
          max-width: 900px; margin: 0 auto;
          position: relative; z-index: 1;
        }

        /* header */
        .faq-pill {
          display: inline-flex; align-items: center; gap: 0.9rem;
          font-size: 0.60rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--blue); opacity: 0.9; margin-bottom: 20px;
        }
        .faq-pill::before, .faq-pill::after {
          content: ''; display: block; width: 24px; height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--orange));
          border-radius: 2px; flex-shrink: 0;
        }
        .faq-headline {
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: clamp(2.4rem, 3.5vw, 4rem); color: var(--text);
          line-height: 1.1; letter-spacing: -0.01em; margin: 0 0 14px 0;
        }
        .faq-headline .hl-blue {
          font-style: italic;
          background: linear-gradient(100deg, var(--blue), var(--orange));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; filter: drop-shadow(0 0 10px var(--blue-glow));
        }
        .faq-headline .hl-orange { font-style: italic; color: var(--orange); }
        .faq-sub {
          font-size: 0.70rem; letter-spacing: 0.08em; color: var(--text-mid);
          line-height: 1.8; margin: 0 0 36px 0; max-width: 520px;
        }

        /* filters */
        .faq-filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 40px; }
        .faq-filter-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 16px;
          font-family: 'DM Mono', monospace;
          font-size: 0.57rem; letter-spacing: 0.18em; text-transform: uppercase;
          border: 1px solid var(--border); background: transparent;
          color: var(--text-muted);
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          cursor: pointer; transition: all 0.25s ease;
        }
        .faq-filter-btn:hover { background: var(--blue-light); color: var(--blue); border-color: rgba(26,95,212,0.25); }
        .faq-filter-btn.active {
          background: linear-gradient(135deg, var(--blue), #1249aa);
          color: #fff; border-color: transparent;
          box-shadow: 0 4px 14px var(--blue-glow);
        }
        .faq-filter-count { font-size: 0.50rem; opacity: 0.7; }

        .faq-divider {
          border: none; height: 1px;
          background: linear-gradient(90deg, var(--blue), transparent);
          opacity: 0.18; margin: 0 0 32px 0;
        }

        /* accordion */
        .faq-list { display: flex; flex-direction: column; gap: 10px; }

        .faq-item {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 0;
          overflow: hidden;
          position: relative;
          box-shadow: 0 2px 12px var(--blue-glow);
          transition: box-shadow 0.2s;
        }
        .faq-item::before, .faq-item::after {
          content: ''; position: absolute; width: 12px; height: 12px;
        }
        .faq-item::before { top: -1px; left: -1px; border-top: 2px solid var(--blue); border-left: 2px solid var(--blue); }
        .faq-item::after  { bottom: -1px; right: -1px; border-bottom: 2px solid var(--orange); border-right: 2px solid var(--orange); }
        .faq-item.open { box-shadow: 0 4px 24px var(--blue-glow); border-color: rgba(26,95,212,0.22); }

        .faq-trigger {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          gap: 16px; padding: 18px 20px; background: none; border: none; cursor: pointer;
          text-align: left;
        }
        .faq-trigger-left { display: flex; align-items: center; gap: 14px; flex: 1; min-width: 0; }

        .faq-num {
          font-size: 0.52rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--text-faint); flex-shrink: 0; width: 28px;
        }
        .faq-cat-tag {
          font-size: 0.50rem; letter-spacing: 0.14em; text-transform: uppercase;
          padding: 3px 8px; border: 1px solid var(--border);
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
          color: var(--text-mid); background: rgba(26,95,212,0.03);
          flex-shrink: 0; white-space: nowrap;
        }
        .faq-item.open .faq-cat-tag { background: var(--blue-light); color: var(--blue); border-color: rgba(26,95,212,0.22); }

        .faq-question {
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: 1.1rem; letter-spacing: 0.02em; color: var(--text);
          line-height: 1.3; flex: 1;
        }
        .faq-item.open .faq-question { color: var(--text); }

        .faq-icon {
          width: 28px; height: 28px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
          background: var(--blue-light); color: var(--blue);
          transition: background 0.25s, color 0.25s, transform 0.3s;
        }
        .faq-item.open .faq-icon { background: var(--blue); color: #fff; }

        .faq-body { overflow: hidden; }
        .faq-answer-wrap {
          padding: 0 20px 20px;
          border-top: 1px solid var(--border);
          padding-top: 16px;
          margin-top: 0;
        }
        .faq-answer {
          font-size: 0.67rem; letter-spacing: 0.06em;
          color: var(--text-mid); line-height: 1.85; margin: 0;
        }

        /* bottom cta */
        .faq-cta {
          margin-top: 52px;
          background: linear-gradient(135deg, var(--blue-light) 0%, #fff 50%, var(--orange-light) 100%);
          border: 1px solid var(--border); padding: 28px 32px;
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
          box-shadow: 0 4px 24px var(--blue-glow);
          display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap;
        }
        .faq-cta-label { font-size: 0.55rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--blue); margin-bottom: 6px; }
        .faq-cta-title {
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: 1.6rem; color: var(--text); letter-spacing: -0.01em; margin: 0;
        }
        .faq-cta-title span { font-style: italic; color: var(--orange); }
        .faq-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 12px 24px; font-family: 'DM Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: #fff; background: linear-gradient(135deg, var(--orange), var(--orange-dark));
          border: none; clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          cursor: pointer; text-decoration: none; transition: all 0.3s;
          box-shadow: 0 4px 18px var(--orange-glow); position: relative; overflow: hidden;
        }
        .faq-cta-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, var(--blue), #1249aa); opacity: 0; transition: opacity 0.3s; }
        .faq-cta-btn:hover::before { opacity: 1; }
        .faq-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 22px var(--blue-glow); }
        .faq-cta-btn span, .faq-cta-btn svg { position: relative; z-index: 1; }

        @media (max-width: 640px) {
          .faq-section { padding: 56px 20px 72px; }
          .faq-trigger-left { flex-wrap: wrap; }
          .faq-cat-tag { display: none; }
        }
      `}</style>

      <section className="faq-section">
        <div className="faq-dotgrid" />
        <div className="faq-watermark">FAQ</div>
        <div className="faq-inner" ref={rootRef}>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={rootInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
            <span className="faq-pill">FAQ</span>
          </motion.div>
          <motion.h2 className="faq-headline" initial={{ opacity: 0, y: 18 }} animate={rootInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}>
            Questions we get <span className="hl-blue">asked</span> the <span className="hl-orange">most</span>
          </motion.h2>
          <motion.p className="faq-sub" initial={{ opacity: 0, y: 14 }} animate={rootInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.13, ease: [0.16, 1, 0.3, 1] }}>
            Can't find your answer here? Reach out on WhatsApp — we respond within 24 hours.
          </motion.p>

          <motion.div className="faq-filters" initial={{ opacity: 0, y: 12 }} animate={rootInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}>
            {faqCategories.map(cat => {
              const count = cat === "All" ? faqs.length : faqs.filter(f => f.category === cat).length;
              return (
                <button key={cat} className={`faq-filter-btn${activeFilter === cat ? " active" : ""}`} onClick={() => setActiveFilter(cat)}>
                  {cat} <span className="faq-filter-count">{count}</span>
                </button>
              );
            })}
          </motion.div>

          <hr className="faq-divider" />

          <motion.div className="faq-list" initial={{ opacity: 0, y: 20 }} animate={rootInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => {
                const isOpen = openId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    className={`faq-item${isOpen ? " open" : ""}`}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.35, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button className="faq-trigger" onClick={() => setOpenId(isOpen ? null : item.id)}>
                      <div className="faq-trigger-left">
                        <span className="faq-num">{String(item.id).padStart(2, "0")}</span>
                        <span className="faq-cat-tag">{item.category}</span>
                        <span className="faq-question">{item.q}</span>
                      </div>
                      <div className="faq-icon" style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M12 5v14M5 12h14"/>
                        </svg>
                      </div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          className="faq-body"
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="faq-answer-wrap">
                            <p className="faq-answer">{item.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <motion.div className="faq-cta" initial={{ opacity: 0, y: 20 }} animate={rootInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}>
            <div>
              <div className="faq-cta-label">Still have questions?</div>
              <p className="faq-cta-title">We're happy to <span>help you</span></p>
            </div>
            <a href="https://wa.me/919233770627" target="_blank" rel="noopener noreferrer" className="faq-cta-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span>Chat on WhatsApp</span>
            </a>
          </motion.div>

        </div>
      </section>
    </>
  );
}