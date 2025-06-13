import type { FileSystemWorkerApi } from '../FileSystemWorkerApi/FileSystemWorkerApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<FileSystemWorkerApi>(RpcId.FileSystemWorker)
