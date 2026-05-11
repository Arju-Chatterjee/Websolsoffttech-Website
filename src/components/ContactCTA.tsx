import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const FORMSPREE_ID = "mwvadzed";

const formFields = [
  { id: "name",    label: "Full Name",                  type: "text",     placeholder: "Full Name",                                     span: 1 },
  { id: "email",   label: "Email Address",              type: "email",    placeholder: "Email Address",                                 span: 1 },
  { id: "company", label: "Company / Project",          type: "text",     placeholder: "Acme Inc.",                                     span: 1 },
  { id: "service", label: "Service Needed",             type: "select",   placeholder: "",                                              span: 1,
    options: ["Select service", "Website Development", "Mobile App", "Software Development", "Digital Marketing", "Video & Production", "Graphic Designing", "Other"] },
  { id: "message", label: "Tell Us About Your Project", type: "textarea", placeholder: "Describe your project, goals, and timeline…",  span: 2 },
];

const infoItems = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
      </svg>
    ),
    label: "Location",
    value: "Agartala, Tripura India",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/>
      </svg>
    ),
    label: "WhatsApp",
    value: "+91 92337 70627",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
      </svg>
    ),
    label: "Email",
    value: "info.websolsoffttech@gmail.com",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    label: "Response time",
    value: "Within 24 hours",
  },
];

