import {EcosystemGuide} from "./components/EcosystemGuide";
import Footer from "./components/Footer";
import PartnerCTA from "./components/PartnerCTA";
import AuditionQ from "./components/AuditionQ";
import Ecosystem from "./components/Ecosystem";
import Vision from "./components/Vision";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Innovation from "./components/Innovation";
import Trust from "./components/Trust";
import Future from "./components/Future";

export default function Home() {
  return (
    <main className="min-h-screen bg-nq-bg text-nq-text">
      <Navbar />
      <Hero />
      <Vision />
      <Ecosystem />
      <AuditionQ />
      <Innovation />
      <Trust />
      <Future />
      <PartnerCTA />
      <Footer />
      

      {/* Floating Interactive Guide */}
      <EcosystemGuide />
    </main>
  );
}
