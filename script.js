// @ts-check

const elForm = document.querySelector('#form');
const elFrames = document.querySelector('#frames');
const elNumFrames = document.querySelector('#numFrames');

/**
 * @param {string} html
 */
function createFrame (html = '') {
  const el = document.createElement('iframe');
  // el.height = '500';
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
  const elLink = document.createElement('link');
  elLink.href = `https://fonts.googleapis.com/css?family=${family}`;
  elLink.rel = 'stylesheet';
  document.body.appendChild(elLink);
}

/**
 * @param {Document} document
 * @param {string} family
 */
function load (document, family) {
  const elTitle = document.createElement('h1');
  elTitle.style.fontFamily = family;
  elTitle.textContent = `Font family: "${family}`;
  document.body.appendChild(elTitle);

  loadFont(document, family);
}


function init () {
  elForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!(elNumFrames instanceof HTMLInputElement)) {
      throw new Error('Not ready');
    }

    const numFrames = Number(elNumFrames.value);
    for (let i = 0; i < numFrames; i += 1) {
      const elFrame = createFrame();
      load(elFrame.contentDocument, 'Barlow');
    }
  });
}

init();
