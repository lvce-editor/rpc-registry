import { RpcId } from '@lvce-editor/constants'
import type { ErrorWorkerApi } from '../ErrorWorkerApi/ErrorWorkerApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<ErrorWorkerApi>(RpcId.ErrorWorker)
