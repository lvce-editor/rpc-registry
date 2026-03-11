import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(RpcId.ChatNetworkWorker)

export const makeApiRequest = async (options: any): Promise<any> => {
  return invoke('ChatNetwork.makeApiRequest', options)
}

export const makeStreamingApiRequest = async (options: any): Promise<any> => {
  return invoke('ChatNetwork.makeStreamingApiRequest', options)
}
