import type { Rpc } from '@lvce-editor/rpc'
import type { LazyRpc } from '../LazyRpc/LazyRpc.ts'
import * as RpcRegistry from '../RpcRegistry/RpcRegistry.ts'

export const createLazyRpc = (rpcId: number): LazyRpc => {
  let rpcPromise: Promise<void> | undefined
  let factory: () => Promise<Rpc>
  const createRpc = async (): Promise<void> => {
    const rpc = await factory()
    RpcRegistry.set(rpcId, rpc)
  }
  const ensureRpc = async (): Promise<void> => {
    if (!rpcPromise) {
      rpcPromise = createRpc()
    }
    await rpcPromise
  }
  return {
    async invoke(method: string, ...params: readonly any[]): Promise<any> {
      await ensureRpc()
      const rpc = RpcRegistry.get(rpcId)
      return rpc.invoke(method, ...params)
    },
    setFactory(value: () => Promise<Rpc>): void {
      factory = value
    },
  }
}
