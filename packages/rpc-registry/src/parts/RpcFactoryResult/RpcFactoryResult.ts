import type { Rpc } from '@lvce-editor/rpc'

export interface RpcFactoryResult {
  readonly invoke: (method: string, ...params: readonly unknown[]) => Promise<any>
  readonly invokeAndTransfer: (method: string, ...params: readonly unknown[]) => Promise<any>
  readonly set: (rpc: Rpc) => void
  readonly dispose: () => Promise<void>
}
