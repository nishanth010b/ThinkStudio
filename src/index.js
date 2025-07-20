import { Nav } from "./components/navigation/navigation";
import { HeroAnim } from "./pages/home/heroAnim";
import { RealStory } from "./pages/home/realStory";
import { VideoOnHover } from "./utilities/videoOnHover";

//utility functions
import { initSmoothScroll } from "./utilities/smoothScroll";
import { disableContextMenuAndDrag } from "./utilities/noContextMenu";

export default class Index {
  constructor() {
    new HeroAnim();
    new RealStory();
    new Nav();
    new VideoOnHover(document);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();

  disableContextMenuAndDrag();
  new Index();
});
