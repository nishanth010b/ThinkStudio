export class WorkPageAnimation {
  constructor() {
    this.root = document;
    this.lines = this.root.querySelectorAll("[data-reveal='line']");
    this.images = this.root.querySelectorAll("[data-reveal='image']");
    this.init();
  }
  linesAnimation() {
    this.lines.forEach((line) => {
      gsap.set(line, { transformOrigin: "left center" });
      gsap.fromTo(
        line,
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: line,
            start: "top 80%",
            once: true,
          },
        }
      );
    });
  }

  imagesAnimation() {
    this.images.forEach((image) => {
      gsap.set(image, { transformOrigin: "center center" });
      gsap.fromTo(
        image,
        {
          scale: 0.99,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: image,
            start: "top 90%",
            once: true,
          },
        }
      );
    });
  }

  heroScale() {
    const hero = this.root.querySelector(".case_hero_video_wrap");

    if (!hero) return;

    gsap.to(hero, {
      scale: 0.93,
      ease: "linear",
      duration: 0.6,
      opacity: 0.5,
      scrollTrigger: {
        trigger: hero,
        start: "center top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
        toggleActions: "play reverse play reverse",
      },
    });
  }

  tagsReveal() {
    const tags = this.root.querySelectorAll(".case_tags_item");
    if (!tags.length) return;
    gsap.fromTo(
      tags,
      {
        autoAlpha: 0,
        y: 20,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: tags,
          start: "top 90%",
          once: true,
        },
      }
    );
  }

  init() {
    if (this.lines.length) {
      this.linesAnimation();
    }
    if (this.images.length) {
      this.imagesAnimation();
    }

    this.heroScale();
    this.tagsReveal();
  }
}
