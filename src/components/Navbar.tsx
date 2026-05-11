import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { label: "Home", num: "01", path: "/" },
  { label: "Services", num: "02", path: "/services" },
  { label: "Portfolio", num: "03", path: "/portfolio" },
  { label: "About", num: "04", path: "/about" },
  { label: "Contact", num: "05", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Elevate nav on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');

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
          --nav-height:        68px;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .nav-root {
          font-family: 'DM Mono', monospace;
        }
        .nav-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        /* ── Nav bar ── */
        .nav-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          height: var(--nav-height);
          padding: 0 clamp(1rem, 4vw, 2.5rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(20px) saturate(1.6);
          border-bottom: 1px solid var(--border);
          transition: box-shadow 0.3s;
        }
        .nav-bar.scrolled {
          box-shadow: 0 4px 32px rgba(26, 95, 212, 0.13);
        }
        .nav-bar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--brand-blue) 0%, var(--brand-orange) 100%);
          z-index: 1;
        }

        /* ── Logo ── */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
          z-index: 110;
        }
        .logo-mark {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .logo-mark img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 6px;
        }
        .logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: clamp(1rem, 2.5vw, 1.35rem);
          letter-spacing: 0.14em;
          color: var(--brand-blue-dark);
          text-transform: uppercase;
          white-space: nowrap;
        }
        .logo-text span {
          color: var(--brand-orange);
        }

        /* ── Desktop Links ── */
        .nav-links {
          display: none;
        }
        @media (min-width: 768px) {
          .nav-links {
            display: flex;
            align-items: center;
            gap: clamp(1.2rem, 2.5vw, 2.5rem);
          }
        }

        .nav-link {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          cursor: pointer;
          padding: 4px 0;
          text-decoration: none;
        }
        .nav-link-num {
          font-size: 0.58rem;
          letter-spacing: 0.12em;
          color: var(--brand-orange);
          opacity: 0.65;
          transition: opacity 0.3s;
        }
        .nav-link-label {
          font-family: 'DM Mono', monospace;
          font-size: clamp(0.6rem, 1vw, 0.72rem);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-mid);
          transition: color 0.3s;
          white-space: nowrap;
        }
        .nav-link-bar {
          position: absolute;
          bottom: -2px;
          left: 0;
          height: 2px;
          width: 0%;
          background: linear-gradient(90deg, var(--brand-blue), var(--brand-orange));
          border-radius: 2px;
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-link:hover .nav-link-label  { color: var(--brand-blue-dark); }
        .nav-link:hover .nav-link-num    { opacity: 1; }
        .nav-link:hover .nav-link-bar    { width: 100%; }
        .nav-link.active .nav-link-label { color: var(--brand-blue-dark); }
        .nav-link.active .nav-link-bar   { width: 100%; }

        /* ── CTA button ── */
        .nav-cta {
          display: none;
        }
        @media (min-width: 768px) {
          .nav-cta {
            display: flex;
            align-items: center;
            flex-shrink: 0;
          }
        }

        .cta-btn {
          display: inline-block;
          position: relative;
          padding: 9px 22px;
          font-family: 'DM Mono', monospace;
          font-size: 0.66rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #fff;
          text-decoration: none;
          background: linear-gradient(135deg, var(--brand-orange) 0%, var(--brand-orange-dark) 100%);
          border: none;
          cursor: pointer;
          overflow: hidden;
          white-space: nowrap;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          box-shadow: 0 4px 14px rgba(240, 120, 32, 0.35);
          transition: background 0.3s, box-shadow 0.3s;
        }
        .cta-btn:hover {
          background: linear-gradient(135deg, var(--brand-blue) 0%, var(--brand-blue-dark) 100%);
          box-shadow: 0 4px 18px rgba(26, 95, 212, 0.4);
          text-decoration: none;
        }

        /* ── Hamburger ── */
        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 8px;
          z-index: 210;
          background: none;
          border: none;
          outline: none;
          margin-left: auto;
        }
        @media (min-width: 768px) {
          .hamburger {
            display: none;
          }
        }

        .ham-line {
          display: block;
          width: 24px;
          height: 2px;
          border-radius: 2px;
          background: var(--brand-blue);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
                      opacity 0.3s,
                      width 0.3s,
                      background 0.3s;
          transform-origin: center;
        }
        .ham-open .ham-line              { background: var(--brand-orange); }
        .ham-open .ham-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .ham-open .ham-line:nth-child(2) { opacity: 0; width: 0; }
        .ham-open .ham-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile Overlay ── */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 190;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: calc(var(--nav-height) + 2rem) clamp(1.5rem, 6vw, 3rem) 3rem;
          overflow: hidden;
          overscroll-behavior: contain;
        }
        .mobile-overlay::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 45%;
          height: 100%;
          background: linear-gradient(160deg, var(--brand-blue-light) 0%, var(--brand-orange-light) 100%);
          clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%);
          z-index: -1;
          opacity: 0.7;
        }

        .mobile-menu-item {
          display: flex;
          align-items: baseline;
          gap: 1.2rem;
          padding: clamp(0.8rem, 2.5vw, 1.2rem) 0;
          border-bottom: 1px solid rgba(26, 95, 212, 0.1);
          cursor: pointer;
          overflow: hidden;
          text-decoration: none;
        }
        .mobile-menu-item:first-of-type {
          border-top: 1px solid rgba(26, 95, 212, 0.1);
        }

        .mobile-num {
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          color: var(--brand-orange);
          opacity: 0.7;
          flex-shrink: 0;
        }
        .mobile-label {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2rem, 8vw, 3.2rem);
          letter-spacing: 0.04em;
          color: var(--text-dark);
          line-height: 1;
          transition: color 0.3s, letter-spacing 0.4s;
        }
        .mobile-menu-item:hover .mobile-label {
          color: var(--brand-blue);
          letter-spacing: 0.1em;
        }

        .mobile-cta-wrap {
          margin-top: 2rem;
        }
        .mobile-cta-btn {
          display: inline-block;
          padding: 11px 28px;
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #fff;
          text-decoration: none;
          background: linear-gradient(135deg, var(--brand-orange) 0%, var(--brand-orange-dark) 100%);
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          box-shadow: 0 4px 14px rgba(240, 120, 32, 0.35);
        }

        .cta-btn::after {
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
  transition: left 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Hover trigger */
.cta-btn:hover::after {
  left: 120%;
}

        .mobile-footer {
          margin-top: 2rem;
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        /* ── Spacer so content isn't hidden under fixed nav ── */
        .nav-spacer {
          height: var(--nav-height);
        }
      `}</style>

      <nav className="nav-root">
        <div className={`nav-bar${scrolled ? " scrolled" : ""}`}>

          {/* Logo */}
          <Link to="/" className="nav-logo">
            <div className="logo-mark">
              <img
                src="src/assets/Logo.png"
                alt="Websolsoffttech Logo"
              />
            </div>
            <span className="logo-text">
              Websol<span>soffttech</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <motion.div
            className="nav-links"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {menuItems.map((item, i) => (
              <Link
                key={item.label}
                to={item.path}
                className={`nav-link${activeIndex === i ? " active" : ""}`}
                onClick={() => setActiveIndex(i)}
              >
                <span className="nav-link-num">{item.num}</span>
                <span className="nav-link-label">{item.label}</span>
                <span className="nav-link-bar" />
              </Link>
            ))}
          </motion.div>

          {/* Desktop CTA */}
          <motion.div
            className="nav-cta"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/contact-cta" className="cta-btn">
              Get Started
            </Link>
          </motion.div>

          {/* Hamburger */}
          <button
            className={`hamburger${isOpen ? " ham-open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </button>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="nav-spacer" />

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-overlay nav-root"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {menuItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={item.path}
                  className="mobile-menu-item"
                  onClick={() => {
                    setActiveIndex(i);
                    setIsOpen(false);
                  }}
                >
                  <span className="mobile-num">{item.num}</span>
                  <span className="mobile-label nav-serif">{item.label}</span>
                </Link>
              </motion.div>
            ))}

            {/* Mobile CTA */}
            <motion.div
              className="mobile-cta-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <Link
                to="/contact-cta"
                className="mobile-cta-btn"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </motion.div>

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
