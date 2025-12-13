import type { MockRpc } from '@lvce-editor/rpc'
import { createMockRpc } from '@lvce-editor/rpc'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

const id = 9006

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create(id)

export const registerMockRpc = (commandMap: Record<string, any>): MockRpc => {
  const mockRpc = createMockRpc({ commandMap })
  set(mockRpc)
  return mockRpc
}
