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

    if (config.renderMode === "feed") {
      const footnoteIndex = config.footnotes ? config.footnotes.length + 1 : 1;
      const footnoteTag = new Tag(
        "li",
        {
          id: `footnote-${footnoteIndex}`,
          value: `${footnoteIndex}`,
        },
        [...children, new Tag("a", { href: `#ref-${footnoteIndex}` }, [`[^] `])]
      );
      if (Array.isArray(config.footnotes)) {
        config.footnotes.push(footnoteTag);
      } else {
        config.footnotes = [footnoteTag];
      }
      return new Tag(
        "a",
        {
          id: `ref-${footnoteIndex}`,
          href: `#footnote-${footnoteIndex}`,
          class: "footnote",
        },
        [`[${footnoteIndex}]`]
      );
    }

    const id = Math.random()
      .toString(36)
      .substring(2, 8 + 2);

    return new Tag("span", {}, [
      new Tag("span", { class: "footnote-marker", "data-content-id": id }, "*"),
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
