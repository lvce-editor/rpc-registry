import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, set } = RpcFactory.create(RpcId.SearchProcess)

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
