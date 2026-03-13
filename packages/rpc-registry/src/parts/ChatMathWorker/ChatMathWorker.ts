import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(6007)

export const create = async (options: any): Promise<any> => {
  return invoke('ChatDebug.create', options)
}

export const loadContent = async (options: any): Promise<any> => {
  return invoke('ChatDebug.loadContent', options)
}
