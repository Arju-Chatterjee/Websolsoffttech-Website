// import { useRef, useState } from "react";
// import { motion, useInView, AnimatePresence } from "framer-motion";

// const WHATSAPP_URL = "https://wa.me/9233770627";

// const cases = [
//   {
//     id: 1,
//     tag: "Digital Marketing",
//     headline: "300% Traffic Surge in 90 Days",
//     sub: "A local e-commerce brand was invisible on Google. We rebuilt their SEO foundation, launched targeted Meta & Google ad campaigns, and optimised their landing pages — tripling organic traffic and doubling conversion rate.",
//     metrics: [
//       { val: "300%", lbl: "Organic Traffic Growth" },
//       { val: "2.1×",  lbl: "Conversion Rate" },
//       { val: "₹4.2L", lbl: "Ad Revenue Generated" },
//     ],
//     accent: "#f07820",
//     shadow: "rgba(240,120,32,0.4)",
//     meshA: "rgba(240,120,32,0.12)",
//     warm: true,
//     index: "01",
//   },
//   {
//     id: 2,
//     tag: "Website Development",
//     headline: "0 → 10k Users in 6 Weeks",
//     sub: "A SaaS startup needed a high-performance marketing site fast. We designed and built a fully responsive Next.js site with sub-1s load times, integrated analytics, and a conversion-optimised pricing page.",
//     metrics: [
//       { val: "0.8s",  lbl: "Page Load Time" },
//       { val: "10k+",  lbl: "Users at Launch" },
//       { val: "38%",   lbl: "Sign-up Conversion" },
//     ],
//     accent: "#3d82f5",
//     shadow: "rgba(61,130,245,0.4)",
//     meshA: "rgba(61,130,245,0.12)",
//     warm: false,
//     index: "02",
//   },
//   {
//     id: 3,
//     tag: "Mobile App",
//     headline: "4.8★ App Shipped in 10 Weeks",
//     sub: "A fitness startup wanted a React Native app for iOS & Android simultaneously. We delivered a full-featured app with real-time workout tracking, push notifications, and in-app purchases — rated 4.8 stars on launch week.",
//     metrics: [
//       { val: "4.8★",  lbl: "App Store Rating" },
//       { val: "10wk",  lbl: "Delivery Timeline" },
//       { val: "iOS+",  lbl: "Android Simultaneous" },
//     ],
//     accent: "#f07820",
//     shadow: "rgba(240,120,32,0.4)",
//     meshA: "rgba(240,120,32,0.12)",
//     warm: true,
//     index: "03",
//   },
//   {
//     id: 4,
//     tag: "Software Development",
//     headline: "Custom ERP Cut Ops Cost by 40%",
//     sub: "A manufacturing firm was drowning in spreadsheets. We built a custom ERP with inventory management, real-time reporting, and role-based access — eliminating manual errors and cutting operational overhead by nearly half.",
//     metrics: [
//       { val: "40%",   lbl: "Cost Reduction" },
//       { val: "0",     lbl: "Manual Errors/Month" },
//       { val: "12+",   lbl: "Departments Integrated" },
//     ],
//     accent: "#3d82f5",
//     shadow: "rgba(61,130,245,0.4)",
//     meshA: "rgba(61,130,245,0.12)",
//     warm: false,
//     index: "04",
//   },
// ];

// interface Particle {
//   top: string;
//   left?: string;
//   right?: string;
//   size: number;
//   dur: string;
//   color: string;
//   delay: string;
// }

// const particles: Particle[] = [
//   { top: "15%", left: "8%",   size: 3, dur: "7s",   color: "#3d82f5", delay: "0s"   },
//   { top: "70%", left: "5%",   size: 2, dur: "9s",   color: "#f07820", delay: "1.5s" },
//   { top: "40%", right: "6%",  size: 4, dur: "6s",   color: "#3d82f5", delay: "2s"   },
//   { top: "80%", right: "15%", size: 2, dur: "8.5s", color: "#ff9340", delay: "0.8s" },
//   { top: "10%", right: "30%", size: 2, dur: "11s",  color: "#3d82f5", delay: "3.2s" },
//   { top: "55%", left: "20%",  size: 2, dur: "7.5s", color: "#f07820", delay: "1s"   },
// ];

