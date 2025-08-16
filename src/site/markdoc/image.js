import Markdoc from "@markdoc/markdoc";
const { Tag, nodes } = Markdoc;

export const image = {
  ...nodes.image,
  transform: (node, config) => {
    const attributes = node.transformAttributes(config);
    if (!attributes.src.startsWith("http")) {
      attributes.src = `https://files.jameslittle.me/images/${attributes.src}`;
    }
    const children = node.transformChildren(config);
    return [
      new Tag("a", { href: attributes.src }, [
        new Tag("img", { ...attributes }, children),
      ]),
    ];
  },
};
