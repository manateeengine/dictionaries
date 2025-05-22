import { $ } from "bun";

const packageJsonContents = await Bun.file('./temp/package.json').json();
const version = packageJsonContents.version;

for await (let line of $`bunx vsce publish ${version}`.cwd('./temp').lines()) {
  console.log(line);
}
