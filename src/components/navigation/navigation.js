import { isMobile } from "../../utilities/checkBreakpoints";

export class Nav {
  constructor() {
    this.setUp();
    this.handleMouse();
    this.handleKey();
    this.handleScroll();
    this.svgDot();

    this.menuVideoPlay();
  }

  setUp() {
    this.navWrap = document.querySelector(".nav_wrap");
    this.overlay = this.navWrap.querySelector(".nav_overlay");
    this.menu = this.navWrap.querySelector(".nav_menu_wrap");
    this.menuBtn = this.navWrap.querySelector(".nav_btn_wrap");
    this.menuBtnDots = this.menuBtn.querySelector(".nav_btn_dots");
    this.menuBg = this.menu.querySelectorAll(".nav_menu_bg");
    this.menuList = this.menu.querySelector(".nav_menu_list");
    this.menuLinks = this.menu.querySelectorAll(".nav_menu_item_link");
    this.menuSocialItems = this.menu.querySelectorAll(".nav_social_item");
    this.menuBtnTexts = this.menuBtn.querySelectorAll(".nav_btn_text");
    //timeline
    this.tl = gsap.timeline({
      defaults: { ease: "expo.inOut", duration: 1.25 },
    });

    if (isMobile()) {
      this.menuList.querySelectorAll(".nav_menu_text").forEach((item) => {
        item.classList.remove("u-text-style-display");
        item.style.fontSize = "3rem";
      });
    }
  }

