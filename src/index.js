import { HeroAnim } from "./pages/home/heroAnim";
import { Nav } from "./components/navigation/navigation";

//utility functions
import { initSmoothScroll } from "./utilities/smoothScroll";
import { disableContextMenuAndDrag } from "./utilities/noContextMenu";

export default class Index {
  constructor() {
    new HeroAnim(document.querySelector(".hero_primary_wrap"));
    new Nav();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  disableContextMenuAndDrag();
  new Index();
});
