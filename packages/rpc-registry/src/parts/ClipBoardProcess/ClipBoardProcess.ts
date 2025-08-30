import { RpcId } from '@lvce-editor/constants'
import type { ClipBoardProcessApi } from '../ClipBoardProcessApi/ClipBoardProcessApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<ClipBoardProcessApi>(RpcId.ClipBoardProcess)
