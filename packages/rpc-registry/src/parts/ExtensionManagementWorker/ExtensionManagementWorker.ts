import type { MockRpc } from '@lvce-editor/rpc'
import { createMockRpc } from '@lvce-editor/rpc'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

const id = 9006

export const { dispose, invoke, invokeAndTransfer, set } = RpcFactory.create(id)

export const registerMockRpc = (commandMap: Record<string, any>): MockRpc => {
  const mockRpc = createMockRpc({ commandMap })
  set(mockRpc)
  return mockRpc
}

export const enable = (id: string): Promise<void> => {
  return invoke(`Extensions.enable`, id)
}

export const disable = (id: string): Promise<void> => {
  return invoke(`Extensions.disable`, id)
}

export const install = (id: string): Promise<void> => {
  return invoke(`Extensions.install`, id)
}

export const uninstall = (id: string): Promise<void> => {
  return invoke(`Extensions.uninstall`, id)
}
