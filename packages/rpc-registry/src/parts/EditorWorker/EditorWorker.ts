import type { EditorWorkerApi } from '../EditorWorkerApi/EditorWorkerApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const { invoke, invokeAndTransfer, set } = RpcFactory.create<EditorWorkerApi>(RpcId.EditorWorker)
