import type { ExtensionHostWorkerApi } from '../ExtensionHostWorkerApi/ExtensionHostWorkerApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<ExtensionHostWorkerApi>(RpcId.ExtensionHostWorker)

export const executeReferenceProvider = async (id: number, offset: number): Promise<readonly any[]> => {
  // @ts-ignore
  return invoke('ExtensionHostReference.executeReferenceProvider', id, offset)
}

export const executeFileReferenceProvider = async (id: number): Promise<readonly any[]> => {
  // @ts-ignore
  return invoke('ExtensionHostReference.executeFileReferenceProvider', id)
}
