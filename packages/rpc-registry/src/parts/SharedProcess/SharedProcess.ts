import { RpcId } from '@lvce-editor/constants'
import type { SharedProcessApi } from '../SharedProcessApi/SharedProcessApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<SharedProcessApi>(RpcId.SharedProcess)
