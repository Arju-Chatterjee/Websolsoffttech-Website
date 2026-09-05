import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const lastUpdated = "January 1, 2025";

const sections = [
  {
    id: "acceptance",
    num: "01",
    title: "Acceptance of Terms",
    accent: "blue" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value: "These Terms of Service ('Terms') govern your use of the services provided by WebSOL Soffttech ('Company', 'we', 'us', or 'our'), headquartered in Udaipur, Tripura, India. By engaging our services, signing a proposal, making a payment, or using our website, you agree to be legally bound by these Terms.",
      },
      {
        type: "text",
        value: "If you do not agree to these Terms in their entirety, you must not use our services. We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of our services following any changes constitutes your acceptance of the new Terms.",
      },
      {
        type: "highlight",
        value: "These Terms apply to all clients, visitors, and users of WebSOL Soffttech services, regardless of the service type — website development, digital marketing, design, or any other offering.",
      },
    ],
  },
  {
    id: "services",
    num: "02",
    title: "Services Provided",
    accent: "amber" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value: "WebSOL Soffttech provides a range of digital services including but not limited to:",
      },
      {
        type: "list",
        items: [
          "Dynamic & E-commerce Website Development",
          "Mobile App Development (iOS & Android)",
          "Google Ads, Meta Ads & Paid Marketing",
          "Search Engine Optimization (SEO)",
          "Social Media Marketing & Management",
          "Google My Business Setup & Optimization",
          "Video Production & Editing",
          "Graphic Designing & Logo Creation",
          "Content Writing & Copywriting",
          "Data Entry & Administrative Support",
        ],
      },
      {
        type: "text",
        value: "The specific scope of services, deliverables, timelines, and pricing will be defined in a separate project proposal or service agreement provided to you before work begins. In the event of any conflict between these Terms and a specific project agreement, the project agreement shall prevail.",
      },
    ],
  },
  {
    id: "client-obligations",
    num: "03",
    title: "Client Obligations",
    accent: "blue" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value: "To ensure smooth project delivery, clients are expected to fulfil the following obligations:",
      },
      {
        type: "list",
        items: [
          "Provide accurate, complete, and timely information, content, and materials required for the project",
          "Review and provide feedback on deliverables within the agreed timeframe",
          "Make payments on time as per the agreed payment schedule",
          "Designate a primary point of contact for communication",
          "Ensure all content and materials provided are owned or licensed by you and do not infringe any third-party rights",
          "Provide access to required platforms, accounts, and tools necessary for project completion",
          "Notify us immediately of any changes to project requirements or business circumstances",
        ],
      },
      {
        type: "highlight",
        value: "Delays caused by late client feedback, missing assets, or unresponsiveness may affect project timelines. WebSOL Soffttech shall not be held liable for such delays.",
      },
    ],
  },
  {
    id: "payments",
    num: "04",
    title: "Payments & Billing",
    accent: "amber" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M2 10h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="7" cy="15" r="1" fill="currentColor" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value: "All payments must be made in Indian Rupees (INR) unless otherwise agreed in writing. Our standard payment structure is milestone-based:",
      },
      {
        type: "list",
        items: [
          "Initial deposit (typically 40–50%) is required before project commencement",
          "Milestone payments are due upon completion of agreed project phases",
          "Final payment is due before the delivery of final files or project launch",
          "Monthly retainer services are billed at the beginning of each billing cycle",
          "Invoices are payable within 7 business days of issuance",
        ],
      },
      {
        type: "text",
        value: "Late payments may attract a penalty of 2% per month on the outstanding balance. We reserve the right to pause or suspend work on any project where payments are overdue by more than 14 days. Resumed work after payment of overdue amounts may be subject to revised timelines.",
      },
      {
        type: "highlight",
        value: "All prices quoted are exclusive of applicable taxes (GST) unless explicitly stated. GST will be charged as per prevailing Indian tax regulations.",
      },
    ],
  },
  {
    id: "revisions",
    num: "05",
    title: "Revisions & Scope Changes",
    accent: "blue" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 4C7.6 4 4 7.6 4 12s3.6 8 8 8 8-3.6 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value: "Each project includes a defined number of revision rounds as specified in the project proposal. Revisions are understood to be reasonable refinements within the original agreed scope — not new features, redesigns, or changes to the fundamental direction of the project.",
      },
      {
        type: "list",
        items: [
          "Revision requests must be submitted in writing (email or WhatsApp) within the defined review window",
          "Revisions beyond the agreed number will be quoted and billed separately",
          "Scope changes (new features, added pages, additional platforms) require a revised proposal and additional charges",
          "We reserve the right to re-evaluate timelines when significant scope changes are requested",
        ],
      },
      {
        type: "text",
        value: "We strive to accommodate reasonable requests and work collaboratively with clients. However, substantial changes to project scope after commencement will be treated as a new engagement and priced accordingly.",
      },
    ],
  },
  {
    id: "intellectual-property",
    num: "06",
    title: "Intellectual Property",
    accent: "amber" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14.5 9a2.5 2.5 0 10-2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 14v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value: "Upon receipt of full and final payment for a project, all custom-created deliverables (website code, design files, written content) are transferred to the client. Until full payment is received, all work-in-progress remains the intellectual property of WebSOL Soffttech.",
      },
      {
        type: "list",
        items: [
          "Third-party assets (stock images, fonts, plugins, themes) are subject to their respective license terms",
          "We retain the right to use completed work in our portfolio, case studies, and marketing materials unless explicitly agreed otherwise in writing",
          "Client is responsible for ensuring all content provided to us does not infringe any third-party intellectual property rights",
          "Open-source software used in projects is governed by its respective open-source licenses",
          "WebSOL Soffttech retains ownership of proprietary tools, methodologies, and internal frameworks developed independently",
        ],
      },
      {
        type: "highlight",
        value: "You may not reproduce, distribute, or sublicense deliverables to third parties without written permission, except in the normal course of your business operations for which the deliverable was created.",
      },
    ],
  },
  {
    id: "confidentiality",
    num: "07",
    title: "Confidentiality",
    accent: "blue" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value: "Both parties agree to keep confidential any proprietary, sensitive, or non-public information shared during the course of the engagement. This obligation survives termination of the agreement.",
      },
      {
        type: "list",
        items: [
          "We will not disclose your business strategies, financial information, or trade secrets to third parties",
          "Clients agree not to disclose our proprietary processes, pricing structures, or internal methodologies",
          "Confidential information does not include information already in the public domain or independently developed by either party",
          "We may disclose information if required by law or a valid court order",
        ],
      },
      {
        type: "text",
        value: "If you require a formal Non-Disclosure Agreement (NDA) before sharing sensitive business information, please notify us prior to project commencement. We are happy to accommodate this.",
      },
    ],
  },
  {
    id: "termination",
    num: "08",
    title: "Termination & Cancellation",
    accent: "amber" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
        <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value: "Either party may terminate a project engagement with written notice. The following conditions apply upon termination:",
      },
      {
        type: "list",
        items: [
          "The client is liable to pay for all work completed up to the date of termination",
          "The initial deposit is non-refundable once work has commenced",
          "Any completed and approved milestone payments are non-refundable",
          "Work-in-progress at the time of termination will be delivered upon receipt of outstanding payments",
          "WebSOL Soffttech may terminate engagement immediately if the client engages in abusive behaviour, fraudulent activity, or repeated failure to meet payment obligations",
        ],
      },
      {
        type: "text",
        value: "For retainer agreements, either party may terminate with 30 days written notice. Services will continue through the notice period and final payment for the notice period is due regardless of early termination.",
      },
    ],
  },
  {
    id: "liability",
    num: "09",
    title: "Limitation of Liability",
    accent: "blue" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value: "To the maximum extent permitted by applicable law, WebSOL Soffttech shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of revenue, profits, data, or business opportunities — arising from the use of our services.",
      },
      {
        type: "list",
        items: [
          "Our total liability for any claim shall not exceed the total fees paid by you for the specific service giving rise to the claim",
          "We are not liable for third-party service failures (hosting, payment gateways, ad platforms)",
          "We do not guarantee specific search engine rankings, advertising performance, or business outcomes",
          "We are not responsible for losses arising from client-provided inaccurate information or delayed approvals",
          "Force majeure events (natural disasters, internet outages, government actions) exempt us from liability",
        ],
      },
      {
        type: "highlight",
        value: "Digital marketing results vary based on market conditions, competition, and algorithm changes outside our control. We commit to best-practice execution but cannot guarantee specific ROI or traffic outcomes.",
      },
    ],
  },
  {
    id: "governing-law",
    num: "10",
    title: "Governing Law & Disputes",
    accent: "amber" as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 6l9-4 9 4v6c0 5.25-3.75 9.75-9 11-5.25-1.25-9-5.75-9-11V6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value: "These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from or relating to these Terms or our services shall be subject to the exclusive jurisdiction of the courts located in Tripura, India.",
      },
      {
        type: "list",
        items: [
          "We encourage resolving disputes amicably through direct communication first",
          "If informal resolution fails, disputes will be referred to mediation before litigation",
          "Legal proceedings, if necessary, shall be conducted in Tripura, India",
          "The prevailing party in any dispute may seek recovery of reasonable legal fees",
        ],
      },
      {
        type: "text",
        value: "If any provision of these Terms is found to be unenforceable or invalid, that provision will be modified to the minimum extent necessary to make it enforceable. All other provisions shall remain in full force and effect.",
      },
    ],
  },
];

