import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(RpcId.TextSearchWorker)

export const getIncrementalResults = async (searchId: string, minLineY: number, maxLineY: number): Promise<any> => {
  return invoke('TextSearch.getIncrementalResults', searchId, minLineY, maxLineY)
}

export const getPullResults = async (searchId: string): Promise<any> => {
  return invoke('TextSearch.getPullResults', searchId)
}

export const search = async (...args: readonly any[]): Promise<any> => {
  return invoke('TextSearch.search', ...args)
}

export const searchIncremental = async (...args: readonly any[]): Promise<any> => {
  return invoke('TextSearch.searchIncremental', ...args)
}
