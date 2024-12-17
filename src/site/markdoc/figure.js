const { Tag } = require("@markdoc/markdoc");

module.exports = {
  attributes: {
    caption: { type: "String" },
    layout: {
      type: "String",
      matches: ["wide", "half-left", "half-right", "half-middle"],
    },
  },

  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);

    return new Tag("figure", { class: attributes.layout, ...attributes }, [
      children,
      new Tag("figcaption", {}, attributes.caption),
    ]);
  },
};
