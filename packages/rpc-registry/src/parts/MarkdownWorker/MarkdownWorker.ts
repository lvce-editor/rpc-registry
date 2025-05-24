import type { MarkdownWorkerApi } from '../MarkdownWorkerApi/MarkdownWorkerApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const { invoke, invokeAndTransfer, set } = RpcFactory.create<MarkdownWorkerApi>(RpcId.MarkdownWorker)
