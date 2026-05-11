import { minify } from "html-minifier-next";

const htmlPlugin = (eleventyConfig) => {
  eleventyConfig.addTransform("htmlMinifier", (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      return minify(content, {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        html5: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeOptionalTags: true,
        sortAttributes: true,
        sortClassName: true,
      });
    }
    return content;
  });
};

export default htmlPlugin;
