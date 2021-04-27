const root = document.querySelector(":root");
const grids = document.querySelectorAll(".grid");
const gridOverlay = document.querySelector(".grid.overlay");

const calculatedGutterElement = document.querySelector(".calculated-gutter");
const viewportWidthElement = document.querySelector(".viewport-width");

const fixedToggle = document.getElementById("fixed");
const hideGridToggle = document.getElementById("overlay");

function toggleFixedGrids() {
  grids.forEach((grid) =>
    grid.classList.toggle("grid--fixed", fixedToggle.checked)
  );
}

function toggleGridOverlay() {
  gridOverlay.style.display = hideGridToggle.checked ? "none" : "grid";
}

function observeViewport() {
  // Feature detect ResizeObserver
  if ("ResizeObserver" in window) {
    const grid = document.querySelector("main.grid");
    const ro = new ResizeObserver(() => {
      const gutterWidth = Number.parseFloat(
        window.getComputedStyle(grid).paddingInlineStart
      ).toFixed(3);
      window.requestAnimationFrame(() => {
        calculatedGutterElement.textContent = gutterWidth + "px";
        viewportWidthElement.textContent = window.innerWidth + "px";
      });
    });

    ro.observe(root);
  }
}

(() => {
  toggleFixedGrids();
  toggleGridOverlay();

  fixedToggle.addEventListener("change", toggleFixedGrids);
  hideGridToggle.addEventListener("change", toggleGridOverlay);

  observeViewport();
})();
