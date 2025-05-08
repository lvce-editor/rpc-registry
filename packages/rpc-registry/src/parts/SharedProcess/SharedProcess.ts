import type { Rpc } from '@lvce-editor/rpc'
import type { SharedProcessApi } from '../SharedProcessApi/SharedProcessApi.ts'
import * as RpcId from '../RpcId/RpcId.ts'
import * as RpcRegistry from '../RpcRegistry/RpcRegistry.ts'

export const invoke = <T extends keyof SharedProcessApi>(method: T, ...params: Parameters<SharedProcessApi[T]>): ReturnType<SharedProcessApi[T]> => {
  const rpc = RpcRegistry.get(RpcId.SharedProcess)
  // @ts-ignore
  return rpc.invoke(method, ...params)
}

export const invokeAndTransfer = <T extends keyof SharedProcessApi>(method: T, ...params: Parameters<SharedProcessApi[T]>): ReturnType<SharedProcessApi[T]> => {
  const rpc = RpcRegistry.get(RpcId.SharedProcess)
  // @ts-ignore
  return rpc.invokeAndTransfer(method, ...params)
}

export const set = (rpc: Rpc): void => {
  RpcRegistry.set(RpcId.SharedProcess, rpc)
}
