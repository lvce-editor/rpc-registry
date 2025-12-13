export interface ClipBoardWorkerApi {
  readonly 'ClipBoard.readNativeFiles': () => Promise<any>
  readonly 'ClipBoard.writeNativeFiles': (type: string, files: readonly string[]) => Promise<void>
  readonly 'ClipBoard.writeText': (text: string) => Promise<void>
}