// const CaseCard = ({ cs, index }: { cs: typeof cases[0]; index: number }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });
//   const [hovered, setHovered] = useState(false);

//   const isEven = index % 2 === 0;

//   return (
//     <motion.div
//       ref={ref}
//       className={`cs-card${cs.warm ? " cs-card-warm" : ""}`}
//       style={{ "--accent": cs.accent, "--shadow": cs.shadow, "--meshA": cs.meshA } as React.CSSProperties}
//       initial={{ opacity: 0, y: 60 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.85, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
//       onHoverStart={() => setHovered(true)}
//       onHoverEnd={() => setHovered(false)}
//     >
//       {/* Mesh background */}
//       <div className="cs-card-mesh" />

//       {/* Bold bottom glow */}
//       <div className="cs-card-glow" />

//       {/* Top border accent */}
//       <div className="cs-card-top" />

//       {/* Corner brackets */}
//       <div className="cs-corner cs-corner-tl" />
//       <div className="cs-corner cs-corner-br" />

//       {/* Header row */}
//       <div className="cs-card-head">
//         <div className="cs-index-badge">{cs.index}</div>
//         <div className="cs-tag-pill">{cs.tag}</div>
//       </div>

//       {/* Big headline */}
//       <h3 className="cs-card-headline">{cs.headline}</h3>

//       {/* Divider */}
//       <div className="cs-divider">
//         <div className="cs-divider-line" />
//         <div className="cs-divider-diamond" />
//         <div className="cs-divider-line" />
//       </div>

//       {/* Body */}
//       <p className="cs-card-body">{cs.sub}</p>

//       {/* Metrics row */}
//       <div className="cs-metrics">
//         {cs.metrics.map((m, i) => (
//           <div key={i} className="cs-metric">
//             <span className="cs-metric-val">{m.val}</span>
//             <span className="cs-metric-lbl">{m.lbl}</span>
//           </div>
//         ))}
//       </div>

//       {/* CTA */}
//       <a
//         href={WHATSAPP_URL}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="cs-card-cta"
//       >
//         <span>Discuss Your Project</span>
//         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M5 12h14M12 5l7 7-7 7"/>
//         </svg>
//       </a>
//     </motion.div>
//   );
// };

// const CaseStudyHighlights = () => {
//   const headRef = useRef<HTMLDivElement>(null);
//   const headInView = useInView(headRef, { once: true, margin: "-60px" });

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Mono:wght@300;400;500&display=swap');

//         /* ── ROOT ── */
//         .cs-root {
//           font-family: 'DM Mono', monospace;
//           background: #060c1a;
//           color: #e8edf8;
//           padding: 7rem 2.5rem 9rem;
//           position: relative;
//           overflow: hidden;
//         }
//         .cs-root::before {
//           content: '';
//           position: absolute; top: 0; left: 0; right: 0; height: 2px;
//           background: linear-gradient(90deg, #3d82f5 0%, #f07820 50%, #3d82f5 100%);
//           box-shadow: 0 0 12px rgba(26,95,212,0.5), 0 0 24px rgba(240,120,32,0.3);
//         }

