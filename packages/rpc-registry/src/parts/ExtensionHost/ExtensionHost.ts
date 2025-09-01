import { RpcId } from '@lvce-editor/constants'
import type { ExtensionHostWorkerApi } from '../ExtensionHostWorkerApi/ExtensionHostWorkerApi.ts'
import type { RuntimeStatus } from '../RuntimeStatus/RuntimeStatus.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'
import { createMockRpc, MockRpc } from '@lvce-editor/rpc'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<ExtensionHostWorkerApi>(RpcId.ExtensionHostWorker)

export const executeReferenceProvider = async (id: number, offset: number): Promise<readonly any[]> => {
  // @ts-ignore
  return invoke('ExtensionHostReference.executeReferenceProvider', id, offset)
}

export const executeFileReferenceProvider = async (id: number): Promise<readonly any[]> => {
  // @ts-ignore
  return invoke('ExtensionHostReference.executeFileReferenceProvider', id)
}

export const getRuntimeStatus = async (extensionId: string): Promise<RuntimeStatus> => {
  // @ts-ignore
  return invoke('ExtensionHost.getRuntimeStatus', extensionId)
}

export const registerMockRpc = (commandMap: Record<string, any>): MockRpc => {
  const mockRpc = createMockRpc({ commandMap })
  set(mockRpc)
  return mockRpc
}
