module.exports = function(eleventyConfig) {

  eleventyConfig.addWatchTarget('./src/sass');
  eleventyConfig.addPassthroughCopy(['./src/css', './src/js']);

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
}
