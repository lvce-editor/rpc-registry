export interface MarkdownWorkerApi {
  readonly 'Markdown.getMarkDownVirtualDom': (html: string) => Promise<any>
  readonly 'Markdown.renderMarkdown': (markdown: string, options: any) => Promise<void>
}
