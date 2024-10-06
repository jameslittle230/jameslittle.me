const Markdoc = require("@markdoc/markdoc");
const { _ } = require("lodash");

module.exports = eleventyConfig => {
  eleventyConfig.addExtension("md", {
    compileOptions: {
      cache: false,
      spiderJavascriptDependencies: true,
    },

    compile: function (inputContent, inputPath) {
      return async data => {
        const shiki = await import("shiki");
        if (!inputPath || data.page?.outputPath === "") {
          return this.defaultRenderer(data);
        }

        const markdocConfig = {
          shiki,
          renderMode: data.markdocRenderMode || "default",
          nodes: {
            document: require("../markdoc/document.js"),
            heading: require("../markdoc/heading.js"),
            fence: require("../markdoc/fence.js"),
            image: require("../markdoc/image.js"),
          },
          tags: {
            image: require("../markdoc/image.js"),
            note: require("../markdoc/note.js"),
            figure: require("../markdoc/figure.js"),
            footnote: require("../markdoc/footnote.js"),
            comment: require("../markdoc/comment.js"),
          },
        };

        data.inputContent = inputContent;

        const tokenizer = new Markdoc.Tokenizer({
          typographer: true,
        });
        let ast = Markdoc.parse(tokenizer.tokenize(inputContent));

        if (process.env.ELEVENTY_MODE === "development") {
          data.markdocErrors = Markdoc.validate(ast, markdocConfig);
          const errorsLength = data.markdocErrors.length;
          if (errorsLength > 0 && inputPath.includes(".md")) {
            console.log(errorsLength + " Markdoc errors in " + inputPath);
          }
        }

        let content = await Markdoc.transform(ast, markdocConfig);
        let html = Markdoc.renderers.html(content);
        return html;
      };
    },
  });
};
