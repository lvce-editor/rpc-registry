import type { MockRpc } from '@lvce-editor/rpc'

export interface DisposableMockRpc extends MockRpc {
  [Symbol.dispose]: void
}
