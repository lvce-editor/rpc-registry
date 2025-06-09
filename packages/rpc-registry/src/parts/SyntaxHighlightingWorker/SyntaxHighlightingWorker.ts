import * as RpcFactory from '../RpcFactory/RpcFactory.ts'
import * as RpcId from '../RpcId/RpcId.ts'
import { SyntaxHighlightingWorkerApi } from '../SyntaxHighlightingWorkerApi/SyntaxHighlightingWorkerApi.ts'

export const { invoke, invokeAndTransfer, set } = RpcFactory.create<SyntaxHighlightingWorkerApi>(RpcId.MarkdownWorker)