export default function ContactCTA() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);
  const [error, setError]         = useState("");

  const rootRef    = useRef<HTMLDivElement>(null);
  const rootInView = useInView(rootRef, { once: true, margin: "-60px" });

  const handleChange = (id: string, val: string) =>
    setFormData(p => ({ ...p, [id]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name:    formData.name    || "",
          email:   formData.email   || "",
          company: formData.company || "",
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

        .cta-section {
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
          /* DM Mono as base — matches pricing */
          font-family: 'DM Mono', monospace;
          position: relative;
        }

       /* Shine effect */
.cta-submit::after {
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
.cta-submit:hover::after {
  left: 120%;
}

        .cta-inner {
          max-width: 1160px;
          margin: 0 auto;
        }

        /* ── Header ── */
        /* Eyebrow pill → same style as pricing-eyebrow-text */
        .cta-pill {
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
        /* The two little lines flanking the eyebrow text */
        .cta-pill::before,
        .cta-pill::after {
          content: '';
          display: block;
          width: 24px; height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--orange));
          border-radius: 2px;
          flex-shrink: 0;
        }

        /* Headline → Cormorant Garamond, same as pricing-title */
        .cta-headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2.4rem, 3.5vw, 4rem);
          color: var(--text);
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin: 0 0 14px 0;
        }
        /* "extraordinary" → gradient like pricing-title em */
        .cta-headline .hl-blue {
          font-style: italic;
          background: linear-gradient(100deg, var(--blue), var(--orange));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 10px var(--blue-glow));
        }
        /* "together" → plain orange italic */
        .cta-headline .hl-orange {
          font-style: italic;
          color: var(--orange);
        }

        /* Sub → DM Mono small, same as pricing-subtitle */
        .cta-sub {
          font-size: 0.70rem;
          letter-spacing: 0.08em;
          color: var(--text-mid);
          line-height: 1.8;
          margin: 0 0 40px 0;
          max-width: 520px;
        }

        /* Availability badge → same clip-path polygon as pricing toggle-save */
        .cta-avail {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--blue-light);
          border: 1px solid var(--border);
          padding: 5px 14px;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          margin-bottom: 48px;
        }
        .cta-avail-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
          animation: cta-pulse 2.2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes cta-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
          50%       { box-shadow: 0 0 0 6px rgba(34,197,94,0.05); }
        }
        .cta-avail-text {
          font-size: 0.57rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-mid);
        }
        .cta-avail-text span { color: #22c55e; }

        /* ── Body layout ── */
        .cta-body {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 32px;
          align-items: start;
        }

        /* ── Form card ── */
        .cta-form-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 36px;
          box-sizing: border-box;
          box-shadow: 0 4px 24px var(--blue-glow), 0 1px 4px rgba(0,0,0,0.03);
          position: relative;
          overflow: hidden;
        }
        /* Corner accent marks — same as pricing featured card */
        .cta-form-card::before,
        .cta-form-card::after {
          content: '';
          position: absolute;
          width: 20px; height: 20px;
        }
        .cta-form-card::before {
          top: -1px; left: -1px;
          border-top: 2px solid var(--blue);
          border-left: 2px solid var(--blue);
        }
        .cta-form-card::after {
          bottom: -1px; right: -1px;
          border-bottom: 2px solid var(--orange);
          border-right: 2px solid var(--orange);
        }

        /* Form card title → Cormorant Garamond like card-name */
        .cta-form-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.9rem;
          color: var(--text);
          letter-spacing: 0.04em;
          margin: 0 0 6px 0;
        }
        /* Form subtitle → DM Mono small like card-tagline */
        .cta-form-subtitle {
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin: 0 0 28px 0;
          line-height: 1.6;
        }

        /* Divider → same gradient as card-divider */
        .cta-divider {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, var(--blue), transparent);
          opacity: 0.20;
          margin: 0 0 28px 0;
        }

        /* Form grid */
        .cta-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .cta-span-2 { grid-column: span 2; }

        .cta-field { display: flex; flex-direction: column; gap: 6px; }

        /* Labels → same as card-num style, tiny uppercase DM Mono */
        .cta-label {
          font-size: 0.57rem;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-mid);
        }

        /* Inputs → match the clipped polygon tag feel */
        .cta-input, .cta-select, .cta-textarea {
          background: rgba(26,95,212,0.03);
          border: 1px solid var(--border);
          border-radius: 0;
          color: var(--text);
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.06em;
          padding: 11px 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          width: 100%;
          box-sizing: border-box;
        }
        .cta-input::placeholder, .cta-textarea::placeholder {
          color: var(--text-faint);
          font-size: 0.63rem;
        }
        .cta-input:focus, .cta-select:focus, .cta-textarea:focus {
          border-color: var(--blue);
          background: #fff;
          box-shadow: 0 0 0 3px var(--blue-glow);
        }
        .cta-textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.65;
        }
        .cta-select {
          appearance: none; -webkit-appearance: none; cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%237a90b5' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          background-color: rgba(26,95,212,0.03);
          padding-right: 36px;
        }

        .cta-error {
          margin-top: 12px;
          padding: 10px 14px;
          border: 1px solid rgba(240,120,32,0.3);
          background: var(--orange-light);
          border-radius: 0;
          font-size: 0.60rem;
          letter-spacing: 0.08em;
          color: var(--orange-dark);
          line-height: 1.5;
        }

        /* Submit button → exact same as pricing .card-cta.solid + hero .btn-primary */
        .cta-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
          padding: 13px 28px;
          width: 100%;
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
          transition: all 0.3s ease;
          box-shadow: 0 4px 18px var(--orange-glow);
          position: relative;
          overflow: hidden;
        }
        .cta-submit::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--blue), #1249aa);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .cta-submit:hover:not(:disabled)::before { opacity: 1; }
        .cta-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 22px var(--blue-glow);
        }
        .cta-submit:active { transform: translateY(0); }
        .cta-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .cta-submit span, .cta-submit svg { position: relative; z-index: 1; }

        .cta-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: cta-spin 0.7s linear infinite;
          flex-shrink: 0;
          position: relative; z-index: 1;
        }
        @keyframes cta-spin { to { transform: rotate(360deg); } }

        /* ── Right info panel ── */
        .cta-info-panel {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* Info card → same as pricing-card base style */
        .cta-info-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 0;
          padding: 20px;
          box-shadow: 0 4px 24px var(--blue-glow), 0 1px 4px rgba(0,0,0,0.03);
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
        }

        /* Info title → same as pricing eyebrow-text style */
        .cta-info-title {
          font-size: 0.57rem;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--blue);
          margin: 0 0 16px 0;
          padding-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        /* Gradient line after title — same as pricing footer-col-title::after */
        .cta-info-title::after {
          content: '';
          flex: 1;
          height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--orange), transparent);
          border-radius: 2px;
          opacity: 0.35;
        }

        .cta-info-list { display: flex; flex-direction: column; gap: 14px; }

        .cta-info-item { display: flex; align-items: flex-start; gap: 12px; }

        /* Icon box → same blue-light bg as pricing toggle */
        .cta-info-icon {
          width: 34px; height: 34px;
          background: var(--blue-light);
          color: var(--blue);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
        }

        /* Info label → same tiny mono uppercase as card-num */
        .cta-info-label {
          font-size: 0.55rem;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-faint);
          margin-bottom: 2px;
        }
        /* Info value → DM Mono body */
        .cta-info-value {
          font-size: 0.63rem;
          letter-spacing: 0.06em;
          color: var(--text);
          line-height: 1.4;
        }

        /* Trust card → same clip-path card style */
        .cta-trust-card {
          background: linear-gradient(160deg, var(--blue-light) 0%, #fff 60%, var(--orange-light) 100%);
          border: 1px solid var(--border);
          border-radius: 0;
          padding: 20px;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
          box-shadow: 0 4px 24px var(--blue-glow);
        }

        /* Trust title → same eyebrow style */
        .cta-trust-title {
          font-size: 0.57rem;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--orange);
          margin: 0 0 14px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cta-trust-title::after {
          content: '';
          flex: 1;
          height: 2px;
          background: linear-gradient(90deg, var(--orange), transparent);
          border-radius: 2px;
          opacity: 0.35;
        }

        .cta-trust-list { display: flex; flex-direction: column; gap: 10px; }

        /* Trust item → same as pricing feature-item */
        .cta-trust-item {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 0.62rem;
          letter-spacing: 0.06em;
          color: var(--text-mid);
        }

        /* Check box → same as pricing feature-check */
        .cta-trust-check {
          width: 14px; height: 14px;
          border: 1px solid var(--border-warm);
          background: var(--orange-light);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          clip-path: polygon(3px 0%, 100% 0%, calc(100% - 3px) 100%, 0% 100%);
          font-size: 9px;
          color: var(--orange);
          font-weight: 700;
        }

        /* ── Success state ── */
        .cta-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 48px 24px;
          text-align: center;
        }

        .cta-success-ring {
          width: 68px; height: 68px;
          background: rgba(34,197,94,0.07);
          border: 2px solid rgba(34,197,94,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
        }
        .cta-success-check-icon {
          color: #22c55e;
          font-size: 28px;
          font-weight: 700;
          line-height: 1;
        }

        /* Success title → Cormorant Garamond */
        .cta-success-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 2rem;
          color: var(--text);
          margin: 0;
          letter-spacing: 0.02em;
        }
        /* Success body → DM Mono small */
        .cta-success-body {
          font-size: 0.65rem;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          line-height: 1.8;
          max-width: 380px;
          margin: 0;
        }

        .cta-success-meta {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 8px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
          width: 100%;
        }
        .cta-success-meta-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
        }
        .cta-success-meta-label {
          font-size: 0.55rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-faint);
        }
        .cta-success-meta-value {
          font-size: 0.63rem;
          letter-spacing: 0.08em;
          color: var(--text);
        }

        /* Responsive */
        @media (max-width: 900px) {
          .cta-body { grid-template-columns: 1fr; }
          .cta-info-panel { display: grid; grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .cta-section { padding: 56px 20px 72px; }
          .cta-form-grid { grid-template-columns: 1fr; }
          .cta-span-2 { grid-column: auto; }
          .cta-form-card { padding: 24px; }
          .cta-info-panel { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="cta-section">
        <div className="cta-inner" ref={rootRef}>

          {/* ── Page header ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={rootInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="cta-pill">Get In Touch</span>
          </motion.div>

          <motion.h2
            className="cta-headline"
            initial={{ opacity: 0, y: 18 }}
            animate={rootInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            Let's build something{" "}
            <span className="hl-blue">extraordinary</span>{" "}
            <span className="hl-orange">together</span>
          </motion.h2>

          <motion.p
            className="cta-sub"
            initial={{ opacity: 0, y: 14 }}
            animate={rootInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.13, ease: [0.16, 1, 0.3, 1] }}
          >
            Whether you have a clear vision or just a spark of an idea — share the details below and we'll get back to you within 24 hours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={rootInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cta-avail">
              <div className="cta-avail-dot" />
              <span className="cta-avail-text">Currently <span>Available</span> for new projects</span>
            </div>
          </motion.div>

          {/* ── Body ── */}
          <motion.div
            className="cta-body"
            initial={{ opacity: 0, y: 24 }}
            animate={rootInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Left: Form card */}
            <div className="cta-form-card">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="cta-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="cta-success-ring">
                      <span className="cta-success-check-icon">✓</span>
                    </div>
                    <p className="cta-success-title">Message received!</p>
                    <p className="cta-success-body">
                      Your project details have been submitted. We'll review everything and reach out within 24 hours.
                    </p>
                    <div className="cta-success-meta">
                      <div className="cta-success-meta-item">
                        <span className="cta-success-meta-label">Response time</span>
                        <span className="cta-success-meta-value">Within 24 hours</span>
                      </div>
                      <div className="cta-success-meta-item">
                        <span className="cta-success-meta-label">Submitted by</span>
                        <span className="cta-success-meta-value">{formData.email || "—"}</span>
                      </div>
                      <div className="cta-success-meta-item">
                        <span className="cta-success-meta-label">Service</span>
                        <span className="cta-success-meta-value">{formData.service || "—"}</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p className="cta-form-title">Start a conversation</p>
                    <p className="cta-form-subtitle">
                      Fill in the details and we'll craft a tailored response. All fields help us respond faster.
                    </p>
                    <hr className="cta-divider" />

                    <form onSubmit={handleSubmit}>
                      <div className="cta-form-grid">
                        {formFields.map(f => (
                          <div
                            key={f.id}
                            className={`cta-field${f.span === 2 ? " cta-span-2" : ""}`}
                          >
                            <label className="cta-label" htmlFor={f.id}>{f.label}</label>

                            {f.type === "textarea" ? (
                              <textarea
                                id={f.id}
                                className="cta-textarea"
                                placeholder={f.placeholder}
                                value={formData[f.id] || ""}
                                onChange={e => handleChange(f.id, e.target.value)}
                              />
                            ) : f.type === "select" ? (
                              <select
                                id={f.id}
                                className="cta-select"
                                value={formData[f.id] || ""}
                                onChange={e => handleChange(f.id, e.target.value)}
                              >
                                {f.options!.map(o => (
                                  <option key={o} value={o === f.options![0] ? "" : o}>{o}</option>
                                ))}
                              </select>
                            ) : (
                              <input
                                id={f.id}
                                type={f.type}
                                className="cta-input"
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
                          <>
                            <div className="cta-spinner" />
                            <span>Sending…</span>
                          </>
                        ) : (
                          <>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{position:"relative",zIndex:1}}>
                              <line x1="22" y1="2" x2="11" y2="13"/>
                              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                            </svg>
                            <span>Send your message</span>
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Info + trust */}
            <div className="cta-info-panel">

              {/* Contact info */}
              <div className="cta-info-card">
                <p className="cta-info-title">Contact details</p>
                <div className="cta-info-list">
                  {infoItems.map((item, i) => (
                    <div key={i} className="cta-info-item">
                      <div className="cta-info-icon">{item.icon}</div>
                      <div>
                        <div className="cta-info-label">{item.label}</div>
                        <div className="cta-info-value">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust badges */}
              <div className="cta-trust-card">
                <p className="cta-trust-title">Why work with us</p>
                <div className="cta-trust-list">
                  {[
                    "Free initial consultation",
                    "No commitment required",
                    "Transparent pricing",
                    "Scalable and future-ready solutions",
                    "Customized solutions for every business",
                    "On-time delivery guaranteed",
                    "Post-launch maintenance & support"
                  ].map((item, i) => (
                    <div key={i} className="cta-trust-item">
                      <div className="cta-trust-check">✓</div>
                      <span>{item}</span>
                    </div>
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