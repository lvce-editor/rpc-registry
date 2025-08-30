import { RpcId } from '@lvce-editor/constants'
import type { SyntaxHighlightingWorkerApi } from '../SyntaxHighlightingWorkerApi/SyntaxHighlightingWorkerApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<SyntaxHighlightingWorkerApi>(RpcId.MarkdownWorker)
