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

    const id = Math.random()
      .toString(36)
      .substring(2, 8 + 2);

    return new Tag("span", {}, [
      new Tag("span", { class: "footnote-marker", "data-content-id": id }, "†"),
      new Tag(
        "span",
        {
          class: "footnote-content",
          id,
        },
        children
      ),
    ]);
  },
};
