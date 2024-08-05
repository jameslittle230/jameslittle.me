const { Tag } = require("@markdoc/markdoc");

module.exports = {
  attributes: {
    title: {
      type: String,
      optional: true,
    },
  },

  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);

    return new Tag("aside", { class: "note", ...attributes }, [
      new Tag("h1", { class: "note-title" }, attributes.title),
      children,
    ]);
  },
};
