import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const clamp01 = (v) => Math.min(1, Math.max(0, v));

// Reveal windows as fractions of the single 0→1 scroll progress, in the
// verified order (matches the reference site's actual trigger order, not
// just the brief's prose description): yellow, blue, dark, orange.
const BOX_WINDOWS = {
  yellow: [0.22, 0.34],
  blue: [0.34, 0.46],
  dark: [0.46, 0.58],
  orange: [0.58, 0.7],
};

/**
 * Drives the entire hero off ONE normalized scroll progress value (0→1):
 * car x, green trail reveal, headline clip-reveal, and the four stat
 * cards' opacity/translate/scale. Nothing here is time-based — scrolling
 * up simply re-applies the same function at a lower progress, so reverse
 * playback falls out for free.
 */
export function initHeroAnimation({ wrapper, sticky, road, car, trail, headline, boxes }) {
  const ctx = gsap.context(() => {
    let roadWidth = 0;
    let carWidth = 0;
    let halfCar = 0;
    let endX = 0;
    let headlineLeft = 0;
    let headlineWidth = 0;

    function measure() {
      const roadRect = road.getBoundingClientRect();
      roadWidth = roadRect.width;

      const roadHeight = roadRect.height;
      const aspect = car.naturalWidth && car.naturalHeight ? car.naturalWidth / car.naturalHeight : 2.1;
      carWidth = roadHeight * aspect;
      // Ratios calibrated against the reference implementation (which marks
      // "car position" using a smaller fixed offset than the car's true
      // half-width) so the green/headline reveal timing visually matches.
      halfCar = carWidth * 0.179;
      endX = roadWidth - carWidth * 0.358;

      // clip-path doesn't affect layout size, so this rect is the headline's
      // true natural width even while the clip is active.
      const headlineRect = headline.getBoundingClientRect();
      headlineLeft = headlineRect.left - roadRect.left;
      headlineWidth = headlineRect.width;

      gsap.set(trail, { transformOrigin: "left center" });
    }

    function apply(progress) {
      const carX = progress * endX;
      const effectiveX = carX + halfCar;

      gsap.set(car, { x: carX, force3D: true });
      gsap.set(trail, { scaleX: clamp01(effectiveX / roadWidth) });

      const reveal = clamp01((effectiveX - headlineLeft) / headlineWidth);
      gsap.set(headline, { clipPath: `inset(0 ${(1 - reveal) * 100}% 0 0)` });

      boxes.forEach(({ el, key }) => {
        const [start, end] = BOX_WINDOWS[key];
        const t = clamp01((progress - start) / (end - start));
        gsap.set(el, { opacity: t, y: (1 - t) * 14, scale: 0.96 + 0.04 * t });
      });
    }

    measure();

    // Users who've opted into reduced motion get the completed, fully
    // revealed hero statically — no pin, no scrub — rather than being
    // stuck looking at the clipped-away initial state.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(1);
      return;
    }

    apply(0);

    ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      pin: sticky,
      anticipatePin: 1,
      onRefresh: (self) => {
        measure();
        apply(self.progress);
      },
      onUpdate: (self) => apply(self.progress),
    });

    if (car.complete === false) {
      car.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
    }
  }, wrapper);

  return ctx;
}
