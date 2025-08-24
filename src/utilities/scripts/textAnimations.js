export class TextAnimations {
  constructor() {
    this.splitTextElements = null;

    document.fonts.ready.then(() => {
      this.splitText();
      this.charsFlicker();
    });
  }

  splitText() {
    const selector =
      "[data-split-text='true'] :is(h1, h2), h2[data-split-text='true']";
    this.splitTextElements = SplitText.create(selector, {
      type: "chars",
      tag: "span",
      charsClass: "char",
      smartWrap: true,
    });
  }

  charsFlicker() {
    if (!this.splitTextElements) return;

    const animationElements = document.querySelectorAll(
      "[data-text-anim='chars-flicker']"
    );
    animationElements.forEach((element) => {
      const chars = element.querySelectorAll(".char");
      if (chars.length === 0) return;
      gsap.from(chars, {
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          //toggleActions: "play none none reverse",
        },
        opacity: 0,
        duration: 0.5,
        ease: "expo.inOut",
        stagger: {
          amount: 0.25,
          from: "random",
        },
      });
    });
  }

  // wordsStagger() {
  //   if (!this.splitTextElements) return;

  //   const animationElements = document.querySelectorAll(
  //     "[data-text-anim='words-stagger']"
  //   );
  //   animationElements.forEach((element) => {
  //     const words = element.querySelectorAll(".word");
  //     console.log(words);
  //     if (words.length === 0) return;
  //     gsap.from(words, {
  //       scrollTrigger: {
  //         trigger: element,
  //         start: "top 80%",
  //         toggleActions: "play none none reverse",
  //       },
  //       yPercent: 100,
  //       duration: 0.5,
  //       ease: "expo.inOut",
  //       stagger: 0.01,
  //     });
  //   });
  // }
}
