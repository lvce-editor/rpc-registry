export interface SyntaxHighlightingWorkerApi {
  readonly 'Syntax.highlight': (lines: readonly string[]) => Promise<readonly any[]>
}
