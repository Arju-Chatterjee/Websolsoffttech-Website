import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const lastUpdated = "January 1, 2025";

// ── Discriminated union for content blocks ──────────────────────────────────
type TextBlock = { type: "text"; value: string };
type HighlightBlock = { type: "highlight"; value: string };
type ListBlock = { type: "list"; items: string[] };
type ServiceRow = { service: string; policy: string };
type TableBlock = { type: "service-table"; rows: ServiceRow[] };
type StepItem = { step: string; title: string; desc: string };
type StepsBlock = { type: "steps"; items: StepItem[] };
type ContentBlock = TextBlock | HighlightBlock | ListBlock | TableBlock | StepsBlock;

interface Section {
  id: string;
  num: string;
  title: string;
  accent: "blue" | "amber";
  icon: React.ReactNode;
  content: ContentBlock[];
}

const sections: Section[] = [
  {
    id: "overview",
    num: "01",
    title: "Policy Overview",
    accent: "blue",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value: "At WebSOL Soffttech, we are committed to delivering high-quality digital services and ensuring complete client satisfaction. This Refund Policy outlines the conditions under which refunds may or may not be issued for our services.",
      },
      {
        type: "text",
        value: "Due to the nature of digital services — where time, expertise, and resources are invested from the moment work begins — refunds are evaluated on a case-by-case basis following the criteria outlined in this policy.",
      },
      {
        type: "highlight",
        value: "By making a payment to WebSOL Soffttech, you acknowledge that you have read, understood, and agree to this Refund Policy in its entirety.",
      },
    ],
  },
  {
    id: "non-refundable",
    num: "02",
    title: "Non-Refundable Payments",
    accent: "amber",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
        <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value: "The following payments are strictly non-refundable under all circumstances:",
      },
      {
        type: "list",
        items: [
          "Initial deposits and advance payments made to commence any project",
          "Payments for work already completed and delivered (whether approved or not)",
          "Milestone payments that have been released upon completion of a defined project phase",
          "Fees paid for consultations, strategy sessions, or discovery calls",
          "Payments for services already partially or fully rendered (e.g. SEO, ad management, social media)",
          "Third-party costs incurred on your behalf — domain registration, hosting, stock media, ad spend, premium plugins or tools",
          "Rush fees or expedited delivery charges, regardless of outcome",
          "Retainer fees for the current active billing cycle once work has commenced",
        ],
      },
      {
        type: "highlight",
        value: "Third-party expenses (ad budgets, domain fees, hosting, licensed assets) are non-refundable as these are paid directly to external vendors on your behalf and cannot be recovered by us.",
      },
    ],
  },
  {
    id: "eligible-refunds",
    num: "03",
    title: "Eligible Refund Situations",
    accent: "blue",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value: "A refund may be considered in the following limited circumstances:",
      },
      {
        type: "list",
        items: [
          "WebSOL Soffttech cancels or is unable to commence the project after receiving payment, and no work has been started",
          "A deliverable fundamentally fails to meet the agreed written specifications, and we are unable to rectify it after a reasonable number of revision attempts",
          "A duplicate payment has been made in error — the duplicate amount will be refunded in full",
          "The project is cancelled before any work has commenced and within 48 hours of the initial payment",
          "We are unable to deliver the project within double the agreed timeline with no communicable reason",
        ],
      },
      {
        type: "text",
        value: "Refund eligibility is assessed solely at the discretion of WebSOL Soffttech management. Approval of a refund request does not set a precedent for future requests.",
      },
    ],
  },
  {
    id: "partial-refunds",
    num: "04",
    title: "Partial Refunds",
    accent: "amber",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value: "In cases where a project is cancelled mid-way through execution, a partial refund may be issued based on the proportion of work not yet completed at the time of cancellation. The refund amount will be calculated as follows:",
      },
      {
        type: "list",
        items: [
          "Total project value is broken down into work units corresponding to agreed deliverables",
          "Completed work units (whether delivered or in review) are non-refundable",
          "The remaining unstarted work units may be refunded at our standard rate",
          "Administrative, consultation, and overhead costs (typically 15–20% of project value) are always deducted",
          "Any third-party costs already incurred are deducted before calculating the partial refund",
        ],
      },
      {
        type: "highlight",
        value: "Partial refunds are issued at WebSOL Soffttech's sole discretion and are not guaranteed. Each case is reviewed individually based on documented project progress.",
      },
    ],
  },
  {
    id: "service-specific",
    num: "05",
    title: "Service-Specific Policies",
    accent: "blue",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" />
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value: "Different services carry different refund considerations:",
      },
      {
        type: "service-table",
        rows: [
          { service: "Website Development", policy: "Deposit non-refundable. Partial refund possible on unstarted phases only." },
          { service: "Mobile App Development", policy: "Deposit non-refundable. Refund evaluated per milestone completion status." },
          { service: "Digital Marketing / SEO", policy: "Non-refundable once campaign is live. First month's retainer is non-refundable." },
          { service: "Google Ads / Meta Ads", policy: "Management fees non-refundable. Ad spend refunds subject to platform policies." },
          { service: "Graphic Design / Logo", policy: "Non-refundable after first concept presentation." },
          { service: "Video Production", policy: "Non-refundable once filming or editing has commenced." },
          { service: "Content Writing", policy: "Non-refundable once drafts are delivered for review." },
          { service: "Social Media Management", policy: "Current month's fee non-refundable. Cancel with 30 days' notice." },
          { service: "Google My Business", policy: "Non-refundable once setup is initiated." },
          { service: "Data Entry", policy: "Non-refundable once work has commenced." },
        ],
      },
    ],
  },
  {
    id: "cancellation",
    num: "06",
    title: "Cancellation Policy",
    accent: "amber",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9 15l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value: "Clients wishing to cancel a project or retainer service must notify WebSOL Soffttech in writing via email or WhatsApp. The following cancellation terms apply:",
      },
      {
        type: "list",
        items: [
          "One-time projects: cancellation within 48 hours of payment and before work begins may receive a full refund minus processing fees",
          "One-time projects: cancellation after work has commenced — payment due for all completed work; partial refund for unstarted phases (see Section 04)",
          "Monthly retainers: cancellation requires 30 days written notice; current billing cycle is non-refundable",
          "Annual retainers: cancellation after 3 months may receive a pro-rata refund for unused months, minus an early termination fee of one month's retainer",
          "We reserve the right to cancel any engagement if a client engages in abusive behaviour, fraud, or fails to meet payment obligations",
        ],
      },
      {
        type: "highlight",
        value: "Verbal cancellation requests are not accepted. All cancellations must be submitted in writing to info@websolsoffttech.in and are effective from the date of written acknowledgement by our team.",
      },
    ],
  },
  {
    id: "refund-process",
    num: "07",
    title: "Refund Request Process",
    accent: "blue",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value: "To initiate a refund request, please follow the steps below:",
      },
      {
        type: "steps",
        items: [
          { step: "01", title: "Submit a written request", desc: "Email info@websolsoffttech.in with subject line 'Refund Request — [Your Project Name]'" },
          { step: "02", title: "Include required details", desc: "Provide your full name, project name, payment date, amount paid, and reason for the refund request" },
          { step: "03", title: "Review period", desc: "Our team will review your request and respond within 5–7 business days with a decision" },
          { step: "04", title: "Resolution", desc: "If approved, refunds are processed within 7–14 business days to the original payment method" },
        ],
      },
      {
        type: "text",
        value: "Refund requests submitted more than 30 days after the payment date will not be considered. We reserve the right to request additional documentation to process your claim.",
      },
    ],
  },
  {
    id: "disputes",
    num: "08",
    title: "Disputes & Chargebacks",
    accent: "amber",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 6l9-4 9 4v6c0 5.25-3.75 9.75-9 11-5.25-1.25-9-5.75-9-11V6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    content: [
      {
        type: "text",
        value: "We strongly encourage clients to contact us directly to resolve any billing concerns before initiating a chargeback or payment dispute with their bank or payment provider. Most issues can be resolved quickly through direct communication.",
      },
      {
        type: "list",
        items: [
          "Unauthorized chargebacks for legitimate services rendered may result in immediate project suspension",
          "We reserve the right to submit documented evidence of work completed to contest fraudulent chargebacks",
          "Chargeback fees imposed by payment processors will be passed on to the client",
          "Clients who initiate chargebacks without prior written notice may be blacklisted from future services",
        ],
      },
      {
        type: "highlight",
        value: "If you have a genuine concern about a charge, please reach out to us first at info@websolsoffttech.in or +91 92337 70627. We are committed to resolving disputes fairly and transparently.",
      },
    ],
  },
];