//         /* ── BACKGROUND ── */
//         .cs-bg {
//           position: absolute; inset: 0; pointer-events: none;
//           background:
//             radial-gradient(ellipse 60% 50% at 10% 20%, rgba(26,95,212,0.11) 0%, transparent 60%),
//             radial-gradient(ellipse 55% 45% at 90% 80%, rgba(240,120,32,0.09) 0%, transparent 55%),
//             radial-gradient(ellipse 45% 40% at 50% 50%, rgba(26,95,212,0.04) 0%, transparent 60%);
//         }
//         .cs-orb-a {
//           position: absolute; border-radius: 50%; pointer-events: none;
//           width: 600px; height: 600px; top: -200px; left: -200px;
//           background: radial-gradient(circle, #1a5fd4 0%, transparent 70%);
//           filter: blur(100px); opacity: 0.15;
//           animation: cs-drift 15s ease-in-out infinite alternate;
//         }
//         .cs-orb-b {
//           position: absolute; border-radius: 50%; pointer-events: none;
//           width: 450px; height: 450px; bottom: -150px; right: -120px;
//           background: radial-gradient(circle, #f07820 0%, transparent 70%);
//           filter: blur(100px); opacity: 0.12;
//           animation: cs-drift 12s ease-in-out infinite alternate-reverse;
//         }
//         @keyframes cs-drift {
//           0%   { transform: translate(0,0) scale(1); }
//           100% { transform: translate(40px, 30px) scale(1.08); }
//         }
//         .cs-diag {
//           position: absolute; top: 0; right: 25%; width: 1px; height: 120%;
//           background: linear-gradient(to bottom, transparent, rgba(61,130,245,0.12) 40%, rgba(240,120,32,0.08) 70%, transparent);
//           transform: rotate(14deg); transform-origin: top center; pointer-events: none;
//         }
//         .cs-scan {
//           position: absolute; left: 0; right: 0; top: 45%; height: 1px;
//           background: linear-gradient(90deg, transparent, rgba(61,130,245,0.07) 35%, rgba(240,120,32,0.07) 65%, transparent);
//           pointer-events: none;
//         }
//         .cs-particle {
//           position: absolute; border-radius: 50%; pointer-events: none;
//           animation: cs-float linear infinite;
//         }
//         @keyframes cs-float {
//           0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.5; }
//           50%  { opacity: 1; }
//           100% { transform: translateY(-75px) translateX(14px) scale(0.3); opacity: 0; }
//         }

//         /* ── INNER ── */
//         .cs-inner {
//           position: relative; z-index: 2;
//           max-width: 1280px; margin: 0 auto;
//         }

//         /* ── HEADER ── */
//         .cs-header {
//           display: grid;
//           grid-template-columns: 1fr auto;
//           align-items: end;
//           gap: 2rem;
//           margin-bottom: 5rem;
//           padding-bottom: 3rem;
//           border-bottom: 1px solid rgba(61,130,245,0.1);
//         }
//         @media (max-width: 700px) {
//           .cs-header { grid-template-columns: 1fr; }
//         }

//         .cs-eyebrow {
//           display: flex; align-items: center; gap: 1rem;
//           margin-bottom: 1.2rem;
//         }
//         .cs-eyebrow-line {
//           width: 40px; height: 2px;
//           background: linear-gradient(90deg, #3d82f5, #f07820);
//           box-shadow: 0 0 8px rgba(26,95,212,0.5);
//         }
//         .cs-eyebrow-text {
//           font-size: 0.62rem; letter-spacing: 0.24em;
//           text-transform: uppercase; color: #f07820; opacity: 0.9;
//         }

//         .cs-headline {
//           font-family: 'Cormorant Garamond', serif;
//           font-weight: 300;
//           font-size: clamp(2.6rem, 5.5vw, 4.4rem);
//           line-height: 1.06; color: #e8edf8;
//           letter-spacing: -0.01em;
//         }
//         .cs-headline em {
//           font-style: italic;
//           background: linear-gradient(100deg, #f07820, #3d82f5);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           filter: drop-shadow(0 0 18px rgba(240,120,32,0.35));
//         }

//         .cs-header-right {
//           display: flex; flex-direction: column;
//           align-items: flex-end; gap: 1rem;
//         }
//         .cs-header-desc {
//           font-size: 0.68rem; line-height: 1.85;
//           letter-spacing: 0.04em; color: #5a7090;
//           max-width: 340px; text-align: right;
//         }
//         @media (max-width: 700px) {
//           .cs-header-right { align-items: flex-start; }
//           .cs-header-desc { text-align: left; }
//         }

//         /* ── GRID ── */
//         .cs-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 28px;
//         }
//         @media (max-width: 800px) {
//           .cs-grid { grid-template-columns: 1fr; }
//         }

