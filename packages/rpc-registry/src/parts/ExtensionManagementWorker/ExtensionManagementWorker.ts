import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(RpcId.ExtensionManagementWorker)

export const enable = (id: string): Promise<void> => {
  return invoke(`Extensions.enable`, id)
}

export const enable2 = (id: string, platform: number): Promise<void> => {
  return invoke(`Extensions.enable2`, id, platform)
}

export const disable = (id: string): Promise<void> => {
  return invoke(`Extensions.disable`, id)
}

export const disable2 = (id: string, platform: number): Promise<void> => {
  return invoke(`Extensions.disable2`, id, platform)
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

export const invalidateExtensionsCache = (): Promise<void> => {
  return invoke(`Extensions.invalidateExtensionsCache`)
}
