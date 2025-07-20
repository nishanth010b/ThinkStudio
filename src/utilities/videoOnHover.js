export class VideoOnHover {
  constructor(rootElement) {
    this.rootElement = rootElement || document;
    this.hoverElements = this.rootElement.querySelectorAll(
      "[data-video-on-hover]"
    );
    this.init();
  }

  init() {
    this.hoverElements.forEach((el) => {
      let video = el.querySelector("video");
      let videoSrc = video.getAttribute("src");
      if (videoSrc !== "") {
        el.addEventListener("mouseenter", () => {
          video.setAttribute("data-video-on-hover", "active");
          video.play();
        });
      }
      el.addEventListener("mouseleave", () => {
        video.setAttribute("data-video-on-hover", "inactive");
        setTimeout(() => {
          video.pause();
        }, 200);
      });
    });
  }
}
