import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";

// Components
import ContactCTA from "./components/ContactCTA";
import OurProcess from "./components/OurProcess";
import FAQ from "./components/FAQ";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import RefundPolicy from "./components/RefundPolicy";
import WhatsAppPopup from "./components/WhatsappPopup";

function App() {
  return (
    <>
      {/* Global SEO & Local Business Schema */}
      <Helmet>
        <link rel="canonical" href="https://websolsoffttech.in/" />
        <title>WEBSOLSOFFTTECH</title>
        <meta
          name="description"
          content="Leading tech and creative agency in Tripura. We elevate brands through expert Web & Mobile App Development, Digital Marketing, Professional Video Production, and Graphic Design."
        />
        <meta
          name="keywords"
          content="Web Development Tripura, Mobile App Development Tripura, Digital Marketing Tripura, Video Production Tripura, Video Editing, Graphic Design Tripura, Branding Agency, Social Media Creatives, Tech Company Tripura, WebSolsOfftTech"
        />

        {/* Open Graph / Facebook (Helps when links are shared on social media) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://websolsoffttech.in/" />
        <meta property="og:title" content="WebSolsOfftTech | Tech & Creative Agency in Tripura" />
        <meta property="og:description" content="Expert Web & Mobile App Development, Digital Marketing, Video Production, and Graphic Design solutions to enhance your brand visibility." />
        <meta property="og:image" content="https://websolsoffttech.in/logo.png" />

        {/* Advanced Local Business & Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "ProfessionalService"],
            "name": "WebSolsOfftTech",
            "image": "https://websolsoffttech.in/logo.png",
            "url": "https://websolsoffttech.in/",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "Tripura",
              "addressCountry": "IN"
            },
            "description": "Premier tech and creative agency in Tripura offering Web Development, Mobile App Development, Digital Marketing, Professional Video Production, and Creative Graphic Design to enhance brand visibility and engagement.",
            "serviceArea": {
              "@type": "State",
              "name": "Tripura"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Tech and Creative Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Web & Mobile App Development",
                    "description": "High-performance websites and mobile applications tailored to your business needs."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Digital Marketing",
                    "description": "Data-driven marketing strategies to scale your reach and conversion."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Professional Video Production",
                    "description": "Video editing and storytelling to enhance brand visibility and engagement."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Creative Graphic Design",
                    "description": "Branding, social media creatives, and marketing materials."
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>

      {/* Auto scroll to top on every route change */}
      <ScrollToTop />

      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/contact-cta" element={<ContactCTA />} />
        <Route path="/our-process" element={<OurProcess />} />

        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
      </Routes>

      {/* WhatsApp Popup */}
      <WhatsAppPopup />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;