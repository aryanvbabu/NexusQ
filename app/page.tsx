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
import CastingSceneBand from "./components/CastingSceneBand";
// DISABLED ONLY for cinematic background test — do not delete or edit AuroraBackground.tsx
// import AuroraBackground from "./components/AuroraBackground";
// Previous tests kept — do not delete:
// import FilmSetBackground from "./components/FilmSetBackground";
// import CinematicStudioBackground from "./components/CinematicStudioBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-nq-text">
      {/* DISABLED ONLY for this test — AuroraBackground.tsx is untouched */}
      {/* <AuroraBackground fullPage /> */}
      <div className="relative z-10">
        <Navbar />
        <CastingSceneBand image="/scenes/walk-hero.jpg" pan="left">
          <Hero />
        </CastingSceneBand>
        <CastingSceneBand image="/scenes/walk-vision.jpg" pan="right">
          <Vision />
        </CastingSceneBand>
        <CastingSceneBand image="/scenes/walk-ecosystem.jpg" pan="left">
          <Ecosystem />
        </CastingSceneBand>
        <CastingSceneBand image="/scenes/walk-audition.jpg" pan="right">
          <AuditionQ />
        </CastingSceneBand>
        <CastingSceneBand image="/scenes/walk-innovation.jpg" pan="left">
          <Innovation />
        </CastingSceneBand>
        <CastingSceneBand image="/scenes/walk-trust.jpg" pan="right">
          <Trust />
        </CastingSceneBand>
        <CastingSceneBand image="/scenes/walk-future.jpg" pan="left">
          <Future />
        </CastingSceneBand>
        <CastingSceneBand image="/scenes/walk-partner.jpg" pan="right">
          <PartnerCTA />
        </CastingSceneBand>
        <Footer />
        <EcosystemGuide />
      </div>
    </main>
  );
}
