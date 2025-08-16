export function initSmoothScroll() {
  window.lenis = new window.Lenis({ lerp: 0.15, wheelMultiplier: 1.05 });
  window.lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    window.lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  function raf(time) {
    window.lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return window.lenis;
}
