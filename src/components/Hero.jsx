"use client";

import { useLayoutEffect, useRef } from "react";
import { initHeroAnimation } from "@/animations/heroAnimation";
import StatCard from "./StatCard";

// Plain <img src> isn't rewritten by Next's basePath the way next/image or
// next/link are, so under a GitHub Pages subpath it 404s unless prefixed
// manually. NEXT_PUBLIC_* is required for an env var to reach client code.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Hero() {
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const headlineRef = useRef(null);
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);
  const box4Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = initHeroAnimation({
      wrapper: wrapperRef.current,
      sticky: stickyRef.current,
      road: roadRef.current,
      car: carRef.current,
      trail: trailRef.current,
      headline: headlineRef.current,
      boxes: [
        { el: box1Ref.current, key: "yellow" },
        { el: box2Ref.current, key: "blue" },
        { el: box3Ref.current, key: "dark" },
        { el: box4Ref.current, key: "orange" },
      ],
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapperRef} className="relative h-[200vh] bg-[#0d0d0d]">
      <div
        ref={stickyRef}
        className="bg-grid sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-white"
      >
        <StatCard
          ref={box1Ref}
          value="58%"
          description="Increase in pick up point use"
          className="top-[5%] right-[30%] bg-[#f5df4d] text-[#0d0d0d]"
        />
        <StatCard
          ref={box2Ref}
          value="23%"
          description="Decreased in customer phone calls"
          className="right-[35%] bottom-[5%] border-2 border-[#0d0d0d] bg-white text-[#0d0d0d]"
        />
        <StatCard
          ref={box3Ref}
          value="27%"
          description="Increase in pick up point use"
          className="top-[5%] right-[10%] bg-[#0d0d0d] text-white"
        />
        <StatCard
          ref={box4Ref}
          value="40%"
          description="Decreased in customer phone calls"
          className="right-[12.5%] bottom-[5%] bg-[#c6f24e] text-[#0d0d0d]"
        />

        <div ref={roadRef} className="relative h-[clamp(140px,22vh,260px)] w-full overflow-hidden bg-[#0d0d0d]">
          <div
            ref={trailRef}
            className="absolute inset-y-0 left-0 z-[1] h-full w-full bg-[#f5df4d]"
            style={{ transform: "scaleX(0)" }}
          />
          <h1
            ref={headlineRef}
            className="absolute top-1/2 left-[5%] z-[5] -translate-y-1/2 text-[clamp(1.75rem,8.5vw,8rem)] font-black whitespace-nowrap text-[#0d0d0d] uppercase"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            WELCOME ITZFIZZ
          </h1>
          <img
            ref={carRef}
            src={`${basePath}/assets/mclaren-720s-top.png`}
            alt="McLaren 720S top view"
            className="absolute top-0 left-0 z-10 h-full w-auto"
            style={{ willChange: "transform" }}
          />
        </div>
      </div>
    </section>
  );
}
