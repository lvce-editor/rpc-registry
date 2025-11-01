import type { MockRpc } from '@lvce-editor/rpc'
import { RpcId } from '@lvce-editor/constants'
import { createMockRpc } from '@lvce-editor/rpc'
import type { MarkdownWorkerApi } from '../MarkdownWorkerApi/MarkdownWorkerApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<MarkdownWorkerApi>(RpcId.MarkdownWorker)

export const getVirtualDom = async (html: string): Promise<readonly any[]> => {
  // @ts-ignore
  return invoke('Markdown.getVirtualDom', html)
}

export const render = async (markdown: string, options?: any): Promise<string> => {
  // @ts-ignore
  return invoke('Markdown.render', markdown, options)
}

export const registerMockRpc = (commandMap: Record<string, any>): MockRpc => {
  const mockRpc = createMockRpc({ commandMap })
  set(mockRpc)
  return mockRpc
}
