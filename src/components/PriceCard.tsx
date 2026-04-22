// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const plans = [
//   {
//     num: "01",
//     name: "Starter",
//     tagline: "For small businesses getting online",
//     price: { monthly: 299, yearly: 249 },
//     highlight: false,
//     features: [
//       "Up to 5 Pages",
//       "Responsive Design",
//       "Basic SEO Setup",
//       "Contact Form",
//       "1 Month Support",
//       "Domain Setup",
//     ],
//     excluded: ["Custom Animations", "CMS Integration", "E-Commerce", "Priority Support"],
//     cta: "Get Started",
//   },
//   {
//     num: "02",
//     name: "Professional",
//     tagline: "For growing brands that demand more",
//     price: { monthly: 699, yearly: 579 },
//     highlight: true,
//     badge: "Most Popular",
//     features: [
//       "Up to 15 Pages",
//       "Custom UI/UX Design",
//       "Advanced SEO",
//       "CMS Integration",
//       "Custom Animations",
//       "3 Months Support",
//       "Performance Optimized",
//       "Analytics Dashboard",
//     ],
//     excluded: ["E-Commerce", "Dedicated Manager"],
//     cta: "Start Building",
//   },
//   {
//     num: "03",
//     name: "Enterprise",
//     tagline: "Full-scale solutions for serious teams",
//     price: { monthly: 1499, yearly: 1249 },
//     highlight: false,
//     features: [
//       "Unlimited Pages",
//       "Full Custom Development",
//       "E-Commerce Ready",
//       "AI Integration",
//       "Cloud Deployment",
//       "Dedicated Manager",
//       "6 Months Support",
//       "Priority Response",
//       "SLA Guarantee",
//       "Custom Integrations",
//     ],
//     excluded: [],
//     cta: "Contact Us",
//   },
// ];

// const PricingSection = () => {
//   const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');

//         /* ── HERO PALETTE VARIABLES ── */
//         .pricing-root {
//           --blue:         #1a5fd4;
//           --blue-bright:  #3d82f5;
//           --blue-glow:    rgba(26, 95, 212, 0.55);
//           --orange:       #f07820;
//           --orange-bright:#ff9340;
//           --orange-glow:  rgba(240, 120, 32, 0.5);
//           --bg:           #060c1a;
//           --bg-card:      rgba(8, 16, 38, 0.9);
//           --text:         #e8edf8;
//           --text-dim:     #7a90b5;
//           --text-faint:   rgba(120, 150, 200, 0.45);
//           --border:       rgba(61, 130, 245, 0.18);
//           --border-warm:  rgba(240, 120, 32, 0.22);

//           font-family: 'DM Mono', monospace;
//           background: var(--bg);
//           position: relative;
//           overflow: hidden;
//           padding: 7rem 2.5rem;
//         }

//         /* ── BACKGROUND ── */
//         .pricing-bg-grid {
//           position: absolute;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(61,130,245,0.04) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(61,130,245,0.04) 1px, transparent 1px);
//           background-size: 60px 60px;
//           pointer-events: none;
//         }
//         .pricing-glow {
//           position: absolute;
//           top: 0; left: 50%;
//           transform: translateX(-50%);
//           width: 900px; height: 420px;
//           background: radial-gradient(ellipse,
//             rgba(26,95,212,0.1) 0%,
//             rgba(240,120,32,0.06) 50%,
//             transparent 70%);
//           pointer-events: none;
//         }
//         .pricing-glow-br {
//           position: absolute;
//           bottom: -80px; right: -80px;
//           width: 500px; height: 500px;
//           background: radial-gradient(circle, rgba(240,120,32,0.08) 0%, transparent 70%);
//           filter: blur(40px);
//           pointer-events: none;
//         }
//         .pricing-divider-top {
//           position: absolute;
//           top: 0; left: 0; right: 0;
//           height: 1px;
//           background: linear-gradient(90deg,
//             transparent,
//             var(--blue-bright),
//             var(--orange),
//             transparent);
//           opacity: 0.25;
//         }

