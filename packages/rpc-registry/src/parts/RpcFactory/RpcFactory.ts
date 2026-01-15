/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import { createMockRpc } from '@lvce-editor/rpc'
import type { DisposableMockRpc } from '../DisposableMockRpc/DisposableMockRpc.ts'
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
    registerMockRpc({ commandMap }): DisposableMockRpc {
      const mockRpc = createMockRpc({ commandMap })
      RpcRegistry.set(rpcId, mockRpc)
      // @ts-ignore
      mockRpc[Symbol.dispose] = () => {
        RpcRegistry.remove(rpcId)
      }
      // @ts-ignore
      return mockRpc
    },
    set(rpc) {
      RpcRegistry.set(rpcId, rpc)
    },
  }
}
