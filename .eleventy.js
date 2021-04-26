module.exports = function(eleventyConfig) {

  eleventyConfig.addWatchTarget('./src/scss');
  eleventyConfig.addPassthroughCopy('./src/css');
  eleventyConfig.addPassthroughCopy('./src/js');

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
}
