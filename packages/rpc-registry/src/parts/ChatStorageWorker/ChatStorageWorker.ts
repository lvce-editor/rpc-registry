import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(6003)

export const save = async (options: any): Promise<any> => {
  return invoke('ChatStorage.save', options)
}

export const get = async (options: any): Promise<any> => {
  return invoke('ChatStorage.get', options)
}
