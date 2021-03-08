const root = document.querySelector(":root");
const grids = document.querySelectorAll(".grid");
const calculatedGutterElement = document.querySelector(".calculated-gutter");
const viewportWidthElement = document.querySelector(".viewport-width");
const fixedToggle = document.getElementById("fixed");

function toggleFixedGrids() {
  grids.forEach((grid) =>
    grid.classList.toggle("grid--fixed", fixedToggle.checked)
  );
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

function doIt() {
  toggleFixedGrids();

  fixedToggle.addEventListener("change", toggleFixedGrids);

  observeViewport();
}

if (document.readyState != "loading") {
  doIt();
} else {
  document.addEventListener("DOMContentLoaded", doIt);
}
