import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const menuItems = [
  { label: "Home", num: "01" },
  { label: "Services", num: "02" },
  { label: "Portfolio", num: "03" },
  { label: "About", num: "04" },
  { label: "Contact", num: "05" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');

        /* ── Brand tokens extracted from logo ── */
        :root {
          --brand-blue:        #1a5fd4;
          --brand-blue-dark:   #1249aa;
          --brand-blue-light:  #e8f0fc;
          --brand-orange:      #f07820;
          --brand-orange-dark: #c75f0f;
          --brand-orange-light:#fff3ea;
          --text-dark:         #0f2545;
          --text-mid:          #3d5a8a;
          --text-muted:        #7a90b5;
          --border:            rgba(26, 95, 212, 0.12);
        }

        .nav-root { font-family: 'DM Mono', monospace; }
        .nav-serif { font-family: 'Cormorant Garamond', serif; }

        /* ── Nav bar ── */
        .nav-bar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 0 2.5rem;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.93);
          backdrop-filter: blur(20px) saturate(1.6);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 2px 28px rgba(26, 95, 212, 0.08);
        }

        /* blue→orange gradient top accent line */
        .nav-bar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--brand-blue) 0%, var(--brand-orange) 100%);
        }

        /* ── Logo ── */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .logo-mark {
          width: 42px; height: 42px;
          display: flex; align-items: center; justify-content: center;
        }
        .logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: 1.35rem;
          letter-spacing: 0.14em;
          color: var(--brand-blue-dark);
          text-transform: uppercase;
        }
        .logo-text span { color: var(--brand-orange); }

        /* ── Desktop links ── */
        .nav-links { display: none; }
        @media (min-width: 768px) {
          .nav-links { display: flex; align-items: center; gap: 2.5rem; }
        }

        .nav-link {
          position: relative;
          display: flex; flex-direction: column; align-items: center;
          gap: 2px; cursor: pointer; padding: 4px 0;
        }
        .nav-link-num {
          font-size: 0.6rem; letter-spacing: 0.12em;
          color: var(--brand-orange); opacity: 0.65;
          transition: opacity 0.3s;
        }
        .nav-link-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--text-mid); transition: color 0.3s;
        }
        .nav-link-bar {
          position: absolute; bottom: -2px; left: 0;
          height: 2px; width: 0%;
          background: linear-gradient(90deg, var(--brand-blue), var(--brand-orange));
          border-radius: 2px;
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-link:hover .nav-link-label   { color: var(--brand-blue-dark); }
        .nav-link:hover .nav-link-num     { opacity: 1; }
        .nav-link:hover .nav-link-bar     { width: 100%; }
        .nav-link.active .nav-link-label  { color: var(--brand-blue-dark); }
        .nav-link.active .nav-link-bar    { width: 100%; }

        /* ── CTA button ── */
        .nav-cta { display: none; align-items: center; gap: 1.5rem; }
        @media (min-width: 768px) { .nav-cta { display: flex; } }

        .cta-btn {
          position: relative;
          padding: 9px 22px;
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: #fff;
          background: linear-gradient(135deg, var(--brand-orange) 0%, var(--brand-orange-dark) 100%);
          border: none; cursor: pointer; overflow: hidden;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          box-shadow: 0 4px 14px rgba(240, 120, 32, 0.35);
          transition: background 0.3s, box-shadow 0.3s;
        }
        .cta-btn:hover {
          background: linear-gradient(135deg, var(--brand-blue) 0%, var(--brand-blue-dark) 100%);
          box-shadow: 0 4px 18px rgba(26, 95, 212, 0.4);
        }

        /* ── Hamburger ── */
        .hamburger {
          display: flex; flex-direction: column; gap: 5px;
          cursor: pointer; padding: 8px; z-index: 210;
        }
        @media (min-width: 768px) { .hamburger { display: none; } }

        .ham-line {
          width: 24px; height: 2px; border-radius: 2px;
          background: var(--brand-blue);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s, width 0.3s, background 0.3s;
          transform-origin: center;
        }
        .ham-open .ham-line              { background: var(--brand-orange); }
        .ham-open .ham-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .ham-open .ham-line:nth-child(2) { opacity: 0; width: 0; }
        .ham-open .ham-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile overlay ── */
        .mobile-overlay {
          position: fixed; inset: 0; z-index: 190;
          background: #ffffff;
          display: flex; flex-direction: column; justify-content: center;
          padding: 5rem 3rem;
          overflow: hidden;
        }
        /* decorative diagonal stripe using brand colours */
        .mobile-overlay::after {
          content: '';
          position: absolute; top: 0; right: 0;
          width: 45%; height: 100%;
          background: linear-gradient(160deg, var(--brand-blue-light) 0%, var(--brand-orange-light) 100%);
          clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%);
          z-index: -1;
          opacity: 0.7;
        }

        .mobile-menu-item {
          display: flex; align-items: baseline; gap: 1.5rem;
          padding: 1.2rem 0;
          border-bottom: 1px solid rgba(26, 95, 212, 0.1);
          cursor: pointer; overflow: hidden;
        }
        .mobile-num {
          font-size: 0.62rem; letter-spacing: 0.1em;
          color: var(--brand-orange); opacity: 0.7;
        }
        .mobile-label {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-size: 3.2rem; letter-spacing: 0.04em;
          color: var(--text-dark); line-height: 1;
          transition: color 0.3s, letter-spacing 0.4s;
        }
        .mobile-menu-item:hover .mobile-label {
          color: var(--brand-blue);
          letter-spacing: 0.1em;
        }

        .mobile-footer {
          margin-top: 3rem;
          font-size: 0.62rem; letter-spacing: 0.14em;
          color: var(--text-muted); text-transform: uppercase;
        }

        /* ── Cursor follower ── */
        .cursor-follower {
          position: fixed; width: 8px; height: 8px;
          background: var(--brand-orange);
          border-radius: 50%; pointer-events: none;
          z-index: 9999; mix-blend-mode: multiply;
          transform: translate(-50%, -50%);
        }
      `}</style>

      <motion.div className="cursor-follower" style={{ left: springX, top: springY }} />

      <nav className="nav-root" ref={navRef}>
        <div className="nav-bar">

          {/* Logo */}
          <motion.a
            className="nav-logo" href="#"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="logo-mark">
              <img
                src="src/assets/Logo.png"
                alt="Websolsoffttech Logo"
                style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "6px" }}
              />
            </div>
            <span className="logo-text">Websol<span>soffttech</span></span>
          </motion.a>

          {/* Desktop Links */}
          <motion.div
            className="nav-links"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {menuItems.map((item, i) => (
              <div
                key={item.label}
                className={`nav-link ${activeIndex === i ? "active" : ""}`}
                onClick={() => setActiveIndex(i)}
              >
                <span className="nav-link-num">{item.num}</span>
                <span className="nav-link-label">{item.label}</span>
                <span className="nav-link-bar" />
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="nav-cta"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="cta-btn">Get Started</button>
          </motion.div>

          {/* Hamburger */}
          <div
            className={`hamburger ${isOpen ? "ham-open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="ham-line" />
            <div className="ham-line" />
            <div className="ham-line" />
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-overlay nav-root"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {menuItems.map((item, i) => (
              <motion.div
                key={item.label}
                className="mobile-menu-item"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => { setActiveIndex(i); setIsOpen(false); }}
              >
                <span className="mobile-num">{item.num}</span>
                <span className="mobile-label nav-serif">{item.label}</span>
              </motion.div>
            ))}
            <motion.div
              className="mobile-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              © 2026 Websolsoffttech — All rights reserved
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
 