import type { RendererWorkerApi } from '../RendererWorkerApi/RendererWorkerApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<RendererWorkerApi>(RpcId.RendererWorker)

export const searchFileHtml = async (uri: string): Promise<readonly string[]> => {
  return invoke('ExtensionHost.searchFileWithHtml', uri)
}

export const getFilePathElectron = async (file: File): Promise<string> => {
  return invoke('FileSystemHandle.getFilePathElectron', file)
}

export const showContextMenu = async (x: number, y: number, id: number, ...args: readonly any[]): Promise<void> => {
  return invoke('ContextMenu.show', x, y, id, ...args)
}

export const getElectronVersion = async (): Promise<string> => {
  return invoke('Process.getElectronVersion')
}

export const applyBulkReplacement = async (bulkEdits: readonly any[]): Promise<void> => {
  await invoke('BulkReplacement.applyBulkReplacement', bulkEdits)
}

export const setColorTheme = async (id: string): Promise<string> => {
  // @ts-ignore
  return invoke(/* ColorTheme.setColorTheme */ 'ColorTheme.setColorTheme', /* colorThemeId */ id)
}

export const getNodeVersion = async (): Promise<string> => {
  return invoke('Process.getNodeVersion')
}

export const getChromeVersion = async (): Promise<string> => {
  return invoke('Process.getChromeVersion')
}
export const getV8Version = async (): Promise<string> => {
  return invoke('Process.getV8Version')
}

export const getFileHandles = async (fileIds: readonly number[]): Promise<readonly FileSystemHandle[]> => {
  const files = await invoke('FileSystemHandle.getFileHandles', fileIds)
  return files
}

export const setWorkspacePath = async (path: string): Promise<void> => {
  await invoke('Workspace.setPath', path)
}

export const registerWebViewInterceptor = async (id: number, port: MessagePort): Promise<void> => {
  await invokeAndTransfer('WebView.registerInterceptor', id, port)
}

export const unregisterWebViewInterceptor = async (id: number): Promise<void> => {
  await invoke('WebView.unregisterInterceptor', id)
}

export const sendMessagePortToEditorWorker = async (port: MessagePort, rpcId: number): Promise<void> => {
  const command = 'HandleMessagePort.handleMessagePort'
  // @ts-ignore
  await invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker', port, command, rpcId)
}

export const sendMessagePortToMarkdownWorker = async (port: MessagePort, rpcId: number): Promise<void> => {
  const command = 'Markdown.handleMessagePort'
  // @ts-ignore
  await invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToMarkdownWorker', port, command, rpcId)
}

