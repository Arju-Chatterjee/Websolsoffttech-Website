import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── Formspree setup (2 minutes) ──────────────────────────────────
// 1. Go to https://formspree.io and sign up (free = 50 submissions/month)
// 2. Click "New Form" → give it a name → copy the form ID from the endpoint URL
// 3. Paste your form ID below — it looks like "xpwzgkrb"
const FORMSPREE_ID = "mwvadzed";
// Your submissions will arrive at the email you signed up with.
// ─────────────────────────────────────────────────────────────────

const formFields = [
  { id: "name",    label: "Full Name",                  type: "text",     placeholder: "Full Name",             span: 1 },
  { id: "email",   label: "Email Address",              type: "email",    placeholder: "Email Address",      span: 1 },
  { id: "company", label: "Company / Project",          type: "text",     placeholder: "Acme Inc.",             span: 2 },
//   { id: "budget",  label: "Budget Range",               type: "select",   placeholder: "",                      span: 1,
//     options: ["Select budget", "₹1k–₹5k", "₹5k–₹15k", "₹15k–₹50k", "₹ 50k+"] },
  { id: "service", label: "Service Needed",             type: "select",   placeholder: "",                      span: 1,
    options: ["Select service", "Website Development", "Mobile App", "Software Development", "Digital Marketing", "Video & Production", "Graphic Designing", "Other"] },
  { id: "message", label: "Tell Us About Your Project", type: "textarea", placeholder: "Describe your project, goals, and timeline…", span: 2 },
];

const particles = [
  { top: "14%", left: "7%",   size: 3, dur: "8s",  color: "#3d82f5", delay: "0s"   },
  { top: "70%", left: "4%",   size: 2, dur: "10s", color: "#f07820", delay: "1.6s" },
  { top: "40%", right: "6%",  size: 4, dur: "7s",  color: "#3d82f5", delay: "0.9s" },
  { top: "80%", right: "15%", size: 2, dur: "9s",  color: "#f07820", delay: "2.4s" },
  { top: "20%", right: "30%", size: 2, dur: "11s", color: "#3d82f5", delay: "3.5s" },
];

