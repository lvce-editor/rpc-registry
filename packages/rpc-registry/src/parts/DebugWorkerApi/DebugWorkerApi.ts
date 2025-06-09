export interface DebugWorkerApi {
  readonly 'Debug.pause': () => Promise<void>
  readonly 'Debug.resume': () => Promise<void>
}
