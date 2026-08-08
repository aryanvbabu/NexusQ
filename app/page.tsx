import { EcosystemGuide } from "./components/EcosystemGuide";
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
import AuroraBackground from "./components/AuroraBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen text-nq-text">
      {/* Site-wide interactive starfield */}
      <AuroraBackground fullPage />

      <div className="relative z-10">
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
        <EcosystemGuide />
      </div>
    </main>
  );
}
