import Markdoc from "@markdoc/markdoc";

const markdocPlugin = (markdocConfig) => (eleventyConfig) => {
  eleventyConfig.addExtension("md", {
    compileOptions: {
      cache: false,
      spiderJavascriptDependencies: true,

      // Don't use Markdoc compiler to compile permalink
      // https://www.11ty.dev/docs/languages/custom/#compile-options-permalink-to-override-permalink-compilation
      permalink: () => () => undefined,
    },
    key: "md",
    compile: (inputContent, inputPath) => {
      return async (data) => {
        const tokenizer = new Markdoc.Tokenizer({ typographer: true });
        let ast = Markdoc.parse(tokenizer.tokenize(inputContent));

        data.markdocErrors = Markdoc.validate(ast, markdocConfig);
        const errorsLength = data.markdocErrors.length;
        if (errorsLength > 0 && inputPath.includes(".md")) {
          console.error(errorsLength + " Markdoc errors in " + inputPath);
        }

        let content = await Markdoc.transform(ast, markdocConfig);
        let html = Markdoc.renderers.html(content);
        return html;
      };
    },
  });
};

export default markdocPlugin;
