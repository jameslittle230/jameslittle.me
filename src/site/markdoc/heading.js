import slugify from "slugify";
import Markdoc from "@markdoc/markdoc";
const { nodes, Tag } = Markdoc;

String.prototype.slugify = function (options) {
  return slugify(this.toString(), options);
};

function generateID(children, attributes) {
  if (attributes.id && typeof attributes.id === "string") {
    return attributes.id;
  }
  return children
    .map((child) => (typeof child === "object" ? child.children : child))
    .flat(Infinity)
    .join(" ")
    .toLowerCase()
    .slugify();
}

export const heading = {
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
        "#",
      ),
    );

    return base;
  },
};
