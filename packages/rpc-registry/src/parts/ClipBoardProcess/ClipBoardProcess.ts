import { ClipBoardProcessApi } from '../ClipBoardProcessApi/ClipBoardProcessApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<ClipBoardProcessApi>(RpcId.ClipBoardProcess)
