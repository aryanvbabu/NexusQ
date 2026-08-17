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
      {/* TEST ONLY — preload the first plate so Chrome paints it immediately */}
      <link
        rel="preload"
        as="image"
        href="/scenes/walk-hero.webp"
        type="image/webp"
        fetchPriority="high"
      />
      {/* DISABLED ONLY for this test — AuroraBackground.tsx is untouched */}
      {/* <AuroraBackground fullPage /> */}
      <div className="relative z-10">
        <Navbar />
        <CastingSceneBand image="/scenes/walk-hero.webp" pan="left" priority>
          <Hero />
        </CastingSceneBand>
        <CastingSceneBand image="/scenes/walk-vision.webp" pan="right">
          <Vision />
        </CastingSceneBand>
        <CastingSceneBand image="/scenes/walk-ecosystem.webp" pan="left">
          <Ecosystem />
        </CastingSceneBand>
        <CastingSceneBand image="/scenes/walk-audition.webp" pan="right">
          <AuditionQ />
        </CastingSceneBand>
        <CastingSceneBand image="/scenes/walk-innovation.webp" pan="left">
          <Innovation />
        </CastingSceneBand>
        <CastingSceneBand image="/scenes/walk-trust.webp" pan="right">
          <Trust />
        </CastingSceneBand>
        <CastingSceneBand image="/scenes/walk-future.webp" pan="left">
          <Future />
        </CastingSceneBand>
        <CastingSceneBand image="/scenes/walk-partner.webp" pan="right">
          <PartnerCTA />
        </CastingSceneBand>
        <Footer />
        <EcosystemGuide />
      </div>
    </main>
  );
}
