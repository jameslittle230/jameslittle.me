const { nodes, Tag } = require("@markdoc/markdoc");
const slugify = require("slugify");
const { _ } = require("lodash");

String.prototype.slugify = function (options) {
  return slugify(this.toString(), options);
};

function generateID(children, attributes) {
  if (attributes.id && typeof attributes.id === "string") {
    return attributes.id;
  }
  return _(children)
    .map(child => (typeof child === "object" ? child.children : child))
    .flattenDeep()
    .join(" ")
    .slugify({
      lower: true,
      strict: true,
    });
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

    if (config.renderMode === "default") {
      base.children.push(
        new Tag(
          "a",
          { class: "heading-anchor", href: `#${base.attributes.id}` },
          "#"
        )
      );
    }

    return base;
  },
};
