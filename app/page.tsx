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
// DISABLED ONLY for cinematic background test — do not delete AuroraBackground.tsx
// import AuroraBackground from "./components/AuroraBackground";
// Previous film-plate test (kept for comparison — do not delete):
// import FilmSetBackground from "./components/FilmSetBackground";
import ActingSceneBackground from "./components/ActingSceneBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-nq-text">
      {/* DISABLED ONLY for cinematic background test — do not delete AuroraBackground.tsx */}
      {/* <AuroraBackground fullPage /> */}
      {/* Previous test: <FilmSetBackground /> */}
      <ActingSceneBackground />
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
