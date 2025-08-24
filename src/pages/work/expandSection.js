// ExpandSection.js

export class ExpandSection {
  constructor() {
    this.wrap = document.querySelector(".case_expand_text_wrap");
    this.button = this.wrap?.querySelector(".case_expand_button");
    this.para = this.wrap?.querySelector(".case_expand_lower");
    this.init();
  }

  getContentHeight() {
    this.para.style.height = "auto";
    const height = this.para.offsetHeight;
    this.para.style.height = "";
    return height;
  }

  animatePara({ height, autoAlpha, filter, expanded }) {
    gsap.to(this.para, {
      height,
      autoAlpha,
      filter,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        if (expanded) this.para.style.height = "auto";
        this.forceRefresh();
        this.animateButton(expanded);
        this.animateSvg(expanded ? 45 : 0);
      },
    });
  }

  animateButton(expanded) {
    gsap.to(this.button.querySelector(".case_expand_btn_text"), {
      scrambleText: {
        text: expanded ? "Read Less" : "Read More",
        chars: "upperCase",
        speed: 0.7,
      },
      duration: 0.4,
    });
  }

  animateSvg(rotation) {
    gsap.to(this.wrap.querySelector(".case_expand_svg"), {
      rotate: rotation,
      duration: 0.4,
      ease: "expo.inOut",
    });
  }

  expand() {
    if (this.para.getAttribute("data-expanded") === "false") {
      gsap.set(this.para, {
        height: "0px",
        autoAlpha: 0,
        filter: "blur(5px)",
      });
      this.para.setAttribute("data-expanded", "true");
      this.animatePara({
        height: this.getContentHeight(),
        autoAlpha: 1,
        filter: "blur(0px)",
        expanded: true,
      });
    }
  }

  collapse() {
    if (this.para.getAttribute("data-expanded") === "true") {
      this.para.setAttribute("data-expanded", "false");
      this.animatePara({
        height: 0,
        autoAlpha: 0,
        filter: "blur(5px)",
        expanded: false,
      });
    }
  }

  toggle() {
    this.para.getAttribute("data-expanded") === "true"
      ? this.collapse()
      : this.expand();
  }

  mouseHover() {
    const svg = this.button.querySelector(".case_expand_svg");
    this.button.addEventListener("mouseenter", () => {
      gsap.to(svg, { rotate: 90, ease: "expo.inOut", duration: 0.8 });
      gsap.to(this.button, { opacity: 0.9, duration: 0.3 }, "<");
    });
    this.button.addEventListener("mouseleave", () => {
      const rotateValue =
        this.para.getAttribute("data-expanded") === "true" ? 45 : 0;
      gsap.to(svg, { rotate: rotateValue, ease: "expo.inOut", duration: 0.8 });
      gsap.to(this.button, { opacity: 1, duration: 0.3 }, "<");
    });
  }

  init() {
    if (!this.button || !this.para) return;
    this.button.addEventListener("click", () => this.toggle());
    this.mouseHover();
  }

  forceRefresh() {
    window.dispatchEvent(new Event("resize"));
    if (window.ScrollTrigger?.refresh) window.ScrollTrigger.refresh();
    if (window.lenis?.resize) window.lenis.resize();
  }
}
