import type { FileSystemProcessApi } from '../FileSystemProcessApi/FileSystemProcessApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<FileSystemProcessApi>(RpcId.FileSystemProcess)
