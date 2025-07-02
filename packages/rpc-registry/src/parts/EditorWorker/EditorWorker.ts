import type { EditorWorkerApi } from '../EditorWorkerApi/EditorWorkerApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<EditorWorkerApi>(RpcId.EditorWorker)

export const sendMessagePortToExtensionHostWorker = async (port: MessagePort): Promise<void> => {
  const command = 'HandleMessagePort.handleMessagePort2'
  await invokeAndTransfer(
    // @ts-ignore
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker',
    port,
    command,
    0, // TODO
  )
}
