import type { MockRpc } from '../MockRpc/MockRpc.ts'

export interface DisposableMockRpc extends MockRpc {
  [Symbol.dispose]: () => void
}
