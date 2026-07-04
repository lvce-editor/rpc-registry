import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(10_001)

export interface GetMainProcessIdOptions {
  readonly includeElectronData: boolean
}

export const getMainProcessId = async (options: GetMainProcessIdOptions): Promise<number> => {
  const result = await invoke('ProcessId.getMainProcessId', options)
  return result
}

export const listProcessesWithMemoryUsage = async (rootPid: number, includeElectronData: boolean): Promise<readonly any[]> => {
  // @ts-ignore
  return invoke('ListProcessesWithMemoryUsage.listProcessesWithMemoryUsage', rootPid, includeElectronData)
}