  openNav() {
    this.menu.setAttribute("data-menu", "open");
    window.lenis.stop();
    this.tl
      .clear()
      .set(this.overlay, { display: "block" }, "<")
      .fromTo(this.overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 })
      .set(
        this.menu,
        { display: "flex", clipPath: "inset(0% 0% 0% 0%)" },
        "<+0.15"
      )
      .fromTo(
        this.menuBg,
        { yPercent: -101 },
        { yPercent: 0, duration: 0.85, stagger: 0.1 },
        "<"
      )
      .fromTo(
        this.menuBg[1].querySelector("img"),
        { scale: 2, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1 },
        "<"
      )
      .fromTo(
        this.menu.querySelector(".nav_menu_bg_patterns"),
        {
          scale: 1.2,
          y: "3rem",
          x: isMobile() ? 0 : "-10rem",
          rotate: 3,
          autoAlpha: 0,
        },
        {
          scale: 1,
          y: "0rem",
          x: "0rem",
          rotate: 0,
          autoAlpha: 1,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "<"
      )

      .fromTo(
        this.menuBtnTexts,
        { yPercent: 0 },
        { yPercent: -100, duration: 0.75 },
        "0.25"
      )
      .fromTo(
        this.menuList,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5 },
        "<+=0.35"
      )
      .fromTo(
        this.menuLinks,
        {
          yPercent: isMobile() ? 120 : 140,
          autoAlpha: 0,
          rotate: 4,
        },
        { yPercent: 0, rotate: 0, autoAlpha: 1, stagger: 0.05 },
        "<-0.2"
      )
      .fromTo(
        this.menuSocialItems,
        { yPercent: 140, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1 },
        "<"
      );
  }

  closeNav() {
    this.menu.setAttribute("data-menu", "close");
    window.lenis.start();
    this.tl
      .clear()
      .fromTo(
        this.menu,
        { clipPath: "inset(0% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 100% 0%)", duration: 1 }
      )
      .fromTo(
        this.menuBg[1].querySelector("img"),
        { scale: 1, autoAlpha: 1 },
        { scale: 2, autoAlpha: 0 },
        "<"
      )
      .fromTo(
        this.menuList,
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 0.5 },
        "<+=0.15"
      )

      .to(this.menuBtnTexts, { yPercent: 0, duration: 0.75 }, "0.25")
      .to(
        this.overlay,
        {
          autoAlpha: 0,
          duration: 0.55,
        },
        "<+=0.35"
      )
      .set(this.menu, { display: "none" });
  }

  svgDot() {
    const start = [
      { cx: 1.41176, cy: 1.41176 },
      { cx: 7.99966, cy: 1.41176 },
      { cx: 14.5885, cy: 1.41176 },
      { cx: 1.41176, cy: 8.00004 },
      { cx: 7.99966, cy: 8.00004 },
      { cx: 14.5885, cy: 8.00004 },
      { cx: 1.41176, cy: 14.5883 },
      { cx: 7.99966, cy: 14.5883 },
      { cx: 14.5885, cy: 14.5883 },
    ];

    const end = [
      { cx: 1.41176, cy: 1.41176 },
      { cx: 4.41176, cy: 4.41176 },
      { cx: 14.5885, cy: 1.41176 },
      { cx: 4.41176, cy: 11.4118 },
      { cx: 7.99966, cy: 8.00004 },
      { cx: 11.4118, cy: 4.41176 },
      { cx: 1.41176, cy: 14.5883 },
      { cx: 11.4118, cy: 11.4118 },
      { cx: 14.5885, cy: 14.5883 },
    ];

    this.menuBtn.addEventListener("click", () => {
      const state = this.menu.getAttribute("data-menu");
      const target = state === "open" ? end : start;

      this.menuBtnDots.querySelectorAll("circle").forEach((circle, i) => {
        gsap.to(circle, {
          duration: 0.5,
          attr: { cx: target[i].cx, cy: target[i].cy },
          ease: "power2.inOut",
        });
      });
    });
  }

  handleMouse() {
    let isRotated = false;

    //rotate menu button dots on hover
    this.menuBtn.addEventListener("mouseenter", () => {
      gsap.to(this.menuBtnDots, {
        rotate: isRotated ? 180 : -180,
        ease: "expo.inOut",
        duration: 0.7,
      });
      isRotated = !isRotated;
    });

    //toggle menu on click
    this.menuBtn.addEventListener("click", () => {
      const state = this.menu.getAttribute("data-menu");
      if (state === "close") {
        this.openNav();
      } else {
        this.closeNav();
      }
    });
  }

  handleKey() {
    document.addEventListener("keydown", (e) => {
      const state = this.menu.getAttribute("data-menu");
      if (e.key === "Escape" && state === "open") {
        this.closeNav();
      }
    });
  }

  menuVideoPlay() {
    const videoContainers = this.menu.querySelectorAll("[data-menu-video]");
    const links = this.menuList.querySelectorAll("[data-menu-link]");
    let currentVideoContainer = null;

    // Pause all videos initially
    videoContainers.forEach((container) => {
      const video = container.querySelector("video");
      if (video) {
        video.pause();
        container.style.opacity = "0";
      }
    });

    links.forEach((link) => {
      const linkType = link.getAttribute("data-menu-link");

      link.addEventListener("mouseenter", () => {
        const matchingContainer = Array.from(videoContainers).find(
          (container) => container.getAttribute("data-menu-video") === linkType
        );

        if (matchingContainer) {
          // Find the actual video element inside the container
          const videoElement = matchingContainer.querySelector("video");

          // Hide current video if exists
          if (currentVideoContainer) {
            currentVideoContainer.style.opacity = "0";
            const currentVideo = currentVideoContainer.querySelector("video");
            if (currentVideo) currentVideo.pause(); // Pause previous video
          }

          // Show container and play the video inside it
          matchingContainer.style.opacity = "1";
          if (videoElement) {
            videoElement.currentTime = 0;
            videoElement
              .play()
              .catch((e) => console.log("Video play error:", e));
          }

          // Update current video container reference
          currentVideoContainer = matchingContainer;
        }
      });
    });

    // Hide and pause all videos when not hovering any link
    this.menuList.addEventListener("mouseleave", () => {
      if (currentVideoContainer) {
        currentVideoContainer.style.opacity = "0";
        const video = currentVideoContainer.querySelector("video");
        if (video) video.pause();
        currentVideoContainer = null;
      }
    });
  }

  handleScroll() {
    const logoWrap = document.querySelector(".nav_logo_wrap");
    window.addEventListener("scroll", () => {
      if (window.scrollY > window.innerHeight * 0.9) {
        logoWrap.classList.add("is-normal");
      } else {
        logoWrap.classList.remove("is-normal");
      }
    });
  }
}
