import type { EmbedsProcessApi } from '../EmbedsProcessApi/EmbedsProcessApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const { invoke, invokeAndTransfer, set } = RpcFactory.create<EmbedsProcessApi>(RpcId.MainProcess)
