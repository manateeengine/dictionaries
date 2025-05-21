import * as vscode from 'vscode';

// This typing comes from https://github.com/streetsidesoftware/vscode-cspell-dict-extensions
interface CodeSpellCheckerExtension {
  registerConfig(path: string): Promise<void>;
  enableLocale(isGlobal: boolean, locale: string): Promise<void>;
  disableLocale(isGlobal: boolean, locale: string): Promise<void>;
}

const CSPELL_EXTENSION_NAME = 'streetsidesoftware.code-spell-checker';

export function activate(context: vscode.ExtensionContext) {
  const configLocation = context.asAbsolutePath('./cspell-ext.json');
  const extension = vscode.extensions.getExtension<CodeSpellCheckerExtension>(CSPELL_EXTENSION_NAME);

  if (extension) {
    extension.activate().then((ext) => {
      ext?.registerConfig?.(configLocation);
    });
  }
}

// This method is unused but required by VS Code
export function deactivate() {}
