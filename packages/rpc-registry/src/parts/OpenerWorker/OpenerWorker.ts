import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

const rpcId = 4561

export const { dispose, invoke, invokeAndTransfer, set } = RpcFactory.create(rpcId)

export const enableMemoryOpener = async (): Promise<void> => {
  return invoke('Open.enableMemoryOpener')
}

export const openExternal = async (url: string): Promise<void> => {
  return invoke('Open.openExternal', url)
}

export const openUrl = async (url: string, platform: number): Promise<void> => {
  return invoke('Open.openUrl', url, platform)
}

export const readOpenedUrl = async (): Promise<string> => {
  return invoke('Open.readOpenedUrl')
}
