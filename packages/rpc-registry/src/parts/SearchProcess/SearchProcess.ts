import type { Rpc } from '@lvce-editor/rpc'
import type { SearchProcessApi } from '../SearchProcessApi/SearchProcessApi.ts'
import * as RpcId from '../RpcId/RpcId.ts'
import * as RpcRegistry from '../RpcRegistry/RpcRegistry.ts'

export const invoke = <T extends keyof SearchProcessApi>(method: T, ...params: Parameters<SearchProcessApi[T]>): ReturnType<SearchProcessApi[T]> => {
  const rpc = RpcRegistry.get(RpcId.SearchProcess)
  // @ts-ignore
  return rpc.invoke(method, ...params)
}

export const invokeAndTransfer = <T extends keyof SearchProcessApi>(method: T, ...params: Parameters<SearchProcessApi[T]>): ReturnType<SearchProcessApi[T]> => {
  const rpc = RpcRegistry.get(RpcId.SearchProcess)
  // @ts-ignore
  return rpc.invokeAndTransfer(method, ...params)
}

export const set = (rpc: Rpc): void => {
  RpcRegistry.set(RpcId.SearchProcess, rpc)
}
