export interface ErrorWorkerApi {
  readonly 'Errors.prepare': (error: any) => Promise<any>
}
