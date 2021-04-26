module.exports = function(eleventyConfig) {

  // We need this in order to watch src/css,
  // which is otherwise ignored due to .gitignore.
  // Added .eleventyignore to prevent eleventy from processing node_modules etc.
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addWatchTarget('./src/css');

  eleventyConfig.addPassthroughCopy('./src/css');
  eleventyConfig.addPassthroughCopy('./src/js');

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
}
