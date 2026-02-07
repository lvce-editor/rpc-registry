import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(3212)

export const terminate = async (): Promise<void> => {
  return invoke('SandBox.terminate')
}
