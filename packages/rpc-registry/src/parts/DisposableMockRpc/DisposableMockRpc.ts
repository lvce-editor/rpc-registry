import type { MockRpc } from '../MockRpc/MockRpc.ts'

export type DisposableMockRpc = MockRpc & {
  [Symbol.dispose]: () => void
}
