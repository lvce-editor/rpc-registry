export interface RendererProcessApi {
  readonly 'Debug.pause': () => Promise<void>
  readonly 'Debug.resume': () => Promise<void>
}
