import { RpcId } from '@lvce-editor/constants'
import type { SearchProcessApi } from '../SearchProcessApi/SearchProcessApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<SearchProcessApi>(RpcId.SearchProcess)

// TODO add tests for this
export const search = async (options: any): Promise<any> => {
  const result = await invoke('TextSearch.search', options)
  return result
}

export const searchIncremental = async (options: any): Promise<any> => {
  // @ts-ignore
  return invoke('TextSearch.searchIncremental', options)
}

export const getIncrementalResults = async (searchId: string, minLineY: number, maxLineY: number): Promise<any> => {
  // @ts-ignore
  return invoke('TextSearch.getIncrementalResults', searchId, minLineY, maxLineY)
}
