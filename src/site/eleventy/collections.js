export default function (eleventyConfig) {
  eleventyConfig.addCollection("blog", (collectionsApi) => {
    return collectionsApi.getFilteredByGlob("src/content/blog/*.md");
  });

  // eleventyConfig.addAsyncFilter("renderForFeed", async (content) => {
  //   return eleventyConfig.javascriptFunctions.renderTemplate.call(
  //     this,
  //     content,
  //     "md",
  //     {
  //       markdocRenderMode: "feed",
  //     },
  //   );
  // });

  eleventyConfig.addCollection("blogByYear", (collectionsApi) => {
    const posts = collectionsApi.getFilteredByGlob("src/content/blog/*.md");

    // Group by year
    const grouped = posts.reduce((acc, post) => {
      const year = post.date.getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(post);
      return acc;
    }, {});

    // Convert to pairs and reverse
    return Object.entries(grouped)
      .map(([year, posts]) => [Number(year), posts])
      .reverse();
  });

  eleventyConfig.addCollection("projects", (collectionsApi) => {
    return collectionsApi.getFilteredByGlob("src/content/projects/*.md");
  });
}
