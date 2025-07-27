export function disableContextMenuAndDrag() {
  document.addEventListener("contextmenu", function (e) {
    const tag = e.target.tagName.toLowerCase();
    if (tag === "img" || tag === "video") {
      e.preventDefault();
    }
  });

  document.addEventListener("dragstart", function (e) {
    if (e.target.tagName.toLowerCase() === "img") {
      e.preventDefault();
    }
  });
}
