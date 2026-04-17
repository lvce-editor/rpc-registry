import { createMockRpc } from '@lvce-editor/rpc'
import type { MockRpc } from '../MockRpc/MockRpc.ts'
import { set } from '../RpcRegistry/RpcRegistry.ts'

export const registerMockRpc = (rpcId: number, commandMap: Record<string, any>): MockRpc => {
  const mockRpc = createMockRpc({ commandMap })
  set(rpcId, mockRpc)
  return mockRpc
}
