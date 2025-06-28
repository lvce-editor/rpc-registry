import type { Rpc } from '@lvce-editor/rpc'

export interface LazyRpc {
  readonly setFactory: (value: () => Promise<Rpc>) => void
  readonly invoke: (method: string, ...params: readonly any[]) => Promise<any>
}