export const sendMessagePortToFileSystemWorker = async (port: MessagePort, rpcId: number): Promise<void> => {
  const command = 'FileSystem.handleMessagePort'
  // @ts-ignore
  await invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker', port, command, rpcId)
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

export const getColorThemeNames = async (): Promise<readonly string[]> => {
  return invoke('ColorTheme.getColorThemeNames')
}

export const disableExtension = async (id: string): Promise<void> => {
  return invoke('ExtensionManagement.disable', id)
}

export const handleDebugChange = async (params: any): Promise<void> => {
  // @ts-ignore
  return invoke('Run And Debug.handleChange', params)
}

export const getFolderIcon = async (options: any): Promise<string> => {
  return invoke('IconTheme.getFolderIcon', options)
}

export const closeWidget = async (widgetId: string | number): Promise<void> => {
  return invoke('Viewlet.closeWidget', widgetId)
}

export const sendMessagePortToExtensionHostWorker = async (port: MessagePort, rpcId: number = 0): Promise<void> => {
  const command = 'HandleMessagePort.handleMessagePort2'
  await invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker', port, command, rpcId)
}

export const sendMessagePortToSearchProcess = async (port: MessagePort): Promise<void> => {
  await invokeAndTransfer('SendMessagePortToElectron.sendMessagePortToElectron', port, 'HandleMessagePortForSearchProcess.handleMessagePortForSearchProcess')
}

export const confirm = async (message: string, options?: any): Promise<boolean> => {
  // @ts-ignore
  const result = await invoke('Confirmprompt.prompt', message, options)
  return result
}

export const getRecentlyOpened = async (): Promise<readonly string[]> => {
  return invoke(/* RecentlyOpened.getRecentlyOpened */ 'RecentlyOpened.getRecentlyOpened')
}

export const getKeyBindings = async (): Promise<readonly any[]> => {
  return invoke('KeyBindingsInitial.getKeyBindings')
}

export const writeClipBoardText = async (text: string): Promise<void> => {
  await invoke('ClipBoard.writeText', /* text */ text)
}

export const writeClipBoardImage = async (blob: any): Promise<void> => {
  // @ts-ignore
  await invoke('ClipBoard.writeImage', /* text */ blob)
}

export const searchFileMemory = async (uri: string): Promise<void> => {
  // @ts-ignore
  return invoke('ExtensionHost.searchFileWithMemory', uri)
}

export const searchFileFetch = async (uri: string): Promise<readonly string[]> => {
  return invoke('ExtensionHost.searchFileWithFetch', uri)
}

export const showMessageBox = async (options: any): Promise<void> => {
  return invoke('ElectronDialog.showMessageBox', options)
}

export const handleDebugResumed = async (params: any): Promise<void> => {
  await invoke('Run And Debug.handleResumed', params)
}

export const openWidget = async (name: string): Promise<void> => {
  await invoke('Viewlet.openWidget', name)
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

export const getWorkspacePath = (): Promise<string> => {
  return invoke('Workspace.getPath')
}

export const sendMessagePortToRendererProcess = async (port: MessagePort): Promise<void> => {
  const command = 'HandleMessagePort.handleMessagePort'
  // @ts-ignore
  await invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToRendererProcess', port, command, RpcId.DebugWorker)
}

export const getPreference = async (key: string): Promise<any> => {
  return await invoke('Preferences.get', key)
}

export const getAllExtensions = async (): Promise<readonly any[]> => {
  return invoke('ExtensionManagement.getAllExtensions')
}

export const rerenderEditor = async (key: string): Promise<void> => {
  // @ts-ignore
  return invoke('Editor.rerender', key)
}

export const handleDebugPaused = async (params: any): Promise<void> => {
  await invoke('Run And Debug.handlePaused', params)
}

export const openUri = async (uri: string, focus?: boolean, options?: any): Promise<void> => {
  await invoke('Main.openUri', uri, focus, options)
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

export const getExtensionCommands = async (): Promise<readonly any[]> => {
  return invoke('ExtensionHost.getCommands')
}

export const showErrorDialog = async (errorInfo: any): Promise<void> => {
  // @ts-ignore
  await invoke('ErrorHandling.showErrorDialog', errorInfo)
}

export const getFolderSize = async (uri: string): Promise<number> => {
  // @ts-ignore
  return await invoke('FileSystem.getFolderSize', uri)
}

export const getExtension = async (id: string): Promise<any> => {
  // @ts-ignore
  return invoke('ExtensionManagement.getExtension', id)
}

export const getMarkdownDom = async (html: string): Promise<any> => {
  // @ts-ignore
  return invoke('Markdown.getVirtualDom', html)
}

export const renderMarkdown = async (markdown: string, options: any): Promise<any> => {
  // @ts-ignore
  return invoke('Markdown.renderMarkdown', markdown, options)
}

export const openNativeFolder = async (uri: string): Promise<void> => {
  // @ts-ignore
  await invoke('OpenNativeFolder.openNativeFolder', uri)
}

export const uninstallExtension = async (id: string): Promise<void> => {
  return invoke('ExtensionManagement.uninstall', id)
}

export const installExtension = async (id: string): Promise<void> => {
  // @ts-ignore
  return invoke('ExtensionManagement.install', id)
}

export const openExtensionSearch = async (): Promise<void> => {
  // @ts-ignore
  return invoke('SideBar.openViewlet', 'SearchExtensions')
}

export const setExtensionsSearchValue = async (value: string): Promise<void> => {
  // @ts-ignore
  return invoke('ExtensionSearch.setValue', value)
}