// ── Render helpers ──────────────────────────────────────────────────────────
function RenderBlock({ block }: { block: ContentBlock }) {
  if (block.type === "text") {
    return <p className="rp-text">{block.value}</p>;
  }

  if (block.type === "highlight") {
    return (
      <div className="rp-highlight">
        <span className="rp-highlight-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <p className="rp-highlight-text">{block.value}</p>
      </div>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="rp-list">
        {block.items.map((item, ii) => (
          <li key={ii} className="rp-list-item">
            <span className="rp-list-check">✓</span>
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "service-table") {
    return (
      <div style={{ overflowX: "auto" }}>
        <table className="rp-table">
          <thead className="rp-table-head">
            <tr>
              <th>Service</th>
              <th>Refund Policy</th>
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri} className="rp-table-row">
                <td className="rp-table-service">
                  <span
                    className="rp-table-dot"
                    style={{ background: ri % 2 === 0 ? "var(--blue)" : "var(--orange)" }}
                  />
                  {row.service}
                </td>
                <td className="rp-table-policy">{row.policy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (block.type === "steps") {
    return (
      <div className="rp-steps">
        {block.items.map((item, ii) => (
          <div key={ii} className="rp-step">
            <div className="rp-step-left">
              <div className="rp-step-num">{item.step}</div>
              <div className="rp-step-line" />
            </div>
            <div className="rp-step-content">
              <div className="rp-step-title">{item.title}</div>
              <p className="rp-step-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

// ── Component ───────────────────────────────────────────────────────────────
export default function RefundPolicy() {
  const rootRef = useRef<HTMLDivElement>(null);
  const rootInView = useInView(rootRef, { once: true, margin: "-60px" });
  const [activeSection, setActiveSection] = useState<string>("overview");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');

        .rp-section {
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

        .rp-dotgrid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(26,95,212,0.08) 1px, transparent 1px);
          background-size: 28px 28px; opacity: 0.5;
        }
        .rp-watermark {
          position: absolute; bottom: -4%; right: -1%;
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: clamp(4rem, 14vw, 13rem);
          color: rgba(26,95,212,0.03);
          pointer-events: none; user-select: none;
          letter-spacing: -0.04em; line-height: 1; z-index: 0;
        }
        .rp-blob {
          position: absolute; border-radius: 50%; pointer-events: none;
        }
        .rp-blob-a {
          width: 500px; height: 500px; top: -180px; right: -120px;
          background: radial-gradient(circle, rgba(240,120,32,0.05) 0%, transparent 70%);
          filter: blur(80px);
        }
        .rp-blob-b {
          width: 420px; height: 420px; bottom: -140px; left: -100px;
          background: radial-gradient(circle, rgba(26,95,212,0.06) 0%, transparent 70%);
          filter: blur(80px);
        }

        .rp-inner {
          max-width: 1160px; margin: 0 auto;
          position: relative; z-index: 1;
        }

        .rp-pill {
          display: inline-flex; align-items: center; gap: 0.9rem;
          font-size: 0.60rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--blue); opacity: 0.9; margin-bottom: 20px;
        }
        .rp-pill::before, .rp-pill::after {
          content: ''; display: block; width: 24px; height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--orange));
          border-radius: 2px; flex-shrink: 0;
        }
        .rp-headline {
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: clamp(2.4rem, 3.5vw, 4rem); color: var(--text);
          line-height: 1.1; letter-spacing: -0.01em; margin: 0 0 14px 0;
        }
        .rp-headline .hl-blue {
          font-style: italic;
          background: linear-gradient(100deg, var(--blue), var(--orange));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; filter: drop-shadow(0 0 10px var(--blue-glow));
        }
        .rp-headline .hl-orange { font-style: italic; color: var(--orange); }
        .rp-sub {
          font-size: 0.70rem; letter-spacing: 0.08em; color: var(--text-mid);
          line-height: 1.8; margin: 0 0 12px 0; max-width: 560px;
        }

        .rp-meta-row {
          display: flex; align-items: center; gap: 12px;
          flex-wrap: wrap; margin-bottom: 48px;
        }
        .rp-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 5px 14px;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          font-size: 0.55rem; letter-spacing: 0.14em; text-transform: uppercase;
        }
        .rp-badge-updated {
          background: var(--orange-light); border: 1px solid var(--border-warm); color: var(--text-mid);
        }
        .rp-badge-updated span { color: var(--orange); }
        .rp-badge-note {
          background: var(--blue-light); border: 1px solid var(--border); color: var(--text-mid);
        }
        .rp-badge-note span { color: var(--blue); }

        .rp-divider {
          border: none; height: 1px;
          background: linear-gradient(90deg, var(--blue), transparent);
          opacity: 0.18; margin: 0 0 48px 0;
        }

        .rp-body {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 40px; align-items: start;
        }

        .rp-toc {
          position: sticky; top: 24px;
          background: #fff; border: 1px solid var(--border);
          padding: 20px; box-shadow: 0 4px 24px var(--blue-glow);
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
        }
        .rp-toc-label {
          font-size: 0.52rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--blue); margin-bottom: 14px;
          display: flex; align-items: center; gap: 8px;
        }
        .rp-toc-label::after {
          content: ''; flex: 1; height: 2px;
          background: linear-gradient(90deg, var(--blue), transparent);
          border-radius: 2px; opacity: 0.35;
        }
        .rp-toc-list { display: flex; flex-direction: column; gap: 3px; }
        .rp-toc-item {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 10px; cursor: pointer;
          border: 1px solid transparent; background: none;
          text-align: left; width: 100%;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
          transition: all 0.2s;
        }
        .rp-toc-item:hover { background: var(--blue-light); border-color: var(--border); }
        .rp-toc-item.active { background: var(--blue-light); border-color: rgba(26,95,212,0.22); }
        .rp-toc-item.active .rp-toc-num { color: var(--blue); }
        .rp-toc-item.active .rp-toc-name { color: var(--text); }
        .rp-toc-num {
          font-size: 0.48rem; letter-spacing: 0.18em; color: var(--text-faint);
          flex-shrink: 0; width: 18px;
        }
        .rp-toc-name {
          font-size: 0.56rem; letter-spacing: 0.05em; color: var(--text-muted);
          line-height: 1.3; flex: 1;
        }
        .rp-toc-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--blue); flex-shrink: 0;
          opacity: 0; transition: opacity 0.2s; margin-left: auto;
        }
        .rp-toc-item.active .rp-toc-dot { opacity: 1; }

        .rp-content { display: flex; flex-direction: column; gap: 18px; }

        .rp-card {
          background: #fff; border: 1px solid var(--border);
          overflow: hidden;
          box-shadow: 0 4px 24px var(--blue-glow), 0 1px 4px rgba(0,0,0,0.03);
          position: relative; scroll-margin-top: 24px;
        }
        .rp-card::before, .rp-card::after {
          content: ''; position: absolute; width: 16px; height: 16px;
          pointer-events: none; z-index: 2;
        }
        .rp-card.blue::before  { top: -1px; left: -1px; border-top: 2px solid var(--blue); border-left: 2px solid var(--blue); }
        .rp-card.blue::after   { bottom: -1px; right: -1px; border-bottom: 2px solid var(--orange); border-right: 2px solid var(--orange); }
        .rp-card.amber::before { top: -1px; left: -1px; border-top: 2px solid var(--orange); border-left: 2px solid var(--orange); }
        .rp-card.amber::after  { bottom: -1px; right: -1px; border-bottom: 2px solid var(--blue); border-right: 2px solid var(--blue); }

        .rp-card-header {
          display: flex; align-items: center; gap: 14px;
          padding: 16px 22px; border-bottom: 1px solid var(--border);
        }
        .rp-card-icon {
          width: 36px; height: 36px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
        }
        .rp-card.blue  .rp-card-icon  { background: var(--blue-light); color: var(--blue); }
        .rp-card.amber .rp-card-icon  { background: var(--orange-light); color: var(--orange); }
        .rp-card-num {
          font-size: 0.52rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--text-faint); flex-shrink: 0;
        }
        .rp-card-title {
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: 1.35rem; letter-spacing: 0.04em; color: var(--text);
          line-height: 1.2; flex: 1; margin: 0;
        }

        .rp-card-body { padding: 20px 22px; display: flex; flex-direction: column; gap: 14px; }

        .rp-text {
          font-size: 0.66rem; letter-spacing: 0.06em; color: var(--text-mid);
          line-height: 1.85; margin: 0;
        }

        .rp-highlight {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 13px 16px;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }
        .rp-card.blue  .rp-highlight { background: var(--blue-light); border: 1px solid var(--border); }
        .rp-card.amber .rp-highlight { background: var(--orange-light); border: 1px solid var(--border-warm); }
        .rp-highlight-icon { flex-shrink: 0; margin-top: 1px; }
        .rp-card.blue  .rp-highlight-icon { color: var(--blue); }
        .rp-card.amber .rp-highlight-icon { color: var(--orange); }
        .rp-highlight-text {
          font-size: 0.63rem; letter-spacing: 0.06em; color: var(--text-mid);
          line-height: 1.75; margin: 0;
        }

        .rp-list { display: flex; flex-direction: column; gap: 7px; margin: 0; padding: 0; list-style: none; }
        .rp-list-item {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 0.63rem; letter-spacing: 0.06em; color: var(--text-mid); line-height: 1.7;
        }
        .rp-list-check {
          width: 16px; height: 16px; flex-shrink: 0; margin-top: 1px;
          display: flex; align-items: center; justify-content: center;
          clip-path: polygon(3px 0%, 100% 0%, calc(100% - 3px) 100%, 0% 100%);
          font-size: 9px; font-weight: 700;
        }
        .rp-card.blue  .rp-list-check { background: var(--blue-light); color: var(--blue); }
        .rp-card.amber .rp-list-check { background: var(--orange-light); color: var(--orange); }

        .rp-table { width: 100%; border-collapse: collapse; }
        .rp-table-head th {
          font-size: 0.52rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--text-faint); padding: 8px 12px; text-align: left;
          border-bottom: 1px solid var(--border);
        }
        .rp-table-row { border-bottom: 1px solid var(--border); transition: background 0.15s; }
        .rp-table-row:last-child { border-bottom: none; }
        .rp-table-row:hover { background: rgba(26,95,212,0.03); }
        .rp-table-service {
          font-size: 0.60rem; letter-spacing: 0.06em; color: var(--text);
          padding: 10px 12px; white-space: nowrap; vertical-align: top;
        }
        .rp-table-policy {
          font-size: 0.60rem; letter-spacing: 0.06em; color: var(--text-mid);
          padding: 10px 12px; line-height: 1.6; vertical-align: top;
        }
        .rp-table-dot {
          display: inline-block; width: 6px; height: 6px; border-radius: 50%;
          margin-right: 8px; vertical-align: middle;
        }

        .rp-steps { display: flex; flex-direction: column; gap: 0; }
        .rp-step {
          display: flex; align-items: flex-start; gap: 16px;
          position: relative; padding-bottom: 18px;
        }
        .rp-step:last-child { padding-bottom: 0; }
        .rp-step-left { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
        .rp-step-num {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
          background: var(--blue-light); color: var(--blue);
          font-size: 0.52rem; letter-spacing: 0.18em; text-transform: uppercase;
          flex-shrink: 0;
        }
        .rp-step-line {
          width: 2px; flex: 1; min-height: 20px; margin-top: 4px;
          background: linear-gradient(180deg, var(--blue), var(--orange));
          opacity: 0.2;
        }
        .rp-step:last-child .rp-step-line { display: none; }
        .rp-step-content { padding-top: 6px; flex: 1; }
        .rp-step-title {
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: 1.0rem; color: var(--text); letter-spacing: 0.03em;
          margin-bottom: 4px;
        }
        .rp-step-desc {
          font-size: 0.62rem; letter-spacing: 0.06em; color: var(--text-muted);
          line-height: 1.7; margin: 0;
        }

        .rp-footer-card {
          background: linear-gradient(135deg, var(--blue-light) 0%, #fff 50%, var(--orange-light) 100%);
          border: 1px solid var(--border); padding: 28px 32px;
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
          box-shadow: 0 4px 24px var(--blue-glow);
        }
        .rp-footer-label {
          font-size: 0.55rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--blue); margin-bottom: 8px;
          display: flex; align-items: center; gap: 8px;
        }
        .rp-footer-label::after {
          content: ''; width: 24px; height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--orange));
          border-radius: 2px; opacity: 0.5;
        }
        .rp-footer-title {
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: 1.55rem; color: var(--text); letter-spacing: -0.01em;
          margin: 0 0 18px 0;
        }
        .rp-footer-title span { font-style: italic; color: var(--orange); }
        .rp-footer-body {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
          margin-bottom: 20px;
        }
        .rp-footer-info {
          display: flex; align-items: center; gap: 10px;
          font-size: 0.60rem; letter-spacing: 0.06em; color: var(--text-mid);
        }
        .rp-footer-icon {
          width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center;
          background: var(--blue-light); color: var(--blue);
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
          flex-shrink: 0;
        }
        a.rp-link { color: var(--blue); text-decoration: none; }
        a.rp-link:hover { text-decoration: underline; }
        .rp-footer-btns {
          display: flex; gap: 10px; flex-wrap: wrap;
          padding-top: 16px; border-top: 1px solid var(--border);
        }
        .rp-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 20px; font-family: 'DM Mono', monospace;
          font-size: 0.60rem; letter-spacing: 0.15em; text-transform: uppercase;
          text-decoration: none; transition: all 0.3s;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          position: relative; overflow: hidden; border: none; cursor: pointer;
        }
        .rp-btn.primary {
          background: linear-gradient(135deg, var(--orange), var(--orange-dark));
          color: #fff; box-shadow: 0 4px 14px var(--orange-glow);
        }
        .rp-btn.primary::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--blue), #1249aa);
          opacity: 0; transition: opacity 0.3s;
        }
        .rp-btn.primary:hover::before { opacity: 1; }
        .rp-btn.primary:hover { transform: translateY(-2px); box-shadow: 0 4px 18px var(--blue-glow); }
        .rp-btn.secondary {
          background: transparent; color: var(--blue); border: 1px solid var(--border);
        }
        .rp-btn.secondary:hover { background: var(--blue-light); }
        .rp-btn span, .rp-btn svg { position: relative; z-index: 1; }

        @media (max-width: 860px) {
          .rp-body { grid-template-columns: 1fr; }
          .rp-toc { position: static; clip-path: none; }
          .rp-toc-list { flex-direction: row; flex-wrap: wrap; gap: 6px; }
          .rp-toc-item { width: auto; clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%); }
          .rp-toc-dot { display: none; }
          .rp-footer-body { grid-template-columns: 1fr; }
          .rp-table-service { white-space: normal; }
        }
        @media (max-width: 600px) {
          .rp-section { padding: 56px 20px 72px; }
          .rp-meta-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <section className="rp-section">
        <div className="rp-dotgrid" />
        <div className="rp-watermark">Refund</div>
        <div className="rp-blob rp-blob-a" />
        <div className="rp-blob rp-blob-b" />

        <div className="rp-inner" ref={rootRef}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={rootInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="rp-pill">Legal</span>
          </motion.div>

          <motion.h2
            className="rp-headline"
            initial={{ opacity: 0, y: 18 }}
            animate={rootInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            Refund <span className="hl-blue">Policy</span>
          </motion.h2>

          <motion.p
            className="rp-sub"
            initial={{ opacity: 0, y: 14 }}
            animate={rootInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.13, ease: [0.16, 1, 0.3, 1] }}
          >
            We believe in fairness and transparency. This policy clearly outlines what is refundable, what isn't, and how to request a refund if you believe one is warranted.
          </motion.p>

          <motion.div
            className="rp-meta-row"
            initial={{ opacity: 0, y: 10 }}
            animate={rootInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rp-badge rp-badge-updated">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Last updated: <span>{lastUpdated}</span>
            </div>
            <div className="rp-badge rp-badge-note">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>{sections.length}</span> sections · Applies to all services
            </div>
          </motion.div>

          <hr className="rp-divider" />

          {/* Body */}
          <motion.div
            className="rp-body"
            initial={{ opacity: 0, y: 24 }}
            animate={rootInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* TOC */}
            <div className="rp-toc">
              <div className="rp-toc-label">Contents</div>
              <div className="rp-toc-list">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    className={`rp-toc-item${activeSection === s.id ? " active" : ""}`}
                    onClick={() => {
                      setActiveSection(s.id);
                      document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    <span className="rp-toc-num">{s.num}</span>
                    <span className="rp-toc-name">{s.title}</span>
                    <span className="rp-toc-dot" />
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="rp-content">
              {sections.map((section, si) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  className={`rp-card ${section.accent}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={rootInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.28 + si * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  onViewportEnter={() => setActiveSection(section.id)}
                  viewport={{ margin: "-40% 0px -40% 0px" }}
                >
                  <div className="rp-card-header">
                    <div className="rp-card-icon">{section.icon}</div>
                    <span className="rp-card-num">{section.num}</span>
                    <h3 className="rp-card-title">{section.title}</h3>
                  </div>
                  <div className="rp-card-body">
                    {section.content.map((block, bi) => (
                      <RenderBlock key={bi} block={block} />
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Footer contact card */}
              <div className="rp-footer-card">
                <div className="rp-footer-label">Need help with a refund?</div>
                <p className="rp-footer-title">
                  We're here to <span>resolve it fairly</span>
                </p>
                <div className="rp-footer-body">
                  <div className="rp-footer-info">
                    <div className="rp-footer-icon">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor" />
                      </svg>
                    </div>
                    <a href="mailto:info@websolsoffttech.in" className="rp-link">
                      info@websolsoffttech.in
                    </a>
                  </div>
                  <div className="rp-footer-info">
                    <div className="rp-footer-icon">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <a href="https://wa.me/919233770627" target="_blank" rel="noopener noreferrer" className="rp-link">
                      +91 92337 70627
                    </a>
                  </div>
                  <div className="rp-footer-info">
                    <div className="rp-footer-icon">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    Response within 5–7 business days
                  </div>
                  <div className="rp-footer-info">
                    <div className="rp-footer-icon">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                      </svg>
                    </div>
                    Udaipur, Tripura, India
                  </div>
                </div>
                <div className="rp-footer-btns">
                  <a
                    href="mailto:info@websolsoffttech.in?subject=Refund Request"
                    className="rp-btn primary"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                    <span>Submit refund request</span>
                  </a>
                  <a
                    href="https://wa.me/919233770627"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rp-btn secondary"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>Chat on WhatsApp</span>
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
