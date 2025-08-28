import Markdoc from "@markdoc/markdoc";
import { codeToTokens } from "shiki";
const { Tag, nodes } = Markdoc;

export const fence = {
  ...Markdoc.nodes.fence,
  async transform(node, config) {
    if (config.renderMode === "feed") {
      const base = nodes.fence.transform(node, config);
      delete base.attributes;
      return base;
    }
    const { language, title } = node.attributes;
    const rawCode = node.children[0].attributes.content.trim();
    const { tokens, fg, bg } = await codeToTokens(rawCode, {
      lang: language,
      theme: "one-dark-pro",
    });

    const tags = tokens.map((line, index) => {
      const lineNumber = index + 1;
      return new Tag("div", { class: "line" }, [
        new Tag("span", { class: "line-number" }, [lineNumber]),
        ...line.map(
          (token) =>
            new Tag(
              "span",
              { class: "token", style: `color: ${token.color}` },
              token.content,
            ),
        ),
      ]);
    });

    const base = Markdoc.nodes.fence.transform(node, config);
    base.children = tags;

    return new Tag(
      "div",
      {
        class: "fence-wrapper",
        style: `--bg: ${bg}; --fg: ${fg};`,
      },
      [
        title &&
        new Tag("div", { class: "fence-header" }, [
          new Tag("div", { class: "title" }, [title]),
        ]),
        base,
      ],
    );
  },
};
