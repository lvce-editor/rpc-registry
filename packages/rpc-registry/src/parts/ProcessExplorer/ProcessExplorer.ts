import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(10_001)
