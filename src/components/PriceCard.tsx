import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
   title: "Web Development",
    titleHtml: <>Websites <em>Development</em></>,
    subtitle: "No hidden fees. No surprises. Choose a web plan that fits your goals and scale as your business grows.",
    plans: [
      {
        num: "01",
        name: "Starter",
        tagline: "For small businesses getting online",
        price: { monthly: 299, yearly: 249 },
        highlight: false,
        badge: null,
        features: [
          "Up to 5 Pages",
          "Responsive Design",
          "Basic SEO Setup",
          "Contact Form",
          "1 Month Support",
          "Domain Setup",
          "One-Time Project Payment",
          "Monthly Server Maintenance",
        ],
        excluded: [
          "Custom Animations",
          "CMS Integration",
          "E-Commerce",
          "Priority Support",
        ],
        cta: "Get Started",
      },
      {
        num: "02",
        name: "Professional",
        tagline: "For growing brands that demand more",
        price: { monthly: 699, yearly: 579 },
        highlight: true,
        badge: "Most Popular",
        features: [
          "Up to 15 Pages",
          "Custom UI/UX Design",
          "Advanced SEO",
          "CMS Integration",
          "Custom Animations",
          "3 Months Support",
          "Performance Optimized",
          "Analytics Dashboard",
          "One-Time Project Payment",
          "Monthly Server + Database Maintenance",
        ],
        excluded: [
          "E-Commerce",
          "Dedicated Manager",
        ],
        cta: "Start Building",
      },
      {
        num: "03",
        name: "Enterprise",
        tagline: "Full-scale solutions for serious teams",
        price: { monthly: 1499, yearly: 1249 },
        highlight: false,
        badge: null,
        features: [
          "Unlimited Pages",
          "Full Custom Development",
          "E-Commerce Ready",
          "AI Integration",
          "Cloud Deployment",
          "Dedicated Manager",
          "6 Months Support",
          "Priority Response",
          "SLA Guarantee",
          "Custom Integrations",
          "One-Time Project Payment",
          "Monthly Server + Database Maintenance",
        ],
        excluded: [],
        cta: "Contact Us",
      },
    ],
  },
  {
    title: "Mobile Apps",
    titleHtml: <>Mobile<em> Apps</em></>,
    subtitle: "iOS, Android or cross-platform — we craft apps users love. Transparent pricing, no hidden costs.",
    plans: [
      {
        num: "01", name: "Basic App", tagline: "Simple apps for startups",
        price: { monthly: 799, yearly: 659 }, highlight: false, badge: null,
        features: ["5 Screens", "iOS or Android", "Basic Auth", "Push Notifications", "2 Months Support", "App Store Submission"],
        excluded: ["Custom Animations", "Backend API", "Admin Panel", "Priority Support"],
        cta: "Get Started",
      },
      {
        num: "02", name: "Pro App", tagline: "Feature-rich cross-platform apps",
        price: { monthly: 1799, yearly: 1499 }, highlight: true, badge: "Most Popular",
        features: ["20 Screens", "iOS + Android", "Custom Auth", "REST API Integration", "Admin Panel", "Custom Animations", "4 Months Support", "Analytics Integration"],
        excluded: ["AI Features", "Dedicated Manager"],
        cta: "Start Building",
      },
      {
        num: "03", name: "Full Scale", tagline: "Complete mobile ecosystem",
        price: { monthly: 3499, yearly: 2999 }, highlight: false, badge: null,
        features: ["Unlimited Screens", "Cross-Platform", "AI Features", "Real-time Database", "Custom Backend", "Dedicated Manager", "6 Months Support", "SLA Guarantee", "White-label Option", "CI/CD Pipeline"],
        excluded: [],
        cta: "Contact Us",
      },
    ],
  },
  {
    title: "Software Development",
    titleHtml: <>Software <em>Solutions</em></>,
    subtitle: "Custom software built to your exact workflow. Scalable, secure and built to last.",
    plans: [
      {
        num: "01", name: "Module", tagline: "Single workflow automation",
        price: { monthly: 999, yearly: 829 }, highlight: false, badge: null,
        features: ["1 Core Module", "User Authentication", "Database Setup", "Basic Dashboard", "2 Months Support", "Cloud Deployment"],
        excluded: ["Multi-Module", "API Integrations", "Custom Reports", "Priority Support"],
        cta: "Get Started",
      },
      {
        num: "02", name: "Business", tagline: "Multi-module business platform",
        price: { monthly: 2499, yearly: 2079 }, highlight: true, badge: "Most Popular",
        features: ["Up to 5 Modules", "Role-based Access", "3rd Party Integrations", "Custom Reports", "Email Automation", "4 Months Support", "Performance Monitoring", "Data Export"],
        excluded: ["ERP Integration", "Dedicated Manager"],
        cta: "Start Building",
      },
      {
        num: "03", name: "Enterprise", tagline: "Full enterprise-grade software",
        price: { monthly: 5999, yearly: 4999 }, highlight: false, badge: null,
        features: ["Unlimited Modules", "ERP/CRM Integration", "AI Automation", "Custom Analytics", "Multi-tenant", "Dedicated Manager", "12 Months Support", "SLA Guarantee", "Source Code", "On-premise Option"],
        excluded: [],
        cta: "Contact Us",
      },
    ],
  },
  {
    title: "Digital Marketing",
    titleHtml: <>Digital <em>Marketing</em></>,
    subtitle: "Beautiful, user-centered design that drives results. From wireframes to production-ready assets.",
    plans: [
      {
        num: "01", name: "Essentials", tagline: "Clean design for new products",
        price: { monthly: 399, yearly: 329 }, highlight: false, badge: null,
        features: ["Up to 5 Screens", "Wireframes", "Style Guide", "Figma File", "1 Revision Round", "1 Month Support"],
        excluded: ["Prototyping", "User Testing", "Design System", "Priority Support"],
        cta: "Get Started",
      },
      {
        num: "02", name: "Growth", tagline: "Complete product design system",
        price: { monthly: 899, yearly: 749 }, highlight: true, badge: "Most Popular",
        features: ["Up to 20 Screens", "Full Prototyping", "Design System", "Component Library", "3 Revision Rounds", "User Flow Mapping", "3 Months Support", "Handoff-ready Assets"],
        excluded: ["User Testing", "Dedicated Designer"],
        cta: "Start Building",
      },
      {
        num: "03", name: "Premium", tagline: "Research-driven design excellence",
        price: { monthly: 1999, yearly: 1649 }, highlight: false, badge: null,
        features: ["Unlimited Screens", "User Research", "Usability Testing", "Full Design System", "Unlimited Revisions", "Dedicated Designer", "6 Months Support", "Brand Identity", "Motion Design", "Accessibility Audit"],
        excluded: [],
        cta: "Contact Us",
      },
    ],
  },
  {
    title: "Video & Production",
    titleHtml: <>Video & <em>Production</em></>,
    subtitle: "Data-driven SEO and digital marketing that brings real, measurable results to your business.",
    plans: [
      {
        num: "01", name: "Starter", tagline: "Get found on Google",
        price: { monthly: 199, yearly: 165 }, highlight: false, badge: null,
        features: ["5 Keywords", "On-Page SEO", "Monthly Report", "Google Search Console", "Meta Optimization", "1 Blog Post/Month"],
        excluded: ["Backlink Building", "Social Media", "PPC Management", "Dedicated Manager"],
        cta: "Get Started",
      },
      {
        num: "02", name: "Growth", tagline: "Dominate your niche market",
        price: { monthly: 499, yearly: 415 }, highlight: true, badge: "Most Popular",
        features: ["20 Keywords", "Technical SEO", "Backlink Building", "4 Blog Posts/Month", "Social Media (2 platforms)", "Bi-weekly Reports", "Competitor Analysis", "Google Ads Management"],
        excluded: ["Full PPC Suite", "Dedicated Manager"],
        cta: "Start Building",
      },
      {
        num: "03", name: "Dominator", tagline: "Total digital marketing takeover",
        price: { monthly: 1199, yearly: 999 }, highlight: false, badge: null,
        features: ["Unlimited Keywords", "Full Technical SEO", "Authority Link Building", "Daily Content", "All Social Platforms", "Full PPC Suite", "Dedicated Manager", "Weekly Strategy Calls", "Brand Monitoring", "PR Outreach"],
        excluded: [],
        cta: "Contact Us",
      },
    ],
  },
  {
    title: "Graphic Designing",
    titleHtml: <>Graphic <em>Designing</em></>,
    subtitle: "Data-driven SEO and digital marketing that brings real, measurable results to your business.",
    plans: [
      {
        num: "01", name: "Starter", tagline: "Get found on Google",
        price: { monthly: 199, yearly: 165 }, highlight: false, badge: null,
        features: ["5 Keywords", "On-Page SEO", "Monthly Report", "Google Search Console", "Meta Optimization", "1 Blog Post/Month"],
        excluded: ["Backlink Building", "Social Media", "PPC Management", "Dedicated Manager"],
        cta: "Get Started",
      },
      {
        num: "02", name: "Growth", tagline: "Dominate your niche market",
        price: { monthly: 499, yearly: 415 }, highlight: true, badge: "Most Popular",
        features: ["20 Keywords", "Technical SEO", "Backlink Building", "4 Blog Posts/Month", "Social Media (2 platforms)", "Bi-weekly Reports", "Competitor Analysis", "Google Ads Management"],
        excluded: ["Full PPC Suite", "Dedicated Manager"],
        cta: "Start Building",
      },
      {
        num: "03", name: "Dominator", tagline: "Total digital marketing takeover",
        price: { monthly: 1199, yearly: 999 }, highlight: false, badge: null,
        features: ["Unlimited Keywords", "Full Technical SEO", "Authority Link Building", "Daily Content", "All Social Platforms", "Full PPC Suite", "Dedicated Manager", "Weekly Strategy Calls", "Brand Monitoring", "PR Outreach"],
        excluded: [],
        cta: "Contact Us",
      },
    ],
  },
];