//         /* ── HEADER ── */
//         .pricing-inner {
//           position: relative;
//           z-index: 10;
//           max-width: 1200px;
//           margin: 0 auto;
//         }

//         .pricing-header {
//           text-align: center;
//           margin-bottom: 4rem;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 1.2rem;
//         }

//         .pricing-eyebrow {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//         }
//         .pricing-eyebrow-line {
//           width: 24px; height: 2px;
//           background: linear-gradient(90deg, var(--blue-bright), var(--orange));
//           border-radius: 2px;
//           box-shadow: 0 0 8px var(--blue-glow);
//         }
//         .pricing-eyebrow-text {
//           font-size: 0.6rem;
//           letter-spacing: 0.22em;
//           text-transform: uppercase;
//           color: var(--blue-bright);
//           opacity: 0.9;
//         }

//         .pricing-title {
//           font-family: 'Cormorant Garamond', serif;
//           font-weight: 300;
//           font-size: clamp(2.4rem, 5vw, 4rem);
//           color: var(--text);
//           letter-spacing: -0.01em;
//           line-height: 1.1;
//         }
//         .pricing-title em {
//           font-style: italic;
//           background: linear-gradient(100deg, var(--blue-bright), var(--orange-bright));
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           filter: drop-shadow(0 0 20px var(--blue-glow));
//         }

//         .pricing-subtitle {
//           font-size: 0.7rem;
//           letter-spacing: 0.08em;
//           color: var(--text-dim);
//           max-width: 440px;
//           line-height: 1.8;
//         }

//         /* ── BILLING TOGGLE ── */
//         .billing-toggle {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           margin-top: 0.5rem;
//         }
//         .toggle-label {
//           font-size: 0.62rem;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           color: var(--text-faint);
//           transition: color 0.3s;
//         }
//         .toggle-label.active { color: var(--text); }

//         .toggle-track {
//           position: relative;
//           width: 44px; height: 22px;
//           background: rgba(61,130,245,0.08);
//           border: 1px solid var(--border);
//           border-radius: 11px;
//           cursor: pointer;
//           transition: background 0.3s;
//         }
//         .toggle-track.yearly {
//           background: rgba(240,120,32,0.1);
//           border-color: var(--border-warm);
//         }
//         .toggle-thumb {
//           position: absolute;
//           top: 3px; left: 3px;
//           width: 14px; height: 14px;
//           background: linear-gradient(135deg, var(--blue-bright), var(--orange));
//           border-radius: 50%;
//           transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
//           box-shadow: 0 0 8px var(--blue-glow);
//         }
//         .toggle-track.yearly .toggle-thumb {
//           transform: translateX(22px);
//           box-shadow: 0 0 8px var(--orange-glow);
//         }

//         .toggle-save {
//           font-size: 0.55rem;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           color: var(--orange-bright);
//           background: rgba(240,120,32,0.1);
//           border: 1px solid var(--border-warm);
//           padding: 3px 10px;
//           clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
//         }

//         /* ── CARDS GRID ── */
//         .pricing-grid {
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 1.5rem;
//           align-items: start;
//         }
//         @media (min-width: 768px) {
//           .pricing-grid { grid-template-columns: repeat(3, 1fr); }
//         }

