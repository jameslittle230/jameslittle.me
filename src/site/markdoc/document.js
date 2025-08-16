import Markdoc from "@markdoc/markdoc";
const { nodes, Tag } = Markdoc;

export const document = {
  ...nodes.document,
  async transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = await node.transformChildren(config);
    const classNames = ["document"];
    if (config.renderMode === "feed") {
      classNames.push("feed");
    }
    const base = new Tag(
      "article",
      { class: classNames.join(" "), ...attributes },
      children,
    );
    const { footnotes } = config;
    if (footnotes && Array.isArray(base.children)) {
      base.children.push(
        new Tag("h2", {}, "Footnotes"),
        new Tag("ol", {}, footnotes),
      );
    }
    return base;
  },
};
