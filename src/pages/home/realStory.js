import { isMobile } from "../../utilities/scripts/checkBreakpoints";
import { isMobileLandscape } from "../../utilities/scripts/checkBreakpoints";
import isTouch from "../../utilities/scripts/touchDetection";

export class RealStory {
  constructor() {
    this.root = document.querySelector(".real_wrap");
    this.sentences = this.root.querySelectorAll(".real_sticky_text");
    this.imageHolder = this.root.querySelector(".real_image_contain");
    this.workWrap = this.root.querySelector(".work_wrap");
    this.workList = this.workWrap.querySelector(".work_list");
    this.workItems = this.workList.querySelectorAll(".work_list_item");

    //this.textAnimationY();
    this.textAnimationOpacity();
    this.parallaxImage();
    this.stickyWork();
    this.mouseMove();
    this.videoPlayOnEnter();
  }

  textAnimationY() {
    SplitText.create(this.sentences, {
      type: "chars, words",
      tag: "span",
      wordsClass: "word",
      charsClass: "char",
    });

    //   gsap.set(this.sentences, { yPercent: 30, opacity: 0 });

    gsap.set([this.root.querySelectorAll(".char")], {
      opacity: 0,
      rotationX: -40,
      yPercent: 50,
    });

    const tl1 = gsap.timeline({
      defaults: {
        stagger: 0.02,
      },
      scrollTrigger: {
        trigger: this.imageHolder,
        start: "top bottom",
        end: "center center",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    const tl2 = gsap.timeline({
      defaults: {
        stagger: 0.02,
      },
      scrollTrigger: {
        trigger: this.imageHolder,
        start: "center center",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    tl1
      .to(this.sentences[0], {
        yPercent: 0,
        opacity: 1,
      })
      .to(this.sentences[0].querySelectorAll(".char"), {
        opacity: 1,
        rotationX: 0,
        yPercent: 0,
      })
      .to(this.sentences[0].querySelectorAll(".char"), {
        opacity: 0,
        rotationX: 40,
        yPercent: -50,
      });

    tl2
      .to(this.sentences[1].querySelectorAll(".char"), {
        opacity: 1,
        rotationX: 0,
        yPercent: 0,
      })
      .to(this.sentences[1].querySelectorAll(".char"), {
        opacity: 0,
        rotationX: 40,
        yPercent: -50,
      });
  }

  //opacity animation
  textAnimationOpacity() {
    SplitText.create(this.sentences, {
      type: "chars, words",
      tag: "span",
      wordsClass: "word",
      charsClass: "char",
    });

    gsap.set([this.root.querySelectorAll(".char")], {
      opacity: 0,
    });
    gsap.set(".real_sticky_text", {
      opacity: 1,
    });

    const tl = gsap
      .timeline({
        defaults: {
          stagger: { each: 0.03, from: "start" },
        },
        scrollTrigger: {
          trigger: this.imageHolder,
          start: "top bottom",
          end: "bottom bottom-=80%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
      .to(this.sentences[0].querySelectorAll(".char"), {
        opacity: 1,
      })
      .to(this.sentences[0].querySelectorAll(".char"), {
        opacity: 0,
      })
      .to(
        ".real_sticky_bg_dark",
        {
          autoAlpha: 0,
          duration: 0.2,
        },
        "<+=0.5"
      )
      .to(".real_sticky_bg_grad", { autoAlpha: 0, duration: 0.3 }, "<")
      .to(
        this.sentences[1].querySelectorAll(".char"),
        {
          opacity: 1,
        },
        "-=0.1"
      )
      .to(this.sentences[1].querySelectorAll(".char"), {
        opacity: 0,
      });
  }

  stickyWork() {
    if (!this.workWrap || !this.workList || !this.workItems.length) {
      return;
    }

    this.workItems.forEach((item, index) => {
      if (this.workItems[index + 1]) {
        gsap.to(item, {
          opacity: 0,
          yPercent: -10,
          scale: isMobile() ? 0.8 : 0.7,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: isMobile() ? "top 5vh" : "top 10vh",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    gsap.to(".real_sticky_bg_white", {
      autoAlpha: 0,
      duration: 0.2,
      scrollTrigger: {
        trigger: ".services_wrap",
        start: "top bottom",
        toggleActions: "play none none reverse",
      },
    });
  }

  parallaxImage() {
    const images = this.imageHolder.querySelectorAll("[data-parallax-speed]");
    this.items = this.items || [];

    images.forEach((image) => {
      // Find or create the item object for this image
      let item = this.items.find((i) => i.img === image);
      if (!item) {
        item = { img: image, parallaxY: 0, mouseX: 0, mouseY: 0 };
        this.items.push(item);
      }

      const speed = parseFloat(image.getAttribute("data-parallax-speed")) || 0;
      gsap.to(item, {
        parallaxY: () => -(window.innerHeight * speed),
        ease: "none",
        overwrite: "false",
        scrollTrigger: {
          trigger: image,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          this.updateImageTransform(item);
        },
      });
    });
  }

  mouseMove() {
    if (isTouch || isMobileLandscape()) return;
    const images = this.imageHolder.querySelectorAll(".real_image_holder");
    this.items = this.items || [];
    let minArea = Infinity,
      maxArea = -Infinity;

    // Calculate area for each image and find min/max
    images.forEach((img) => {
      const rect = img.getBoundingClientRect();
      const area = rect.width * rect.height;
      let item = this.items.find((i) => i.img === img);
      if (!item) {
        item = { img: img, parallaxY: 0, mouseX: 0, mouseY: 0 };
        this.items.push(item);
      }
      item.area = area;
      if (area < minArea) minArea = area;
      if (area > maxArea) maxArea = area;
    });

    // Assign speed based on normalized area (smaller area = higher speed)
    this.items.forEach((item) => {
      if (item.area !== undefined) {
        const minSpeed = 0.3;
        const maxSpeed = 2.5;
        item.speed =
          ((maxArea - item.area) / (maxArea - minArea)) *
            (maxSpeed - minSpeed) +
          minSpeed;
      }
    });

    this.imageHolder.addEventListener("mousemove", (e) => {
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const mouseX = e.clientX / winW - 0.5;
      const mouseY = e.clientY / winH - 0.5;

      this.items.forEach((item) => {
        if (item.speed !== undefined) {
          item.mouseX = mouseX * item.speed * 50;
          item.mouseY = mouseY * item.speed * 50;
          this.updateImageTransform(item);
        }
      });
    });
  }

  updateImageTransform(item) {
    gsap.set(item.img, {
      x: item.mouseX || 0,
      y: (item.parallaxY || 0) + (item.mouseY || 0),
    });
  }

  videoPlayOnEnter() {
    const videos = this.workItems;
    if (!videos.length) return;

    if (isMobileLandscape()) {
      videos.forEach((el) => {
        const video = el.querySelector("video");
        video.remove();
      });
    } else {
      videos.forEach((el) => {
        const video = el.querySelector("video");
        if (!video) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "center top",
          onEnter: () => video.play(),
          onEnterBack: () => video.play(),
          onLeave: () => video.pause(),
          onLeaveBack: () => video.pause(),
        });
      });
    }
  }
}
