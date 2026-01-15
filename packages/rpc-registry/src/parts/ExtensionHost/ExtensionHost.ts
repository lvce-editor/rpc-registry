import { RpcId } from '@lvce-editor/constants'
import type { RuntimeStatus } from '../RuntimeStatus/RuntimeStatus.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(RpcId.ExtensionHostWorker)

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

export const getEnabledOutputProviderIds = async (): Promise<readonly string[]> => {
  const channels = await invoke('Output.getEnabledProviders')
  return channels
}
