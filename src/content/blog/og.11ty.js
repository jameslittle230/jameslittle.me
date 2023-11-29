const { makeReactImage } = require("../../site/og/react-image");
const { getOgFonts } = require("../../site/og/fonts");
const og = import("@vercel/og");

module.exports = {
  data: () => {
    return {
      layout: null,
      pagination: {
        data: "collections.blog",
        size: 1,
        alias: "post",
      },
      permalink: ({ post }) =>
        `/blog/${post.date.getFullYear()}/${post.data.slug}/og-image.jpg`,
    };
  },

  render: async ({ post }) => {
    const { ImageResponse } = await og;
    const imageResponse = new ImageResponse(
      makeReactImage("jameslittle.me", post.data.title),
      { fonts: getOgFonts() }
    );
    return Buffer.from(await imageResponse.arrayBuffer());
  },
};
