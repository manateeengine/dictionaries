// This script fetches the Zig VSCode Language Definition and parses it to find all Zig keywords.
// From there, it outputs those words into ./dist/dictionary.txt. This is a very naive approach and
// it makes a lot of assumptions about Zig via that definition file, but it's a great starting
// point and can always be refined (with unit tests please) later down the road.

interface PartialTmLanguageDef {
  repository: {
    keywords: {
      patterns: {
        match: string
      }[]
    },
  },
}

const zigTmLanguageDefRes = await fetch('https://raw.githubusercontent.com/ziglang/vscode-zig/refs/heads/master/syntaxes/zig.tmLanguage.json');
const zigTmLanguageDef = await zigTmLanguageDefRes.json() as PartialTmLanguageDef;

const keywordsInMatches = zigTmLanguageDef.repository.keywords.patterns.flatMap(({ match }) => {
  const beginningOperator = '\\b(';
  const endOperator = ')\\b';
  const isValid = match.includes(beginningOperator) && match.includes(endOperator);
  if (!isValid) {
    return [];
  }
  
  const allWords = match.replace(beginningOperator, '').replace(endOperator, '').split('|');
  return allWords;
});

// These are words that are commonly found in Zig projects that aren't reserved words but will flag
// spelling errors in projects
const otherWords = ['deinit']

const allWords = [...keywordsInMatches, otherWords];

const dictionaryContent = allWords.join('\n');
await Bun.write('./dist/dictionary.txt', dictionaryContent);