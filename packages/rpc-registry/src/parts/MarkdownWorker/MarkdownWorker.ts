import { RpcId } from '@lvce-editor/constants'
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
