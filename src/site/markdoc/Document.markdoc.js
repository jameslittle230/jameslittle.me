const { nodes, Tag } = require("@markdoc/markdoc");

module.exports = {
  ...nodes.document,
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const classNames = ["document"];
    if (config.renderMode === "feed") {
      classNames.push("feed");
    }
    const base = new Tag(
      "article",
      { class: classNames.join(" "), ...attributes },
      children
    );
    const { footnotes } = config;
    if (footnotes) {
      base.children.push(
        new Tag("h2", {}, "Footnotes"),
        new Tag("ol", {}, footnotes)
      );
    }
    return base;
  },
};
