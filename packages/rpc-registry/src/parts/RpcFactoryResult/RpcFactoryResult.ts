import type { Rpc } from '@lvce-editor/rpc'

export interface RpcFactoryResult<Api extends Record<string, any>> {
  readonly invoke: <T extends keyof Api>(method: T, ...params: Parameters<Api[T]>) => ReturnType<Api[T]>
  readonly invokeAndTransfer: <T extends keyof Api>(method: T, ...params: Parameters<Api[T]>) => ReturnType<Api[T]>
  readonly set: (rpc: Rpc) => void
  readonly dispose: () => Promise<void>
}
