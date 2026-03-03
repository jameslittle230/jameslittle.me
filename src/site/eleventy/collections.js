export default function (eleventyConfig) {
  eleventyConfig.addCollection("blog", (collectionsApi) =>
    collectionsApi
      .getFilteredByGlob("src/content/blog/*.md")
      .filter(
        (post) => post.data.env === "development" || !post.data.unpublished,
      )
      .reverse(),
  );

  eleventyConfig.addCollection("projects", (collectionsApi) =>
    collectionsApi.getFilteredByGlob("src/content/projects/*.md").reverse(),
  );

  eleventyConfig.addCollection("blogByYear", (collectionsApi) => {
    const posts = collectionsApi
      .getFilteredByGlob("src/content/blog/*.md")
      .filter(
        (post) => post.data.env === "development" || !post.data.unpublished,
      )
      .sort((a, b) => b.date - a.date); // Explicitly sort by date, newest first

    // Group by year
    const grouped = posts.reduce((acc, post) => {
      const year = post.date.getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(post);
      return acc;
    }, {});

    // Convert to pairs and reverse to show newest years first
    return Object.entries(grouped)
      .map(([year, posts]) => [Number(year), posts])
      .reverse();
  });
}
