const shiki = require("shiki");
const Markdoc = require("@markdoc/markdoc");

const highlighter = shiki.getHighlighter({
  theme: "github-dark",
});

module.exports = (eleventyConfig) => {
  eleventyConfig.addExtension("md", {
    compileOptions: {
      cache: false,
      spiderJavascriptDependencies: true,
    },

    compile: function (inputContent, inputPath) {
      return async (data) => {
        if (!inputPath || data.page?.outputPath === "") {
          return this.defaultRenderer(data);
        }

        const markdocConfig = {
          highlighter: await highlighter,
          renderMode: data.markdocRenderMode || "default",
          nodes: {
            document: require("./src/site/markdoc/Document.markdoc.js"),
            heading: require("./src/site/markdoc/Heading.markdoc.js"),
            fence: require("./src/site/markdoc/Fence.markdoc.js"),
            image: require("./src/site/markdoc/Image.markdoc.js"),
          },
          tags: {
            image: require("./src/site/markdoc/Image.markdoc.js"),
            note: require("./src/site/markdoc/Note.markdoc.js"),
            figure: require("./src/site/markdoc/Figure.markdoc.js"),
            footnote: require("./src/site/markdoc/Footnote.markdoc.js"),
          },
        };

        data.inputContent = inputContent;

        let ast = Markdoc.parse(inputContent);
        let content = Markdoc.transform(ast, markdocConfig);
        let html = Markdoc.renderers.html(content);
        return html;
      };
    },
  });
};
