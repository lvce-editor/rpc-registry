import type { MockRpc } from '@lvce-editor/rpc'
import { createMockRpc } from '@lvce-editor/rpc'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'
import { RpcId } from '@lvce-editor/constants'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<{}>(RpcId.IconThemeWorker)

export const getIcons = async (iconRequests: readonly any[]): Promise<readonly any[]> => {
  // @ts-ignore
  return invoke('IconTheme.getIcons', iconRequests)
}

export const registerMockRpc = (commandMap: Record<string, any>): MockRpc => {
  const mockRpc = createMockRpc({ commandMap })
  set(mockRpc)
  return mockRpc
}