//         /* ── CARD ── */
//         .cs-card {
//           position: relative;
//           background: #080f20;
//           border: 1px solid rgba(61,130,245,0.14);
//           padding: 2.4rem 2.2rem 2rem;
//           overflow: hidden;
//           cursor: default;
//           transition: border-color 0.35s ease, transform 0.35s ease;
//           box-shadow:
//             0 0 0 1px rgba(61,130,245,0.06),
//             0 4px 16px rgba(0,0,0,0.55),
//             0 16px 48px rgba(0,0,0,0.45),
//             0 32px 80px rgba(0,0,0,0.35),
//             0 40px 100px -20px rgba(61,130,245,0.2),
//             inset 0 1px 0 rgba(61,130,245,0.1);
//         }
//         .cs-card:hover {
//           border-color: rgba(61,130,245,0.3);
//           box-shadow:
//             0 0 0 1px rgba(61,130,245,0.18),
//             0 8px 24px rgba(0,0,0,0.65),
//             0 24px 60px rgba(0,0,0,0.55),
//             0 48px 96px rgba(0,0,0,0.45),
//             0 56px 120px -20px rgba(61,130,245,0.4),
//             inset 0 1px 0 rgba(61,130,245,0.18);
//         }
//         .cs-card-warm {
//           border-color: rgba(240,120,32,0.14);
//           box-shadow:
//             0 0 0 1px rgba(240,120,32,0.06),
//             0 4px 16px rgba(0,0,0,0.55),
//             0 16px 48px rgba(0,0,0,0.45),
//             0 32px 80px rgba(0,0,0,0.35),
//             0 40px 100px -20px rgba(240,120,32,0.18),
//             inset 0 1px 0 rgba(240,120,32,0.08);
//         }
//         .cs-card-warm:hover {
//           border-color: rgba(240,120,32,0.32);
//           box-shadow:
//             0 0 0 1px rgba(240,120,32,0.2),
//             0 8px 24px rgba(0,0,0,0.65),
//             0 24px 60px rgba(0,0,0,0.55),
//             0 48px 96px rgba(0,0,0,0.45),
//             0 56px 120px -20px rgba(240,120,32,0.38),
//             inset 0 1px 0 rgba(240,120,32,0.16);
//         }

//         /* Mesh */
//         .cs-card-mesh {
//           position: absolute; inset: 0; pointer-events: none;
//           background: radial-gradient(ellipse 80% 60% at 100% 0%, var(--meshA, rgba(61,130,245,0.12)) 0%, transparent 60%);
//           opacity: 0.7; transition: opacity 0.4s;
//         }
//         .cs-card:hover .cs-card-mesh { opacity: 1; }

//         /* Bottom glow */
//         .cs-card-glow {
//           position: absolute; bottom: -50px; left: 50%;
//           transform: translateX(-50%);
//           width: 70%; height: 100px;
//           background: radial-gradient(ellipse, var(--shadow, rgba(61,130,245,0.3)) 0%, transparent 70%);
//           filter: blur(24px); opacity: 0.45; pointer-events: none;
//           transition: opacity 0.4s;
//         }
//         .cs-card:hover .cs-card-glow { opacity: 0.9; }

//         /* Top border */
//         .cs-card-top {
//           position: absolute; top: 0; left: 0; right: 0; height: 2px;
//           background: linear-gradient(90deg, transparent, var(--accent, #3d82f5) 50%, transparent);
//           opacity: 0.55; transition: opacity 0.35s;
//         }
//         .cs-card:hover .cs-card-top { opacity: 1; }

//         /* Corner brackets */
//         .cs-corner {
//           position: absolute; width: 18px; height: 18px;
//           pointer-events: none;
//           transition: width 0.35s ease, height 0.35s ease, opacity 0.35s;
//           opacity: 0.35;
//         }
//         .cs-card:hover .cs-corner { width: 26px; height: 26px; opacity: 0.8; }
//         .cs-corner-tl {
//           top: 10px; left: 10px;
//           border-top: 1px solid var(--accent, #3d82f5);
//           border-left: 1px solid var(--accent, #3d82f5);
//         }
//         .cs-corner-br {
//           bottom: 10px; right: 10px;
//           border-bottom: 1px solid var(--accent, #3d82f5);
//           border-right: 1px solid var(--accent, #3d82f5);
//         }

