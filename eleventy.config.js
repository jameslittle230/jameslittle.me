require("dotenv").config();

const { DateTime } = require("luxon");
const { chain } = require("lodash");
const htmlmin = require("html-minifier-terser");

const { EleventyRenderPlugin } = require("@11ty/eleventy");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginScss = require("eleventy-sass");

const pluginDrafts = require("./src/site/eleventy/drafts.eleventy.js");
const pluginMarkdoc = require("./src/site/eleventy/markdoc.eleventy.js");

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "src/site/public/": "/",
  });

  // Watch content images for the image pipeline.
  eleventyConfig.addWatchTarget("src/content/**/*");
  eleventyConfig.addWatchTarget("src/site/**/*");

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginBundle);
  eleventyConfig.addPlugin(pluginDrafts);
  eleventyConfig.addPlugin(pluginMarkdoc);
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(pluginScss, {
    sass: {
      style: "expanded",
      sourceMap: true,
    },
  });

  // Filters
  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
    // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
      format || "DDD"
    );
  });

  eleventyConfig.addFilter("htmlDateString", dateObj => {
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

  eleventyConfig.addFilter("keys", obj => {
    return Object.keys(obj);
  });

  eleventyConfig.addShortcode("renderlayoutblock", function (name) {
    return (this.page.layoutblock || {})[name] || "";
  });

  eleventyConfig.addPairedShortcode("layoutblock", function (content, name) {
    if (!this.page.layoutblock) this.page.layoutblock = {};
    this.page.layoutblock[name] = content;
    return "";
  });

  eleventyConfig.addCollection("blog", collection => {
    return collection.getFilteredByGlob("src/content/blog/*.md").reverse();
  });

  eleventyConfig.addAsyncFilter(
    "renderForFeed",
    async (content, outputPath) => {
      return eleventyConfig.javascriptFunctions.renderTemplate.call(
        this,
        content,
        "md",
        {
          markdocRenderMode: "feed",
        }
      );
    }
  );

  eleventyConfig.addCollection("blogByYear", collection => {
    return chain(collection.getFilteredByGlob("src/content/blog/*.md"))
      .groupBy(post => post.date.getFullYear())
      .toPairs()
      .reverse()
      .value();
  });

  eleventyConfig.addCollection("projects", collection => {
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

  eleventyConfig.addGlobalData(
    "env",
    process.env.ELEVENTY_RUN_MODE == "serve" ? "development" : "production"
  );

  eleventyConfig.addGlobalData(
    "jil_api_admin_key",
    process.env.JIL_API_ADMIN_KEY
  );

  eleventyConfig.addTransform("htmlmin", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });

      return minified;
    }

    // If not an HTML output, return content as-is
    return content;
  });

  return {
    templateFormats: ["md", "njk", "html", "11ty.js"],
    htmlTemplateEngine: false,
    dir: {
      input: "src/content", // default: "."
      includes: "../site/includes", // default: "_includes"
      layouts: "../site/layouts", // default: "_layouts
      data: "../site/data", // default: "_data"
      output: "_site",
    },
  };
};
