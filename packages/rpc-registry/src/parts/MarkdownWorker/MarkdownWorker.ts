import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(RpcId.MarkdownWorker)

export const getVirtualDom = async (html: string): Promise<readonly any[]> => {
  // @ts-ignore
  return invoke('Markdown.getVirtualDom', html)
}

export const render = async (markdown: string, options?: any): Promise<string> => {
  // @ts-ignore
  return invoke('Markdown.render', markdown, options)
}
