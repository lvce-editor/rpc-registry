import type { MainProcessApi } from '../MainProcessApi/MainProcessApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const { invoke, invokeAndTransfer, set } = RpcFactory.create<MainProcessApi>(RpcId.SharedProcess)
