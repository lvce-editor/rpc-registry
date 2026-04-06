import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(6010)

export const login = async (options: any): Promise<any> => {
  return invoke('Auth.login', options)
}

export const logout = async (options: any): Promise<any> => {
  return invoke('Auth.logout', options)
}

export const clearMocks = async (): Promise<void> => {
  return invoke('Auth.clearMocks')
}
