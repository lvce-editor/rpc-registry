import type { Rpc } from '@lvce-editor/rpc'
import type { ExtensionHostWorkerApi } from '../ExtensionHostWorkerApi/ExtensionHostWorkerApi.ts'
import * as RpcId from '../RpcId/RpcId.ts'
import * as RpcRegistry from '../RpcRegistry/RpcRegistry.ts'

export const invoke = <T extends keyof ExtensionHostWorkerApi>(method: T, ...params: Parameters<ExtensionHostWorkerApi[T]>): ReturnType<ExtensionHostWorkerApi[T]> => {
  const rpc = RpcRegistry.get(RpcId.ExtensionHostWorker)
  // @ts-ignore
  return rpc.invoke(method, ...params)
}

export const invokeAndTransfer = <T extends keyof ExtensionHostWorkerApi>(method: T, ...params: Parameters<ExtensionHostWorkerApi[T]>): ReturnType<ExtensionHostWorkerApi[T]> => {
  const rpc = RpcRegistry.get(RpcId.ExtensionHostWorker)
  // @ts-ignore
  return rpc.invokeAndTransfer(method, ...params)
}

export const set = (rpc: Rpc): void => {
  RpcRegistry.set(RpcId.ExtensionHostWorker, rpc)
}
