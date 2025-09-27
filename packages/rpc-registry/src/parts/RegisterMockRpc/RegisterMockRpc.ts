import type { MockRpc } from '@lvce-editor/rpc'
import { createMockRpc } from '@lvce-editor/rpc'
import { set } from '../RpcRegistry/RpcRegistry.ts'

export const registerMockRpc = (rpcId: number, commandMap: Record<string, any>): MockRpc => {
  const mockRpc = createMockRpc({ commandMap })
  set(rpcId, mockRpc)
  return mockRpc
}
