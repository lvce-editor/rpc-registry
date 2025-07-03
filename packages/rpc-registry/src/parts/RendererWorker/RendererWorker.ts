import type { RendererWorkerApi } from '../RendererWorkerApi/RendererWorkerApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<RendererWorkerApi>(RpcId.RendererWorker)

export const getFilePathElectron = async (file: File): Promise<string> => {
  return invoke('FileSystemHandle.getFilePathElectron', file)
}

export const showContextMenu = async (x: number, y: number, id: number, ...args: readonly any[]): Promise<void> => {
  return invoke('ContextMenu.show', x, y, id, ...args)
}

export const getElectronVersion = async (): Promise<string> => {
  return invoke('Process.getElectronVersion')
}

export const getNodeVersion = async (): Promise<string> => {
  return invoke('Process.getNodeVersion')
}

export const getFileHandles = async (fileIds: readonly number[]): Promise<readonly FileSystemHandle[]> => {
  const files = await invoke('FileSystemHandle.getFileHandles', fileIds)
  return files
}

export const setWorkspacePath = async (path: string): Promise<void> => {
  await invoke('Workspace.setPath', path)
}

export const sendMessagePortToEditorWorker = async (port: MessagePort): Promise<void> => {
  const command = 'HandleMessagePort.handleMessagePort'
  // @ts-ignore
  await invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker', port, command, RpcId.DebugWorker)
}

export const readFile = async (uri: string): Promise<string> => {
  return invoke('FileSystem.readFile', uri)
}

export const getWebViewSecret = async (key: string): Promise<string> => {
  // @ts-ignore
  return invoke('WebView.getSecret', key)
}

export const setWebViewPort = async (uid: number, port: MessagePort, origin: string, portType: any): Promise<void> => {
  return invokeAndTransfer('WebView.setPort', uid, port, origin, portType)
}

export const setFocus = (key: number): Promise<void> => {
  return invoke('Focus.setFocus', key)
}

export const getFileIcon = async (options: any): Promise<string> => {
  return invoke('IconTheme.getFileIcon', options)
}

export const handleDebugChange = async (params: any): Promise<void> => {
  // @ts-ignore
  return invoke('Run And Debug.handleChange', params)
}

export const getFolderIcon = async (options: any): Promise<string> => {
  return invoke('IconTheme.getFolderIcon', options)
}

export const sendMessagePortToExtensionHostWorker = async (port: MessagePort): Promise<void> => {
  const command = 'HandleMessagePort.handleMessagePort2'
  await invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker', port, command, RpcId.DebugWorker)
}

export const sendMessagePortToSearchProcess = async (port: MessagePort): Promise<void> => {
  await invokeAndTransfer('SendMessagePortToElectron.sendMessagePortToElectron', port, 'HandleMessagePortForSearchProcess.handleMessagePortForSearchProcess')
}

export const confirm = async (message: string): Promise<boolean> => {
  // @ts-ignore
  const result = await invoke('Confirmprompt.prompt', message)
  return result
}

export const writeClipBoardText = async (text: string): Promise<void> => {
  await invoke('ClipBoard.writeText', /* text */ text)
}

export const showMessageBox = async (options: any): Promise<void> => {
  return invoke('ElectronDialog.showMessageBox', options)
}

export const handleDebugResumed = async (params: any): Promise<void> => {
  await invoke('Run And Debug.handleResumed', params)
}

export const getIcons = async (requests: readonly any[]): Promise<readonly string[]> => {
  const icons = await invoke('IconTheme.getIcons', requests)
  return icons
}

export const activateByEvent = (event: string): Promise<void> => {
  return invoke('ExtensionHostManagement.activateByEvent', event)
}

export const setAdditionalFocus = (focusKey: number): Promise<void> => {
  // @ts-ignore
  return invoke('Focus.setAdditionalFocus', focusKey)
}

export const getActiveEditorId = (): Promise<number> => {
  // @ts-ignore
  return invoke('GetActiveEditor.getActiveEditorId')
}

export const sendMessagePortToRendererProcess = async (port: MessagePort): Promise<void> => {
  const command = 'HandleMessagePort.handleMessagePort'
  // @ts-ignore
  await invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToRendererProcess', port, command, RpcId.DebugWorker)
}

export const getPreference = async (key: string): Promise<any> => {
  return await invoke('Preferences.get', key)
}

export const rerenderEditor = async (key: string): Promise<void> => {
  // @ts-ignore
  return invoke('Editor.rerender', key)
}

export const handleDebugPaused = async (params: any): Promise<void> => {
  await invoke('Run And Debug.handlePaused', params)
}

export const sendMessagePortToSyntaxHighlightingWorker = async (port: MessagePort): Promise<void> => {
  await invokeAndTransfer(
    // @ts-ignore
    'SendMessagePortToSyntaxHighlightingWorker.sendMessagePortToSyntaxHighlightingWorker',
    port,
    'HandleMessagePort.handleMessagePort2',
  )
}

export const handleDebugScriptParsed = async (script: any): Promise<void> => {
  await invoke('Run And Debug.handleScriptParsed', script)
}

export const getWindowId = async (): Promise<number> => {
  return invoke('GetWindowId.getWindowId')
}

export const getBlob = async (uri: string): Promise<Blob> => {
  // @ts-ignore
  return invoke('FileSystem.getBlob', uri)
}