export default function TermsOfService() {
  const rootRef = useRef<HTMLDivElement>(null);
  const rootInView = useInView(rootRef, { once: true, margin: "-60px" });
  const [activeSection, setActiveSection] = useState<string>("acceptance");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');

        .tos-section {
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
        
        .tos-dotgrid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(26,95,212,0.08) 1px, transparent 1px);
          background-size: 28px 28px; opacity: 0.5;
        }
        .tos-watermark {
          position: absolute; bottom: -4%; right: -1%;
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: clamp(4rem, 16vw, 14rem);
          color: rgba(26,95,212,0.03);
          pointer-events: none; user-select: none;
          letter-spacing: -0.04em; line-height: 1; z-index: 0;
        }
        .tos-blob {
          position: absolute; border-radius: 50%; pointer-events: none;
        }
        .tos-blob-a {
          width: 500px; height: 500px; top: -180px; right: -120px;
          background: radial-gradient(circle, rgba(240,120,32,0.05) 0%, transparent 70%);
          filter: blur(80px);
        }
        .tos-blob-b {
          width: 420px; height: 420px; bottom: -140px; left: -100px;
          background: radial-gradient(circle, rgba(26,95,212,0.06) 0%, transparent 70%);
          filter: blur(80px);
        }

        .tos-inner {
          max-width: 1160px; margin: 0 auto;
          position: relative; z-index: 1;
        }

        /* ── Header ── */
        .tos-pill {
          display: inline-flex; align-items: center; gap: 0.9rem;
          font-size: 0.60rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--blue); opacity: 0.9; margin-bottom: 20px;
        }
        .tos-pill::before, .tos-pill::after {
          content: ''; display: block; width: 24px; height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--orange));
          border-radius: 2px; flex-shrink: 0;
        }
        .tos-headline {
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: clamp(2.4rem, 3.5vw, 4rem); color: var(--text);
          line-height: 1.1; letter-spacing: -0.01em; margin: 0 0 14px 0;
        }
        .tos-headline .hl-blue {
          font-style: italic;
          background: linear-gradient(100deg, var(--blue), var(--orange));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; filter: drop-shadow(0 0 10px var(--blue-glow));
        }
        .tos-headline .hl-orange { font-style: italic; color: var(--orange); }

        .tos-sub {
          font-size: 0.70rem; letter-spacing: 0.08em; color: var(--text-mid);
          line-height: 1.8; margin: 0 0 12px 0; max-width: 560px;
        }

        /* meta row */
        .tos-meta-row {
          display: flex; align-items: center; gap: 12px;
          flex-wrap: wrap; margin-bottom: 48px;
        }
        .tos-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 5px 14px;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          font-size: 0.55rem; letter-spacing: 0.14em; text-transform: uppercase;
        }
        .tos-badge-updated {
          background: var(--orange-light); border: 1px solid var(--border-warm);
          color: var(--text-mid);
        }
        .tos-badge-updated span { color: var(--orange); }
        .tos-badge-count {
          background: var(--blue-light); border: 1px solid var(--border);
          color: var(--text-mid);
        }
        .tos-badge-count span { color: var(--blue); }
        .tos-badge-icon { flex-shrink: 0; }

        .tos-divider {
          border: none; height: 1px;
          background: linear-gradient(90deg, var(--blue), transparent);
          opacity: 0.18; margin: 0 0 48px 0;
        }

        /* ── Body ── */
        .tos-body {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 40px; align-items: start;
        }

        /* ── Sidebar TOC ── */
        .tos-toc {
          position: sticky; top: 24px;
          background: #fff; border: 1px solid var(--border);
          padding: 20px; box-shadow: 0 4px 24px var(--blue-glow);
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
        }
        .tos-toc-label {
          font-size: 0.52rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--blue); margin-bottom: 14px;
          display: flex; align-items: center; gap: 8px;
        }
        .tos-toc-label::after {
          content: ''; flex: 1; height: 2px;
          background: linear-gradient(90deg, var(--blue), transparent);
          border-radius: 2px; opacity: 0.35;
        }
        .tos-toc-list { display: flex; flex-direction: column; gap: 3px; }
        .tos-toc-item {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 10px; cursor: pointer;
          border: 1px solid transparent; background: none;
          text-align: left; width: 100%;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
          transition: all 0.2s;
        }
        .tos-toc-item:hover { background: var(--blue-light); border-color: var(--border); }
        .tos-toc-item.active { background: var(--blue-light); border-color: rgba(26,95,212,0.22); }
        .tos-toc-item.active .tos-toc-num { color: var(--blue); }
        .tos-toc-item.active .tos-toc-name { color: var(--text); }
        .tos-toc-num {
          font-size: 0.48rem; letter-spacing: 0.18em; color: var(--text-faint);
          flex-shrink: 0; width: 18px;
        }
        .tos-toc-name {
          font-size: 0.56rem; letter-spacing: 0.05em; color: var(--text-muted);
          line-height: 1.3; flex: 1;
        }
        .tos-toc-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--blue); flex-shrink: 0;
          opacity: 0; transition: opacity 0.2s; margin-left: auto;
        }
        .tos-toc-item.active .tos-toc-dot { opacity: 1; }

        /* ── Content ── */
        .tos-content { display: flex; flex-direction: column; gap: 18px; }

        .tos-card {
          background: #fff; border: 1px solid var(--border);
          border-radius: 0; overflow: hidden;
          box-shadow: 0 4px 24px var(--blue-glow), 0 1px 4px rgba(0,0,0,0.03);
          position: relative; scroll-margin-top: 24px;
        }
        .tos-card::before, .tos-card::after {
          content: ''; position: absolute; width: 16px; height: 16px;
        }
        .tos-card.blue::before  { top: -1px; left: -1px; border-top: 2px solid var(--blue); border-left: 2px solid var(--blue); }
        .tos-card.blue::after   { bottom: -1px; right: -1px; border-bottom: 2px solid var(--orange); border-right: 2px solid var(--orange); }
        .tos-card.amber::before { top: -1px; left: -1px; border-top: 2px solid var(--orange); border-left: 2px solid var(--orange); }
        .tos-card.amber::after  { bottom: -1px; right: -1px; border-bottom: 2px solid var(--blue); border-right: 2px solid var(--blue); }

        .tos-card-header {
          display: flex; align-items: center; gap: 14px;
          padding: 16px 22px; border-bottom: 1px solid var(--border);
        }
        .tos-card-icon {
          width: 36px; height: 36px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
        }
        .tos-card.blue .tos-card-icon  { background: var(--blue-light); color: var(--blue); }
        .tos-card.amber .tos-card-icon { background: var(--orange-light); color: var(--orange); }
        .tos-card-num {
          font-size: 0.52rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--text-faint); flex-shrink: 0;
        }
        .tos-card-title {
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: 1.35rem; letter-spacing: 0.04em; color: var(--text);
          line-height: 1.2; flex: 1;
        }

        .tos-card-body { padding: 20px 22px; display: flex; flex-direction: column; gap: 14px; }

        .tos-text {
          font-size: 0.66rem; letter-spacing: 0.06em; color: var(--text-mid);
          line-height: 1.85; margin: 0;
        }

        .tos-highlight {
          display: flex; align-items: flex-start; gap: 12px;
          background: var(--blue-light); border: 1px solid var(--border);
          padding: 13px 16px;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }
        .tos-card.amber .tos-highlight {
          background: var(--orange-light); border-color: var(--border-warm);
        }
        .tos-highlight-icon { flex-shrink: 0; margin-top: 1px; }
        .tos-card.blue  .tos-highlight-icon { color: var(--blue); }
        .tos-card.amber .tos-highlight-icon { color: var(--orange); }
        .tos-highlight-text {
          font-size: 0.63rem; letter-spacing: 0.06em; color: var(--text-mid);
          line-height: 1.75; margin: 0;
        }

        .tos-list { display: flex; flex-direction: column; gap: 7px; margin: 0; padding: 0; list-style: none; }
        .tos-list-item {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 0.63rem; letter-spacing: 0.06em; color: var(--text-mid); line-height: 1.7;
        }
        .tos-list-check {
          width: 16px; height: 16px; flex-shrink: 0; margin-top: 1px;
          display: flex; align-items: center; justify-content: center;
          clip-path: polygon(3px 0%, 100% 0%, calc(100% - 3px) 100%, 0% 100%);
          font-size: 9px; font-weight: 700;
        }
        .tos-card.blue  .tos-list-check { background: var(--blue-light); color: var(--blue); }
        .tos-card.amber .tos-list-check { background: var(--orange-light); color: var(--orange); }

        /* agreement summary card */
        .tos-summary-card {
          background: linear-gradient(135deg, var(--blue-light) 0%, #fff 50%, var(--orange-light) 100%);
          border: 1px solid var(--border); padding: 28px 32px;
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
          box-shadow: 0 4px 24px var(--blue-glow);
        }
        .tos-summary-label {
          font-size: 0.55rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--blue); margin-bottom: 10px;
          display: flex; align-items: center; gap: 8px;
        }
        .tos-summary-label::after {
          content: ''; width: 24px; height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--orange));
          border-radius: 2px; opacity: 0.5;
        }
        .tos-summary-title {
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: 1.5rem; color: var(--text); letter-spacing: -0.01em;
          margin: 0 0 16px 0;
        }
        .tos-summary-title span { font-style: italic; color: var(--orange); }
        .tos-summary-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
          margin-bottom: 20px;
        }
        .tos-summary-item {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.60rem; letter-spacing: 0.06em; color: var(--text-mid);
        }
        .tos-summary-dot {
          width: 6px; height: 6px; border-radius: 50%;
          flex-shrink: 0;
        }
        .tos-summary-dot.blue   { background: var(--blue); }
        .tos-summary-dot.orange { background: var(--orange); }

        /* contact row in summary */
        .tos-summary-contact {
          display: flex; gap: 12px; flex-wrap: wrap;
          padding-top: 16px; border-top: 1px solid var(--border);
        }
        .tos-summary-contact-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 20px; font-family: 'DM Mono', monospace;
          font-size: 0.60rem; letter-spacing: 0.15em; text-transform: uppercase;
          text-decoration: none; transition: all 0.3s; position: relative; overflow: hidden;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }
        .tos-summary-contact-btn.primary {
          background: linear-gradient(135deg, var(--orange), var(--orange-dark));
          color: #fff; border: none;
          box-shadow: 0 4px 14px var(--orange-glow);
        }
        .tos-summary-contact-btn.primary::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--blue), #1249aa);
          opacity: 0; transition: opacity 0.3s;
        }
        .tos-summary-contact-btn.primary:hover::before { opacity: 1; }
        .tos-summary-contact-btn.primary:hover { transform: translateY(-2px); box-shadow: 0 4px 18px var(--blue-glow); }
        .tos-summary-contact-btn.secondary {
          background: transparent;
          color: var(--blue); border: 1px solid var(--border);
        }
        .tos-summary-contact-btn.secondary:hover { background: var(--blue-light); }
        .tos-summary-contact-btn span, .tos-summary-contact-btn svg { position: relative; z-index: 1; }

        /* responsive */
        @media (max-width: 860px) {
          .tos-body { grid-template-columns: 1fr; }
          .tos-toc { position: static; clip-path: none; }
          .tos-toc-list { flex-direction: row; flex-wrap: wrap; gap: 6px; }
          .tos-toc-item { width: auto; clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%); }
          .tos-toc-dot { display: none; }
          .tos-summary-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .tos-section { padding: 56px 20px 72px; }
          .tos-meta-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <section className="tos-section">
        <div className="tos-dotgrid" />
        <div className="tos-watermark">Terms</div>
        <div className="tos-blob tos-blob-a" />
        <div className="tos-blob tos-blob-b" />

        <div className="tos-inner" ref={rootRef}>

          {/* ── Header ── */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={rootInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
            <span className="tos-pill">Legal</span>
          </motion.div>

          <motion.h2 className="tos-headline" initial={{ opacity: 0, y: 18 }} animate={rootInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}>
            Terms of <span className="hl-blue">Service</span>
          </motion.h2>

          <motion.p className="tos-sub" initial={{ opacity: 0, y: 14 }} animate={rootInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.13, ease: [0.16, 1, 0.3, 1] }}>
            Please read these terms carefully before engaging our services. By working with WebSOL Soffttech, you agree to the conditions outlined below.
          </motion.p>

          <motion.div className="tos-meta-row" initial={{ opacity: 0, y: 10 }} animate={rootInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}>
            <div className="tos-badge tos-badge-updated">
              <span className="tos-badge-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </span>
              Last updated: <span>{lastUpdated}</span>
            </div>
            <div className="tos-badge tos-badge-count">
              <span className="tos-badge-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </span>
              <span>{sections.length}</span> sections
            </div>
          </motion.div>

          <hr className="tos-divider" />

          {/* ── Body ── */}
          <motion.div className="tos-body" initial={{ opacity: 0, y: 24 }} animate={rootInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}>

            {/* Sidebar TOC */}
            <div className="tos-toc">
              <div className="tos-toc-label">Contents</div>
              <div className="tos-toc-list">
                {sections.map(s => (
                  <button
                    key={s.id}
                    className={`tos-toc-item${activeSection === s.id ? " active" : ""}`}
                    onClick={() => {
                      setActiveSection(s.id);
                      document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    <span className="tos-toc-num">{s.num}</span>
                    <span className="tos-toc-name">{s.title}</span>
                    <span className="tos-toc-dot" />
                  </button>
                ))}
              </div>
            </div>

            {/* Content cards */}
            <div className="tos-content">
              {sections.map((section, si) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  className={`tos-card ${section.accent}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={rootInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.28 + si * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  onViewportEnter={() => setActiveSection(section.id)}
                  viewport={{ margin: "-40% 0px -40% 0px" }}
                >
                  <div className="tos-card-header">
                    <div className="tos-card-icon">{section.icon}</div>
                    <span className="tos-card-num">{section.num}</span>
                    <h3 className="tos-card-title">{section.title}</h3>
                  </div>
                  <div className="tos-card-body">
                    {section.content.map((block, bi) => {
                      if (block.type === "text") return (
                        <p key={bi} className="tos-text">{block.value}</p>
                      );
                      if (block.type === "highlight") return (
                        <div key={bi} className="tos-highlight">
                          <span className="tos-highlight-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                          </span>
                          <p className="tos-highlight-text">{block.value}</p>
                        </div>
                      );
                      if (block.type === "list") return (
                        <ul key={bi} className="tos-list">
                          {block.items!.map((item, ii) => (
                            <li key={ii} className="tos-list-item">
                              <span className="tos-list-check">✓</span>
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

              {/* Agreement summary footer */}
              <div className="tos-summary-card">
                <div className="tos-summary-label">By using our services, you agree to</div>
                <p className="tos-summary-title">Key <span>takeaways</span></p>
                <div className="tos-summary-grid">
                  {[
                    { text: "Milestone-based payments with transparent billing", color: "blue" },
                    { text: "IP transfers upon full final payment", color: "orange" },
                    { text: "Defined revision rounds per proposal", color: "blue" },
                    { text: "30-day notice for retainer cancellations", color: "orange" },
                    { text: "Mutual confidentiality obligations", color: "blue" },
                    { text: "Disputes governed by Tripura, India courts", color: "orange" },
                  ].map((item, i) => (
                    <div key={i} className="tos-summary-item">
                      <span className={`tos-summary-dot ${item.color}`} />
                      {item.text}
                    </div>
                  ))}
                </div>
                <div className="tos-summary-contact">
                  <a href="https://wa.me/919233770627" target="_blank" rel="noopener noreferrer" className="tos-summary-contact-btn primary">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    <span>Discuss terms</span>
                  </a>
                  <a href="mailto:info@websolsoffttech.in" className="tos-summary-contact-btn secondary">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor" /></svg>
                    <span>Email us</span>
                  </a>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>
    </>
  );
}
