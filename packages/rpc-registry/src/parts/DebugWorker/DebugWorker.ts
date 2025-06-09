import type { DebugWorkerApi } from '../DebugWorkerApi/DebugWorkerApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const { invoke, invokeAndTransfer, set } = RpcFactory.create<DebugWorkerApi>(RpcId.DebugWorker)