//         /* ── CARD ── */
//         .pricing-card {
//           position: relative;
//           background: var(--bg-card);
//           border: 1px solid var(--border);
//           padding: 2.5rem 2rem;
//           clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
//           transition: border-color 0.4s, transform 0.4s, box-shadow 0.4s;
//           cursor: default;
//           backdrop-filter: blur(16px);
//           box-shadow:
//             0 0 0 1px rgba(61,130,245,0.05),
//             0 20px 50px rgba(0,0,0,0.5);
//         }
//         .pricing-card::before {
//           content: '';
//           position: absolute;
//           top: 0; left: 10%; right: 30%;
//           height: 1px;
//           background: linear-gradient(90deg, transparent, var(--blue-bright), transparent);
//           opacity: 0.3;
//         }
//         .pricing-card:hover {
//           border-color: rgba(61,130,245,0.35);
//           transform: translateY(-6px);
//           box-shadow:
//             0 0 0 1px rgba(61,130,245,0.1),
//             0 30px 60px rgba(0,0,0,0.6),
//             0 0 40px rgba(26,95,212,0.08);
//         }
//         .pricing-card.featured {
//           background: rgba(26,95,212,0.06);
//           border-color: rgba(61,130,245,0.4);
//           transform: translateY(-12px);
//           box-shadow:
//             0 0 0 1px rgba(61,130,245,0.15),
//             0 30px 70px rgba(0,0,0,0.6),
//             0 0 60px rgba(26,95,212,0.12),
//             inset 0 1px 0 rgba(61,130,245,0.15);
//         }
//         .pricing-card.featured::before {
//           background: linear-gradient(90deg, transparent, var(--blue-bright), var(--orange), transparent);
//           opacity: 0.5;
//           right: 10%;
//         }
//         .pricing-card.featured:hover { transform: translateY(-18px); }

//         /* corner accents */
//         .card-accent-tr {
//           position: absolute;
//           top: 0; right: 0;
//           width: 16px; height: 16px;
//           background: rgba(61,130,245,0.3);
//           clip-path: polygon(100% 0, 0 0, 100% 100%);
//         }
//         .pricing-card.featured .card-accent-tr {
//           background: var(--orange);
//           box-shadow: 4px -4px 12px var(--orange-glow);
//         }
//         .card-accent-bl {
//           position: absolute;
//           bottom: 0; left: 0;
//           width: 16px; height: 16px;
//           background: rgba(61,130,245,0.2);
//           clip-path: polygon(0 100%, 0 0, 100% 100%);
//         }
//         .pricing-card.featured .card-accent-bl {
//           background: var(--blue-bright);
//           opacity: 0.5;
//           box-shadow: -4px 4px 10px var(--blue-glow);
//         }

//         /* badge */
//         .card-badge {
//           position: absolute;
//           top: -12px; left: 50%;
//           transform: translateX(-50%);
//           background: linear-gradient(135deg, var(--orange) 0%, #e05a08 100%);
//           color: #fff;
//           font-size: 0.55rem;
//           letter-spacing: 0.18em;
//           text-transform: uppercase;
//           padding: 4px 16px;
//           clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
//           white-space: nowrap;
//           box-shadow: 0 0 20px var(--orange-glow);
//         }

//         /* card header */
//         .card-num {
//           font-size: 0.58rem;
//           letter-spacing: 0.18em;
//           color: var(--blue-bright);
//           opacity: 0.6;
//           margin-bottom: 0.6rem;
//         }
//         .pricing-card.featured .card-num { color: var(--orange-bright); opacity: 0.8; }

//         .card-name {
//           font-family: 'Cormorant Garamond', serif;
//           font-weight: 300;
//           font-size: 1.9rem;
//           color: var(--text);
//           letter-spacing: 0.04em;
//           margin-bottom: 0.4rem;
//         }
//         .card-tagline {
//           font-size: 0.62rem;
//           letter-spacing: 0.08em;
//           color: var(--text-dim);
//           line-height: 1.6;
//           margin-bottom: 1.8rem;
//         }

//         /* price */
//         .card-price-row {
//           display: flex;
//           align-items: baseline;
//           gap: 6px;
//           margin-bottom: 0.3rem;
//         }
//         .card-currency {
//           font-size: 0.9rem;
//           color: var(--blue-bright);
//           font-weight: 300;
//         }
//         .pricing-card.featured .card-currency { color: var(--orange-bright); }
//         .card-amount {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 3.2rem;
//           font-weight: 300;
//           color: var(--text);
//           line-height: 1;
//           text-shadow: 0 0 30px rgba(61,130,245,0.2);
//         }
//         .pricing-card.featured .card-amount { text-shadow: 0 0 30px rgba(240,120,32,0.2); }
//         .card-period {
//           font-size: 0.6rem;
//           letter-spacing: 0.12em;
//           color: var(--text-faint);
//         }

