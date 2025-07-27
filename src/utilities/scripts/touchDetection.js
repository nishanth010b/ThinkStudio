// More reliable touch detection
const isTouch =
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0 ||
  (window.DocumentTouch && document instanceof DocumentTouch);

export default isTouch;
