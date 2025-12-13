import type { Rpc } from '@lvce-editor/rpc'

export interface LazyRpc {
  readonly invoke: (method: string, ...params: readonly any[]) => Promise<any>
  readonly setFactory: (value: () => Promise<Rpc>) => void
}
