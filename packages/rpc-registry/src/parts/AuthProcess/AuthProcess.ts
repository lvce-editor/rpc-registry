import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(6040)

export const createOauthServer = async (options: any): Promise<any> => {
  return invoke('OAuthServer.create', options)
}

export const disposeOauthServer = async (options: any): Promise<any> => {
  return invoke('OAuthServer.dispose', options)
}

export const getCode = async (): Promise<void> => {
  return invoke('OAuthServer.getCode')
}
