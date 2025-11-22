import type { MockRpc } from '@lvce-editor/rpc'
import { RpcId } from '@lvce-editor/constants'
import { createMockRpc } from '@lvce-editor/rpc'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create(RpcId.SourceControlWorker)

export const registerMockRpc = (commandMap: Record<string, any>): MockRpc => {
  const mockRpc = createMockRpc({ commandMap })
  set(mockRpc)
  return mockRpc
}
