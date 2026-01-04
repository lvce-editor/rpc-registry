import type { MockRpc } from '@lvce-editor/rpc'
import { RpcId } from '@lvce-editor/constants'
import { createMockRpc } from '@lvce-editor/rpc'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, set } = RpcFactory.create(RpcId.ExtensionManagementWorker)

export const registerMockRpc = (commandMap: Record<string, any>): MockRpc => {
  const mockRpc = createMockRpc({ commandMap })
  set(mockRpc)
  return mockRpc
}

export const enable = (id: string): Promise<void> => {
  return invoke(`Extensions.enable`, id)
}

export const enable2 = (id: string, platform: number): Promise<void> => {
  return invoke(`Extensions.enable`, id, platform)
}

export const disable = (id: string): Promise<void> => {
  return invoke(`Extensions.disable`, id)
}
export const disable2 = (id: string, platform: number): Promise<void> => {
  return invoke(`Extensions.disable`, id, platform)
}

export const getExtension = (id: string): Promise<any> => {
  return invoke(`Extensions.getExtension`, id)
}

export const getLanguages = (platform: number, assetDir: string): Promise<any> => {
  return invoke('Extensions.getLanguages', platform, assetDir)
}

export const install = (id: string): Promise<void> => {
  return invoke(`Extensions.install`, id)
}

export const uninstall = (id: string): Promise<void> => {
  return invoke(`Extensions.uninstall`, id)
}
