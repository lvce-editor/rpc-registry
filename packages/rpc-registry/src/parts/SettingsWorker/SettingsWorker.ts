import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(21_093)

export interface SettingItemOption {
  readonly id: string
  readonly label: string
}

export interface SettingItem {
  readonly category: string
  readonly description: string
  readonly heading: string
  readonly id: string
  readonly maximum?: number
  readonly minimum?: number
  readonly options?: readonly SettingItemOption[]
  readonly type: number
  readonly validationId: number
  readonly value: any
}

export interface Tab {
  readonly id: string
  readonly label: string
  readonly selected: boolean
}

export const getSettingsItems2 = async (): Promise<readonly SettingItem[]> => {
  return invoke('SettingsWorker.getSettingsItems2')
}

export const getTabs = async (): Promise<readonly Tab[]> => {
  return invoke('SettingsWorker.getTabs')
}
