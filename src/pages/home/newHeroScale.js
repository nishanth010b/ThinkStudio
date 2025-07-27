import { isMobile } from "../../utilities/scripts/checkBreakpoints";

export class NewHeroScale {
  constructor() {
    this.videoHolder = document.querySelector(".hero_primary_video_holder");
    //this.scaleDown();
    this.widthDown();
  }

  scaleDown() {
    if (!gsap || !ScrollTrigger || !this.videoHolder) return;

    gsap.to(this.videoHolder, {
      scale: () =>
        document.querySelector(".grid4").clientWidth /
        document.querySelector(".hero_primary_contain").clientWidth,
      y: () =>
        isMobile()
          ? 0.5 * window.innerHeight + this.videoHolder.clientHeight * 0.05
          : 0.5 * window.innerHeight,
      top: 130,
      left: isMobile() ? 8 : 20,
      immediateRender: false,
      ease: "none",
      scrollTrigger: {
        trigger: this.videoHolder,
        start: isMobile() ? "top top+=12" : "top top+=20",
        end: "bottom top",
        invalidateOnRefresh: true,
        scrub: true,
      },
    });
    const video = this.videoHolder.querySelector("video");
    gsap.to(video, {
      scale: 1.6,
      ease: "none",
      scrollTrigger: {
        trigger: this.videoHolder,
        start: isMobile() ? "top top+=12" : "top top+=20",
        end: "bottom top",
        invalidateOnRefresh: true,
        scrub: true,
      },
    });
  }

  widthDown() {
    if (!gsap || !ScrollTrigger || !this.videoHolder) return;

    gsap.to(this.videoHolder, {
      width: () => document.querySelector(".grid4").clientWidth,
      height: () => document.querySelector(".grid4").clientWidth,
      y: () =>
        isMobile()
          ? window.innerHeight +
            0.564 * document.querySelector(".grid4").clientWidth
          : window.innerHeight +
            180 -
            document.querySelector(".grid4").clientWidth * 0.6,

      top: 180,
      left: isMobile() ? 8 : 20,
      immediateRender: false,
      ease: "none",
      scrollTrigger: {
        trigger: this.videoHolder,
        start: isMobile() ? "top top+=12" : "top top+=20",
        end: "bottom top",
        invalidateOnRefresh: true,
        scrub: true,
      },
    });
  }
}
