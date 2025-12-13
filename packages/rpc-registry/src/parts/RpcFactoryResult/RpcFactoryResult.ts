import type { Rpc } from '@lvce-editor/rpc'

export interface RpcFactoryResult {
  readonly dispose: () => Promise<void>
  readonly invoke: (method: string, ...params: readonly unknown[]) => Promise<any>
  readonly invokeAndTransfer: (method: string, ...params: readonly unknown[]) => Promise<any>
  readonly set: (rpc: Rpc) => void
}
