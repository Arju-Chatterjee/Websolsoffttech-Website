import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const lastUpdated = "January 1, 2025";

const sections = [
  {
    id: "introduction",
    num: "01",
    title: "Introduction",
    accent: "blue" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value:
          "Welcome to WebSOL Soffttech ('Company', 'we', 'us', or 'our'). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.",
      },
      {
        type: "text",
        value:
          "By accessing or using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with any part of this policy, please discontinue use of our services immediately.",
      },
      {
        type: "highlight",
        value:
          "If you have any questions or concerns about this policy, please contact us at info@websolsoffttech.in or via WhatsApp at +91 92337 70627.",
      },
    ],
  },
  {
    id: "information-we-collect",
    num: "02",
    title: "Information We Collect",
    accent: "amber" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 3v4M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value: "We collect information that you voluntarily provide to us when you contact us, request a quote, or use our services. This may include:",
      },
      {
        type: "list",
        items: [
          "Full name and contact information (email address, phone number)",
          "Business name, project details, and service requirements",
          "Payment and billing information (processed securely via third-party gateways)",
          "Communications and correspondence you send to us",
          "Feedback, reviews, and testimonials you choose to share",
        ],
      },
      {
        type: "text",
        value:
          "We also automatically collect certain technical data when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages visited. This data is collected via cookies and similar technologies.",
      },
      {
        type: "list",
        items: [
          "Device and browser information",
          "IP address and approximate geographic location",
          "Pages visited and time spent on our website",
          "Referring websites and search terms",
          "Cookie identifiers and session data",
        ],
      },
    ],
  },
  {
    id: "how-we-use",
    num: "03",
    title: "How We Use Your Information",
    accent: "blue" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value: "We use the information we collect for the following purposes:",
      },
      {
        type: "list",
        items: [
          "To provide, operate, and maintain our services",
          "To respond to your inquiries, quotes, and support requests",
          "To send you project updates, invoices, and service communications",
          "To improve our website and service offerings based on usage data",
          "To send promotional communications (only with your consent)",
          "To comply with legal obligations and resolve disputes",
          "To detect, prevent, and address technical issues or fraudulent activity",
          "To analyze trends and understand how our services are used",
        ],
      },
      {
        type: "highlight",
        value:
          "We will never sell your personal information to third parties. We do not engage in the sale of personal data under any circumstances.",
      },
    ],
  },
  {
    id: "data-sharing",
    num: "04",
    title: "Data Sharing & Disclosure",
    accent: "amber" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value:
          "We may share your information with trusted third parties only to the extent necessary to deliver our services. These parties are contractually bound to handle your data responsibly:",
      },
      {
        type: "list",
        items: [
          "Service providers (hosting, email delivery, payment processing)",
          "Analytics platforms (Google Analytics, Meta Pixel — anonymized)",
          "Project management and communication tools used internally",
          "Legal and regulatory authorities when required by law",
        ],
      },
      {
        type: "text",
        value:
          "We may also disclose your information if we believe disclosure is necessary to protect our rights, comply with a judicial proceeding, court order, or legal process, or to protect the safety of our users or the public.",
      },
    ],
  },
  {
    id: "cookies",
    num: "05",
    title: "Cookies & Tracking",
    accent: "blue" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="9" cy="10" r="1.5" fill="currentColor" />
        <circle cx="14" cy="14" r="1" fill="currentColor" />
        <circle cx="14" cy="9" r="1" fill="currentColor" />
        <circle cx="9" cy="15" r="1" fill="currentColor" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value:
          "We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device that help us understand how you use our site.",
      },
      {
        type: "list",
        items: [
          "Essential cookies — required for website functionality",
          "Analytics cookies — help us understand user behaviour (Google Analytics)",
          "Marketing cookies — used to deliver relevant ads (Meta Pixel, Google Ads)",
          "Preference cookies — remember your settings and choices",
        ],
      },
      {
        type: "text",
        value:
          "You can control or disable cookies through your browser settings at any time. Note that disabling certain cookies may affect the functionality of our website.",
      },
    ],
  },
  {
    id: "data-security",
    num: "06",
    title: "Data Security & Retention",
    accent: "amber" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value:
          "We implement industry-standard technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These include encrypted communications (HTTPS), access controls, and secure data storage practices.",
      },
      {
        type: "text",
        value:
          "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. When your data is no longer needed, we securely delete or anonymize it.",
      },
      {
        type: "highlight",
        value:
          "No method of transmission over the internet is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.",
      },
    ],
  },
  {
    id: "your-rights",
    num: "07",
    title: "Your Rights",
    accent: "blue" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value: "Depending on your location, you may have certain rights regarding your personal data:",
      },
      {
        type: "list",
        items: [
          "Right to access — request a copy of the personal data we hold about you",
          "Right to correction — request correction of inaccurate or incomplete data",
          "Right to deletion — request erasure of your personal data",
          "Right to restrict processing — request we limit how we use your data",
          "Right to data portability — receive your data in a structured format",
          "Right to object — object to processing based on legitimate interests",
          "Right to withdraw consent — at any time, where processing is consent-based",
        ],
      },
      {
        type: "text",
        value:
          "To exercise any of these rights, contact us at info@websolsoffttech.in. We will respond to all legitimate requests within 30 days.",
      },
    ],
  },
  {
    id: "changes",
    num: "08",
    title: "Changes to This Policy",
    accent: "amber" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 4C7.6 4 4 7.6 4 12s3.6 8 8 8 8-3.6 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value:
          "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we do, we will revise the 'Last Updated' date at the top of this page.",
      },
      {
        type: "text",
        value:
          "We encourage you to review this policy periodically. Continued use of our services after any changes constitutes your acceptance of the updated policy.",
      },
    ],
  },
];

