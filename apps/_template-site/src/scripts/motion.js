const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

async function initMotion() {
  if (reduceMotion) return;

  const { gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");

  gsap.registerPlugin(ScrollTrigger);

  gsap.from("[data-hero-item]", {
    y: 28,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.12
  });

  gsap.utils.toArray("[data-reveal]").forEach((element) => {
    gsap.from(element, {
      y: 34,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        once: true
      }
    });
  });

  window.addEventListener("pagehide", () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, { once: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMotion, { once: true });
} else {
  initMotion();
}
