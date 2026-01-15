import type { Rpc } from '@lvce-editor/rpc'
import type { DisposableMockRpc } from '../DisposableMockRpc/DisposableMockRpc.ts'

export interface RpcFactoryResult {
  readonly dispose: () => Promise<void>
  readonly invoke: (method: string, ...params: readonly unknown[]) => Promise<any>
  readonly invokeAndTransfer: (method: string, ...params: readonly unknown[]) => Promise<any>
  readonly registerMockRpc: (commandMap: Record<string, any>) => DisposableMockRpc
  readonly set: (rpc: Rpc) => void
}
