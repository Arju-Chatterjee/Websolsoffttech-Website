import Hero from "../components/Hero";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
import ContactCTA from "../components/ContactCTA";
import OurProcess from "../components/OurProcess";
// import PriceCard from "../components/PriceCard";
// import ShowServices from "../components/ShowServices";
// import PortfolioSection from "../components/PortfolioSection";
// import ContactSection from "../components/ContactSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <WhyChooseUs />
      <OurProcess />
      <ContactCTA />
     
      
      {/* Services Section */}
      {/* <ShowServices /> */}
      {/* Pricing Section */}
      {/* <PriceCard /> */}
      {/* Add more sections below */}
    </div>
  );
};

export default Home;
