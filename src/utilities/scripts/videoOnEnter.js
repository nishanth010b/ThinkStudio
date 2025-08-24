export class VideoOnEnter {
  constructor(rootElement) {
    this.rootElement = rootElement || document;
    this.videos = this.rootElement.querySelectorAll("[data-video-on-enter]");
    if (!this.videos.length) return;
    this.init();
  }

  init() {
    // if (isMobileLandscape()) {
    //   videos.forEach((el) => {
    //     const video = el.querySelector("video");
    //     video.remove();
    //   });
    // } else {
    this.videos.forEach((el) => {
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
    //}
  }
}
