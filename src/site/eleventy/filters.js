export default function (eleventyConfig) {
  eleventyConfig.addFilter("first", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addFilter("keys", (obj) => {
    return Object.keys(obj);
  });

  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
    return eleventyConfig.DateTime.fromJSDate(dateObj, {
      zone: zone || "utc",
    }).toFormat(format || "DDD");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return eleventyConfig.DateTime.fromJSDate(dateObj, {
      zone: "utc",
    }).toFormat("yyyy-LL-dd");
  });
}
