import fs from "fs";
import markdocPlugin from "./src/site/eleventy/markdoc.js";
import markdocConfig from "./src/site/markdoc/config.js";
import globalsPlugin from "./src/site/eleventy/globals.js";
import draftsPlugin from "./src/site/eleventy/drafts.js";
import cssPlugin from "./src/site/eleventy/css.js";
import filtersPlugin from "./src/site/eleventy/filters.js";
import collectionsPlugin from "./src/site/eleventy/collections.js";
import developmentPlugin from "./src/site/eleventy/development.js";
import ogImagePlugin from "./src/site/eleventy/og.js";
import pluginRss from "@11ty/eleventy-plugin-rss";
import tinyHtml from "@sardine/eleventy-plugin-tinyhtml";

export default async function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src/content");
  eleventyConfig.setLayoutsDirectory("../site/layouts");
  eleventyConfig.setDataDirectory("../site/data");
  eleventyConfig.setIncludesDirectory("../site/includes");

  eleventyConfig.addGlobalData("layout", "base");

  eleventyConfig.addBundle("html");

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(markdocPlugin(markdocConfig));
  eleventyConfig.addPlugin(tinyHtml);
  eleventyConfig.addPlugin(globalsPlugin);
  eleventyConfig.addPlugin(draftsPlugin);
  eleventyConfig.addPlugin(cssPlugin);
  eleventyConfig.addPlugin(filtersPlugin);
  eleventyConfig.addPlugin(collectionsPlugin);
  eleventyConfig.addPlugin(developmentPlugin);
  eleventyConfig.addPlugin(ogImagePlugin);
}
