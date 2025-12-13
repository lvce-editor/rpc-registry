/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import type { RpcFactoryResult } from '../RpcFactoryResult/RpcFactoryResult.ts'
import * as RpcRegistry from '../RpcRegistry/RpcRegistry.ts'

export const create = (rpcId: number): RpcFactoryResult => {
  return {
    async dispose() {
      const rpc = RpcRegistry.get(rpcId)
      await rpc.dispose()
    },
    // @ts-ignore
    invoke(method, ...params) {
      const rpc = RpcRegistry.get(rpcId)
      // @ts-ignore
      return rpc.invoke(method, ...params)
    },
    // @ts-ignore
    invokeAndTransfer(method, ...params) {
      const rpc = RpcRegistry.get(rpcId)
      // @ts-ignore
      return rpc.invokeAndTransfer(method, ...params)
    },
    set(rpc) {
      RpcRegistry.set(rpcId, rpc)
    },
  }
}
