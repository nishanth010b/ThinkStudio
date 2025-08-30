export class FlipOnScroll {
  constructor() {
    gsap.registerPlugin(ScrollTrigger, Flip);

    this.wrapperElements = document.querySelectorAll(
      "[data-flip-element='wrapper']"
    );
    this.targetEl = document.querySelector("[data-flip-element='target']");
    this.tl = null;
    this.resizeTimer = null;

    this.init();
  }

  flipTimeline() {
    if (this.tl) {
      this.tl.kill();
      gsap.set(this.targetEl, { clearProps: "all" });
    }

    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero_primary_wrap",
        start: "top top",
        endTrigger: this.wrapperElements[this.wrapperElements.length - 1],
        end: "center 42%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    this.wrapperElements.forEach((element, index) => {
      if (this.wrapperElements[index + 1]) {
        const nextWrapperEl = this.wrapperElements[index + 1];
        const nextRect = nextWrapperEl.getBoundingClientRect();
        const thisRect = element.getBoundingClientRect();
        const nextDistance =
          nextRect.top + window.scrollY + nextWrapperEl.clientHeight / 2;
        const thisDistance =
          thisRect.top + window.scrollY + element.clientHeight / 2;
        const offset = nextDistance - thisDistance;

        this.tl.add(
          Flip.fit(this.targetEl, nextWrapperEl, {
            duration: offset,
            ease: "none",
          })
        );
      }
    });
  }

  handleResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.flipTimeline();
    }, 100);
  }

  init() {
    this.flipTimeline();
    window.addEventListener("resize", this.handleResize.bind(this));
  }
}
