export class Marquee {
  constructor() {
    this.marquee = document.querySelector("[data-marquee='wrap']");
    if (!this.marquee) return;
    this.marqueeInner = this.marquee.querySelector("[data-marquee='list']");
    this.animation = null;
    this.gap = parseFloat(getComputedStyle(this.marquee).gap) || 0;
    this.direction =
      this.marquee.getAttribute("data-marquee-direction") || "left";
    this.duration =
      parseFloat(this.marquee.getAttribute("data-marquee-duration")) || 2;

    this.updateDimensions();
    this.setup();
    this.animate();

    this.resizeObserve = new ResizeObserver(this.handleResize.bind(this));
    this.resizeObserve.observe(this.marquee);
  }

  updateDimensions() {
    this.marqueeWidth = this.marquee.offsetWidth;
    this.marqueeInnerWidth = this.marqueeInner.offsetWidth;
  }

  setup() {
    const numOfCopies = Math.ceil(this.marqueeWidth / this.marqueeInnerWidth);

    if (this.wrapper) {
      this.wrapper.remove();
    }

    this.wrapper = document.createElement("div");
    this.wrapper.style.display = "flex";
    this.wrapper.style.gap = `${this.gap}px`;
    this.wrapper.setAttribute("aria-label", "List of elements in marquee");
    if (this.direction === "right") {
      this.wrapper.style.flexDirection = "row-reverse";
    }

    if (this.marqueeInner.parentElement !== this.wrapper) {
      this.marqueeInner.remove();
      this.wrapper.appendChild(this.marqueeInner);
    }

    for (let i = 0; i < numOfCopies; i++) {
      const clone = this.marqueeInner.cloneNode(true);
      this.wrapper.appendChild(clone);
    }

    this.marquee.appendChild(this.wrapper);
  }

  animate() {
    const itemWidth = this.marqueeInnerWidth + this.gap;
    const directionMultiplier = this.direction === "left" ? -1 : 1;

    this.animation = gsap.to(this.wrapper, {
      x: directionMultiplier * itemWidth,
      repeat: -1,
      duration: this.duration,
      ease: "none",
      onRepeat: () => {
        gsap.set(this.wrapper, { x: 0 });
      },
    });
  }

  handleResize() {
    this.updateDimensions();

    if (this.animation) {
      this.animation.kill();
    }

    this.setup();
    this.animate();
  }
}
