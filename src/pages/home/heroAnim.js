import { isMobile } from "../../utilities/scripts/checkBreakpoints";

export class HeroAnim {
  constructor() {
    console.log("hero class init");

    this.wrapper = document.querySelector(".hero_primary_wrap");
    this.videoWrap = this.wrapper.querySelector(".hero_primary_video_wrap");
    this.videoHolder = this.wrapper.querySelector(".hero_primary_video_holder");
    this.textContent = this.wrapper.querySelector(".hero_primary_contain");

    this.videoSmallContainer = this.wrapper.querySelector(
      ".hero_primary_video_small"
    );

    this.scaleDown();
    this.handleResize();
  }

  scaleDown() {
    if (!gsap || !ScrollTrigger) {
      console.error("GSAP or ScrollTrigger not loaded");
      return;
    }
    this.originalHeight = this.wrapper.offsetHeight;

    gsap.to(this.videoHolder, {
      scrollTrigger: {
        trigger: this.wrapper,
        start: "top top",
        end: "=+100%",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const videoHeight = this.videoHolder.offsetHeight || 0;
          const topOffset =
            parseFloat(this.videoHolder.getBoundingClientRect().top) || 0;
          const bottomOffset = isMobile() ? 12 : 24;
          const newWrapperHeight = videoHeight + topOffset + bottomOffset;

          this.videoWrap.style.height = `${newWrapperHeight}px`;
        },
        onComplete: () => {
          setTimeout(() => {
            this.videoWrap.style.height = "auto";
          }, 1000);
        },
      },
      width: isMobile() ? "50vw" : "30vw",
      height: isMobile() ? "50vw" : "30vw",
      top: "7rem",
      left: isMobile() ? "0.25rem" : "1.75rem",
      ease: "none",
    });
  }

  handleResize() {
    window.addEventListener("resize", () => {
      this.originalHeight = this.wrapper.offsetHeight;
      ScrollTrigger.refresh();
    });
  }
}
