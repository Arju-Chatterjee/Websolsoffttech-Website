import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const WHATSAPP_NUMBER = "919233770627";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

type PlanPrice =
  | { type: "split"; oneTime: number; monthly: number; yearly: number }
  | { type: "toggle"; monthly: number; yearly: number }
  | { type: "negotiation" }
  | { type: "fixed"; amount: number; suffix?: string };

interface Plan {
  num: string;
  name: string;
  tagline: string;
  note?: string;
  price: PlanPrice;
  highlight: boolean;
  badge: string | null;
  features: string[];
  excluded: string[];
  cta: string;
}

interface Service {
  title: string;
  titleHtml: React.ReactNode;
  subtitle: string;
  plans: Plan[];
}

const services: Service[] = [
  {
    title: "Web Development",
    titleHtml: (
      <>
        Website <em>Development</em>
      </>
    ),
    subtitle:
      "Professional website solutions for businesses of all sizes — from simple static websites to advanced business platforms.",
    plans: [
      {
        num: "01",
        name: "Basic",
        tagline: "Perfect for startups and local businesses",
        price: {
          type: "fixed",
          amount: 14999,
          suffix: "+ 1 year Free Maintenance",
        },
        highlight: false,
        badge: null,
        features: [
          "Static Website",
          "Up to 5 Pages",
          "Responsive Design",
          "Basic SEO Setup",
          "Contact Form",
          "Domain Setup Assistance",
          "1 Years Free Support",
        ],
        excluded: [
          "CMS Integration",
          "E-Commerce",
          "Custom Dashboard",
          "Priority Support",
        ],
        cta: "Get Started",
      },
      {
        num: "02",
        name: "Standard",
        tagline: "Ideal for growing businesses and brands",
        price: {
          type: "fixed",
          amount: 19999,
          suffix: "+ 1 year Free Maintenance",
        },
        highlight: true,
        badge: "Most Popular",
        features: [
          "Dynamic Business Website",
          "Up to 15 Pages",
          "Responsive Design",
          "Advanced SEO Setup",
          "Admin Panel",
          "CMS Integration",
          "Custom Contact Forms",
          "Performance Optimization",
          "Analytics Integration",
          "1 Years Free Support",
          "Yearly Server + Database Maintenance",
        ],
        excluded: ["E-Commerce", "Dedicated Manager"],
        cta: "Start Building",
      },
      {
        num: "03",
        name: "Premium",
        tagline: "Advanced solutions for large businesses",
        price: {
          type: "fixed",
          amount: 25000,
          suffix: "+ 1 year Free Maintenance",
        },
        highlight: false,
        badge: null,
        features: [
          "Custom Web Application",
          "Unlimited Pages",
          "E-Commerce Ready",
          "Advanced Admin Dashboard",
          "Payment Gateway Integration",
          "Cloud Deployment",
          "Custom Integrations",
          "Priority Support",
          "Dedicated Project Assistance",
          "1 Years Free Support",
          "Yearly Server + Database Maintenance",
        ],
        excluded: [],
        cta: "Contact Us",
      },
    ],
  },
  {
    title: "Mobile Apps",
    titleHtml: (
      <>
        Mobile<em> Apps</em>
      </>
    ),
    subtitle:
      "iOS, Android or cross-platform — we craft apps users love. Transparent pricing, no hidden costs.",
    plans: [
      {
        num: "01",
        name: "Basic",
        tagline: "Simple apps for startups",
        price: {
          type: "fixed",
          amount: 29999,
          suffix: "+ 1 year Free Support",
        },
        highlight: false,
        badge: null,
        features: [
          "5 Screens",
          "Android App",
          "Basic Auth",
          "Push Notifications",
          "1 Years Free Support",
          "Play Store Submission",
        ],
        excluded: [
          "Custom Animations",
          "Backend API",
          "Admin Panel",
          "Priority Support",
        ],
        cta: "Get Started",
      },
      {
        num: "02",
        name: "Standard",
        tagline: "Feature-rich cross-platform apps",
        price: {
          type: "fixed",
          amount: 49999,
          suffix: "+ 1 year Free Support",
        },
        highlight: true,
        badge: "Most Popular",
        features: [
          "20 Screens",
          "Android App",
          "Custom Auth",
          "REST API Integration",
          "Admin Panel",
          "Custom Animations",
          "1 Years Free Support",
          "Analytics Integration",
        ],
        excluded: ["AI Features", "Dedicated Manager"],
        cta: "Start Building",
      },
      {
        num: "03",
        name: "Premium",
        tagline: "Complete mobile ecosystem",
        price: {
          type: "fixed",
          amount: 109999,
          suffix: "+ 1 year Free Support",
        },
        highlight: false,
        badge: null,
        features: [
          "Unlimited Screens",
          "Cross-Platform",
          "AI Features",
          "Real-time Database",
          "Custom Backend",
          "Dedicated Manager",
          "1 Years Free Support",
          "SLA Guarantee",
          "White-label Option",
          "CI/CD Pipeline",
        ],
        excluded: [],
        cta: "Contact Us",
      },
    ],
  },
  {
    title: "Software Development",
    titleHtml: (
      <>
        Software <em>Solutions</em>
      </>
    ),
    subtitle:
      "Custom software built to your exact workflow. Scalable, secure and built to last.",
    plans: [
      {
        num: "01",
        name: "Basic",
        tagline: "Single workflow automation",
        price: {
          type: "fixed",
          amount: 25000,
        },
        highlight: false,
        badge: null,
        features: [
          "1 Core Module",
          "User Authentication",
          "Database Setup",
          "Basic Dashboard",
          "2 Months Support",
          "Cloud Deployment",
        ],
        excluded: [
          "Multi-Module",
          "API Integrations",
          "Custom Reports",
          "Priority Support",
        ],
        cta: "Get Started",
      },
      {
        num: "02",
        name: "Standard",
        tagline: "Multi-module business platform",
        price: {
          type: "fixed",
          amount: 40000,
        },
        highlight: true,
        badge: "Most Popular",
        features: [
          "Up to 5 Modules",
          "Role-based Access",
          "3rd Party Integrations",
          "Custom Reports",
          "Email Automation",
          "4 Months Support",
          "Performance Monitoring",
          "Data Export",
        ],
        excluded: ["ERP Integration", "Dedicated Manager"],
        cta: "Start Building",
      },
      {
        num: "03",
        name: "Premium",
        tagline: "Full enterprise-grade software",
        price: {
          type: "fixed",
          amount: 65000,
        },
        highlight: false,
        badge: null,
        features: [
          "Unlimited Modules",
          "ERP/CRM Integration",
          "AI Automation",
          "Custom Analytics",
          "Multi-tenant",
          "Dedicated Manager",
          "12 Months Support",
          "SLA Guarantee",
          "Source Code",
          "On-premise Option",
        ],
        excluded: [],
        cta: "Contact Us",
      },
    ],
  },
  {
    title: "Digital Marketing",
    titleHtml: (
      <>
        Digital <em>Marketing</em>
      </>
    ),
    subtitle:
      "Google Ads, Meta Ads — data-driven campaigns that bring real, measurable results to your business.",
    plans: [
      {
        num: "01",
        name: "Basic",
        tagline: "Perfect for startups & local businesses",
        note: "Ad budget will be paid directly by the client to the respective platform",
        price: { type: "fixed", amount: 6999, suffix: "/ month" },
        highlight: false,
        badge: null,
        features: [
          "*Note: Ad budget will be paid directly by the client to the respective platform",
          "Facebook Marketing & Instagram Marketing",
          "Facebook Business Manager Set Up",
          "Creation Of Campaign – 5",
          "Reel Video – 4",
          "Poster – 6",
          "Pixel Installation",
          "Custom Audience Creation",
          "Facebook Analytics Report Creation",
          "Ad Campaign Monitoring",
          "Instant Experience Ads Creation",
          "Customization Of Ad Placements",
          "A/B Testing Of Ad Set",
          "Traffic Monitoring",
          "Monthly Report",
          "Audience Research",
          "Instagram Ads Creative Creation & Design",
          "Instagram Ads Monitoring And Management",
        ],
        excluded: [
          "Custom Conversion Creation",
          "Remarketing",
          "Creation Of Automated Rules",
          "Catalogue Creation",
          "Dynamic Ads Creation",
          "Carousel And Collection Ads",
        ],
        cta: "Get Started",
      },
      {
        num: "02",
        name: "Standard",
        tagline: "Advanced marketing for growing brands",
        note: "Ad budget will be paid directly by the client to the respective platform",
        price: { type: "fixed", amount: 11999, suffix: "/ month" },
        highlight: true,
        badge: "Most Popular",
        features: [
          "*Note: Ad budget will be paid directly by the client to the respective platform",
          "Facebook Marketing & Instagram Marketing",
          "Facebook Business Manager Set Up",
          "Creation Of Campaign – 8",
          "Reel Video – 7",
          "Poster – 8",
          "Pixel Installation",
          "Custom Audience Creation",
          "Facebook Analytics Report Creation",
          "Ad Campaign Monitoring",
          "Instant Experience Ads Creation",
          "Customization Of Ad Placements",
          "A/B Testing Of Ad Set",
          "Traffic Monitoring",
          "Monthly Report",
          "Audience Research",
          "Instagram Ads Creative Creation & Design",
          "Instagram Ads Monitoring And Management",
        ],
        excluded: [
          "Custom Conversion Creation",
          "Remarketing",
          "Creation Of Automated Rules",
          "Catalogue Creation",
          "Dynamic Ads Creation",
          "Carousel And Collection Ads",
        ],
        cta: "Start Building",
      },
      {
        num: "03",
        name: "Premium",
        tagline: "Complete performance marketing solution",
        note: "Ad budget will be paid directly by the client to the respective platform",
        price: { type: "fixed", amount: 17999, suffix: "/ month" },
        highlight: false,
        badge: null,
        features: [
          "*Note: Ad budget will be paid directly by the client to the respective platform",
          "Facebook Marketing & Instagram Marketing",
          "Facebook Business Manager Set Up",
          "Creation Of Campaign – 10",
          "Reel Video – 10",
          "Poster – 12",
          "Pixel Installation",
          "Custom Conversion Creation",
          "Remarketing",
          "Custom Audience Creation",
          "Creation Of Automated Rules",
          "Facebook Analytics Report Creation",
          "Ad Campaign Monitoring",
          "Catalogue Creation",
          "Dynamic Ads Creation",
          "Instant Experience Ads Creation",
          "Customization Of Ad Placements",
          "A/B Testing Of Ad Set, Creative & Campaign",
          "Carousel And Collection Ads",
          "Traffic Monitoring",
          "Monthly Report",
          "Audience Research",
          "Instagram Ads Creative Creation & Design",
          "Instagram Ads Monitoring And Management",
        ],
        excluded: [],
        cta: "Contact Us",
      },
    ],
  },
  {
    title: "Video & Production",
    titleHtml: (
      <>
        Video & <em>Production</em>
      </>
    ),
    subtitle:
      "Cinematic content, reels, and brand videos that stop the scroll and tell your story.",
    plans: [
      {
        num: "01",
        name: "Custom",
        tagline: "Pricing tailored to your project scope & deliverables",
        price: { type: "negotiation" },
        highlight: false,
        badge: null,
        features: [],
        excluded: [],
        cta: "Contact Us",
      },
    ],
  },
  {
    title: "Search Engine Optimization",
    titleHtml: (
      <>
        Search Engine <em>Optimization</em>
      </>
    ),
    subtitle:
      "Rank higher, drive organic traffic, and grow your business with our proven SEO strategies.",
    plans: [
      {
        num: "01",
        name: "Basic",
        tagline: "Best for: Small businesses & startups",
        price: { type: "fixed", amount: 7999, suffix: "/ month" },
        highlight: false,
        badge: null,
        features: [
          "Website SEO Audit",
          "Keyword Research — up to 10 keywords",
          "On-Page SEO Optimization",
          "Meta Title & Meta Description Optimization",
          "Heading Tag Optimization (H1–H6)",
          "URL Optimization",
          "Image Alt Tag Optimization",
          "Basic Technical SEO",
          "Google Search Console Setup",
          "Google Analytics Setup",
          "Google Business Profile Basic Optimization",
          "2 SEO-Optimized Blog/Articles per Month",
          "Basic Local SEO",
          "Monthly SEO Report",
          "Monthly Performance Monitoring",
        ],
        excluded: [],
        cta: "Get Started",
      },
      {
        num: "02",
        name: "Standard",
        tagline: "Best for: Growing businesses & local brands",
        price: { type: "fixed", amount: 11999, suffix: "/ month" },
        highlight: true,
        badge: "Most Popular",
        features: [
          "Keyword Research — up to 25 keywords",
          "Competitor SEO Analysis",
          "Advanced On-Page SEO",
          "Technical SEO Optimization",
          "Internal Linking Optimization",
          "Schema Markup Implementation",
          "Google Business Profile Optimization",
          "Local Citation Building",
          "Local Directory Submissions",
          "4 SEO-Optimized Blogs/Articles per Month",
          "High-Quality Backlink Building",
          "Link Profile Monitoring",
          "Broken Link & 404 Error Fixing",
          "Website Speed & Core Web Vitals Recommendations",
          "Monthly Keyword Ranking Tracking",
          "Detailed Monthly SEO Report",
        ],
        excluded: [],
        cta: "Start Building",
      },
      {
        num: "03",
        name: "Premium",
        tagline: "Best for: Established businesses & competitive industries",
        price: { type: "fixed", amount: 17999, suffix: "/ month" },
        highlight: false,
        badge: null,
        features: [
          "Advanced Keyword Research — up to 50+ keywords",
          "In-Depth Competitor Analysis",
          "Comprehensive Technical SEO",
          "Advanced Local SEO Strategy",
          "Google Business Profile Management",
          "8 SEO-Optimized Blogs/Articles per Month",
          "Premium Backlink Building",
          "Digital PR & Link-Building Opportunities",
          "Competitor Backlink Analysis",
          "Content Gap Analysis",
          "Advanced Schema Implementation",
          "Conversion Rate Optimization (CRO) Recommendations",
          "Core Web Vitals Optimization",
          "Reputation & Brand Mention Monitoring",
          "Monthly SEO Strategy & Consultation",
          "Weekly Ranking Monitoring",
          "Detailed Performance & Growth Report",
        ],
        excluded: [],
        cta: "Contact Us",
      },
    ],
  },
  {
    title: "Graphic Designing",
    titleHtml: (
      <>
        Graphic <em>Designing</em>
      </>
    ),
    subtitle:
      "Visual identity, social assets and brand collateral that make your business impossible to ignore.",
    plans: [
      {
        num: "01",
        name: "Custom",
        tagline: "Pricing tailored to your project scope & deliverables",
        price: { type: "negotiation" },
        highlight: false,
        badge: null,
        features: [],
        excluded: [],
        cta: "Contact Us",
      },
    ],
  },
];

