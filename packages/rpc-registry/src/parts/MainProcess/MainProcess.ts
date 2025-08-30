import { RpcId } from '@lvce-editor/constants'
import type { MainProcessApi } from '../MainProcessApi/MainProcessApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<MainProcessApi>(RpcId.MainProcess)
