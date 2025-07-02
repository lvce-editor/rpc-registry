import type { RendererWorkerApi } from '../RendererWorkerApi/RendererWorkerApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<RendererWorkerApi>(RpcId.RendererWorker)

export const sendMessagePortToEditorWorker = async (port: MessagePort): Promise<void> => {
  const command = 'HandleMessagePort.handleMessagePort'
  // @ts-ignore
  await invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker', port, command, RpcId.DebugWorker)
}

export const readFile = async (uri: string): Promise<string> => {
  return invoke('FileSystem.readFile', uri)
}

export const sendMessagePortToExtensionHostWorker = async (port: MessagePort): Promise<void> => {
  const command = 'HandleMessagePort.handleMessagePort2'
  await invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker', port, command, RpcId.DebugWorker)
}

export const activateByEvent = (event: string): Promise<void> => {
  return invoke('ExtensionHostManagement.activateByEvent', event)
}
