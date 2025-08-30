import { isMobileLandscape } from "./checkBreakpoints";

export class PageTransition {
  constructor() {
    this.root = document;
    this.pageLoad = this.root.querySelector(".page_load");
    if (!this.pageLoad) return;
    //this.setGrid();
    this.gridAnimation();
  }

  setGrid() {
    return new Promise((resolve) => {
      const columns = isMobileLandscape() ? 5 : 12;
      const blockSize = window.innerWidth / columns;
      const rowsNeeded = Math.ceil(window.innerHeight / blockSize);

      this.pageLoad.style.gridTemplateRows = `repeat(${rowsNeeded}, ${blockSize}px)`;

      const totalBlocks = columns * rowsNeeded;

      this.pageLoad.innerHTML = "";

      for (let i = 0; i < totalBlocks; i++) {
        const block = document.createElement("div");
        block.classList.add("load_block");
        this.pageLoad.appendChild(block);
      }
      resolve();
    });
  }

  gridAnimation() {
    const duration = this.pageLoad.getAttribute("data-duration") || 0.001;
    const amount = this.pageLoad.getAttribute("data-amount") || 0.5;
    const from = this.pageLoad.getAttribute("data-from") || "random";

    //this.setGrid().then(() => {
    gsap.to(".load_block", {
      opacity: 0,
      duration: duration,
      stagger: { amount: amount, from: from },
      onComplete: () => {
        gsap.set(this.pageLoad, { display: "none" });
      },
    });

    const validLinks = Array.from(document.querySelectorAll("a")).filter(
      (link) => {
        const href = link.getAttribute("href") || "";
        return (
          link.hostname === window.location.hostname &&
          !href.startsWith("#") &&
          link.getAttribute("target") !== "_blank" &&
          !link.hasAttribute("data-transition-prevent")
        );
      }
    );

    validLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const url = link.getAttribute("href");
        if (!url || url === "#" || url.startsWith("mailto:")) return;

        gsap.set(this.pageLoad, { display: "grid" });
        gsap.to(".load_block", {
          opacity: 1,
          duration: duration,
          stagger: { amount: amount, from: from },
          onComplete: () => {
            window.location.href = url;
          },
        });
      });
    });

    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    });

    window.addEventListener("resize", this.setGrid.bind(this));
    //  });
  }
}
