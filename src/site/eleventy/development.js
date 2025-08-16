export default function (eleventyConfig) {
  process.env.ELEVENTY_MODE =
    process.env.ELEVENTY_RUN_MODE == "serve" ? "development" : "production";

  eleventyConfig.addGlobalData("env", process.env.ELEVENTY_MODE);
}
