import { RpcId } from '@lvce-editor/constants'
import type { EmbedsProcessApi } from '../EmbedsProcessApi/EmbedsProcessApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<EmbedsProcessApi>(RpcId.EmbedsProcess)
