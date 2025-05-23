export interface MainProcessApi {
  readonly 'ElectronWebContents.callFunction': (webContentsId: any, method: string, ...params: readonly any[]) => Promise<any>
  readonly 'ElectronWebContents.dispose': (id: any) => Promise<void>
  readonly 'ElectronWebContentsView.attachEventListeners': (webContentsId: any) => Promise<void>
  readonly 'ElectronWebContentsView.createWebContentsView': (webContentsId: any) => Promise<any>
  readonly 'ElectronWebContentsView.disposeWebContentsView': (webContentsId: any) => Promise<void>
  readonly 'ElectronWebContentsViewFunctions.getStats': (id: any, ...args: readonly any[]) => Promise<any>
  readonly 'ElectronWebContentsViewFunctions.resizeBrowserView': (id: any, ...args: readonly any[]) => Promise<void>
  readonly 'ElectronWebContentsViewFunctions.setBackgroundColor': (webContentsId: any, backgroundColor: string) => Promise<void>
  readonly 'ElectronWebContentsViewFunctions.setFallthroughKeyBindings': (id: any, ...args: readonly any[]) => Promise<void>
  readonly 'ElectronWebContentsViewFunctions.setIframeSrc': (id: any, ...args: readonly any[]) => Promise<void>
  readonly 'ElectronWebContentsViewFunctions.setIframeSrcFallback': (id: any, ...args: readonly any[]) => Promise<void>
  readonly 'ElectronWebContentsViewFunctions.show': (id: any, ...args: readonly any[]) => Promise<void>
  readonly 'Trash.trash': (path: string) => Promise<void>
}
