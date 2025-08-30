import { RpcId } from '@lvce-editor/constants'
import type { RendererProcessApi } from '../RendererProcessApi/RendererProcessApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<RendererProcessApi>(RpcId.RendererProcess)

export const readClipBoardText = async (): Promise<any> => {
  // @ts-ignore
  return await invoke('ClipBoard.readText')
}

export const readClipBoard = async (): Promise<any> => {
  // @ts-ignore
  return await invoke('ClipBoard.read')
}

export const writeClipBoard = async (options: any): Promise<void> => {
  // @ts-ignore
  await invoke('ClipBoard.write', options)
}