export default function PrivacyPolicy() {
  const rootRef = useRef<HTMLDivElement>(null);
  const rootInView = useInView(rootRef, { once: true, margin: "-60px" });
  const [activeSection, setActiveSection] = useState<string>("introduction");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');

        .pp-section {
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
       
        .pp-dotgrid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(26,95,212,0.08) 1px, transparent 1px);
          background-size: 28px 28px; opacity: 0.5;
        }
        .pp-watermark {
          position: absolute; bottom: -4%; right: -1%;
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: clamp(5rem, 18vw, 16rem);
          color: rgba(26,95,212,0.03);
          pointer-events: none; user-select: none;
          letter-spacing: -0.04em; line-height: 1; z-index: 0;
        }
        .pp-blob {
          position: absolute; border-radius: 50%; pointer-events: none;
        }
        .pp-blob-a {
          width: 500px; height: 500px; top: -180px; right: -120px;
          background: radial-gradient(circle, rgba(240,120,32,0.05) 0%, transparent 70%);
          filter: blur(80px);
        }
        .pp-blob-b {
          width: 420px; height: 420px; bottom: -140px; left: -100px;
          background: radial-gradient(circle, rgba(26,95,212,0.06) 0%, transparent 70%);
          filter: blur(80px);
        }

        .pp-inner {
          max-width: 1160px; margin: 0 auto;
          position: relative; z-index: 1;
        }

        /* ── Header ── */
        .pp-pill {
          display: inline-flex; align-items: center; gap: 0.9rem;
          font-size: 0.60rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--blue); opacity: 0.9; margin-bottom: 20px;
        }
        .pp-pill::before, .pp-pill::after {
          content: ''; display: block; width: 24px; height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--orange));
          border-radius: 2px; flex-shrink: 0;
        }
        .pp-headline {
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: clamp(2.4rem, 3.5vw, 4rem); color: var(--text);
          line-height: 1.1; letter-spacing: -0.01em; margin: 0 0 14px 0;
        }
        .pp-headline .hl-blue {
          font-style: italic;
          background: linear-gradient(100deg, var(--blue), var(--orange));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; filter: drop-shadow(0 0 10px var(--blue-glow));
        }
        .pp-headline .hl-orange { font-style: italic; color: var(--orange); }
        .pp-sub {
          font-size: 0.70rem; letter-spacing: 0.08em; color: var(--text-mid);
          line-height: 1.8; margin: 0 0 12px 0; max-width: 560px;
        }

        /* updated badge */
        .pp-updated {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--orange-light); border: 1px solid var(--border-warm);
          padding: 5px 14px; margin-bottom: 48px;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }
        .pp-updated-icon { color: var(--orange); flex-shrink: 0; }
        .pp-updated-text {
          font-size: 0.55rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-mid);
        }
        .pp-updated-text span { color: var(--orange); }

        .pp-divider {
          border: none; height: 1px;
          background: linear-gradient(90deg, var(--blue), transparent);
          opacity: 0.18; margin: 0 0 48px 0;
        }

        /* ── Body layout ── */
        .pp-body {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 40px;
          align-items: start;
        }

        /* ── Sidebar TOC ── */
        .pp-toc {
          position: sticky;
          top: 24px;
          background: #fff;
          border: 1px solid var(--border);
          padding: 20px;
          box-shadow: 0 4px 24px var(--blue-glow);
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
        }
        .pp-toc-label {
          font-size: 0.52rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--blue); margin-bottom: 14px;
          display: flex; align-items: center; gap: 8px;
        }
        .pp-toc-label::after {
          content: ''; flex: 1; height: 2px;
          background: linear-gradient(90deg, var(--blue), transparent);
          border-radius: 2px; opacity: 0.35;
        }
        .pp-toc-list { display: flex; flex-direction: column; gap: 4px; }
        .pp-toc-item {
          display: flex; align-items: center; gap: 8px;
          padding: 7px 10px; cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s; background: none;
          text-align: left; width: 100%;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
        }
        .pp-toc-item:hover { background: var(--blue-light); border-color: var(--border); }
        .pp-toc-item.active {
          background: var(--blue-light); border-color: rgba(26,95,212,0.22);
        }
        .pp-toc-item.active .pp-toc-num { color: var(--blue); }
        .pp-toc-item.active .pp-toc-name { color: var(--text); }
        .pp-toc-num {
          font-size: 0.50rem; letter-spacing: 0.18em; color: var(--text-faint);
          flex-shrink: 0; width: 20px;
        }
        .pp-toc-name {
          font-size: 0.58rem; letter-spacing: 0.06em; color: var(--text-muted);
          line-height: 1.3;
        }
        .pp-toc-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--blue); flex-shrink: 0;
          opacity: 0; transition: opacity 0.2s; margin-left: auto;
        }
        .pp-toc-item.active .pp-toc-dot { opacity: 1; }

        /* ── Content area ── */
        .pp-content { display: flex; flex-direction: column; gap: 20px; }

        /* section card */
        .pp-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 0;
          overflow: hidden;
          box-shadow: 0 4px 24px var(--blue-glow), 0 1px 4px rgba(0,0,0,0.03);
          position: relative;
          scroll-margin-top: 24px;
        }
        .pp-card::before, .pp-card::after {
          content: ''; position: absolute; width: 16px; height: 16px;
        }
        .pp-card.blue::before { top: -1px; left: -1px; border-top: 2px solid var(--blue); border-left: 2px solid var(--blue); }
        .pp-card.blue::after  { bottom: -1px; right: -1px; border-bottom: 2px solid var(--orange); border-right: 2px solid var(--orange); }
        .pp-card.amber::before { top: -1px; left: -1px; border-top: 2px solid var(--orange); border-left: 2px solid var(--orange); }
        .pp-card.amber::after  { bottom: -1px; right: -1px; border-bottom: 2px solid var(--blue); border-right: 2px solid var(--blue); }

        /* card header strip */
        .pp-card-header {
          display: flex; align-items: center; gap: 14px;
          padding: 18px 22px;
          border-bottom: 1px solid var(--border);
        }
        .pp-card-icon {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
        }
        .pp-card.blue .pp-card-icon { background: var(--blue-light); color: var(--blue); }
        .pp-card.amber .pp-card-icon { background: var(--orange-light); color: var(--orange); }

        .pp-card-num {
          font-size: 0.52rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--text-faint); flex-shrink: 0;
        }
        .pp-card-title {
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: 1.4rem; letter-spacing: 0.04em; color: var(--text);
          line-height: 1.2; flex: 1;
        }

        /* card body */
        .pp-card-body { padding: 22px; display: flex; flex-direction: column; gap: 14px; }

        .pp-text {
          font-size: 0.67rem; letter-spacing: 0.06em; color: var(--text-mid);
          line-height: 1.85; margin: 0;
        }

        /* highlight box */
        .pp-highlight {
          display: flex; align-items: flex-start; gap: 12px;
          background: var(--blue-light); border: 1px solid var(--border);
          padding: 14px 16px;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }
        .pp-highlight-icon { color: var(--blue); flex-shrink: 0; margin-top: 1px; }
        .pp-highlight-text {
          font-size: 0.63rem; letter-spacing: 0.06em; color: var(--text-mid);
          line-height: 1.75; margin: 0;
        }

        /* list */
        .pp-list { display: flex; flex-direction: column; gap: 8px; margin: 0; padding: 0; list-style: none; }
        .pp-list-item {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 0.64rem; letter-spacing: 0.06em; color: var(--text-mid); line-height: 1.7;
        }
        .pp-list-check {
          width: 16px; height: 16px; flex-shrink: 0; margin-top: 1px;
          display: flex; align-items: center; justify-content: center;
          clip-path: polygon(3px 0%, 100% 0%, calc(100% - 3px) 100%, 0% 100%);
          background: var(--blue-light); color: var(--blue);
          font-size: 9px; font-weight: 700;
        }

        /* contact footer card */
        .pp-contact-card {
          background: linear-gradient(135deg, var(--blue-light) 0%, #fff 50%, var(--orange-light) 100%);
          border: 1px solid var(--border); padding: 24px 28px;
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
          box-shadow: 0 4px 24px var(--blue-glow);
          display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap;
        }
        .pp-contact-label {
          font-size: 0.55rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--blue); margin-bottom: 6px;
          display: flex; align-items: center; gap: 8px;
        }
        .pp-contact-label::after {
          content: ''; width: 24px; height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--orange));
          border-radius: 2px; opacity: 0.5;
        }
        .pp-contact-title {
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: 1.5rem; color: var(--text); letter-spacing: -0.01em; margin: 0;
        }
        .pp-contact-title span { font-style: italic; color: var(--orange); }
        .pp-contact-info { display: flex; flex-direction: column; gap: 6px; }
        .pp-contact-row {
          display: flex; align-items: center; gap: 10px;
          font-size: 0.60rem; letter-spacing: 0.06em; color: var(--text-mid);
        }
        .pp-contact-icon-wrap {
          width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          background: var(--blue-light); color: var(--blue);
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
          flex-shrink: 0;
        }
        a.pp-contact-link { color: var(--blue); text-decoration: none; }
        a.pp-contact-link:hover { text-decoration: underline; }

        /* responsive */
        @media (max-width: 860px) {
          .pp-body { grid-template-columns: 1fr; }
          .pp-toc { position: static; display: flex; flex-wrap: wrap; gap: 6px; padding: 16px; clip-path: none; border-radius: 0; }
          .pp-toc-label { width: 100%; }
          .pp-toc-list { flex-direction: row; flex-wrap: wrap; gap: 6px; }
          .pp-toc-item { width: auto; clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%); }
          .pp-toc-dot { display: none; }
        }
        @media (max-width: 600px) {
          .pp-section { padding: 56px 20px 72px; }
        }
      `}</style>

      <section className="pp-section">
        <div className="pp-dotgrid" />
        <div className="pp-watermark">Privacy</div>
        <div className="pp-blob pp-blob-a" />
        <div className="pp-blob pp-blob-b" />

        <div className="pp-inner" ref={rootRef}>

          {/* ── Header ── */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={rootInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
            <span className="pp-pill">Legal</span>
          </motion.div>

          <motion.h2 className="pp-headline" initial={{ opacity: 0, y: 18 }} animate={rootInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}>
            Privacy <span className="hl-blue">Policy</span>
          </motion.h2>

          <motion.p className="pp-sub" initial={{ opacity: 0, y: 14 }} animate={rootInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.13, ease: [0.16, 1, 0.3, 1] }}>
            Your privacy matters to us. This policy explains how WebSOL Soffttech collects, uses, and protects your personal information.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={rootInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}>
            <div className="pp-updated">
              <span className="pp-updated-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </span>
              <span className="pp-updated-text">Last updated: <span>{lastUpdated}</span></span>
            </div>
          </motion.div>

          <hr className="pp-divider" />

          {/* ── Body ── */}
          <motion.div className="pp-body" initial={{ opacity: 0, y: 24 }} animate={rootInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}>

            {/* Sidebar TOC */}
            <div className="pp-toc">
              <div className="pp-toc-label">Contents</div>
              <div className="pp-toc-list">
                {sections.map(s => (
                  <button
                    key={s.id}
                    className={`pp-toc-item${activeSection === s.id ? " active" : ""}`}
                    onClick={() => {
                      setActiveSection(s.id);
                      document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    <span className="pp-toc-num">{s.num}</span>
                    <span className="pp-toc-name">{s.title}</span>
                    <span className="pp-toc-dot" />
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="pp-content">
              {sections.map((section, si) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  className={`pp-card ${section.accent}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={rootInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.28 + si * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  onViewportEnter={() => setActiveSection(section.id)}
                  viewport={{ margin: "-40% 0px -40% 0px" }}
                >
                  <div className="pp-card-header">
                    <div className="pp-card-icon">{section.icon}</div>
                    <span className="pp-card-num">{section.num}</span>
                    <h3 className="pp-card-title">{section.title}</h3>
                  </div>
                  <div className="pp-card-body">
                    {section.content.map((block, bi) => {
                      if (block.type === "text") return (
                        <p key={bi} className="pp-text">{block.value}</p>
                      );
                      if (block.type === "highlight") return (
                        <div key={bi} className="pp-highlight">
                          <span className="pp-highlight-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                          </span>
                          <p className="pp-highlight-text">{block.value}</p>
                        </div>
                      );
                      if (block.type === "list") return (
                        <ul key={bi} className="pp-list">
                          {block.items!.map((item, ii) => (
                            <li key={ii} className="pp-list-item">
                              <span className="pp-list-check">✓</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      );
                      return null;
                    })}
                  </div>
                </motion.div>
              ))}

              {/* Contact footer */}
              <div className="pp-contact-card">
                <div>
                  <div className="pp-contact-label">Have questions?</div>
                  <p className="pp-contact-title">Contact our <span>privacy team</span></p>
                </div>
                <div className="pp-contact-info">
                  <div className="pp-contact-row">
                    <div className="pp-contact-icon-wrap">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor" /></svg>
                    </div>
                    <a href="mailto:info@websolsoffttech.in" className="pp-contact-link">info@websolsoffttech.in</a>
                  </div>
                  <div className="pp-contact-row">
                    <div className="pp-contact-icon-wrap">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    </div>
                    <a href="https://wa.me/919233770627" target="_blank" rel="noopener noreferrer" className="pp-contact-link">+91 92337 70627</a>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>
    </>
  );
}