import type { ErrorWorkerApi } from '../ErrorWorkerApi/ErrorWorkerApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<ErrorWorkerApi>(RpcId.ErrorWorker)
