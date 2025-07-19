import { isMobile } from "../../utilities/checkBreakpoints";

export class HeroAnim {
  constructor() {
    console.log("hero class init");

    this.wrapper = document.querySelector(".hero_primary_video_wrap");
    this.videoHolder = this.wrapper.querySelector(".hero_primary_video_holder");
    // this.textContent = this.wrapper.querySelector(".hero_primary_contain");

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
        end: isMobile() ? "bottom 40%" : "bottom 65%",
        scrub: true,
        pin: true,
        //pinSpacing: true,
        anticipatePin: 1,
      },
      width: isMobile() ? "60vw" : "32vw",
      height: isMobile() ? "60vw" : "32vw",
      top: "10rem",
      left: isMobile() ? "0.25rem" : "1.75rem",
      ease: "power1.inOut",
    });
  }

  handleResize() {
    window.addEventListener("resize", () => {
      this.originalHeight = this.wrapper.offsetHeight;
      ScrollTrigger.refresh();
    });
  }
}
