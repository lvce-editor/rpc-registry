import { RpcId } from '@lvce-editor/constants'
import type { DebugWorkerApi } from '../DebugWorkerApi/DebugWorkerApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<DebugWorkerApi>(RpcId.DebugWorker)
