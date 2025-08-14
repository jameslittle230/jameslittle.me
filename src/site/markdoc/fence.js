const { nodes, Tag } = require("@markdoc/markdoc");

module.exports = {
  ...nodes.fence,
  attributes: {
    title: {
      type: String,
      default: "",
    },
    ...nodes.fence.attributes,
  },
  async transform(node, config) {
    const base = nodes.fence.transform(node, config);
    delete base.attributes;
    const code = node.children[0].attributes.content.trim();

    if (config.renderMode === "feed") {
      return base;
    }

    const { shiki } = config;
    const { language, title, nocopy } = node.attributes;

    const { tokens, fg, bg } = await shiki.codeToTokens(code, {
      lang: language,
      theme: 'one-dark-pro'
    });

    const tags = tokens.map((line, index) => {
      const lineNumber = index + 1;
      return new Tag("div", { class: "line" }, [
        new Tag(
          "span",
          {
            class: "line-number",
          },
          [lineNumber]
        ),
        ...line.map(
          (token) =>
            new Tag(
              "span",
              { class: "token", style: `color: ${token.color}` },
              token.content
            )
        ),
      ]);
    });

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
      ]

    );
  },
};
