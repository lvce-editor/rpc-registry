export interface SyntaxHighlightingWorkerApi {
  readonly 'GetTokensViewport.getTokensViewport': (
    editor: any,
    startLineIndex: number,
    endLineIndex: number,
    hasLinesToSend: boolean,
    id: number,
    linesToSend: readonly any[],
  ) => Promise<any>
  readonly 'HandleMessagePort.handleMessagePort': (port: MessagePort) => Promise<void>
  readonly 'TextDocument.setLines': (documentId: string, lines: readonly string[]) => Promise<void>
  readonly 'Tokenizer.load': (languageId: string, tokenizePath: string) => Promise<void>
  readonly 'Tokenizer.tokenizeCodeBlock': (codeBlock: string, languageId: string, tokenizerPath: string) => Promise<any>
  readonly 'Tokenizer.tokenizeIncremental': (id: any, languageId: string, oldLine: string, newLine: string, rowIndex: number, minLineY: number) => any[] | undefined
}
