import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(RpcId.MainProcess)

export type ElectronMessageBoxType = 'error' | 'info' | 'none' | 'question' | 'warning'

export interface ElectronMessageBoxOptions {
  readonly buttons: readonly string[]
  readonly defaultId?: number
  readonly detail?: string
  readonly message: string
  readonly productName?: string
  readonly title?: string
  readonly type?: ElectronMessageBoxType
  readonly windowId?: number
}

export const showMessageBox = async (options: ElectronMessageBoxOptions): Promise<number | undefined> => {
  return invoke('ElectronDialog.showMessageBox', options)
}
