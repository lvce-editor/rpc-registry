import type { BulkReplacementEdit } from '../BulkReplacementEdit/BulkReplacementEdit.ts'
import type { ConfirmPromptOptions } from '../ConfirmPromptOptions/ConfirmPromptOptions.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'

export interface RendererWorkerApi {
  readonly 'BulkReplacement.applyBulkReplacement': (edits: readonly BulkReplacementEdit[]) => Promise<void>
  readonly 'ClipBoard.writeText': (text: string) => Promise<void>
  readonly 'ColorTheme.getColorThemeNames': () => Promise<readonly string[]>
  readonly 'ColorTheme.setColorTheme': (id: string) => Promise<void>
  readonly 'ConfirmPrompt.prompt': (confirmText: string, options: ConfirmPromptOptions) => Promise<boolean>
  readonly 'ContextMenu.show': (x: number, y: number, id: any, ...args: readonly any[]) => Promise<void>
  readonly 'ElectronDialog.showMessageBox': (options: any) => Promise<any>
  readonly 'ErrorHandling.showErrorDialog': (errorInfo: any) => Promise<void>
  readonly 'ExtensionHost.executeCommand': (id: string) => Promise<void>
  readonly 'ExtensionHost.getCommands': () => Promise<readonly any[]>
  readonly 'ExtensionHost.searchFileWithFetch': (uri: string) => Promise<readonly string[]>
  readonly 'ExtensionHost.searchFileWithHtml': (uri: string) => Promise<readonly string[]>
  readonly 'ExtensionHost.searchFileWithMemory': (uri: string) => Promise<readonly string[]>
  readonly 'ExtensionHostManagement.activateByEvent': (event: string) => Promise<void>
  readonly 'ExtensionHostTextSearch.executeTextSearchProvider': (scheme: string, query: string) => Promise<readonly SearchResult[]>
  readonly 'ExtensionHostTextSearch.textSearchFetch': (scheme: string, root: string, query: string, options: any, assetDir: string) => Promise<readonly SearchResult[]>
  readonly 'ExtensionHostTextSearch.textSearchHtml': (scheme: string, root: string, query: string) => Promise<readonly SearchResult[]>
  readonly 'ExtensionHostTextSearch.textSearchMemory': (scheme: string, root: string, query: string, options: any, assetDir: string) => Promise<readonly SearchResult[]>
  readonly 'FileSystem.readFile': (uri: string) => Promise<string>
  readonly 'Focus.setFocus': (focusKey: number) => Promise<void>
  readonly 'GetWindowId.getWindowId': () => Promise<number>
  readonly 'IconTheme.getFileIcon': (options: any) => Promise<string>
  readonly 'IconTheme.getFolderIcon': (options: any) => Promise<string>
  readonly 'IconTheme.getIcons': (request: readonly any[]) => Promise<readonly string[]>
  readonly 'KeyBindingsInitial.getKeyBindings': () => Promise<readonly any[]>
  readonly 'Main.openUri': (uri: string, focus?: boolean, props?: any) => Promise<void>
  readonly 'Process.getChromeVersion': () => Promise<string>
  readonly 'Process.getElectronVersion': () => Promise<string>
  readonly 'Process.getNodeVersion': () => Promise<string>
  readonly 'Process.getV8Version': () => Promise<string>
  readonly 'RecentlyOpened.getRecentlyOpened': () => Promise<readonly string[]>
  readonly 'Run And Debug.handlePaused': (params: any) => Promise<void>
  readonly 'Run And Debug.handleResumed': (params: any) => Promise<void>
  readonly 'Run And Debug.handleScriptParsed': (params: any) => Promise<void>
  readonly 'SearchProcess.invoke': (command: string, ...args: readonly any[]) => Promise<any>
  readonly 'SendMessagePortToElectron.sendMessagePortToElectron': (port: MessagePort, command: string) => Promise<void>
  readonly 'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker': (port: MessagePort, initialCommand: string, rpcId: number) => Promise<void>
  readonly 'Viewlet.closeWidget': (id: number | string) => Promise<void>
  readonly 'Viewlet.openWidget': (widgetId: string) => Promise<string>
  readonly 'Workspace.getPath': () => Promise<string>
  readonly 'Workspace.setPath': (uri: string) => Promise<void>
}
