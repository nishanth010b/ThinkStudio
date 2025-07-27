export function initSmoothScroll() {
  window.lenis = new window.Lenis();

  function raf(time) {
    window.lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return window.lenis;
}