//         .card-divider {
//           width: 100%;
//           height: 1px;
//           background: linear-gradient(90deg, var(--blue-bright), transparent);
//           margin: 1.5rem 0;
//           opacity: 0.3;
//         }
//         .pricing-card.featured .card-divider {
//           background: linear-gradient(90deg, var(--blue-bright), var(--orange), transparent);
//           opacity: 0.5;
//         }

//         /* features */
//         .card-features { display: flex; flex-direction: column; gap: 0.7rem; margin-bottom: 1rem; }
//         .feature-item {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           font-size: 0.65rem;
//           letter-spacing: 0.08em;
//           color: var(--text-dim);
//         }
//         .feature-check {
//           width: 14px; height: 14px;
//           border: 1px solid var(--border);
//           display: flex; align-items: center; justify-content: center;
//           flex-shrink: 0;
//           clip-path: polygon(3px 0%, 100% 0%, calc(100% - 3px) 100%, 0% 100%);
//           background: rgba(61,130,245,0.05);
//         }
//         .pricing-card.featured .feature-check {
//           border-color: var(--border-warm);
//           background: rgba(240,120,32,0.05);
//         }
//         .feature-check svg { width: 8px; height: 8px; }

//         .feature-item.excluded { opacity: 0.25; }
//         .feature-item.excluded .feature-check {
//           border-color: rgba(255,255,255,0.07);
//           background: transparent;
//         }

//         /* cta button */
//         .card-cta {
//           width: 100%;
//           padding: 12px;
//           font-family: 'DM Mono', monospace;
//           font-size: 0.65rem;
//           letter-spacing: 0.18em;
//           text-transform: uppercase;
//           cursor: pointer;
//           border: none;
//           transition: all 0.3s;
//           clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
//           margin-top: 1.5rem;
//           position: relative;
//           overflow: hidden;
//         }
//         .card-cta.outline {
//           background: transparent;
//           border: 1px solid var(--border);
//           color: var(--blue-bright);
//         }
//         .card-cta.outline:hover {
//           background: rgba(61,130,245,0.08);
//           border-color: rgba(61,130,245,0.4);
//           box-shadow: 0 0 20px rgba(26,95,212,0.15);
//         }
//         .card-cta.solid {
//           background: linear-gradient(135deg, var(--orange) 0%, #e05a08 100%);
//           color: #fff;
//           box-shadow: 0 0 24px var(--orange-glow), 0 4px 12px rgba(0,0,0,0.3);
//         }
//         .card-cta.solid::before {
//           content: '';
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(135deg, var(--blue) 0%, #1249aa 100%);
//           opacity: 0;
//           transition: opacity 0.3s;
//         }
//         .card-cta.solid:hover::before { opacity: 1; }
//         .card-cta.solid:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 0 28px var(--blue-glow), 0 4px 16px rgba(0,0,0,0.4);
//         }
//         .card-cta span { position: relative; z-index: 1; }

//         /* ── BOTTOM NOTE ── */
//         .pricing-note {
//           text-align: center;
//           margin-top: 3rem;
//           font-size: 0.6rem;
//           letter-spacing: 0.14em;
//           color: var(--text-faint);
//           text-transform: uppercase;
//         }
//         .pricing-note .note-blue { color: rgba(61,130,245,0.5); }
//         .pricing-note .note-orange { color: rgba(240,120,32,0.5); }
//       `}</style>

//       <section className="pricing-root">
//         <div className="pricing-bg-grid" />
//         <div className="pricing-glow" />
//         <div className="pricing-glow-br" />
//         <div className="pricing-divider-top" />

//         <div className="pricing-inner">

//           {/* Header */}
//           <motion.div
//             className="pricing-header"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
//           >
//             <div className="pricing-eyebrow">
//               <div className="pricing-eyebrow-line" />
//               <span className="pricing-eyebrow-text">Transparent Pricing</span>
//               <div className="pricing-eyebrow-line" />
//             </div>

//             <h2 className="pricing-title">
//               Investment in Your <em>Digital Future</em>
//             </h2>

//             <p className="pricing-subtitle">
//               No hidden fees. No surprises. Choose a plan that fits your goals
//               and scale as your business grows.
//             </p>

//             {/* Billing toggle */}
//             <div className="billing-toggle">
//               <span className={`toggle-label ${billing === "monthly" ? "active" : ""}`}>Monthly</span>
//               <div
//                 className={`toggle-track ${billing === "yearly" ? "yearly" : ""}`}
//                 onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
//               >
//                 <div className="toggle-thumb" />
//               </div>
//               <span className={`toggle-label ${billing === "yearly" ? "active" : ""}`}>Yearly</span>
//               <AnimatePresence>
//                 {billing === "yearly" && (
//                   <motion.span
//                     className="toggle-save"
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.8 }}
//                   >
//                     Save 17%
//                   </motion.span>
//                 )}
//               </AnimatePresence>
//             </div>
//           </motion.div>

