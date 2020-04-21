

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
