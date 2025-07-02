import type { RendererProcessApi } from '../RendererProcessApi/RendererProcessApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<RendererProcessApi>(RpcId.RendererProcess)

export const readClipBoardText = async (): Promise<any> => {
  // @ts-ignore
  return await RendererProcess.invoke('ClipBoard.readText')
}

export const readClipBoard = async (): Promise<any> => {
  // @ts-ignore
  return await RendererProcess.invoke('ClipBoard.read')
}
