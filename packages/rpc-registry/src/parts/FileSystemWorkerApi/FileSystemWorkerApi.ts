export interface FileSystemWorkerApi {
  readonly 'FileSystem.copy': (oldUri: string, newUri: string) => Promise<void>
  readonly 'FileSystem.getPathSeparator': () => Promise<string>
  readonly 'FileSystem.getRealPath': (uri: string) => Promise<string>
  readonly 'FileSystem.mkdir': (uri: string) => Promise<void>
  readonly 'FileSystem.readDirWithFileTypes': (uri: string) => Promise<readonly any[]>
  readonly 'FileSystem.readFile': (uri: string) => Promise<string>
  readonly 'FileSystem.remove': (uri: string) => Promise<void>
  readonly 'FileSystem.rename': (oldUri: string, newUri: string) => Promise<void>
  readonly 'FileSystem.stat': (uri: string) => Promise<any>
  readonly 'FileSystem.writeFile': (uri: string, content: string) => Promise<void>
}