//         /* Head row */
//         .cs-card-head {
//           display: flex; align-items: center; justify-content: space-between;
//           margin-bottom: 1.6rem;
//         }
//         .cs-index-badge {
//           font-size: 0.5rem; letter-spacing: 0.22em;
//           color: var(--accent, #3d82f5);
//           border: 1px solid var(--accent, #3d82f5);
//           padding: 2px 10px;
//           clip-path: polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%);
//           background: rgba(0,0,0,0.35);
//           opacity: 0.7; transition: opacity 0.3s;
//         }
//         .cs-card:hover .cs-index-badge { opacity: 1; }

//         .cs-tag-pill {
//           font-size: 0.52rem; letter-spacing: 0.16em;
//           text-transform: uppercase;
//           color: var(--accent, #3d82f5);
//           background: color-mix(in srgb, var(--accent, #3d82f5) 10%, transparent);
//           border: 1px solid color-mix(in srgb, var(--accent, #3d82f5) 28%, transparent);
//           padding: 3px 12px;
//           clip-path: polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%);
//           transition: background 0.3s;
//         }
//         .cs-card:hover .cs-tag-pill {
//           background: color-mix(in srgb, var(--accent, #3d82f5) 18%, transparent);
//         }

//         /* Headline */
//         .cs-card-headline {
//           font-family: 'Cormorant Garamond', serif;
//           font-weight: 600;
//           font-size: clamp(1.6rem, 2.8vw, 2.1rem);
//           line-height: 1.15;
//           color: #f0f4ff;
//           letter-spacing: -0.01em;
//           margin-bottom: 1.2rem;
//           text-shadow:
//             0 2px 16px rgba(0,0,0,0.9),
//             0 0 48px var(--shadow, rgba(61,130,245,0.2));
//           transition: color 0.3s;
//         }
//         .cs-card:hover .cs-card-headline { color: #fff; }

//         /* Divider */
//         .cs-divider {
//           display: flex; align-items: center; gap: 10px;
//           margin-bottom: 1.2rem;
//         }
//         .cs-divider-line {
//           flex: 1; height: 1px;
//           background: linear-gradient(90deg, var(--accent, #3d82f5), transparent);
//           opacity: 0.2; transition: opacity 0.3s;
//         }
//         .cs-card:hover .cs-divider-line { opacity: 0.45; }
//         .cs-divider-diamond {
//           width: 5px; height: 5px;
//           background: var(--accent, #3d82f5);
//           transform: rotate(45deg);
//           opacity: 0.5;
//           box-shadow: 0 0 8px var(--accent, #3d82f5);
//         }

//         /* Body */
//         .cs-card-body {
//           font-size: 0.64rem; line-height: 1.9;
//           letter-spacing: 0.04em; color: #4a6480;
//           margin-bottom: 1.8rem;
//           transition: color 0.3s;
//         }
//         .cs-card:hover .cs-card-body { color: #7a90b5; }

//         /* Metrics */
//         .cs-metrics {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 1px;
//           background: rgba(61,130,245,0.08);
//           border: 1px solid rgba(61,130,245,0.08);
//           margin-bottom: 1.8rem;
//         }
//         .cs-card-warm .cs-metrics {
//           background: rgba(240,120,32,0.08);
//           border-color: rgba(240,120,32,0.08);
//         }
//         .cs-metric {
//           background: rgba(6,12,26,0.9);
//           padding: 1rem 0.8rem;
//           display: flex; flex-direction: column; gap: 5px;
//           transition: background 0.3s;
//         }
//         .cs-card:hover .cs-metric {
//           background: color-mix(in srgb, var(--accent, #3d82f5) 5%, #060c1a);
//         }
//         .cs-metric-val {
//           font-family: 'Cormorant Garamond', serif;
//           font-weight: 600;
//           font-size: 1.65rem; line-height: 1;
//           color: var(--accent, #3d82f5);
//           text-shadow: 0 0 24px var(--shadow, rgba(61,130,245,0.5));
//           transition: text-shadow 0.3s;
//         }
//         .cs-card:hover .cs-metric-val {
//           text-shadow: 0 0 36px var(--shadow, rgba(61,130,245,0.7));
//         }
//         .cs-metric-lbl {
//           font-size: 0.5rem; letter-spacing: 0.14em;
//           text-transform: uppercase; color: rgba(120,150,200,0.38);
//           line-height: 1.4;
//         }

