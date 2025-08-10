export function initSmoothScroll() {
  window.lenis = new window.Lenis({ lerp: 0.15, wheelMultiplier: 1.05 });

  function raf(time) {
    window.lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return window.lenis;
}
