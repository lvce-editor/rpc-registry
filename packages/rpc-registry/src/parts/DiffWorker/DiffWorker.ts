import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(218_933)

export const execute = async (name: string, rawArguments: unknown, options: ExecuteToolOptions): Promise<any> => {
  return invoke('Diff.execute', name, rawArguments, options)
}

export const getTools = async (): Promise<readonly any[]> => {
  return invoke('Diff.getTools')
}
