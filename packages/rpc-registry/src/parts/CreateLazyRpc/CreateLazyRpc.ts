import type { Rpc } from '@lvce-editor/rpc'
import type { LazyRpc } from '../LazyRpc/LazyRpc.ts'
import * as RpcRegistry from '../RpcRegistry/RpcRegistry.ts'

export const createLazyRpc = (rpcId: number): LazyRpc => {
  let activeRpc: Rpc | undefined
  let factory: () => Promise<Rpc>
  let generation = 0
  let rpcPromise: Promise<Rpc> | undefined
  const resetListeners = new Set<(reason: unknown) => void>()

  const createRpc = async (expectedGeneration: number): Promise<Rpc> => {
    const rpc = await factory()
    if (generation !== expectedGeneration) {
      await rpc.dispose()
      throw new Error('Lazy RPC launch was superseded')
    }
    activeRpc = rpc
    RpcRegistry.set(rpcId, rpc)
    return rpc
  }

  const ensureRpc = async (): Promise<Rpc> => {
    if (activeRpc) {
      return activeRpc
    }
    if (!rpcPromise) {
      const pending = createRpc(generation)
      rpcPromise = pending
      void pending.catch(() => {
        if (rpcPromise === pending) {
          rpcPromise = undefined
        }
      })
    }
    return rpcPromise
  }

  const clear = async (reason: unknown, notify: boolean): Promise<void> => {
    generation++
    const rpc = activeRpc
    activeRpc = undefined
    rpcPromise = undefined
    if (rpc && RpcRegistry.get(rpcId) === rpc) {
      RpcRegistry.remove(rpcId)
    }
    if (notify) {
      for (const listener of resetListeners) {
        listener(reason)
      }
    }
    await rpc?.dispose()
  }

  return {
    dispose(): Promise<void> {
      return clear(undefined, false)
    },
    async invoke(method: string, ...params: readonly any[]): Promise<any> {
      const rpc = await ensureRpc()
      return rpc.invoke(method, ...params)
    },
    async invokeAndTransfer(method: string, ...params: readonly any[]): Promise<any> {
      const rpc = await ensureRpc()
      return rpc.invokeAndTransfer(method, ...params)
    },
    onDidReset(listener: (reason: unknown) => void): () => void {
      resetListeners.add(listener)
      return () => {
        resetListeners.delete(listener)
      }
    },
    reset(reason?: unknown): Promise<void> {
      return clear(reason, true)
    },
    setFactory(value: () => Promise<Rpc>): void {
      factory = value
    },
  }
}
