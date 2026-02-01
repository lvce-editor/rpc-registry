import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, set, registerMockRpc } = RpcFactory.create(RpcId.SharedProcess)
