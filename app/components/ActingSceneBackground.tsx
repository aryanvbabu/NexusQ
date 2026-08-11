"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * TEST ONLY — cinematic acting-scene background.
 * Does not replace AuroraBackground.tsx or FilmSetBackground.tsx.
 *
 * Scene: director-capped cameraman recording + actor performing.
 * Theme-aware for light + dark mode.
 */

export default function ActingSceneBackground() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const ease = "easeInOut" as const;
  const amp = isMobile ? 0.5 : 1;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Theme-aware studio base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#efe6d8] via-[#e4d5c0] to-[#cbb89a] dark:from-[#0b1018] dark:via-[#121a24] dark:to-[#0a0e14]" />

      {/* Ambient lights */}
      <motion.div
        className="absolute left-[-8%] top-[0%] h-[50%] w-[50%] rounded-full bg-amber-300/40 blur-3xl dark:bg-amber-400/18"
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.5, 0.75, 0.5], x: [0, 16 * amp, 0] }
        }
        transition={{ duration: 11, repeat: Infinity, ease }}
      />
      <motion.div
        className="absolute right-[-6%] top-[15%] h-[48%] w-[42%] rounded-full bg-sky-300/30 blur-3xl dark:bg-cyan-400/14"
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.35, 0.55, 0.35], x: [0, -12 * amp, 0] }
        }
        transition={{ duration: 13, repeat: Infinity, ease }}
      />

      {/* Full-viewport scene — cover entire screen (not a bottom box) */}
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 1280 680"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <radialGradient id="spotWarm" cx="50%" cy="20%" r="70%">
              <stop offset="0%" stopColor="#ffd089" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ffd089" stopOpacity="0" />
            </radialGradient>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="10" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* ════════════ SCENERY (behind characters) ════════════ */}

          {/* Back wall */}
          <rect
            x="0"
            y="0"
            width="1280"
            height="480"
            className="fill-[#d5c4ae] dark:fill-[#1a2330]"
          />

          {/* Lighting grid / ceiling beams */}
          <g className="opacity-70 dark:opacity-50">
            <rect x="40" y="28" width="1200" height="10" rx="2" className="fill-[#6b7280] dark:fill-[#4b5563]" />
            {[120, 280, 440, 600, 760, 920, 1080].map((x) => (
              <rect
                key={x}
                x={x}
                y="38"
                width="6"
                height="55"
                rx="1"
                className="fill-[#78716c] dark:fill-[#57534e]"
              />
            ))}
            {/* Hanging softbox left */}
            <rect x="150" y="70" width="90" height="55" rx="6" className="fill-[#f8fafc] dark:fill-[#e2e8f0]" />
            <rect x="155" y="75" width="80" height="45" rx="4" className="fill-[#fde68a] dark:fill-[#fbbf24]/70" />
            {/* Hanging softbox right */}
            <rect x="1020" y="78" width="80" height="48" rx="6" className="fill-[#f8fafc] dark:fill-[#e2e8f0]" />
            <rect x="1025" y="83" width="70" height="38" rx="4" className="fill-[#bae6fd] dark:fill-[#38bdf8]/50" />
          </g>

          {/* Cyclorama backdrop curve */}
          <path
            d="M180 120 Q640 80 1100 120 L1120 470 Q640 520 160 470 Z"
            className="fill-[#ead9c0] dark:fill-[#243040]"
          />
          <ellipse cx="640" cy="455" rx="460" ry="40" fill="url(#spotWarm)" />

          {/* Studio floor */}
          <path
            d="M0 470 L1280 470 L1280 680 L0 680 Z"
            className="fill-[#b59f82] dark:fill-[#141c26]"
          />
          <path
            d="M0 470 Q640 505 1280 470"
            fill="none"
            className="stroke-black/10 dark:stroke-white/10"
            strokeWidth="2"
          />

          {/* Floor reflection wash */}
          <ellipse
            cx="640"
            cy="560"
            rx="480"
            ry="36"
            className="fill-black/8 dark:fill-black/30"
          />

          {/* Left scenery — director chair + plant */}
          <g filter="url(#softShadow)">
            {/* Plant pot */}
            <ellipse cx="95" cy="500" rx="28" ry="10" className="fill-black/15 dark:fill-black/35" />
            <path d="M78 470 L112 470 L106 500 L84 500 Z" className="fill-[#7c2d12] dark:fill-[#5c1a0a]" />
            <ellipse cx="95" cy="470" rx="20" ry="6" className="fill-[#9a3412]" />
            <path
              d="M95 465 Q70 420 55 390 Q85 410 95 440 Q105 410 135 390 Q120 420 95 465"
              className="fill-[#3f7d4e] dark:fill-[#2f6b3d]"
            />
            <path
              d="M95 460 Q88 430 75 405 Q100 425 95 455"
              className="fill-[#4f9a62] dark:fill-[#3d8350]"
            />

            {/* Director chair */}
            <g transform="translate(130,390)">
              <path
                d="M20 20 L20 120 M100 20 L100 120 M20 120 L5 155 M100 120 L115 155 M20 70 L100 70"
                fill="none"
                stroke="#b45309"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <rect x="24" y="28" width="72" height="36" rx="2" className="fill-[#1c1917] dark:fill-[#0c0a09]" />
              <rect x="24" y="74" width="72" height="28" rx="2" className="fill-[#1c1917] dark:fill-[#0c0a09]" />
              <text
                x="60"
                y="52"
                textAnchor="middle"
                className="fill-[#a8a29e]"
                fontSize="11"
                fontFamily="system-ui,sans-serif"
                fontWeight="700"
              >
                DIRECTOR
              </text>
            </g>
          </g>

          {/* Right scenery — equipment cases */}
          <g filter="url(#softShadow)">
            <rect x="1085" y="470" width="95" height="55" rx="6" className="fill-[#1e293b] dark:fill-[#0f172a]" stroke="#64748b" strokeWidth="2" />
            <rect x="1095" y="485" width="30" height="8" rx="2" className="fill-[#94a3b8]" />
            <rect x="1120" y="445" width="85" height="45" rx="6" className="fill-[#334155] dark:fill-[#1e293b]" stroke="#64748b" strokeWidth="2" />
            <rect x="1130" y="458" width="28" height="7" rx="2" className="fill-[#94a3b8]" />
          </g>

          {/* Boom mic overhang */}
          <g className="opacity-80">
            <path
              d="M980 95 L720 210"
              fill="none"
              stroke="#64748b"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <ellipse cx="705" cy="218" rx="28" ry="14" className="fill-[#1e293b] dark:fill-[#0f172a]" />
            <rect x="692" y="212" width="26" height="12" rx="3" className="fill-[#334155]" />
          </g>

          {/* Floor light stands */}
          <g>
            <path d="M250 200 L250 500" stroke="#78716c" strokeWidth="5" />
            <path d="M230 500 L270 500" stroke="#78716c" strokeWidth="6" strokeLinecap="round" />
            <rect x="220" y="175" width="60" height="40" rx="4" className="fill-[#fef3c7] dark:fill-[#fbbf24]/60" />
            <path
              d="M280 195 L360 280 L340 320 L250 230 Z"
              className="fill-amber-200/35 dark:fill-amber-300/15"
            />

            <path d="M1040 210 L1040 500" stroke="#78716c" strokeWidth="5" />
            <path d="M1020 500 L1060 500" stroke="#78716c" strokeWidth="6" strokeLinecap="round" />
            <rect x="1010" y="185" width="60" height="40" rx="4" className="fill-[#e0f2fe] dark:fill-[#38bdf8]/45" />
          </g>

          {/* Clapperboard on floor */}
          <g transform="translate(300,505) rotate(-12)">
            <rect width="78" height="56" rx="3" className="fill-[#0a0a0a]" stroke="#e5e5e5" strokeWidth="2" />
            <rect width="78" height="16" className="fill-[#f5f5f5]" />
            <path d="M0 0 L14 16 M20 0 L34 16 M40 0 L54 16 M60 0 L74 16" stroke="#111" strokeWidth="5" />
          </g>

          {/* ════════════ ACTOR (connected silhouette) ════════════ */}
          <motion.g
            style={{ transformOrigin: "420px 540px", willChange: "transform" }}
            animate={
              prefersReducedMotion
                ? undefined
                : { y: [0, -5 * amp, 0], rotate: [0, -0.8 * amp, 0.6 * amp, 0] }
            }
            transition={{ duration: 5.2, repeat: Infinity, ease }}
          >
            {/* Shadow */}
            <ellipse cx="420" cy="555" rx="48" ry="12" className="fill-black/20 dark:fill-black/45" />

            {/* Shoes */}
            <ellipse cx="398" cy="545" rx="18" ry="8" className="fill-[#1c1917]" />
            <ellipse cx="442" cy="545" rx="18" ry="8" className="fill-[#1c1917]" />

            {/* Legs — continuous from hips */}
            <path
              d="M395 400
                 C392 440 388 490 392 538
                 L410 538
                 C412 490 412 445 415 400
                 Z"
              className="fill-[#2a3548] dark:fill-[#1a2333]"
            />
            <path
              d="M425 400
                 C428 445 430 490 430 538
                 L448 538
                 C450 490 448 445 445 400
                 Z"
              className="fill-[#334155] dark:fill-[#243044]"
            />

            {/* Torso + hips as one shape */}
            <path
              d="M378 275
                 C400 255 440 255 462 275
                 L472 400
                 C445 418 395 418 368 400
                 Z"
              className="fill-[#3b5f8a] dark:fill-[#4a74a8]"
            />
            {/* Lapel / shirt line */}
            <path
              d="M412 278 L420 278 L424 395 L408 395 Z"
              className="fill-[#d4b483]/55"
            />
            {/* Collar */}
            <path
              d="M400 275 L420 292 L440 275 L435 285 L420 298 L405 285 Z"
              className="fill-[#2f4d70] dark:fill-[#3d618c]"
            />

            {/* Neck connected to torso + head */}
            <rect x="408" y="248" width="24" height="32" rx="8" className="fill-[#e2b48f] dark:fill-[#d09a72]" />

            {/* Head */}
            <circle cx="420" cy="225" r="36" className="fill-[#e8bc98] dark:fill-[#d4a07c]" />
            {/* Hair connected over head */}
            <path
              d="M386 220
                 C390 185 420 172 454 190
                 C458 210 448 218 442 222
                 C430 200 410 198 386 220 Z"
              className="fill-[#2a2118] dark:fill-[#1a1410]"
            />
            {/* Ears */}
            <ellipse cx="385" cy="228" rx="7" ry="10" className="fill-[#d9a882] dark:fill-[#c49268]" />
            <ellipse cx="455" cy="228" rx="7" ry="10" className="fill-[#d9a882] dark:fill-[#c49268]" />
            {/* Face */}
            <circle cx="408" cy="226" r="3.2" className="fill-[#2c211c]" />
            <circle cx="432" cy="226" r="3.2" className="fill-[#2c211c]" />
            <path
              d="M410 244 C420 252 430 244"
              fill="none"
              stroke="#9a6b52"
              strokeWidth="2.4"
              strokeLinecap="round"
            />

            {/* Left arm — attached at shoulder, one continuous limb */}
            <motion.g
              style={{ transformOrigin: "378px 295px" }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { rotate: [0, -10 * amp, -4 * amp, 0] }
              }
              transition={{ duration: 4.6, repeat: Infinity, ease }}
            >
              <path
                d="M378 290
                   C350 310 330 350 322 390
                   C318 402 328 408 336 400
                   C348 365 360 330 380 305
                   Z"
                className="fill-[#334e72] dark:fill-[#3f638f]"
              />
              {/* Hand attached to arm end */}
              <ellipse cx="328" cy="402" rx="13" ry="11" className="fill-[#e2b48f] dark:fill-[#d09a72]" />
            </motion.g>

            {/* Right arm — raised acting gesture, attached at shoulder */}
            <motion.g
              style={{ transformOrigin: "462px 295px" }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { rotate: [0, 14 * amp, 6 * amp, 16 * amp, 0] }
              }
              transition={{ duration: 4.0, repeat: Infinity, ease }}
            >
              <path
                d="M462 292
                   C490 275 520 250 545 228
                   C555 220 548 208 536 214
                   C510 240 485 265 460 285
                   Z"
                className="fill-[#3b5f8a] dark:fill-[#4a74a8]"
              />
              <ellipse cx="542" cy="218" rx="14" ry="12" className="fill-[#e2b48f] dark:fill-[#d09a72]" />
            </motion.g>
          </motion.g>

          {/* ════════════ CAMERA + TRIPOD ════════════ */}
          <g filter="url(#softShadow)">
            <path
              d="M820 360 L760 548 M820 360 L880 548 M820 360 L820 548"
              fill="none"
              stroke="#57534e"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <circle cx="760" cy="550" r="9" className="fill-[#292524]" />
            <circle cx="880" cy="550" r="9" className="fill-[#292524]" />
            <circle cx="820" cy="550" r="9" className="fill-[#292524]" />

            <motion.g
              style={{ transformOrigin: "820px 330px" }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { rotate: [0, -1.2 * amp, 0.8 * amp, 0], y: [0, -2 * amp, 0] }
              }
              transition={{ duration: 7, repeat: Infinity, ease }}
            >
              {/* Camera body */}
              <rect
                x="760"
                y="295"
                width="120"
                height="72"
                rx="12"
                className="fill-[#1c1917] dark:fill-[#0c0a09]"
                stroke="#78716c"
                strokeWidth="2"
              />
              {/* Lens — facing actor */}
              <circle
                cx="752"
                cy="330"
                r="30"
                className="fill-[#0f172a]"
                stroke="#94a3b8"
                strokeWidth="4"
              />
              <circle cx="752" cy="330" r="16" className="fill-[#1e293b]" />
              <circle cx="752" cy="330" r="7" className="fill-[#38bdf8]/55" />
              {/* Top handle */}
              <rect x="795" y="278" width="48" height="12" rx="4" className="fill-[#44403c]" />
              {/* Side monitor */}
              <rect
                x="860"
                y="268"
                width="52"
                height="40"
                rx="5"
                className="fill-[#111827]"
                stroke="#64748b"
                strokeWidth="2"
              />
              <rect x="866" y="274" width="40" height="28" rx="2" className="fill-[#0ea5e9]/45" />
              <motion.circle
                cx="880"
                cy="288"
                r="4.5"
                className="fill-red-500"
                animate={
                  prefersReducedMotion ? { opacity: 1 } : { opacity: [1, 0.15, 1] }
                }
                transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.g>
          </g>

          {/* ════════════ CAMERAMAN (connected, director look) ════════════ */}
          <motion.g
            style={{ transformOrigin: "960px 545px", willChange: "transform" }}
            animate={
              prefersReducedMotion
                ? undefined
                : { y: [0, -3 * amp, 0], x: [0, -3 * amp, 2 * amp, 0] }
            }
            transition={{ duration: 6.2, repeat: Infinity, ease }}
          >
            <ellipse cx="960" cy="558" rx="42" ry="11" className="fill-black/20 dark:fill-black/45" />

            {/* Shoes */}
            <ellipse cx="942" cy="548" rx="16" ry="7" className="fill-[#1c1917]" />
            <ellipse cx="978" cy="548" rx="16" ry="7" className="fill-[#1c1917]" />

            {/* Legs continuous */}
            <path
              d="M940 415
                 C938 455 936 500 938 542
                 L954 542
                 C956 500 956 455 955 415
                 Z"
              className="fill-[#1f2937] dark:fill-[#111827]"
            />
            <path
              d="M965 415
                 C966 455 968 500 968 542
                 L984 542
                 C986 500 984 455 980 415
                 Z"
              className="fill-[#273549] dark:fill-[#1a2436]"
            />

            {/* Torso / director jacket — one piece into hips */}
            <path
              d="M922 295
                 C945 272 975 272 998 295
                 L1008 415
                 C980 435 940 435 912 415
                 Z"
              className="fill-[#2c3e50] dark:fill-[#3a5168]"
            />
            {/* Jacket lapels */}
            <path
              d="M948 300 L960 318 L972 300 L968 325 L960 340 L952 325 Z"
              className="fill-[#1e2d3d] dark:fill-[#2a3f52]"
            />
            {/* Red director scarf — attached to collar */}
            <path
              d="M952 308
                 C958 308 968 310 970 320
                 L968 365
                 C960 370 952 365 950 340
                 Z"
              className="fill-[#b91c1c] dark:fill-[#dc2626]"
            />

            {/* Neck */}
            <rect x="948" y="268" width="24" height="30" rx="7" className="fill-[#d2a67a] dark:fill-[#c49268]" />

            {/* Head + director cap (connected) */}
            <motion.g
              style={{ transformOrigin: "960px 250px" }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { rotate: [0, -3.5 * amp, -1 * amp, -4 * amp, 0] }
              }
              transition={{ duration: 5, repeat: Infinity, ease }}
            >
              <circle cx="958" cy="245" r="33" className="fill-[#d9ad84] dark:fill-[#c99a70]" />
              {/* Cap brim + crown as one unit on head */}
              <path
                d="M918 235
                   C925 205 958 195 998 215
                   C1000 230 990 240 980 242
                   L918 242
                   Z"
                className="fill-[#171717] dark:fill-[#0a0a0a]"
              />
              <ellipse cx="958" cy="238" rx="44" ry="12" className="fill-[#262626] dark:fill-[#171717]" />
              <circle cx="958" cy="222" r="4" className="fill-[#ca8a04]" />
              {/* Ear */}
              <ellipse cx="928" cy="248" rx="6" ry="9" className="fill-[#c99a70]" />
              {/* Eye looking toward camera/actor */}
              <circle cx="945" cy="248" r="3" className="fill-[#1c1917]" />
              <path
                d="M940 262 C948 268 956 262"
                fill="none"
                stroke="#8b5e45"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </motion.g>

            {/* Arms attached to shoulders, reaching camera */}
            <motion.g
              style={{ transformOrigin: "922px 315px" }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { rotate: [0, 4 * amp, -2 * amp, 0] }
              }
              transition={{ duration: 3.6, repeat: Infinity, ease }}
            >
              <path
                d="M922 310
                   C885 325 855 335 830 332
                   C820 330 820 318 830 318
                   C858 322 888 315 920 302
                   Z"
                className="fill-[#2c3e50] dark:fill-[#3a5168]"
              />
              <ellipse cx="828" cy="325" rx="12" ry="10" className="fill-[#d2a67a] dark:fill-[#c49268]" />
            </motion.g>

            <path
              d="M998 312
                 C1020 340 1015 375 1000 400
                 C992 408 982 400 988 390
                 C998 365 1005 340 995 315
                 Z"
              className="fill-[#273549] dark:fill-[#31485c]"
            />
            <ellipse cx="996" cy="402" rx="11" ry="9" className="fill-[#d2a67a] dark:fill-[#c49268]" />
          </motion.g>

          {/* Warm spotlight wash over actor */}
          <motion.path
            d="M220 70 L360 500 L500 500 Z"
            className="fill-amber-200/25 dark:fill-amber-300/12"
            animate={
              prefersReducedMotion ? undefined : { opacity: [0.3, 0.55, 0.3] }
            }
            transition={{ duration: 8, repeat: Infinity, ease }}
          />
        </svg>
      </div>

      {/* Soft haze */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-amber-100/15 via-transparent to-sky-100/10 dark:from-amber-400/5 dark:to-cyan-400/5"
          animate={{ opacity: [0.35, 0.6, 0.35], x: ["-2%", "2%", "-2%"] }}
          transition={{ duration: isMobile ? 18 : 14, repeat: Infinity, ease }}
        />
      )}

      {/* Readability veil */}
      <div className="absolute inset-0 bg-nq-bg/30 dark:bg-nq-bg/38" />
    </div>
  );
}