//         /* CTA */
//         .cs-card-cta {
//           display: inline-flex; align-items: center; gap: 10px;
//           font-size: 0.6rem; letter-spacing: 0.2em;
//           text-transform: uppercase;
//           color: var(--accent, #3d82f5);
//           text-decoration: none;
//           border: 1px solid color-mix(in srgb, var(--accent, #3d82f5) 25%, transparent);
//           padding: 9px 20px;
//           clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
//           background: color-mix(in srgb, var(--accent, #3d82f5) 6%, transparent);
//           transition: all 0.3s ease;
//           box-shadow: 0 0 0 0 var(--shadow, rgba(61,130,245,0.3));
//         }
//         .cs-card-cta:hover {
//           background: color-mix(in srgb, var(--accent, #3d82f5) 16%, transparent);
//           border-color: color-mix(in srgb, var(--accent, #3d82f5) 55%, transparent);
//           box-shadow: 0 0 24px var(--shadow, rgba(61,130,245,0.3));
//           transform: translateX(4px);
//         }
//         .cs-card-cta svg { transition: transform 0.3s; }
//         .cs-card-cta:hover svg { transform: translateX(4px); }

//         /* ── BOTTOM CTA BANNER ── */
//         .cs-banner {
//           margin-top: 5rem;
//           position: relative;
//           border: 1px solid rgba(61,130,245,0.12);
//           background: #080f20;
//           padding: 3rem 3.5rem;
//           overflow: hidden;
//           display: flex; align-items: center;
//           justify-content: space-between; gap: 2rem;
//           box-shadow:
//             0 4px 16px rgba(0,0,0,0.5),
//             0 20px 60px rgba(0,0,0,0.4),
//             0 40px 100px -20px rgba(61,130,245,0.15),
//             inset 0 1px 0 rgba(61,130,245,0.1);
//         }
//         @media (max-width: 700px) {
//           .cs-banner { flex-direction: column; align-items: flex-start; padding: 2rem; }
//         }
//         .cs-banner::before {
//           content: '';
//           position: absolute; top: 0; left: 0; right: 0; height: 2px;
//           background: linear-gradient(90deg, #3d82f5 0%, #f07820 50%, #3d82f5 100%);
//           opacity: 0.7;
//         }
//         .cs-banner-mesh {
//           position: absolute; inset: 0; pointer-events: none;
//           background:
//             radial-gradient(ellipse 60% 80% at 0% 50%, rgba(61,130,245,0.08) 0%, transparent 60%),
//             radial-gradient(ellipse 40% 60% at 100% 50%, rgba(240,120,32,0.07) 0%, transparent 55%);
//         }
//         .cs-banner-text { position: relative; z-index: 1; }
//         .cs-banner-label {
//           font-size: 0.58rem; letter-spacing: 0.24em;
//           text-transform: uppercase; color: #3d82f5;
//           margin-bottom: 0.7rem; opacity: 0.8;
//         }
//         .cs-banner-heading {
//           font-family: 'Cormorant Garamond', serif;
//           font-weight: 300;
//           font-size: clamp(1.6rem, 3vw, 2.4rem);
//           line-height: 1.1; color: #e8edf8;
//         }
//         .cs-banner-heading em {
//           font-style: italic;
//           background: linear-gradient(100deg, #3d82f5, #f07820);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }
//         .cs-banner-actions {
//           position: relative; z-index: 1;
//           display: flex; align-items: center; gap: 1rem;
//           flex-shrink: 0;
//         }
//         .cs-banner-btn {
//           display: inline-flex; align-items: center; gap: 10px;
//           padding: 13px 32px;
//           font-family: 'DM Mono', monospace;
//           font-size: 0.66rem; letter-spacing: 0.2em;
//           text-transform: uppercase; color: #fff;
//           text-decoration: none;
//           background: linear-gradient(135deg, #25d366 0%, #1aab4f 100%);
//           clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
//           box-shadow:
//             0 0 0 1px rgba(37,211,102,0.3),
//             0 0 28px rgba(37,211,102,0.35),
//             0 8px 32px rgba(0,0,0,0.4);
//           transition: all 0.3s ease; position: relative; overflow: hidden;
//         }
//         .cs-banner-btn::before {
//           content: ''; position: absolute; inset: 0;
//           background: linear-gradient(135deg, #1aab4f, #128c3e);
//           opacity: 0; transition: opacity 0.3s;
//         }
//         .cs-banner-btn:hover::before { opacity: 1; }
//         .cs-banner-btn:hover {
//           box-shadow:
//             0 0 0 1px rgba(37,211,102,0.5),
//             0 0 40px rgba(37,211,102,0.5),
//             0 12px 40px rgba(0,0,0,0.5);
//           transform: translateY(-2px);
//         }
//         .cs-banner-btn svg,
//         .cs-banner-btn span { position: relative; z-index: 1; }

