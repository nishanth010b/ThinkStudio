export class LoaderAnimation {
  constructor() {
    this.root = document.querySelector(".hero_primary_wrap");
    if (!this.root) return;

    this.videoWrap = this.root.querySelector(".hero_primary_video_holder");
    this.video = this.root.querySelector("[data-hero-video-holder]");
    this.logoWrap = this.root.querySelector(".loader_logo_wrap");
    this.logo = this.logoWrap.querySelector("svg");
    this.textWrap = this.root.querySelector(".loader_text_wrap");
    this.text = this.textWrap.querySelector(".loader_text");
    this.timeline = gsap.timeline({
      paused: true,
      defaults: {
        ease: CustomEase.create("custom", "M0,0 C0.709,0 0.291,1 1,1 "),
        duration: 1.25,
      },
    });

    this.init();
  }

  init() {
    window.lenis.scrollTo(0, { immediate: true });
    window.lenis.stop();

    const split = SplitText.create(this.text, {
      type: "words",
      wordsClass: "word",
      tag: "span",
    });

    this.timeline
      .set(this.video, { autoAlpha: 0 })
      .set(this.text.querySelectorAll(".word"), { autoAlpha: 0 })
      .set(".nav_contain", { yPercent: 0, autoAlpha: 0 })
      .fromTo(
        this.logo,
        { scale: 0, rotateZ: "-90" },
        { scale: 1, rotateZ: "0" }
      )
      .fromTo(this.textWrap, { width: 0 }, { delay: 0.3, width: "auto" })
      .fromTo(
        this.text.querySelectorAll(".word"),
        { autoAlpha: 0, filter: "blur(5px)", yPercent: 30 },
        {
          autoAlpha: 1,
          stagger: 0.06,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power2.out",
          yPercent: 0,
        },
        "<+=0.5"
      )
      .add(() => {
        Flip.fit(this.video, this.logoWrap, {
          duration: 0,
          absolute: true,
          fit: "to",
        });
      })
      .fromTo(
        this.video,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5 },
        "<"
      )
      .add(() => {
        Flip.fit(this.video, this.videoWrap, {
          ease: "expo.inOut",
          duration: 1.35,
          absolute: true,
        });
      }, "<+=0.1")
      .to(
        this.text,
        {
          autoAlpha: 0,
          xPercent: 80,
          filter: "blur(5px)",
          onComplete: () => {
            window.lenis.start();
            const loader = this.root.querySelector(".loader_wrap");
            loader.remove();
          },
        },
        "<+=0.1"
      )
      .to(
        ".nav_contain",
        { yPercent: 0, autoAlpha: 1, duration: 0.45 },
        "-=0.5"
      );
    this.play();
  }
  play() {
    this.timeline.play();
  }
}
