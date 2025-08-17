import {
  isMobile,
  isMobileLandscape,
} from "../../utilities/scripts/checkBreakpoints";
import isTouch from "../../utilities/scripts/touchDetection";

export class Nav {
  constructor() {
    this.setUp();
    this.handleMouse();
    this.handleKey();
    this.handleScroll();
    this.mobileProgBlurAppear();
    this.navHideUnhide();
    this.menuVideoPlay();
  }

  setUp() {
    this.navWrap = document.querySelector(".nav_wrap");
    this.overlay = this.navWrap.querySelector(".nav_overlay");
    this.menu = this.navWrap.querySelector(".nav_menu_wrap");
    this.menuBtn = this.navWrap.querySelector(".nav_btn_wrap");
    this.menuBtnDots = this.menuBtn.querySelector(".nav_btn_dots");
    this.menuBg = this.menu.querySelectorAll(".nav_menu_bg");
    this.menuVisual = this.menu.querySelector(".nav_menu_visual");
    this.menuList = this.menu.querySelector(".nav_menu_list");
    this.menuLinks = this.menu.querySelectorAll(".nav_menu_item");
    this.menuSocialItems = this.menu.querySelectorAll(".nav_social_item");
    this.menuBtnText = this.menuBtn.querySelector(".nav_btn_text");

    //svg dot positions
    this.start = [
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

    this.end = [
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

    //main timeline
    this.tl = gsap.timeline({
      defaults: { ease: "expo.inOut", duration: 1.25 },
    });

    //set font size for mobile
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

    this.animateDots(this.end);
    this.tl
      .clear()
      .set(this.overlay, { display: "block" }, "<")
      .fromTo(this.overlay, { autoAlpha: 0 }, { autoAlpha: 1 })
      .set(
        this.menu,
        { display: "flex", clipPath: "inset(0% 0% 0% 0%)" },
        "<+0.15"
      )
      .fromTo(
        this.menuBg,
        { yPercent: -101 },
        { yPercent: 0, duration: 1.25, stagger: 0.15 },
        "<"
      )
      .fromTo(this.menuVisual, { opacity: 0 }, { opacity: 1 }, "<+=0.8")
      .to(
        this.menuBtnText,
        {
          scrambleText: {
            text: "Close",
            chars: "Think Studio",
            speed: 0.7,
          },
          duration: 0.4,
          delay: 0.2,
        },
        "<-=0.8"
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
          yPercent: isMobile() ? 120 : 240,
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

    this.animateDots(this.start);
    this.tl
      .clear()
      .fromTo(
        this.menu,
        { clipPath: "inset(0% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 100% 0%)" }
      )
      .fromTo(this.menuVisual, { opacity: 1 }, { opacity: 0 }, "<+=0.15")
      .fromTo(
        this.menuList,
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 0.5 },
        "<+=0.15"
      )
      .to(
        this.menuBtnText,
        {
          scrambleText: {
            text: "Menu",
            chars: "Think Studio",
            speed: 0.7,
          },
          duration: 0.4,
          delay: 0.2,
        },
        "<"
      )
      .to(
        this.overlay,
        {
          autoAlpha: 0,
          duration: 0.55,
        },
        "<-=0.5"
      )
      .set(this.menu, { display: "none" });
  }

  animateDots(targetPositions) {
    this.menuBtnDots.querySelectorAll("circle").forEach((circle, i) => {
      gsap.to(circle, {
        duration: 0.5,
        delay: 0.2,
        attr: { cx: targetPositions[i].cx, cy: targetPositions[i].cy },
        ease: "power2.inOut",
      });
    });
  }

  handleMouse() {
    //menu Dots
    this.menuBtn.addEventListener("mouseenter", () => {
      gsap.to(this.menuBtnDots, {
        rotate: 90,
        ease: "expo.inOut",
        duration: 0.7,
      });
    });
    this.menuBtn.addEventListener("mouseleave", () => {
      gsap.to(this.menuBtnDots, {
        rotate: 0,
        ease: "expo.inOut",
        duration: 0.7,
      });
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

    //navlinks hover
    const wordsWrap = this.menu.querySelectorAll(".nav_menu_words_wrap");
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
    if (isMobileLandscape()) return;
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
      link.addEventListener("mouseleave", () => {
        if (currentVideoContainer) {
          currentVideoContainer.style.opacity = "0";
          const video = currentVideoContainer.querySelector("video");
          if (video) video.pause();
          currentVideoContainer = null;
        }
      });
    });
  }

  mobileProgBlurAppear() {
    const progWrap = this.navWrap.querySelector(".nav_mobile_blur");
    if (!progWrap || !isMobileLandscape()) return;
    gsap.to(progWrap, {
      scrollTrigger: {
        trigger: this.navWrap,
        start: "top top",
        end: "top top-=100",
        toggleActions: "play none reverse none",
      },
      opacity: 1,
    });
  }

  handleScroll() {
    if (isMobileLandscape()) return;
    const btnWrap = document.querySelector(".nav_btn_wrap");

    window.addEventListener("scroll", () => {
      if (window.scrollY > window.innerHeight * 0.3) {
        btnWrap.style.right = 0;
        btnWrap.style.top = 0;
      } else {
        btnWrap.style.right = "-1rem";
        btnWrap.style.top = "-1rem";
      }
    });
  }

  navHideUnhide() {
    const navWrap = document.querySelector(".nav_wrap");
    const container = navWrap.querySelector(".nav_contain");
    const children = container.children;

    // Create a single timeline for hide/show
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.inOut", duration: 0.3 },
    });

    tl.to(children, {
      y: -10,
      stagger: 0.3,
    }).to(
      navWrap,
      {
        autoAlpha: 0,
      },
      "<"
    );

    // ScrollTrigger for hiding
    ScrollTrigger.create({
      trigger: ".real_wrap",
      start: "top center",
      onEnter: () => tl.play(),
      onLeaveBack: () => tl.reverse(),
    });

    // ScrollTrigger for showing
    ScrollTrigger.create({
      trigger: ".work_wrap",
      start: "top 30%",
      onEnter: () => tl.reverse(),
      onLeaveBack: () => tl.play(),
    });
  }
}
