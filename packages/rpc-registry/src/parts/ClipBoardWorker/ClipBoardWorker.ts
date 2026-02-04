import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(RpcId.ClipBoardWorker)

export const writeText = async (text: string): Promise<void> => {
  return invoke('ClipBoard.writeText', text)
}

export const readText = async (): Promise<string> => {
  return invoke('ClipBoard.readText')
}

export const writeImage = async (image: any): Promise<void> => {
  return invoke('ClipBoard.writeImage', image)
}

export const readNativeFiles = async (): Promise<readonly any[]> => {
  return invoke('ClipBoard.readNativeFiles')
}
