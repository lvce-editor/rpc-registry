import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create(RpcId.ClipBoardWorker)

export const writeText = async (text: string): Promise<void> => {
  // @ts-ignore
  return invoke('ClipBoard.writeText', text)
}

export const readText = async (): Promise<string> => {
  // @ts-ignore
  return invoke('ClipBoard.readText')
}

export const writeImage = async (image: any): Promise<void> => {
  // @ts-ignore
  return invoke('ClipBoard.writeImage', image)
}

export const readNativeFiles = async (): Promise<readonly any[]> => {
  // @ts-ignore
  return invoke('ClipBoard.readNativeFiles')
}