//         .cs-side-label {
//           position: absolute; left: 1.2rem; top: 50%;
//           transform: translateY(-50%) rotate(-90deg);
//           font-size: 0.52rem; letter-spacing: 0.32em;
//           text-transform: uppercase;
//           color: rgba(120,150,200,0.25);
//           white-space: nowrap; display: none; z-index: 10;
//         }
//         @media (min-width: 1280px) { .cs-side-label { display: block; } }
//       `}</style>

//       <section className="cs-root">
//         <div className="cs-bg" />
//         <div className="cs-orb-a" />
//         <div className="cs-orb-b" />
//         <div className="cs-diag" />
//         <div className="cs-scan" />

//         {particles.map((p, i) => (
//           <div key={i} className="cs-particle" style={{
//             top: p.top,
//             left: p.left,
//             right: p.right,
//             width: p.size, height: p.size,
//             background: p.color,
//             boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
//             animationDuration: p.dur,
//             animationDelay: p.delay,
//           }} />
//         ))}

//         <div className="cs-side-label">Websolsoffttech — Case Studies</div>

//         <div className="cs-inner">

//           {/* Header */}
//           <div className="cs-header" ref={headRef}>
//             <div>
//               <motion.div
//                 className="cs-eyebrow"
//                 initial={{ opacity: 0, x: -24 }}
//                 animate={headInView ? { opacity: 1, x: 0 } : {}}
//                 transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
//               >
//                 <div className="cs-eyebrow-line" />
//                 <span className="cs-eyebrow-text">Case Study Highlights</span>
//               </motion.div>

//               <motion.h2
//                 className="cs-headline"
//                 initial={{ opacity: 0, y: 36 }}
//                 animate={headInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
//               >
//                 Real results for<br />
//                 <em>real businesses</em>
//               </motion.h2>
//             </div>

//             <motion.div
//               className="cs-header-right"
//               initial={{ opacity: 0, y: 24 }}
//               animate={headInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.9, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
//             >
//               <p className="cs-header-desc">
//                 Numbers don't lie. Here's a snapshot of what we've built, grown, and transformed for our clients.
//               </p>
//             </motion.div>
//           </div>

//           {/* Cards */}
//           <div className="cs-grid">
//             {cases.map((cs, i) => (
//               <CaseCard key={cs.id} cs={cs} index={i} />
//             ))}
//           </div>

//           {/* Bottom CTA banner */}
//           <motion.div
//             className="cs-banner"
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-60px" }}
//             transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
//           >
//             <div className="cs-banner-mesh" />
//             <div className="cs-banner-text">
//               <div className="cs-banner-label">Ready to be the next success story?</div>
//               <div className="cs-banner-heading">
//                 Let's build something<br />
//                 <em>remarkable together</em>
//               </div>
//             </div>
//             <div className="cs-banner-actions">
//               <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cs-banner-btn">
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
//                 </svg>
//                 <span>Talk to Us on WhatsApp</span>
//               </a>
//             </div>
//           </motion.div>

//         </div>
//       </section>
//     </>
//   );
// };

// export default CaseStudyHighlights;
