const { DateTime } = require("luxon");
const _ = require("lodash");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");

const pluginDrafts = require("./eleventy.config.drafts.js");
const pluginMarkdoc = require("./eleventy.config.markdoc.js");
const pluginScss = require("eleventy-sass");

module.exports = function (eleventyConfig) {
  // Copy the contents of the `public` folder to the output folder
  // For example, `./public/css/` ends up in `_site/css/`
  eleventyConfig.addPassthroughCopy({
    "src/site/public/": "/",
  });

  // Run Eleventy when these files change:
  // https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

  // Watch content images for the image pipeline.
  eleventyConfig.addWatchTarget("src/content/**/*");
  eleventyConfig.addWatchTarget("src/site/**/*");

  // App plugins
  eleventyConfig.addPlugin(pluginDrafts);
  eleventyConfig.addPlugin(pluginMarkdoc);
  eleventyConfig.addPlugin(pluginScss, {
    sass: {
      style: "expanded",
      sourceMap: true,
    },
  });

  // Official plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginBundle);

  // Filters
  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
    // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
      format || "DDD"
    );
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addShortcode("renderlayoutblock", function (name) {
    return (this.page.layoutblock || {})[name] || "";
  });

  eleventyConfig.addPairedShortcode("layoutblock", function (content, name) {
    if (!this.page.layoutblock) this.page.layoutblock = {};
    this.page.layoutblock[name] = content;
    return "";
  });

  eleventyConfig.addCollection("blog", (collection) => {
    return collection.getFilteredByGlob("src/content/blog/*.md").reverse();
  });

  eleventyConfig.addCollection("blogByYear", (collection) => {
    return _.chain(collection.getFilteredByGlob("src/content/blog/*.md"))
      .groupBy((post) => post.date.getFullYear())
      .toPairs()
      .reverse()
      .value();
  });

  eleventyConfig.addCollection("projects", (collection) => {
    return collection.getFilteredByGlob("src/content/projects/*.md").reverse();
  });

  eleventyConfig.addGlobalData("copyrightYear", () => {
    return DateTime.now().toFormat("yyyy");
  });

  eleventyConfig.addGlobalData(
    "commit",
    (revision = require("child_process")
      .execSync("git rev-parse HEAD")
      .toString()
      .trim())
  );

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ["md", "njk", "html", "11ty.js"],

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    dir: {
      input: "src/content", // default: "."
      includes: "../site/includes", // default: "_includes"
      layouts: "../site/layouts", // default: "_layouts
      data: "../site/data", // default: "_data"
      output: "_site",
    },
  };
};
