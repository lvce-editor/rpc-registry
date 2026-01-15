import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(RpcId.IconThemeWorker)

export const getIcons = async (iconRequests: readonly any[]): Promise<readonly any[]> => {
  // @ts-ignore
  return invoke('IconTheme.getIcons', iconRequests)
}
