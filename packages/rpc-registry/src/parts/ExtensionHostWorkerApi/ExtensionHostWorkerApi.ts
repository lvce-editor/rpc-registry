export interface ExtensionHostWorkerApi {
  readonly 'Extensions.getExtensions': () => Promise<readonly any[]>
}
