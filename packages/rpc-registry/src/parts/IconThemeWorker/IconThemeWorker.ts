import type { MockRpc } from '@lvce-editor/rpc'
import { createMockRpc } from '@lvce-editor/rpc'
import type { EditorWorkerApi } from '../EditorWorkerApi/EditorWorkerApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

const id = 7009

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<EditorWorkerApi>(id)

export const getIcons = async (iconRequests: readonly any[]): Promise<readonly any[]> => {
  // @ts-ignore
  return invoke('IconTheme.getIcons', iconRequests)
}

export const registerMockRpc = (commandMap: Record<string, any>): MockRpc => {
  const mockRpc = createMockRpc({ commandMap })
  set(mockRpc)
  return mockRpc
}
