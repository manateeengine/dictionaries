import { $ } from 'bun';
import { cp, mkdir, stat, readFile, rm } from 'node:fs/promises';

try {
  await stat('./temp')
  await rm('./temp', { force: true, recursive: true })
} catch {
  // This means we don't have any temp dir to clean up and can do nothing
}

await mkdir('./temp');

try {
  await readFile('./dist/extension.js')
} catch {
  throw new Error('Extension build not found. Please run "bun run build" before publishing');
}

// Copy over all files required for extension publication except package.json
await cp('./CHANGELOG.md', './temp/CHANGELOG.md');
await cp('./LICENSE', './temp/LICENSE');
await cp('./README.md', './temp/README.md');

// Copy over build output
await cp('./dist', './temp/dist', { recursive: true });
await cp('./cspell-ext.json', './temp/cspell-ext.json', { recursive: true });

// Read package.json
const packageJsonContents = await Bun.file('./package.json').json();

// Remove dev dependencies (yes, really, publishing won't work due to workspaces if we don't)
delete packageJsonContents['devDependencies'];

// Remove workspace prefix from dependencies
packageJsonContents['dependencies'] = Object.fromEntries(
    Object.entries(packageJsonContents['dependencies'])
    .map(([name, version]) => [name, (version as string).replace('workspace:', '')]),
)

// Write package.json with deps removed
await Bun.write('./temp/package.json', JSON.stringify(packageJsonContents, undefined, 2));

// Install dependencies with NPM
await $`npm install`.cwd('./temp');