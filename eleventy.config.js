export default function(eleventyConfig) {
  // Pass through admin folder for Decap CMS
  eleventyConfig.addPassthroughCopy("admin");
  
  // Pass through CNAME for GitHub Pages custom domain
  eleventyConfig.addPassthroughCopy("CNAME");

  // Pass through profile photo
  eleventyConfig.addPassthroughCopy("me.jpg");

  // Ignore AGENTS.md from template processing
  eleventyConfig.ignores.add("AGENTS.md");

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}
