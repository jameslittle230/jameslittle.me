import fs from "fs";
import ogPlugin from "eleventy-plugin-og-image";

const ogImagePlugin = (eleventyConfig) => {
  if (process.env.ELEVENTY_MODE === "production") {
    eleventyConfig.addPlugin(ogPlugin, {
      satoriOptions: {
        fonts: [
          {
            name: "Inter",
            data: fs.readFileSync("./src/site/og/Inter-Light.ttf"),
            weight: 400,
            style: "normal",
          },
          {
            name: "Inter",
            data: fs.readFileSync("./src/site/og/Inter-SemiBold.ttf"),
            weight: 700,
            style: "normal",
          },
        ],
      },
    });
  } else {
    eleventyConfig.addShortcode("ogImage", () => "");
  }
};

export default ogImagePlugin;
