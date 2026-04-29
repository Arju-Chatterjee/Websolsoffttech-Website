import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  Services: [
    "Web Development",
    "Mobile Apps",
    "Software Development",
    "Digital Marketing",
    "Video & Production",
    "Graphic Designing ",
  ],
  Company: [
    "About Us",
    "Our Process",
    // "Portfolio",
    // "Careers",
    // "Blog",
  ],
  Support: [
    "Contact Us",
    "FAQ",
    "Privacy Policy",
    "Terms of Service",
    "Refund Policy",
  ],
};

const socials = [
  {
    label: "LI",
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/websolsoffttech",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="16"
        height="16"
      >
        <rect x="2" y="2" width="20" height="20" rx="4" />
        <line x1="8" y1="11" x2="8" y2="17" />
        <line x1="8" y1="7" x2="8" y2="8" />
        <path d="M12 17v-6m4 6v-3a2 2 0 0 0-4 0" />
      </svg>
    ),
  },
  // {
  //   label: "TW",
  //   name: "Twitter / X",
  //   href: "#",
  //   icon: (
  //     <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
  //       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  //     </svg>
  //   ),
  // },
  {
    label: "IG",
    name: "Instagram",
    href: "https://www.instagram.com/websolsoffttech.in/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="16"
        height="16"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "GH",
    name: "GitHub",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },

  {
    label: "FB",
    name: "Facebook",
    href: "https://www.facebook.com/websolsoffttech",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M22 12.07C22 6.477 17.523 2 12 2S2 6.477 2 12.07c0 5.018 3.657 9.173 8.438 9.93v-7.02H7.898v-2.91h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.196 2.238.196v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.877h2.773l-.443 2.91h-2.33V22c4.781-.757 8.438-4.912 8.438-9.93z" />
      </svg>
    ),
  },
];

