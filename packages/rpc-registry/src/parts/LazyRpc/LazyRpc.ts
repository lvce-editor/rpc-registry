import type { Rpc } from '@lvce-editor/rpc'

export interface LazyRpc {
  readonly dispose: () => Promise<void>
  readonly invoke: (method: string, ...params: readonly any[]) => Promise<any>
  readonly invokeAndTransfer: (method: string, ...params: readonly any[]) => Promise<any>
  readonly onDidReset: (listener: (reason: unknown) => void) => () => void
  readonly reset: (reason?: unknown) => Promise<void>
  readonly setFactory: (value: () => Promise<Rpc>) => void
}
