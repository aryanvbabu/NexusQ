import Footer from "./components/Footer";
import PartnerCTA from "./components/PartnerCTA";
import Innovation from "./components/Innovation";
import AuditionQ from "./components/AuditionQ";
import Ecosystem from "./components/Ecosystem";
import Vision from "./components/Vision";
import Navbar from
"./components/Navbar";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Vision />
      <Ecosystem />
      <AuditionQ />
      <Innovation />
      <PartnerCTA />
      <Footer />
    </main>
  );
}

 