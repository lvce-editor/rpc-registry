import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, set } = RpcFactory.create(RpcId.OpenerWorker)

export const enableMemoryOpener = async (): Promise<void> => {
  return invoke('Open.enableMemoryOpener')
}

export const openExternal = async (url: string): Promise<void> => {
  return invoke('Open.openExternal', url)
}

export const openUrl = async (url: string): Promise<void> => {
  return invoke('Open.openUrl', url)
}

export const readOpenedUrl = async (): Promise<string> => {
  return invoke('Open.readOpenedUrl')
}
