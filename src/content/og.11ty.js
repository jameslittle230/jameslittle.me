const { makeReactImage } = require("../site/og/react-image");
const { getOgFonts } = require("../site/og/fonts");
const og = import("@vercel/og");

module.exports = {
  data: () => {
    return {
      layout: null,
      permalink: () => `/og-image.jpg`,
    };
  },

  render: async ({ post }) => {
    const { ImageResponse } = await og;
    const imageResponse = new ImageResponse(
      makeReactImage("", "jameslittle.me"),
      { fonts: getOgFonts() }
    );
    return Buffer.from(await imageResponse.arrayBuffer());
  },
};