export default function ContactCTA() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);
  const [error, setError]         = useState("");

  const heroRef    = useRef<HTMLDivElement>(null);
  const formRef    = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });
  const formInView = useInView(formRef, { once: true, margin: "-60px" });

  const handleChange = (id: string, val: string) =>
    setFormData(p => ({ ...p, [id]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name:    formData.name    || "",
          email:   formData.email   || "",
          company: formData.company || "",
          budget:  formData.budget  || "",
          service: formData.service || "",
          message: formData.message || "",
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data?.errors?.[0]?.message || "Submission failed. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');

        .cta-root {
          font-family: 'DM Mono', monospace;
          background: #060c1a;
          color: #e8edf8;
          padding: 0 2.5rem 5rem;
          position: relative;
          overflow: hidden;
        }

        .cta-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 70% 55% at 95% 10%, rgba(26,95,212,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 55% 45% at 5% 90%,  rgba(240,120,32,0.09) 0%, transparent 55%),
            radial-gradient(ellipse 40% 35% at 50% 50%, rgba(26,95,212,0.05) 0%, transparent 60%);
        }
        .cta-orb-a {
          position: absolute; border-radius: 50%; pointer-events: none;
          width: 600px; height: 600px; top: -200px; right: -200px;
          background: radial-gradient(circle, #1a5fd4 0%, transparent 70%);
          filter: blur(100px); opacity: 0.13;
          animation: cta-drift 16s ease-in-out infinite alternate;
        }
        .cta-orb-b {
          position: absolute; border-radius: 50%; pointer-events: none;
          width: 450px; height: 450px; bottom: -150px; left: -100px;
          background: radial-gradient(circle, #f07820 0%, transparent 70%);
          filter: blur(100px); opacity: 0.10;
          animation: cta-drift 12s ease-in-out infinite alternate-reverse;
        }
        @keyframes cta-drift {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(30px,20px) scale(1.06); }
        }

        .cta-particle {
          position: absolute; border-radius: 50%; pointer-events: none;
          animation: cta-float linear infinite;
        }
        @keyframes cta-float {
          0%   { transform: translateY(0) scale(1); opacity: 0.5; }
          50%  { opacity: 1; }
          100% { transform: translateY(-80px) translateX(10px) scale(0.2); opacity: 0; }
        }

        .cta-inner {
          position: relative; z-index: 2;
          max-width: 860px; margin: 0 auto;
        }

        /* ── HERO ── */
        .cta-hero {
          text-align: center;
          padding: 6rem 2rem 4rem;
          position: relative;
        }
        .cta-hero::after {
          content: '';
          position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
          width: 40%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(61,130,245,0.25), rgba(240,120,32,0.2), transparent);
        }

        .cta-eyebrow {
          display: inline-flex; align-items: center; gap: 1rem;
          margin-bottom: 1.6rem;
        }
        .cta-eyebrow-line {
          width: 32px; height: 1px;
          background: linear-gradient(90deg, transparent, #3d82f5);
          box-shadow: 0 0 8px rgba(61,130,245,0.6);
        }
        .cta-eyebrow-line.r {
          background: linear-gradient(90deg, #f07820, transparent);
          box-shadow: 0 0 8px rgba(240,120,32,0.6);
        }
        .cta-eyebrow-text {
          font-size: 0.6rem; letter-spacing: 0.28em;
          text-transform: uppercase; color: #3d82f5;
        }

        .cta-headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2.6rem, 5.5vw, 4.2rem);
          line-height: 1.06; color: #e8edf8;
          letter-spacing: -0.01em; margin-bottom: 1.2rem;
        }
        .cta-headline em {
          font-style: italic;
          background: linear-gradient(110deg, #3d82f5 0%, #f07820 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 20px rgba(26,95,212,0.35));
        }

        .cta-sub {
          font-size: 0.68rem; line-height: 1.9;
          letter-spacing: 0.05em; color: #7a90b5;
          max-width: 480px; margin: 0 auto 2rem;
        }

        .cta-avail {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 7px 18px;
          border: 1px solid rgba(61,130,245,0.2);
          background: rgba(61,130,245,0.04);
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }
        .cta-avail-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #3d82f5; box-shadow: 0 0 8px #3d82f5;
          animation: cta-pulse 2.2s ease-in-out infinite;
        }
        @keyframes cta-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.6); }
        }
        .cta-avail-text {
          font-size: 0.56rem; letter-spacing: 0.18em;
          text-transform: uppercase; color: #3d82f5;
        }

        /* ── FORM CARD ── */
        .cta-form-wrap {
          position: relative; margin-top: 3.5rem;
          background: #0a1426;
          border: 1px solid rgba(61,130,245,0.14);
          padding: 2.8rem 3rem;
          box-shadow:
            0 4px 16px rgba(0,0,0,0.5),
            0 20px 70px rgba(0,0,0,0.4),
            0 40px 100px -20px rgba(61,130,245,0.1),
            inset 0 1px 0 rgba(61,130,245,0.1);
        }
        .cta-form-wrap::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent 0%, #3d82f5 35%, #f07820 65%, transparent 100%);
          opacity: 0.7;
        }

        .cta-corner { position: absolute; pointer-events: none; }
        .cta-corner.tr {
          top: 12px; right: 12px; width: 16px; height: 16px;
          border-top: 1px solid rgba(61,130,245,0.3);
          border-right: 1px solid rgba(61,130,245,0.3);
        }
        .cta-corner.bl {
          bottom: 12px; left: 12px; width: 12px; height: 12px;
          border-bottom: 1px solid rgba(240,120,32,0.25);
          border-left: 1px solid rgba(240,120,32,0.25);
        }

        .cta-form-header {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 2rem;
          margin-bottom: 2rem;
          padding-bottom: 1.6rem;
          border-bottom: 1px solid rgba(61,130,245,0.08);
        }
        .cta-form-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-size: 1.7rem;
          color: #e8edf8; line-height: 1.2;
        }
        .cta-form-sub {
          font-size: 0.6rem; line-height: 1.8;
          letter-spacing: 0.04em; color: #4a6480;
          max-width: 280px; text-align: right;
          align-self: flex-end;
        }
        @media (max-width: 600px) {
          .cta-form-header { flex-direction: column; }
          .cta-form-sub { text-align: left; max-width: 100%; }
          .cta-form-wrap { padding: 2rem 1.4rem; }
        }

        .cta-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.1rem;
        }
        @media (max-width: 560px) {
          .cta-form-grid { grid-template-columns: 1fr; }
          .cta-span-2 { grid-column: auto !important; }
        }
        .cta-span-2 { grid-column: span 2; }
        .cta-field { display: flex; flex-direction: column; gap: 5px; }

        .cta-label {
          font-size: 0.5rem; letter-spacing: 0.22em;
          text-transform: uppercase; color: #3d82f5; opacity: 0.65;
        }

        .cta-input, .cta-select, .cta-textarea {
          background: #060c1a;
          border: 1px solid rgba(61,130,245,0.14);
          color: #c8d8f0;
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.04em;
          padding: 11px 14px; outline: none;
          transition: border-color 0.3s, box-shadow 0.3s;
          width: 100%; box-sizing: border-box;
        }
        .cta-input::placeholder, .cta-textarea::placeholder { color: #1e2e44; }
        .cta-input:focus, .cta-select:focus, .cta-textarea:focus {
          border-color: rgba(61,130,245,0.45);
          box-shadow: 0 0 0 2px rgba(61,130,245,0.07), 0 0 20px rgba(61,130,245,0.08);
        }
        .cta-textarea { resize: vertical; min-height: 110px; line-height: 1.7; }
        .cta-select {
          appearance: none; -webkit-appearance: none; cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%233d82f5' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center;
          padding-right: 32px;
        }
        .cta-select option { background: #0a1426; color: #c8d8f0; }

        .cta-error {
          margin-top: 1rem; padding: 10px 14px;
          border: 1px solid rgba(240,80,80,0.25);
          background: rgba(240,80,80,0.05);
          font-size: 0.6rem; letter-spacing: 0.05em;
          color: #f07070; line-height: 1.6;
        }

        .cta-submit {
          position: relative; margin-top: 1.6rem;
          display: flex; align-items: center; justify-content: center; gap: 12px;
          padding: 16px 40px; width: 100%;
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.22em;
          text-transform: uppercase; color: #fff;
          background: linear-gradient(135deg, #1a5fd4 0%, #3d82f5 50%, #1a5fd4 100%);
          background-size: 200% 100%;
          border: none; cursor: pointer;
          clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
          box-shadow:
            0 0 0 1px rgba(61,130,245,0.3),
            0 0 30px rgba(61,130,245,0.3),
            0 8px 32px rgba(0,0,0,0.5);
          transition: all 0.4s ease;
        }
        .cta-submit:hover:not(:disabled) {
          background-position: right center;
          box-shadow:
            0 0 0 1px rgba(61,130,245,0.55),
            0 0 50px rgba(61,130,245,0.5),
            0 12px 40px rgba(0,0,0,0.6);
          transform: translateY(-2px);
        }
        .cta-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .cta-spinner {
          width: 13px; height: 13px;
          border: 1.5px solid rgba(255,255,255,0.25);
          border-top-color: #fff; border-radius: 50%;
          animation: cta-spin 0.7s linear infinite;
        }
        @keyframes cta-spin { to { transform: rotate(360deg); } }

        /* ── SUCCESS ── */
        .cta-success {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 1.4rem; padding: 3.5rem 2rem; text-align: center;
        }
        .cta-success-ring {
          width: 72px; height: 72px;
          border: 1px solid rgba(61,130,245,0.4); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          position: relative; box-shadow: 0 0 40px rgba(61,130,245,0.15);
        }
        .cta-success-ring::before {
          content: ''; position: absolute; inset: -6px;
          border-radius: 50%; border: 1px solid rgba(61,130,245,0.12);
        }
        .cta-success-check { color: #3d82f5; font-size: 1.6rem; }
        .cta-success-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400; font-size: 1.8rem; color: #e8edf8;
        }
        .cta-success-body {
          font-size: 0.63rem; line-height: 1.9;
          letter-spacing: 0.04em; color: #4a6480; max-width: 360px;
        }
        .cta-success-meta {
          display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;
          margin-top: 0.4rem;
        }
        .cta-success-meta-item {
          display: flex; flex-direction: column; align-items: center; gap: 4px;
        }
        .cta-success-meta-label {
          font-size: 0.48rem; letter-spacing: 0.22em;
          text-transform: uppercase; color: #3d82f5; opacity: 0.6;
        }
        .cta-success-meta-value {
          font-size: 0.62rem; letter-spacing: 0.06em; color: #7a90b5;
        }
      `}</style>

      <section className="cta-root">
        <div className="cta-bg" />
        <div className="cta-orb-a" />
        <div className="cta-orb-b" />

        {particles.map((p, i) => (
          <div key={i} className="cta-particle" style={{
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

        <div className="cta-inner">

          {/* Hero */}
          <div className="cta-hero" ref={heroRef}>
            <motion.div
              className="cta-eyebrow"
              initial={{ opacity: 0, y: -12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="cta-eyebrow-line" />
              <span className="cta-eyebrow-text">Get In Touch</span>
              <div className="cta-eyebrow-line r" />
            </motion.div>

            <motion.h2
              className="cta-headline"
              initial={{ opacity: 0, y: 28 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              Let's build something<br /><em>extraordinary together</em>
            </motion.h2>

            <motion.p
              className="cta-sub"
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            >
              Whether you have a clear vision or just a spark of an idea — share the details below and we'll get back to you within 24 hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="cta-avail">
                <div className="cta-avail-dot" />
                <span className="cta-avail-text">Available for new projects — Q3 2025</span>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            ref={formRef}
            className="cta-form-wrap"
            initial={{ opacity: 0, y: 40 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cta-corner tr" />
            <div className="cta-corner bl" />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="cta-success"
                  initial={{ opacity: 0, scale: 0.93 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="cta-success-ring">
                    <span className="cta-success-check">✓</span>
                  </div>
                  <div className="cta-success-title">Message Received</div>
                  <div className="cta-success-body">
                    Your project details have been submitted successfully. We'll review everything and reach out within 24 hours.
                  </div>
                  <div className="cta-success-meta">
                    <div className="cta-success-meta-item">
                      <span className="cta-success-meta-label">Response time</span>
                      <span className="cta-success-meta-value">Within 24 hours</span>
                    </div>
                    <div className="cta-success-meta-item">
                      <span className="cta-success-meta-label">Submitted to</span>
                      <span className="cta-success-meta-value">{formData.email || "your email"}</span>
                    </div>
                    <div className="cta-success-meta-item">
                      <span className="cta-success-meta-label">Project</span>
                      <span className="cta-success-meta-value">{formData.service || "—"}</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="cta-form-header">
                    <div className="cta-form-title">Start a<br />Conversation</div>
                    <div className="cta-form-sub">
                      Fill in the details and we'll craft a tailored response for your project. All fields help us respond faster.
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="cta-form-grid">
                      {formFields.map(f => (
                        <div key={f.id} className={`cta-field${f.span === 2 ? " cta-span-2" : ""}`}>
                          <label className="cta-label" htmlFor={f.id}>{f.label}</label>
                          {f.type === "textarea" ? (
                            <textarea
                              id={f.id} className="cta-textarea"
                              placeholder={f.placeholder}
                              value={formData[f.id] || ""}
                              onChange={e => handleChange(f.id, e.target.value)}
                            />
                          ) : f.type === "select" ? (
                            <select
                              id={f.id} className="cta-select"
                              value={formData[f.id] || ""}
                              onChange={e => handleChange(f.id, e.target.value)}
                            >
                              {f.options!.map(o => (
                                <option key={o} value={o === f.options![0] ? "" : o}>{o}</option>
                              ))}
                            </select>
                          ) : (
                            <input
                              id={f.id} type={f.type} className="cta-input"
                              placeholder={f.placeholder}
                              value={formData[f.id] || ""}
                              onChange={e => handleChange(f.id, e.target.value)}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {error && <div className="cta-error">{error}</div>}

                    <button type="submit" className="cta-submit" disabled={sending}>
                      {sending ? (
                        <><div className="cta-spinner" /><span>Sending…</span></>
                      ) : (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"/>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                          </svg>
                          <span>Send Your Message</span>
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>
    </>
  );
}