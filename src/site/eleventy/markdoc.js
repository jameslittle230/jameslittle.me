import Markdoc from "@markdoc/markdoc";

const markdocPlugin = (markdocConfig) => (eleventyConfig) => {
  const njk = new Promise((resolve) => {
    eleventyConfig.events.on("eleventy.engine.njk", (payload) =>
      resolve(payload),
    );
  });

  eleventyConfig.addExtension("md", {
    key: "md",
    compileOptions: {
      cache: false,
      spiderJavascriptDependencies: true,
      permalink: (inputContent) => {
        return async (data) => {
          if (!data.permalink) {
            return false;
          }
          const { environment } = await njk;
          return environment.renderString(inputContent, data);
        };
      },
    },
    compile: (inputContent, inputPath) => {
      return async function (data) {
        const tokenizer = new Markdoc.Tokenizer({ typographer: true });
        let ast = Markdoc.parse(tokenizer.tokenize(inputContent));

        data.markdocErrors = Markdoc.validate(ast, markdocConfig);
        const errorsLength = data.markdocErrors.length;
        if (errorsLength > 0 && inputPath.includes(".md")) {
          console.error(errorsLength + " Markdoc errors in " + inputPath);
        }

        let renderableTree = await Markdoc.transform(ast, markdocConfig);
        let html = Markdoc.renderers.html(renderableTree);
        return html;
      };
    },
  });

  eleventyConfig.addAsyncFilter(
    "renderForFeed",
    async (content, outputPath) => {
      if (!content) return "";
      const tokenizer = new Markdoc.Tokenizer({ typographer: true });
      let ast = Markdoc.parse(tokenizer.tokenize(content));

      let renderableTree = await Markdoc.transform(ast, {
        ...markdocConfig,
        renderMode: "feed",
      });
      let html = Markdoc.renderers.html(renderableTree);
      return html;
    },
  );
};

export default markdocPlugin;
