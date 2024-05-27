const { makeReactImage } = require("../../site/og/react-image");
const { getOgFonts } = require("../../site/og/fonts");
const og = import("@vercel/og");

module.exports = {
  data: () => {
    return {
      layout: null,
      pagination: {
        data: "photosets",
        size: 1,
        alias: "set",
      },
      permalink: ({ set }) => `/photos/${set.slug}/og-image.jpg`,
    };
  },

  render: async ({ set }) => {
    const { ImageResponse } = await og;
    const imageResponse = new ImageResponse(
      makeReactImage("Photos • jameslittle.me", set.title),
      { fonts: getOgFonts(), width: 1200, height: 630 }
    );
    return Buffer.from(await imageResponse.arrayBuffer());
  },
};