const Footer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.25 + 0.05,
        color: Math.random() > 0.5 ? "26,95,212" : "240,120,32",
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(26,95,212,${0.04 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');

        .footer-root {
          --brand-blue:        #1a5fd4;
          --brand-blue-dark:   #1249aa;
          --brand-blue-light:  #e8f0fc;
          --brand-orange:      #f07820;
          --brand-orange-dark: #c75f0f;
          --brand-orange-light:#fff3ea;
          --text-dark:         #0f2545;
          --text-mid:          #3d5a8a;
          --text-muted:        #7a90b5;
          --text-faint:        #a8bcd8;
          --border:            rgba(26, 95, 212, 0.12);
          --border-warm:       rgba(240, 120, 32, 0.18);

          font-family: 'DM Mono', monospace;
          background: #ffffff;
          position: relative;
          overflow: hidden;
        }

        /* ── TOP ACCENT LINE (mirrors navbar top bar) ── */
        .footer-top-divider {
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, var(--brand-blue) 0%, var(--brand-orange) 100%);
        }

        /* ── CANVAS BG ── */
        .footer-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.5;
        }

        /* ── CTA BANNER ── */
        .footer-cta-banner {
          position: relative;
          z-index: 10;
          border-bottom: 1px solid var(--border);
          padding: 4rem 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 2rem;
          background: linear-gradient(160deg, var(--brand-blue-light) 0%, var(--brand-orange-light) 100%);
        }
        @media (min-width: 768px) {
          .footer-cta-banner {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }

        .cta-banner-left { display: flex; flex-direction: column; gap: 0.6rem; }
        .cta-banner-eyebrow {
          font-size: 0.58rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--brand-orange);
          opacity: 0.85;
        }
        .cta-banner-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          color: var(--text-dark);
          line-height: 1.1;
        }
        .cta-banner-title em {
          font-style: italic;
          color: var(--brand-blue);
        }

        /* CTA button — same as navbar .cta-btn */
        .cta-banner-btn {
          position: relative;
          padding: 13px 36px;
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fff;
          background: linear-gradient(135deg, var(--brand-orange) 0%, var(--brand-orange-dark) 100%);
          border: none;
          cursor: pointer;
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          box-shadow: 0 4px 14px rgba(240, 120, 32, 0.35);
          transition: background 0.3s, box-shadow 0.3s, transform 0.2s;
          white-space: nowrap;
          flex-shrink: 0;
          overflow: hidden;
        }
        .cta-banner-btn:hover {
          background: linear-gradient(135deg, var(--brand-blue) 0%, var(--brand-blue-dark) 100%);
          box-shadow: 0 4px 18px rgba(26, 95, 212, 0.4);
          transform: translateY(-2px);
        }

        /* ── MAIN FOOTER BODY ── */
        .footer-body {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 2.5rem 3rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        @media (min-width: 768px) {
          .footer-body {
            grid-template-columns: 1.4fr repeat(3, 1fr);
            gap: 3rem;
          }
        }

        /* Brand col */
        .footer-brand { display: flex; flex-direction: column; gap: 1.2rem; }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .footer-logo-img {
          width: 40px; height: 40px;
          object-fit: contain;
          border-radius: 6px;
        }
        .footer-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: 1.2rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--brand-blue-dark);
        }
        .footer-logo-text span { color: var(--brand-orange); }

        .footer-brand-desc {
          font-size: 0.63rem;
          letter-spacing: 0.06em;
          line-height: 1.9;
          color: var(--text-muted);
          max-width: 260px;
        }

        /* Socials */
        .footer-socials {
          display: flex;
          gap: 0.7rem;
          margin-top: 0.4rem;
        }
        .social-btn {
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          color: var(--text-muted);
          border: 1px solid var(--border);
          background: rgba(26, 95, 212, 0.04);
          clip-path: polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%);
          cursor: pointer;
          transition: color 0.3s, border-color 0.3s, background 0.3s, box-shadow 0.3s;
          text-decoration: none;
        }
        .social-btn:hover {
          color: var(--brand-orange);
          border-color: var(--border-warm);
          background: rgba(240, 120, 32, 0.07);
          box-shadow: 0 0 12px rgba(240, 120, 32, 0.15);
        }

        /* Contact blurb */
        .footer-contact {
          margin-top: 0.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .contact-item {
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.3s;
          cursor: default;
        }
        .contact-item:hover { color: var(--text-dark); }
        .contact-dot {
          width: 4px; height: 4px;
          background: var(--brand-orange);
          border-radius: 50%;
          flex-shrink: 0;
          opacity: 0.7;
        }

        /* Link columns */
        .footer-col { display: flex; flex-direction: column; gap: 1rem; }
        .footer-col-title {
          font-size: 0.58rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--brand-blue);
          margin-bottom: 0.3rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-col-title::after {
          content: '';
          flex: 1;
          height: 2px;
          background: linear-gradient(90deg, var(--brand-blue), var(--brand-orange), transparent);
          border-radius: 2px;
          opacity: 0.4;
        }

        .footer-link {
          font-size: 0.63rem;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          text-decoration: none;
          cursor: pointer;
          transition: color 0.3s, letter-spacing 0.3s;
          display: flex;
          align-items: center;
          gap: 0;
        }
        .footer-link::before {
          content: '';
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--brand-blue), var(--brand-orange));
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.16,1,0.3,1), margin-right 0.3s;
          margin-right: 0;
        }
        .footer-link:hover {
          color: var(--text-dark);
        }
        .footer-link:hover::before {
          width: 12px;
          margin-right: 8px;
        }

        /* ── BOTTOM BAR ── */
        .footer-bottom {
          position: relative;
          z-index: 10;
          border-top: 1px solid var(--border);
          padding: 1.5rem 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
          text-align: center;
          background: rgba(232, 240, 252, 0.4);
        }
        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }

        .footer-copy {
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .footer-copy span { color: var(--brand-blue); }

        .footer-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.85rem;
          color: var(--text-mid);
          letter-spacing: 0.06em;
        }

        .footer-badge {
          font-size: 0.55rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-faint);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .footer-badge::before {
          content: '';
          width: 16px; height: 2px;
          background: linear-gradient(90deg, var(--brand-blue), var(--brand-orange));
          border-radius: 2px;
          opacity: 0.5;
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-top-divider" />
        <canvas className="footer-canvas" ref={canvasRef} />

        {/* ── CTA BANNER ── */}
        <motion.div
          className="footer-cta-banner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="cta-banner-left">
            <span className="cta-banner-eyebrow">Let's Work Together</span>
            <h3 className="cta-banner-title">
              Ready to build something <em>extraordinary?</em>
            </h3>
          </div>
          <button className="cta-banner-btn">Start a Conversation</button>
        </motion.div>

        {/* ── MAIN BODY ── */}
        <div className="footer-body">
          {/* Brand */}
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <a className="footer-logo" href="#">
              <img
                src="src/assets/Logo.png"
                alt="Websolsoffttech"
                className="footer-logo-img"
              />
              <span className="footer-logo-text">
                Websol<span>soffttech</span>
              </span>
            </a>

            <p className="footer-brand-desc">
              Crafting high-performance digital products with precision
              engineering and refined design. Your vision, our expertise.
            </p>

            <div className="footer-socials">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="social-btn"
                  title={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="contact-item flex items-center gap-2">
              <Mail size={16} />
              info.websolsoffttech@gmail.com
            </div>

            <div className="contact-item flex items-center gap-2">
              <Phone size={16} />
              +91 92337 70627
            </div>

            <div className="contact-item flex items-center gap-2">
              <MapPin size={16} />
              Agartala, Tripura, India
            </div>

            <div className="contact-item flex items-center gap-2">
              <MapPin size={16} />
              Udaipur, Tripura, India
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([col, links], i) => (
            <motion.div
              key={col}
              className="footer-col"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.18 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="footer-col-title">{col}</div>
              {links.map((link) => (
                <a key={link} href="#" className="footer-link">
                  {link}
                </a>
              ))}
            </motion.div>
          ))}
        </div>

        {/* ── BOTTOM BAR ── */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="footer-copy">
            © 2025 <span>Websolsoffttech</span> — All rights reserved
          </p>
          <p className="footer-tagline">
            Engineering the future, one product at a time.
          </p>
          <p className="footer-badge">Made with precision</p>
        </motion.div>
      </footer>
    </>
  );
};

export default Footer;
