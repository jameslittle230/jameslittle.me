const { nodes, Tag } = require("@markdoc/markdoc");

function generateID(children, attributes) {
  if (attributes.id && typeof attributes.id === "string") {
    return attributes.id;
  }
  return children
    .filter((child) => typeof child === "string")
    .join(" ")
    .replace(/[?]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

module.exports = {
  ...nodes.heading,
  transform(node, config) {
    const base = nodes.heading.transform(node, config);
    if (node.attributes.level === 1) {
      return base;
    }
    base.attributes.id = generateID(base.children, base.attributes);
    base.attributes.class = "heading";
    base.children.push(
      new Tag(
        "a",
        { class: "heading-anchor", href: `#${base.attributes.id}` },
        "#"
      )
    );
    return base;
  },
};
