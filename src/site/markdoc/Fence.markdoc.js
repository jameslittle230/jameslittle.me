const { nodes, Tag } = require("@markdoc/markdoc");

const displayLanguage = (language) => {
  switch (language) {
    case "js":
      return "JavaScript";
    case "ts":
      return "TypeScript";
    case "html":
      return "HTML";
    case "css":
      return "CSS";
    case "json":
      return "JSON";
    case "md":
      return "Markdown";
    case "rust":
      return "Rust";
    case "bash":
    case "sh":
      return "Shell";
    case "yaml":
      return "YAML";
    case "python":
      return "Python";
    case "toml":
      return "TOML";
    case "jsx":
      return "JSX";
    case "tsx":
      return "TSX";
    case "swift":
      return "Swift";
    default:
      return language;
  }
};

module.exports = {
  ...nodes.fence,
  attributes: {
    title: {
      type: String,
      default: "asdf",
    },
    ...nodes.fence.attributes,
  },
  transform(node, config) {
    const base = nodes.fence.transform(node, config);
    const code = node.children[0].attributes.content.trim();

    const { highlighter } = config;

    const lines = highlighter.codeToThemedTokens(
      code,
      node.attributes.language
    );

    const tags = lines.map((line, index) => {
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
        style: `--bg: ${highlighter.getBackgroundColor()}; --fg: ${highlighter.getForegroundColor()};`,
      },
      [
        new Tag("div", { class: "fence-header" }, [
          new Tag("div", { class: "title" }, [node.attributes.title]),
          new Tag("div", { class: "language" }, [
            displayLanguage(node.attributes.language),
          ]),
        ]),
        base,
      ]
    );
  },
};
