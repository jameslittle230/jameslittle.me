import { execSync } from "child_process";

const globalsPlugin = (eleventyConfig) => {
  eleventyConfig.addGlobalData("copyrightYear", () => {
    return eleventyConfig.DateTime.now().toFormat("yyyy");
  });

  eleventyConfig.addGlobalData(
    "jil_api_admin_key",
    process.env.JIL_API_ADMIN_KEY,
  );

  try {
    // This will throw if we're not in a git repo
    execSync("git status", { stdio: "ignore" });

    eleventyConfig.addGlobalData(
      "commit",
      execSync("git rev-parse HEAD", { stdio: "ignore" }).toString().trim(),
    );
  } catch (e) {
    eleventyConfig.addGlobalData("commit", "------");
  }
};

export default globalsPlugin;
