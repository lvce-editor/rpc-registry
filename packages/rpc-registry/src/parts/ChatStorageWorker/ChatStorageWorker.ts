import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(RpcId.ChatStorageWorker)

export const save = async (options: any): Promise<any> => {
  return invoke('ChatStorage.save', options)
}

export const get = async (options: any): Promise<any> => {
  return invoke('ChatStorage.get', options)
}
