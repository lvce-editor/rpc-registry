import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, set } = RpcFactory.create(10_000)

export const showQuickInput = async (options: any): Promise<any> => {
  return invoke('QuickPick.showQuickInput', options)
}
