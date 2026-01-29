import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

const rpcId = 123_456

export const { dispose, invoke, invokeAndTransfer, set } = RpcFactory.create(rpcId)

// TODO add functions
