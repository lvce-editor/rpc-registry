import type { Rpc } from '@lvce-editor/rpc'
import type { MainProcessApi } from '../MainProcessApi/MainProcessApi.ts'
import * as RpcId from '../RpcId/RpcId.ts'
import * as RpcRegistry from '../RpcRegistry/RpcRegistry.ts'

export const invoke = <T extends keyof MainProcessApi>(method: T, ...params: Parameters<MainProcessApi[T]>): ReturnType<MainProcessApi[T]> => {
  const rpc = RpcRegistry.get(RpcId.MainProcess)
  // @ts-ignore
  return rpc.invoke(method, ...params)
}

export const invokeAndTransfer = <T extends keyof MainProcessApi>(method: T, ...params: Parameters<MainProcessApi[T]>): ReturnType<MainProcessApi[T]> => {
  const rpc = RpcRegistry.get(RpcId.MainProcess)
  // @ts-ignore
  return rpc.invokeAndTransfer(method, ...params)
}

export const set = (rpc: Rpc): void => {
  RpcRegistry.set(RpcId.MainProcess, rpc)
}
