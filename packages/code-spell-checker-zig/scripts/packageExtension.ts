import { $ } from "bun";

for await (let line of $`bunx vsce package`.cwd('./temp').lines()) {
  console.log(line);
}
