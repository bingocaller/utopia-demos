function createFontSizeResizeObserver(element, label) {
  // Feature-detect ResizeObserver
  if ("ResizeObserver" in window) {
    const ro = new ResizeObserver(() => {
      const { fontSize } = window.getComputedStyle(element);
      const currentSize = Number.parseFloat(fontSize).toFixed(3);
      window.requestAnimationFrame(() => {
        label.dataset.content = `${currentSize}px`;
      });
    });

    ro.observe(element);
  }
}

function createSpacingResizeObserver(element, direction) {
  if ("ResizeObserver" in window) {
    const originalContent = element.dataset.content;
    const ro = new ResizeObserver(() => {
      const { height, width } = window.getComputedStyle(element);
      const size = direction.match("inline") ? width : height;
      const currentSize = Number.parseFloat(size).toFixed(3);
      window.requestAnimationFrame(() => {
        element.dataset.content = `${originalContent} (${currentSize}px)`;
      });
    });

    ro.observe(element);
  }
}

function generateFontStepLabels() {
  const elementsThatNeedStepLabels = document.querySelectorAll(
    "h1, h2, h3, h4, h5, h6, p, li, small, [class^=u-font-size--step-]"
  );
  elementsThatNeedStepLabels.forEach((element) => {
    const stepLabel = document.createElement("span");
    stepLabel.classList.add("step-label");
    element.appendChild(stepLabel);
    createFontSizeResizeObserver(element, stepLabel);
  });
}

function generateSpacingVisualisers() {
  const elementsThatNeedSpacingVisualisers = document.querySelectorAll(
    "[class*=u-padding], [class*=u-margin]"
  );
  elementsThatNeedSpacingVisualisers.forEach((element) => {
    const { classList } = element;
    classList.forEach((className) => {
      if (className.match(/^u-(?:padding|margin)/)) {
        const re = /^u-(?<type>[^-]+)(?:-(?<direction>.+))?--(?<size>[^-]+$)/;
        const match = re.exec(className);
        if (match) {
          const { type, direction, size } = match.groups;
          if (direction?.match(/(?:start|end)/)) {
            const visualiser = document.createElement("span");
            visualiser.classList.add(
              "spacing-visualiser",
              `spacing-visualiser--${size}`,
              `spacing-visualiser--${direction}`
            );
            visualiser.dataset.content = `${type}-${direction}: ${size.toUpperCase()}`;
            createSpacingResizeObserver(visualiser, direction);
            element.appendChild(visualiser);
          } else if (direction?.match(/(?:block|inline)/)) {
            ["start", "end"].forEach((side) => {
              const visualiser = document.createElement("span");
              visualiser.classList.add(
                "spacing-visualiser",
                `spacing-visualiser--${size}`,
                `spacing-visualiser--${direction}-${side}`
              );
              visualiser.dataset.content = `${type}-${direction}-${side}: ${size.toUpperCase()}`;
              createSpacingResizeObserver(visualiser, direction);
              element.appendChild(visualiser);
            });
          } else {
            ["block-start", "block-end", "inline-start", "inline-end"].forEach(
              (side) => {
                const visualiser = document.createElement("span");
                visualiser.classList.add(
                  "spacing-visualiser",
                  `spacing-visualiser--${size}`,
                  `spacing-visualiser--${side}`
                );
                visualiser.dataset.content = `${type}: ${size.toUpperCase()}`;
                createSpacingResizeObserver(visualiser, side);
                element.appendChild(visualiser);
              }
            );
          }
        }
      }
    });
  });
}

(() => {
  generateFontStepLabels();
  generateSpacingVisualisers();

  // Hide all visualisations per default
  document.body.classList.add("hide-visualisers");
  document.body.classList.add("hide-step-labels");

  document.addEventListener("keyup", (e) => {
    if (e.key === "s") {
      document.body.classList.toggle("hide-visualisers");
    }
    if (e.key === "f") {
      document.body.classList.toggle("hide-step-labels");
    }
  });
})();
