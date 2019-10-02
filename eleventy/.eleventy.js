module.exports = function(eleventyConfig) {
    const result = {
      templateFormats: [
        "html",
        "jpg",
        "png",
        "js",
        "liquid",
        "json",
        "jsonld",
        "ico", // for favicon
        "css", // css is not yet a valid template extension
        "otf", "eot", "svg", "ttf", "woff", "woff2" // extensions used by the fonts
      ],
      passthroughFileCopy: true,
      dir: {
        input: "eleventy",
        output: "public"
      }
    };
  
    return result;
  };