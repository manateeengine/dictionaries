import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    {
      builder: "mkdist",
      cleanDist: true,
      format: 'cjs',
      input: "./src",
      outDir: "./dist",
    },
  ],
});
