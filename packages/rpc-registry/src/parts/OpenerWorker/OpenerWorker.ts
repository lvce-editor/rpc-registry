import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

const rpcId = 4561

export const { dispose, invoke, invokeAndTransfer, set } = RpcFactory.create(rpcId)

// TODO add functions
