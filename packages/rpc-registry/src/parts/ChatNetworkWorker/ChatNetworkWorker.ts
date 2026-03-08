import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(6002)

export const makeApiRequest = async (options: any): Promise<any> => {
  return invoke('ChatNetwork.makeApiRequest', options)
}

export const makeStreamingApiRequest = async (options: any): Promise<any> => {
  return invoke('ChatNetwork.makeStreamingApiRequest', options)
}
