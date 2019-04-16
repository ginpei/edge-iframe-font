// @ts-check

const elForm = document.querySelector('#form');
const elClear = document.querySelector('#clear');
const elReload = document.querySelector('#reload');
const elFrames = document.querySelector('#frames');
const elNumFrames = document.querySelector('#numFrames');
const elWaitCss = document.querySelector('#waitCss');
const elWithText = document.querySelector('#withText');
const elWithCanvas = document.querySelector('#withCanvas');

/**
 * @param {string} html
 */
function createFrame (html = '') {
  const el = document.createElement('iframe');
  el.height = '200';
  elFrames.appendChild(el);

  el.contentDocument.open();
  el.contentDocument.write(html);
  el.contentDocument.close();

  return el;
}

/**
 * @param {Document} document
 * @param {string} family
 */
function loadFont (document, family) {
  return new Promise((resolve) => {
    const elLink = document.createElement('link');
    elLink.href = `https://fonts.googleapis.com/css?family=${family}`;
    elLink.rel = 'stylesheet';
    elLink.onload = () => resolve();
    document.body.appendChild(elLink);
  });
}

/**
 * @param {Document} document
 * @param {string} family
 */
function renderTextContent (document, family) {
  const elTitle = document.createElement('h1');
  elTitle.style.fontSize = '30px';
  elTitle.style.fontFamily = family;
  elTitle.textContent = `Family "${family}`;
  document.body.appendChild(elTitle);
}

/**
 * @param {Document} document
 * @param {string} family
 */
function renderCanvasContent (document, family) {
  const elCanvas = document.createElement('canvas');
  elCanvas.height = 35;
  document.body.appendChild(elCanvas);

  const ctx = elCanvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = `30px ${family}`;
  const message = `Family "${family}"`;
  ctx.fillText(message, 0, 0);
}

/**
 * @param {Document} document
 * @param {string} family
 * @param {boolean} waitCss
 * @param {boolean} withText
 * @param {boolean} withCanvas
 */
async function render (document, family, waitCss, withText, withCanvas) {
  if (waitCss) {
    await loadFont(document, family);
  } else {
    loadFont(document, family);
  }

  if (withText) {
    renderTextContent(document, family);
  }
  if (withCanvas) {
    renderCanvasContent(document, family);

    const elTitle = document.createElement('p');
    elTitle.style.fontSize = '10px';
    elTitle.textContent = 'Wait 5 sec...';
    document.body.appendChild(elTitle);

    setTimeout(() => renderCanvasContent(document, family), 5000);
  }
}


function init () {
  elForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (
      !(elNumFrames instanceof HTMLInputElement)
      || !(elWaitCss instanceof HTMLInputElement)
      || !(elWithText instanceof HTMLInputElement)
      || !(elWithCanvas instanceof HTMLInputElement)
    ) {
      throw new Error('Not ready');
    }

    const numFrames = Number(elNumFrames.value);
    for (let i = 0; i < numFrames; i += 1) {
      const elFrame = createFrame();
      const waitCss = elWaitCss.checked;
      const withText = elWithText.checked;
      const withCanvas = elWithCanvas.checked;
      render(elFrame.contentDocument, 'Barlow', waitCss, withText, withCanvas);
    }

    elClear.addEventListener('click', () => {
      for (let el = elFrames.firstChild; el; el = elFrames.firstChild) {
        elFrames.removeChild(el);
      }
    });

    elReload.addEventListener('click', () => {
      window.location.reload();
    });
  });
}

init();
