import type { RendererWorkerApi } from '../RendererWorkerApi/RendererWorkerApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<RendererWorkerApi>(RpcId.RendererWorker)

export const getFileHandles = async (fileIds: readonly number[]): Promise<readonly FileSystemHandle[]> => {
  const files = await invoke('FileSystemHandle.getFileHandles', fileIds)
  return files
}

export const sendMessagePortToEditorWorker = async (port: MessagePort): Promise<void> => {
  const command = 'HandleMessagePort.handleMessagePort'
  // @ts-ignore
  await invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker', port, command, RpcId.DebugWorker)
}

export const readFile = async (uri: string): Promise<string> => {
  return invoke('FileSystem.readFile', uri)
}

export const getFileIcon = async (options: any): Promise<string> => {
  return invoke('IconTheme.getFileIcon', options)
}
export const getFolderIcon = async (options: any): Promise<string> => {
  return invoke('IconTheme.getFolderIcon', options)
}

export const sendMessagePortToExtensionHostWorker = async (port: MessagePort): Promise<void> => {
  const command = 'HandleMessagePort.handleMessagePort2'
  await invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker', port, command, RpcId.DebugWorker)
}

export const activateByEvent = (event: string): Promise<void> => {
  return invoke('ExtensionHostManagement.activateByEvent', event)
}

export const sendMessagePortToRendererProcess = async (port: MessagePort): Promise<void> => {
  const command = 'HandleMessagePort.handleMessagePort'
  // @ts-ignore
  await invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToRendererProcess', port, command, RpcId.DebugWorker)
}

export const getPreference = async (key: string): Promise<any> => {
  return await invoke('Preferences.get', key)
}
