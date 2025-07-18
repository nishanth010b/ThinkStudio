export class Nav {
  constructor() {
    this.setUp();
    this.handleMouse();
    this.handleKey();
  }

  setUp() {
    this.navWrap = document.querySelector(".nav_wrap");
    this.overlay = this.navWrap.querySelector(".nav_overlay");
    this.menu = this.navWrap.querySelector(".nav_menu_wrap");
    this.state = this.menu.getAttribute("data-menu");
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
          yPercent: 140,
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

  handleMouse() {
    this.menuBtn.addEventListener("mouseenter", () => {
      gsap.to(this.menuBtnDots, {
        rotate: 180,
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
}