//           {/* Cards */}
//           <div className="pricing-grid">
//             {plans.map((plan, i) => (
//               <motion.div
//                 key={plan.name}
//                 className={`pricing-card ${plan.highlight ? "featured" : ""}`}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
//               >
//                 <div className="card-accent-tr" />
//                 <div className="card-accent-bl" />

//                 {plan.badge && <div className="card-badge">{plan.badge}</div>}

//                 <div className="card-num">{plan.num}</div>
//                 <div className="card-name">{plan.name}</div>
//                 <div className="card-tagline">{plan.tagline}</div>

//                 {/* Price */}
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={billing}
//                     className="card-price-row"
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 10 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <span className="card-currency">$</span>
//                     <span className="card-amount">{plan.price[billing]}</span>
//                     <span className="card-period">/ {billing === "monthly" ? "mo" : "mo, billed yearly"}</span>
//                   </motion.div>
//                 </AnimatePresence>

//                 <div className="card-divider" />

//                 {/* Included features */}
//                 <div className="card-features">
//                   {plan.features.map((f) => (
//                     <div key={f} className="feature-item">
//                       <div className="feature-check">
//                         <svg viewBox="0 0 8 8" fill="none">
//                           <polyline
//                             points="1,4 3,6.5 7,1.5"
//                             stroke={plan.highlight ? "var(--orange-bright)" : "var(--blue-bright)"}
//                             strokeWidth="1.5"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                         </svg>
//                       </div>
//                       {f}
//                     </div>
//                   ))}
//                   {/* Excluded features */}
//                   {plan.excluded.map((f) => (
//                     <div key={f} className="feature-item excluded">
//                       <div className="feature-check">
//                         <svg viewBox="0 0 8 8" fill="none">
//                           <line x1="2" y1="2" x2="6" y2="6" stroke="#7a90b5" strokeWidth="1.2" strokeLinecap="round" />
//                           <line x1="6" y1="2" x2="2" y2="6" stroke="#7a90b5" strokeWidth="1.2" strokeLinecap="round" />
//                         </svg>
//                       </div>
//                       {f}
//                     </div>
//                   ))}
//                 </div>

//                 <button className={`card-cta ${plan.highlight ? "solid" : "outline"}`}>
//                   <span>{plan.cta}</span>
//                 </button>
//               </motion.div>
//             ))}
//           </div>

//           {/* Bottom note */}
//           <motion.p
//             className="pricing-note"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.5 }}
//           >
//             All plans include{" "}
//             <span className="note-blue">free consultation</span>{" · "}
//             <span className="note-orange">NDA on request</span>{" · "}
//             <span className="note-blue">Flexible payment terms</span>
//           </motion.p>

//         </div>
//       </section>
//     </>
//   );
// };

// export default PricingSection;
