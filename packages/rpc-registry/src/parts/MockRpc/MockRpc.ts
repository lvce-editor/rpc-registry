import type { createMockRpc } from '@lvce-editor/rpc'

export type MockRpc = ReturnType<typeof createMockRpc> & {
  readonly invocations: readonly any[]
}
