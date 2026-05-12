import { Routes, Route } from "react-router-dom";

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


function App() {
  return (
    <>
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
         <Route path="/FAQ" element={<FAQ />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;