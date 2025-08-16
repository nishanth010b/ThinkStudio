import { TextAnimations } from "./utilities/scripts/textAnimations";

import { Nav } from "./components/navigation/navigation";
import { HeroAnim } from "./pages/home/heroAnim";
import { NewHeroScale } from "./pages/home/newHeroScale";
import { RealStory } from "./pages/home/realStory";
import { Services } from "./pages/home/services";
import { VideoOnHover } from "./utilities/scripts/videoOnHover";
import { Marquee } from "./pages/home/marquee";
import { TimeAU } from "./pages/contact/timeAU";

//utility functions
import { initSmoothScroll } from "./utilities/scripts/smoothScroll";
import { disableContextMenuAndDrag } from "./utilities/scripts/noContextMenu";
import { FlipOnScroll } from "./pages/home/flipHeroScale";

class App {
  constructor() {
    this.nav = null;
    this.heroScale = null;
    this.realStory = null;
    this.services = null;
    this.videoHover = null;
    this.marquee = null;
    this.timeAU = null;
  }

  init() {
    //global utilities
    initSmoothScroll();
    disableContextMenuAndDrag();

    this.textAnimations = new TextAnimations();

    //components
    this.nav = new Nav();
    this.videoHover = new VideoOnHover();

    //home page animations
    //this.heroScale = new NewHeroScale(); // New hero animation
    this.heroScale = new FlipOnScroll();
    this.realStory = new RealStory();
    this.services = new Services();
    this.marquee = new Marquee();

    //Contact page
    this.timeAU = new TimeAU();
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
