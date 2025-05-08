export interface MainProcessApi {
  readonly 'ElectronWebContentsView.attachEventListeners': (webContentsId: any) => Promise<void>
}
