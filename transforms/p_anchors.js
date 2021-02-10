
const jsdom = require('@tbranyen/jsdom');
const {JSDOM} = jsdom;
const minify = require('../utils/minify.js');
const slugify = require('slugify');

module.exports = function(value, outputPath) {
  if (outputPath.endsWith('.html')) {
    const DOM = new JSDOM(value, {
      resources: 'usable'
    });

    const document = DOM.window.document;
    const articleParagraphs = [
      ...document.querySelectorAll('.chapter > p')
    ];

    if (articleParagraphs.length) {
      var loopCount = 0;
      // Loop each heading and add a little anchor and an ID to each one
      articleParagraphs.forEach(paragraph => {
        loopCount = loopCount + 1;
        const paragraphSlug = loopCount;

        paragraph.setAttribute('id', `p${paragraphSlug}`);
      });
    }

    return '<!DOCTYPE html>\r\n' + document.documentElement.outerHTML;
  }
  return value;
};