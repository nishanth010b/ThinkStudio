const mediaQueryList = window.matchMedia("(prefers-reduced-motion: reduce)");

let reduceMotion = mediaQueryList.matches;

function handlePreferenceChange(event) {
  reduceMotion = event.matches;
}

mediaQueryList.addEventListener("change", handlePreferenceChange);

export function getMotionPreference() {
  return reduceMotion;
}

export function addMotionPreferenceListener(listener) {
  mediaQueryList.addEventListener("change", listener);
}

export function destroy() {
  mediaQueryList.removeEventListener("change", handlePreferenceChange);
}
