import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, set } = RpcFactory.create(RpcId.RendererProcess)

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
