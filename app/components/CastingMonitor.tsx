"use client";

import { useReducedMotion } from "framer-motion";
import { useState } from "react";

/**
 * TEST ONLY — casting-room monitor with real behind-the-scenes footage.
 * Drop your own clip at public/videos/casting-bts.mp4 to override CDN sources.
 */

const VIDEO_SOURCES = [
  "/videos/casting-bts.mp4",
  // Mixkit — studio commercial shoot, BTS (free license)
  "https://assets.mixkit.co/videos/44062/44062-720.mp4",
  // Mixkit — backstage of filming (720p)
  "https://assets.mixkit.co/videos/13241/13241-720.mp4",
  // Pexels — indoor video shoot / lighting setup (BTS)
  "https://videos.pexels.com/video-files/33684356/33684356-sd_640_360_30fps.mp4",
] as const;

const POSTER = "/scenes/casting-audition.webp";

export default function CastingMonitor() {
  const prefersReducedMotion = useReducedMotion();
  const [sourceIndex, setSourceIndex] = useState(0);
  const [usePoster, setUsePoster] = useState(false);

  const showVideo = !prefersReducedMotion && !usePoster;
  const source = VIDEO_SOURCES[sourceIndex];

  return (
    <aside aria-hidden className="nq-casting-monitor">
      <div className="nq-casting-monitor-bezel">
        <div className="nq-casting-monitor-bar">
          <span className="nq-casting-monitor-rec" />
          <span className="nq-casting-monitor-label">Live audition</span>
          <span className="nq-casting-monitor-badge">AuditionQ</span>
        </div>
        <div className="nq-casting-monitor-screen">
          {showVideo ? (
            <video
              key={source}
              className="nq-casting-monitor-video"
              src={source}
              poster={POSTER}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onError={() => {
                if (sourceIndex < VIDEO_SOURCES.length - 1) {
                  setSourceIndex((index) => index + 1);
                } else {
                  setUsePoster(true);
                }
              }}
            />
          ) : (
            <img
              src={POSTER}
              alt=""
              decoding="async"
              loading="lazy"
              draggable={false}
              className="nq-casting-monitor-video"
            />
          )}
          <div className="nq-casting-monitor-scan" />
        </div>
        <div className="nq-casting-monitor-caption">Casting room feed</div>
      </div>
    </aside>
  );
}
