const { nodes, Tag } = require("@markdoc/markdoc");

module.exports = {
  ...nodes.image,
  transform: (node, config) => {
    const attributes = node.transformAttributes(config);
    if (!attributes.src.startsWith("http")) {
      attributes.src = `https://files.jameslittle.me/images/${attributes.src}`;
    }
    const children = node.transformChildren(config);
    return new Tag("img", { ...attributes }, children);
  },
};
