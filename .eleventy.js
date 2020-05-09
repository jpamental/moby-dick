
const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {

  eleventyConfig.addCollection("posts", function(collection) {
    const coll = collection.getFilteredByTag("chapter");
  
    for(let i = 0; i < coll.length ; i++) {
      const prevPost = coll[i-1];
      const nextPost = coll[i + 1];
  
      coll[i].data["prevPost"] = prevPost;
      coll[i].data["nextPost"] = nextPost;
    }
  
    return coll;
  });

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  



  // works also with addLiquidShortcode or addNunjucksAsyncShortcode
  eleventyConfig.addLiquidShortcode("myResponsiveImage", async function(src, alt, options) {
      let stats = await Image(src, {
        // Array of widths
        // Optional: use falsy value to fall back to native image size
        widths: [480, 900, 1200, null],
      
        // Pass any format supported by sharp
        formats: ["jpeg"], //"png"
      
        // the directory in the image URLs <img src="/img/MY_IMAGE.png">
        urlPath: "/assets/respimg/",
      
        // the path to the directory on the file system to write the image files to disk
        outputDir: "assets/respimg/",
      
        // eleventy-cache-assets
        // If a remote image URL, this is the amount of time before it downloads a new fresh copy from the remote server
        cacheDuration: "1d"
      });
      let lowestSrc = stats.jpeg[0];
      let sizes = "(max-width: 1600px) 100vw, 1600px"; // Make sure you customize this!
      let loadingLazy = options;
      if(loadingLazy === 'lazy') {
        loadingLazyString = 'loading="lazy"';
      } else {
        loadingLazyString = '';
      }

      if(alt === undefined) {
        // You bet we throw an error on missing alt (alt="" works okay)
        throw new Error(`Missing \`alt\` on myResponsiveImage from: ${src}`);
      }

      // Iterate over formats and widths
      return `<img 
        ${Object.values(stats).map(imageFormat => {
          return ` srcset="${imageFormat.map(entry => `${entry.url} ${entry.width}w`).join(", ")}" sizes="${sizes}" alt="${alt}"
          src="${lowestSrc.url}"
          width="${lowestSrc.width}"
          height="${lowestSrc.height}"
          ${loadingLazyString}>`;
        }).join("\n")}
/>`;
    });

    
    return {
      dir: {
        // ⚠️ These values are both relative to your input directory.
        includes: "_includes",
        layouts: "_includes/_layouts",
        partials: "_includes/partials",
        data: "_data",
      }
    }
  
};
