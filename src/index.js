import { TextAnimations } from "./utilities/scripts/textAnimations";
import { Nav } from "./components/navigation/navigation";
import { LoaderAnimation } from "./pages/home/loader";
import { FlipOnScroll } from "./pages/home/flipHeroScale";
import { RealStory } from "./pages/home/realStory";
import { Services } from "./pages/home/services";
import { VideoOnEnter } from "./utilities/scripts/videoOnEnter";
import { Marquee } from "./pages/home/marquee";
import { TimeAU } from "./utilities/scripts/timeAU";
import { ExpandSection } from "./pages/work/expandSection";
import { WorkPageAnimation } from "./pages/work/pageAnimations";

//utility functions
import { initSmoothScroll } from "./utilities/scripts/smoothScroll";
import { disableContextMenuAndDrag } from "./utilities/scripts/noContextMenu";
import { PageTransition } from "./utilities/scripts/pageTransition";

class App {
  constructor() {
    this.nav = null;
    this.pageTransition = null;
    this.loader = null;
    this.heroScale = null;
    this.realStory = null;
    this.services = null;
    this.videoEnter = null;
    this.marquee = null;
    this.timeAU = null;
    this.expandSection = null;
  }

  init() {
    initSmoothScroll();
    disableContextMenuAndDrag();

    this.nav = new Nav();
    // this.pageTransition = new PageTransition();
    this.videoEnter = new VideoOnEnter();
    this.textAnimations = new TextAnimations();

    if (document.body.dataset.page === "home") {
      this.loader = new LoaderAnimation();
      this.heroScale = new FlipOnScroll();
      this.realStory = new RealStory();
      // this.services = new Services();
      this.marquee = new Marquee();
      this.timeAU = new TimeAU();
    }

    if (document.body.dataset.page === "contact") {
      this.timeAU = new TimeAU();
    }

    if (document.body.dataset.page === "work-detailed") {
      this.expandSection = new ExpandSection();
      this.workReveal = new WorkPageAnimation();
    }
  }

  start() {
    document.fonts.ready.then(() => {
      this.init();
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.start();
});
