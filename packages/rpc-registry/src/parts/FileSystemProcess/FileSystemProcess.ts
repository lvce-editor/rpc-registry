import type { FileProcessApi } from '../FileSystemProcessApi/FileSystemProcessApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const { invoke, invokeAndTransfer, set } = RpcFactory.create<FileProcessApi>(RpcId.FileSystemProcess)
