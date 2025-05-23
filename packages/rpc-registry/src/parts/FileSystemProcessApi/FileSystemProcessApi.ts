export interface FileProcessApi {
  readonly 'FileSystem.readFile': (uri: string) => Promise<string>
}