const PricingSection = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [currentService, setCurrentService] = useState(0);
  const [direction, setDirection] = useState(0);

  // ✅ useRef imported above — tracks index without re-registering the listener
  const currentServiceRef = useRef(0);

  useEffect(() => {
    const handler = (e: Event) => {
      const idx = (e as CustomEvent<{ index: number }>).detail.index;
      setDirection(idx > currentServiceRef.current ? 1 : -1);
      currentServiceRef.current = idx;
      setCurrentService(idx);
    };
    // Empty deps = registers once, stays alive, never misses an event
    window.addEventListener("selectPricingService", handler);
    return () => window.removeEventListener("selectPricingService", handler);
  }, []);

  useEffect(() => {
  const savedIndex = sessionStorage.getItem("selectedServiceIndex");

  if (savedIndex !== null) {
    const index = Number(savedIndex);

    setCurrentService(index);
    currentServiceRef.current = index;

    setTimeout(() => {
      const pricingEl = document.getElementById("pricing");

      if (pricingEl) {
        pricingEl.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 300);

    sessionStorage.removeItem("selectedServiceIndex");
  }
}, []);

  

  const goTo = (index: number) => {
    setDirection(index > currentServiceRef.current ? 1 : -1);
    currentServiceRef.current = index;
    setCurrentService(index);
  };

  const goPrev = () => goTo((currentService - 1 + services.length) % services.length);
  const goNext = () => goTo((currentService + 1) % services.length);

  const svc = services[currentService];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');

        .pricing-root {
          --blue:         #1a5fd4;
          --blue-bright:  #1a5fd4;
          --blue-glow:    rgba(26, 95, 212, 0.20);
          --orange:       #f07820;
          --orange-bright:#f07820;
          --orange-glow:  rgba(240, 120, 32, 0.20);
          --bg:           #ffffff;
          --bg-card:      rgba(255, 255, 255, 0.90);
          --text:         #0f2545;
          --text-dim:     #3d5a8a;
          --text-faint:   rgba(26, 95, 212, 0.30);
          --border:       rgba(26, 95, 212, 0.12);
          --border-warm:  rgba(240, 120, 32, 0.18);

          font-family: 'DM Mono', monospace;
          background: var(--bg);
          position: relative;
          overflow: hidden;
          padding: 7rem 2.5rem;
        }

        .pricing-glow {
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 900px; height: 420px;
          background: radial-gradient(ellipse,
            rgba(26,95,212,0.06) 0%,
            rgba(240,120,32,0.03) 50%,
            transparent 70%);
          pointer-events: none;
        }
        .pricing-glow-br {
          position: absolute;
          bottom: -80px; right: -80px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(240,120,32,0.05) 0%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
        }

        .card-cta::after {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          width: 60%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.45), transparent);
          transform: skewX(-20deg);
          transition: left 0.8s ease;
          z-index: 1;
        }
        .card-cta:hover::after { left: 120%; }

        .pricing-inner {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
        }

        .pricing-eyebrow { display: flex; align-items: center; gap: 1rem; }
        .pricing-eyebrow-line {
          width: 24px; height: 2px;
          background: linear-gradient(90deg, var(--blue-bright), var(--orange));
          border-radius: 2px;
        }
        .pricing-eyebrow-text {
          font-size: 0.60rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--blue-bright);
          opacity: 0.9;
        }

        .service-nav { display: flex; align-items: center; gap: 1.5rem; }
        .nav-dots { display: flex; gap: 8px; }
        .nav-dot {
          width: 6px; height: 6px;
          background: var(--border);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.25s;
          border: none;
          padding: 0;
        }
        .nav-dot.active {
          background: var(--orange);
          box-shadow: 0 0 6px var(--orange-glow);
        }

        .pricing-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2.4rem, 5vw, 4rem);
          color: var(--text);
          letter-spacing: -0.01em;
          line-height: 1.1;
          margin: 0;
        }
        .pricing-title em {
          font-style: italic;
          background: linear-gradient(100deg, var(--blue-bright), var(--orange-bright));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 10px var(--blue-glow));
        }

        .pricing-subtitle {
          font-size: 0.70rem;
          letter-spacing: 0.08em;
          color: #3d5a8a;
          max-width: 440px;
          line-height: 1.8;
          text-align: center;
          margin: 0;
        }

        .billing-toggle {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 0.5rem;
        }
        .toggle-label {
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #a8bcd8;
          transition: color 0.3s;
        }
        .toggle-label.active { color: var(--text); }

        .toggle-track {
          position: relative;
          width: 44px; height: 22px;
          background: rgba(26,95,212,0.06);
          border: 1px solid var(--border);
          border-radius: 11px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .toggle-track.yearly {
          background: rgba(240,120,32,0.07);
          border-color: var(--border-warm);
        }
        .toggle-thumb {
          position: absolute;
          top: 3px; left: 3px;
          width: 14px; height: 14px;
          background: linear-gradient(135deg, var(--blue-bright), var(--orange));
          border-radius: 50%;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .toggle-track.yearly .toggle-thumb { transform: translateX(22px); }

        .toggle-save {
          font-size: 0.55rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--orange);
          background: rgba(240,120,32,0.07);
          border: 1px solid var(--border-warm);
          padding: 3px 10px;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
        }

        .slide-overflow { overflow: visible; width: 100%; }

        .cards-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .side-arrow {
          width: 42px; height: 42px;
          flex-shrink: 0;
          background: rgba(26,95,212,0.05);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          clip-path: polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%);
          transition: all 0.25s;
          user-select: none;
          align-self: center;
        }
        .side-arrow:hover {
          background: rgba(26,95,212,0.12);
          border-color: rgba(26,95,212,0.30);
          transform: scale(1.08);
        }
        .side-arrow:active { transform: scale(0.95); }
        .side-arrow svg {
          width: 16px; height: 16px;
          stroke: var(--blue-bright);
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          align-items: start;
          flex: 1;
          min-width: 0;
          padding-top: 28px;
        }
        @media (min-width: 768px) {
          .pricing-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .pricing-card {
          position: relative;
          background: var(--bg-card);
          border: 1px solid var(--border);
          padding: 2.5rem 2rem;
          clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
          transition: border-color 0.4s, transform 0.4s, box-shadow 0.4s;
          cursor: default;
          box-shadow: 0 4px 24px rgba(26,95,212,0.06), 0 1px 4px rgba(0,0,0,0.04);
        }
        .pricing-card::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 30%;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--blue-bright), transparent);
          opacity: 0.25;
        }
        .pricing-card:hover {
          border-color: rgba(26,95,212,0.22);
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(26,95,212,0.10), 0 2px 8px rgba(0,0,0,0.06);
        }

        .pricing-card.featured {
          background: linear-gradient(160deg, rgba(232,240,252,0.9) 0%, #fff 50%, rgba(255,243,234,0.7) 100%);
          border-color: rgba(26,95,212,0.22);
          transform: translateY(-12px);
          clip-path: none;
          border-radius: 4px;
          overflow: visible;
          padding-top: 3.5rem;
          box-shadow:
            0 16px 50px rgba(26,95,212,0.12),
            0 4px 16px rgba(240,120,32,0.06),
            inset 0 1px 0 rgba(26,95,212,0.10);
        }
        .pricing-card.featured::before {
          background: linear-gradient(90deg, transparent, var(--blue-bright), var(--orange), transparent);
          opacity: 0.4;
          right: 10%;
        }
        .pricing-card.featured:hover { transform: translateY(-18px); }

        .card-accent-tr {
          position: absolute;
          top: -1px; right: -1px;
          width: 16px; height: 16px;
          background: rgba(26,95,212,0.18);
          clip-path: polygon(100% 0, 0 0, 100% 100%);
        }
        .pricing-card.featured .card-accent-tr {
          background: var(--orange);
          box-shadow: 4px -4px 10px var(--orange-glow);
        }
        .card-accent-bl {
          position: absolute;
          bottom: -1px; left: -1px;
          width: 16px; height: 16px;
          background: rgba(26,95,212,0.10);
          clip-path: polygon(0 100%, 0 0, 100% 100%);
        }
        .pricing-card.featured .card-accent-bl {
          background: var(--blue-bright);
          opacity: 0.35;
        }

        .card-badge {
          position: absolute;
          top: -12px; left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, var(--orange) 0%, #c75f0f 100%);
          color: #fff;
          font-size: 0.55rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 4px 16px;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          white-space: nowrap;
          box-shadow: 0 4px 14px var(--orange-glow);
        }

        .card-num {
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          color: var(--blue-bright);
          opacity: 0.5;
          margin-bottom: 0.6rem;
        }
        .pricing-card.featured .card-num { color: var(--orange); opacity: 0.7; }

        .card-name {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.9rem;
          color: var(--text);
          letter-spacing: 0.04em;
          margin-bottom: 0.4rem;
        }
        .card-tagline {
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          color: #7a90b5;
          line-height: 1.6;
          margin-bottom: 1.8rem;
        }

        .card-price-row {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 0.3rem;
        }
        .card-currency {
          font-size: 0.9rem;
          color: var(--blue-bright);
          font-weight: 300;
        }
        .pricing-card.featured .card-currency { color: var(--orange); }

        .card-amount {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.2rem;
          font-weight: 300;
          color: var(--text);
          line-height: 1;
        }
        .card-period {
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          color: #a8bcd8;
        }

        .card-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, var(--blue-bright), transparent);
          margin: 1.5rem 0;
          opacity: 0.20;
        }
        .pricing-card.featured .card-divider {
          background: linear-gradient(90deg, var(--blue-bright), var(--orange), transparent);
          opacity: 0.35;
        }

        .card-features { display: flex; flex-direction: column; gap: 0.7rem; margin-bottom: 1rem; }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          color: #3d5a8a;
        }

        .feature-check {
          width: 14px; height: 14px;
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          clip-path: polygon(3px 0%, 100% 0%, calc(100% - 3px) 100%, 0% 100%);
          background: rgba(26,95,212,0.04);
        }
        .pricing-card.featured .feature-check {
          border-color: var(--border-warm);
          background: rgba(240,120,32,0.04);
        }
        .feature-check svg { width: 8px; height: 8px; }
        .feature-item.excluded { opacity: 0.28; }

        .card-cta {
          width: 100%;
          padding: 12px;
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          border: none;
          transition: all 0.3s;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          margin-top: 1.5rem;
          position: relative;
          overflow: hidden;
        }
        .card-cta.outline {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--blue-bright);
        }
        .card-cta.outline:hover {
          background: rgba(26,95,212,0.06);
          border-color: rgba(26,95,212,0.28);
          transform: translateY(-2px);
        }
        .card-cta.solid {
          background: linear-gradient(135deg, var(--orange) 0%, #c75f0f 100%);
          color: #fff;
          box-shadow: 0 4px 18px var(--orange-glow), 0 2px 8px rgba(0,0,0,0.06);
        }
        .card-cta.solid::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--blue) 0%, #1249aa 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .card-cta.solid:hover::before { opacity: 1; }
        .card-cta.solid:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 22px var(--blue-glow), 0 2px 8px rgba(0,0,0,0.08);
        }
        .card-cta span { position: relative; z-index: 1; }

        .pricing-note {
          text-align: center;
          margin-top: 3rem;
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          color: #a8bcd8;
          text-transform: uppercase;
        }
        .note-blue  { color: rgba(26,95,212,0.55); }
        .note-orange { color: rgba(240,120,32,0.55); }
      `}</style>

      <section className="pricing-root" id="pricing">
        <div className="pricing-glow" />
        <div className="pricing-glow-br" />

        <div className="pricing-inner">
          <motion.div
            className="pricing-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pricing-eyebrow">
              <div className="pricing-eyebrow-line" />
              <span className="pricing-eyebrow-text">Transparent Pricing</span>
              <div className="pricing-eyebrow-line" />
            </div>

            <div className="service-nav">
              <div className="nav-dots">
                {services.map((_, i) => (
                  <button
                    key={i}
                    className={`nav-dot ${i === currentService ? "active" : ""}`}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.h2
                key={`title-${currentService}`}
                className="pricing-title"
                initial={{ opacity: 0, y: direction > 0 ? 20 : -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction > 0 ? -20 : 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {svc.titleHtml}
              </motion.h2>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${currentService}`}
                className="pricing-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {svc.subtitle}
              </motion.p>
            </AnimatePresence>

            <div className="billing-toggle">
              <span className={`toggle-label ${billing === "monthly" ? "active" : ""}`}>Monthly</span>
              <div
                className={`toggle-track ${billing === "yearly" ? "yearly" : ""}`}
                onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
              >
                <div className="toggle-thumb" />
              </div>
              <span className={`toggle-label ${billing === "yearly" ? "active" : ""}`}>Yearly</span>
              <AnimatePresence>
                {billing === "yearly" && (
                  <motion.span
                    className="toggle-save"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    Save 17%
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="cards-row">
            <motion.div className="side-arrow" onClick={goPrev} whileTap={{ scale: 0.92 }}>
              <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
            </motion.div>

            <div className="slide-overflow">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentService}
                  className="pricing-grid"
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {svc.plans.map((plan, i) => (
                    <motion.div
                      key={plan.name}
                      className={`pricing-card ${plan.highlight ? "featured" : ""}`}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: plan.highlight ? -12 : 0 }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="card-accent-tr" />
                      <div className="card-accent-bl" />

                      {plan.badge && <div className="card-badge">{plan.badge}</div>}

                      <div className="card-num">{plan.num}</div>
                      <div className="card-name">{plan.name}</div>
                      <div className="card-tagline">{plan.tagline}</div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={billing}
                          className="card-price-row"
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.25 }}
                        >
                          <span className="card-currency">₹</span>
                          <span className="card-amount">{plan.price[billing]}</span>
                          <span className="card-period">/ {billing === "monthly" ? "mo" : "mo, billed yearly"}</span>
                        </motion.div>
                      </AnimatePresence>

                      <div className="card-divider" />

                      <div className="card-features">
                        {plan.features.map((f) => (
                          <div key={f} className="feature-item">
                            <div className="feature-check">
                              <svg viewBox="0 0 8 8" fill="none">
                                <polyline
                                  points="1,4 3,6.5 7,1.5"
                                  stroke={plan.highlight ? "var(--orange)" : "var(--blue-bright)"}
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            {f}
                          </div>
                        ))}
                        {plan.excluded.map((f) => (
                          <div key={f} className="feature-item excluded">
                            <div className="feature-check">
                              <svg viewBox="0 0 8 8" fill="none">
                                <line x1="2" y1="2" x2="6" y2="6" stroke="#a8bcd8" strokeWidth="1.2" strokeLinecap="round" />
                                <line x1="6" y1="2" x2="2" y2="6" stroke="#a8bcd8" strokeWidth="1.2" strokeLinecap="round" />
                              </svg>
                            </div>
                            {f}
                          </div>
                        ))}
                      </div>

                      <button className={`card-cta ${plan.highlight ? "solid" : "outline"}`}>
                        {plan.highlight ? <span>{plan.cta}</span> : plan.cta}
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div className="side-arrow" onClick={goNext} whileTap={{ scale: 0.92 }}>
              <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
            </motion.div>
          </div>

          <motion.p
            className="pricing-note"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            All plans include{" "}
            <span className="note-blue">free consultation</span>{" · "}
            <span className="note-orange">NDA on request</span>{" · "}
            <span className="note-blue">Flexible payment terms</span>
          </motion.p>
        </div>
      </section>
    </>
  );
};

export default PricingSection;