// ── Price display sub-component ──────────────────────────────────────────────
const PriceDisplay = ({
  price,
  billing,
  featured,
}: {
  price: PlanPrice;
  billing: "monthly" | "yearly";
  featured: boolean;
}) => {
  if (price.type === "negotiation") {
    return (
      <motion.div
        className="negotiation-block"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`negotiation-label ${featured ? "featured" : ""}`}>
          <span className="negotiation-icon">✦</span>
          Custom Pricing
        </div>
        <p className="negotiation-desc">
          Pricing varies based on scope, duration &amp; deliverables.
          <br />
          Let's talk — we'll craft a package that fits your budget.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%27m%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20pricing.`}
          target="_blank"
          rel="noopener noreferrer"
          className={`whatsapp-negotiate-btn ${featured ? "featured" : ""}`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="wa-icon">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>Negotiate on WhatsApp</span>
          <span className="wa-number">+91 92337 70627</span>
        </a>
      </motion.div>
    );
  }

  if (price.type === "fixed") {
    return (
      <div className="card-price-split">
        <div className="split-row">
          <div className="card-price-row">
            <span className="card-currency">₹</span>
            <span className="card-amount">
              {price.amount.toLocaleString("en-IN")}
            </span>
          </div>
          {price.suffix && (
            <div className="split-label one-time-label" style={{ textTransform: "none", marginTop: "12px", display: "inline-block", padding: "6px 10px", background: "rgba(255, 255, 255, 0.08)", borderRadius: "6px" }}>
              {price.suffix}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (price.type === "split") {
    const maintAmount = billing === "monthly" ? price.monthly : price.yearly;
    return (
      // FIX: removed outer AnimatePresence with static key that prevented re-animation;
      // the inner AnimatePresence on the maintenance row already handles billing toggle animation.
      <div className="card-price-split">
        <div className="split-row">
          <div className="card-price-row">
            <span className="card-currency">₹</span>
            <span className="card-amount">
              {price.oneTime.toLocaleString("en-IN")}
            </span>
          </div>
          <span className="split-label one-time-label">
            one-time project fee
          </span>
        </div>
        <div className="split-plus">
          <span className="split-plus-sign">+</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={billing}
            className="split-row"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
          >
            <div className="card-price-row maintenance-row">
              <span className="card-currency card-currency-sm">₹</span>
              <span className="card-amount card-amount-sm">
                {maintAmount.toLocaleString("en-IN")}
              </span>
              <span className="card-period">
                / mo{billing === "yearly" ? ", billed yearly" : ""}
              </span>
            </div>
            <span className="split-label maintenance-label">
              server maintenance
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // type === "toggle"
  return (
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
        <span className="card-amount">
          {(billing === "monthly"
            ? price.monthly
            : price.yearly
          ).toLocaleString("en-IN")}
        </span>
        <span className="card-period">
          / {billing === "monthly" ? "mo" : "mo, billed yearly"}
        </span>
      </motion.div>
    </AnimatePresence>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const PricingSection = () => {
  const navigate = useNavigate();
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [currentService, setCurrentService] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentServiceRef = useRef(0);
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // FIX: extracted startAutoSlide into a ref-stable callback to avoid
  // stale closure issues when called from event listeners and effects.
  const startAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    autoSlideRef.current = setInterval(() => {
      const next = (currentServiceRef.current + 1) % services.length;
      setDirection(1);
      currentServiceRef.current = next;
      setCurrentService(next);
    }, 3500);
  };

  useEffect(() => {
    if (!isPaused) {
      startAutoSlide();
    } else {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    }
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  useEffect(() => {
    const handler = (e: Event) => {
      const idx = (e as CustomEvent<{ index: number }>).detail.index;
      setDirection(idx > currentServiceRef.current ? 1 : -1);
      currentServiceRef.current = idx;
      setCurrentService(idx);
      if (!isPaused) startAutoSlide();
    };
    window.addEventListener("selectPricingService", handler);
    return () => window.removeEventListener("selectPricingService", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  useEffect(() => {
    const savedIndex = sessionStorage.getItem("selectedServiceIndex");
    if (savedIndex !== null) {
      const index = Number(savedIndex);
      setCurrentService(index);
      currentServiceRef.current = index;
      setTimeout(() => {
        document
          .getElementById("pricing")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
      sessionStorage.removeItem("selectedServiceIndex");
    }
  }, []);

  const goTo = (index: number) => {
    setDirection(index > currentServiceRef.current ? 1 : -1);
    currentServiceRef.current = index;
    setCurrentService(index);
    if (!isPaused) startAutoSlide();
  };
  const goPrev = () =>
    goTo((currentService - 1 + services.length) % services.length);
  const goNext = () => goTo((currentService + 1) % services.length);

  const svc = services[currentService];
  const isSinglePlan = svc.plans.length === 1;
  const isSplitService = svc.plans[0].price.type === "split";
  const isNegotiationService = svc.plans[0].price.type === "negotiation";
  const isToggleService = svc.plans[0].price.type === "toggle";

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
          --green:        #25D366;
          --green-dark:   #128C7E;
          --green-glow:   rgba(37, 211, 102, 0.25);

          font-family: 'DM Mono', monospace;
          background: var(--bg);
          position: relative;
          overflow: hidden;
          padding: 7rem 2.5rem;
        }

        .pricing-glow {
          position: absolute; top: 0; left: 50%;
          transform: translateX(-50%);
          width: 900px; height: 420px;
          background: radial-gradient(ellipse, rgba(26,95,212,0.06) 0%, rgba(240,120,32,0.03) 50%, transparent 70%);
          pointer-events: none;
        }
        .pricing-glow-br {
          position: absolute; bottom: -80px; right: -80px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(240,120,32,0.05) 0%, transparent 70%);
          filter: blur(40px); pointer-events: none;
        }

        /* FIX: moved card-cta::after below card-cta base rule (see further down) */

        .pricing-inner { position: relative; z-index: 10; max-width: 1200px; margin: 0 auto; }

        .pricing-header {
          text-align: center; margin-bottom: 4rem;
          display: flex; flex-direction: column; align-items: center; gap: 1.2rem;
        }

        .pricing-eyebrow { display: flex; align-items: center; gap: 1rem; }
        .pricing-eyebrow-line {
          width: 24px; height: 2px;
          background: linear-gradient(90deg, var(--blue-bright), var(--orange));
          border-radius: 2px;
        }
        .pricing-eyebrow-text {
          font-size: 0.60rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--blue-bright); opacity: 0.9;
        }

        .service-nav { display: flex; align-items: center; gap: 1.5rem; }
        .nav-dots { display: flex; gap: 8px; }
        .nav-dot {
          width: 6px; height: 6px; background: var(--border);
          border-radius: 50%; cursor: pointer; transition: all 0.25s; border: none; padding: 0;
        }
        .nav-dot.active { background: var(--orange); box-shadow: 0 0 6px var(--orange-glow); }

        .nav-dot-wrap {
          position: relative; display: flex; align-items: center; justify-content: center;
          width: 16px; height: 16px; cursor: pointer;
        }
        .nav-dot-wrap .nav-dot { position: relative; z-index: 1; }
        .nav-dot-ring {
          position: absolute; top: 0; left: 0; width: 16px; height: 16px;
          border-radius: 50%;
        }
        .nav-dot-ring circle {
          fill: none;
          stroke: var(--orange);
          stroke-width: 1.5;
          stroke-dasharray: 44;
          stroke-dashoffset: 44;
          transform-origin: center;
          transform: rotate(-90deg);
        }
        .nav-dot-ring.animating circle {
          animation: ringProgress 3.5s linear forwards;
        }
        @keyframes ringProgress {
          from { stroke-dashoffset: 44; }
          to   { stroke-dashoffset: 0; }
        }

        .pricing-title {
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: clamp(2.4rem, 5vw, 4rem); color: var(--text);
          letter-spacing: -0.01em; line-height: 1.1; margin: 0;
        }
        .pricing-title em {
          font-style: italic;
          background: linear-gradient(100deg, var(--blue-bright), var(--orange-bright));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; filter: drop-shadow(0 0 10px var(--blue-glow));
        }

        .pricing-subtitle {
          font-size: 0.70rem; letter-spacing: 0.08em; color: #3d5a8a;
          max-width: 440px; line-height: 1.8; text-align: center; margin: 0;
        }

        .billing-toggle { display: flex; align-items: center; gap: 1rem; margin-top: 0.5rem; }
        .toggle-label {
          font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #a8bcd8; transition: color 0.3s;
        }
        .toggle-label.active { color: var(--text); }

        .toggle-track {
          position: relative; width: 44px; height: 22px;
          background: rgba(26,95,212,0.06); border: 1px solid var(--border);
          border-radius: 11px; cursor: pointer; transition: background 0.3s;
        }
        .toggle-track.yearly { background: rgba(240,120,32,0.07); border-color: var(--border-warm); }
        .toggle-thumb {
          position: absolute; top: 3px; left: 3px; width: 14px; height: 14px;
          background: linear-gradient(135deg, var(--blue-bright), var(--orange));
          border-radius: 50%; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .toggle-track.yearly .toggle-thumb { transform: translateX(22px); }

        .toggle-save {
          font-size: 0.55rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--orange); background: rgba(240,120,32,0.07);
          border: 1px solid var(--border-warm); padding: 3px 10px;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
        }

        .split-pricing-notice {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.58rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--orange); background: rgba(240,120,32,0.07);
          border: 1px solid var(--border-warm); padding: 5px 14px;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }
        .split-pricing-notice::before {
          content: '⬡'; font-size: 0.7rem; color: var(--orange);
        }

        .negotiation-pricing-notice {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.58rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--green-dark); background: rgba(37,211,102,0.07);
          border: 1px solid rgba(37,211,102,0.25); padding: 5px 14px;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }
        .negotiation-pricing-notice::before {
          content: '◈'; font-size: 0.7rem; color: var(--green);
        }

        .split-toggle-row {
          display: flex; flex-direction: column; align-items: center; gap: 0.7rem;
        }

        .slide-overflow { overflow: visible; width: 100%; }

        .cards-row { display: flex; align-items: center; gap: 1rem; }

        .side-arrow {
          width: 42px; height: 42px; flex-shrink: 0;
          background: rgba(26,95,212,0.05); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          clip-path: polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%);
          transition: all 0.25s; user-select: none; align-self: center;
        }
        .side-arrow:hover {
          background: rgba(26,95,212,0.12); border-color: rgba(26,95,212,0.30);
          transform: scale(1.08);
        }
        .side-arrow:active { transform: scale(0.95); }
        .side-arrow svg { width: 16px; height: 16px; stroke: var(--blue-bright); fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

        .pricing-grid {
          display: grid; grid-template-columns: 1fr; gap: 1.5rem;
          align-items: stretch; flex: 1; min-width: 0; padding-top: 28px;
        }
        @media (min-width: 768px) { .pricing-grid { grid-template-columns: repeat(3, 1fr); } }

        /* ── Single-plan centering ── */
        .pricing-grid.single-plan {
          grid-template-columns: minmax(0, 480px) !important;
          justify-content: center;
          margin: 0 auto;
        }
        .pricing-grid.single-plan .pricing-card {
          text-align: center;
        }
        .pricing-grid.single-plan .feature-item {
          justify-content: center;
        }
        .pricing-grid.single-plan .negotiation-block {
          text-align: left;
        }

        .pricing-card {
          position: relative; background: var(--bg-card); border: 1px solid var(--border);
          padding: 2.5rem 2rem;
          clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
          transition: border-color 0.4s, transform 0.4s, box-shadow 0.4s;
          cursor: default;
          box-shadow: 0 4px 24px rgba(26,95,212,0.06), 0 1px 4px rgba(0,0,0,0.04);
          display: flex; flex-direction: column;
        }
        .pricing-card::before {
          content: ''; position: absolute; top: 0; left: 10%; right: 30%; height: 2px;
          background: linear-gradient(90deg, transparent, var(--blue-bright), transparent);
          opacity: 0.25;
        }
        .pricing-card:hover {
          border-color: rgba(26,95,212,0.22); transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(26,95,212,0.10), 0 2px 8px rgba(0,0,0,0.06);
        }

        /* FIX: featured card hover no longer conflicts with framer-motion y transform —
           removed translateY from CSS; motion handles the lift via the animate prop. */
        .pricing-card.featured {
          background: linear-gradient(160deg, rgba(232,240,252,0.9) 0%, #fff 50%, rgba(255,243,234,0.7) 100%);
          border-color: rgba(26,95,212,0.22);
          clip-path: none; border-radius: 4px; overflow: visible; padding-top: 3.5rem;
          box-shadow: 0 16px 50px rgba(26,95,212,0.12), 0 4px 16px rgba(240,120,32,0.06), inset 0 1px 0 rgba(26,95,212,0.10);
        }
        .pricing-card.featured::before {
          background: linear-gradient(90deg, transparent, var(--blue-bright), var(--orange), transparent);
          opacity: 0.4; right: 10%;
        }
        /* FIX: featured hover now only deepens shadow, no competing translateY */
        .pricing-card.featured:hover {
          box-shadow: 0 22px 60px rgba(26,95,212,0.16), 0 6px 20px rgba(240,120,32,0.08), inset 0 1px 0 rgba(26,95,212,0.10);
        }

        .card-accent-tr {
          position: absolute; top: -1px; right: -1px; width: 16px; height: 16px;
          background: rgba(26,95,212,0.18);
          clip-path: polygon(100% 0, 0 0, 100% 100%);
        }
        .pricing-card.featured .card-accent-tr { background: var(--orange); box-shadow: 4px -4px 10px var(--orange-glow); }
        .card-accent-bl {
          position: absolute; bottom: -1px; left: -1px; width: 16px; height: 16px;
          background: rgba(26,95,212,0.10);
          clip-path: polygon(0 100%, 0 0, 100% 100%);
        }
        .pricing-card.featured .card-accent-bl { background: var(--blue-bright); opacity: 0.35; }

        .card-badge {
          position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
          background: linear-gradient(135deg, var(--orange) 0%, #c75f0f 100%);
          color: #fff; font-size: 0.55rem; letter-spacing: 0.18em; text-transform: uppercase;
          padding: 4px 16px;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          white-space: nowrap; box-shadow: 0 4px 14px var(--orange-glow);
        }

        .card-num { font-size: 0.58rem; letter-spacing: 0.18em; color: var(--blue-bright); opacity: 0.5; margin-bottom: 0.6rem; }
        .pricing-card.featured .card-num { color: var(--orange); opacity: 0.7; }

        .card-name {
          font-family: 'Cormorant Garamond', serif; font-weight: 300;
          font-size: 1.9rem; color: var(--text); letter-spacing: 0.04em; margin-bottom: 0.4rem;
        }

        .card-tagline-wrapper { margin-bottom: 1.8rem; }
        .card-tagline { font-size: 0.62rem; letter-spacing: 0.08em; color: #7a90b5; line-height: 1.6; margin-bottom: 0.45rem; }
        .card-note { font-size: 0.52rem; line-height: 1.6; letter-spacing: 0.05em; color: #a8bcd8; }

        .card-price-split { display: flex; flex-direction: column; gap: 0.3rem; margin-bottom: 0.3rem; }
        .split-row { display: flex; flex-direction: column; gap: 2px; }
        .card-price-row { display: flex; align-items: baseline; gap: 6px; }
        .maintenance-row { align-items: baseline; }

        .card-currency { font-size: 0.9rem; color: var(--blue-bright); font-weight: 300; }
        .pricing-card.featured .card-currency { color: var(--orange); }
        .card-currency-sm { font-size: 0.75rem !important; color: var(--text-dim) !important; }

        .card-amount { font-family: 'Cormorant Garamond', serif; font-size: 3.2rem; font-weight: 300; color: var(--text); line-height: 1; }
        .card-amount-sm { font-size: 2rem !important; color: var(--text-dim) !important; }

        .card-period { font-size: 0.6rem; letter-spacing: 0.12em; color: #a8bcd8; }

        .split-label { font-size: 0.56rem; letter-spacing: 0.14em; text-transform: uppercase; line-height: 1; }
        .one-time-label { color: var(--blue-bright); opacity: 0.7; }
        .pricing-card.featured .one-time-label { color: var(--orange); opacity: 0.85; }
        .maintenance-label { color: #a8bcd8; }

        .split-plus { display: flex; align-items: center; gap: 8px; padding: 2px 0; }
        .split-plus-sign {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; color: #a8bcd8; line-height: 1;
        }

        .negotiation-block {
          display: flex; flex-direction: column; gap: 0.75rem;
          margin-bottom: 0.3rem;
          padding: 1.1rem 1rem;
          background: rgba(37,211,102,0.04);
          border: 1px solid rgba(37,211,102,0.18);
          border-radius: 3px;
        }
        .pricing-card.featured .negotiation-block {
          background: rgba(37,211,102,0.07);
          border-color: rgba(37,211,102,0.28);
        }

        .negotiation-label {
          display: flex; align-items: center; gap: 7px;
          font-family: 'Cormorant Garamond', serif; font-weight: 400;
          font-size: 1.4rem; color: var(--text); letter-spacing: 0.02em;
        }
        .negotiation-label.featured { color: var(--text); }

        .negotiation-icon {
          font-size: 0.85rem; color: var(--green);
          animation: pulse-star 2.5s ease-in-out infinite;
        }
        @keyframes pulse-star {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.2); }
        }

        .negotiation-desc {
          font-size: 0.60rem; letter-spacing: 0.07em; color: #6b87aa;
          line-height: 1.7; margin: 0;
        }

        .whatsapp-negotiate-btn {
          display: flex; align-items: center; gap: 9px;
          padding: 10px 14px;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          color: #fff; text-decoration: none;
          font-family: 'DM Mono', monospace;
          font-size: 0.60rem; letter-spacing: 0.13em; text-transform: uppercase;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          transition: all 0.3s; position: relative; overflow: hidden;
          box-shadow: 0 4px 16px rgba(37,211,102,0.25);
          width: 100%;
        }
        .whatsapp-negotiate-btn::after {
          content: ""; position: absolute; top: 0; left: -120%;
          width: 60%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: skewX(-20deg); transition: left 0.7s ease;
        }
        .whatsapp-negotiate-btn:hover::after { left: 120%; }
        .whatsapp-negotiate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(37,211,102,0.35);
        }
        .whatsapp-negotiate-btn.featured { box-shadow: 0 4px 18px rgba(37,211,102,0.35); }

        .wa-icon { width: 15px; height: 15px; flex-shrink: 0; }
        .whatsapp-negotiate-btn span:nth-child(2) { flex: 1; }
        .wa-number {
          font-size: 0.54rem; letter-spacing: 0.08em;
          opacity: 0.80; white-space: nowrap; flex-shrink: 0;
        }

        .card-divider {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, var(--blue-bright), transparent);
          margin: 1.5rem 0; opacity: 0.20;
        }
        .pricing-card.featured .card-divider {
          background: linear-gradient(90deg, var(--blue-bright), var(--orange), transparent); opacity: 0.35;
        }

        .card-features { display: flex; flex-direction: column; gap: 0.7rem; margin-bottom: 1rem; flex: 1; }
        .feature-item { display: flex; align-items: center; gap: 10px; font-size: 0.65rem; letter-spacing: 0.08em; color: #3d5a8a; }
        .feature-check {
          width: 14px; height: 14px; border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          clip-path: polygon(3px 0%, 100% 0%, calc(100% - 3px) 100%, 0% 100%);
          background: rgba(26,95,212,0.04);
        }
        .pricing-card.featured .feature-check { border-color: var(--border-warm); background: rgba(240,120,32,0.04); }
        .feature-check svg { width: 8px; height: 8px; }
        .feature-item.excluded { opacity: 0.28; }

        /* FIX: card-cta base rule defined before its ::after pseudo-element */
        .card-cta {
          width: 100%; padding: 12px; font-family: 'DM Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase;
          cursor: pointer; border: none; transition: all 0.3s;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          margin-top: 1.5rem; position: relative; overflow: hidden;
        }
        .card-cta::after {
          content: ""; position: absolute; top: 0; left: -120%;
          width: 60%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.45), transparent);
          transform: skewX(-20deg); transition: left 0.8s ease; z-index: 1;
        }
        .card-cta:hover::after { left: 120%; }
        .card-cta.outline {
          background: transparent; border: 1px solid var(--border); color: var(--blue-bright);
        }
        .card-cta.outline:hover { background: rgba(26,95,212,0.06); border-color: rgba(26,95,212,0.28); transform: translateY(-2px); }
        .card-cta.solid {
          background: linear-gradient(135deg, var(--orange) 0%, #c75f0f 100%);
          color: #fff; box-shadow: 0 4px 18px var(--orange-glow), 0 2px 8px rgba(0,0,0,0.06);
        }
        .card-cta.solid::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--blue) 0%, #1249aa 100%);
          opacity: 0; transition: opacity 0.3s;
        }
        .card-cta.solid:hover::before { opacity: 1; }
        .card-cta.solid:hover { transform: translateY(-2px); box-shadow: 0 4px 22px var(--blue-glow), 0 2px 8px rgba(0,0,0,0.08); }
        .card-cta span { position: relative; z-index: 1; }

        .pricing-note {
          text-align: center; margin-top: 3rem; font-size: 0.6rem;
          letter-spacing: 0.14em; color: #a8bcd8; text-transform: uppercase;
        }
        .note-blue  { color: rgba(26,95,212,0.55); }
        .note-orange { color: rgba(240,120,32,0.55); }
      `}</style>

      <section
        className="pricing-root"
        id="pricing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
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
                  <div key={i} className="nav-dot-wrap" onClick={() => goTo(i)}>
                    <button
                      className={`nav-dot ${i === currentService ? "active" : ""}`}
                    />
                    {i === currentService && (
                      <svg
                        className={`nav-dot-ring ${!isPaused ? "animating" : ""}`}
                        viewBox="0 0 16 16"
                        key={`${currentService}-${isPaused}`}
                      >
                        <circle cx="8" cy="8" r="7" />
                      </svg>
                    )}
                  </div>
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

            <AnimatePresence mode="wait">
              {isNegotiationService ? (
                <motion.div
                  key={`negotiation-notice-${currentService}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="negotiation-pricing-notice">
                    Pricing tailored to your project
                  </div>
                </motion.div>
              ) : isSplitService ? (
                <motion.div
                  key={`split-toggle-${currentService}`}
                  className="split-toggle-row"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="split-pricing-notice">
                    One-time fee + monthly maintenance
                  </div>
                  <div className="billing-toggle">
                    <span
                      className={`toggle-label ${billing === "monthly" ? "active" : ""}`}
                    >
                      Monthly
                    </span>
                    <div
                      className={`toggle-track ${billing === "yearly" ? "yearly" : ""}`}
                      onClick={() =>
                        setBilling(billing === "monthly" ? "yearly" : "monthly")
                      }
                    >
                      <div className="toggle-thumb" />
                    </div>
                    <span
                      className={`toggle-label ${billing === "yearly" ? "active" : ""}`}
                    >
                      Yearly
                    </span>
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
              ) : isToggleService ? (
                <motion.div
                  key={`toggle-${currentService}`}
                  className="billing-toggle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span
                    className={`toggle-label ${billing === "monthly" ? "active" : ""}`}
                  >
                    Monthly
                  </span>
                  <div
                    className={`toggle-track ${billing === "yearly" ? "yearly" : ""}`}
                    onClick={() =>
                      setBilling(billing === "monthly" ? "yearly" : "monthly")
                    }
                  >
                    <div className="toggle-thumb" />
                  </div>
                  <span
                    className={`toggle-label ${billing === "yearly" ? "active" : ""}`}
                  >
                    Yearly
                  </span>
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
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>

          <div className="cards-row">
            <motion.div
              className="side-arrow"
              onClick={goPrev}
              whileTap={{ scale: 0.92 }}
            >
              <svg viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </motion.div>

            <div className="slide-overflow">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentService}
                  className={`pricing-grid${isSinglePlan ? " single-plan" : ""}`}
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
                      // FIX: featured card lift is now handled solely here via framer-motion;
                      // CSS no longer applies a competing translateY on .featured.
                      animate={{ opacity: 1, y: plan.highlight ? -12 : 0 }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <div className="card-accent-tr" />
                      <div className="card-accent-bl" />

                      {plan.badge && (
                        <div className="card-badge">{plan.badge}</div>
                      )}

                      <div className="card-num">{plan.num}</div>
                      <div className="card-name">{plan.name}</div>
                      <div className="card-tagline-wrapper">
                        <div className="card-tagline">{plan.tagline}</div>
                        {plan.note && (
                          <div className="card-note">{plan.note}</div>
                        )}
                      </div>

                      <PriceDisplay
                        price={plan.price}
                        billing={billing}
                        featured={plan.highlight}
                      />

                      <div className="card-divider" />

                      <div className="card-features">
                        {plan.features.map((f) => (
                          <div key={f} className="feature-item">
                            <div className="feature-check">
                              <svg viewBox="0 0 8 8" fill="none">
                                <polyline
                                  points="1,4 3,6.5 7,1.5"
                                  stroke={
                                    plan.highlight
                                      ? "var(--orange)"
                                      : "var(--blue-bright)"
                                  }
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
                                <line
                                  x1="2"
                                  y1="2"
                                  x2="6"
                                  y2="6"
                                  stroke="#a8bcd8"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                />
                                <line
                                  x1="6"
                                  y1="2"
                                  x2="2"
                                  y2="6"
                                  stroke="#a8bcd8"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </div>
                            {f}
                          </div>
                        ))}
                      </div>

                      <button
                        className={`card-cta ${plan.highlight ? "solid" : "outline"}`}
                        onClick={() => {
                          if (plan.cta === "Contact Us") {
                            window.open(
                              WHATSAPP_URL,
                              "_blank",
                              "noopener,noreferrer",
                            );
                          } else {
                            navigate("/contact");
                          }
                        }}
                      >
                        {plan.highlight ? <span>{plan.cta}</span> : plan.cta}
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              className="side-arrow"
              onClick={goNext}
              whileTap={{ scale: 0.92 }}
            >
              <svg viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6" />
              </svg>
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
            <span className="note-blue">free consultation</span>
            {" · "}
            <span className="note-orange">NDA on request</span>
            {" · "}
            <span className="note-blue">Flexible payment terms</span>
          </motion.p>
        </div>
      </section>
    </>
  );
};

export default PricingSection;
