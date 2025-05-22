# Dictionaries

Automatically Generated CSpell Dictionaries used in Manatee Projects

## 👋 Introduction

I had a couple goals when I first started building Manatee:

1. Reach the highest level of code quality reasonably possible with every single component of the
   engine.
2. Contribute to the overall Zig ecosystem and help others achieve the same level of quality.

When I first started writing Zig, I realized that some of the tooling that I enjoy using while
working my day job as a TypeScript engineer didn't have a Zig alternative or simply wasn't
compatible with Zig, and one of those tools was cSpell. I believe that it's far too easy to
accidentally misspell while writing code (I do it all the time), and it's just as easy to miss
spelling mistakes during the code review process, so I decided to create a series of cSpell
dictionaries to bring this spell checking functionality to Zig, thereby achieving both of the above
goals.

This repo is a TypeScript-based monorepo that generates cSpell dictionaries for every piece of
technology used during the development of Manatee, as well as VS Code extensions (thus the reason
why this was written in TypeScript instead of Zig) to create an easy to use, first class Zig spell
checking experience in my favorite editor.

## 📚 Dictionaries

This repo contains the following dictionaries:

* `zig` - A dictionary containing all reserved words that are a part of the Zig language, as well
  as words that are commonly used while writing Zig code.

## ⚙️ VSCode Extensions

This repo contains the following VS Code extensions:

* `code-spell-checker-zig` - A VS Code extension that automatically sets up the Zig dictionary for
  in-editor usage.

## 🚗 Roadmap

The following items are coming eventually, but have no deadline attached to them

* Setting up ESLint, unit testing, Prettier, and comprehensive CI pipeline
* Dictionaries for Zig's STD and Builtin
* Automatic package publishing
* Nightly releases matching Zig's nightly builds
* More dictionaries for other Manatee related things
* Better docs regarding the monorepo
