const { Tag } = require("@markdoc/markdoc");

module.exports = {
  attributes: {
    caption: { type: "String" },
    layout: {
      type: "String",
      matches: ["wide", "wide-half-left", "half-left", "half-right"],
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
