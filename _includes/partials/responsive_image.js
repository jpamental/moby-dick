---

---
const Image = require("@11ty/eleventy-img");
module.exports = function(eleventyConfig) {
  // works also with addLiquidShortcode or addNunjucksAsyncShortcode
  eleventyConfig.addJavaScriptFunction("myResponsiveImage", async function(src, alt, options) {
      let stats = await Image(src, options);
      let lowestSrc = stats.jpeg[0];
      let sizes = "100vw"; // Make sure you customize this!

      if(alt === undefined) {
        // You bet we throw an error on missing alt (alt="" works okay)
        throw new Error(`Missing \`alt\` on myResponsiveImage from: ${src}`);
      }

      // Iterate over formats and widths
      return `<picture>
        ${Object.values(stats).map(imageFormat => {
          return `  <source type="image/${imageFormat[0].format}" srcset="${imageFormat.map(entry => `${entry.url} ${entry.width}w`).join(", ")}" sizes="${sizes}">`;
        }).join("\n")}
  <img
    alt="${alt}"
    src="${lowestSrc.url}"
    width="${lowestSrc.width}"
    height="${lowestSrc.height}">
</picture>`;
    });
};