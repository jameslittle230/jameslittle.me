import postcss from "postcss";
import fs from "fs/promises";
import autoprefixer from "autoprefixer";
import cssnanoPlugin from "cssnano";
import postcssEasyImport from "postcss-easy-import";
import postcssNesting from "postcss-nested";

const cssPlugin = async (eleventyConfig) => {
  eleventyConfig.addWatchTarget("src/site/styles/");

  const processor = postcss([
    autoprefixer(),
    cssnanoPlugin(),
    postcssEasyImport,
    postcssNesting,
  ]);

  eleventyConfig.on("eleventy.before", async ({ }) => {
    const css = await fs.readFile("src/site/styles/style.css");
    const result = await processor.process(css, {
      from: "src/site/styles/style.css",
      to: "_site/style.css",
    });

    result.warnings().forEach((warn) => {
      console.warn(warn.toString());
    });

    fs.writeFile("_site/style.css", result.css, () => true);
  });

  eleventyConfig.addBundle("css", {
    transforms: [
      async function (content) {
        let result = await processor.process(content, {
          from: this.page.inputPath,
          to: null,
        });
        return result.css;
      },
    ],
  });

  eleventyConfig.addGlobalData("cssUrl", "/style.css");
};

export default cssPlugin;
