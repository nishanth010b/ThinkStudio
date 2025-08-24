export class Services {
  constructor() {
    this.wrap = document.querySelector(".services_wrap");
    this.imageWrap = this.wrap?.querySelector(".services_image_wrap");

    if (!this.wrap || !this.imageWrap) {
      return;
    }

    //this.imgScaleUp();
  }

  // imgScaleUp() {
  //   const images = this.imageWrap.querySelectorAll("img");
  //   const items = this.wrap.querySelectorAll(".services_items_item");

  //   gsap.set([images[1], images[2]], {
  //     scale: 0,
  //     rotate: (index) => (index === 0 ? -3 : 3),
  //   });

  //   items.forEach((item, index) => {
  //     gsap.to(images[index], {
  //       scale: 1.2,
  //       rotate: 0,
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: item,
  //         start: "top bottom",
  //         end: "bottom 40%",
  //         scrub: true,
  //       },
  //     });
  //   });
  // }
}
