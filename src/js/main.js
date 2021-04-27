(() => {
  const elementsThatNeedStepLabels = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, small, [class^=u-font-size--step-]');
  elementsThatNeedStepLabels.forEach(element => { 
    const stepLabel = document.createElement('span');
    stepLabel.classList.add('step-label');
    element.appendChild(stepLabel);
  });

  // Hide all visualisations per default
  document.body.classList.add('hide-visualisers');
  document.body.classList.add('hide-step-labels');

  document.addEventListener('keyup', (e) => {
    if (e.key === 'v') {
      document.body.classList.toggle('hide-visualisers');
    }
    if (e.key === 's') {
      document.body.classList.toggle('hide-step-labels');
    }
  })
})();
