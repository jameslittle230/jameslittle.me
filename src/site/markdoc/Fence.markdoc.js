const { nodes, Tag } = require("@markdoc/markdoc");

const getDisplayLanguage = (language) => {
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
    case "txt":
      return null;
    default:
      return language;
  }
};

module.exports = {
  ...nodes.fence,
  attributes: {
    title: {
      type: String,
      default: "",
    },
    nocopy: {
      type: Boolean,
      default: false,
    },
    ...nodes.fence.attributes,
  },
  transform(node, config) {
    const base = nodes.fence.transform(node, config);
    const code = node.children[0].attributes.content.trim();

    if (config.renderMode === "feed") {
      return base;
    }

    const { highlighter } = config;
    const { language, title, nocopy } = node.attributes;

    const lines = highlighter.codeToThemedTokens(code, language);

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

    const displayLanguage = getDisplayLanguage(language);

    return new Tag(
      "div",
      {
        "data-content": code,
        class: "fence-wrapper",
        style: `--bg: ${highlighter.getBackgroundColor()}; --fg: ${highlighter.getForegroundColor()};`,
      },
      [
        new Tag("div", { class: "fence-header" }, [
          new Tag("div", { class: "title" }, [title]),
          new Tag("div", {}, [
            !nocopy && new Tag("button", { class: "copy" }, ["Copy"]),
            displayLanguage &&
              new Tag("div", { class: "language" }, [displayLanguage]),
          ]),
        ]),
        base,
      ]
    );
  },
};
